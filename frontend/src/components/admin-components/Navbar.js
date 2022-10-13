import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Sidenav from '../../components/admin-components/Sidenav'
import PropTypes from 'prop-types'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
const drawerWidth = 270
const Navbar = props => {
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [userRole, setUserRole] = useState('')

    useEffect(() => {
        const uid = localStorage.getItem('userId')
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${uid}`,
            )
            .then(response => {
                setUserRole(response.data.user.role)
            })
    }, [])

    const { window } = props
    const container =
        window !== undefined ? () => window().document.body : undefined
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    ml: { lg: `${drawerWidth}px` },
                    border: 'none',
                }}>
                <Toolbar
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { lg: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {userRole === 1
                            ? 'Admin Dashboard'
                            : 'Profesor Dashboard'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
                aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}>
                    <Sidenav />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        '@media screen and (max-width: 627px)': {
                            display: 'none',
                        },
                        display: { xs: 'none', sm: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open>
                    <Sidenav />
                </Drawer>
            </Box>
        </>
    )
}
export default Navbar
Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}
