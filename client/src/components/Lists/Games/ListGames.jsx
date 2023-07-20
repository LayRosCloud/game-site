import React from 'react';
import GamesItem from "../../Items/Games/GamesItem";

const ListGames = ({games}) => {
    return (
        <div>
            { games.map(game =>
                <GamesItem key={game.id} game={game}/>)
            }
        </div>
    );
};

export default ListGames;