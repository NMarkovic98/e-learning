import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import { Popover } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export default function PrimarySearchAppBar() {
    const [userRole, setUserRole] = useState('')
    const [username, setUserName] = useState('')
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [width, setWidth] = useState(null)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const getWindowWidth = () => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 899) {
                setAnchorEl(null)
            }
            return window.innerWidth
        })
    }

    useEffect(() => {
        getWindowWidth()
    })

    useEffect(() => {
        if (width > 899) {
        }
    }, width)

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${userId}`,
            )
            .then(response => {
                setUserRole(response.data.user.role)
                setUserName(response.data.user.name)
            })
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => {
                            navigate('/student')
                        }}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}>
                        <HomeIcon fontSize="large" />
                    </IconButton>
                    <Typography
                        onClick={() => {
                            navigate('/student')
                        }}
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{
                            cursor: 'pointer',
                            display: { sm: 'block' },
                        }}>
                        A D E M Y
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ display: { md: 'flex', xs: 'none' } }}>
                        <Typography
                            onClick={() => {
                                navigate(`/student/profile/${userId}`)
                            }}
                            sx={{ cursor: 'pointer' }}>
                            {username}
                        </Typography>
                        <IconButton
                            onClick={() => {
                                navigate(`/student/profile/${userId}`)
                            }}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 4, ml: 1 }}>
                            <AccountCircle fontSize="large" />
                        </IconButton>
                        {userRole && userRole === 1 && (
                            <>
                                <Typography
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        navigate(`/admin/courses/add-course`)
                                    }}>
                                    Add new course
                                </Typography>
                                <IconButton
                                    onClick={() => {
                                        navigate(`/admin/courses/add-course`)
                                    }}
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 4, ml: 1 }}>
                                    <AddIcon fontSize="large" />
                                </IconButton>
                            </>
                        )}
                        {((userRole && userRole === 1) || userRole === 2) && (
                            <>
                                <Typography
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        navigate(`/admin`)
                                    }}>
                                    Administration
                                </Typography>
                                <IconButton
                                    onClick={() => {
                                        navigate(`/admin`)
                                    }}
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 4, ml: 1 }}>
                                    <SettingsIcon fontSize="large" />
                                </IconButton>
                            </>
                        )}
                        <Typography
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                localStorage.removeItem('userId')
                                navigate('/')
                            }}>
                            Logout
                        </Typography>
                        <IconButton
                            onClick={() => {
                                localStorage.removeItem('userId')
                                navigate('/')
                            }}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 4, ml: 1 }}>
                            <LogoutIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    <MenuIcon
                        onClick={handleClick}
                        sx={{
                            cursor: 'pointer',
                            display: {
                                xs: 'block',
                                sm: 'block',
                                md: 'none',
                                lg: 'none',
                            },
                        }}
                    />

                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}>
                        <Box
                            p={3}
                            width="200px"
                            display="flex"
                            justifyContent="space-between"
                            flexDirection="column"
                            alignItems="flex-start">
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-around">
                                <IconButton
                                    onClick={() => {
                                        navigate(`/admin/courses/add-course`)
                                    }}
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer">
                                    <AddIcon fontSize="large" />
                                </IconButton>
                                <Typography
                                    onClick={() => {
                                        navigate(`/admin/courses/add-course`)
                                    }}
                                    sx={{ cursor: 'pointer' }}>
                                    Add new course
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-around">
                                <IconButton
                                    onClick={() => {
                                        navigate(`/student/profile/${userId}`)
                                    }}
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer">
                                    <AccountCircle fontSize="large" />
                                </IconButton>
                                <Typography
                                    onClick={() => {
                                        navigate(`/student/profile/${userId}`)
                                    }}
                                    sx={{ cursor: 'pointer' }}>
                                    {username}
                                </Typography>
                            </Box>
                            {((userRole && userRole === 1) ||
                                userRole === 2) && (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-around">
                                    <IconButton
                                        onClick={() => {
                                            navigate(`/admin`)
                                        }}
                                        edge="start"
                                        color="inherit"
                                        aria-label="open drawer">
                                        <SettingsIcon fontSize="large" />
                                    </IconButton>
                                    <Typography
                                        onClick={() => {
                                            navigate(`/admin`)
                                        }}
                                        sx={{ cursor: 'pointer' }}>
                                        Administration
                                    </Typography>
                                </Box>
                            )}
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-around">
                                <IconButton
                                    onClick={() => {
                                        localStorage.removeItem('userId')
                                        navigate('/login')
                                    }}
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer">
                                    <LogoutIcon fontSize="large" />
                                </IconButton>
                                <Typography
                                    onClick={() => {
                                        localStorage.removeItem('userId')
                                        navigate('/login')
                                    }}
                                    sx={{ cursor: 'pointer' }}>
                                    Logout
                                </Typography>
                            </Box>
                        </Box>
                    </Popover>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
