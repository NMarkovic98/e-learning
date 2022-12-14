import Home from "./pages";
// import Login from "./pages/authentication/login";
// import Admin from "./pages/admin";
// import Register from "./pages/authentication/register";
// import Student from "./pages/student";
// import Teacher from "./pages/teacher";
// import Media from "./pages/admin/media/index";
// import AddMedia from "./pages/admin/media/add-media/addMedia";
// import Users from "./pages/admin/users";
// import AddUser from "./pages/admin/users/addUser";
// import CoursesOverview from "./pages/admin/courses/courses-overview";
// import CreateCourse from "./pages/admin/courses/create-course";
// import Profile from "./pages/admin/users/profile";
// import EditUser from "./pages/admin/users/editUser";
// import EditCourse from "./pages/admin/courses/edit-course";
// import EditMedia from "./pages/admin/media/edit-media";
// import CourseOverview from "./pages/student/course-overview";
// import EditStudentProfile from "./pages/student/edit-user";
import React from "react";
const routes = [
  { name: "home", role: "admin", path: "/", component: <Home /> },
  // { name: "login", role: "admin", path: "/login", component: <Login /> },
  // {
  //   name: "register",
  //   role: "admin",
  //   path: "/register",
  //   component: <Register />,
  // },
  // { name: "admin", role: "admin", path: "/admin", component: <Admin /> },
  // {
  //   name: "admin profile",
  //   role: "admin",
  //   path: "/admin/profile/",
  //   component: <Profile />,
  // },
  // {
  //   name: "admin add medium",
  //   role: "admin",
  //   path: "/admin/media/add-media",
  //   component: <AddMedia />,
  // },
  // {
  //   name: "admin media overview",
  //   role: "admin",
  //   path: "/admin/media/media-overview",
  //   component: <Media />,
  // },
  // {
  //   name: "edit medium",
  //   role: "admin",
  //   path: "/admin/courses/edit-medium/:mid",
  //   component: <EditMedia />,
  // },
  // {
  //   name: "users overview",
  //   role: "admin",
  //   path: "/admin/users/users-overview",
  //   component: <Users />,
  // },
  // {
  //   name: "add user",
  //   role: "admin",
  //   path: "/admin/users/add-user",
  //   component: <AddUser />,
  // },
  // {
  //   name: "edit user",
  //   role: "admin",
  //   path: "/admin/users/edit-profile/:uid",
  //   component: <EditUser />,
  // },
  // {
  //   name: "courses overview",
  //   role: "admin",
  //   path: "/admin/courses/courses-overview",
  //   component: <CourseOverview />,
  // },
  // {
  //   name: "add course",
  //   role: "admin",
  //   path: "/admin/courses/add-course",
  //   component: <CreateCourse />,
  // },
  // {
  //   name: "edit course",
  //   role: "admin",
  //   path: "/admin/courses/edit-course/:cid",
  //   component: <EditCourse />,
  // },
  // {
  //   name: "student",
  //   role: "student",
  //   path: "/student",
  //   component: <Student />,
  // },
  // {
  //   name: "course overview",
  //   role: "student",
  //   path: "/student/courses/:cid",
  //   component: <CoursesOverview />,
  // },
  // {
  //   name: "profile overview",
  //   role: "student",
  //   path: "/student/profile/:uid",
  //   component: <EditStudentProfile />,
  // },
];
export default routes;
