import AdminLayout from '../../../../components/Layouts/AdminLayout'
import Videojs from '../../../../video.js'
import {
    Box,
    Button,
    CircularProgress,
    Grow,
    LinearProgress,
    Typography,
} from '@mui/material'
import Rating from '@mui/material/Rating'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const EditMedia = () => {
    const [createdAt, setCreatedAt] = useState('')
    const [description, setDescription] = useState('')
    const [courseName, setCourseName] = useState('')
    const [duration, setDuration] = useState(0)
    const [title, setTitle] = useState('')
    const [video, setVideo] = useState('')
    const [mediumID, setMediumID] = useState(0)

    const [loading, setLoading] = useState(false)
    const { addToast } = useToasts()
    const [errors, setErrors] = useState([])
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setVideo(video)
    }, [video])

    const mediumId = useParams()
    const [value, setValue] = useState(2)

    function selectFiles(event) {
        setSelectedFiles(event.target.files[0])
    }

    function upload(file, onUploadProgress) {
        let formData = new FormData()
        formData.append('filename', file)
        formData.append('cm_id', mediumID)
        formData.append('title', title)
        formData.append('description', description)
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/updateMedium`,
                formData,
                {
                    onUploadProgress,
                },
            )
            .then(response => {
                setVideo(response.data.response.course.filename)
                if (response.data.response.success === false) {
                    if (response.data.response.message.title !== '') {
                        setErrors(response.data.response.message.title)
                    }
                    if (response.data.response.message.description !== '') {
                        setErrors(response.data.response.message.description)
                    }
                }
                setLoading(false)
                if (response.data.response.success === true) {
                    addToast('Medium added successful!', {
                        autoDismiss: true,
                        autoDismissTimeout: 5000,
                        appearance: 'success',
                    })
                }
            })
    }

    function uploadService(e) {
        // e.preventDefault()
        setLoading(true)
        let currentFile = selectedFiles
        setProgress(0)
        setCurrentFile(currentFile)
        upload(currentFile, event => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        })
        setLoading(false)
    }
    const getData = () => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getMedium/${mediumId.mid}`,
            )
            .then(res => {
                const {
                    cm_id,
                    course_id,
                    created_at,
                    description,
                    duration,
                    filename,
                    title,
                } = res.data.media
                axios
                    .get(
                        `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourse/${course_id}`,
                    )
                    .then(value => {
                        setCourseName(value.data.media.name)
                    })
                const date = new Date(created_at).toDateString()
                setMediumID(cm_id)
                setCreatedAt(date)
                setDescription(description)
                setDuration(duration)
                setVideo(filename)
                setTitle(title)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    let videoJsOptions = {}
    if (video) {
        videoJsOptions = {
            autoplay: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            width: '400px',
            height: '250px',
            controls: true,
            sources: [
                {
                    src: `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/storage/media/${video}`,
                    type: 'video/mp4',
                },
            ],
        }
    }
    return (
        <AdminLayout>
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                sx={{
                    paddingLeft: {
                        sm: '50px',
                        xs: '50px',
                        md: '50px',
                        lg: '0',
                        xl: '0',
                    },
                }}
                alignItems="center">
                <Box mb={6} alignSelf="flex-start">
                    <Typography
                        sx={{ marginBottom: '50px' }}
                        color="#9c27b0"
                        variant="h4">
                        Edit Medium
                    </Typography>
                </Box>

                <Box display="flex" alignSelf="flex-start">
                    {video ? (
                        <Videojs {...videoJsOptions} />
                    ) : (
                        <CircularProgress />
                    )}
                </Box>

                <Box sx={{ display: 'flex', alignSelf: 'flex-start' }} mt={3}>
                    <Typography
                        sx={{ marginRight: '10px' }}
                        textAlign="center"
                        variant="subtitle1">
                        Course Name :
                    </Typography>
                    <Typography
                        textAlign="center"
                        fontWeight="bold"
                        variant="h6">
                        {courseName}
                    </Typography>
                </Box>

                <Box mt={2} sx={{ display: 'flex', alignSelf: 'flex-start' }}>
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
                <Box width="100%" sx={{ alignSelf: 'flex-start' }} pt={5}>
                    {/*<AuthValidationErrors*/}
                    {/*    style={{ marginBottom: '20px' }}*/}
                    {/*    errors={errors}*/}
                    {/*/>*/}
                    <Box
                        onSubmit={uploadService}
                        mt={3}
                        p={5}
                        pt={0}
                        pl={0}
                        component="form"
                        sx={{
                            width: '100%',
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
                                Medium Name
                            </InputLabel>
                            <OutlinedInput
                                id="component-outlined"
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                                label="Course name"
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-outlined">
                                Description
                            </InputLabel>
                            <OutlinedInput
                                id="component-outlined"
                                value={description}
                                onChange={event =>
                                    setDescription(event.target.value)
                                }
                                label="Description"
                            />
                        </FormControl>
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
                        <Typography variant="h5" fontWeight="bold">
                            {selectedFiles && selectedFiles.name}
                        </Typography>
                        <br />
                        <Button
                            sx={{ width: '100px' }}
                            type="submit"
                            color="secondary"
                            variant="contained">
                            Edit Medium
                        </Button>
                    </Box>
                </Box>
            </Box>
        </AdminLayout>
    )
}

export default EditMedia
