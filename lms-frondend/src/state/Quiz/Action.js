import { api } from "../../config/api";
import { ADD_QUESTION_FAILURE, ADD_QUESTION_REQUEST, ADD_QUESTION_SUCCESS, CREATE_QUIZ_FAILURE, CREATE_QUIZ_REQUEST, CREATE_QUIZ_SUCCESS, GET_QUIZ_BY_ID_FAILURE, GET_QUIZ_BY_ID_REQUEST, GET_QUIZ_BY_ID_SUCCESS } from "./ActionType"

export const createQuiz = (jwt, quizData) => async (dispatch) => {
    dispatch({ type: CREATE_QUIZ_REQUEST });
    try {
        const { data } = await api.post(`api/quiz/create`, quizData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: CREATE_QUIZ_SUCCESS, payload: data });
        console.log("Quiz created:", data);
    } catch (err) {
        dispatch({ type: CREATE_QUIZ_FAILURE, payload: err.message });
        console.error("❌ Error creating quiz:", err.message);
    }
}

export const addQuestion = (jwt, quizId, question) => async (dispatch) => {
    dispatch({ type: ADD_QUESTION_REQUEST });
    try {
        const { data } = await api.post(`/api/quiz/add/${quizId}`, question, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: ADD_QUESTION_SUCCESS, payload: data });
        console.log("Quiz add successfully:", data);
    } catch (err) {
        dispatch({ type: ADD_QUESTION_FAILURE, payload: err.message });
        console.error("❌ Error adding questions:", err.message);
    }
};

export const getQuizById = (quizId) => async (dispatch) => {
    dispatch({ type: GET_QUIZ_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/quiz/${quizId}`);
        dispatch({ type: GET_QUIZ_BY_ID_SUCCESS, payload: data });
        console.log("Get quiz successfully", data);
    } catch (err) {
        dispatch({ type: GET_QUIZ_BY_ID_FAILURE, payload: err.message });
        console.log("Error from get quiz", data);
    }
};

