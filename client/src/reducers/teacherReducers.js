import {
  TEACHER_LOGIN_FAIL,
  TEACHER_LOGIN_REQUEST,
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGOUT,
  TEACHER_REGISTER_FAIL,
  TEACHER_REGISTER_REQUEST,
  TEACHER_REGISTER_SUCCESS,
  TEACHER_UPDATE_FAIL,
  TEACHER_UPDATE_REQUEST,
  TEACHER_UPDATE_SUCCESS,
} from "../constants/teacherConstants";

export const teacherLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_LOGIN_REQUEST:
      return { loading: true };
    case TEACHER_LOGIN_SUCCESS:
      return { loading: false, teacherInfo: action.payload };
    case TEACHER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case TEACHER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const teacherRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_REGISTER_REQUEST:
      return { loading: true };
    case TEACHER_REGISTER_SUCCESS:
      return { loading: false, teacherInfo: action.payload };
    case TEACHER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teacherUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_UPDATE_REQUEST:
      return { loading: true };
    case TEACHER_UPDATE_SUCCESS:
      return { loading: false, teacherInfo: action.payload, success: true };
    case TEACHER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
