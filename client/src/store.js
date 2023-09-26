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

const reducer = combineReducers({
  studentLogin: studentLoginReducer,
  studentRegister: studentRegisterReducer,
  doubtList: doubtListReducer,
  doubtCreate: doubtCreateReducer,
  doubtUpdate: doubtUpdateReducer,
  doubtDelete: doubtDeleteReducer,
  studentUpdate: studentUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  studentLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
