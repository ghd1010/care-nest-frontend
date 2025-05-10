import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { authorizedRequest } from '../lib/api.js'


function EditAttendance() {

    const [record, setRecord] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()

    async function getRecord() {
        try {
            const response = await authorizedRequest('get', `/attendance/${id}/edit`)
            setRecord(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getRecord()
    }, [])

    async function handleSubmit(event){
        try{
            event.preventDefault()
            const response = await authorizedRequest('patch', `/attendance/${id}/edit/`, record)
            navigate(`/sections/${record.section}/attendance`)
        } catch(err) {
            console.log(err)
        }
    }

    function handleChange(event) {
        const { name, value } = event.target
        setRecord(prevRecord => ({
            ...prevRecord,
            [name]: value
        }))
    }

    if (!record) return <h1>Loading Record...</h1>

    return (
        <div className='form-container'>
            <h1>Edit Attendance</h1> <p>{record.date}</p>
        <form onSubmit={handleSubmit}>
            <p>
                <strong>Child:</strong> {' '}
                {record.child_full_name} 
            </p>
                <label>Status:</label>
                    <select 
                        name='status' 
                        value={record.status || ''} 
                        onChange={handleChange}
                    >
                        <option value=''>--- Select ---</option>
                        <option value='present'>Present</option>
                        <option value='absent'>Absent</option>
                    </select>

                <label>Enter Time:</label>
                    <input
                        type='time'
                        name='enter_time'
                        value={record.enter_time || ''}
                        onChange={handleChange}
                        disabled={record.status === 'absent'}
                    />

                <label>Exit Time:</label>
                    <input
                        type='time'
                        name='exit_time'
                        value={record.exit_time || ''}
                        onChange={handleChange}
                        disabled={record.status === 'absent'}
                    />

                <button type="submit">Save</button>
        </form>
        </div>
    )
}

export default EditAttendance