import { getCookie } from '~/utils/cookie';
import request from '~/utils/request';

export const findQuestionsByExamId = async (examId) => {
    try {
        const res = await request.get(
            `api/questionnaire/getQuestionnaireByExamId/${examId}`, {
                headers: {
                    Authorization: `Bearer ${getCookie("jwt")}`,
                },
            },
        );
        return res?.data;
    } catch (error) {
        console.log(error?.response?.data); // delete when deploy
    }
};
