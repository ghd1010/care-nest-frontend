import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import {authorizedRequest} from '../../lib/api'

function ChildAchievementList() {

    const [achievements, setAchievements] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const [isSuperUser, setIsSuperUser] = useState(false)
    
    

    async function getAllAchievements(){
        try{
            const response = await authorizedRequest('get', `/children/${id}/achievements/`) //will give a nested object
            setAchievements(response.data)
        } catch(err) {
            navigate('/*')
        }
    }
    
    useEffect (() => {
        getAllAchievements()
    }, [id])

    async function deleteAchievements(id) {
        const confirmDelete = window.confirm(`Are you sure you want to delete this achievement?`)
        if (confirmDelete){
            try {
                const response = await authorizedRequest('delete', `/achievements/${id}/`)
                if (response.status === 204){ //if it is deleted? bring them without the deleted item
                    setAchievements(
                        achievements.filter(achievement =>
                            achievement.id !== id
                        )
                    )
                }
            } catch (err) {
                console.log(err)
            }
        }
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
    <div className='child_list'>
        <h2>
        Achievements of {achievements[0]?.child?.first_name} {achievements[0]?.child?.last_name} 
        </h2>

        <div className='badges'>
            <h3>Badges 🏅</h3>
            <ul>
                {achievements
                .filter(achievement => achievement.achievement_type === 'badge')
                .map(achievement => {
                return (
                    <li key={achievement.id} className="achievement_card1">
                        {
                            achievement.image_url
                            ?
                            <img src={achievement.image_url}/>
                            :
                            null
                        }
                        <div className='achievement_text'>
                        <strong>{achievement.title}</strong>
                        <p>{achievement.description}</p>
                        </div>
                        {
                            isSuperUser &&(
                                <div>
                                <button onClick={() => deleteAchievements(achievement.id)}>Delete</button>
                                <button onClick={() => navigate(`/achievements/${achievement.id}/edit`)}>Edit</button>
                                </div>
                            )
                        }
                    </li>
                )
            })}
            </ul>
        </div>
        
        <div className='photos'>
            <h3>Photos 📸</h3>
            <ul>
                {achievements
                .filter(achievement => achievement.achievement_type === 'photo')
                .map(achievement => {
                return (
                    <li key={achievement.id} className="achievement_card2">
                        {
                            achievement.image_url
                            ?
                            <img src={achievement.image_url} />
                            :
                            null
                        }
                        <div className='achievement_text'>
                        <strong>{achievement.title}</strong>
                        <p>{achievement.description}</p>
                        </div>
                        {
                            isSuperUser &&(
                                <div>
                                <button onClick={() => deleteAchievements(achievement.id)}>Delete</button>
                                <button onClick={() => navigate(`/achievements/${achievement.id}/edit`)}>Edit</button>
                                </div>
                            )
                        }
                    </li>
                )
            })}
            </ul>
        </div>

        <div className='paintings'>
            <h3>Paintings 🖼️</h3>
            <ul>
                {achievements
                .filter(achievement => achievement.achievement_type === 'painting')
                .map(achievement => {
                return (
                    <li key={achievement.id} className="achievement_card3">
                        {
                            achievement.image_url
                            ?
                            <img src={achievement.image_url}/>
                            :
                            null
                        }
                        <div className='achievement_text'>
                        <strong>{achievement.title}</strong>
                        <p>{achievement.description}</p>
                        </div>
                        {
                            isSuperUser &&(
                                <div>
                                <button onClick={() => deleteAchievements(achievement.id)}>Delete</button>
                                <button onClick={() => navigate(`/achievements/${achievement.id}/edit`)}>Edit</button>
                                </div>
                            )
                        }
                    </li>
                )
            })}
            </ul>
        </div>
    </div>
    )
}

export default ChildAchievementList
