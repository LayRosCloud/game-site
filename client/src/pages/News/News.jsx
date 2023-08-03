import React, {useEffect, useState} from 'react';
import blogController from "../../api/blog-controller";
import ListNews from "../../components/Lists/News/ListNews";
import {useFetching} from "../../hooks/useFetching";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

const News = () => {
    const [news,setNews] = useState([])

    const [isLoadingNews, fetchNews] = useFetching(async () => {
        const response = await blogController.getAll(10, 1, 1);
        setNews(response.data)
    })

    useEffect(()=>{
        fetchNews().then()
    },[])

    if(isLoadingNews){
        return (
            <LoadingBar/>
        )
    }

    return (
        <div>
            <h1>Новости</h1>
            <ListNews list={news}/>
        </div>
    );
};

export default News;