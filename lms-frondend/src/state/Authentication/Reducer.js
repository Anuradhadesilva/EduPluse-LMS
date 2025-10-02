
import { CLEAR_AUTH_ERROR, GET_ALL_STUDENTS_FAILURE, GET_ALL_STUDENTS_REQUEST, GET_ALL_STUDENTS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
const initialState = {
    user: null,
    students: [],
    jwt: null,
    role: null,
    isLoading: false,
    error: null,
    success: null,
    courses: [],
    myEnrollments: [],
    quizResults: []
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GET_ALL_STUDENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                success: null
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                user: action.payload.user,
                role: action.payload.role,     // here payload = jwt // read role back in
                success: "Auth Success",
            }

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,       // ✅ gets filled
                success: "Get User Success",
            }
        case GET_ALL_STUDENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                students: action.payload,
                success: "Get All Student Success",
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case GET_ALL_STUDENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            };

        case LOGOUT:
            return {
                ...initialState
            };
        case CLEAR_AUTH_ERROR: // Add this new case to handle clearing the error
            return { ...state, error: null };
        default:
            return state;
    }
}
