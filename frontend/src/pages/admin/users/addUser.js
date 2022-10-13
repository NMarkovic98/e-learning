import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Button } from '@mui/material'
import AdminLayout from '../../../components/Layouts/AdminLayout'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import AuthValidationErrors from '../../../components/AuthValidationErrors'

const drawerWidth = 240
const AddUser = () => {
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setPasswordConfirmation] = useState('')
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')

    console.log(username, password)
    const { addToast } = useToasts()

    const addUserHandler = e => {
        e.preventDefault()
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/register`,
                {
                    name,
                    email,
                    password,
                    password_confirmation: confirmPassword,
                    username,
                    role,
                },
            )
            .then(res => {
                setErrors([res.data.message])
                if (res.data.success) {
                    setName('')
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    setPasswordConfirmation('')
                    setRole('')
                    addToast('User Added!', {
                        autoDismiss: true,
                        autoDismissTimeout: 5000,
                        appearance: 'success',
                    })
                }
                return res
            })
            .catch(error => {
                setErrors([error.response.data.message])
            })
    }

    return (
        <AdminLayout>
               <Helmet>
                <title>Ademy - Add User</title>
            </Helmet>
            <Box
                color="#fff"
                onSubmit={addUserHandler}
                component="form"
                p={10}
                width="100%"
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '20px',
                    '& > :not(style)': { m: 1 },
                }}>
                <AuthValidationErrors
                    style={{ marginBottom: '20px' }}
                    errors={errors}
                />
                <Box pb={5}>
                    <Typography color="#9c27b0" variant="h4">
                        Add user
                    </Typography>
                </Box>
                <FormControl sx={{ marginTop: '10px' }}>
                    <InputLabel htmlFor="component-outlined">Name</InputLabel>
                    <OutlinedInput
                        id="component-outlined-name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        label="Name"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                    <OutlinedInput
                        id="component-outlined-email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        label="Email"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">
                        Username
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined-username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        label="username"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-outlined-password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        label="Password"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-outlined-password">
                        Confirm Password
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined-confirm-password"
                        value={confirmPassword}
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        label="Confirm Password"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-outlined-role">
                        Role
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={role}
                        onChange={event => setRole(event.target.value)}
                        label="Role"
                    />
                </FormControl>
                <Button
                    className="ml-4"
                    style={{
                        marginTop: '3rem',
                        fontSize: 10,
                        width: '90px',
                        height: '30px',
                    }}
                    type="submit"
                    variant="contained"
                    color="primary">
                    Add
                </Button>
            </Box>
        </AdminLayout>
    )
}
export default AddUser
