import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "react-redux";
import NavButton from "../UI/Buttons/NavButton/NavButton";
import userController from "../../api/user-controller";
import './header.css'

const Header = () => {
    const [activities, setActivities] = useState([false, false, false])
    const navigate = useNavigate();

    const store = useStore()
    const state = store.getState()

    const isAuth = state.isAuth

    const navigationId = {news: 0, store: 1, about: 2, disable: -1}
    const navigationPaths = {main: '/', news: '/news', store: '/store', about: '/about', login: '/login'}

    function clickNavigate(index, path){
        activeButton(index);
        navigate(path)
    }

    function activeButton(activeId) {
        const states = {active: true, disable: false}

        let activityList = [states.disable, states.disable, states.disable]

        if(activeId !== navigationId.disable)
            activityList[activeId] = states.active;

        setActivities(activityList);
    }

    async function logout(){
        try{
            await userController.logout();
        }catch (e){
            console.log(e)
        }
    }



    return (
        <header>
            <div className='content__container header'>

                <div className='logo'>
                    <Link className='header__link' to={navigationPaths.main}>
                        <img src={require('../assets/logo.png')} alt='Лого'/>
                    </Link>
                </div>

                <div className='buttons__container'>
                    <NavButton isActive={activities[0]}
                               onClick={()=> clickNavigate(navigationId.news, navigationPaths.news)}>
                        Новости
                    </NavButton>

                    <NavButton isActive={activities[1]}
                               onClick={()=> clickNavigate(navigationId.store, navigationPaths.store)}>
                        Магазин
                    </NavButton>

                    <NavButton isActive={activities[2]}
                               onClick={()=> clickNavigate(navigationId.about, navigationPaths.about)}>
                        О нас
                    </NavButton>
                    {isAuth
                        ? <button onClick={()=> logout()} className='enter__button'>Вы вошли</button>
                        : <button className='enter__button'
                                  onClick={()=> {clickNavigate(navigationId.disable, navigationPaths.login)}}>
                            Мой профиль
                        </button>}

                </div>
            </div>
        </header>
    );
};

export default Header;