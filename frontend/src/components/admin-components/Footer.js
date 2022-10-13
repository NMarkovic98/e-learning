import * as React from 'react'
import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'
export default function Footer() {
    const location = useLocation()
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState('')
    const drawerWidth = location.pathname.includes('student') ? 0 : 270

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${userId}`,
            )
            .then(response => {
                setUserRole(response.data.user.role)
            })
    }, [])
    if (userRole === 3) {
        return (
            <Box
                width="100%"
                height="100px"
                display="flex"
                p={1}
                justifyContent="space-around"
                alignItems="center">
                <Box mr={2}>
                    <Typography variant="h5">
                        Copyright &copy; Ademy Team 2022.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5">www.acemy.com</Typography>
                </Box>
            </Box>
        )
    }
    return (
        (userRole === 1 || userRole === 2) && (
            <Box
                px={2}
                sx={{
                    fontSize: '14px',
                    color: 'black',
                    height: '10vh',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    float: 'right',

                    backgroundColor: {
                        lg: 'rgba(255,255,255)',
                        xl: 'rgba(255,255,255)',
                        md: 'rgba(255,255,255)',
                        sm: 'rgba(255,255,255)',
                        xs: 'rgba(255,255,255)',
                    },
                    width: `calc(100% - ${drawerWidth}px)`,
                    '@media screen and (max-width: 1200px)': {
                        width: '100%',
                    },
                    '@media screen and (max-width: 686px)': {
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'center',
                        height: 'auto',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                    },
                }}>
                <Box
                    sx={{
                        '@media screen and (max-width: 686px)': {
                            width: '100%',
                            justifyContent: 'center',
                            marginBottom: '10%',
                        },
                    }}
                    width="50%"
                    display="flex"
                    justifyContent="flex-start">
                    <Box mr={2}>Copyright &copy; Ademy Team 2022.</Box>
                    <Box>www.ademy.com</Box>
                </Box>
                <Box
                    sx={{
                        '@media screen and (max-width: 686px)': {
                            width: '100%',
                            justifyContent: 'space-between',
                        },
                    }}
                    pl={5}
                    width="50%"
                    display="flex"
                    justifyContent="space-between">
                    {userRole && (userRole === 1 || userRole === 2) && (
                        <Box
                            onClick={() => {
                                navigate('/admin/courses/courses-overview', {
                                    replace: true,
                                })
                            }}
                            sx={{ cursor: 'pointer' }}>
                            Courses
                        </Box>
                    )}
                    {userRole && userRole === 1 && (
                        <Box
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigate('/admin/users/users-overview', {
                                    replace: true,
                                })
                            }}>
                            Users
                        </Box>
                    )}
                    {userRole && (userRole === 1 || userRole === 2) && (
                        <Box
                            onClick={() => {
                                navigate('/admin/media/media-overview', {
                                    replace: true,
                                })
                            }}>
                            Media
                        </Box>
                    )}
                </Box>
            </Box>
        )
    )
}
