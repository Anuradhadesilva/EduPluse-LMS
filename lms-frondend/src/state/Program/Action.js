import axios from "axios";
import { ENROLL_PROGRAM_FAILURE, ENROLL_PROGRAM_REQUEST, ENROLL_PROGRAM_SUCCESS, GET_ENROLLED_PROGRAMS_FAILURE, GET_ENROLLED_PROGRAMS_REQUEST, GET_ENROLLED_PROGRAMS_SUCCESS, GET_PROGRAM_FAILURE, GET_PROGRAM_REQUEST, GET_PROGRAM_SUCCESS, GET_PROGRAMS_FAILURE, GET_PROGRAMS_REQUEST, GET_PROGRAMS_SUCCESS, UNENROLL_PROGRAM_FAILURE, UNENROLL_PROGRAM_REQUEST, UNENROLL_PROGRAM_SUCCESS } from "./ActionType"
import { api, API_URL } from "../../config/api";

export const getAllPrograms = () => async (dispatch) => {
    dispatch({ type: GET_PROGRAMS_REQUEST });
    try {
        const response = await api.get(`/api/program`);
        console.log("✅ Programs fetched:", response.data);

        dispatch({
            type: GET_PROGRAMS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error("❌ Failed to fetch programs:", error);
        dispatch({
            type: GET_PROGRAMS_FAILURE,
            payload: error.message,
        });
    }
};

export const getProgramById = (id) => async (dispatch) => {
    dispatch({ type: GET_PROGRAM_REQUEST });
    try {
        const response = await api.get(`/api/program/${id}`);
        console.log("✅ Program fetched:", response.data);
        dispatch({
            type: GET_PROGRAM_SUCCESS,
            payload: response.data,
        })
    } catch (error) {
        console.error("❌ Failed to fetch program:", error);
        dispatch({
            type: GET_PROGRAM_FAILURE,
            payload: error.message,
        });
    }
}

export const enrollProgram = (jwt, programId) => async (dispatch) => {
    dispatch({ type: ENROLL_PROGRAM_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_URL}/api/users/enroll/${programId}`,
            {},
            { headers: { Authorization: `Bearer ${jwt}` } }
        );
        console.log("✅ Enrolled in program:", data);
        dispatch({ type: ENROLL_PROGRAM_SUCCESS, payload: data });
    } catch (err) {
        console.error("❌ Error enrolling program:", err.message);
        dispatch({ type: ENROLL_PROGRAM_FAILURE, payload: err.message });
    }
};

// 🔹 Unenroll from program
export const unenrollProgram = (jwt, programId) => async (dispatch) => {
    dispatch({ type: UNENROLL_PROGRAM_REQUEST });
    try {
        await axios.delete(
            `${API_URL}/api/users/enroll/delete/${programId}`,
            { headers: { Authorization: `Bearer ${jwt}` } }
        );
        console.log("✅ Unenrolled from program:", programId);
        dispatch({ type: UNENROLL_PROGRAM_SUCCESS, payload: programId });
    } catch (err) {
        console.error("❌ Error unenrolling program:", err.message);
        dispatch({ type: UNENROLL_PROGRAM_FAILURE, payload: err.message });
    }
};

// 🔹 Get my enrolled programs
export const getEnrolledPrograms = (jwt) => async (dispatch) => {
    dispatch({ type: GET_ENROLLED_PROGRAMS_REQUEST });
    try {
        const { data } = await api.get(`api/users/enroll/getAll`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("✅ Enrolled programs fetched:", data);
        dispatch({ type: GET_ENROLLED_PROGRAMS_SUCCESS, payload: data });
    } catch (err) {
        console.error("❌ Error fetching enrolled programs:", err.message);
        dispatch({ type: GET_ENROLLED_PROGRAMS_FAILURE, payload: err.message });
    }
};

// ======================= ADMIN ACTIONS =======================

// 🔹 Create program
export const createProgram = (jwt, programData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PROGRAM_REQUEST });
        const { data } = await axios.post(`${API}`, programData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("✅ Program created:", data);
        dispatch({ type: CREATE_PROGRAM_SUCCESS, payload: data });
    } catch (err) {
        console.error("❌ Error creating program:", err.message);
        dispatch({ type: CREATE_PROGRAM_FAILURE, payload: err.message });
    }
};

// 🔹 Update program
export const updateProgram = (jwt, id, programData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROGRAM_REQUEST });
        const { data } = await axios.put(`${API}/${id}`, programData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("✅ Program updated:", data);
        dispatch({ type: UPDATE_PROGRAM_SUCCESS, payload: data });
    } catch (err) {
        console.error("❌ Error updating program:", err.message);
        dispatch({ type: UPDATE_PROGRAM_FAILURE, payload: err.message });
    }
};

// 🔹 Delete program
export const deleteProgram = (jwt, id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PROGRAM_REQUEST });
        await axios.delete(`${API}/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("✅ Program deleted:", id);
        dispatch({ type: DELETE_PROGRAM_SUCCESS, payload: id });
    } catch (err) {
        console.error("❌ Error deleting program:", err.message);
        dispatch({ type: DELETE_PROGRAM_FAILURE, payload: err.message });
    }
};

// 🔹 Get students enrolled in a program
export const getStudentsByProgram = (jwt, programId) => async (dispatch) => {
    try {
        dispatch({ type: GET_STUDENTS_BY_PROGRAM_REQUEST });
        const { data } = await axios.get(`${API}/${programId}/students`, {
            headers: { Authorization: `Bearer ${jwt}` },
        });
        console.log("✅ Students fetched for program:", data);
        dispatch({ type: GET_STUDENTS_BY_PROGRAM_SUCCESS, payload: data });
    } catch (err) {
        console.error("❌ Error fetching students:", err.message);
        dispatch({ type: GET_STUDENTS_BY_PROGRAM_FAILURE, payload: err.message });
    }
};

