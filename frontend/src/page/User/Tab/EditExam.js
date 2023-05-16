import { useEffect, useState } from 'react';
import QuestionInEditExam from '~/layouts/components/QuestionInEdit/QuestionInEdit';
import * as examService from '~/services/examService';
import { getAllQuestions } from '~/services/questionService';
import * as questionnaireService from '~/services/questionnaireService';
import { ToastContainer, toast } from 'react-toastify';

function EditExam() {
    const [showModal, setShowModal] = useState(false);
    const [examList, setExamList] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [addQuestions, setAddQuestions] = useState([]);
    const [deleteQuestions, setDeleteQuestions] = useState([]);
    const [questionIdsToSubmit, setQuestionIdsToSubmit] = useState([]);
    const [examId, setExamId] = useState();
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('dbUser'));
    useEffect(() => {
        const fetchExam = async () => {
            const re = await examService.findExamByUserId(user?.idUser);
            setExamList(re?.data);
        };
        fetchExam();
    }, []);

    const notifySuccess = (msg) => {
        toast.success(msg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    function showAllQuestions() {
        getAllQuestions().then(
            (e) => {
                const re = e?.data?.filter((q) => !questionIdsToSubmit.includes(q?.id));
                setAllQuestions(re);
                setShowAddQuestionModal(true);
            },
            (err) => {},
        );
    }

    function getQuestions(examId, title) {
        setTitle(title);
        setExamId(examId);
        questionnaireService.findQuestionsByExamId(examId).then(
            (e) => {
                setQuestions(e?.data);
                setQuestionIdsToSubmit(e?.data?.map(q => q?.id));              
            },
            () => {
                alert('not found this exam');
            },
        );
        setShowModal(!showModal);
    }

    function handleSubmit() {
        let questionIdListToAdd = [...addQuestions]?.map(q => q?.id);
        const questionIdListToDelete = [...deleteQuestions]?.map(q => q?.id);        
        questionIdListToAdd = questionIdListToAdd.filter(q => !questionIdListToDelete?.includes(q))
        const tmp = {add: questionIdListToAdd, delete: questionIdListToDelete}
        examService.edit(tmp, title, examId).then(e => {
            setQuestions(e?.data);
            setShowAddQuestionModal(false);
            setQuestionIdsToSubmit(e?.data?.map(q => q?.id))
            setDeleteQuestions([]);
            setAddQuestions([]);        
            notifySuccess('Thay đổi đề thi thành công');  
        }, () => {
            notifySuccess('Thay đổi đề thi thất bại');  
        })
    }

    return (
        <div className="relative w-full max-w-full overflow-x-auto shadow-md sm:rounded-lg border">
            <>
                {showModal ? (
                    <>
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 h-full w-full bg-black opacity-40"
                                onClick={() => setShowModal(false)}
                            ></div>
                            <div className="flex min-h-screen items-center px-4 py-8">
                                <div className="relative mx-auto  h-[800px] w-full overflow-scroll rounded-md bg-white p-4 shadow-lg">
                                    <div className="mb-8 grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="first_name"
                                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Mã đề
                                            </label>
                                            <input
                                                type="text"
                                                id="first_name"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="last_name"
                                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Tên đề thi
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                                value={title}
                                                type="text"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <table className="!w-full max-w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="grid grid-cols-9">
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Chọn
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Số thứ tự
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="col-span-2 px-6 py-3"
                                                >
                                                    Nội dung câu hỏi
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Đáp án A
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Đáp án B
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Đáp án C
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Đáp án D
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Đáp án đúng
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="h-[100px] overflow-hidden">
                                            {questions?.sort((a,b)=>a.id-b.id)?.map((e, i) => {
                                                return (
                                                    <QuestionInEditExam
                                                        key={i}
                                                        question={e}
                                                        type="xóa"
                                                        questions={questions}
                                                        setQuestions={
                                                            setQuestions
                                                        }
                                                        addQuestions={
                                                            addQuestions
                                                        }
                                                        setAddQuestions={
                                                            setAddQuestions
                                                        }
                                                        deleteQuestions={
                                                            deleteQuestions
                                                        }
                                                        setDeleteQuestions={
                                                            setDeleteQuestions
                                                        }
                                                    ></QuestionInEditExam>
                                                );
                                            })}
                                        </tbody>
                                    </table>                                   
                                   <div className="flex w-full justify-end mt-5"> 
                                   <button
                                        onClick={() => {
                                            if (!showAddQuestionModal) {
                                                showAllQuestions();
                                            }
                                        }}
                                        type="button"
                                        className="float-right mb-2 mr-2 mt-6 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                                    >
                                        Thêm câu hỏi
                                    </button>
                                    <button 
                                        type='button'
                                        className="float-right mb-2 mr-2 mt-6 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                                        onClick={()=>{
                                            handleSubmit()
                                    }}>
                                        Lưu
                                    </button>
                                    </div>
                                    {showAddQuestionModal ? <div className="z-50 w-full border p-2">
                <p className="text-2xl text-gray-900 dark:text-white">Thêm câu hỏi từ bộ đề thi</p>
                <table className="bg-[rgb(169,169,169)] my-2">
                    <tbody>
                        {allQuestions.map((e, i) => {
                            return (
                                <QuestionInEditExam
                                    key={i}
                                    question={e}
                                    type="chọn"
                                    questions={questions}
                                    setQuestions={setQuestions}
                                    addQuestions={addQuestions}
                                    setAddQuestions={setAddQuestions}
                                    deleteQuestions={deleteQuestions}
                                    setDeleteQuestions={setDeleteQuestions}
                                ></QuestionInEditExam>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-end w-full my-3"><button
                    onClick={() => {
                        setQuestions([...questions, ...addQuestions]);
                        setShowAddQuestionModal(false)
                    }}
                    className="rounded-full bg-blue-400 px-6 py-2 text-white hover:bg-blue-600 hover:text-white-900"
                >
                    Hủy
                </button>
                <button
                    onClick={() => {
                        setQuestions([...questions, ...addQuestions]);
                        setShowAddQuestionModal(false)
                    }}
                    className="rounded-full bg-blue-400 px-6 py-2 text-white hover:bg-blue-600 hover:text-white-900 mx-2"
                >
                    Thêm
                </button></div>                
            </div>: null}            
                                </div>                                                       
                            </div>                                   
                        </div>
                        
                    </>
                ) : null}
            </>                   
            <table className="!w-full max-w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Mã đề
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tên Đề
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Số câu
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ngày tạo đè
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {examList?.map((e, index) => (
                        <tr key={index}>
                            <th
                                scope="row"
                                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                                {e?.id}
                            </th>
                            <td className="px-6 py-4">{e?.title}</td>

                            <td className="px-6 py-4">
                                {e?.questionnaires.length}
                            </td>
                            <td className="px-6 py-4">
                                {e?.auditInfo?.createDate.slice(0, 10)}
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    type="button"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    onClick={() =>
                                        getQuestions(e?.id, e?.title)
                                    }
                                >
                                    Sửa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>            
        </div>
    );
}

export default EditExam;
