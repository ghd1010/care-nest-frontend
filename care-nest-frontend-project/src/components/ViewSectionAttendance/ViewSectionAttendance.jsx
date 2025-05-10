import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { authorizedRequest } from '../../lib/api'


function ViewSectionAttendance() {

    const [records, setRecords] = useState([])
    const [sectionName, setSectionName] = useState('')
    const {id} = useParams()
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

    async function getAllSectionAttendance(){
        try{
            const response = await authorizedRequest('get', `/sections/${id}/attendance`)
            setRecords(response.data)
            } catch(err) {
                console.log(err)
        }}

    useEffect (() => {
        getAllSectionAttendance()
        }, [])

    async function getSectionName() {
        try{
            const response = await authorizedRequest('get', `/sections/`)
            const findSection = response.data.find(section => section.id === Number(id))
            if (findSection) {
                setSectionName(findSection.name)        
            }
        } catch(err) {
            console.log(err)
        }
        }

        useEffect(() => {
            getSectionName()
        }, [])

    return (
        <div className='section-atten-view'>
            <h1>{sectionName} Attendance</h1>
                <button onClick={() => navigate(`/sections/${id}/attendance/add`)}>Add</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Enter Time</th>
                        <th>Exit Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td>{record.child_full_name}</td>
                            <td>{record.date}</td>
                            <td>{record.status}</td>
                            <td>{record.enter_time}</td>
                            <td>{record.exit_time}</td>
                            <td>
                                <Link to={`/attendance/${record.id}/edit`}>Edit</Link>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default ViewSectionAttendance