import Card from '~/components/Card/Card';
import { useEffect, useState } from 'react';
import * as roomService from '~/services/roomService';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RoomList() {
    const [stateJoin, setStateJoin] = useState();
    const [idRoom, setIdRoom] = useState('');
    const [codeJoin, setCodeJoin] = useState('');
    const [roomList, setRoomList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await roomService.getRooms();
            setRoomList(response?.data);
        };
        fetchApi();
        // axios
        //     .get('https://jsonplaceholder.typicode.com/posts')
        //     .then((response) => {
        //         setRoomList(response?.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }, []);

    // useEffect(() => {
    //     const fetch = async () => {
    //         const response = await roomService.addUserToRoom(1, 'pLyj');
    //         console.log(response);
    //     };
    //     fetch();
    // }, []);
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
        <div className="max-w-full">
            <div className="mx-auto max-w-[1200px]">
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
                <p className="py-2 text-3xl font-bold text-gray-900 dark:text-white">Danh sách phòng thi</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {roomList?.map((room) => (
                        <div
                            className="cursor-pointer border-[#333] transition-all hover:-translate-y-1"
                            key={room?.id}
                            onMouseEnter={() => {
                                setIdRoom(room?.id);
                            }}
                        >
                            <Card
                                nameRoom={`Phòng Thi ${room?.id}`}
                                idRoom={`NLU${room?.id}`}
                                time={`${Math.ceil(room?.seconds / 60)} phút`}
                                numberQuestion="20"
                                status={`${room?.status}`}
                            >
                                <div>
                                    <label
                                        htmlFor="first_name"
                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Mã tham gia
                                    </label>
                                    <input
                                        type="text"
                                        id="code"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
                                        placeholder="Nhập mã tham gia"
                                        required
                                        onChange={(e) => {
                                            setCodeJoin(e.target.value);
                                            setIdRoom(room?.id);

                                            console.log(codeJoin);
                                        }}
                                        // value={codeJoin}
                                    />
                                </div>
                                <button
                                    to="#"
                                    className="mt-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={async () => {
                                        // const re =   await roomService.addUserToRoom(1,'pLyj');

                                        const responseRoomId = await roomService
                                            .findRoomByRoomId(idRoom)
                                            .then((room) => {
                                                if (room.data?.status === 'OPEN') {
                                                    roomService
                                                        .addUserToRoom(idRoom, codeJoin)
                                                        .then((result) => {
                                                            if (result?.status === 400) {
                                                                notifyWarning('Vào phòng thất bại');
                                                            }
                                                            if (result?.status === 200) {
                                                                // notifySuccess('Vào phòng thành công');
                                                                navigate(`/exam/${room?.data?.id}`);
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            console.log(error);
                                                        });
                                                    // axios
                                                    //     .get(`https://jsonplaceholder.typicode.com/posts/${codeJoin}`)
                                                    //     .then((response) => {
                                                    //         console.log(response?.data);
                                                    //         if (response.data === undefined) {
                                                    //             notifySuccess('Vào phòng thành công');
                                                    //         } else {
                                                    //             notifyWarning('Mã tham gia không chính xác');
                                                    //         }
                                                    //     })
                                                    //     .catch((error) => {
                                                    //         console.log(error);
                                                    //     });
                                                } else {
                                                    notifyWarning('Phòng chưa được mở');
                                                }
                                            });
                                    }}
                                >
                                    Tham Gia
                                    <svg
                                        aria-hidden="true"
                                        className="-mr-1 ml-2 h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RoomList;
