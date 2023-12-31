import React from 'react';
import NavigationPanel from "../../../components/Lists/NavigationPanel/NavigationPanel";
import {Route, Routes} from "react-router-dom";
import Store from "../../Store/Store";
import '../Admin.css'
const DeveloperPanel = () => {

    const items = [
        {icon: '+', text: 'Ваши игры', to: '/developer/games' },
        {icon: '+', text: 'Новая игра', to: '/developer/new-game' },
    ]

    return (
        <div className='container__admin'>
            <NavigationPanel list={items}/>
            <Routes>
                <Route path='/games' Component={Store}/>
            </Routes>
        </div>
    );
};

export default DeveloperPanel;