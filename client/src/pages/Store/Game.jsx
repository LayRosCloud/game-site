import React from 'react';
import {useParams} from "react-router-dom";

const Game = () => {
    const id = useParams().id
    return (
        <div>
            {`Game ${id}`}
        </div>
    );
};

export default Game;