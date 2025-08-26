import {
    CREATE_QUIZ_REQUEST,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAILURE,
    ADD_QUESTION_REQUEST,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILURE,
    GET_QUIZ_BY_ID_REQUEST,
    GET_QUIZ_BY_ID_SUCCESS,
    GET_QUIZ_BY_ID_FAILURE,
    GET_QUIZZES_BY_PROGRAM_REQUEST,
    GET_QUIZZES_BY_PROGRAM_SUCCESS,
    GET_QUIZZES_BY_PROGRAM_FAILURE,
    SUBMIT_QUIZ_REQUEST,
    SUBMIT_QUIZ_SUCCESS,
    SUBMIT_QUIZ_FAILURE,
    GET_SUBMISSIONS_BY_USER_REQUEST,
    GET_SUBMISSIONS_BY_USER_SUCCESS,
    GET_SUBMISSIONS_BY_USER_FAILURE,
} from "./ActionType";

const initialState = {
    quizzes: [],
    selectedQuiz: null,
    submissions: [],
    submissionResult: null,
    isLoading: false,
    error: null,
};

export const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        // ========== Create Quiz ==========
        case CREATE_QUIZ_REQUEST:
        case ADD_QUESTION_REQUEST:
        case GET_QUIZ_BY_ID_REQUEST:
        case GET_QUIZZES_BY_PROGRAM_REQUEST:
        case SUBMIT_QUIZ_REQUEST:
        case GET_SUBMISSIONS_BY_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case CREATE_QUIZ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizzes: [...state.quizzes, action.payload]
            };

        case ADD_QUESTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedQuiz: {
                    ...state.selectedQuiz,
                    questions: [...(state.selectedQuiz?.questions || []),
                    action.payload],
                },
            };

        case GET_QUIZ_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedQuiz: action.payload
            };

        case GET_QUIZZES_BY_PROGRAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizzes: action.payload
            };

        case SUBMIT_QUIZ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                submissionResult: action.payload
            };

        case GET_SUBMISSIONS_BY_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                submissions: action.payload
            };

        case CREATE_QUIZ_FAILURE:
        case ADD_QUESTION_FAILURE:
        case GET_QUIZ_BY_ID_FAILURE:
        case GET_QUIZZES_BY_PROGRAM_FAILURE:
        case SUBMIT_QUIZ_FAILURE:
        case GET_SUBMISSIONS_BY_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
