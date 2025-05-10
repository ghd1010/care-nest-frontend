import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import ChildForm from '../components/ChildForm/ChildForm'
import { authorizedRequest } from '../lib/api.js'

function AddChild() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [allergies, setAllergies] = useState('')
    const [section, setSection] = useState('')
    const [owners, setOwners] = useState([])
    const [owner, setOwner] = useState('')
    const navigate = useNavigate()

async function getAllOwners(){
        try{
            const response = await authorizedRequest('get', `/all_parents/`)
            setOwners(response.data)
        } catch(err) {
            console.log(err)
        }

        }
    useEffect (() => {
        getAllOwners()
        }, [])

    async function handleSubmit(event){
        try{
            event.preventDefault()
            const payload = {
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                allergies,
                section,
                owner,
                }
            const response = await authorizedRequest('post', `/children/`, payload)
            setFirstName('')
            setLastName('')
            setDateOfBirth('')
            setAllergies('')
            setSection('')
            setOwner('')
            navigate(`/children`)
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <ChildForm 
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            allergies={allergies}
            setAllergies={setAllergies}
            section={section}
            setSection={setSection}
            owner={owner}
            setOwner={setOwner}
            owners={owners}
            handleSubmit={handleSubmit}
            titleVerb='Add'
        />
        </div>
    )
}

export default AddChild