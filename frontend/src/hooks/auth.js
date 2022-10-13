import axios from '../lib/axios'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
    const navigate = useNavigate()

    const register = async ({ setErrors, ...props }) => {
        setErrors([])

        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/register`,
                props,
            )
            .then(res => {
                if (res.data.success) {
                    navigate('/login')
                }
                return res
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }
    const addUser = async ({ setErrors, ...props }) => {
        setErrors([])

        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/register`,
                props,
            )
            .then(res => {
                return res
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const logout = async () => {
        await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/logout`,
        )
        window.location.pathname = '/login'
    }

    return {
        register,
        login,
        logout,
        addUser,
    }
}
