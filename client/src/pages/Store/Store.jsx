import React, {useEffect, useState} from 'react';
import ListGames from "../../components/Lists/Games/ListGames";
import gameController from "../../api/game-controller";

const Store = () => {
    const [games, setGames] = useState([])
    useEffect(() => {
        fetchGames();
    }, [])

    async function fetchGames(){
        const allGames = await gameController.getAll(9, 1)
        setGames(allGames.data)
    }

    return (
        <div>
            <h1>Магазин</h1>
            <ListGames games={games}/>
        </div>
    );
};

export default Store;