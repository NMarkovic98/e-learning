import Box from '@mui/material/Box'
import image from '../../assets/images/users.jpg'
import image5 from '../../assets/images/categories.png'
import image2 from '../../assets/images/eCourses.jpg'
import image3 from '../../assets/images/mediaoverview.jpg'
import AddIcon from '@mui/icons-material/Add'
import ViewComfyIcon from '@mui/icons-material/ViewComfy'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'

import { Bar } from 'react-chartjs-2'
import { Link } from 'react-router-dom'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js'
import { ArcElement } from 'chart.js'
import { Pie, Line } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    Filler,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
)

import { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [users, setUsers] = useState(null)
    const [media, setMedia] = useState(null)
    const [courses, setCourses] = useState(null)
    const [userRole, setUserRole] = useState('')
    const [months, setMonths] = useState([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ])
    const [userPerMonths, setUserPerMonths] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ])
    const [adminsPerMotnhs, setAdminPerMonts] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ])
    const [studentsPerMotnhs, setStudnetPerMonts] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ])
    const [teachersPerMotnhs, setTecherPerMonts] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ])
    const [coursesPerMotnhs, setCoursePerMonts] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ])
    const [mediaPerMotnhs, setMediaPerMonts] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ])
    const [coursesTeacherPerMotnhs, setCoursesTeacherPerMonths] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ])
    const [mediaTeacherPerMotnhs, setMediaTeacherPerMonths] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ])

    console.log(adminsPerMotnhs)
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${userId}`,
            )
            .then(response => {
                setUserRole(response.data.user.role)
            })
    }, [])

    useEffect(async () => {
        if (userRole === 1) {
            await axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listCourses`,
                )
                .then(value => {
                    value.data.response.forEach(course => {
                        coursesPerMotnhs[
                            new Date(course.created_at).getMonth()
                        ] =
                            coursesPerMotnhs[
                                new Date(course.created_at).getMonth()
                            ] + 1
                    })
                    const data = value.data.response.map(course => {
                        return course.name
                    })

                    setCourses(data.length)
                })

            await axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listUsers`,
                )
                .then(value => {
                    value.data.response.forEach(user => {
                        userPerMonths[new Date(user.created_at).getMonth()] =
                            userPerMonths[
                                new Date(user.created_at).getMonth()
                            ] + 1
                    })
                    value.data.response.forEach(user => {
                        if (user.role === 1) {
                            adminsPerMotnhs[
                                new Date(user.created_at).getMonth()
                            ] =
                                adminsPerMotnhs[
                                    new Date(user.created_at).getMonth()
                                ] + 1
                        }
                        if (user.role === 3) {
                            studentsPerMotnhs[
                                new Date(user.created_at).getMonth()
                            ] =
                                studentsPerMotnhs[
                                    new Date(user.created_at).getMonth()
                                ] + 1
                        }
                        if (user.role === 2) {
                            teachersPerMotnhs[
                                new Date(user.created_at).getMonth()
                            ] =
                                teachersPerMotnhs[
                                    new Date(user.created_at).getMonth()
                                ] + 1
                        }
                    })

                    const data = value.data.response.map(user => {
                        return user.name
                    })

                    setUsers(data.length)
                })
            await axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listMedia`,
                )
                .then(value => {
                    value.data.response.forEach(media => {
                        mediaPerMotnhs[new Date(media.created_at).getMonth()] =
                            mediaPerMotnhs[
                                new Date(media.created_at).getMonth()
                            ] + 1
                    })
                    const data = value.data.response.map(media => {
                        return media.title
                    })

                    setMedia(data.length)
                })
        }
        if (userRole === 2) {
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUserCourses/${userId}`,
                )
                .then(value => {
                    value.data.courses.forEach(course => {
                        coursesTeacherPerMotnhs[
                            new Date(course.course.created_at).getMonth()
                        ] =
                            coursesTeacherPerMotnhs[
                                new Date(course.course.created_at).getMonth() -
                                    1
                            ] + 1
                    })
                    const data = value.data.courses.map(course => {
                        axios
                            .get(
                                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourseMedia/${course.id}`,
                            )
                            .then(response => {
                                response.data.media.forEach(media => {
                                    mediaTeacherPerMotnhs[
                                        new Date(
                                            media.medium.created_at,
                                        ).getMonth()
                                    ] =
                                        mediaTeacherPerMotnhs[
                                            new Date(
                                                media.medium.created_at,
                                            ).getMonth()
                                        ] + 1
                                })
                                setMedia(prevMedia => {
                                    return (
                                        prevMedia + response.data.media.length
                                    )
                                })
                                // setMedia(response.data.media.length)
                            })
                        return course.name
                    })
                    setCourses(data.length)
                })
        }
    }, [userRole])

    if (userRole === 2) {
        return (
            <Box
                display="flex"
                container
                flexDirection="column"
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Box
                    width="100%"
                    mb={5}
                    display="flex"
                    justifyContent="space-around"
                    sx={{
                        '@media screen and (max-width: 1197px)': {
                            flexDirection: 'column-reverse',
                            gap: '40px',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}
                    xs={6}>
                    <Box
                        width="100%"
                        sx={{
                            padding: {
                                xs: '40px',
                                sm: '40px',
                                lg: '0',
                                md: '40px',
                                xl: '0',
                            },
                            marginRight: { sm: 0, xs: 0, md: 0, lg: 5, xl: 5 },
                        }}>
                        <Card
                            sx={{
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                width: '100%',
                                maxHeight: 700,
                            }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="250"
                                image={image2}
                            />
                            <CardContent>
                                {courses ? (
                                    <Typography
                                        fontWeight="bold"
                                        gutterBottom
                                        variant="h4"
                                        component="div">
                                        {courses}+ courses
                                    </Typography>
                                ) : (
                                    <Typography
                                        fontWeight="bold"
                                        gutterBottom
                                        variant="h4"
                                        component="div">
                                        There are no courses, go add one!
                                    </Typography>
                                )}
                                <Typography variant="h6" color="#000">
                                    There you can create a new courses. After
                                    creating a course you can easely go to the
                                    media section and choose add medium. After
                                    that you can select course where you want to
                                    add a learning material!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    size="large"
                                    color="secondary">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: '#fff',
                                        }}
                                        to="/admin/courses/add-course">
                                        Create Course
                                    </Link>
                                </Button>
                                <Button
                                    startIcon={<ViewComfyIcon />}
                                    variant="contained"
                                    size="large">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: '#fff',
                                        }}
                                        to="/admin/courses/courses-overview">
                                        Courses
                                    </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Box>
                <Box
                    mb={10}
                    sx={{
                        padding: {
                            xs: '40px',
                            sm: '40px',
                            lg: '0',
                            md: '40px',
                            xl: '0',
                        },
                    }}
                    mt={5}>
                    <Box mt={5}>
                        <Typography
                            sx={{ color: '#0c3b69' }}
                            variant="h5"
                            fontWeight="bold">
                            Your courses stats:
                        </Typography>
                    </Box>
                    <Line
                        data={{
                            labels: months,
                            datasets: [
                                {
                                    label: 'Courses',
                                    data: coursesTeacherPerMotnhs,

                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            legend: {
                                display: true,
                                position: 'right',
                            },
                            plugins: {
                                title: {
                                    display: true,
                                },
                            },
                        }}
                    />
                </Box>
                <Box
                    width="100%"
                    mr={10}
                    sx={{
                        padding: {
                            xs: '40px',
                            sm: '40px',
                            lg: '0',
                            md: '40px',
                            xl: '0',
                        },
                        '@media screen and (max-width: 1197px)': {
                            marginRight: '0',
                        },
                    }}>
                    <Card
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                            width: '100%',
                            maxHeight: 700,
                        }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="250"
                            image={image3}
                        />
                        <CardContent>
                            {media ? (
                                <Typography
                                    fontWeight="bold"
                                    gutterBottom
                                    variant="h4"
                                    component="div">
                                    {media}+ media
                                </Typography>
                            ) : (
                                <Typography
                                    fontWeight="bold"
                                    gutterBottom
                                    variant="h4"
                                    component="div">
                                    There are no media, go add one!
                                </Typography>
                            )}
                            <Typography variant="h6" color="#000">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed aliquam velit a metus
                                dapibus, in malesuada lacus venenatis. Nulla
                                imperdiet magna libero, a molestie mauris
                                blandit eleifend. Cras eget facilisis mi. Duis
                                vehicula augue justo, sed interdum felis
                                sollicitudin ut. Phasellus feugiat dui turpis,
                                at ullamcorper dolor convallis ac. Curabitur ac
                                imperdiet felis, ut dictum diam. Proin molestie
                                augue nec tortor fringilla, eget porta felis
                                venenatis. Duis
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                color="secondary"
                                startIcon={<AddIcon />}
                                variant="contained"
                                size="large">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: '#fff',
                                    }}
                                    to="/admin/media/add-media">
                                    Upload Medium
                                </Link>
                            </Button>
                            <Button
                                startIcon={<ViewComfyIcon />}
                                variant="contained"
                                size="large">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: '#fff',
                                    }}
                                    to="/admin/media/media-overview">
                                    Media
                                </Link>
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
                <Box
                    mb={10}
                    sx={{
                        padding: {
                            xs: '40px',
                            sm: '40px',
                            lg: '0',
                            md: '40px',
                            xl: '0',
                        },
                    }}
                    mt={5}>
                    <Box mt={5}>
                        <Typography
                            sx={{ color: '#0c3b69' }}
                            variant="h5"
                            fontWeight="bold">
                            Your media stats:
                        </Typography>
                    </Box>
                    <Bar
                        data={{
                            labels: months,
                            datasets: [
                                {
                                    label: 'Media',
                                    data: mediaTeacherPerMotnhs,

                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            legend: {
                                display: true,
                                position: 'right',
                            },
                            plugins: {
                                title: {
                                    display: true,
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        )
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Box
                sx={{
                    padding: {
                        xs: '40px',
                        sm: '40px',
                        lg: '0',
                        md: '40px',
                        xl: '0',
                    },
                }}
                mb={5}>
                <Typography
                    sx={{ color: '#0c3b69' }}
                    fontWeight="bold"
                    variant="h5">
                    Users Per Month
                </Typography>
            </Box>
            {userPerMonths && (
                <Box
                    sx={{
                        padding: {
                            xs: '40px',
                            sm: '40px',
                            lg: '0',
                            md: '40px',
                            xl: '0',
                        },
                    }}
                    width="100%">
                    <Bar
                        data={{
                            labels: months,
                            datasets: [
                                {
                                    label: 'Registered Users',
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderColor: 'rgba(75,192,192,1)',
                                    borderWidth: 2,
                                    data: userPerMonths,
                                },
                                // {
                                //     label: 'Admins',
                                //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                //     borderColor: 'rgba(53, 162, 235, 0.5)',
                                //     borderWidth: 2,
                                //     data: adminsPerMotnhs,
                                // },
                                // {
                                //     label: 'Studnets',
                                //     backgroundColor: 'rgba(235, 161, 52)',
                                //     borderColor: 'rgba(235, 161, 52)',
                                //     borderWidth: 2,
                                //     data: studentsPerMotnhs,
                                // },
                                // {
                                //     label: 'Teachers',
                                //     backgroundColor: 'rgba(204, 52, 235)',
                                //     borderColor: 'rgba(204, 52, 235)',
                                //     borderWidth: 2,
                                //     data: teachersPerMotnhs,
                                // },
                            ],
                        }}
                        options={{
                            title: {
                                display: true,
                                text: 'Average Rainfall per month',
                                fontSize: 20,
                            },
                            legend: {
                                display: true,
                                position: 'right',
                            },
                        }}
                    />
                </Box>
            )}
            <Box
                mb={5}
                mt={5}
                display="flex"
                justifyContent="space-around"
                sx={{
                    '@media screen and (max-width: 1197px)': {
                        flexDirection: 'column-reverse',
                        gap: '40px',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}
                xs={6}></Box>
            <Box
                sx={{
                    padding: {
                        xs: '40px',
                        sm: '40px',
                        lg: '0',
                        md: '40px',
                        xl: '0',
                    },
                }}
                mb={5}
                mt={5}>
                <Typography
                    sx={{ color: '#0c3b69' }}
                    variant="h5"
                    fontWeight="bold">
                    User Roles
                </Typography>
            </Box>
            <Box
                mb={10}
                width="100%"
                sx={{
                    padding: {
                        xs: '40px',
                        sm: '40px',
                        lg: '0',
                        md: '40px',
                        xl: '0',
                    },
                    flexDirection: {
                        lg: 'row',
                        xl: 'row',
                        md: 'column',
                        sm: 'column',
                        xs: 'column',
                    },
                    justifyContent: {
                        sm: 'center',
                        xs: 'center',
                        md: 'center',
                        lg: 'space-between',
                        xl: 'space-between',
                    },
                }}
                display="flex">
                <Box
                    sx={{
                        height: {
                            lg: '200px',
                            xl: '200px',
                            sm: '100px',
                            xs: '100px',
                            md: '100px',
                        },
                        width: {
                            lg: '350px',
                            xl: '350px',
                            sm: '100%',
                            xs: '100%',
                            md: '100%',
                        },
                        marginBottom: {
                            sm: '450px',
                            xs: '450px',
                            lg: '0',
                            xl: '0',
                            md: '450px',
                        },
                        display: 'flex',
                        justfyContent: 'center',
                    }}>
                    {teachersPerMotnhs && adminsPerMotnhs && studentsPerMotnhs && (
                        <Pie
                            data={{
                                labels: ['Admins', 'Students', 'Teachers'],
                                datasets: [
                                    {
                                        label: '# of Votes',
                                        data: [
                                            adminsPerMotnhs.reduce(
                                                (prev, next) => {
                                                    
                                                    return prev + next
                                                },
                                               
                                            ),
                                            teachersPerMotnhs.reduce(
                                                (prev, next) => {
                                                    return prev + next
                                                },
                                               
                                            ),
                                            studentsPerMotnhs.reduce(
                                                (prev, next) => {
                                                    return prev + next
                                                },
                                               
                                            ),
                                         
                                         
                                        ],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                        />
                    )}
                </Box>
                <Box
                    sx={{
                        '@media screen and (max-width: 1197px)': {
                            marginRight: '0',
                            maxWidth: {
                                lg: 350,
                                xl: 350,
                                sm: '100%',
                                md: '100%',
                                xs: '100%',
                            },
                            width: {
                                lg: 350,
                                xl: 350,
                                sm: '100%',
                                md: '100%',
                                xs: '100%',
                            },
                        },
                    }}>
                    <Card
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

                            maxWidth: {
                                lg: 350,
                                xl: 350,
                                sm: '100%',
                                md: '100%',
                                xs: '100%',
                            },
                            width: {
                                lg: 350,
                                xl: 350,
                                sm: '100%',
                                md: '100%',
                                xs: '100%',
                            },
                            maxHeight: 700,
                            paddingBottom: '10px',
                        }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="250"
                            image={image}
                        />
                        <CardContent>
                            <Typography
                                fontWeight="bold"
                                gutterBottom
                                variant="h4"
                                component="div">
                                {users}+ users
                            </Typography>
                            <Typography variant="h6" color="#000">
                                Check Ademy Users
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{
                                display: { sm: 'flex', xs: 'flex', md: 'flex' },
                                justifyContent: {
                                    sm: 'space-between',
                                    xs: 'space-between',
                                    md: 'space-between',
                                },
                            }}>
                            <Button
                                startIcon={<AddIcon />}
                                variant="contained"
                                size="large"
                                color="secondary">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: '#fff',
                                    }}
                                    to="/admin/users/add-user">
                                    Add user
                                </Link>
                            </Button>
                            <Button
                                startIcon={<ViewComfyIcon />}
                                variant="contained"
                                size="large">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: '#fff',
                                    }}
                                    to="/admin/users/users-overview">
                                    users
                                </Link>
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
            <Box
                sx={{
                    padding: {
                        xs: '40px',
                        sm: '40px',
                        lg: '0',
                        md: '40px',
                        xl: '0',
                    },
                    maxWidth: {
                        lg: '100%',
                        xl: '100%',
                        sm: '100%',
                        md: '100%',
                        xs: '100%',
                    },
                    width: {
                        lg: '100%',
                        xl: '100%',
                        sm: '100%',
                        md: '100%',
                        xs: '100%',
                    },
                }}>
                <Card
                    sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

                        maxHeight: 700,
                        width: {
                            xl: '100%',
                            lg: '100%',
                            md: '100%',
                            sm: '100%',
                            xs: '100%',
                        },
                        maxHeight: 700,
                    }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="300px"
                        image={image2}
                    />
                    <CardContent>
                        <Typography
                            fontWeight="bold"
                            gutterBottom
                            variant="h4"
                            component="div">
                            {courses}+ courses
                        </Typography>
                        <Typography variant="h6" color="#000">
                            Expirience New Popular Courses
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: { sm: 'flex', xs: 'flex', md: 'flex' },
                            justifyContent: {
                                sm: 'space-between',
                                xs: 'space-between',
                                md: 'space-between',
                            },
                        }}>
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            size="large"
                            color="secondary">
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: '#fff',
                                }}
                                to="/admin/courses/add-course">
                                Create Course
                            </Link>
                        </Button>
                        <Button
                            startIcon={<ViewComfyIcon />}
                            variant="contained"
                            size="large">
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: '#fff',
                                }}
                                to="/admin/courses/courses-overview">
                                Courses
                            </Link>
                        </Button>
                    </CardActions>
                </Card>
            </Box>
            <Box
                mb={10}
                sx={{
                    padding: {
                        xs: '40px',
                        sm: '40px',
                        lg: '0',
                        md: '40px',
                        xl: '0',
                    },
                }}
                mt={5}>
                <Box mt={5}>
                    <Typography
                        sx={{ color: '#0c3b69' }}
                        variant="h5"
                        fontWeight="bold">
                        Courses Per Month
                    </Typography>
                </Box>
                <Line
                    data={{
                        labels: months,
                        datasets: [
                            {
                                label: 'Courses',
                                data: coursesPerMotnhs,

                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        legend: {
                            display: true,
                            position: 'right',
                        },
                        plugins: {
                            title: {
                                display: true,
                            },
                        },
                    }}
                />
            </Box>
            <Box
                display="flex"
                justifyContent="space-around"
                sx={{
                    padding: {
                        xs: '40px',
                        sm: '40px',
                        lg: '0',
                        md: '40px',
                        xl: '0',
                    },
                    '@media screen and (max-width: 1197px)': {
                        flexDirection: 'column-reverse',
                        gap: '40px',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}
                xs={6}>
                <Box
                    width="100%"
                    sx={{
                        '@media screen and (max-width: 1197px)': {
                            marginRight: '0',
                        },
                    }}>
                    <Card
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                            width: {
                                lg: '100%',
                                md: '100%',
                                sm: '100%',
                                xs: '100%',
                            },
                            maxHeight: 700,
                        }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="300px"
                            image={image3}
                        />
                        <CardContent>
                            <Typography
                                fontWeight="bold"
                                gutterBottom
                                variant="h4"
                                component="div">
                                {media === null
                                    ? 'There are no media, go upload one!'
                                    : media}
                                + media
                            </Typography>
                            <Typography variant="h6" color="#000">
                                Creative & Understandable Video lessons
                            </Typography>
                        </CardContent>
                        <CardActions
                            sx={{
                                display: { sm: 'flex', xs: 'flex', md: 'flex' },
                                justifyContent: {
                                    sm: 'space-between',
                                    xs: 'space-between',
                                    md: 'space-between',
                                },
                            }}>
                            <Button
                                color="secondary"
                                startIcon={<AddIcon />}
                                variant="contained"
                                size="large">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: '#fff',
                                    }}
                                    to="/admin/media/add-media">
                                    Upload Medium
                                </Link>
                            </Button>
                            <Button
                                startIcon={<ViewComfyIcon />}
                                variant="contained"
                                size="large">
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: '#fff',
                                    }}
                                    to="/admin/media/media-overview">
                                    Media
                                </Link>
                            </Button>
                        </CardActions>
                    </Card>
                </Box>

                {/* <Box>
                    <Card sx={{ maxWidth: 500, maxHeight: 700 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="250"
                            image={image5}
                        />
                        <CardContent>
                            <Typography
                                fontWeight="bold"
                                gutterBottom
                                variant="h4"
                                component="div">
                                5+ categories
                            </Typography>
                            <Typography variant="h6" color="#000">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed aliquam velit a metus
                                dapibus, in malesuada lacus venenatis. Nulla
                                imperdiet magna libero, a molestie mauris
                                blandit eleifend. Cras eget facilisis mi. Duis
                                vehicula augue justo, sed interdum felis
                                sollicitudin ut. Phasellus feugiat dui turpis,
                                at ullamcorper dolor convallis ac. Curabitur ac
                                imperdiet felis, ut dictum diam. Proin molestie
                                augue nec tortor fringilla, eget porta felis
                                venenatis. Duis
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                color="secondary"
                                startIcon={<AddIcon />}
                                variant="contained"
                                size="large">
                                Categories
                            </Button>
                            <Button
                                startIcon={<ViewComfyIcon />}
                                variant="contained"
                                size="large">
                                Categories
                            </Button>
                        </CardActions>
                    </Card>
                </Box> */}
            </Box>
            <Box
                sx={{
                    padding: {
                        xs: '40px',
                        sm: '40px',
                        lg: '0',
                        md: '40px',
                        xl: '0',
                    },
                }}
                mt={5}
                mb={5}>
                <Box mb={5} mt={5}>
                    <Typography
                        sx={{ color: '#0c3b69' }}
                        variant="h5"
                        fontWeight="bold">
                        Media Uploaded Per Month
                    </Typography>
                </Box>
                <Line
                    data={{
                        labels: months,
                        datasets: [
                            {
                                fill: true,
                                label: 'Media',
                                data: mediaPerMotnhs,
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        legend: {
                            display: true,
                            position: 'right',
                        },
                        plugins: {
                            title: {
                                display: true,
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    )
}
export default Dashboard
