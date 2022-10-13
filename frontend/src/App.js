import React, { Fragment, useEffect } from 'react'
import Home from './pages/index'
import Login from './pages/authentication/login'
import Admin from './pages/admin'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/authentication/register'
import Student from './pages/student'
import Teacher from './pages/teacher'
import Media from './pages/admin/media/index'
import AddMedia from './pages/admin/media/add-media/addMedia'
import { useLocation, Outlet } from 'react-router-dom'
import Users from './pages/admin/users'
import AddUser from './pages/admin/users/addUser'
import CoursesOverview from './pages/admin/courses/courses-overview'
import CreateCourse from './pages/admin/courses/create-course'
import Profile from './pages/admin/users/profile'
import EditUser from './pages/admin/users/editUser'
import EditCourse from './pages/admin/courses/edit-course'
import EditMedia from './pages/admin/media/edit-media'
import CourseOverview from './pages/student/course-overview'
import EditStudentProfile from './pages/student/edit-user'
import { useNavigate } from 'react-router-dom'
function App() {
    const navigate = useNavigate()
    const location = useLocation()
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (!userId) {
            navigate('/')
        }
    }, [])

    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<Home />} />

                {/* AUTH ROUTES */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ADMIN ROUTES */}
                <Route
                    path="/admin"
                    element={
                        location.pathname === '/admin' ? <Admin /> : <Outlet />
                    }>
                    {/* ADMIN PROFILE*/}
                    <Route path="/admin/profile/" element={<Profile />} />

                    {/* MEDIA ROUTES*/}
                    <Route
                        path="/admin/media/media-overview"
                        element={<Media />}
                    />
                    <Route
                        path="/admin/media/add-media"
                        element={<AddMedia />}
                    />
                    <Route
                        path="/admin/courses/edit-medium/:mid"
                        element={<EditMedia />}
                    />
                    {/* USER ROUTES */}
                    <Route
                        path="/admin/users/users-overview"
                        element={<Users />}
                    />
                    <Route path="/admin/users/add-user" element={<AddUser />} />
                    <Route
                        path="/admin/users/edit-profile/:uid"
                        element={<EditUser />}
                    />
                    {/* COURSES ROUTES*/}
                    <Route
                        path="/admin/courses/courses-overview"
                        element={<CoursesOverview />}
                    />

                    <Route
                        path="/admin/courses/add-course"
                        element={<CreateCourse />}
                    />
                    <Route
                        path="/admin/courses/edit-course/:cid"
                        element={<EditCourse />}
                    />
                </Route>
                {/* TEACHER ROUTES */}

                <Route path="/teacher" element={<Teacher />} />

                {/* STUDENT ROUTES */}

                <Route path="/student" element={<Student />} />
                <Route
                    path="/student/courses/:cid"
                    element={<CourseOverview />}
                />
                <Route
                    path="/student/profile/:uid"
                    element={<EditStudentProfile />}
                />
                {/*<Route index element={<Home />} />*/}
                {/*<Route path="teams" element={<Teams />}>*/}
                {/*    <Route path=":teamId" element={<Team />} />*/}
                {/*    <Route path="new" element={<NewTeamForm />} />*/}
                {/*    <Route index element={<LeagueStandings />} />*/}
                {/*</Route>*/}
            </Routes>
        </Fragment>
    )
}

export default App
