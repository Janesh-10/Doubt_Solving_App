import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  studentLoginReducer,
  studentRegisterReducer,
  studentUpdateReducer,
} from "./reducers/studentReducers";
import {
  doubtCreateReducer,
  doubtDeleteReducer,
  doubtListReducer,
  doubtUpdateReducer,
} from "./reducers/doubtReducers";
import {
  teacherLoginReducer,
  teacherRegisterReducer,
} from "./reducers/teacherReducers";

const reducer = combineReducers({
  studentLogin: studentLoginReducer,
  studentRegister: studentRegisterReducer,
  doubtList: doubtListReducer,
  doubtCreate: doubtCreateReducer,
  doubtUpdate: doubtUpdateReducer,
  doubtDelete: doubtDeleteReducer,
  studentUpdate: studentUpdateReducer,
  teacherLogin: teacherLoginReducer,
  teacherRegister: teacherRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const teacherInfoFromStorage = localStorage.getItem("teacherInfo")
  ? JSON.parse(localStorage.getItem("teacherInfo"))
  : null;

const initialState = {
  studentLogin: { userInfo: userInfoFromStorage },
  teacherLogin: { teacherInfo: teacherInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
