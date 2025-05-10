import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { authorizedRequest } from '../../lib/api'

function AllChildrenAchievementsList() {

    const [toddlers, setToddlers] = useState([])
    const [preschoolers, setPreschoolers] = useState([])
    const navigate = useNavigate()

    async function getSections(){
        try{
            const response1 = await authorizedRequest('get', `/sections/1/achievements/`)
            setToddlers(response1.data)
    
            const response2 = await authorizedRequest('get', `/sections/2/achievements/`)
            setPreschoolers(response2.data)

        } catch(err) {
            console.log(err)
        }

        }
    useEffect (() => {
        getSections()
        }, [])
    
    // for this function bellow: title is just a string we will give it, achievements is an array
    function getSingleChildAchievement(title, achievements) {
        const className = title.toLowerCase();
        return (
            <div className="achievement-section">
            <h2 className={`achievement-title ${className}`}>{title}</h2>
            <ul className="achievement-list">
            {achievements.map((achievement) => (
                <li className="achievement-item" key={achievement.id}>
                <span>
                    <strong>{achievement.title}</strong> ({achievement.achievement_type}) – {' '}
                    {achievement.child.first_name} {achievement.child.last_name}
                </span>
                <button
                    onClick={() =>
                        navigate(`/children/${achievement.child.id}/achievements/`)
                    }
                >
                    View
                </button>
                </li>
            ))}
            </ul>
        </div>
        )
    }

    return (
        <div className="all-achievements-wrapper">
            <h1 id="h1-achievements">Children Achievements</h1>
            {getSingleChildAchievement('Toddlers', toddlers)}
            {getSingleChildAchievement('Preschoolers', preschoolers)}
            <button onClick={() => navigate(`/achievements/add`)}>Add</button>
        </div>
        )

}

export default AllChildrenAchievementsList
