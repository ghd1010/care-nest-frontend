import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ChildrenInSectionMap from '../ChildrenInSectionMap/ChildrenInSectionMap'
import { authorizedRequest } from '../../lib/api'


function ChildrenInSectionList() {
    
    const {id} = useParams()
    const [sectionName, setSectionName] = useState('')

    async function getSectionName() {
        const response = await authorizedRequest('get', `/sections/`)
        const findSection = response.data.find(section => section.id === Number(id))
        if (findSection) {
            setSectionName(findSection.name)        
        }
    }
    useEffect(() => {
        getSectionName()
    }, [])

    return (
        <div>
            <h2>{sectionName}</h2>
                <ChildrenInSectionMap 
                    sectionId={id} 
                />
        </div>
    )
}

export default ChildrenInSectionList