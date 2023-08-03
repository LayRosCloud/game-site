import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import gameController from "../../api/game-controller";
import previewsController from "../../api/previews-controller";
import ContentGamesList from "../../components/Lists/ContentGames/ContentGamesList";
import PreviewsSlider from "../../components/Lists/Previews/PreviewsSlider";
import {useFetching} from "../../hooks/useFetching";
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import contentGamesController from "../../api/content-games-controller";
import blogController from "../../api/blog-controller";

const Game = () => {
    const id = useParams().id
    const [game, setGame] = useState({})
    const [previews, setPreviews] = useState([])
    const [contentGame, setContentGame] = useState([])

    const [isLoadingGameData, fetchGameData] = useFetching(async () => {
        const gameData = await gameController.getById(id);
        setGame(gameData.data);
    })
    const [isLoadingPreview, fetchPreview] = useFetching(async () => {
        const previews = await previewsController.getAll();
        setPreviews(previews.data);
    })
    const [isLoadingContentGame, fetchContentGame] = useFetching(async () => {
        const responseBlogs = await blogController.getAll(1, 1, 2, id);
        const dataBlogs = responseBlogs.data;
        const responseContentGame = await contentGamesController.getAll(dataBlogs[0].id);
        setContentGame(responseContentGame.data);
    })

    useEffect(()=>{
        console.log('вызов компонента Game')
        fetchData().then()
    }, [])

    async function fetchData(){
        try{
            await fetchGameData();
            await fetchPreview();
            await fetchContentGame();
        }catch (e){
            console.log(e)
        }
    }

    if(isLoadingGameData || isLoadingGameData || isLoadingPreview){
        return (
            <LoadingBar/>
        )
    }

    return (
        <div>
            <h1>{game.title}</h1>
            <PreviewsSlider list={previews}/>
            <p>{game.description}</p>
            <ContentGamesList list={contentGame}/>
        </div>
    );
};

export default Game;