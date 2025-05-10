import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AchievementForm from '../components/AchievementForm/AchievementForm'
import { useNavigate } from 'react-router'
import { authorizedRequest } from '../lib/api.js'

function AddAchievement() {

    const [child, setChild] = useState('')
    const [children, setChildren] = useState([])
    const [achievementType, setAchievementType] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    async function getChildren() {
        const response = await authorizedRequest('get', `/children/`)
        setChildren(response.data)
    }

    useEffect(() => {
        getChildren()
    }, [])

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

            console.log('HandleSubmit is running !')
            const payload = {
                child_id: child,
                achievement_type: achievementType,
                title,
                description,
                image_url: cloudinaryImgUrl
                }
            const response = await authorizedRequest('post', `/achievements/`, payload)
            setChild('')
            setAchievementType('')
            setTitle('')
            setDescription('')
            setImage(null)
            navigate(`/children/${response.data.child.id}/achievements/`)
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <AchievementForm 
            child={child}
            setChild={setChild}
            children={children}
            achievementType={achievementType}
            setAchievementType={setAchievementType}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            image={image}
            setImage={setImage}
            handleSubmit={handleSubmit}
            titleVerb='Add'
        />
        </div>
    )
}

export default AddAchievement