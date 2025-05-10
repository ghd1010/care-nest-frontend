import React from 'react'
import { Outlet, Navigate } from 'react-router'

// I followed this toturial: https://www.youtube.com/watch?v=cSsAnbBMa4k

function ProtectedRoute() {

    const token = localStorage.getItem('access_token')
    

    return (

        token? <Outlet /> : <Navigate to='/login'/>
        
    )
}

export default ProtectedRoute