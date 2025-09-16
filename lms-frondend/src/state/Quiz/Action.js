import { api } from "../../config/api";
import quizData from "../../constants/quizData";
import { GET_STUDENTS_BY_PROGRAM_FAILURE, UPDATE_PROGRAM_REQUEST } from "../Program/ActionType";
import { ADD_QUESTION_FAILURE, ADD_QUESTION_REQUEST, ADD_QUESTION_SUCCESS, CREATE_QUIZ_FAILURE, CREATE_QUIZ_REQUEST, CREATE_QUIZ_SUCCESS, DELETE_QUIZ_FAILURE, DELETE_QUIZ_REQUEST, DELETE_QUIZ_SUCCESS, GET_IN_PROGRESS_ATTEMPT_FAILURE, GET_IN_PROGRESS_ATTEMPT_REQUEST, GET_IN_PROGRESS_ATTEMPT_SUCCESS, GET_QUIZ_BY_ID_FAILURE, GET_QUIZ_BY_ID_REQUEST, GET_QUIZ_BY_ID_SUCCESS, GET_SUBMISSIONS_BY_USER_FAILURE, GET_SUBMISSIONS_BY_USER_REQUEST, GET_SUBMISSIONS_BY_USER_SUCCESS, SAVE_QUIZ_PROGRESS_FAILURE, SAVE_QUIZ_PROGRESS_REQUEST, SAVE_QUIZ_PROGRESS_SUCCESS, SUBMIT_QUIZ_FAILURE, SUBMIT_QUIZ_REQUEST, SUBMIT_QUIZ_SUCCESS, UPDATE_QUIZ_FAILURE, UPDATE_QUIZ_REQUEST, UPDATE_QUIZ_SUCCESS } from "./ActionType"

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

export const updateQuiz = (jwt, quizId, quizData) => async (dispatch) => {
    dispatch({ type: UPDATE_QUIZ_REQUEST });
    try {
        const { data } = await api.put(`/api/quiz/update/${quizId}`, quizData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: UPDATE_QUIZ_SUCCESS, payload: data });
        console.log("✅ Quiz updated:", data);
    } catch (err) {
        dispatch({ type: UPDATE_QUIZ_FAILURE, payload: err.message });
        console.error("❌ Error updating quiz:", err.message);
    }
};



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


export const deleteQuiz = (jwt, id) => async (dispatch) => {
    dispatch({ type: DELETE_QUIZ_REQUEST });
    try {
        await api.delete(`/api/quiz/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("✅ Quiz deleted:", id);
        dispatch({ type: DELETE_QUIZ_SUCCESS, payload: id });
    } catch (err) {
        console.error("❌ Error deleting Quiz:", err.message);
        dispatch({ type: DELETE_QUIZ_FAILURE, payload: err.message });
    }
};

export const submitQuiz = (jwt, submissionData) => async (dispatch) => {
    dispatch({ type: SUBMIT_QUIZ_REQUEST });
    try {
        const { data } = await api.post(`/api/submission/submit`, submissionData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: SUBMIT_QUIZ_SUCCESS, payload: data });
        console.log("✅ Quiz answer Submitted:", data);
    } catch (err) {
        dispatch({ type: SUBMIT_QUIZ_FAILURE, payload: err.message });
        console.error("❌ Error Submitting Quiz:", err.message);
    }
}

export const getUserSubmissions = (userId) => async (dispatch) => {
    dispatch({ type: GET_SUBMISSIONS_BY_USER_REQUEST });
    try {
        const { data } = await api.get(`/api/submission/user/${userId}`);
        dispatch({ type: GET_SUBMISSIONS_BY_USER_SUCCESS, payload: data });
        console.log("✅ get submitted answers:", data);
    } catch (err) {
        dispatch({ type: GET_SUBMISSIONS_BY_USER_FAILURE, payload: err.message });
        console.error("❌ Error getting Submitted Quiz:", err.message);
    }
};

// ====================== NEW ACTIONS FOR IN-PROGRESS ATTEMPTS ======================

export const saveQuizProgress = (jwt, progressData) => async (dispatch) => {
    dispatch({ type: SAVE_QUIZ_PROGRESS_REQUEST });
    try {
        await api.post(`/api/quiz/attempts/save-progress`, progressData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: SAVE_QUIZ_PROGRESS_SUCCESS });
    } catch (error) {
        console.error("❌ Failed to save progress:", error);
        dispatch({ type: SAVE_QUIZ_PROGRESS_FAILURE, payload: error.message });
    }
};

export const getInProgressAttempt = (jwt, quizId) => async (dispatch) => {
    dispatch({ type: GET_IN_PROGRESS_ATTEMPT_REQUEST });
    try {
        const { data } = await api.get(`/api/quiz/attempts/in-progress/${quizId}`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        dispatch({ type: GET_IN_PROGRESS_ATTEMPT_SUCCESS, payload: data });
    } catch (error) {
        // A 404 error is expected if no attempt exists, so we don't treat it as a failure.
        if (error.response?.status !== 404) {
            console.error("❌ Could not fetch in-progress attempt:", error);
            dispatch({ type: GET_IN_PROGRESS_ATTEMPT_FAILURE, payload: error.message });
        } else {
            // If not found, dispatch success with a null payload to clear any old data
            dispatch({ type: GET_IN_PROGRESS_ATTEMPT_SUCCESS, payload: null });
        }
    }
};