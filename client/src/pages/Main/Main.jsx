import React, {useEffect, useState} from 'react';
import ListNews from "../../components/Lists/ListNews/ListNews";
import blogController from "../../api/blog-controller";
import DefaultButton from "../../components/UI/Buttons/DefaultButton/DefaultButton";
import {Link} from "react-router-dom";

const Main = () => {
    const [news,setNews] = useState([])

    useEffect(()=>{
        start()
    },[])

    async function start(){
        const response = await blogController.getAll(3, 1);
        setNews(response.data)
    }

    return (
        <div>
            <h1>Последние новости</h1>
            <ListNews list={news}/>
            <Link to='/news'>Подробнее</Link>
            <h1>Последние релизы</h1>
        </div>
    );
};

export default Main;