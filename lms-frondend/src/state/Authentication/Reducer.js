
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
const initialState = {
    user: null,
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
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Register Success"
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                success: "Get User  Success",
            }
        // case REGISTER_SUCCESS:
        // case LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         jwt: action.payload.jwt,
        //         user: action.payload.user,
        //         role: action.payload.role
        //     };

        // case GET_USER_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         user: action.payload.user,
        //         jwt: action.payload.jwt,
        //         role: action.payload.role,
        //         success: "Get User  Success",
        //     }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            };

        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
