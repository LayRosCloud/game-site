import React from 'react';
import NavigationPanel from "../../../components/Lists/NavigationPanel/NavigationPanel";
import {Route, Routes} from "react-router-dom";
import Store from "../../Store/Store";
import classes from "./DeveloperPanel.module.css";

const DeveloperPanel = () => {

    const items = [
        {icon: '+', text: 'Ваши игры', to: '/developer/games' },
        {icon: '+', text: 'Новая игра', to: '/developer/new-game' },
    ]

    return (
        <div className={classes.container}>
            <NavigationPanel list={items}/>
            <Routes>
                <Route path='/games' Component={Store}/>
            </Routes>
        </div>
    );
};

export default DeveloperPanel;