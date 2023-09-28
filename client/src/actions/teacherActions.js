import axios from "axios";
import {
  TEACHER_LOGIN_FAIL,
  TEACHER_LOGIN_REQUEST,
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGOUT,
  TEACHER_REGISTER_FAIL,
  TEACHER_REGISTER_REQUEST,
  TEACHER_REGISTER_SUCCESS,
} from "../constants/teacherConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/teachers/login",
      { email, password },
      config
    );

    dispatch({ type: TEACHER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("teacherInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: TEACHER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("teacherInfo");
  dispatch({ type: TEACHER_LOGOUT });
};

export const register =
  (name, email, password, pic, subjects) => async (dispatch) => {
    try {
      dispatch({ type: TEACHER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/teachers",
        { name, pic, email, password, subjects },
        config
      );

      dispatch({ type: TEACHER_REGISTER_SUCCESS, payload: data });

      dispatch({ type: TEACHER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("teacherInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: TEACHER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
