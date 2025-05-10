import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function AttendanceDropDown() {

    const [section, setSection] = useState('')
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        if (section) {
            navigate(`/sections/${section}/attendance`)
        }
    }

    return (
        <div className='form-container'>
            <h2>Please choose the section you need:</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="section">Section:</label>
                        <select
                        id="section"
                        value={section}
                        onChange={(event) => setSection(event.target.value)}
                        required
                        >
                            <option value="">--- Select ---</option>
                            <option value="1">Toddlers</option>
                            <option value="2">Preschoolers</option>
                    </select>
                    <button type="submit">View Attendance</button>
                </form>
        </div>
    )
}

export default AttendanceDropDown