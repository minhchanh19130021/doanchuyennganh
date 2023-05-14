import request from '~/utils/request';

export const getRooms = async () => {
    try {
        const res = await request.get(`/room/getAllRoom`);
        return res.data;
    } catch (error) {}
};
export const addUserToRoom = async (roomId, code) => {
    try {
        const res = await request.post(`/room/addUserToRoom`,{
            room_id: roomId,
            code: code
        });
        return res?.data;
    } catch (error) {}
};
export const findRoomByCode = async (code) => {
    try {
        const res = await request.post(`/room/getARoom/${code}`);
        return res.data;
    } catch (error) {}
};
export const findRoomByRoomId = async (roomId) => {
    try {
        const res = await request.get(`/room/getARoom/${roomId}`);
        return res.data;
    } catch (error) {}
};
export const saveRoom = async (name, timeStart, timeEnd, status) => {
    try {
        const res = await request.post(`/room/addARoom`, {
            room_name: name,
            start_at: timeStart,
            time: timeEnd,
            status: status,
        });
        return res.data;
    } catch (error) {}
};
export const findTimeByExamId = async (examId) => {
    try {
        const res = await request.get(`/room/getTime/${examId}`);
        return res.data;
    } catch (error) {}
};


