import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import AchievementForm from '../components/AchievementForm/AchievementForm'
import { authorizedRequest } from '../lib/api.js'

function EditAchievement() {
    const [child, setChild] = useState('')
    const [children, setChildren] = useState([])
    const [childId, setChildId] = useState('')
    const [achievementType, setAchievementType] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    async function getChildren() {
        const response = await authorizedRequest('get', `/children/`)
        setChildren(response.data)
    }

    useEffect(() => {
        getChildren()
    }, [])

    async function getCurrentAchievementData(){
        const response = await authorizedRequest('get', `/achievements/${id}/`)
        setChild(response.data.child) 
        setChildId(response.data.child.id)
        setAchievementType(response.data.achievement_type)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setImage(response.data.image_url)
        }
        
        useEffect(() => {
            getCurrentAchievementData()
        },[])

async function handleSubmit(event){
    try{
        event.preventDefault()
        let cloudinaryImgUrl = ''
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
        try{
            const cloudinaryResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
                formData
            )
            cloudinaryImgUrl = cloudinaryResponse.data.secure_url
        } catch(err) {
            console.log(err)
        }
        const payload = {
            child_id: childId,
            achievement_type: achievementType,
            title,
            description,
            image_url: cloudinaryImgUrl
            }
        const response = await authorizedRequest('patch', `/achievements/${id}/`, payload)

        console.log(response)
        navigate(`/children/${childId}/achievements/`)
    } catch(err) {
        console.log(err)
    }
}
    return (
        <div>
                <AchievementForm 
                child={child}
                setChild={setChild}
                children={children} 
                childId={childId}
                achievementType={achievementType}
                setAchievementType={setAchievementType}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                image={image}
                setImage={setImage}
                handleSubmit={handleSubmit}
                titleVerb='Edit'
            />
        </div>
    )
}

export default EditAchievement