import axios from "axios";
import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_QUERY_FAIL,
  POST_QUERY_REQUEST,
  POST_QUERY_SUCCESS,
  POST_SOLUTION_FAIL,
  POST_SOLUTION_REQUEST,
  POST_SOLUTION_SUCCESS,
} from "../constants/postConstants";

export const listPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: POST_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/posts/viewposts/${id}`);

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POST_LIST_FAIL,
      payload: message,
    });
  }
};

export const createSolutionAction =
  (id, solution) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_SOLUTION_REQUEST,
      });

      const {
        teacherLogin: { teacherInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${teacherInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/posts/createsolution/${id}`,
        { solution },
        config
      );

      dispatch({
        type: POST_SOLUTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POST_SOLUTION_FAIL,
        payload: message,
      });
    }
  };

export const createQueryAction =
  (id, solution) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_QUERY_REQUEST,
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
        `/api/posts/createquery/${id}`,
        { solution },
        config
      );

      dispatch({
        type: POST_QUERY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POST_QUERY_FAIL,
        payload: message,
      });
    }
  };
