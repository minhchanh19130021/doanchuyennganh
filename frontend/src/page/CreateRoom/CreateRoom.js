import { Form, Formik, useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import * as examService from '~/services/examService';
import * as roomService from '~/services/roomService';
import * as questionService from '~/services/questionService';
function CreateRoom() {
    // const [dataRoom, setDataRoom] = useState();

    // const navigate = useNavigate();

    const buttonRef = useRef();
    const [examList, setExamList] = useState([]);
    const [examDetail, setExamDetail] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }
        return () => {
            document.documentElement.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    useEffect(() => {
        const fetchExam = async () => {
            const re = await examService.findExamByUserId(1);
            setExamList(re?.data);
        };
        fetchExam();
    }, []);
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
        validationSchema: Yup.object({
            name: Yup.string().required('Thông tin bắt buộc'),
            startTime: Yup.string().required('Thông tin bắt buộc'),
            endTime: Yup.string()
                .required('Thông tin bắt buộc')
                .matches(/^[1-9]\d*$/, 'Thời gian kết thúc phải là số'),
            status: Yup.string().required('Thông tin bắt buộc'),
            code: Yup.string()
                .required('Thông tin bắt buộc')
                .matches(/^[1-9]\d*$/, 'Mã đề phải là số'),
        }),
        onSubmit: async (values) => {
            handleDate(new Date(values.startTime));
            await roomService
                .saveRoom(values.name, handleDate(new Date(values.startTime)), values.endTime, values.status)
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
    useEffect(() => {
        const fetchApi = async () => {
            if (formik.values.code.length > 0) {
                const re = await questionService.findQuestionByExamId(formik.values.code);
                setExamDetail(re?.data);
                console.log(re);
            }
        };
        fetchApi();
    }, [formik.values.code]);
    const handleDate = (dt) => {
        const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
        console.log(
            `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(
                dt.getMinutes(),
            )}:${padL(dt.getSeconds())}`,
        );
        return `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(
            dt.getMinutes(),
        )}:${padL(dt.getSeconds())}`;
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
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
                            <div className="relative top-1/2 mx-auto w-full max-w-screen max-h-screen -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute right-0 top-0 my-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    Đóng
                                </button>

                                <div className="mt-5">
                                    <div className="flex items-center px-4 py-8">
                                        <div className="relative mx-auto  w-full ove rounded-md bg-white p-4 shadow-lg">
                                            <table className=" text-left text-sm text-gray-500 dark:text-gray-400">
                                                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr className="grid grid-cols-8">
                                                        <th scope="col" className="px-6 py-3">
                                                            Số thứ tự
                                                        </th>
                                                        <th scope="col" className="col-span-2 px-6 py-3">
                                                            Nội dung câu hỏi
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Đáp án A
                                                        </th>

                                                        <th scope="col" className="px-6 py-3">
                                                            Đáp án B
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Đáp án C
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Đáp án D
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Đáp án đúng
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="h-[100px] overflow-hidden">
                                                    {examDetail?.sort((a,b)=>a.id-b.id)?.map((e) => {
                                                        const isTrue = e?.answers?.find((a) => a?.correct === true);
                                                        console.log(isTrue);
                                                        return (
                                                            <tr
                                                                key={e?.id}
                                                                className="grid grid-cols-8 border-b bg-white dark:border-gray-700 dark:bg-gray-900"
                                                            >
                                                                <th
                                                                    scope="row"
                                                                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    {e?.id}
                                                                </th>
                                                                <td className="col-span-2 px-6 py-4">
                                                                    <p>{e?.content}</p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p>{e?.answers[0]?.content}</p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p>{e?.answers[1]?.content}</p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p>{e?.answers[2]?.content}</p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p>{e?.answers[3]?.content}</p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p>{isTrue?.content}</p>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                            {/* <button
                                        type="button"
                                        className="float-right mb-2 mr-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Đóng
                                    </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                        <label
                            className="mb-2 block text-left text-xs font-bold uppercase tracking-wide text-gray-700 "
                            htmlFor="grid-first-name"
                        >
                            Mã đề
                        </label>
                        <select
                            id="code"
                            name="code"
                            onChange={formik.handleChange}
                            value={formik.values.code}
                            onBlur={formik.handleBlur}
                            className={
                                formik.touched.code && formik.errors.code
                                    ? 'focus:shadow-input transition-basic h-12 w-full  rounded-lg  border border-[#ff4742] bg-[#eaf0f7] px-4 py-1 outline-none focus:border-[#ff4742]'
                                    : 'mb-3 block w-full appearance-none rounded border  bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none'
                            }
                        >
                            <option value="">Chọn mã đề</option>
                            {examList?.map((e) => (
                                <option value={e?.id} key={e?.id}>
                                    {e?.id} - {e?.title} - {e?.auditInfo?.createDate?.slice(0, 10)}
                                </option>
                            ))}
                        </select>
                        {/* <input
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
                            /> */}

                        {formik.touched.code && formik.errors.code ? (
                            <p className="text-left text-xs italic text-red-500">{formik.errors.code}</p>
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
                                onClick={() => setIsOpen(true)}
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
                            <p className="text-left text-xs italic text-red-500">{formik.errors.name}</p>
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
                                formik.touched.startTime && formik.errors.startTime
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
                            <p className="text-left text-xs italic text-red-500">{formik.errors.startTime}</p>
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
                            <p className="text-left text-xs italic text-red-500">{formik.errors.endTime}</p>
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
                                    formik.touched.status && formik.errors.status
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
                                <p className="text-left text-xs italic text-red-500">{formik.errors.status}</p>
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
