import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { authorizedRequest } from '../lib/api.js'
import ChildForm from '../components/ChildForm/ChildForm'

    function EditChild() {
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [dateOfBirth, setDateOfBirth] = useState('')
        const [allergies, setAllergies] = useState('')
        const [section, setSection] = useState('')
        const [owner, setOwner] = useState('')
        const [owners, setOwners] = useState([])
        const navigate = useNavigate()
        const { id } = useParams()

    async function getCurrentChildData(){
        const response = await authorizedRequest('get', `/children/${id}/`)
        setFirstName(response.data.first_name)
        setLastName(response.data.last_name)
        setDateOfBirth(response.data.date_of_birth)
        setSection(response.data.section.toString())
        setAllergies(response.data.allergies)
        setOwner(response.data.owner.toString())
        }

    useEffect(() => {
        getCurrentChildData()
    },[])

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
    event.preventDefault()
    const response = await authorizedRequest('patch', `/children/${id}/`, 
        { 
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            section,
            allergies,
            owner
        }
    )
    navigate(`/children`)
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
                titleVerb='Edit'
            />
        </div>
    )
}

export default EditChild