import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function SignIn() {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:8080/api/auth/login', { username, password })
            .then((response) => {
                console.log(response?.data?.data);
                let date = new Date();
                date.setTime(date.getTime()+(24*60*60*1000));
                localStorage.setItem('dbUser', JSON.stringify({
                    idUser: response?.data?.data?.id,
                    email: response?.data?.data?.email,
                    username: response?.data?.data?.name
                }));
                document.cookie = "jwt" + " = " + response?.data?.data?.jwt + "; expires = " +date.toGMTString();
                // localStorage.setItem('dbUser', JSON.stringify(response?.data?.data?.user));
                navigate('/');
            })
            .catch((error) => {
                alert('Sai thông tin đăng nhập');
            });
        // console.log(Username: ${username} Password: ${password});
    };

    return (
        <section className="">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-200 dark:bg-gray-100 sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-black md:text-2xl">
                            Đăng nhập
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="Username"
                                    className="dark:text-gray mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Username
                                </label>
                                <input
                                    name="email"
                                    id="email"
                                    className="focus:ring-primary-600 focus:border-primary-300 dark:text-gray block w-full rounded-sm border border-gray-200 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-100 dark:placeholder-gray-300 dark:focus:border-blue-100 dark:focus:ring-blue-500 sm:text-sm"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="dark:text-gray mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="focus:ring-primary-600 focus:border-primary-300 dark:text-gray block w-full rounded-sm border border-gray-200 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-100 dark:placeholder-gray-300 dark:focus:border-blue-100 dark:focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                            >
                                Đăng nhập
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Bạn chưa có tài khoản?{' '}
                                <a
                                    href="/signup"
                                    className="text-primary-600 font-medium hover:underline dark:text-gray-500"
                                >
                                    Đăng ký ngay
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignIn;
