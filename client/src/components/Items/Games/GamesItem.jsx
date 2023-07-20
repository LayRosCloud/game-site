import React from 'react';
import classes from "./GamesItem.module.css";
import {useNavigate} from "react-router-dom";

const GamesItem = ({game}) => {
    const navigate = useNavigate()
    return (
        <div onClick={()=> navigate(`/store/${game.id}`)} className={classes.item__container}>
            <img className={classes.image} src={`http://localhost:5000/previews/${game.preview}`} alt='Изображение превью'/>
            <div className={classes.item__container__inner}>
                <h2>{game.title}</h2>
                <p>{game.description}</p>
            </div>
        </div>
    );
};

export default GamesItem;