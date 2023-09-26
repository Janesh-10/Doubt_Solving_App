import {
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGOUT,
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
} from "../constants/studentConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/students/login",
      { email, password },
      config
    );

    dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: STUDENT_LOGOUT });
};

export const register = (name, email, password, pic) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/students",
      { name, pic, email, password },
      config
    );

    dispatch({ type: STUDENT_REGISTER_SUCCESS, payload: data });

    dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_UPDATE_REQUEST });

    const {
      studentLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/students/profile", user, config);

    dispatch({ type: STUDENT_UPDATE_SUCCESS, payload: data });

    dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
