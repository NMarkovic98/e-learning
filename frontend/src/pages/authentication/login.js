import image from '../../assets/images/login.webp'
import FormWrapper from '../../components/FormWrapper'
import { Button, Link, TextField, Typography } from '@mui/material'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthValidationErrors from '../../components/AuthValidationErrors'
import React from 'react'

const Login = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (userId) {
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getUser/${userId}`,
                )
                .then(response => {
                    if (response.data.user.role === 3) {
                        navigate('/student')
                    }
                    if (response.data.user.role === 2) {
                        navigate('/admin')
                    }
                    if (response.data.user.role === 1) {
                        navigate('/admin')
                    }
                })
        }
    }, [])
    const submitForm = async event => {
        setLoading(true)
        event.preventDefault()
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/login`,
                {
                    email,
                    password,
                },
            )
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('userId', res.data.user.id)
                    if (res.data.user.role === 1) {
                        navigate(`/admin`)
                    } else if (res.data.user.role === 3) {
                        navigate(`/student`)
                    } else {
                        navigate(`/admin`)
                    }
                } else {
                    setErrors([res.data.message])
                }
            })
            .catch(error => {})
        setLoading(false)
    }
    if (loading) {
        return <p>Loading</p>
    }

    return (
        <LoginLayout image={image}>
            <LoginWrapper>
                <FormWrapper>
                    <Typography
                        style={{
                            marginBottom: '3rem',
                            textAlign: 'center',
                            color: '#6495ED',
                        }}
                        variant="h3">
                        A d e m y
                    </Typography>
                    <form
                        style={{ width: '100%', height: '100%' }}
                        onSubmit={submitForm}>
                        <AuthValidationErrors
                            style={{ marginBottom: '20px' }}
                            errors={errors}
                        />
                        <TextField
                            inputProps={{ style: { fontSize: 16 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            style={{
                                width: '100%',
                                margin: '5px',
                                marginBottom: '2rem',
                            }}
                            label="Email"
                            variant="outlined"
                            id="email"
                            type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 17 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 13 } }}
                            style={{
                                width: '100%',
                                margin: '5px',
                                marginBottom: '2rem',
                            }}
                            label="Password"
                            variant="outlined"
                            id="password"
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <br />

                        <Typography
                            onClick={() => {
                                navigate('/register')
                            }}
                            variant="h5">
                            You dont have an account?
                            <span
                                style={{
                                    marginLeft: '5px',
                                    color: '#6495ED',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                }}>
                                Sign Up
                            </span>
                        </Typography>
                        <br />
                        <Button
                            style={{
                                fontSize: 10,
                                width: '90px',
                                height: '30px',
                            }}
                            type="submit"
                            variant="contained"
                            color="primary">
                            login
                        </Button>
                    </form>
                </FormWrapper>
            </LoginWrapper>
        </LoginLayout>
    )
}

export default Login

const LoginWrapper = styled.div`
    position: absolute;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const LoginLayout = styled.div`
    background: url(${image});
    background-size: cover;
    width: 100%;
    height: 100vh;
`
// const StyledLink = styled.a`
//     text-decoration: none;
//     color: #93b5f2;
//     :visited {
//         color: #93b5f2;
//     }
// `
