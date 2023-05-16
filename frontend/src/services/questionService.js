import { getCookie } from '~/utils/cookie';
import request from '~/utils/request';
export const findQuestionByCode = async (code) => {
    try {
        const res = await request.get(`/api/questionnaire/getQuestionnaireByCode/${code}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};
export const findQuestionByExamId = async (examId) => {
    try {
        const res = await request.get(`/api/questionnaire/getQuestionnaireByExamId/${examId}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};

export const findQuestionByUserAndCode = async (userId, code) => {
    try {
        const res = await request.get(`/api/questionnaire/getQuestionsByUserIdAndCode/${userId}/${code}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};
export const findQuestionsByExamId = async (examId) => {
    try {
        const res = await request.get(`/api/questionnaire/findQuestionsByExamId/${examId}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};

export const getAllQuestions = async () => {
    try {
        const res = await request.get(`/api/question/getAll`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res.data;
    } catch (error) {}
};
