import React from 'react';
import classes from './NavigationPanelItem.module.css'
import {useNavigate} from "react-router-dom";
const NavigationPanelItem = ({icon, text, to}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(to)} className={classes.container}>
            <p>{icon} {text}</p>
        </div>
    );
};

export default NavigationPanelItem;