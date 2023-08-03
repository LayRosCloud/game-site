import React, {useEffect, useState} from 'react';
import ListGames from "../../components/Lists/Games/ListGames";
import gameController from "../../api/game-controller";
import {useFetching} from "../../hooks/useFetching";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

const Store = () => {
    const [games, setGames] = useState([])
    const [limit, setLimit] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [countPage, setCountPage] = useState(1);
    const [isLoadingGames, fetchGames] = useFetching(async () => {
        const allGames = await gameController.getAll(limit, currentPage)
        setCountPage(Math.ceil(allGames.headers['x-total-count'] / limit))
        setGames(allGames.data)
    })

    useEffect(() => {
        fetchGames().then();
    }, [])

    if(isLoadingGames){
        return (
            <LoadingBar/>
        )
    }

    return (
        <div>
            <h1>Магазин</h1>
            <ListGames games={games}/>
        </div>
    );
};

export default Store;