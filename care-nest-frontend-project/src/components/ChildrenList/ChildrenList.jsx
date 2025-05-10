import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { authorizedRequest } from '../../lib/api'


function ChildrenList() {

  const [children, setChildren] = useState([])
  const navigate = useNavigate()
  
  async function getAllChildren(){
    const response = await authorizedRequest('get', `/children/`)
    setChildren(response.data)
  }

  useEffect (() => {
    getAllChildren()
  }, [])

  return (
    <div className='children-list'>
        <h2>CareNest Children</h2>
        <ol>
          {children.map(child => {
            return (
              <li key={child.id}>
                <Link to={`/children/${child.id}/`}>{child.first_name} {child.last_name}</Link>
              </li>
            )
          })}
        </ol>
        <button onClick={() => navigate('/add')}>Add</button>
        </div>
  )
}

export default ChildrenList