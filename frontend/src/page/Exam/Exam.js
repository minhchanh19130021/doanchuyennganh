import { useEffect, useRef, useState } from 'react';
import { findQuestionsByExamId } from '~/services/questionnaireService';
import { findExamById, submitExam } from '~/services/examService';
import { findRoomByRoomId, findTimeByExamId } from '~/services/roomService';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '~/utils/cookie';

function Exam() {
    let navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [time, setTime] = useState(0);
    const [paused, setPaused] = useState(false);
    const [point, setPoint] = useState(0);
    const [requestParams, setRequestParams] = useState({});
    const [examId, setExamId] = useState(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState({});

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        const roomId = window.location.href.substring(window.location.href.length - 1);

        axios
            .put('http://localhost:8080/room/' + roomId + '/leave', { userId: 124 }, {
                headers: {                    
                    Authorization: `Bearer ${getCookie("jwt")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setIsOpen(false);
                navigate('/roomList');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const roomId = window.location.href.substring(window.location.href.length - 1);
        findRoomByRoomId(roomId).then((e) => {
            setExamId(e?.data?.exam?.id);
            const seconds = e?.data?.seconds;
            setTime(seconds);
            findQuestionsByExamId(1).then(
                (e) => {
                    setQuestions(e?.data);
                    setPoint(10 / e?.data?.length);
                    let timerId;
                    let timeLeft = seconds;
                    if (!paused) {
                        timerId = setInterval(() => {
                            timeLeft = timeLeft - 1;
                            setTime(timeLeft);
                            if (timeLeft <= 0) {
                                setPaused(true);
                                clearInterval(timerId);
                                handleSubmit();
                                return;
                            }
                        }, 1000);
                    }
                },
                (err) => {
                    console.log(err);
                },
            );
        });
    }, []);

    const formatTime = (time) => {
        let min = Math.floor(time / 60);
        let seconds = Math.floor(time - min * 60);
        if (min < 10) min = '0' + min;
        if (seconds < 10) seconds = '0' + seconds;
        return min + ':' + seconds;
    };

    const handleCheck = (event) => {
        let tmp = requestParams;
        tmp[event.target.name] = {
            question_id: event.target.name,
            answer_id: event.target.value,
            point_per_question: point,
        };
        console.log(tmp);
        setRequestParams(tmp);
    };

    const handleSubmit = () => {
        const array = Object.keys(requestParams).map(function (key) {
            return requestParams[key];
        });
        const saveResultRequest = {
            examId: 1,
            userId: 1,
            handleExamRequests: array,
        };
        submitExam(saveResultRequest).then((e) => {
            console.log(e?.data);
            setResult(e?.data);
            // alert(JSON.stringify(e?.data))
            handleOpenModal();
        });
    };

    return (
        <div>
            <div className="mt-10 flex justify-center text-2xl  font-bold">
                <p>Bài làm</p>
            </div>
            <div className="w-9/10 d relative mx-auto flex">
                <div className="ml-10 w-1/4 justify-center ">
                    <label className="w-full text-xl font-bold text-blue-500">Thời gian còn lại:</label>

                    <label className="w-full text-3xl font-semibold text-[#1a1a1a]">{formatTime(time)}</label>
                </div>
                <div className="w-3/4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!paused) {
                                handleSubmit();
                            } else {
                                alert('Hết thời gian làm bài');
                            }
                        }}
                    >
                        <div>
                            {questions
                                .sort((a, b) => a.id - b.id)
                                ?.map(
                                    (question, i) => (
                                        <div className="mt-4" key={i}>
                                            <div>
                                                <p>
                                                    <b>{question.id}. </b>
                                                    <b>{question.content}</b>
                                                </p>
                                            </div>

                                            <div className="flex flex-col">
                                                {question?.answers
                                                    ?.sort((a, b) => a.id - b.id)
                                                    ?.map((answer, i) => {
                                                        return (
                                                            <label key={i} className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    name={question.id}
                                                                    value={answer.id}
                                                                    onChange={handleCheck}
                                                                />
                                                                <span className="mx-2">{answer.content}</span>
                                                            </label>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    ),

                                    // <Question key={question.id} id={question.id} no={question.id} content={question.content} answers={question.answers} />
                                )}
                        </div>
                        <button
                            type="submit"
                            className="mt-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        >
                            Nộp bài
                        </button>
                    </form>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onRequestClose={handleCloseModal}
                className="flex h-full flex-col items-center justify-center bg-white"
            >
                <p className="text-xl font-bold text-green-500">Nộp bài thành công!</p>
                <p>Số câu hỏi: {result.totalQuestion}</p>
                <p>Số câu trả lời đúng: {result.rightAnswer}</p>
                <p>Số điểm: {result.totalPoints}</p>

                <button
                    className="mt-20 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    onClick={handleCloseModal}
                >
                    Rời phòng
                </button>
            </Modal>
        </div>
    );
}

export default Exam;
