import { useEffect, useState } from 'react';

import { getRooms } from '~/services/roomService';
import { useNavigate } from 'react-router-dom';

function ListRoom() {
    const [showModal, setShowModal] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('dbUser'));

    useEffect(() => {
        const fetchExam = async () => {
            const re = await getRooms()
            setRoomList(re?.data);
        };
        fetchExam();
    }, []);
    return (
        <div className="relative w-full max-w-full overflow-x-auto shadow-md sm:rounded-lg">            
            <table className="!w-full max-w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            STT
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tên phòng
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mã phòng
                        </th>                  
                        <th scope="col" className="px-6 py-3">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {roomList?.map((e, index) => (
                        <tr className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800" key={index}>
                            <th
                                scope="row"
                                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                                {e?.id}
                            </th>
                            <td className="px-6 py-4">{e?.name}</td>
                            <td className="px-6 py-4">{e?.code}</td>
                            <td className="px-6 py-4">
                                <button
                                    type="button"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    onClick={() => {
                                      navigate(`/room/id=${e?.id}`);
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

export default ListRoom;
