import React, {useEffect, useState} from 'react';
import blogController from "../../api/blog-controller";
import ListNews from "../../components/Lists/News/ListNews";
import {useFetching} from "../../hooks/useFetching";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

const News = () => {
    const [news,setNews] = useState([]);

    const [limit, setLimit] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [countPage, setCountPage] = useState(1);
    
    const [isLoadingNews, fetchNews] = useFetching(async () => {
        const onlyNews = 1;

        const response = await blogController.getAll(limit, currentPage, onlyNews);
        console.log(response.headers)

        //setCountPage(Math.ceil(countObjects / limit))
        
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