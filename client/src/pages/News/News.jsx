import React, {useEffect, useState} from 'react';
import blogController from "../../api/blog-controller";
import ListNews from "../../components/Lists/ListNews/ListNews";

const News = () => {
    const [news,setNews] = useState([])

    useEffect(()=>{
        start()
    },[])

    async function start(){
        const response = await blogController.getAll(10, 1);
        setNews(response.data)
    }

    return (
        <div>
            <h1>Новости</h1>
            <ListNews list={news}/>
        </div>
    );
};

export default News;