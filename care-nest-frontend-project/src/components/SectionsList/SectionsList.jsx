import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { authorizedRequest } from '../../lib/api'

function SectionsList() {

    const [toddlers, setToddlers] = useState([])
    const [preschoolers, setPreschoolers] = useState([])
    const navigate = useNavigate()

    async function checkUser() {
        try {
            const response = await authorizedRequest('get', '/user_details/')
            if (!response.data.is_superuser) {
                navigate('/not-found')
            }
        } catch (err) {
            console.log(err)
            navigate('/not-found')
        }
    }

    useEffect (() => {
        checkUser()
    }, [])

    async function getChildrenBySection(){
        try{
            const response1 = await authorizedRequest('get', `/sections/1/children`)
            setToddlers(response1.data)
    
            const response2 = await authorizedRequest('get', `/sections/2/children`)
            setPreschoolers(response2.data)

        } catch(err) {
            console.log(err)
        }

        }
    useEffect (() => {
        getChildrenBySection()
        }, [])
    
    return (
            <div className='sectionlist'>
                <h2>CareNest Sections</h2>
                    <div>
                        <h3>Toddlers (1-2 years old)</h3>
                        <ol>
                            {toddlers.map(child => {
                            return (
                                    <li key={child.id}>
                                        {child.first_name} {child.last_name}
                                    </li>
                                    )
                            })}
                        </ol>
                        <button onClick={() => navigate('/sections/1/attendance')}>View Attendance</button>
                        <button onClick={() => navigate('/sections/1/attendance/add')}>Add Attendance</button>
                    </div>

                    <div>
                        <h3>Preschoolers (3-5 years old)</h3>
                        <ol>
                            {preschoolers.map(child => {
                            return (
                                    <li key={child.id}>
                                        {child.first_name} {child.last_name}
                                    </li>
                                    )
                            })}
                        </ol>
                        <button onClick={() => navigate('/sections/2/attendance')}>View Attendance</button>
                        <button onClick={() => navigate('/sections/2/attendance/add')}>Add Attendance</button>
                    </div>
        </div>
    )
}

export default SectionsList