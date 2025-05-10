import React from 'react'
import { useNavigate } from 'react-router'

function MainPage() {
    
    const navigate = useNavigate()
    return (

<div className="main-page">
        <header className="main-header">
            <div className="header-content">
                <h1 className="logo-text">CareNest</h1>
                    <div className="header-buttons">
                        <button onClick={() => navigate('/signup')}>Sign Up</button>
                        <button onClick={() => navigate('/login')}>Login</button>
                    </div>
                </div>
        </header>


        <div className="welcome">
            <h1>Welcome to</h1>
            <img src="logo-carenest.png" alt="CareNest Logo" width={300} className="logo-main-page" />
            <h2>Daycare</h2>
        </div>
    </div>
    )
}

export default MainPage