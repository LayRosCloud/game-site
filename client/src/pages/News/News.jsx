import React, {useEffect, useState} from 'react';
import blogController from "../../api/blog-controller";
import ListNews from "../../components/Lists/News/ListNews";
import {useFetching} from "../../hooks/useFetching";
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import Pagination from "../../components/Pagination/Pagination";

const News = () => {
    const [news,setNews] = useState([]);

    const [limit, setLimit] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [countPage, setCountPage] = useState(1);
    
    const [isLoadingNews, fetchNews] = useFetching(async () => {
        const onlyNews = 1;

        const response = await blogController.getAll(limit, currentPage, onlyNews);
        const totalCount = setCountPage(response.headers['X-Total-Count']);

        setCountPage(Math.ceil(totalCount / limit))
        
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
    if(news.length === 0){
        return (
            <h1>Новостей нет...</h1>
        )
    }

    return (
        <div>
            <h1>Новости</h1>
            <ListNews list={news}/>
            <Pagination totalCount={countPage}/>
        </div>
    );
};

export default News;