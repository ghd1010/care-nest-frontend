import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { authorizedRequest } from '../lib/api.js'

function ChildDetails() {

    const { id } = useParams()
    const [child, setChild] = useState(null)
    const [isSuperUser, setIsSuperUser] = useState(false)
    const navigate = useNavigate()

    // found getFullYear() at => https://www.w3schools.com/jsref/jsref_getfullyear.asp
    function getAge(dob) {  
        return new Date().getFullYear() - new Date(dob).getFullYear()
        }

    async function getSignleChild(){
        try{
        const response = await authorizedRequest('get', `/children/${id}`)
        setChild(response.data)            
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSignleChild()
    }, [])

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

    // window.confirm: https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    async function deleteChild() {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${child.first_name}?`)
        if (confirmDelete){
            try {
                const response = await authorizedRequest('delete', `/children/${id}/`)
                if (response.status === 204){
                    navigate('/children/')
                }
            } catch (err) {
                console.log(err)
            }
        }
        
    }

    let sectionName = ''
    if (child) {
        if (child.section === 1) {
        sectionName = 'Toddlers'
        } else {
        sectionName = 'Preschoolers'
        }
    }

    if (!child) return <h1>Loading ...</h1>

    return (
        <div className='form-container'>
            <h1>Child Details page</h1>
                <div>
                <p><strong>Name: </strong>{child.first_name} {child.last_name}</p>
                <p><strong>Date of birth: </strong>{child.date_of_birth}</p> 
                <p><strong>Age: </strong>{getAge(child.date_of_birth)} years old</p> 
                <p><strong>Section: </strong>{sectionName}</p> 
                <p><strong>Allergies: </strong>{child.allergies}</p> 
                <p><strong>Parent: </strong>{child.owner_username}</p> 

                </div>
                {
                    isSuperUser &&(
                    <div>
                        <button onClick={() => navigate(`/children/${child.id}/edit`)}>Edit</button>
                    </div>
                    )
                }

                {
                    isSuperUser &&(
                    <div>
                        <button onClick={deleteChild}>Delete</button>
                        </div>
                    )
                }
        </div>
    )
}

export default ChildDetails