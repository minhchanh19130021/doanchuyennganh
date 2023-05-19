import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEnvelope } from '@fortawesome/fontawesome-free-solid';
import { faLock } from '@fortawesome/fontawesome-free-solid';
import React, { useEffect, useState } from 'react';
import * as accountService from '~/services/accountService';
import { NavLink } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

function SignUp() {
    const [users, setUsers] = useState({
        username: '',
        email: '',
        password: '',
    });

    const formInput = {
        boxShadow: 'none',
        border: 'none',
        borderLeft: '1px solid #dee2e6',
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setUsers({
            ...users,
            [evt.target.name]: value,
        });
    };

    const formIcon = {
        border: 'none',
    };

    const p ={
        color: "#d41a1a",
        fontSize: "15px",
        margin: "-23px 0 30px 0"
    }

    const InputGroup = {
        border: '1px solid #dee2e6',
        padding:0,
        borderRadius: '8px',
    };

    const formik = useFormik({
        initialValues: {
          username: "",
          email: "",
          password: "",
        },
        validationSchema: Yup.object({
          username: Yup.string()
            .min(2, "Độ dài tối thiếu 2 kí tự")
            .max(15, "Độ dài tối đa 50 kí tự")
            .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, 'Tên người dùng chỉ được chứa chữ cái và chữ số')
            .required("Vui lòng nhập thông tin!"),
          email: Yup.string()
            .email("Vui lòng nhập đúng định dạng email!")
            .required("Vui lòng nhập email!"),
          password: Yup.string()
            .min(4, "Nhập tối thiểu 4 kí tự")
            .required("Vui lòng nhập thông tin!"),
        }),
        onSubmit: values => {
          accountService.register(values);
        }
      });
    return (
        <div className="container">
            <div className="row py-3 mt-4 align-items-center">
                {/* For Demo Purpose */}
                <div className="col-md-5 pr-lg-8 mb-8 mb-md-12">
                    <img
                        src="https://myaloha.vn/pages/mainpage/img/img_product_4.png"
                        alt=""
                        className="img-fluid d-none d-md-block mb-3"
                    />
                </div>

                {/* Registeration Form */}
                <div className="col-md-5 col-lg-6 ml-auto mb-6 ">
                    <h2 className="h2 text-center">Đăng ký thành viên</h2>
                        <form onSubmit={formik.handleSubmit}>
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
                        <div className="row">
                            {/* Username*/}
                            <div className="input-group col-lg-10 mb-4" style={InputGroup}>
                                <span className="input-group-text bg-white py-3 px-3 border-md" style={formIcon}>
                                    <FontAwesomeIcon icon="fa-solid fa-user" />
                                </span>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    placeholder="Họ và tên"
                                    style={formInput}
                                    className="form-control bg-white border-left-0 border-md"
                                />
                            </div>
                            {formik.errors.username && formik.touched.username && (<p style={p}>{formik.errors.username}</p>)}

                            {/* Email*/}
                            <div className="input-group col-lg-10 mb-4" style={InputGroup}>
                                <span className="input-group-text bg-white py-3 px-3 border-md" style={formIcon}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    placeholder="Email"
                                    style={formInput}
                                    className="form-control bg-white border-left-0 border-md"
                                />
                            </div>
                            {formik.errors.email && formik.touched.email && (<p style={p}>{formik.errors.email}</p>)}

                            {/* Password */}
                            <div className="input-group col-lg-6 mb-8" style={InputGroup}>
                                <span className="input-group-text bg-white py-3 px-3 border-md" style={formIcon}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    style={formInput}
                                    placeholder="Mật khẩu"
                                    className="form-control bg-white border-left-0 border-md"
                                />
                            </div>
                            {formik.errors.password && formik.touched.password && (<p style={p}>{formik.errors.password}</p>)}

                            {/* Submit Button */}
                            <div className="form-group col-lg-12 text-center mx-auto mb-0 mt-4">
                                <button type="submit" className="btn btn-primary text-white bg-primary px-8 ">
                                    <span className="font-weight-bold ">Đăng kí</span>
                                </button>
                            </div>
                           
                            {/* Divider Text */}
                            <div className="form-group col-lg-12 d-flex align-items-center mx-auto my-4">
                                <div className="border-bottom w-100 ml-5" />
                                <span className="small text-muted font-weight-bold text-muted px-2">HOẶC</span>
                                <div className="border-bottom w-100 mr-5" />
                            </div>

                            {/* Already Registered */}
                            <div className="w-100 text-center">
                                <p className="text-muted font-weight-bold">
                                    Đã đăng ký?{' '}
                                    <a href="#" className="text-primary ml-2 ">
                                        {' '}
                                        <NavLink to="/signin">Đăng Nhập</NavLink>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
