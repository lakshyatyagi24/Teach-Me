import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { courseListReducer } from "./reducers/courseReducers";
import { userLoginReducer ,userRegisterReducer ,userDetailsReducer ,userUpdateProfileReducer , studentRegisterReducer , teacherRegisterReducer} from "./reducers/userReducers";

const reducer = combineReducers({
  courseList: courseListReducer,
  userLogin: userLoginReducer,
  userRegister : userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile : userUpdateProfileReducer,
  studentRegister : studentRegisterReducer,
  teacherRegister : teacherRegisterReducer,

});


const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const initalState = {
    userLogin: {userInfo: userInfoFromStorage}
  };


const middleware = [thunk];

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
