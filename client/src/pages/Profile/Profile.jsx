import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import userController from "../../api/user-controller";
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import {API_URL} from '../../api/index'
import classes from "./Profile.module.css";
import DefaultButton from "../../components/UI/Buttons/DefaultButton/DefaultButton";
import parseToJSON from "../../scripts/parserJWT";
const token = localStorage.getItem('token')
const Profile = () => {
    const link = useParams().link
    const navigate = useNavigate();
    const [profile, setProfile] = useState({})
    const [id, setId] = useState(0)

    const [profileLoading, fetchProfile] = useFetching(async () => {
        try{
            const response = await userController.getByLink(link);
            setProfile(response.data)
            console.log(response)
        }catch (e){
            console.log(e)
            navigate('/error')
        }
    })

    useEffect(()=>{
        fetchProfile().then();
        if(token){
            const data = parseToJSON(token);
            setId(data.id)
        }
    },[])

    if(profileLoading){
        return (
            <LoadingBar/>
        )
    }

    return (
        <div className={classes.container}>
            <img className={classes.avatar} src={`${API_URL}/avatars/${profile.avatarImage}`} alt='профиль'/>
            <h1>{profile.name}</h1>
            <p>{profile.status}</p>
            {id === profile.id
                ?<DefaultButton>Редактировать</DefaultButton>
                : ''
            }

        </div>
    );
};

export default Profile;