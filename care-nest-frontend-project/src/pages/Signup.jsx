import { useState } from 'react'
import axios from 'axios'

import { setTokens } from '../lib/api'
import { useNavigate } from 'react-router'
import Header from '../components/Header/header'

function Signup() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/signup/',
                {username, email, password}
            )
            console.log(response.data)
            setTokens(response.data)
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Header />
        <div className="signup-wrapper">
            <h1 className="signup-title">Join us!</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        className="form-input"
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={event => setUsername(event.target.value)}
                        value={username}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-input"
                        type='text'
                        placeholder='email'
                        name='email'
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-input"
                        type='password'
                        placeholder='password'
                        name='password'
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                    />
                </div>
                <button className="signup-button" type='submit'>Sign Up!</button>
            </form>
        </div>
        </div>

    )
}

export default Signup