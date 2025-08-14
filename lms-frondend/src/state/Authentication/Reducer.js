
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
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
            return { ...state, isLoading: true, error: null }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload.jwt,
                user: action.payload.user,
                role: action.payload.role
            };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
