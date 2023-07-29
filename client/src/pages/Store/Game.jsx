import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import gameController from "../../api/game-controller";
import previewsController from "../../api/previews-controller";
import ContentGamesList from "../../components/Lists/ContentGames/ContentGamesList";
import contentGamesController from "../../api/content-games-controller";
import blogController from "../../api/blog-controller";
import PreviewsSlider from "../../components/Lists/Previews/PreviewsSlider";

const Game = () => {
    const id = useParams().id
    const [game, setGame] = useState({})
    const [previews, setPreviews] = useState([])
    const [contentGame, setContentGame] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchGame();
    })
    async function fetchGame(){
        try{
            const responseGame = await gameController.getById(id);
            setGame(responseGame.data);
            const responsePreviews = await previewsController.getAll();
            setPreviews(responsePreviews.data);
            const responseBlogs = await blogController.getAll(1, 1, 2, id);
            const dataBlogs = responseBlogs.data;
            const responseContentGame = await contentGamesController.getAll(dataBlogs[0].id);
            setContentGame(responseContentGame.data);
        }catch (e){
            navigate('/error');
        }

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