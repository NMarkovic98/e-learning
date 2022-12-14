import AdminLayout from '../../../../components/Layouts/AdminLayout'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import axios from 'axios'

const drawerWidth = 240

const EditCourse = () => {
    const { addToast } = useToasts()
    const [courseName, setCourseName] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseImage, setCourseImage] = useState('')
    const [userId, setUserId] = useState(0)
    const [createdAt, setCreatedAt] = useState('')
    const [userName, setUserName] = useState('')
    const courseId = useParams()
    const [value, setValue] = useState(2)
    const editCourseHandler = e => {
        e.preventDefault()
        if (courseName !== '' && courseDescription !== '') {
            const courseID = parseInt(courseId.cid)
            const userID = parseInt(userId)

            axios
                .put(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/updateCourse`,
                    {
                        name: courseName,
                        course_id: courseID,
                        uid: userID,
                        description: courseDescription,
                    },
                )
                .then(response => {
                    console.log(response.data.response.success)
                    if (response.data.response.success) {
                        addToast('Course edited successful!', {
                            autoDismiss: true,
                            autoDismissTimeout: 5000,
                            appearance: 'success',
                        })
                    } else {
                        addToast('Something went wrong!', {
                            autoDismiss: true,
                            autoDismissTimeout: 5000,
                            appearance: 'error',
                        })
                    }
                })
        } else {
            addToast('Please fill all fileds!', {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'error',
            })
        }
    }

    const getData = () => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourse/${courseId.cid}`,
            )
            .then(res => {
                const {
                    created_at,
                    description,
                    name,
                    picture,
                    uid,
                } = res.data.media
                axios
                    .get(
                        `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${uid}`,
                    )
                    .then(value => {
                        setUserName(value.data.user.name)
                    })
                setCourseDescription(description)
                setCourseName(name)
                setCourseImage(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/storage/picture/${picture}`,
                )
                const date = new Date(created_at).toDateString()
                setUserId(uid)
                setCreatedAt(date)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <AdminLayout>
            <Box
                sx={{
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Box
                    mt={5}
                    display="flex"
                    flexDirection="column"
                    alignItems="center">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignSelf="flex-start">
                        {courseImage ? (
                            <img
                                src={courseImage}
                                alt="Course Image"
                                width={400}
                                height={250}
                            />
                        ) : (
                            <CircularProgress />
                        )}
                    </Box>

                    <Box
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}
                        mt={3}>
                        <Typography
                            sx={{ marginRight: '10px' }}
                            textAlign="center"
                            variant="subtitle1">
                            Author :
                        </Typography>
                        <Typography
                            textAlign="center"
                            fontWeight="bold"
                            variant="h6">
                            {userName}
                        </Typography>
                    </Box>

                    <Box
                        mt={2}
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}>
                        <Typography
                            sx={{ marginRight: '10px' }}
                            textAlign="center"
                            variant="subtitle1">
                            Created At:
                        </Typography>
                        <Typography
                            textAlign="center"
                            fontWeight="bold"
                            variant="h6">
                            {createdAt}
                        </Typography>
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start' }} pt={5}>
                        {/*<AuthValidationErrors*/}
                        {/*    style={{ marginBottom: '20px' }}*/}
                        {/*    errors={errors}*/}
                        {/*/>*/}
                        <Typography variant="h4">Edit Course</Typography>
                        <Box
                            onSubmit={editCourseHandler}
                            mt={3}
                            p={5}
                            pt={0}
                            pl={0}
                            component="form"
                            sx={{
                                width: '600px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                borderRadius: '10px',
                                '& > :not(style)': { m: 1 },
                            }}
                            noValidate
                            autoComplete="off">
                            <FormControl>
                                <InputLabel htmlFor="component-outlined">
                                    Course name
                                </InputLabel>
                                <OutlinedInput
                                    required={true}
                                    id="component-outlined"
                                    value={courseName}
                                    onChange={event =>
                                        setCourseName(event.target.value)
                                    }
                                    label="Course name"
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="component-outlined">
                                    Description
                                </InputLabel>
                                <OutlinedInput
                                    required={true}
                                    multiline
                                    row={3}
                                    id="component-outlined"
                                    value={courseDescription}
                                    onChange={event =>
                                        setCourseDescription(event.target.value)
                                    }
                                    label="Description"
                                />
                            </FormControl>
                            <Button
                                className="ml-4"
                                style={{
                                    marginTop: '3rem',
                                    fontSize: 10,
                                    width: '120px',
                                    height: '30px',
                                }}
                                type="submit"
                                variant="contained"
                                color="primary">
                                edit course
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AdminLayout>
    )
}

export default EditCourse
