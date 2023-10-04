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

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const solutionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_SOLUTION_REQUEST:
      return { loading: true };
    case POST_SOLUTION_SUCCESS:
      return { loading: false, success: true };
    case POST_SOLUTION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const queryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_QUERY_REQUEST:
      return { loading: true };
    case POST_QUERY_SUCCESS:
      return { loading: false, success: true };
    case POST_QUERY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
