import React, { useEffect } from 'react'
import StudentLayout from '../../../components/Layouts/StudentLayout'
import {
    Avatar,
    Box,
    Button,
    Card,
    CircularProgress,
    TextField,
    Typography,
} from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import Modal from '@mui/material/Modal'
import { Link, useParams } from 'react-router-dom'
import Videojs from '../../../video'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FormControl from '@mui/material/FormControl'
import Badge from '@mui/material/Badge'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

import {
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
} from 'react-share'

import ReplyIcon from '@mui/icons-material/Reply'

import NearMeSharpIcon from '@mui/icons-material/NearMeSharp'
import Checkbox from '@mui/material/Checkbox'
import { TwitterShareButton, FacebookMessengerShareButton } from 'react-share'
import { TwitterIcon, FacebookMessengerIcon, WhatsappIcon } from 'react-share'

const CourseOverview = () => {
    const [courseMedia, setCourseMedia] = useState([])
    const [videoSrc, setVideoSrc] = useState('')
    const [currentComment, setCurrentComment] = useState('')
    const [currentCategories, setCurrentCategories] = useState([])
    const [currentTitle, setCurrentTitle] = useState('')
    const [currentMediaId, setCurrentMediaId] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [currentDescription, setCurrentDescription] = useState('')
    const [comments, setListComments] = useState([])
    const [listUsers, setListUsers] = useState([])
    const [courseOwner, setCourseOwner] = useState('')
    const [courseCreatedAt, setCourseCreatedAt] = useState('')
    const [currentUserRole, setCurrentUserRole] = useState('')
    const [loading, setLoadading] = useState(false)
    const [courseName, setCourseName] = useState('')
    const courseId = useParams()
    const [openComments, setOpenComments] = useState(true)
    const [openTest, setOpenTest] = useState(false)
    const [similiarCourses, setSimiliarCourses] = useState([])
    const [currentUserId, setCurrentUserId] = useState('')

    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const proceedToCourseHandler = e => {
        navigate(`/student/courses/${e.target.id}`)
        window.location.reload(true)
    }
    console.log(currentUserId, userId)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const openTestHandler = e => {
        e.preventDefault()
        setOpenTest(true)
        setOpenComments(false)
    }

    const openCommentHandler = e => {
        e.preventDefault()
        setOpenTest(false)
        setOpenComments(true)
    }

    const addCommentHandler = e => {
        e.preventDefault()
        const user = parseInt(userId)
        const media = parseInt(currentMediaId)

        if (!currentComment) {
            return alert('Please enter the comment')
        }

        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/createComment`,
                {
                    uid: user,
                    cm_id: media,
                    comment: currentComment,
                },
            )
            .then(() => {
                setCurrentComment('')
                if (currentMediaId) {
                    let id = parseInt(currentMediaId)
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listComments/${id}`,
                        )
                        .then(res => {
                            setListComments(res.data.response)
                        })
                }
            })
    }

    const changeCurrentComment = e => {
        e.preventDefault()
        setCurrentComment(e.target.value)
    }

    const changeVideoPlayer = e => {
        let video = document.getElementsByClassName('vjs-tech')
        video[0].src = e.target.src
        let currentTitleDescription = courseMedia.filter(medium => {
            return (
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/storage/media/${medium.medium.filename}` ===
                e.target.src
            )
        })
        const description = currentTitleDescription[0].medium.description
        const title = currentTitleDescription[0].medium.title
        setCurrentMediaId(currentTitleDescription[0].medium.cm_id)
        setCurrentDescription(description)
        setCurrentTitle(title)
    }
    const getData = async () => {
        setLoadading(true)
        await axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourse/${courseId.cid}`,
            )
            .then(response => {
                setCourseName(response.data.media.name)
            })
            .catch(() => {
                setLoadading(false)
            })

        await axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourseMedia/${courseId.cid}`,
            )
            .then(value => {
                setCourseMedia(value.data.media)
                setCurrentTitle(value.data.media[0].medium.title)
                setCurrentDescription(value.data.media[0].medium.description)
                setCurrentMediaId(value.data.media[0].medium.cm_id)
            })
            .catch(() => {
                setLoadading(false)
            })

        await axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourseCategories/${courseId.cid}`,
            )
            .then(res => {
                setCurrentCategories(res.data.courses)

                res.data.courses.forEach(category => {
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCoursesByCategory/${category.category_id}`,
                        )
                        .then(response => {
                            setSimiliarCourses(prevCourses => {
                                return [...response.data.courses]
                            })
                        })
                })
            })
            .catch(() => {
                setLoadading(false)
            })

        await axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listUsers`,
            )
            .then(response => {
                setListUsers(response.data.response)
            })
            .catch(() => {
                setLoadading(false)
            })

        await axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${userId}`,
            )
            .then(response => {
                setCurrentUser(response.data.user.name)

                setCurrentUserRole(response.data.user.role)
            })
            .catch(() => {
                setLoadading(false)
            })
        setLoadading(false)
    }

    useEffect(async () => {
        if (currentMediaId) {
            let id = parseInt(currentMediaId)
            await axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listComments/${id}`,
                )
                .then(res => {
                    setListComments(res.data.response)
                })
                .catch(() => {
                    setLoadading(false)
                })
        }
    }, [currentMediaId])

    useEffect(() => {
        getData()
    }, [])

    useEffect(async () => {
        await axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourse/${courseId.cid}`,
            )
            .then(response => {
                if (listUsers) {
                    listUsers.map(user => {
                        if (user.id === response.data.media.uid) {
                            setCourseOwner(user.name)
                            setCurrentUserId(user.id)
                        }
                    })
                }
                setCourseCreatedAt(
                    new Date(response.data.media.created_at).toDateString(),
                )
            })
            .catch(() => {
                setLoadading(false)
            })
    }, [listUsers])

    const handleDeleteCurrentMedium = () => {
        axios
            .delete(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/deleteMedium/${currentMediaId}`,
            )
            .then(() => {
                axios
                    .get(
                        `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourseMedia/${courseId.cid}`,
                    )
                    .then(value => {
                        setCourseMedia(value.data.media)
                        setCurrentTitle(value.data.media[0].medium.title)
                        setCurrentDescription(
                            value.data.media[0].medium.description,
                        )
                        setCurrentMediaId(value.data.media[0].medium.cm_id)
                    })
                    .then(() => {
                        if (courseMedia) {
                            let video = document.getElementsByClassName(
                                'vjs-tech',
                            )
                            video[0].src = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/storage/media/${courseMedia[0].medium.filename}`
                        }
                    })
            })
            .catch(error => {})
    }

    let videoJsOptions = {}
    if (courseMedia[0] && videoSrc === '') {
        videoJsOptions = {
            id: 'test',
            autoplay: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            controls: true,
            sources: [
                {
                    src:
                        videoSrc !== ''
                            ? videoSrc
                            : `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/storage/media/${courseMedia[0].medium.filename}`,
                    type: 'video/mp4',
                },
            ],
        }
    }

    if (loading) {
        return (
            <StudentLayout>
                <CircularProgress />
            </StudentLayout>
        )
    }

    if (!loading && !courseMedia[0]) {
        return (
            <StudentLayout>
                <Typography
                    sx={{
                        paddingTop: {
                            lg: '0',
                            xl: '0',
                            md: '50px',
                            sm: '50px',
                            xs: '50px',
                        },
                        paddingLeft: {
                            lg: '0',
                            xl: '0',
                            md: '50px',
                            sm: '50px',
                            xs: '50px',
                        },
                    }}
                    variant="h3">
                    There are no available videos yet
                </Typography>
            </StudentLayout>
        )
    }

    return (
        <StudentLayout>
            {
                <Box
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    display="flex"
                    flexDirection="column"
                    px={8}
                    py={8}
                    flex={1}
                    width="100%"
                    height="auto"
                    sx={{
                        backgroundColor: '#fff',
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    }}>
                    {courseName && (
                        <Box
                            mb={2}
                            display="flex"
                            width="100%"
                            justifContent="flex-start">
                            <Typography variant="h4" fontWeight="bold">
                                {courseName}
                            </Typography>
                        </Box>
                    )}

                    <Box
                        display="flex"
                        mb={3}
                        sx={{
                            flexDirection: {
                                xs: 'column',
                                sm: 'column',
                                md: 'row',
                                lg: 'row',
                                xl: 'row',
                            },
                            justifyContent: {
                                xs: 'flex-start',
                                sm: 'flex-start',
                                md: 'space-between',
                                lg: 'space-between',
                                xl: 'space-between',
                            },
                            alignItems: {
                                xs: 'flex-start',
                                sm: 'flex-start',
                                md: 'center',
                                lg: 'center',
                                xl: 'center',
                            },
                        }}
                        width="100%"
                        alignItems="center"
                        justifyContent="space-between">
                        <Box>
                            {courseCreatedAt ? (
                                <Typography color="gray" variant="h6">
                                    Published:{courseCreatedAt}
                                </Typography>
                            ) : (
                                <CircularProgress />
                            )}
                            {courseOwner ? (
                                <Typography color="gray" variant="h6">
                                    Teacher:{courseOwner}
                                </Typography>
                            ) : (
                                <CircularProgress />
                            )}
                        </Box>
                        {currentUserRole &&
                            (currentUserRole === 1 ||
                                (currentUserRole === 2 &&
                                    currentUserId === parseInt(userId))) && (
                                <Box display="flex">
                                    <Button
                                        onClick={handleDeleteCurrentMedium}
                                        sx={{
                                            color: '#9c27b0',
                                        }}
                                        startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            navigate(
                                                `/admin/courses/edit-medium/${currentMediaId}`,
                                            )
                                        }}
                                        sx={{
                                            color: '#9c27b0',
                                        }}
                                        size="large"
                                        startIcon={<EditIcon />}>
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            navigate('/admin/media/add-media')
                                        }}
                                        sx={{
                                            color: '#9c27b0',
                                        }}
                                        size="large"
                                        startIcon={<AddIcon />}>
                                        Upload
                                    </Button>
                                </Box>
                            )}
                    </Box>
                    {/* VIDEOS WRAPPER */}
                    {/* MAIN VIDEO*/}
                    {!loading && courseMedia[0] && (
                        <Box
                            width="100%"
                            height="100%"
                            maxHeight="500px"
                            sx={{
                                '.video-js': {
                                    width: '100% !important',
                                    maxHeight: '500px',
                                    minHeight: '499px',
                                },
                            }}
                            display="flex">
                            <Videojs id="change-id" {...videoJsOptions} />
                        </Box>
                    )}
                    {/* SIDE VIDEOS */}
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        sx={{
                            '@media screen and (max-width: 1000px)': {
                                flexDirection: 'column-reverse',
                            },
                        }}
                        mt={'2%'}>
                        {/* MEDIUM INFO START */}
                        {!loading && courseMedia[0] && (
                            <Box
                                sx={{
                                    '@media screen and (max-width: 1000px)': {
                                        width: '100%',
                                    },
                                }}
                                width="70%">
                                <Box>
                                    {courseMedia[0] ? (
                                        <Box
                                            mb={2}
                                            display="flex"
                                            flexDirection="column">
                                            <Box
                                                mt={2}
                                                mb={2}
                                                display="flex"
                                                justifyContent="felx-start">
                                                {currentCategories ? (
                                                    currentCategories.map(
                                                        category => {
                                                            return (
                                                                <Typography
                                                                    sx={{
                                                                        cursor:
                                                                            'pointer',
                                                                        color:
                                                                            '#1976d2',
                                                                        marginRight:
                                                                            '5%',
                                                                    }}
                                                                    variant="h5"
                                                                    key={
                                                                        category.name
                                                                    }>
                                                                    <Link
                                                                        style={{
                                                                            textDecoration:
                                                                                'none',
                                                                            color:
                                                                                '#1976d2',
                                                                        }}
                                                                        to={`/student?category=${category.name}`}>
                                                                        {'#' +
                                                                            category.name}
                                                                    </Link>
                                                                </Typography>
                                                            )
                                                        },
                                                    )
                                                ) : (
                                                    <CircularProgress />
                                                )}
                                            </Box>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                width="100%"
                                                sx={{
                                                    flexDirection: {
                                                        md: 'column',
                                                        sm: 'column',
                                                        xs: 'column',
                                                        lg: 'row',
                                                    },
                                                    justifyContent: {
                                                        lg: 'flex-start',
                                                        md: 'flex-start',
                                                        sm: 'flex-start',
                                                        xs: 'flex-start',
                                                    },
                                                }}
                                                alignItems="center"
                                                mb={3}>
                                                <Box
                                                    sx={{
                                                        marginBottom: {
                                                            md: '20px',
                                                            sm: '20px',
                                                            xs: '30px',
                                                        },
                                                        width: {
                                                            md: '100%',
                                                            xs: '100%',
                                                            sm: '100%',
                                                        },
                                                        pl: {
                                                            md: '20px',
                                                            sm: '20px',
                                                            xs: '20px',
                                                            lg: '0',
                                                        },
                                                    }}
                                                    display="flex"
                                                    pr={2}
                                                    mr={6}>
                                                    <Typography variant="h3">
                                                        {currentTitle}
                                                    </Typography>
                                                </Box>

                                                <Box
                                                    display="flex"
                                                    alignSelf="flex-start"
                                                    sx={{
                                                        justifyContent: {
                                                            md: 'flex-start',
                                                            sm: 'flex-start',
                                                            xs: 'flex-start',
                                                            lg: 'flex-end',
                                                        },
                                                    }}
                                                    justifyContent="flex-end">
                                                    <Box
                                                        mr={2}
                                                        display="flex"
                                                        alignItems="center">
                                                        <WhatsappShareButton
                                                            title={currentTitle}
                                                            url={
                                                                window.location
                                                            }
                                                            separator="-">
                                                            <WhatsappIcon
                                                                size={24}
                                                                round
                                                            />
                                                        </WhatsappShareButton>
                                                    </Box>
                                                    <Box
                                                        mr={2}
                                                        display="flex"
                                                        alignItems="center">
                                                        <FacebookMessengerShareButton
                                                            appId="634511854554539"
                                                            url="https://vtsns.edu.rs/o-skoli/">
                                                            <FacebookMessengerIcon
                                                                size={24}
                                                                round
                                                            />
                                                        </FacebookMessengerShareButton>
                                                    </Box>

                                                    <Box
                                                        mr={2}
                                                        display="flex"
                                                        alignItems="center">
                                                        <TwitterShareButton
                                                            url={`${window.location}`}
                                                            resetButtonStyle
                                                            openShareDialogOnClick
                                                            title={currentTitle}
                                                            hashtags={[
                                                                'ademy',
                                                                ...currentCategories.map(
                                                                    category =>
                                                                        category.name,
                                                                ),
                                                            ]}
                                                            related={[
                                                                'Nikola',
                                                            ]}>
                                                            <TwitterIcon
                                                                size={24}
                                                                round
                                                            />
                                                        </TwitterShareButton>
                                                    </Box>
                                                    <Box
                                                        mr={2}
                                                        display="flex"
                                                        alignItems="center">
                                                        <LinkedinShareButton
                                                            title={currentTitle}
                                                            summary={
                                                                currentDescription
                                                            }
                                                            source="
                                                            https://vtsns.edu.rs/
                                                        "
                                                            url="
                                                                https://vtsns.edu.rs/
                                                            ">
                                                            <LinkedinIcon
                                                                size={24}
                                                                round
                                                            />
                                                        </LinkedinShareButton>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box alignSelf="flex-start" mt={2}>
                                                <Typography
                                                    color="#9c27b0"
                                                    variant="h4">
                                                    Description
                                                </Typography>
                                            </Box>
                                            <Box alignSelf="flex-start" mt={2}>
                                                <Typography variant="h5">
                                                    {currentDescription}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <CircularProgress />
                                    )}
                                </Box>

                                {/*COMMENTS START*/}
                                <Box
                                    mt={4}
                                    display="flex"
                                    justifContent="flex-start">
                                    <Box
                                        onClick={openCommentHandler}
                                        mr={2}
                                        px={2}
                                        py={1}
                                        borderRadius={2}
                                        sx={{
                                            cursor: 'pointer',
                                            backgroundColor: `${
                                                openComments
                                                    ? '#9c27b0'
                                                    : '#d5d5d5'
                                            }`,
                                        }}>
                                        <Typography
                                            color={
                                                openComments
                                                    ? '#fff'
                                                    : '#9c27b0'
                                            }
                                            variant="h6">
                                            Comments
                                        </Typography>
                                    </Box>

                                    <Box
                                        onClick={openTestHandler}
                                        mr={2}
                                        px={2}
                                        py={1}
                                        borderRadius={2}
                                        sx={{
                                            cursor: 'pointer',
                                            backgroundColor: `${
                                                openTest ? '#9c27b0' : '#d5d5d5'
                                            }`,
                                        }}>
                                        <Typography
                                            color={
                                                openTest ? '#fff' : '#9c27b0'
                                            }
                                            variant="h6">
                                            Test
                                        </Typography>
                                    </Box>
                                </Box>

                                {openComments && (
                                    <Box
                                        mt={5}
                                        p={10}
                                        justifyContent="flex-start"
                                        display="flex"
                                        flexDirection="column"
                                        width="100%"
                                        height="auto"
                                        overflow="auto"
                                        sx={{
                                            boxShadow:
                                                'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                            '@media screen and (max-width: 1669px)': {
                                                p: 1,
                                            },
                                        }}>
                                        <Box
                                            component="form"
                                            onSubmit={addCommentHandler}>
                                            {currentUser ? (
                                                <Box
                                                    mb={2}
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center">
                                                    <Box
                                                        display="flex"
                                                        alignItems="center">
                                                        <Avatar
                                                            sx={{
                                                                marginRight:
                                                                    '2%',
                                                                height: '20px',
                                                                width: '20px',
                                                            }}
                                                        />{' '}
                                                        {currentUser}
                                                    </Box>
                                                    <Box>
                                                        {comments &&
                                                            comments.length}{' '}
                                                        comments
                                                    </Box>
                                                </Box>
                                            ) : (
                                                <CircularProgress />
                                            )}
                                            <FormControl
                                                sx={{ marginBottom: '40px' }}
                                                fullWidth>
                                                <TextField
                                                    value={currentComment}
                                                    onChange={
                                                        changeCurrentComment
                                                    }
                                                    variant="outlined"
                                                    placeholder="Enter the comment..."
                                                    InputProps={{
                                                        endAdornment: (
                                                            <NearMeSharpIcon
                                                                onClick={
                                                                    addCommentHandler
                                                                }
                                                                fontSize="large"
                                                                sx={{
                                                                    cursor:
                                                                        'pointer',
                                                                }}
                                                                color="secondary"
                                                            />
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                            <Box
                                                display="flex"
                                                minHeight="400px"
                                                maxHeight="400px"
                                                sx={{ overflowY: 'auto' }}
                                                flexDirection="column">
                                                {comments.length > 0 ? (
                                                    comments
                                                        .slice(0)
                                                        .reverse()
                                                        .map(comment => {
                                                            return (
                                                                <Box
                                                                    sx={{
                                                                        boxShadow:
                                                                            'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',
                                                                        px: 2,
                                                                        py: 1,
                                                                        borderRadius: 5,
                                                                    }}
                                                                    key={
                                                                        comment.comment_id
                                                                    }
                                                                    display="flex"
                                                                    justifyContent="flex-start"
                                                                    alignItems="center"
                                                                    flexDirection="column"
                                                                    width="100%"
                                                                    mb={2}
                                                                    bgcolor="#fff">
                                                                    <Box
                                                                        display="flex"
                                                                        justifyContent="space-between"
                                                                        width="100%">
                                                                        <Typography
                                                                            variant="caption"
                                                                            fontSize="12px">
                                                                            {new Date(
                                                                                comment.created_at,
                                                                            ).toDateString()}
                                                                        </Typography>
                                                                        <Badge
                                                                            sx={{
                                                                                display:
                                                                                    'flex',
                                                                                justifyContent:
                                                                                    'center',
                                                                                alignItems:
                                                                                    'center',
                                                                                p:
                                                                                    '3px',
                                                                                width:
                                                                                    '50px',
                                                                                fontSize:
                                                                                    '12px',
                                                                                borderRadius:
                                                                                    '5px',
                                                                                color:
                                                                                    '#fff',
                                                                                backgroundColor:
                                                                                    'rgb(33, 150, 243)',
                                                                            }}>
                                                                            {listUsers.map(
                                                                                user => {
                                                                                    if (
                                                                                        user.id ===
                                                                                        comment.uid
                                                                                    ) {
                                                                                        if (
                                                                                            user.role ===
                                                                                            3
                                                                                        ) {
                                                                                            return 'student'
                                                                                        }
                                                                                        if (
                                                                                            user.role ===
                                                                                            2
                                                                                        ) {
                                                                                            return 'teacher'
                                                                                        }
                                                                                        if (
                                                                                            user.role ===
                                                                                            1
                                                                                        ) {
                                                                                            return 'admin'
                                                                                        }
                                                                                    }
                                                                                },
                                                                            )}
                                                                        </Badge>
                                                                    </Box>
                                                                    <Box
                                                                        display="flex"
                                                                        width="100%"
                                                                        justifyContent="flex-start">
                                                                        <Box alignSelf="flex-start">
                                                                            <Avatar
                                                                                sx={{
                                                                                    marginRight:
                                                                                        '10px',
                                                                                    height:
                                                                                        '20px',
                                                                                    width:
                                                                                        '20px',
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                        <Box
                                                                            display="flex"
                                                                            flexDirection="column">
                                                                            <Typography
                                                                                fontWeight="bold"
                                                                                sx={{
                                                                                    marginRight:
                                                                                        '20px',
                                                                                }}
                                                                                variant="h6">
                                                                                {listUsers.map(
                                                                                    user => {
                                                                                        if (
                                                                                            user.id ===
                                                                                            comment.uid
                                                                                        ) {
                                                                                            return user.name
                                                                                        }
                                                                                    },
                                                                                )}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box
                                                                            flex={
                                                                                1
                                                                            }
                                                                            height="auto"
                                                                            display="flex"
                                                                            alignSelf="flex-end">
                                                                            <Typography
                                                                                align="justify"
                                                                                style={{
                                                                                    wordWrap:
                                                                                        'break-word',
                                                                                }}
                                                                                sx={{
                                                                                    maxWidth:
                                                                                        '100%',
                                                                                }}
                                                                                variant="h6">
                                                                                {
                                                                                    comment.comment
                                                                                }
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            )
                                                        })
                                                ) : (
                                                    <Box
                                                        display="flex"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        height="200px">
                                                        <Typography variant="h4">
                                                            There are no
                                                            available comments
                                                            yet
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                                {openTest && (
                                    <Box
                                        my={5}
                                        justifyContent="flex-start"
                                        display="flex"
                                        flexDirection="column"
                                        width="100%"
                                        height="auto"
                                        overflow="auto"
                                        sx={{
                                            boxShadow:
                                                'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                            '@media screen and (max-width: 1669px)': {
                                                p: 5,
                                            },
                                        }}>
                                        <Box>
                                            <Typography
                                                fontWeight="bold"
                                                variant="h4"
                                                sx={{ marginBottom: '20px' }}>
                                                {courseName}
                                            </Typography>
                                        </Box>
                                        <Box
                                            mb={5}
                                            width="100%"
                                            flexDirection="column"
                                            display="flex">
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold">
                                                    1.Lorem ipsum dolor sit
                                                    amet, consectetur adipiscing
                                                    elit. Aenean arcu ipsum,
                                                    egestas in rutrum id,
                                                    dignissim convallis lorem.
                                                    Sed semper massa vitae
                                                    eleifend laoreet. Nunc
                                                    euismod neque et nisl
                                                    blandit porttitor.?
                                                </Typography>
                                            </Box>
                                            <Box
                                                mt={4}
                                                minWidth="153px"
                                                display="flex"
                                                flexDirection="column">
                                                <Box
                                                    width="100%"
                                                    mb={2}
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 1
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 2
                                                    </Box>
                                                </Box>
                                                <Box
                                                    width="100%"
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 3
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 4
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            mb={5}
                                            width="100%"
                                            flexDirection="column"
                                            display="flex">
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold">
                                                    1.Lorem ipsum dolor sit
                                                    amet, consectetur adipiscing
                                                    elit. Aenean arcu ipsum,
                                                    egestas in rutrum id,
                                                    dignissim convallis lorem.
                                                    Sed semper massa vitae
                                                    eleifend laoreet. Nunc
                                                    euismod neque et nisl
                                                    blandit porttitor.?
                                                </Typography>
                                            </Box>
                                            <Box
                                                mt={4}
                                                minWidth="153px"
                                                display="flex"
                                                flexDirection="column">
                                                <Box
                                                    width="100%"
                                                    mb={2}
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 1
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 2
                                                    </Box>
                                                </Box>
                                                <Box
                                                    width="100%"
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 3
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 4
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            mb={5}
                                            width="100%"
                                            flexDirection="column"
                                            display="flex">
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold">
                                                    1.Lorem ipsum dolor sit
                                                    amet, consectetur adipiscing
                                                    elit. Aenean arcu ipsum,
                                                    egestas in rutrum id,
                                                    dignissim convallis lorem.
                                                    Sed semper massa vitae
                                                    eleifend laoreet. Nunc
                                                    euismod neque et nisl
                                                    blandit porttitor.?
                                                </Typography>
                                            </Box>
                                            <Box
                                                mt={4}
                                                minWidth="153px"
                                                display="flex"
                                                flexDirection="column">
                                                <Box
                                                    width="100%"
                                                    mb={2}
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 1
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 2
                                                    </Box>
                                                </Box>
                                                <Box
                                                    width="100%"
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 3
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 4
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            mb={5}
                                            width="100%"
                                            flexDirection="column"
                                            display="flex">
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold">
                                                    1.Lorem ipsum dolor sit
                                                    amet, consectetur adipiscing
                                                    elit. Aenean arcu ipsum,
                                                    egestas in rutrum id,
                                                    dignissim convallis lorem.
                                                    Sed semper massa vitae
                                                    eleifend laoreet. Nunc
                                                    euismod neque et nisl
                                                    blandit porttitor.?
                                                </Typography>
                                            </Box>
                                            <Box
                                                mt={4}
                                                minWidth="153px"
                                                display="flex"
                                                flexDirection="column">
                                                <Box
                                                    width="100%"
                                                    mb={2}
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 1
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 2
                                                    </Box>
                                                </Box>
                                                <Box
                                                    width="100%"
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 3
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 4
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            mb={5}
                                            width="100%"
                                            flexDirection="column"
                                            display="flex">
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold">
                                                    1.Lorem ipsum dolor sit
                                                    amet, consectetur adipiscing
                                                    elit. Aenean arcu ipsum,
                                                    egestas in rutrum id,
                                                    dignissim convallis lorem.
                                                    Sed semper massa vitae
                                                    eleifend laoreet. Nunc
                                                    euismod neque et nisl
                                                    blandit porttitor.?
                                                </Typography>
                                            </Box>
                                            <Box
                                                mt={4}
                                                minWidth="153px"
                                                display="flex"
                                                flexDirection="column">
                                                <Box
                                                    width="100%"
                                                    mb={2}
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 1
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 2
                                                    </Box>
                                                </Box>
                                                <Box
                                                    width="100%"
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 3
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 4
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            mb={5}
                                            width="100%"
                                            flexDirection="column"
                                            display="flex">
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold">
                                                    1.Lorem ipsum dolor sit
                                                    amet, consectetur adipiscing
                                                    elit. Aenean arcu ipsum,
                                                    egestas in rutrum id,
                                                    dignissim convallis lorem.
                                                    Sed semper massa vitae
                                                    eleifend laoreet. Nunc
                                                    euismod neque et nisl
                                                    blandit porttitor.?
                                                </Typography>
                                            </Box>
                                            <Box
                                                mt={4}
                                                minWidth="153px"
                                                display="flex"
                                                flexDirection="column">
                                                <Box
                                                    width="100%"
                                                    mb={2}
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 1
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 2
                                                    </Box>
                                                </Box>
                                                <Box
                                                    width="100%"
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 3
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 4
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            mb={5}
                                            width="100%"
                                            flexDirection="column"
                                            display="flex">
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold">
                                                    1.Lorem ipsum dolor sit
                                                    amet, consectetur adipiscing
                                                    elit. Aenean arcu ipsum,
                                                    egestas in rutrum id,
                                                    dignissim convallis lorem.
                                                    Sed semper massa vitae
                                                    eleifend laoreet. Nunc
                                                    euismod neque et nisl
                                                    blandit porttitor.?
                                                </Typography>
                                            </Box>
                                            <Box
                                                mt={4}
                                                minWidth="153px"
                                                display="flex"
                                                flexDirection="column">
                                                <Box
                                                    width="100%"
                                                    mb={2}
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        This is the first answer
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        This is the second
                                                        answer placeholder with
                                                        other length then first
                                                    </Box>
                                                </Box>
                                                <Box
                                                    width="100%"
                                                    display="flex"
                                                    justifyContent="flex-start">
                                                    <Box mr={3}>
                                                        <Checkbox />
                                                        Answer 3
                                                    </Box>
                                                    <Box>
                                                        <Checkbox />
                                                        Answer 4
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            width="100%"
                                            display="flex"
                                            justifyContent="flex-start">
                                            <Button
                                                onClick={setOpen}
                                                variant="contained">
                                                Finish test
                                            </Button>
                                        </Box>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description">
                                            <Box sx={style}>
                                                <Typography
                                                    id="modal-modal-title"
                                                    variant="h6"
                                                    component="h2">
                                                    {courseName}
                                                </Typography>
                                                <Typography
                                                    id="modal-modal-description"
                                                    sx={{ mt: 2 }}>
                                                    Congratz, you scored 92% in
                                                    this test
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </Box>
                                )}
                            </Box>
                        )}
                        {courseMedia[0] && (
                            <Box
                                display="flex"
                                minWidth="30%"
                                height="850px"
                                alignItems="flex-end"
                                overflow="auto"
                                flexDirection="column"
                                sx={{
                                    '@media screen and (max-width: 1000px)': {
                                        minHeight: '100px',
                                        maxHeight: '200px',
                                        minWidth: '200px',
                                        height: '100%',
                                        overflowX: 'auto',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    },
                                }}>
                                {courseMedia.map(medium => {
                                    return (
                                        <Box
                                            maxWidth="200px"
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="flex-end"
                                            py={2}
                                            sx={{
                                                '@media screen and (max-width: 1000px)': {
                                                    marginRight: '3%',
                                                    height: 'auto',
                                                    minWidth: '200px',
                                                },
                                            }}
                                            key={medium.medium.filename}>
                                            <video
                                                style={{
                                                    padding: 0,
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    cursor: 'pointer',
                                                    maxWidth: '200px',
                                                }}
                                                key={medium.medium.filename}
                                                onClick={changeVideoPlayer}
                                                src={`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/storage/media/${medium.medium.filename}`}
                                                width="100%"
                                                height={100}
                                            />
                                            <Typography
                                                sx={{
                                                    '@media screen and (max-width: 1000px)': {
                                                        paddingLeft: '10px',
                                                    },
                                                }}
                                                variant="h6">
                                                {medium.medium.title.length > 15
                                                    ? medium.medium.title.slice(
                                                          0,
                                                          30,
                                                      ) + '...'
                                                    : medium.medium.title}
                                            </Typography>
                                        </Box>
                                    )
                                })}
                            </Box>
                        )}
                    </Box>
                    <Box
                        mt={4}
                        display="flex"
                        width="100%"
                        flexDirection="column"
                        height="auto">
                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            height="20%"
                            width="100%">
                            <Typography variant="h4">
                                Recommended for you
                            </Typography>
                        </Box>
                        <Box
                            p={2}
                            mt={3}
                            display="flex"
                            justifyContent={`${
                                similiarCourses.length >= 3
                                    ? 'space-between'
                                    : 'flex-start'
                            }`}
                            flexWrap="wrap"
                            height="auto"
                            width="100%">
                            {similiarCourses &&
                                similiarCourses.map((course, index) => {
                                    if (index > 3) {
                                        return null
                                    }
                                    return (
                                        <Box
                                            key={course.course_id}
                                            maxWidth="150px"
                                            onClick={proceedToCourseHandler}
                                            id={course.course_id}
                                            sx={{ cursor: 'pointer' }}
                                            mr={
                                                similiarCourses.length < 3
                                                    ? '50px'
                                                    : '0'
                                            }
                                            displaty="flex"
                                            flexDirection="column">
                                            <Box
                                                id={course.course_id}
                                                height="60%"
                                                width="100%">
                                                <img
                                                    id={course.course_id}
                                                    src={`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/storage/picture/${course.picture}`}
                                                    height="100% "
                                                    width="100%"
                                                />
                                            </Box>
                                            <Box
                                                p={2}
                                                id={course.course_id}
                                                key={course.course_id}
                                                height="auto"
                                                width="100%">
                                                <Typography variant="h6">
                                                    {course.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )
                                })}
                        </Box>
                    </Box>
                </Box>
            }
        </StudentLayout>
    )
}
export default CourseOverview
