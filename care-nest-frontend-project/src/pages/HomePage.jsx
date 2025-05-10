import React, { useEffect, useState } from 'react'
import { authorizedRequest } from '../lib/api'

function HomePage() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function getUser(){
        try{
            const response = await authorizedRequest('GET', '/user_details/')
            setUser(response.data)            
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    if (loading) return <h1>Loading user data...</h1>
    if (!user) return <p>No user found</p>

    return (
        <div className='home-welcome'>
            <h3>Welcome, {user.username}</h3>
                
                {user.is_superuser ? (
                    <p>What are you planning to do today?</p>
                ) :  (
                    <p>See what your little one has been up to!</p> 
                )}
        </div>
    )
}

export default HomePage