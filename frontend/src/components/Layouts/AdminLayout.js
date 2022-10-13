import Navbar from '../../components/admin-components/Navbar'
import { Fragment } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Footer from '../../components/admin-components/Footer'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AdminLayout = props => {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
            const uid = localStorage.getItem('userId')
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${uid}`,
                )
                .then(response => {
                    if(response.data.user.role === 3){
                        navigate('/student')
                    }
                })

    })
    return (
        <Fragment>
            <Box
                border={0}
                pt={location.pathname === '/admin/profile' ? 0 : 15}
                pr={location.pathname === '/admin/profile' ? 0 : 10}
                pl={location.pathname === '/admin/profile' ? 0 : 10}
                pb={location.pathname === '/admin/profile' ? 0 : 10}
                sx={{
                    paddingRight: {
                        xs: 0,
                        sm: 0,
                        md: location.pathname === '/admin/profile' ? 0 : 10,
                        lg: location.pathname === '/admin/profile' ? 0 : 10,
                        xl: location.pathname === '/admin/profile' ? 0 : 10,
                        xxl: location.pathname === '/admin/profile' ? 0 : 10,
                    },
                    paddingLeft: {
                        xs: 0,
                        sm: 0,
                        md: location.pathname === '/admin/profile' ? 0 : 10,
                        lg: location.pathname === '/admin/profile' ? 0 : 10,
                        xl: location.pathname === '/admin/profile' ? 0 : 10,
                        xxl: location.pathname === '/admin/profile' ? 0 : 10,
                    },
                    minHeight: '90vh',
                    width: '100%',
                    display: 'flex',
                    height: 'auto',
                    backgroundColor: 'rgba(255,255,255)',
                }}>
                <CssBaseline />
                <Navbar />
                {props.children}
            </Box>
            <Footer />
        </Fragment>
    )
}
export default AdminLayout
