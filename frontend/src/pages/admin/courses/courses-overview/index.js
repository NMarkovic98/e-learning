import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
const drawerWidth = 240
import AdminLayout from '../../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { CircularProgress } from '@mui/material'

import { useNavigate } from 'react-router-dom'

import { useToasts } from 'react-toast-notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MediaToolbar from '../../../../pages/admin/media/mediaToolbar'
import { Helmet } from 'react-helmet'


const Media = () => {
    const [pageSize, setPageSize] = useState(10)
    const { addToast } = useToasts()
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [selectedRowId, setSelectedRowId] = useState([])
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [userRole, setUserRole] = useState('')
    const open = Boolean(anchorEl)

    const handleClick = event => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const refreshData = () => {
        setRows([])
        const userId = localStorage.getItem('userId')

        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${userId}`,
            )
            .then(response => {
                if (response.data.user.role === 2) {
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUserCourses/${userId}`,
                        )
                        .then(response => {
                            setRows(
                                response.data.courses.map(course => {
                                    return course.course
                                }),
                            )
                        })
                }
            })
    }
    const getData = async () => {
        setLoading(true)
        const userId = localStorage.getItem('userId')

        await axios
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
                            setRows(value.data.response)
                            setLoading(false)
                        })
                }
                if (response.data.user.role === 2) {
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUserCourses/${userId}`,
                        )
                        .then(response => {
                            response.data.courses.forEach(course => {
                                setRows(prevCourses => [
                                    ...prevCourses,
                                    course.course,
                                ])
                            })
                        })
                }
            })
        setLoading(false)
    }

    useEffect(async () => {
        setLoading(true)
        await getData()
        setLoading(false)
    }, [])

    const editCourse = () => {
        // TODO edit course functionality
        navigate(`/admin/courses/edit-course/${selectedRowId}`)
    }

    const handleDeleteCourse = () => {
        setLoading(true)
        setAnchorEl(null)
        if (selectedRowId.length === 1) {
            axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/deleteCourse/${selectedRowId}/`,
            )
            if (userRole === 2) {
                refreshData()
            }
            if (userRole === 1) {
                getData()
            }

            addToast('Course deleted successful!', {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'success',
            })
        } else {
            addToast('Please select the course', {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'error',
            })
        }
        setLoading(false)
    }

    const columns = [
        {
            disableColumnMenu: true,
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: () => {
                return (
                    <div>
                        <MoreIcon
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}>
                            <MenuItem onClick={handleDeleteCourse}>
                                Delete
                            </MenuItem>
                            <MenuItem onClick={editCourse}>Edit</MenuItem>
                        </Menu>
                    </div>
                )
            },
            width: 60,
        },
        {
            disableColumnMenu: true,
            headerName: 'delete icon',
            field: 'delete icon',
            renderHeader: () => (
                <DeleteIcon
                    color="info"
                    fontSize="large"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        setLoading(true)

                        if (selectedRowId.length !== 0) {
                            axios
                                .delete(
                                    `${process.env.REACT_APP_BACKEND_URL}:${
                                        process.env.REACT_APP_BACKEND_PORT
                                    }/deleteCourses/${selectedRowId.join(',')}`,
                                )
                                .then(() => {
                                    if (userRole === 2) {
                                        refreshData()
                                    }
                                    if (userRole === 1) {
                                        getData()
                                    }
                                })

                            addToast(`Course deleted successfully`, {
                                autoDismiss: true,
                                autoDismissTimeout: 5000,
                                appearance: 'success',
                            })

                            setLoading(false)
                        } else {
                            addToast(`Please select course`, {
                                autoDismiss: true,
                                autoDismissTimeout: 5000,
                                appearance: 'error',
                            })
                        }
                    }}
                />
            ),
            width: 60,
            sortable: false,
            headerAlign: 'center',
        },
        { field: 'course_id', headerName: 'ID', width: 30 },
        { field: 'name', headerName: 'Name', width: 360 },
        {
            field: 'picture',
            headerName: 'Thumbnail',
            width: 90,
            renderCell: value => {
                return (
                    <img
                        width="50px"
                        src={`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/storage/picture/${value.value}`}
                    />
                )
            },
        },
        { field: 'description', headerName: 'Description', width: 600 },
    ]

    return (
        <AdminLayout>

            <Helmet>
                <title>Ademy - Courses Overview</title>
            </Helmet>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Box pb={4} pl={2}>
                    <Typography color="#9c27b0" variant="h4">
                        Courses
                    </Typography>
                </Box>
                <Box
                    pt={2}
                    sx={{
                        minHeight: '40vh',
                        height: '100%',
                        width: '100%',
                    }}>
                    {loading && !rows ? (
                        <CircularProgress />
                    ) : (
                        <DataGrid
                            getRowId={row => row.course_id}
                            sx={{
                                height:{sm:"500px",xs:"500px",md:"500px",lg:"70vh",xl:"70vh"},
                                width: 'auto',
                                minHeight: '40vh',
                                fontSize: '13px',
                                backgroundColor: '#fff',
                                borderRadius: '15px',
                                padding: '5px',
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                            }}
                            onSelectionModelChange={id => {
                                setSelectedRowId(id)
                            }}
                            rows={rows}
                            columns={columns}
                            pageSize={pageSize}
                            onPageSizeChange={newPageSize =>
                                setPageSize(newPageSize)
                            }
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            pagination
                            checkboxSelection
                            components={{ Toolbar: MediaToolbar }}
                        />
                    )}
                </Box>
                <Box pt={5} />
            </Box>
        </AdminLayout>
    )
}

export default Media
