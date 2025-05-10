import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { authorizedRequest } from '../../lib/api'


function ChildrenList() {

    const [children, setChildren] = useState([])
    const navigate = useNavigate()
    
    async function getAllChildren(){
        const response = await authorizedRequest('get', `/children/`)
        setChildren(response.data)
    }

    useEffect (() => {
        getAllChildren()
    }, [])

    return (
        <div className='form-container'>
            <h2>My Children</h2>
            <ul>
            {children.map(child => {
                return (
                <li key={child.id}>
                    {child.first_name} {child.last_name}
                    <div>
                        <button onClick={() => navigate(`/children/${child.id}`)}>View Details</button>
                        <button onClick={() => navigate(`/children/${child.id}/achievements`)}>View Achievements</button>
                        <button onClick={() => navigate(`/children/${child.id}/attendance`)}>View Attendance</button>
                    </div>
            </li>
            )
            })}
        </ul>
        </div>
    )
}

export default ChildrenList