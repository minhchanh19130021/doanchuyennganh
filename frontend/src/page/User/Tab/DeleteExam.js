import { useEffect, useState } from 'react';
import * as examService from '~/services/examService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function DeleteExam() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [examList, setExamList] = useState([]);
    const [examId, setExamId] = useState();
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
    const notifyWarning = (msg) => {
        toast.warning(msg, {
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
    return (
        <div className="relative w-full max-w-full overflow-x-auto shadow-md sm:rounded-lg">
            <>
                {showModal ? (
                    <>
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="fixed inset-0 h-full w-full bg-black opacity-40"
                                onClick={() => setShowModal(false)}
                            ></div>
                             <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                            <div className="flex min-h-screen items-center px-4 py-8">
                                <div className="relative mx-auto rounded-md bg-white p-4 shadow-lg">
                                    <h1 className="text-center text-xl">
                                        Bạn có chắc chắn muốn xóa sản phẩm này ?
                                    </h1>
                                    <div className="flex items-center justify-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                                        <button
                                            type="button"
                                            className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={async() => {
                                                await examService.deleteExam(examId).then((res)=>{
                                                    console.log(res)
                                                    if(res?.status === 200){
                                                        // notifySuccess("Xóa thành công")
                                                        setShowModal(false)
                                                        navigate(0);
                                                    }else{
                                                        notifyWarning("Xóa thất bại")
                                                    }
                                                })
                                            }}
                                        >
                                            Xóa
                                        </button>
                                        <button
                                            type="button"
                                            className="mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Hủy
                                        </button>
                                    </div>
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
                {examList?.map((e,index) => 
                        <tr key={index}>
                            <th
                                scope="row"
                                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                                {e?.id}
                            </th>
                            <td className="px-6 py-4">
                                {e?.title}
                            </td>
                           
                            <td className="px-6 py-4">
                                {e?.questionnaires.length}
                            </td>
                            <td className="px-6 py-4">
                                {e?.auditInfo?.createDate.slice(0, 10)}
                            </td>
                            <td className="px-6 py-4">
                            <button
                                type="button"
                                className="font-medium text-red-600 hover:underline dark:text-red-500"
                                onClick={() => {
                                    setShowModal(true);
                                    setExamId(e?.id)
                                }}
                            >
                                Xóa
                            </button>
                            </td>
                        </tr>
                    )}
                   
                </tbody>
            </table>
        </div>
    );
}

export default DeleteExam;
