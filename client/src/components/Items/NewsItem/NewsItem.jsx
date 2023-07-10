import React from 'react';
import classes from './NewsItem.module.css'

const NewsItem = () => {
    return (
        <div className={classes.item__container}>
            <img className={classes.image} src='https://upload.wikimedia.org/wikipedia/commons/1/1b/%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_307.jpg' alt='Изображение превью'/>
            <div className={classes.item__container__inner}>
                <div className={classes.item__header}>
                    <h2>Заголовок</h2>
                    <p>2010/10/10</p>
                </div>
                <p>Описание</p>
            </div>
        </div>
    );
};

export default NewsItem;