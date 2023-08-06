import React from 'react';
import NavigationPanel from "../../../components/Lists/NavigationPanel/NavigationPanel";
import {Route, Routes} from "react-router-dom";
import Store from "../../Store/Store";

const AdminPanel = () => {
    const items = [
        {icon: '+', text: 'Комментарии', to: '/admin/comments' },
        {icon: '+', text: 'Игры', to: '/admin/games' },
        {icon: '+', text: 'Блоги', to: '/admin/blogs' },
    ]
    return (
        <div className='container__admin'>
            <NavigationPanel list={items}/>
            <Routes>
                <Route path='/comments' Component={Store}/>
            </Routes>
        </div>
    );
};

export default AdminPanel;