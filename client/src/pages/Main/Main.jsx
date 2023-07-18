import React, {useEffect, useState} from 'react';
import ListNews from "../../components/Lists/News/ListNews";
import blogController from "../../api/blog-controller";
import {Link} from "react-router-dom";
import gameController from "../../api/game-controller";


const Main = () => {
    const [news,setNews] = useState([])
    const [games, setGames] = useState([])

    useEffect(()=>{
        start().then(r => console.log('Data is successful'))
    },[])


    async function start(){
        const responseBlogs = await blogController.getAll(3, 1);
        const responseGames = await gameController.getAll(3, 1);

        setNews(responseBlogs.data);
        setGames(responseGames.data);
    }

    return (
        <div>
            <h1>Последние новости</h1>
            <ListNews list={news}/>
            <Link to='/news'>Подробнее</Link>
            <h1>Последние релизы</h1>

            <button onClick={()=> localStorage.clear()}>Удалить куки</button>
        </div>
    );
};

export default Main;