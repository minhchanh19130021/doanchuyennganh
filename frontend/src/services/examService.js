import { getCookie } from '~/utils/cookie';
import request from '~/utils/request';

export const getExams = async () => {
    try {
        const res = await request.get(`api/exam/getExams`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const findExamById = async (id) => {
    try {
        const res = await request.get(`api/exam/getExam/${id}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        }, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
export const findExamByUserId = async (userId) => {
    try {
        const res = await request.get(`api/exam/findExamsByUserId/${userId}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const addExam = async (
    title,
    idUserCreate,
    totalNumberOfQuestionsInExam,
) => {
    try {
        const res = await request.post(`api/exam/createExam`, {
            title,
            idUserCreate,
            totalNumberOfQuestionsInExam,
        }, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res?.data;
    } catch (error) {
        console.log(error); // delete when deploy
    }
};
export const deleteExam = async (examId) => {
    try {
        const res = await request.delete(`api/exam/deleteExam/${examId}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        });
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const edit = async (tmp, title, examId) => {
    try {
        const res = await request.put(`api/exam/edit`, {
            id: examId,
            title: title,
            questionIdListToAdd: tmp?.add,
            questionIdListToDelete: tmp?.delete}, 
            {
                headers: {
                    Authorization: `Bearer ${getCookie("jwt")}`,
                },
            });
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const submitExam = async (examRequests) => {
    try {
        const res = await request.post('/api/exam-handle', examRequests, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        })
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};


export const isUserAllowedEnterRoom = async (userId, roomId) => {
    try {
        const res = await request.get(`/api/exam/isUserAllowedEnterRoom/${userId}/${roomId}`, {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        })
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
