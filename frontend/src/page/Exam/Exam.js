import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let seconds = Math.floor(time - min * 60);
    if (min <= 10) min = '0' + min;
    if (seconds <= 10) seconds = '0' + seconds;
    return min + ':' + seconds;
}

function Exam() {
    const [questions, setQuestions] = useState([]);
    const [time, setTime] = useState(7);
    const [timerId, setTimerId] = useState(null);
    // const timerId = useRef();
    // const [handleExamRequest , setHandleExamRequest]
    // const exameRequest = new Array(questions.length);

    const size = questions.length;
    const examRequest = { idQuestion: 0, answer: '', pointPerQuestion: 0 };
    const examRequests = new Array(size).fill(examRequest).map((er, index) => {
        return {
            ...er, idQuestion: 0, answer: '', pointPerQuestion: 1
        };
    });


    useEffect(() => {
        // Thiết lập timer
        const id = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);

        if (this.time <= 0) {
            alert("hetgio")
            axios.post('http://localhost:8080/api/exam-handle', examRequests).then(response => {
                console.log(response.data);
            })
                .catch(error => {
                    console.log(error);
                });
        }

        // Lưu lại ID của timer để có thể clear nó sau này
        setTimerId(id);

        // Clear timer khi component unmount hoặc khi time <= 0
        return () => {
            clearInterval(timerId);
        };


    }, []);




    useEffect(() => {
        axios
            .get('http://localhost:8080/api/questionnaire/getQuestionsByExamId/1')
            .then((response) => {
                // console.log(response?.data.data)
                setQuestions(response.data.data);
                console.log(questions);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleCheck = (event) => {
        console.log(event.target.value);
        // alert(event.target.name);
        examRequests[event.target.name - 1].idQuestion = event.target.name;
        examRequests[event.target.name - 1].answer = event.target.value;
        console.log(examRequests[event.target.name - 1]);
        console.log(examRequests);
    };

    const handleSubmit = async (e) => {
        console.log(examRequests);
        e.preventDefault();
        await axios.post('http://localhost:8080/api/exam-handle', examRequests).then(response => {
            console.log(response.data);
        })
            .catch(error => {
                console.log(error);
            });

    }

    return (
        <div className='  flex w-9/10 mx-auto'>

            <div className='w-1/4'>
                <label className='text-xl text-blue-500 font-bold'>Thời gian làm bài:</label><br></br>
                <label className='text-xl text-red-500 font-bold'>{formatTime(time)}</label>

            </div>
            <div className='w-3/4'>
                <form onSubmit={handleSubmit}>
                    <div >
                        {questions.map((question) =>

                            <div className='mt-4'>
                                <div>
                                    <p><b>{question.id}. </b><b>{question.content}</b></p>
                                </div>

                                <div className='flex flex-col'>
                                    {question.answers.map((answer) =>
                                        <label><input type="radio" key={answer.id} name={question.id} value={answer.content} onChange={handleCheck} /> {answer.content} </label>
                                    )}
                                </div>
                            </div>

                            // <Question key={question.id} id={question.id} no={question.id} content={question.content} answers={question.answers} />
                        )}
                    </div>
                    <button type='submit' className='mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Nộp bài</button>
                </form>

            </div>


        </div>
    )

}

export default Exam;
