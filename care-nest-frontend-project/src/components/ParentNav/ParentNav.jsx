import React from 'react'
import { Link } from 'react-router'

function ParentNav() {
    return (
        
            <nav className='user-nav'>
            <div className="logo-container">
                <img src="./logowhite.png" alt="CareNest Logo" className="logo-image" />
            </div>
                <ul>
                    <li className='nav-item'><Link to='/home'>Home</Link></li>
                    <li className='nav-item'><Link to='/my-children'>My Children</Link></li>
                    <li className='nav-item'><Link to='/logout'>Logout</Link></li>
                </ul>
            </nav>

    )
}

export default ParentNav