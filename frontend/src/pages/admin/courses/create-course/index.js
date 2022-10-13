import AdminLayout from '../../../../components/Layouts/AdminLayout'
import AuthValidationErrors from '../../../../components/AuthValidationErrors'
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    CircularProgress,
    Grow,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    TextareaAutosize,
    TextField,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
import React from 'react'
import { useToasts } from 'react-toast-notifications'
import { useEffect } from 'react'
import axios from 'axios'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
const steps = ['Write question', 'Add answers', 'Choose Correct Answer']
import { Helmet } from 'react-helmet'



const drawerWidth = 240
const CreateCourse = () => {
    const userId = localStorage.getItem('userId')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { addToast } = useToasts()
    const [categories, setCategories] = useState([])
    const [errors, setErrors] = useState([])
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [animate, setAnimate] = useState(false)
    const [imgData, setImgData] = useState('')
    const [loading, setLoading] = useState(false)

    function selectFiles(event) {
        setSelectedFiles(event.target.files[0])

        if (event.target.files[0]) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImgData(reader.result)
            })
            reader.readAsDataURL(event.target.files[0])
        }
    }
    useEffect(() => {
        if (currentFile) {
            setAnimate(true)
        } else {
            setAnimate(false)
        }
    }, [currentFile])
    
    async function upload(file, onUploadProgress) {
        if (file) {
            let formData = new FormData()
            formData.append('uid', userId)
            formData.append('picture', file)
            formData.append('name', name)
            formData.append('description', description)
            categories.forEach((category, index) => {
                formData.append(`categories[${index}]`, category)
            })
            return await axios
                .post(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/createCourse/`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        onUploadProgress,
                    },
                )
                .then(response => {
                    setLoading(true)
                    setErrors([])
                    setTimeout(() => {
                        setCurrentFile(undefined)
                        setSelectedFiles(undefined)
                        setImgData('')
                        setCategories([])
                        setName('')
                        setDescription('')

                        if (response.status === 200) {
                            addToast('Course added successful!', {
                                autoDismiss: true,
                                autoDismissTimeout: 5000,
                                appearance: 'success',
                            })
                            setLoading(false)
                        }
                    }, 0)
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        if (error.response.data.response.message.name) {
                            setErrors([
                                error.response.data.response.message.name[0],
                            ])
                        } else if (
                            error.response.data.response.message.description
                        ) {
                            setErrors([
                                error.response.data.response.message
                                    .description[0],
                            ])
                        } else if (
                            error.response.data.response.message.course_id
                        ) {
                            setErrors(['Course is required'])
                        } else if (
                            error.response.data.response.message.categories
                        ) {
                            setErrors([
                                error.response.data.response.message
                                    .categories[0],
                            ])
                        }
                    }
                })
        }
    }

    async function uploadService(e) {
        setLoading(true)
        e.preventDefault()
        let currentFile = selectedFiles

        setProgress(0)
        setCurrentFile(currentFile)

        await upload(currentFile, event => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        }).catch(error => {
            setProgress(0)
            setCurrentFile(undefined)
        })
        setLoading(false)
    }
    return (
        <AdminLayout>
            <Helmet>
                <title>Ademy - Create Course</title>
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
                    alignItems: 'center',
                    borderRadius: '20px',
                    '& > :not(style)': { m: 1 },
                }}>
                <Box pb={5} alignSelf="flex-start" mt={15}>
                    <Typography color="#9c27b0" variant="h4">
                        Create Course
                    </Typography>
                </Box>
                <Box
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
                    <AuthValidationErrors
                        style={{ marginBottom: '20px' }}
                        errors={errors}
                    />
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">
                            Name
                        </InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            label="name"
                        />
                    </FormControl>
                    <Box mb={7}>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            freeSolo
                            renderTags={(value, getTagProps) => {
                                setCategories(value)
                                return value.map((option, index) => (
                                    <Chip
                                        sx={{
                                            '.MuiChip-deleteIcon': {
                                                color: '#fff',
                                            },
                                            fontSize: '14px',
                                            color: '#fff',
                                            backgroundColor: '#9c27b0',
                                        }}
                                        key={index}
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Tags"
                                    placeholder="Press enter after tag..."
                                />
                            )}
                            options={[]}
                        />
                    </Box>
                    <FormControl
                        sx={{
                            '.MuiFormControl-root': {
                                fontSize: '5px',
                                backgroundColor: '#000000',
                            },
                        }}>
                        <TextareaAutosize
                            sx={{ fontSize: '9px' }}
                            aria-label="minimum height"
                            minRows={10}
                            value={description}
                            type="text"
                            placeholder="Description"
                            style={{
                                width: '100%',
                                fontSize: '10px',
                                padding: '10px',
                                fontFamily: 'sans-serif',
                            }}
                            onChange={event =>
                                setDescription(event.target.value)
                            }
                        />
                    </FormControl>
                    {currentFile && (
                        <>
                            <Grow in={animate}>
                                <LinearProgress
                                    value={progress}
                                    variant="determinate"
                                    sx={{
                                        height: '20px',
                                    }}
                                />
                            </Grow>

                            <Typography
                                variant="body2"
                                color="text.secondary">{`${Math.round(
                                progress,
                            )}%`}</Typography>

                            <br />
                            <br />
                        </>
                    )}
                    <Button
                        sx={{ width: '100px' }}
                        variant="contained"
                        component="label">
                        Choose File
                        <input type="file" hidden onChange={selectFiles} />
                    </Button>
                    <br />
                    {imgData && imgData.includes('image') && (
                        <img width="200px" height="200px" src={imgData} />
                    )}

                    {imgData && !imgData.includes('image') && (
                        <Typography color="#FF0000 " variant="h5">
                            Please Select an image!
                        </Typography>
                    )}
                    {loading && <CircularProgress />}
                    <Typography variant="h5" color="#9c27b0">
                        {selectedFiles && selectedFiles.name}
                    </Typography>
                    <br />
                    <Button
                        sx={{ width: '60px' }}
                        type="submit"
                        color="secondary"
                        variant="contained"
                        disabled={!selectedFiles}>
                        Upload
                    </Button>
                </Box>
            </Box>
        </AdminLayout>
    )
}
export default CreateCourse
