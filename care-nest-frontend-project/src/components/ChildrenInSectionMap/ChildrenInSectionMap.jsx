import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { authorizedRequest } from '../../lib/api'

function ChildrenInSectionMap(props) {

    const [children, setChildren] = useState([])
    const navigate = useNavigate()

    async function getAllChildrenInSection(){
        try{
            const response = await authorizedRequest('get', `/sections/${props.sectionId}/children`)
            setChildren(response.data)
            } catch(err) {
                console.log(err)
        }}

    useEffect (() => {
        getAllChildrenInSection()
        }, [])

    return (
        <div>
            <ol>
                {children.map(child => (
                <li key={child.id}>
                    {child.first_name} {child.last_name}
                </li>
                ))}
            </ol>
            <button onClick={() => navigate(`/sections/${props.sectionId}/attendance/`)}>View Attendance</button>
            <button onClick={() => navigate(`/sections/${props.sectionId}/attendance/add`)}>Add Attendance</button>
        </div>
    )
}

export default ChildrenInSectionMap