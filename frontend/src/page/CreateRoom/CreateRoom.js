import { Form, Formik, useFormik } from 'formik';
import moment from 'moment/moment';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import * as questionService from '~/services/questionService';
import * as roomService from '~/services/roomService';
function CreateRoom() {
    const [dataRoom, setDataRoom] = useState();

    const navigate = useNavigate();

    const buttonRef = useRef();

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const re = await questionService.findQuestion();
    //         console.log(re);
    //         setDataRoom(re);
    //     };
    //     fetchApi();
    // }, []);

    const formik = useFormik({
        initialValues: {
            code: '',
            name: '',
            startTime: '',
            endTime: '',
            status: '',
        },
        //Dong 32
        validationSchema: Yup.object({
            name: Yup.string().required('Thông tin bắt buộc'),
            startTime: Yup.string().required('Thông tin bắt buộc'),
            endTime: Yup.string()
                .required('Thông tin bắt buộc')
                .matches(/^[1-9]\d*$/, 'Thời gian kết thúc phải là số'),
            status: Yup.string().required('Thông tin bắt buộc'),
            code: Yup.string()
                .required('Thông tin bắt buộc')
                .matches(/^[1-9]\d*$/, 'Mã đề phải là số')
                // .test(
                //     'checkCode',
                //     'Mã đề không tồn tại',
                //     async function validateCode(value) {
                //         const re = await questionService.findQuestionByCode(
                //             value,
                //         );
                //         if (re === undefined) {
                //             return false;
                //         }
                //         return true;
                //     },
                // ),
        }),
        onSubmit: async (values) => {
            handleDate(new Date(values.startTime));
            await roomService
                .saveRoom(
                    values.name,
                    handleDate(new Date(values.startTime)),
                    values.endTime,
                    values.status,
                )
                .then((response) => {
                    if (response !== null) {
                        notifySuccess('Tạo phòng thành công');
                        buttonRef.current.setAttribute('disabled', true);
                        console.log(response);
                        // setTimeout(() => {
                        //     navigate(`/room/id=${response.data.id}`);
                        // }, 3000);
                    } else {
                        notifyWarning('Tạo phòng thất bại');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

       
        },
    });
    const handleDate = (dt) => {
        const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
        console.log(
            `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(
                dt.getDate(),
            )} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(
                dt.getSeconds(),
            )}`,
        );
        return `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(
            dt.getDate(),
        )} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(
            dt.getSeconds(),
        )}`;
    };
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

    //Dong 41
    return (
        <Formik
            initialValues={formik.initialValues}
            onSubmit={formik.handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            <Form className="mx-auto mt-10 w-full max-w-[1200px]">
                {/* Dong 48    */}
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

                <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                        <label
                            className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-gray-700 "
                            htmlFor="grid-first-name"
                        >
                            Mã đề
                        </label>
                        <input
                            className={
                                formik.touched.code && formik.errors.code
                                    ? 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                    : 'mb-3 block w-full appearance-none rounded border  bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none'
                            }
                            id="code"
                            name="code"
                            type="text"
                            placeholder="KOLA2023"
                            onChange={formik.handleChange}
                            value={formik.values.code}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.code && formik.errors.code ? (
                            <p className="text-left text-xs italic text-red-500">
                                {formik.errors.code}
                            </p>
                        ) : null}
                    </div>

                    {formik.values.code.length > 0 && (
                        <div className="w-full px-3 md:w-1/2">
                            <label
                                className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-gray-700"
                                htmlFor="grid-last-name"
                            >
                                Nhấn vào nút phía dưới để xem nội dung đề thi
                            </label>
                            <button
                                type="button"
                                className="mb-3 block rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold  text-white hover:border-blue-500 hover:bg-blue-400"
                            >
                                Xem nội dung đề thi
                            </button>

                            {/* <input
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe"
                        /> */}
                        </div>
                    )}
                </div>

                <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="w-full px-3 md:w-1/2">
                        <label
                            className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="name"
                        >
                            Tên phòng thi
                        </label>

                        <input
                            className={
                                formik.touched.name && formik.errors.name
                                    ? 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                    : 'block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white  focus:outline-none'
                            }
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            placeholder="Thi giữa kỳ"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <p className="text-left text-xs italic text-red-500">
                                {formik.errors.name}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className="-mx-3 mb-2 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                        <label
                            className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-city"
                        >
                            Thời gian bắt đầu
                        </label>
                        <input
                            className={
                                formik.touched.startTime &&
                                formik.errors.startTime
                                    ? 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                    : 'block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                            }
                            id="startTime"
                            name="startTime"
                            type="datetime-local"
                            onChange={formik.handleChange}
                            value={formik.values.startTime}
                            onBlur={formik.handleBlur}
                            placeholder="Albuquerque"
                        />
                        {formik.touched.startTime && formik.errors.startTime ? (
                            <p className="text-left text-xs italic text-red-500">
                                {formik.errors.startTime}
                            </p>
                        ) : null}
                    </div>

                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                        <label
                            className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-zip"
                        >
                            Thời gian kết thúc
                        </label>
                        <input
                            className={
                                formik.touched.endTime && formik.errors.endTime
                                    ? 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                    : 'block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                            }
                            name="endTime"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.endTime}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.endTime && formik.errors.endTime ? (
                            <p className="text-left text-xs italic text-red-500">
                                {formik.errors.endTime}
                            </p>
                        ) : null}
                    </div>
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                        <label
                            className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-state"
                        >
                            Trạng thái
                        </label>
                        <div className="relative">
                            <select
                                className={
                                    formik.touched.status &&
                                    formik.errors.status
                                        ? 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                        : 'block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                                }
                                id="status"
                                name="status"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.status}
                            >
                                <option value="">--Chọn trạng thái--</option>
                                <option value="OPEN">Mở</option>
                                <option value="CLOSE">Đóng</option>
                            </select>
                            {formik.touched.status && formik.errors.status ? (
                                <p className="text-left text-xs italic text-red-500">
                                    {formik.errors.status}
                                </p>
                            ) : null}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                        <button
                            ref={buttonRef}
                            type="submit"
                            className="mb-3 mt-6 block rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
                        >
                            Tạo phòng
                        </button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}

export default CreateRoom;
