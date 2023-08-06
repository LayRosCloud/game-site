import React from 'react';
import classes from './NewsItem.module.css';
import useNavigator from "../../../hooks/useNavigator";
import {API_URL} from "../../../api";

const NewsItem = ({obj}) => {
    const {navigator} = useNavigator(1);
    return (
        <div onClick={() => navigator(`/news/${obj.id}`)} className={classes.item__container}>
            <img className={classes.image} src={`${API_URL}/previews/${obj.preview}`} alt='Изображение превью'/>
            <div className={classes.item__container__inner}>
                <div className={classes.item__header}>
                    <h2>{obj.title}</h2>
                    <p>{obj.createdAt}</p>
                </div>
                <p>{obj.description}</p>
            </div>
        </div>
    );
};

export default NewsItem;