import request from "~/utils/request";
import {getCookie} from "~/utils/cookie";

export const exportToPDF = async (roomId, examId) => {
    try {
        const res = await request.post(`/api/export/pdf`,{
            room_id: roomId,
            exam_id: examId
        }, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res?.data;
    } catch (error) {}
};