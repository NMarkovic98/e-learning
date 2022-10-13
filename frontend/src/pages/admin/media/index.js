import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
const drawerWidth = 240
import AdminLayout from '../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MediaToolbar from '../../../pages/admin/media/mediaToolbar'
import { CircularProgress } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


const Media = () => {
    const [pageSize, setPageSize] = useState(10)
    const [selectedRowId, setSelectedRowId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const navigate = useNavigate()
    const handleClick = event => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index
    }
    const refreshData = () => {
        setRows([])
        const userId = localStorage.getItem('userId')

        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listCourses`,
            )
            .then(value => {
                console.log(value)
                value.data.response.forEach(course => {
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourseMedia/${course.course_id}`,
                        )
                        .then(response => {
                            console.log(response)
                            response.data.media.forEach((medium, index) => {
                                setRows(prevRows => {
                                    return [...prevRows, medium.medium]
                                })
                            })
                        })
                })
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
                const userRole = response.data.user.role

                if (userRole && userRole === 1) {
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listMedia`,
                        )
                        .then(value => {
                            setRows(value.data.response)
                        })
                }
                if (userRole && userRole === 2) {
                    axios
                        .get(
                            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUserCourses/${userId}`,
                        )
                        .then(value => {
                            value.data.courses.forEach(course => {
                                axios
                                    .get(
                                        `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCourseMedia/${course.id}`,
                                    )
                                    .then(response => {
                                        response.data.media.forEach(
                                            (medium, index) => {
                                                setRows(prevRows => {
                                                    return [
                                                        ...prevRows,
                                                        medium.medium,
                                                    ]
                                                })
                                            },
                                        )
                                    })
                            })
                        })
                }
            })

        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])

    const handleDelete = () => {
        setAnchorEl(null)
        axios
            .delete(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/deleteMedium/${selectedRowId[0]}`,
            )
            .catch(error => {})
        refreshData()
    }

    const editMedia = e => {
        e.preventDefault()
        navigate(`/admin/courses/edit-medium/${selectedRowId[0]}`)
    }

    const columns = [
        {
            disableColumnMenu: true,
            field: 'action',
            headerName: 'Action',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderHeader: () => (
                <DeleteIcon
                    color="info"
                    fontSize="large"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        axios
                            .delete(
                                `${process.env.REACT_APP_BACKEND_URL}:${
                                    process.env.REACT_APP_BACKEND_PORT
                                }/deleteMedia/${selectedRowId.join(',')}`,
                            )

                            .catch(error => {
                                throw new Error(`${error.message}`)
                            })
                        refreshData()
                    }}
                />
            ),
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
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                            <MenuItem onClick={editMedia}>Edit</MenuItem>
                        </Menu>
                    </div>
                )
            },
            width: 40,
        },
        { field: 'cm_id', headerName: 'ID', width: 30 },
        { field: 'course_id', headerName: 'Course ID', width: 100 },
        {
            field: 'filename',
            headerName: 'Thumbnail',
            width: 150,
            renderCell: value => {
                return (
                    <video
                        width="50px"
                        src={`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/storage/media/${value.row.filename}`}
                    />
                )
            },
        },
        { field: 'title', headerName: 'Title', width: 200 },
        {
            field: 'description',
            headerName: 'Description',
            width: 360,
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 150,
            renderCell: date => {
                return new Date(date.value).toDateString()
            },
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            width: 150,
            renderCell: date => {
                return new Date(date.value).toDateString()
            },
        },
    ]

    return (
        <Fragment>
            <AdminLayout>
            <Helmet>
                    <title>Ademy - Media Overview</title>
                </Helmet>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}>
                    <Box pb={4} pl={2}>
                        <Typography color="#9c27b0" variant="h4">
                            Media
                        </Typography>
                    </Box>
                    <Box
                        pt={2}
                        sx={{
                            minHeight: '40vh',
                            height: '100%',
                            width: '100%',
                        }}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <DataGrid
                                getRowId={row => {
                                    return row.cm_id
                                }}
                                sx={{
                                    height:{sm:"500px",xs:"500px",md:"500px",lg:"70vh",xl:"70vh"},
                                    width: 'auto',
                                    minHeight: '40vh',
                                    fontSize: '13px',
                                    backgroundColor: '#fff',
                                    borderRadius: '15px',
                                    padding: '5px',
                                    boxShadow:
                                        'rgba(0, 0, 0, 0.35) 0px 5px 15px',
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
        </Fragment>
    )
}

export default Media
