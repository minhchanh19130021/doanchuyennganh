import request from '~/utils/request';
import { getCookie } from '~/utils/cookie';

export const findUserById = async (uid) => {
    try {
        const res = await request.get(`/api/auth/findUser/${uid}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            }
        });
        return res.data;
    } catch (error) {}
};