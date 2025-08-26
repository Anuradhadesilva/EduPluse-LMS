import { CREATE_PROGRAM_FAILURE, CREATE_PROGRAM_REQUEST, CREATE_PROGRAM_SUCCESS, DELETE_PROGRAM_FAILURE, DELETE_PROGRAM_REQUEST, DELETE_PROGRAM_SUCCESS, ENROLL_PROGRAM_FAILURE, ENROLL_PROGRAM_REQUEST, ENROLL_PROGRAM_SUCCESS, GET_ENROLLED_PROGRAMS_FAILURE, GET_ENROLLED_PROGRAMS_REQUEST, GET_ENROLLED_PROGRAMS_SUCCESS, GET_PROGRAM_FAILURE, GET_PROGRAM_REQUEST, GET_PROGRAM_SUCCESS, GET_PROGRAMS_FAILURE, GET_PROGRAMS_REQUEST, GET_PROGRAMS_SUCCESS, GET_STUDENTS_BY_PROGRAM_FAILURE, GET_STUDENTS_BY_PROGRAM_REQUEST, GET_STUDENTS_BY_PROGRAM_SUCCESS, UNENROLL_PROGRAM_FAILURE, UNENROLL_PROGRAM_REQUEST, UNENROLL_PROGRAM_SUCCESS, UPDATE_PROGRAM_FAILURE, UPDATE_PROGRAM_REQUEST, UPDATE_PROGRAM_SUCCESS } from "./ActionType"


const initialState = {
    programs: [],
    enrolled: [],
    selectedProgram: {},
    students: [],
    isLoading: false,
    error: null,
    success: null
}

export const programReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROGRAMS_REQUEST:
        case GET_PROGRAM_REQUEST:
        case CREATE_PROGRAM_REQUEST:
        case UPDATE_PROGRAM_REQUEST:
        case DELETE_PROGRAM_REQUEST:
        case ENROLL_PROGRAM_REQUEST:
        case UNENROLL_PROGRAM_REQUEST:
        case GET_ENROLLED_PROGRAMS_REQUEST:
        case GET_STUDENTS_BY_PROGRAM_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case GET_PROGRAMS_SUCCESS:
            return {
                ...state,
                loading: false,
                programs: action.payload
            };
        case GET_PROGRAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedProgram: action.payload
            };
        case CREATE_PROGRAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                programs: [...state.programs, action.payload],
            };
        case UPDATE_PROGRAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                programs: state.programs.map((p) =>
                    p.id === action.payload.id ? action.payload : p
                ),
                selectedProgram: action.payload,
            };
        case DELETE_PROGRAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                programs: state.programs.filter((p) => p.id !== action.payload),
            };
        case ENROLL_PROGRAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                enrolled: [...state.enrolled, action.payload]
            };
        case UNENROLL_PROGRAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                enrolled: state.enrolled.filter(e => e.program.id !== action.payload)
            };
        case GET_ENROLLED_PROGRAMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                enrolled: action.payload
            };
        case GET_STUDENTS_BY_PROGRAM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                students: action.payload
            };

        case GET_PROGRAMS_FAILURE:
        case GET_PROGRAM_FAILURE:
        case CREATE_PROGRAM_FAILURE:
        case UPDATE_PROGRAM_FAILURE:
        case DELETE_PROGRAM_FAILURE:
        case ENROLL_PROGRAM_FAILURE:
        case UNENROLL_PROGRAM_FAILURE:
        case GET_ENROLLED_PROGRAMS_FAILURE:
        case GET_STUDENTS_BY_PROGRAM_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case "CLEAR_ENROLLED":
            return {
                ...state,
                enrolled: []
            };
        default:
            return state;
    }
}