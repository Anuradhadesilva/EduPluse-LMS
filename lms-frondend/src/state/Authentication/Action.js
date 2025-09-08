import axios from "axios";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { api, API_URL } from "../../config/api";

export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_URL}/auth/signup`,
            reqData.userData
        );
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role) localStorage.setItem("role", data.role);

        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("register succcess", data);
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error });
        console.log("error", error);

    }
};

export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_URL}/auth/signin`,
            reqData.userData
        );
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role) localStorage.setItem("role", data.role);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));


        reqData.navigate("/");
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("login success", data);
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
        console.log("error", error);
    }
};

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: GET_USER_SUCCESS, payload: data
        });
        console.log("user profile", data);
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error });
        console.log("error", error);
    }
};
export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("logout success");
    } catch (error) {
        console.log("error", error);
    }
};
