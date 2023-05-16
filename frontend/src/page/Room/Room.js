import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as roomService from '~/services/roomService';
function Room() {
    const [dataRoom, setDataRoom] = useState();
    const { id } = useParams();
    const handleId = id.split('=')[1];

    useEffect(() => {
        const fetchApi = async () => {
            console.log(id);
            const re = await roomService.findRoomByRoomId(handleId);
            setDataRoom(re?.data);
            console.log(re);
        };
        fetchApi();
    }, [handleId]);
    return (
        <div className="mx-auto max-w-[1200px]">
            <div className="mt-6 flex w-[1200px] max-w-full items-center justify-between rounded-lg border border-gray-400">
                <div title="Woman holding a mug ">
                    <img src="https://www.questpond.com/img/2.png" alt="" className="h-[300px]" />
                </div>
                <div className="flex flex-col justify-between rounded-b   p-4 leading-normal  ">
                    <div className="mb-8">
                        <p className="flex items-center text-sm text-gray-600">
                            <svg
                                className="mr-2 h-3 w-3 fill-current text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            Trạng thái phòng: {dataRoom?.status}
                        </p>
                        <div className="mb-2 text-xl font-bold text-gray-900">Tên phòng: {dataRoom?.name}</div>
                        <p className="text-base text-gray-700">Thời gian bắt đầu làm bài: {dataRoom?.startAt}</p>
                        <p className="text-base text-gray-700">Thời gian thu bài: {dataRoom?.seconds}</p>
                        <div className="mt-6 flex items-center">
                            <img
                                className="mr-4 h-10 w-10 rounded-full"
                                src="https://v1.tailwindcss.com/img/jonathan.jpg"
                                alt="Avatar of Jonathan Reinink"
                            />
                            <div className="text-sm">
                                <p className="mb-2 leading-none text-gray-900">
                                    Mã chủ phòng: {dataRoom?.auditInfo?.changeUserId}
                                </p>
                                <p className="mb-2 text-gray-600">Mã phòng: {dataRoom?.id}</p>
                                <p className="mb-2 text-gray-600">Mã tham gia: {dataRoom?.code}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <table className="mt-6 w-[1200px] table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Mã sinh viên</th>
                        <th className="px-4 py-2">Họ tên</th>
                        <th className="px-4 py-2">Địa chỉ email</th>
                        <th className="px-4 py-2">Tên tài khoản</th>
                        <th className="px-4 py-2">Trạng thái làm bài</th>
                    </tr>
                </thead>
                <tbody>
                    {dataRoom?.map((e) => (
                        <tr key={e.id}>
                            <td className="border px-4 py-2">{e.id} </td>
                            <td className="border px-4 py-2">{e.name}</td>
                            <td className="border px-4 py-2">{e.email}</td>
                            <td className="border px-4 py-2">{e.username}</td>
                            <td className="flex justify-center border px-4 py-2">
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    Hoàn thành bài thi
                                </span>
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    Đang làm bài
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <div className="flex justify-end">
                <button className="mx-2 mt-6 rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400">
                    Xuất bảng điểm (pdf)
                </button>
                <button className=" hover:bg-blue-red mt-6 rounded border-b-4 border-red-700 bg-red-500 px-4 py-2 font-bold text-white hover:border-red-500">
                    Thoát
                </button>
            </div>
        </div>
    );
}

export default Room;
