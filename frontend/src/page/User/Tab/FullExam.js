import { useEffect, useState } from 'react';
import * as questionService from '~/services/questionService';
import * as examService from '~/services/examService';

function FullExam() {
    const [showModal, setShowModal] = useState(false);
    const [examList, setExamList] = useState([]);
    const [examDetail, setExamDetail] = useState();

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const re = await questionService.findQuestionByUserAndCode(1, 1);
    //         console.log(re);
    //     };
    //     fetchApi();
    // }, []);

    useEffect(() => {
        const fetchExam = async () => {
            const re = await examService.findExamByUserId(1);
            setExamList(re?.data);
        };
        fetchExam();
    }, []);
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
                            <div className="flex min-h-screen items-center px-4 py-8">
                                <div className="relative mx-auto  h-[800px] w-full overflow-scroll rounded-md bg-white p-4 shadow-lg">
                                    <table className="!w-full max-w-full text-left text-sm text-gray-500 dark:text-gray-400">
                                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="grid grid-cols-8">
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
                                            <tr className="grid grid-cols-8 border-b bg-white dark:border-gray-700 dark:bg-gray-900">
                                                <th
                                                    scope="row"
                                                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                >
                                                    1
                                                </th>
                                                <td className="col-span-2 px-6 py-4">
                                                    <p>
                                                        This text is in the blue
                                                        color.
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p>
                                                        This text is in the blue
                                                        color.
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p>
                                                        This text is in the blue
                                                        color.
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p>
                                                        This text is in the blue
                                                        color.
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p>
                                                        This text is in the blue
                                                        color.
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p>
                                                        This text is in the blue
                                                        color.
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button
                                        type="button"
                                        className="float-right mb-2 mr-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Đóng
                                    </button>
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
                    {examList?.map((e,index) => (
                        <tr
                            className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                            key={index}
                        >
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
                                    onClick={async() => {
                                        setShowModal(true)
                                        
                                        // await questionService.findQuestionsByExamId(e?.id).then((res)=>{
                                        //     console.log(res)
                                        //     setExamDetail(res?.data)
                                        // })
                                    }}
                                >
                                    Xem
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FullExam;
