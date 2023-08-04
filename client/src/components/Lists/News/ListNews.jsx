import React, {useEffect} from 'react';
import NewsItem from "../../Items/NewsItem/NewsItem";

const ListNews = ({list}) => {

    return (
        <div>
            {list.map(objectList=>
                <NewsItem key={objectList.id} obj={objectList}/>
            )}
        </div>
    );
};

export default ListNews;