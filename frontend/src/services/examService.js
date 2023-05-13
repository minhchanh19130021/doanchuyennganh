import request from '~/utils/request';

export const getExams = async () => {
    try {
        const res = await request.get(`api/exam/getExams`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const findExamById = async (id) => {
    try {
        const res = await request.get(`api/exam/getExam/${id}`);
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
export const findExamByUserId = async (userId) => {
    try {
        const res = await request.get(`api/exam/findExamsByUserId/${userId}`);
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
        });
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
export const deleteExam = async (examId) => {
    try {
        const res = await request.delete(`api/exam/deleteExam/${examId}`);
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
            questionIdListToDelete: tmp?.delete});
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};

export const submitExam = async (examRequests) => {
    try {
        const res = await request.post('/api/exam-handle', examRequests)
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
