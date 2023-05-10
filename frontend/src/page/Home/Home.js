import { useEffect, useState } from 'react';
import * as roomService from '~/services/roomService';
import axios from 'axios';

function Home() {
    const [dataRoom, setDataRoom] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const re = await roomService.findRoomByCode();
            setDataRoom(re);
        };
        fetchApi();
    }, []);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                console.log(response?.data)
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="mx-auto max-w-[1200px]">
            <h1 className="mt-6 text-center text-xl font-bold">Danh sách tài khoản đang hoạt động trên hệ thống</h1>
            <table className="mt-6 w-[1200px] table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Mã sinh viên</th>
                        <th className="px-4 py-2">Họ tên</th>
                        <th className="px-4 py-2">Địa chỉ email</th>
                        <th className="px-4 py-2">Tên tài khoản</th>
                        <th className="px-4 py-2">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((e) => (
                        <tr key={e.id}>
                            <td className="border px-4 py-2">NLU45{e.id}2019 </td>
                            <td className="border px-4 py-2">{e.name}</td>
                            <td className="border px-4 py-2">{e.email}</td>
                            <td className="border px-4 py-2">{e.username}</td>
                            <td className="flex justify-center border px-4 py-2">
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    Đang hoạt động
                                </span>
                                {/* <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    Đang làm bài
                                </span> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
