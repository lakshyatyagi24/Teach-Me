import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import CourseScreen from "./screens/CourseScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TeacherRegisterScreen from "./screens/TeacherRegisterScreen";
import StudentRegisterScreen from "./screens/StudentRegisterScreen";
import TeachersScreen from "./screens/TeachersScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import CourseListScreen from "./screens/CourseListScreen";
import CourseEditScreen from "./screens/CourseEditScreen";
import ScheduleScreen from './screens/ScheduleScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/course/:id/teachers/" element={<TeachersScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path='/register/teacher'element={<TeacherRegisterScreen />}/>
            <Route path='/register/student'element={<StudentRegisterScreen />}/>
            <Route path="/admin/userlist" element={<UserListScreen/>} />
            <Route path="/admin/courselist" element={<CourseListScreen/>} />
            <Route path="/admin/user/:userId/edit" element={<UserEditScreen/>} />
            <Route path="/admin/course/:courseId/edit" element={<CourseEditScreen/>} />
            <Route path="/course/:courseId/:teacherId/schedule" element={<ScheduleScreen />} />
            <Route path="/profile" element={<ProfileScreen/>} />
            <Route path="/course/:id" element={<TeachersScreen/>} />
            <Route path="/search/:keyword" element={<HomeScreen/>}  />
            <Route path="/" element={<HomeScreen/>} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
