import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { courseListReducer  , courseDetailsReducer, courseDeleteReducer , courseCreateReducer , courseUpdateReducer} from "./reducers/courseReducers";
import { userLoginReducer ,userRegisterReducer ,userDetailsReducer ,userUpdateProfileReducer , studentRegisterReducer , teacherRegisterReducer , userListReducer , userDeleteReducer , userUpdateReducer , teacherListReducer} from "./reducers/userReducers";

const reducer = combineReducers({
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  courseDelete: courseDeleteReducer,
  courseCreate: courseCreateReducer,
  courseUpdate: courseUpdateReducer,
  userLogin: userLoginReducer,
  userRegister : userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile : userUpdateProfileReducer,
  userList : userListReducer,
  userDelete : userDeleteReducer,
  userUpdate : userUpdateReducer,
  teacherList : teacherListReducer,
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
