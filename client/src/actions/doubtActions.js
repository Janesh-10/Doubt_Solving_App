import axios from "axios";
import {
  DOUBT_CREATE_FAIL,
  DOUBT_CREATE_REQUEST,
  DOUBT_CREATE_SUCCESS,
  DOUBT_DELETE_FAIL,
  DOUBT_DELETE_REQUEST,
  DOUBT_DELETE_SUCCESS,
  DOUBT_LIST_FAIL,
  DOUBT_LIST_REQUEST,
  DOUBT_LIST_SUCCESS,
  DOUBT_TEACHER_LIST_FAIL,
  DOUBT_TEACHER_LIST_REQUEST,
  DOUBT_TEACHER_LIST_SUCCESS,
  DOUBT_UPDATESOLVE_FAIL,
  DOUBT_UPDATESOLVE_REQUEST,
  DOUBT_UPDATESOLVE_SUCCESS,
  DOUBT_UPDATEUNSOLVE_FAIL,
  DOUBT_UPDATEUNSOLVE_REQUEST,
  DOUBT_UPDATEUNSOLVE_SUCCESS,
  DOUBT_UPDATE_FAIL,
  DOUBT_UPDATE_REQUEST,
  DOUBT_UPDATE_SUCCESS,
} from "../constants/doubtConstants";

export const listDoubts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOUBT_LIST_REQUEST,
    });

    const {
      studentLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/doubts`, config);

    dispatch({
      type: DOUBT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DOUBT_LIST_FAIL,
      payload: message,
    });
  }
};

export const createDoubtAction =
  (title, description, subject) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOUBT_CREATE_REQUEST,
      });

      const {
        studentLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/doubts/create`,
        { title, description, subject },
        config
      );

      dispatch({
        type: DOUBT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DOUBT_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateDoubtAction =
  (id, title, description, subject) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOUBT_UPDATE_REQUEST,
      });

      const {
        studentLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/doubts/${id}`,
        { title, description, subject },
        config
      );

      dispatch({
        type: DOUBT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DOUBT_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteDoubtAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOUBT_DELETE_REQUEST,
    });

    const {
      studentLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/doubts/${id}`, config);

    dispatch({
      type: DOUBT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DOUBT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const listTeacherDoubts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOUBT_TEACHER_LIST_REQUEST,
    });

    const {
      teacherLogin: { teacherInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${teacherInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/doubts/teacherdoubts`, config);

    dispatch({
      type: DOUBT_TEACHER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DOUBT_TEACHER_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateDoubtSolveAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOUBT_UPDATESOLVE_REQUEST,
    });

    const {
      studentLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/doubts/solved/${id}`, {}, config);
    dispatch({
      type: DOUBT_UPDATESOLVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DOUBT_UPDATESOLVE_FAIL,
      payload: message,
    });
  }
};

export const updateDoubtUnsolveAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOUBT_UPDATEUNSOLVE_REQUEST,
    });

    const {
      studentLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/doubts/unsolved/${id}`, {}, config);

    dispatch({
      type: DOUBT_UPDATEUNSOLVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DOUBT_UPDATEUNSOLVE_FAIL,
      payload: message,
    });
  }
};
