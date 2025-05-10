import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { authorizedRequest } from '../../lib/api'

function AddAttendance() {

    const [records, setRecords] = useState([])
    const [sectionChildren, setSectionChildren] = useState([])
    const [currentDate, setCurrentDate] = useState('')
    const [sectionName, setSectionName] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    //got from: https://www.shecodes.io/athena/7466-how-to-get-current-date-in-react
    function setDateToday(){
        const today = new Date()
        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }) //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        const date = today.getDate()
        setCurrentDate(`${dayName} - ${month}/${date}/${year}`)
    }
    useEffect(() => {
        setDateToday()
    }, [])

    async function getAllChildrenInSection(){
        try{
            const response = await authorizedRequest('get', `/sections/${id}/children`) //to get children in a certain section
            setSectionChildren(response.data)
            const today = new Date().toISOString().split("T")[0] //https://www.w3schools.com/jsref/jsref_toisostring.asp
            const byDefaultRecords = response.data.map(child => ({
                child: child.id,
                date: today,
                enter_time: '00:00',
                exit_time: '00:00',
                status: ''
            }))
                setRecords(byDefaultRecords)
            } catch(err) {
                console.log(err)
        }}
    useEffect (() => {
        getAllChildrenInSection()
        }, [])

        async function getSectionName() {
            const response = await authorizedRequest('get', `/sections/`)
            const findSection = response.data.find(section => section.id === Number(id)) //to get the section data
            if (findSection) {
                setSectionName(findSection.name)        
            }
        }
        useEffect(() => {
            getSectionName()
        }, [])

    // https://upmostly.com/tutorials/how-to-update-state-onchange-in-an-array-of-objects-using-react-hooks
    const handleChange = (index) => (event) => {
        const newRecord = records.map((record, i) => {
            if (index === i) {
                return { ...record, [event.target.name]: event.target.value }
            }
                return record
        })
        setRecords(newRecord)
        }
    
    async function handleSubmit(event){
        try{
            event.preventDefault()
            const payload = records
            const response = await authorizedRequest('post', `/sections/${id}/attendance/add/`, payload)
            navigate(`/sections/${id}/attendance`)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className='form-container'>
            <h1>{sectionName} Attendance</h1> 
            <p>{currentDate}</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Enter Time</th>
                        <th>Exit Time</th>
                    </tr>
                </thead>
                <tbody>
                {sectionChildren.map((child, i) => (
                    <tr key={child.id}>
                        <td>{child.first_name} {child.last_name}</td>

                        <td>
                            <select
                                name='status'
                                value={records[i].status}
                                onChange={handleChange(i)}
                                required
                            >
                                <option value=''>--- Select ---</option>
                                <option value='present'>Present</option>
                                <option value='absent'>Absent</option>
                            </select>
                        </td>

                        <td>
                            <input
                                type='time'
                                name='enter_time'
                                value={records[i].enter_time}
                                onChange={handleChange(i)}
                                disabled={records[i].status === 'absent'}
                                required
                            />
                        </td>

                        <td>
                            <input
                            type="time"
                            name='exit_time'
                            value={records[i].exit_time}
                            onChange={handleChange(i)}
                            disabled={records[i].status === 'absent'}
                            required
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button type='submit' onClick={handleSubmit}>Submit</button>

        </div>
    )
}

export default AddAttendance