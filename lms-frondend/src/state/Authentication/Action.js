import axios from "axios";
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { api, API_URL } from "../../config/api";

export const registerUser = (reqData) => async dispatch => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);

        // Store in localStorage
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        if (data.role) {
            localStorage.setItem("role", data.role);
        }

        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                jwt: data.jwt,
                user: data.user,
                role: data.role
            }
        });

        console.log("Register success", data);
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.response?.data || error.message });
        console.error("Register error", error);
    }
};