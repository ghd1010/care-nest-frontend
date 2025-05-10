import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { authorizedRequest } from '../../lib/api'


function ChildForm(props) {
    
    const navigate = useNavigate()
    const [isSuperUser, setIsSuperUser] = useState(false)

    // found getFullYear() at => https://www.w3schools.com/jsref/jsref_getfullyear.asp
    function getAge(dob) {  
        return new Date().getFullYear() - new Date(dob).getFullYear()
    }

    async function getUser(){
        try{
        const response = await authorizedRequest('get', `/user_details/`)
        setIsSuperUser(response.data.is_superuser)            
        } catch(err) {
            console.log(err)
        } 
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
        { isSuperUser ? (
        <div className='form-container'>
        <h1>{props.titleVerb} Child Form</h1>
    <form onSubmit={props.handleSubmit} >
    <div>
        <label htmlFor='firstName'>First Name: </label>
        <input 
            id='firstName'
            name='firstName'
            required
            value={props.firstName}
            onChange={event => props.setFirstName(event.target.value)}
        />
    </div>

    <div>
        <label htmlFor='lastName'>Last Name: </label>
        <input 
            id='lastName'
            name='lastName'
            required
            value={props.lastName}
            onChange={event => props.setLastName(event.target.value)}
        />
    </div>

    <div>
        <label htmlFor='dateOfBirth'>Date of Birth: </label>
        <input 
            id='dateOfBirth'
            name='dateOfBirth'
            type='date'
            required
            value={props.dateOfBirth}
            onChange={event => props.setDateOfBirth(event.target.value)}
        />
        {props.dateOfBirth && (() => {
            const age = getAge(props.dateOfBirth)
            if (age < 1) {
                return <span style={{ color: 'red' }}> Child must be at least 1 year old</span>
            } else if (age > 5) {
                return <span style={{ color: 'red' }}> Child must be 5 years old or younger</span>
            } else {
                return <span>Age: {age} years old </span>
            }
        })()}
    </div>
    <div>
        <label htmlFor='section'>Section:</label>
        <select
            id='section'
            value={props.section}
            onChange={e => props.setSection(e.target.value)}
            required
        >
            <option value="">--- Select ---</option>
            <option value="1">Toddlers (1–2 yrs)</option>
            <option value="2">Preschoolers (3–5 yrs)</option>
        </select>
        </div>
    <div>
        <label htmlFor='allergies'>Allergies: </label>
        <input 
            id='allergies'
            name='allergies'
            value={props.allergies}
            onChange={event => props.setAllergies(event.target.value)}
        />
    </div>

    <div>
        <label htmlFor='owner'>Parent: </label>
        <select 
            id='owner'
            name='owner'
            required
            value={props.owner}
            onChange={event => props.setOwner(event.target.value)}
        >
        <option value=''>--- Selet ---</option>
        {props.owners.map((parent) =>(
                            <option key={parent.id} value={parent.id}>
                                {parent.username}
                            </option>
                        ))}
        </select>
    </div>
        <button type='submit'>Submit</button>
    </form>
    </div>
    ) : (<h4>Sorry, you cant access this page </h4>)
}
    </div>


    )
}

export default ChildForm
