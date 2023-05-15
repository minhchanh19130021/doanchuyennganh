import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';

function PasswordUser() {
    const [userInfo, setUserInfo] = useState([]);
    const user = JSON.parse(localStorage.getItem('dbUser'));
    useEffect(() => {
        const fetchApi = async () => {
            const re = await userService.findUserById(user?.idUser);
            setUserInfo(re?.data);
        };
        fetchApi();
    }, []);
    return (
        <form>
            <div>
                <div>
                    <p>Tên tài khoản</p>
                    <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="mb-6 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        defaultValue={userInfo?.username}
                        disabled
                    />
                </div>
                <div>
                    <p>Địa chỉ email</p>
                    <input
                        type="text"
                        id="disabled-input"
                        aria-label="disabled input"
                        className="mb-6 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        defaultValue={userInfo?.email}
                        disabled
                    />
                </div>
               
            </div>
        </form>
    );
}

export default PasswordUser;
