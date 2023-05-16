import { getCookie } from '~/utils/cookie';
import request from '~/utils/request';

export const getRooms = async () => {
    try {
        const res = await request.get(`/room/getAllRoom`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};
export const addUserToRoom = async (roomId, code) => {
    try {
        const res = await request.post(`/room/addUserToRoom`,{
            room_id: roomId,
            code: code
        }, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res?.data;
    } catch (error) {}
};
export const findRoomByCode = async (code) => {
    try {
        const res = await request.post(`/room/getARoom/${code}`, {}, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};
export const findRoomByRoomId = async (roomId) => {
    try {
        const res = await request.get(`/room/getARoom/${roomId}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};
export const saveRoom = async (name,create_user_id, timeStart, timeEnd, status) => {
    try {
        const res = await request.post(`/room/addARoom`, {
            room_name: name,
            create_user_id:create_user_id,
            start_at: timeStart,
            time: timeEnd,
            status: status,
        }, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};
export const findTimeByExamId = async (examId) => {
    try {
        const res = await request.get(`/room/getTime/${examId}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};


