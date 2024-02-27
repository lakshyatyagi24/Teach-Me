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

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" Component={LoginScreen} />
            <Route path="/course/:id/teachers/" Component={TeachersScreen} />
            <Route path="/register" Component={RegisterScreen} />
            <Route path='/register/teacher'element={<TeacherRegisterScreen />}/>
            <Route path='/register/student'element={<StudentRegisterScreen />}/>
            <Route path="/admin/userlist" Component={UserListScreen} />
            <Route path="/admin/user/:userId/edit" Component={UserEditScreen} />
            <Route path="/profile" Component={ProfileScreen} />
            <Route path="/course/:id" Component={TeachersScreen} />
            <Route path="/search/:keyword" Component={HomeScreen}  />
            <Route path="/" Component={HomeScreen} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
