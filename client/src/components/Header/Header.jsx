import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "react-redux";
import NavButton from "../UI/Buttons/NavButton/NavButton";
import userController from "../../api/user-controller";
import './header.css'
import Dropdown from "../UI/Dropdown/Dropdown";
import DropDownItem from "../UI/Dropdown/DropdownItem/DropDownItem";
import DefaultButton from "../UI/Buttons/DefaultButton/DefaultButton";
import parseToJSON from "../../scripts/parserJWT";

const Header = () => {
    const [activities, setActivities] = useState([false, false, false])
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('')
    const store = useStore()

    const navigationId = {news: 0, store: 1, about: 2, disable: -1}
    const navigationPaths = {main: '/', news: '/news', store: '/store', about: '/about', login: '/login'}

    const dropDownElements = [
        {icon: '😀', to: '/', title: 'профиль'},
        {icon: '😀', to: '/', title: 'developer panel'},
        {icon: '😀', to: '/', title: 'admin panel'},
    ]

    useEffect(()=>{
        getData();
    },[])

    function getData(){
        const token = localStorage.getItem('token');
        if(token){
            const data = parseToJSON(token)
            setNickname(data.login);
        }
    }

    function clickNavigate(index, path){
        activeButton(index);
        navigate(path)
    }

    function activeButton(activeId) {
        const states = {active: true, disable: false}

        let activityList = [states.disable, states.disable, states.disable]

        if(activeId !== navigationId.disable){
            activityList[activeId] = states.active;
        }

        setActivities(activityList);
    }

    async function logout(){
        try{
            await userController.logout();
            store.dispatch({type: 'EXIT_AUTH'})
            window.location.reload();
        }catch (e){
            console.log(e)
        }
    }

    const profile = store.getState().isAuth
        ? <Dropdown parent={<button className='enter__button'>{nickname}</button>}>
            {dropDownElements.map(element =>
                <DropDownItem key={element.title} to={element.to} icon={element.icon}>{element.title}</DropDownItem>)}
            <DefaultButton className='logout__button' onClick={()=> logout()}>Выйти</DefaultButton>
          </Dropdown>
        : <button className='enter__button'
                  onClick={()=> {clickNavigate(navigationId.disable, navigationPaths.login)}}>
            Мой профиль
        </button>

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
                    {profile}
                </div>
            </div>
        </header>
    );
};

export default Header;