import {
  DOUBT_LIST_REQUEST,
  DOUBT_LIST_SUCCESS,
  DOUBT_LIST_FAIL,
  DOUBT_CREATE_REQUEST,
  DOUBT_CREATE_SUCCESS,
  DOUBT_CREATE_FAIL,
  DOUBT_UPDATE_REQUEST,
  DOUBT_UPDATE_SUCCESS,
  DOUBT_UPDATE_FAIL,
  DOUBT_DELETE_REQUEST,
  DOUBT_DELETE_SUCCESS,
  DOUBT_DELETE_FAIL,
  DOUBT_TEACHER_LIST_REQUEST,
  DOUBT_TEACHER_LIST_SUCCESS,
  DOUBT_TEACHER_LIST_FAIL,
  DOUBT_UPDATESOLVE_REQUEST,
  DOUBT_UPDATESOLVE_SUCCESS,
  DOUBT_UPDATESOLVE_FAIL,
  DOUBT_UPDATEUNSOLVE_REQUEST,
  DOUBT_UPDATEUNSOLVE_SUCCESS,
  DOUBT_UPDATEUNSOLVE_FAIL,
} from "../constants/doubtConstants";

export const doubtListReducer = (state = { doubts: [] }, action) => {
  switch (action.type) {
    case DOUBT_LIST_REQUEST:
      return { loading: true };
    case DOUBT_LIST_SUCCESS:
      return { loading: false, doubts: action.payload };
    case DOUBT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const doubtCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOUBT_CREATE_REQUEST:
      return { loading: true };
    case DOUBT_CREATE_SUCCESS:
      return { loading: false, success: true };
    case DOUBT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const doubtUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOUBT_UPDATE_REQUEST:
      return { loading: true };
    case DOUBT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case DOUBT_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const doubtDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOUBT_DELETE_REQUEST:
      return { loading: true };
    case DOUBT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DOUBT_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const doubtTeacherListReducer = (
  state = { teacherdoubts: [] },
  action
) => {
  switch (action.type) {
    case DOUBT_TEACHER_LIST_REQUEST:
      return { loading: true };
    case DOUBT_TEACHER_LIST_SUCCESS:
      return { loading: false, teacherdoubts: action.payload };
    case DOUBT_TEACHER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const doubtUpdateSolveReducer = (state = {}, action) => {
  switch (action.type) {
    case DOUBT_UPDATESOLVE_REQUEST:
      return { loading: true };
    case DOUBT_UPDATESOLVE_SUCCESS:
      return { loading: false, success: true };
    case DOUBT_UPDATESOLVE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const doubtUpdateUnsolveReducer = (state = {}, action) => {
  switch (action.type) {
    case DOUBT_UPDATEUNSOLVE_REQUEST:
      return { loading: true };
    case DOUBT_UPDATEUNSOLVE_SUCCESS:
      return { loading: false, success: true };
    case DOUBT_UPDATEUNSOLVE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
