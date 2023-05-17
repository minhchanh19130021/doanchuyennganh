import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEnvelope } from '@fortawesome/fontawesome-free-solid';
import { faLock } from '@fortawesome/fontawesome-free-solid';
import React, { useEffect, useState } from 'react';
import * as accountService from '~/services/accountService';
import { NavLink } from 'react-router-dom';

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

    const InputGroup = {
        border: '1px solid #dee2e6',
        padding: 0,
        borderRadius: '8px',
    };

    function Registere() {
        let a = accountService.register(users);
    }
    return (
        <div className="container">
            <div className="row align-items-center mt-4 py-3">
                {/* For Demo Purpose */}
                <div className="col-md-5 pr-lg-8 mb-md-12 mb-8">
                    <img
                        src="https://myaloha.vn/pages/mainpage/img/img_product_4.png"
                        alt=""
                        className="img-fluid d-none d-md-block mb-3"
                    />
                </div>

                {/* Registeration Form */}
                <div className="col-md-5 col-lg-6 mb-6 ml-auto ">
                    <h2 className="h2 text-center">Đăng ký thành viên</h2>
                    <form action="#">
                        <div className="row">
                            {/* Username*/}
                            <div className="input-group col-lg-10 mb-4" style={InputGroup}>
                                <span className="input-group-text border-md bg-white px-3 py-3 " style={formIcon}>
                                    <FontAwesomeIcon icon="fa-solid fa-user" />
                                </span>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    placeholder="Họ và tên"
                                    style={formInput}
                                    className="form-control border-left-0 border-md bg-white"
                                />
                            </div>

                            {/* Email*/}
                            <div className="input-group col-lg-10 mb-4" style={InputGroup}>
                                <span className="input-group-text border-md bg-white px-3 py-3 " style={formIcon}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="Email"
                                    style={formInput}
                                    className="form-control border-left-0 border-md bg-white"
                                />
                            </div>

                            {/* Password */}
                            <div className="input-group col-lg-6 mb-8" style={InputGroup}>
                                <span className="input-group-text border-md bg-white px-3 py-3 " style={formIcon}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    style={formInput}
                                    placeholder="Mật khẩu"
                                    className="form-control border-left- border-md bg-white"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="form-group col-lg-12 mx-auto mb-0 text-center">
                                <a href="#" className="btn btn-primary btn-block px-8 " onClick={Registere}>
                                    <span className="font-weight-bold ">Đăng kí</span>
                                </a>
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
