import AdminLayout from '../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import image from '../../../assets/images/profileImage.png'

import { Button, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { Helmet } from 'react-helmet'
function editUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [currentUsername, setCurrentUsername] = useState('');
    const [currentEmail, setCurrentEmail] =useState('');
    
    

    const params = useParams()
    const { uid } = params
    const {addToast} = useToasts()
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${uid}`,
            )
            .then(value => {
                const { name, username, email, role } = value.data.user
                setName(name)
                setUsername(username)
                setCurrentEmail(email);
                setCurrentUsername(name)
                setEmail(email)
                setRole(role)
            })
    }, [])

    const editUserHandler = e => {
        e.preventDefault()
        axios
            .put(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/updateUser?${uid}`,
                {
                    id: uid,
                    name: name,
                    username: username,
                    email: email,
                },
            )
            .then(response => {
                console.log(response.data.success)
                if (response.data.response.success === true) {
                    addToast('Profile updated successfully!', {
                        autoDismiss: true,
                        autoDismissTimeout: 5000,
                        appearance: 'success',
                    })
                }
            })
            .catch(error => {
                addToast('Could not update profile, please try again later!', {
                    autoDismiss: true,
                    autoDismissTimeout: 5000,
                    appearance: 'error',
                })
            })
    }
    return (
        <AdminLayout>
        
        <Helmet>
                <title>Ademy - Edit User</title>
            </Helmet>
                <Box width="100%" display="flex" justifyContent='center' flexDirection="column" alignItems="center">
                
                    <Box pt={5}>
                        <Fragment>
                            <Box
                                component="form"
                                color="#fff"
                                onSubmit={editUserHandler}
                                p={10}
                                mr={20}
                                mb={10}
                                mt={10}
                                sx={{
                                    boxShadow:
                                        'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderRadius: '20px',
                                    '& > :not(style)': { m: 1 },
                                }}>
                                <FormControl>
                                    <TextField
                                        inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                        InputLabelProps={{
                                            style: { fontSize: 13 },
                                        }}
                                        id="component-outlined"
                                        value={name}
                                        onChange={event =>
                                            setName(event.target.value)
                                        }
                                        label="Name"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                        InputLabelProps={{
                                            style: { fontSize: 13 },
                                        }}
                                        id="component-outlined"
                                        value={email}
                                        onChange={event =>
                                            setEmail(event.target.value)
                                        }
                                        label="Email"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                        InputLabelProps={{
                                            style: { fontSize: 13 },
                                        }}
                                        id="component-outlined"
                                        value={username}
                                        onChange={event =>
                                            setUsername(event.target.value)
                                        }
                                        label="username"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                        InputLabelProps={{
                                            style: { fontSize: 13 },
                                        }}
                                        id="component-outlined"
                                        value={role}
                                        onChange={event =>
                                            setRole(event.target.value)
                                        }
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
                                    Edit
                                </Button>
                            </Box>
                        </Fragment>
                    </Box>
                </Box>
            
        </AdminLayout>
    )
}

export default editUser
