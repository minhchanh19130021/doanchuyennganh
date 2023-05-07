import { useEffect, useState } from 'react';
import * as examService from '~/services/examService';
function EditExam() {
    const [showModal, setShowModal] = useState(false);
    const [examList, setExamList] = useState([]);
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
                                                type="text"
                                                id="last_name"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
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
                                                    <textarea
                                                        id="message"
                                                        rows={2}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <textarea
                                                        id="message"
                                                        rows={2}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <textarea
                                                        id="message"
                                                        rows={2}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <textarea
                                                        id="message"
                                                        rows={2}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <textarea
                                                        id="message"
                                                        rows={2}
                                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <select
                                                            id="countries"
                                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                        >
                                                            <option
                                                                defaultValue={
                                                                    'A'
                                                                }
                                                            >
                                                                A
                                                            </option>
                                                            <option value="B">
                                                                B
                                                            </option>
                                                            <option value="C">
                                                                C
                                                            </option>
                                                            <option value="D">
                                                                D
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button
                                        type="button"
                                        className="float-right mb-2 mr-2 mt-6 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                                    >
                                        Tạo Đề Thi
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
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    onClick={() => setShowModal(!showModal)}
                                >
                                    Sửa
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EditExam;
