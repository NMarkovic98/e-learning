import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { Helmet } from 'react-helmet'


import AdminLayout from '../../../../components/Layouts/AdminLayout'
import {
    Button,
    CircularProgress,
    LinearProgress,
    Select,
    TextField,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'

import AuthValidationErrors from '../../../../components/AuthValidationErrors'
const CreateCourse = () => {
    // const userId = localStorage.getItem('userId')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')
    const { addToast } = useToasts()
    const [courses, setCourses] = useState('')
    const [course, setCourse] = useState('')
    const [errors, setErrors] = useState([])
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [picture, setPicture] = useState(null)
    const [imgData, setImgData] = useState(null)
    const [userRole, setUserRole] = useState('')

    console.log(userRole)
    useEffect(() => {
        const userId = localStorage.getItem('userId')
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${userId}`,
            )
            .then(response => {
                setUserRole(response.data.user.role)
                if (response.data.user.role === 1) {
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listCourses`,
                        )
                        .then(value => {
                            console.log(value.data.response)
                            setCourses(value.data.response)
                        })
                }
                if (response.data.user.role === 2) {
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUserCourses/${userId}`,
                        )
                        .then(response => {
                            const removedIdArray = response.data.courses.map(
                                course => {
                                    delete course.id
                                    return course
                                },
                            )
                            setCourses(removedIdArray)
                        })
                }
            })
    }, [])

    const handleChangeMultiple = event => {
        const { options } = event.target
        const value = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
        setCourse(value)
    }
    function selectFiles(event) {
        setLoading(true)
        setSelectedFiles(event.target.files[0])
        if (event.target.files[0]) {
            setPicture(event.target.files[0])
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImgData(reader.result)
            })
            reader.readAsDataURL(event.target.files[0])
        }
        setLoading(false)
    }

    function upload(file, onUploadProgress) {
        setErrors([])
        let formData = new FormData()
        formData.append('filename', file)
        formData.append('course_id', course)
        formData.append('title', name)
        formData.append('description', description)
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/uploadMedium/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress,
                },
            )
            .then(response => {
                if (response.data.response.success === true) {
                    setCourse('')
                    setName('')
                    setImgData('')
                    setCurrentFile(undefined)
                    setSelectedFiles(undefined)
                    setDescription('')
                    addToast('Medium added successful!', {
                        autoDismiss: true,
                        autoDismissTimeout: 5000,
                        appearance: 'success',
                    })
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    if (error.response.data.response.message.title) {
                        setErrors([
                            error.response.data.response.message.title[0],
                        ])
                    } else if (
                        error.response.data.response.message.description
                    ) {
                        setErrors([
                            error.response.data.response.message.description[0],
                        ])
                    } else if (error.response.data.response.message.course_id) {
                        setErrors(['Course is required'])
                    }
                }
            })
    }

    function uploadService(e) {
        e.preventDefault()
        let currentFile = selectedFiles
        setProgress(0)
        setCurrentFile(currentFile)
        upload(currentFile, event => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        })
    }

    useEffect(() => {}, [errors])

    return (
        <AdminLayout>
            <Helmet>
                    <title>Ademy - Add Media</title>
                </Helmet>
            <Box
                color="#fff"
                onSubmit={uploadService}
                p={10}
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    width: '100%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '20px',
                    '& > :not(style)': { m: 1 },
                }}
                component="form"
                autoComplete="off">
                <Box>
                    <Typography
                        sx={{ marginBottom: '20px' }}
                        color="#9c27b0"
                        variant="h4">
                        Upload Medium
                    </Typography>
                </Box>

                {errors.length > 0 && (
                    <AuthValidationErrors
                        style={{ marginBottom: '20px' }}
                        errors={errors}
                    />
                )}

                <TextField
                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 13 } }}
                    style={{
                        width: '100%',
                        margin: '5px',
                        marginBottom: '2rem',
                    }}
                    label="Title"
                    variant="outlined"
                    id="title"
                    type="text"
                    value={name}
                    className="block mt-1 w-full"
                    onChange={event => setName(event.target.value)}
                    required
                />

                <TextField
                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 13 } }}
                    style={{
                        width: '100%',
                        margin: '5px',
                        marginBottom: '2rem',
                    }}
                    multiline
                    rows={4}
                    label="Description"
                    variant="outlined"
                    id="description"
                    type="text"
                    value={description}
                    className="block mt-1 w-full"
                    onChange={event => setDescription(event.target.value)}
                    required
                />
                {userRole && courses ? (
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                        <InputLabel shrink htmlFor="select-multiple-native">
                            Choose Course
                        </InputLabel>
                        <Select
                            native
                            value={course}
                            // @ts-ignore Typings are not considering `native`
                            onChange={handleChangeMultiple}
                            label="Choose Course"
                            inputProps={{
                                id: 'select-multiple-native',
                            }}>
                            <option value={''}>-</option>
                            {courses.map(name => {
                                console.log(name)
                                return (
                                    <option
                                        key={
                                            userRole === 1
                                                ? name.course_id
                                                : userRole === 2
                                                ? name.course.course_id
                                                : null
                                        }
                                        value={
                                            userRole === 1
                                                ? name.course_id
                                                : userRole === 2
                                                ? name.course.course_id
                                                : null
                                        }>
                                        {userRole === 1
                                            ? name.name
                                            : userRole === 2
                                            ? name.course.name
                                            : null}
                                    </option>
                                )
                            })}
                        </Select>
                    </FormControl>
                ) : (
                    <Typography variant="body1" color="#000">
                        There are no available courses, please add course
                    </Typography>
                )}
                {currentFile && (
                    <>
                        <LinearProgress
                            value={progress}
                            variant="determinate"
                            sx={{
                                marginTop: '10px',
                                height: '20px',
                            }}
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary">{`${Math.round(
                            progress,
                        )}%`}</Typography>
                    </>
                )}

                <Button
                    sx={{ marginTop: '10px', width: '100px' }}
                    variant="contained"
                    component="label">
                    Choose File
                    <input type="file" hidden onChange={selectFiles} />
                </Button>
                <br />

                {!loading && imgData && imgData.includes('video') && (
                    <video
                        preload="auto"
                        width="200px"
                        height="200px"
                        className="playerProfilePic_home_tile"
                        src={imgData}
                    />
                )}
                {loading && <CircularProgress />}
                {imgData && !imgData.includes('video') && (
                    <Typography color="#000" variant="h5">
                        Please Select a video!
                    </Typography>
                )}
                <Typography color="#9c27b0" variant="h5" fontWeight="bold">
                    {selectedFiles &&
                        imgData &&
                        imgData.includes('video') &&
                        selectedFiles.name}
                </Typography>
                <br />
                <Button
                    sx={{ width: '100px' }}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={!selectedFiles}>
                    Upload
                </Button>
            </Box>
        </AdminLayout>
    )
}

export default CreateCourse
