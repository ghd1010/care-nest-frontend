import React, { useEffect, useState } from 'react'
import { authorizedRequest } from '../../lib/api'
import { useNavigate } from 'react-router'

function AchievementForm(props) {
    const [isSuperUser, setIsSuperUser] = useState(false)
    const navigate = useNavigate()

    // to check is the user a superuser? "supervisor"
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

// https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
    useEffect(() => {
        if (!isSuperUser) {
        const timer = setTimeout(() => { 
                navigate('/home')
            }, 3000) // to let the user see the sorry message before redirecting him to /home
        return () => clearTimeout(timer)
        }
    }, [isSuperUser])

    return (
        <div >
            { isSuperUser ? ( // if he is a super user, show this (the edit/add is not allowed for Parentsfrom the backend too)
                <div className='form-container'>
                <h1>{props.titleVerb} Achievement</h1>
                <form onSubmit={props.handleSubmit}>
                    {props.titleVerb === 'Edit'? //check is it for Editing, or Adding? if its edit? print the child name, if add choose the child
                        (
                        <div>
                        <label>Child: </label>
                        <span>{props.child.first_name} {props.child.last_name}</span>
                        </div>
                        ) : (
                            <div>
                            <label htmlFor='child'>Choose a child: </label>
                            <select 
                                id='child'
                                name='child'
                                required
                                value={props.child}
                                onChange={event => props.setChild(event.target.value)}
                            >
                                <option value=''>--- Select ---</option>
                                { 
                                    props.children.map((child) =>(
                                        <option key={child.id} value={child.id}>
                                            {child.first_name} {child.last_name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        )
                    }  

                <div>
                    <label htmlFor='title'>Title: </label>
                    <input 
                        id='title'
                        name='title'
                        required
                        value={props.title}
                        onChange={event => props.setTitle(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='achievementType'>Achievement Type: </label>
                    <select 
                        id='achievementType'
                        name='achievementType'
                        required
                        value={props.achievementType}
                        onChange={event => props.setAchievementType(event.target.value)}
                    >
                        <option value=''>--- Select ---</option>
                        <option value="photo">Photo</option>
                        <option value="badge">Badge</option>
                        <option value="painting">Painting</option>

                    </select>
                </div>

                <div>
                    <label htmlFor='description'>Description: </label>
                    <input 
                        id='description'
                        name='description'
                        value={props.description}
                        onChange={event => props.setDescription(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='image'>Image: </label>
                    <input 
                        type='file'
                        accept='image/*'
                        onChange={event => props.setImage(event.target.files[0])}
                    />
                </div>
                <button type='submit'>Submit</button>
                </form>
            </div>
        ):(
            <h4>Sorry, you can't access this page </h4>
        )
    }
    </div>

    )   
}

export default AchievementForm