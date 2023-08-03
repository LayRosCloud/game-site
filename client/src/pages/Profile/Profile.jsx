import React from 'react';
import {useParams} from "react-router-dom";

const Profile = () => {
    const link = useParams().link

    return (
        <div>
           <h1>{link}</h1>
        </div>
    );
};

export default Profile;