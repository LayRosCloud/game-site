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
import CommentsList from "../../components/Lists/Comments/CommentsList";
import commentsController from "../../api/comments-controller";

const Game = () => {
    const id = useParams().id
    const [game, setGame] = useState({})
    const [previews, setPreviews] = useState([])
    const [contentGame, setContentGame] = useState([])
    const [comments, setComments] = useState([])
    const navigate = useNavigate()

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

    const [isLoadingComments, fetchComments] = useFetching(async () => {
        const responseComments = await commentsController.getAll(9, 1, id);
        setComments(responseComments.data)
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
            await fetchComments()
        } catch (e){
            navigate('/error')
        }
    }

    if(isLoadingGameData || isLoadingContentGame || isLoadingPreview || isLoadingComments){
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
            <h1>Комментарии</h1>
            <CommentsList list={comments} gameId={id}/>
        </div>
    );
};

export default Game;