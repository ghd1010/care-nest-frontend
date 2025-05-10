import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { authorizedRequest } from '../../lib/api'


function MyChildAttendance() {

    const [records, setRecords] = useState([])
    const {id} = useParams()

    async function getAllAttendance(){
        try{
            const response = await authorizedRequest('get', `/attendance/`)
            const singleChildAttendance = response.data.filter(record => record.child === parseInt(id))
            setRecords(singleChildAttendance)
            } catch(err) {
                console.log(err)
        }}
    useEffect (() => {
        getAllAttendance()
    }, [id])

    return (
        <div className='section-atten-view'>
            <h2><center>Attendance</center></h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Enter Time</th>
                        <th>Exit Time</th>
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
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyChildAttendance