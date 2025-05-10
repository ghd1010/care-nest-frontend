import { useState } from 'react'
import { useNavigate } from 'react-router'
import { setTokens } from '../lib/api'
import axios from 'axios'
import Header from '../components/Header/header'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState('')

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/token/`, formData)
            setTokens({
                access: response.data.access,
                refresh: response.data.refresh
            })
            navigate('/home')
        } catch (err) {
            console.log(err)
            setError('Invalid username or password')
        }
    }

    return (
        <div>
        <Header />
        <div className="login-wrapper">
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    className="form-input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input 
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button className="login-button" type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
        </div>
    )
}

export default Login