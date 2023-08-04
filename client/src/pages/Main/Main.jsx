import React, {useEffect, useState} from 'react';
import ListNews from "../../components/Lists/News/ListNews";
import blogController from "../../api/blog-controller";
import gameController from "../../api/game-controller";
import ListGames from "../../components/Lists/Games/ListGames";
import MoreButton from "../../components/UI/Buttons/MoreButton/MoreButton";
import classes from "./Main.module.css";
import {useFetching} from "../../hooks/useFetching";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

const Main = () => {
    const [news,setNews] = useState([])
    const [games, setGames] = useState([])

    const [isLoadingBlogs, fetchBlogs] = useFetching(async () => {
        const responseBlogs = await blogController.getAll(3, 1, 1);
        setNews(responseBlogs.data);
    })
    const [isLoadingGame, fetchGames] = useFetching(async () => {
        const responseGames = await gameController.getAll(3, 1);
        setGames(responseGames.data);
    })
    const about = 'Мы небольшая инди-команда, которая работает на энтузиазме. Этот сайт сделан лишь для того, чтобы' +
        ' каждый разработчик смог разместить свой проект, а люди смогли его по достоинству оценить. При этом наша модерация ' +
        'будет тщательно проверять все отзывы и комментарии, чтобы избежать некорректной критики со стороны пользователей'
    useEffect(()=>{
        fetchData().then()
    },[])


    async function fetchData(){
        await fetchBlogs();
        await fetchGames();
    }

    if(isLoadingGame || isLoadingBlogs){
        return (
            <LoadingBar/>
        )
    }

    return (
        <div className={classes.container}>
            <h1>Немного о нас</h1>
            <p>{about}</p>
            {games.length? <>
                <h1 className={classes.caption}>Последние релизы</h1>
                <ListGames games={games}/>
                <MoreButton to='/store'/>
            </>
                : <h1>Релизов нет...</h1>}

            { news.length
                ?<>
                    <h1 className={classes.caption}>Последние новости</h1>
                    <ListNews list={news}/>
                    <MoreButton to='/news'/>
                </>
                : <h1>Новостей нет...</h1>
            }

        </div>
    );
};

export default Main;