import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { authorizedRequest } from '../../lib/api'
import ParentNav from '../ParentNav/ParentNav.jsx'
import SupervisorNav from '../SupervisorNav/SupervisorNav.jsx'

function NavBar() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation() //return current location //https://medium.com/@alexanie_/https-ocxigin-hashnode-dev-uselocation-hook-in-react-router-758a0a711308#:~:text=The%20%60useLocation%60%20hook%20is%20used,%60search%60%20of%20the%20component.
    const hideNav = [
            '/login',
            '/signup',
            '/'
            ].includes(location.pathname) //hide navbar in these pages, .includes return (T, F)

    async function getUser(){
        const accessToken = localStorage.getItem('access_token')
        if (!accessToken) {
            setLoading(false)
            return 
        }

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

    if (hideNav || loading) return null
    if (!user) return null  

    return (
        user.is_superuser ? <SupervisorNav /> : <ParentNav />
    ) 
}

export default NavBar
