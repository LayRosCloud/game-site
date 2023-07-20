import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import gameController from "../../api/game-controller";

const Game = () => {
    const id = useParams().id
    const [game, setGame] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        fetchGame();
    })
    async function fetchGame(){
        try{
            const responseGame = await gameController.getById(id)
            setGame(responseGame.data)
        }catch (e){
            navigate('/error')
        }

    }
    return (
        <div>
            <h1>{game.title}</h1>
            <p>{game.description}</p>
        </div>
    );
};

export default Game;