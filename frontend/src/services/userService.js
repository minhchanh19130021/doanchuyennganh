import request from '~/utils/request';

export const findUserById = async (uid) => {
    try {
        const res = await request.get(`/api/auth/findUser/${uid}`);
        return res.data;
    } catch (error) {}
};