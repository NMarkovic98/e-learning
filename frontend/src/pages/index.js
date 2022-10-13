import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

import backgroundImage from '../assets/images/bgHomePage.png'
import bgHome from '../assets/images/bgHome1.png'
import LoginIcon from '@mui/icons-material/Login'
import { useState, useEffect } from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import Popover from '@mui/material/Popover'
import { IconButton } from '@mui/material'
import axios from 'axios'

export default function Home() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [width, setWidth] = useState(null)

    const handleClick = event => {
        console.log('clicked')
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
        const userId = localStorage.getItem('userId')
        if (userId) {
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${userId}`,
                )
                .then(response => {
                    console.log(response.data.user.role)
                    if (
                        response.data.user.role === 1 ||
                        response.data.user.role === 2
                    ) {
                        navigate('/admin')
                    }
                    if (response.data.user.role === 3) {
                        navigate('/student')
                    }
                })
        }
    }, [])
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100%',
                backgroundColor: '#fff',
            }}>
            {/* NAV MENU */}
            <Box
                py={4}
                px={5}
                sx={{
                    marginBottom: { xs: '100px', sm: '100px' },
                    backgroundColor: '#fff',
                }}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                height="150px">
                <Box
                    height="100px"
                    flexDirection="row"
                    alignItems="center"
                    display="flex"
                    flex="1">
                    <img height={80} width={80} src={backgroundImage} />
                    <Typography color="#0494a4" variant="h3">
                        demy
                    </Typography>
                </Box>
                <Box
                    aria-describedby={id}
                    sx={{
                        display: {
                            sm: 'flex',
                            xs: 'flex',
                            md: 'none',
                            lg: 'none',
                            xl: 'none',
                        },
                    }}>
                    <MenuIcon
                        onClick={handleClick}
                        sx={{ cursor: 'pointer', color: '#0494a4' }}
                    />
                </Box>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                    <Box
                        sx={{ backgroundColor: '#0494a4' }}
                        p={3}
                        width="200px"
                        display="flex"
                        justifyContent="space-between"
                        flexDirection="column"
                        alignItems="flex-start">
                        <Box
                            mb={3}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigate('/login', { replace: true })
                            }}
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center">
                            <Box mr={1}>
                                <LoginIcon sx={{ color: '#fff' }} />
                            </Box>
                            <Box>
                                <Typography color="#fff" variant="h6">
                                    Login
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigate('/register', { replace: true })
                            }}
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center">
                            <Box mr={1}>
                                <GroupAddIcon sx={{ color: '#fff' }} />
                            </Box>
                            <Box>
                                <Typography color="#fff" variant="h6">
                                    Register
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Popover>
                <Box
                    width="20%"
                    sx={{
                        display: {
                            sm: 'none',
                            xs: 'none',
                            md: 'flex',
                            lg: 'flex',
                            xl: 'flex',
                        },
                    }}
                    justifyContent="space-between">
                    <Box
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                            navigate('/login', { replace: true })
                        }}
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Box mr={1}>
                            <LoginIcon sx={{ color: '#0494a4' }} />
                        </Box>
                        <Box>
                            <Typography color="#0494a4" variant="h6">
                                Login
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                            navigate('/register', { replace: true })
                        }}
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Box mr={1}>
                            <GroupAddIcon sx={{ color: '#0494a4' }} />
                        </Box>
                        <Box>
                            <Typography color="#0494a4" variant="h6">
                                Register
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* NAV MENU END */}
            <Box
                sx={{
                    flexDirection: {
                        sm: 'column',
                        xs: 'column',
                        md: 'row',
                        lg: 'row',
                        xl: 'row',
                    },
                }}
                display="flex"
                height="100%"
                width="100%">
                <Box
                    pb={10}
                    pl={5}
                    pr={5}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    sx={{
                        width: {
                            sm: '100%',
                            xs: '100%',
                            lg: '50%',
                            md: '50%',
                            xl: '50%',
                        },
                    }}
                    width="50%">
                    <img
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        }}
                        height="500px"
                        width="90%"
                        src={bgHome}
                    />
                </Box>
                <Box
                    pt={6}
                    pl={10}
                    sx={{
                        width: {
                            sm: '100%',
                            xs: '100%',
                            lg: '50%',
                            md: '50%',
                            xl: '50%',
                        },
                    }}
                    display="flex"
                    alignItems="flex-start"
                    flexDirection="column"
                    height="100%"
                    width="50%">
                    <Box mb={3} width="80%" display="flex">
                        <Typography variant="h3">
                            Welcome to the{' '}
                            <span style={{ color: '#0494a4' }}>Ademy</span>
                        </Typography>
                    </Box>
                    <Box width="70%">
                        <Typography sx={{ lineHeight: 1.5 }} variant="h4">
                            Choose over 185,000 online video courses with new
                            addditions published every month
                        </Typography>
                    </Box>
                    <Box
                        width="70%"
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        mt={10}
                        mb={10}>
                        <Button
                            onClick={() => {
                                navigate('/login')
                            }}
                            variant="contained"
                            sx={{ colro: '#0494a4' }}>
                            Get started
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
