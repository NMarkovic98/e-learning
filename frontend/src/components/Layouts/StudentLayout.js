import Footer from '../admin-components/Footer'
import Navbar from '../../pages/student/appbar'
import { Box } from '@mui/material'

const StudentLayout = props => {
    return (
        <Box sx={{ minHeight: '100vh' }} display="flex" flexDirection="column">
            <Navbar />
            <Box
                minHeight="100vh"
                width="100%"
                p={5}
                sx={{
                    backgroundColor: 'rgba(255,255,255)',
                    display: 'flex',
                    p: { md: 0, sm: 0, xs: 0, lg: 5, xl: 5 },
                }}>
                {props.children}
            </Box>
            <Footer />
        </Box>
    )
}
export default StudentLayout
