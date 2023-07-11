import React from 'react';
import NewsItem from "../../Items/NewsItem/NewsItem";

const ListNews = ({list}) => {
    return (
        <div>
            {list.map(obj => {
                <NewsItem />
            })}
        </div>
    );
};

export default ListNews;