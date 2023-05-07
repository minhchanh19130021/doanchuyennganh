import React, { useEffect, useState } from 'react';
import * as examService from '~/services/examService';
import * as Yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
function AddExam() {
    const [showModal, setShowModal] = useState(false);
    const formik = useFormik({
        initialValues: {
            title: '',
            numberQuestion: '',
        },

        validationSchema: Yup.object({
            title: Yup.string().required('Thông tin bắt buộc'),
            numberQuestion: Yup.string()
                .required('Thông tin bắt buộc')
                .matches(/^[1-9]\d*$/, 'Mã đề phải là số'),
        }),
        onSubmit: async (values) => {
            await examService
                .addExam(values.title, 1, values.numberQuestion)
                .then((re) => {
                    if (re !== null && re !== undefined) {
                        values.title ="";
                        values.numberQuestion =""
                        notifySuccess('Tạo đề thành công');
                    } else {
                        notifyWarning('Tạo đề thất bại. Do số lượng câu hỏi vượt quá mức so với ngân hàng câu hỏi');
                    }
                });
        },
    });
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
        <>
            <form className="w-full max-w-full">
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
            </form>
            <Formik
                initialValues={formik.initialValues}
                onSubmit={formik.handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                <Form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md w-full max-w-full">
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
                    <div className="mb-4">
                        <label
                            className="mb-2 block text-sm font-bold text-gray-700"
                            htmlFor="title"
                        >
                            Tiêu đề
                        </label>
                        <input
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            id="title"
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            onBlur={formik.handleBlur}
                        />
                         {formik.touched.title && formik.errors.title ? (
                            <p className="text-left text-xs italic text-red-500">
                                {formik.errors.title}
                            </p>
                        ) : null}
                    </div>

                    <div className="mb-6">
                        <label
                            className="mb-2 block text-sm font-bold text-gray-700"
                            htmlFor="numberQuestion"
                        >
                           Số câu trong đề
                        </label>
                        <input
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            id="numberQuestion"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.numberQuestion}
                            onBlur={formik.handleBlur}
                        />
                         {formik.touched.numberQuestion && formik.errors.numberQuestion ? (
                            <p className="text-left text-xs italic text-red-500">
                                {formik.errors.numberQuestion}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                            type="submit"
                        >
                            Tạo đề
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default AddExam;
