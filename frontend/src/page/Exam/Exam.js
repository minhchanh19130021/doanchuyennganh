import { useEffect, useRef, useState } from 'react';
import { findQuestionsByExamId } from '~/services/questionnaireService';
import { findExamById, submitExam } from '~/services/examService';
import { useParams } from 'react-router-dom';
import { findRoomByRoomId, findTimeByExamId } from '~/services/roomService';

function Exam() {
    const [questions, setQuestions] = useState([]);
    const [time, setTime] = useState(0);
    const [paused, setPaused] = useState(false);
    const [point, setPoint] = useState(0);
    const [requestParams, setRequestParams] = useState({});
    const [ examId, setExamId ] = useState(undefined);

    useEffect(() => {
        const roomId = window.location.href.substring(window.location.href.length-1);
        findRoomByRoomId(roomId).then(e => {
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
                                handleSubmit()
                                return;
                            }
                        }, 1000);
                    }
                },
                (err) => {
                    console.log(err);
                },
            );          
        })
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
        tmp[event.target.name] = {question_id: event.target.name, answer_id: event.target.value, point_per_question: point}
        console.log(tmp);
        setRequestParams(tmp)
    };

    const handleSubmit = () => {
        const array = Object.keys(requestParams).map(function(key) {return requestParams[key];});
        const saveResultRequest = {
            examId: 1,
            userId: 1,
            handleExamRequests: array
        }
        submitExam(saveResultRequest).then(e => {
            console.log(e?.data);
            alert(JSON.stringify(e?.data))
        })
    };


    return (
        <div className="relative w-9/10 mx-auto flex">         
            <div className="w-1/4">
                <label className="text-xl font-bold text-blue-500">Thời gian làm bài:</label>
                <br></br>
                <p>{formatTime(time)}</p>
                {/* <label className="text-xl font-bold text-red-500">{formatTime(time)}</label> */}
            </div>
            <div className="w-3/4">
                <form onSubmit={(e) => 
                    {
                        e.preventDefault();
                        if (!paused) {
                            handleSubmit();
                        }
                        else {
                            alert("Hết thời gian làm bài")
                        }
                    }
                    }>
                    <div>
                        {questions?.map(
                            (question, i) => (
                                <div className="mt-4" key={i}>
                                    <div>
                                        <p>
                                            <b>{question.id}. </b>
                                            <b>{question.content}</b>
                                        </p>
                                    </div>

                                    <div className="flex flex-col">
                                        {question?.answers?.map((answer, i) => {
                                            return (
                                            <label key={i}>
                                                <input type="radio" 
                                                name={question.id} 
                                                value={answer.id} 
                                                onChange={handleCheck} /> 
                                                {answer.content} 
                                            </label>
                                        )})}
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
    );
}

export default Exam;
