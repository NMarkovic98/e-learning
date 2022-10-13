import Box from '@mui/material/Box'
import image from '../../../assets/images/profileImage.png'
import imageProfile from '../../../assets/images/profile_background1.png'

import { Button, Divider, Drawer, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import StudentLayout from '../../../components/Layouts/StudentLayout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardMedia } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useToasts } from 'react-toast-notifications'
function EditStudentProfile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [profileAcronym, setProfileAcronym] = useState('')
    const [profileOverviewActive, setProfileOverviewActive] = useState(true)
    const [recentCoursesActive, setRecentCoursesActive] = useState(false)
    const [profileSettingsActive, setProfileSettingsActive] = useState(false)
    const [createdAt, setCreatedAt] = useState(0)
    const [coursesCreated, setCoursesCreated] = useState(0)
    const [uploadedMedia, setUploadedMedia] = useState(0)
    const [recentCourses, setRecentCourses] = useState([])
    const { addToast } = useToasts()
    const params = useParams()
    const { uid } = params
    const navigate = useNavigate()
    console.log(recentCourses)
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${uid}`,
            )
            .then(value => {
                const {
                    id,
                    name,
                    username,
                    email,
                    role,
                    created_at,
                } = value.data.user
                /// THERE IS MISTAKE NEXT LINE
                //getUserCourses
                axios
                    .get(
                        `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUserCourses/${id}`,
                    )
                    .then(response => {
                        setCoursesCreated(response.data.courses)
                        response.data.courses.forEach(course => {
                            axios
                                .get(
                                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourseMedia/${course.course.course_id}`,
                                )
                                .then(response => {
                                    setUploadedMedia(
                                        prevState =>
                                            prevState +
                                            response.data.media.length,
                                    )
                                })
                        })
                    })
                setCreatedAt(created_at)
                setName(name)
                setProfileAcronym(name.split(' '))
                setUsername(username)
                setEmail(email)
                setRole(role)
                console.log(role)
            })

        localStorage
            .getItem('recentCourses')
            .split(',')
            .filter(rCourse => rCourse !== 'null')
            .reverse()
            .map((rCourse, index) => {
                if (index < 3) {
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${
                                process.env.REACT_APP_BACKEND_PORT
                            }/getCourse/${parseInt(rCourse)}`,
                        )
                        .then(response => {
                            setRecentCourses(prevState => [
                                ...prevState,
                                response.data.media,
                            ])
                        })
                }
            })
        console.log(recentCourses)
    }, [])

    const editUserHandler = e => {
        e.preventDefault()
        axios
            .put(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/updateUser?${uid}`,
                {
                    id: uid,
                    name: name,
                    username: username,
                    email: email,
                },
            )
            .then(response => {
                console.log(response)
                if (response.data.response.success === true) {
                    addToast('Profile updated successfully!', {
                        autoDismiss: true,
                        autoDismissTimeout: 5000,
                        appearance: 'success',
                    })
                }
            })
            .catch(error => {
                addToast('Could not update profile, please try again later!', {
                    autoDismiss: true,
                    autoDismissTimeout: 5000,
                    appearance: 'error',
                })
            })
    }
    return (
        <StudentLayout>
            <Box width="100%" display="flex" flexDirection="column">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end"
                    height="40vh"
                    sx={{
                        borderRadius: '5px',
                        overflow: 'hidden',
                        backgroundImage: `url(${imageProfile})`,
                        backgroundSize: 'cover',
                    }}>
                    <Box
                        width="200px"
                        height="200px"
                        sx={{
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            transform: 'translateY(25%)',
                        }}
                        display="flex"
                        justifyContent="center
                        "
                        alignItems={'center'}>
                        {profileAcronym && (
                            <Typography
                                sx={{ marginRight: '3px' }}
                                variant="h2">
                                {`${profileAcronym[0]
                                    .slice(0, 1)
                                    .toUpperCase()}`}
                            </Typography>
                        )}
                        {profileAcronym[1] && (
                            <Typography
                                sx={{ marginRight: '3px' }}
                                variant="h2">
                                {`${profileAcronym[1]
                                    .slice(0, 1)
                                    .toUpperCase()}`}
                            </Typography>
                        )}
                    </Box>
                    {/* <Box mt={2}>
                        <Typography
                            color="#9c27b0"
                            textAlign="center"
                            fontWeight="bold"
                            variant="h4">
                            {name}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Typography
                            color="#9c27b0"
                            display="block"
                            variant="h6"
                            fontWeight="bold"
                            fontSize="16px">
                            {email}
                        </Typography>
                    </Box> */}
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    height="100px"
                    backgroundColor="white">
                    <Box>
                        <Typography
                            onClick={() => {
                                setProfileOverviewActive(true)
                                setRecentCoursesActive(false)
                                setProfileSettingsActive(false)
                            }}
                            sx={{
                                color: `${
                                    profileOverviewActive ? '#1976d2' : '#000'
                                }`,
                                cursor: 'pointer',
                            }}
                            variant="h5"
                            fontWeight="bold">
                            Profile overview
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            onClick={() => {
                                setProfileOverviewActive(false)
                                setRecentCoursesActive(true)
                                setProfileSettingsActive(false)
                            }}
                            sx={{
                                color: `${
                                    recentCoursesActive ? '#1976d2' : '#000'
                                }`,
                                cursor: 'pointer',
                            }}
                            variant="h5"
                            fontWeight="bold">
                            Recent courses
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            onClick={() => {
                                setProfileOverviewActive(false)
                                setRecentCoursesActive(false)
                                setProfileSettingsActive(true)
                            }}
                            variant="h5"
                            sx={{
                                color: `${
                                    profileSettingsActive ? '#1976d2' : '#000'
                                }`,
                                cursor: 'pointer',
                            }}
                            fontWeight="bold">
                            Profile settings
                        </Typography>
                    </Box>
                </Box>
                {profileSettingsActive && (
                    <Box pt={2}>
                        <Box
                            p={10}
                            component="form"
                            color="#fff"
                            onSubmit={editUserHandler}
                            sx={{
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                width: '100%',
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                borderRadius: '5px',
                                '& > :not(style)': { m: 1 },
                            }}>
                            <Typography
                                fontWeight="bold"
                                color="#1976d2"
                                variant="h5">
                                EDIT PROFILE
                            </Typography>
                            <FormControl sx={{ marginTop: '200px' }}>
                                <TextField
                                    sx={{ marginTop: '30px' }}
                                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    id="component-outlined"
                                    value={name}
                                    onChange={event =>
                                        setName(event.target.value)
                                    }
                                    label="Name"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    id="component-outlined"
                                    value={email}
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    label="Email"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    id="component-outlined"
                                    value={username}
                                    onChange={event =>
                                        setUsername(event.target.value)
                                    }
                                    label="username"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    id="component-outlined"
                                    value={role}
                                    onChange={event =>
                                        setRole(event.target.value)
                                    }
                                    label="Role"
                                />
                            </FormControl>
                            <Button
                                className="ml-4"
                                style={{
                                    marginTop: '3rem',
                                    fontSize: 10,
                                    width: '90px',
                                    height: '30px',
                                }}
                                type="submit"
                                variant="contained"
                                color="primary">
                                Edit
                            </Button>
                            <Divider sx={{ color: '#1976d2' }} />
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                pt={5}>
                                <Button
                                    endIcon={<DeleteIcon />}
                                    onClick={() => {
                                        const uid = localStorage.getItem(
                                            'userId',
                                        )
                                        axios
                                            .delete(
                                                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/deleteUser/${uid}`,
                                            )
                                            .then(response => {
                                                console.log(response)
                                                localStorage.removeItem(
                                                    'userId',
                                                )
                                                navigate('/login')
                                            })
                                    }}
                                    sx={{
                                        color: '#ffffff',
                                        backgorundColor: '#1976d2',
                                    }}
                                    fontWeight="bold"
                                    color="error"
                                    variant="contained">
                                    REMOVE ACCOUNT
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                )}
                {recentCoursesActive && recentCourses && (
                    <Box
                        p={3}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexWrap="wrap"
                        gap={5}
                        mt={1}
                        sx={{
                            borderRadius: '5px',
                            backgroundColor: '#fff',
                        }}
                        minHeight="500px">
                        <Box
                            sx={{
                                justifyContent: {
                                    sm: 'center',
                                    xs: 'center',
                                    md: 'flex-start',
                                    lg: 'flex-start',
                                    xl: 'flex-start',
                                },
                            }}
                            width="100%"
                            justfySelf="flex-start"
                            pl={3}
                            display="flex"
                            justifyContent="flex-start">
                            <Typography variant="h4" color="#0c3b69">
                                You recently checked:
                            </Typography>
                        </Box>
                        <Box
                            width="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexWrap="wrap"
                            gap={5}
                            mt={1}
                            sx={{
                                borderRadius: '5px',
                                backgroundColor: '#fff',
                            }}
                            minHeight="500px">
                            {recentCourses.map((course, index) => {
                                return (
                                    <Box mb={3} mr={3} key={index}>
                                        <Card
                                            sx={{
                                                maxWidth: 300,
                                                maxHeight: 450,
                                                minHeight: 450,
                                                transition: '0.3s',
                                                boxShadow:
                                                    'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    boxShadow:
                                                        '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                                                },
                                            }}>
                                            <CardHeader
                                             
                                                subheader={new Date(
                                                    course.created_at,
                                                ).toDateString()}
                                            />
                                            <CardMedia
                                                sx={{
                                                    paddingTop: '10px',
                                                }}>
                                                <img
                                                    width="300px"
                                                    height="200px"
                                                    alt="za malo da se ucita"
                                                    src={`${
                                                        process.env
                                                            .REACT_APP_BACKEND_URL
                                                    }:${
                                                        process.env
                                                            .REACT_APP_BACKEND_PORT
                                                    }/storage/picture/${
                                                        course.picture ? (
                                                            course.picture
                                                        ) : (
                                                            <CircularProgress />
                                                        )
                                                    }`}
                                                />
                                            </CardMedia>
                                            <CardContent
                                                sx={{
                                                    textAlign: 'left',
                                                    padding: '20px',
                                                }}>
                                                <Typography
                                                sx={{minHeight:"80px"}}
                                                    className={
                                                        'MuiTypography--heading'
                                                    }
                                                    variant={'h4'}
                                                    gutterBottom>
                                                    {course.name}
                                                </Typography>
                                                <Typography
                                                    className={
                                                        'MuiTypography--subheading'
                                                    }>
                                                    {course.description
                                                        .length > 60
                                                        ? course.description.slice(
                                                              0,
                                                              60,
                                                          ) + '...'
                                                        : course.description}
                                                </Typography>
                                                <Divider light />
                                                <Button
                                                    // onClick={
                                                    //     proceedToCourseHandler
                                                    // }
                                                    id={course.course_id}
                                                    sx={{
                                                        marginTop: '10px',
                                                    }}
                                                    variant="contained"
                                                    color="secondary">
                                                    Join Course
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                )}

                {profileOverviewActive && (
                    <Box
                        display="flex"
                        // justifyContent="space-between"
                        mt={1}
                        flexDirection="column"
                        p={3}
                        height="350px"
                        width="100%"
                        sx={{
                            flexDirection: {
                                sm: 'row',
                                xs: 'row',
                                md: 'column',
                                lg: 'column',
                                xl: 'column',
                                lg: 'column',
                            },
                            borderRadius: '5px',
                            backgroundColor: '#fff',
                        }}>
                        <Box
                            display="flex"
                            mb={5}
                            sx={{
                                height: { sm: '100%', xs: '100%' },
                                justifyContent: {
                                    sm: 'space-between',
                                    xs: 'space-between',
                                    md: 'space-between',
                                    lg: 'space-between',
                                    xl: 'space-between',
                                    xxl: 'space-between',
                                },
                                alignItems: {
                                    sm: 'flex-start',
                                    xs: 'flex-start',
                                },
                                flexDirection: {
                                    md: 'row',
                                    sm: 'column',
                                    xs: 'column',
                                    lg: 'row',
                                    xl: 'row',
                                    xxl: 'row',
                                },
                            }}
                            height="100px"
                            width="100%"
                            justifyContent="space-between">
                            <Box
                                height="100px"
                                display="flex"
                                alignItems="center">
                                <AccountCircleIcon
                                    sx={{
                                        marginRight: '10px',
                                        color: '#0c3b69',
                                    }}
                                    fontSize="large"
                                />

                                <Typography
                                    fontWeight="bold"
                                    sx={{ marginRight: '10px' }}>
                                    username:
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '1px',
                                        color: '#0c3b69',
                                    }}
                                    variant="h6"
                                    fontWeight="bolder">
                                    {username}
                                </Typography>
                            </Box>
                            <Box
                                height="100px"
                                display="flex"
                                alignItems="center">
                                <DriveFileRenameOutlineIcon
                                    sx={{
                                        marginRight: '10px',
                                        color: '#0c3b69',
                                    }}
                                    fontSize="large"
                                />

                                <Typography
                                    fontWeight="bold"
                                    sx={{ marginRight: '10px' }}>
                                    name:
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '1px',
                                        color: '#0c3b69',
                                    }}
                                    variant="h6"
                                    fontWeight="bolder">
                                    {name}
                                </Typography>
                            </Box>
                            <Box
                                height="100px"
                                display="flex"
                                alignItems="center">
                                <EmailIcon
                                    sx={{
                                        marginRight: '10px',
                                        color: '#0c3b69',
                                    }}
                                    fontSize="large"
                                />
                                <Typography
                                    fontWeight="bold"
                                    sx={{ marginRight: '10px' }}>
                                    email:
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '1px',
                                        color: '#0c3b69',
                                    }}
                                    variant="h6"
                                    fontWeight="bolder">
                                    {email}
                                </Typography>
                            </Box>
                            <Box
                                height="100px"
                                display="flex"
                                alignItems="center">
                                <LocationOnIcon
                                    sx={{
                                        marginRight: '10px',
                                        color: '#0c3b69',
                                    }}
                                    fontSize="large"
                                />
                                <Typography
                                    fontWeight="bold"
                                    sx={{ marginRight: '10px' }}>
                                    location:
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '1px',
                                        color: '#0c3b69',
                                    }}
                                    variant="h6"
                                    fontWeight="bolder">
                                    Novi Sad
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            sx={{
                                height: { sm: '100%', xs: '100%' },
                                justifyContent: {
                                    sm: `${
                                        role === 1 || role === 2
                                            ? 'space-between'
                                            : role === 3
                                            ? 'flex-start'
                                            : ''
                                    }`,
                                    xs: `${
                                        role === 1 || role === 2
                                            ? 'space-between'
                                            : role === 3
                                            ? 'flex-start'
                                            : ''
                                    }`,
                                    md: `${
                                        role === 1 || role === 2
                                            ? 'space-between'
                                            : role === 3
                                            ? 'flex-start'
                                            : ''
                                    }`,
                                    lg: `${
                                        role === 1 || role === 2
                                            ? 'space-between'
                                            : role === 3
                                            ? 'flex-start'
                                            : ''
                                    }`,
                                    xl: `${
                                        role === 1 || role === 2
                                            ? 'space-between'
                                            : role === 3
                                            ? 'flex-start'
                                            : ''
                                    }`,
                                    xxl: `${
                                        role === 1 || role === 2
                                            ? 'space-between'
                                            : role === 3
                                            ? 'flex-start'
                                            : ''
                                    }`,
                                },
                                flexDirection: {
                                    md: 'row',
                                    sm: 'column',
                                    xs: 'column',
                                    lg: 'row',
                                    xl: 'row',
                                    xxl: 'row',
                                },
                            }}
                            height="100px"
                            width="100%"
                            justifyContent={`${
                                role === 1 || role === 2
                                    ? 'space-between'
                                    : role === 3
                                    ? 'flex-start'
                                    : ''
                            }`}>
                            {role && (role === 1 || role === 2) && (
                                <Box
                                    height="100px"
                                    display="flex"
                                    alignItems="center">
                                    <MenuBookIcon
                                        sx={{
                                            marginRight: '10px',
                                            color: '#0c3b69',
                                        }}
                                        fontSize="large"
                                    />

                                    <Typography
                                        fontWeight="bold"
                                        sx={{ marginRight: '10px' }}>
                                        courses:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            letterSpacing: '1px',
                                            color: '#0c3b69',
                                        }}
                                        variant="h6"
                                        fontWeight="bolder">
                                        {coursesCreated.length}
                                    </Typography>
                                </Box>
                            )}
                            {role && (role === 1 || role === 2) && (
                                <Box
                                    height="100px"
                                    display="flex"
                                    alignItems="center">
                                    <SubscriptionsIcon
                                        sx={{
                                            marginRight: '10px',
                                            color: '#0c3b69',
                                        }}
                                        fontSize="large"
                                    />

                                    <Typography
                                        fontWeight="bold"
                                        sx={{ marginRight: '10px' }}>
                                        media:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            letterSpacing: '1px',
                                            color: '#0c3b69',
                                        }}
                                        variant="h6"
                                        fontWeight="bolder">
                                        {uploadedMedia}
                                    </Typography>
                                </Box>
                            )}
                            <Box
                                mr={
                                    role === 1 || role === 2
                                        ? ''
                                        : role === 3
                                        ? 15
                                        : ''
                                }
                                sx={{
                                    marginRight: {
                                        sm: 0,
                                        xs: 0,
                                        md:
                                            role === 1 || role === 2
                                                ? ''
                                                : role === 3
                                                ? 14
                                                : '',
                                        lg:
                                            role === 1 || role === 2
                                                ? ''
                                                : role === 3
                                                ? 14
                                                : '',
                                        xl:
                                            role === 1 || role === 2
                                                ? ''
                                                : role === 3
                                                ? 14
                                                : '',
                                        xxl:
                                            role === 1 || role === 2
                                                ? ''
                                                : role === 3
                                                ? 14
                                                : '',
                                    },
                                    maxHeight: {
                                        xs:
                                            role === 1 || role === 2
                                                ? '100px'
                                                : role === 3
                                                ? '60px'
                                                : '',
                                        sm:
                                            role === 1 || role === 2
                                                ? '100px'
                                                : role === 3
                                                ? '60px'
                                                : '',
                                    },
                                }}
                                height="100px"
                                display="flex"
                                alignItems="center">
                                <AccessTimeIcon
                                    sx={{
                                        marginRight: '10px',
                                        color: '#0c3b69',
                                    }}
                                    fontSize="large"
                                />
                                <Typography
                                    fontWeight="bold"
                                    sx={{ marginRight: '10px' }}>
                                    registered:
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '1px',
                                        color: '#0c3b69',
                                    }}
                                    variant="h6"
                                    fontWeight="bolder">
                                    {Math.round(
                                        (Date.now() -
                                            new Date(createdAt).getTime()) /
                                            1000 /
                                            3600 /
                                            24,
                                    )}{' '}
                                    days ago
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    maxHeight: {
                                        xs:
                                            role === 1 || role === 2
                                                ? '100px'
                                                : role === 3
                                                ? '60px'
                                                : '',
                                        sm:
                                            role === 1 || role === 2
                                                ? '100px'
                                                : role === 3
                                                ? '60px'
                                                : '',
                                    },
                                }}
                                height="100px"
                                display="flex"
                                alignItems="center">
                                <ManageAccountsIcon
                                    sx={{
                                        marginRight: '10px',
                                        color: '#0c3b69',
                                    }}
                                    fontSize="large"
                                />
                                <Typography
                                    fontWeight="bold"
                                    sx={{ marginRight: '10px' }}>
                                    role:
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '1px',
                                        color: '#0c3b69',
                                    }}
                                    variant="h6"
                                    fontWeight="bolder">
                                    {role === 1
                                        ? 'administrator'
                                        : role === 2
                                        ? 'teacher'
                                        : 'studnet'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </StudentLayout>
    )
}

export default EditStudentProfile
