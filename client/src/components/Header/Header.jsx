import React, {useState} from 'react';
import './header.css'
import NavButton from "../UI/Buttons/NavButton/NavButton";
import {Link, useNavigate} from "react-router-dom";
import userController from "../../api/user-controller";

const Header = () => {
    const [activities, setActivities] = useState([false, false, false])
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem('isAuth')) || false)

    function activeButton(index) {

        let activityList = []
        for (let i = 0; i < 3; i++){
            activityList.push(false)
        }
        if(index !== -1){
            activityList[index] = true;
        }
        setActivities(activityList);
    }

    async function logout(){
        try{
            await userController.logout();
            setIsAuth(false)
        }catch (e){
            alert(e)
        }
    }

    return (
        <header>
            <div className='content__container header'>

                <div className='logo'>
                    <Link className='header__link' to='/'>
                        <h1>
                            leafall
                        </h1>
                    </Link>
                </div>

                <div className='buttons__container'>
                    <NavButton isActive={activities[0]}
                               onClick={()=> {activeButton(0); navigate('/news')}}>
                        Новости
                    </NavButton>

                    <NavButton isActive={activities[1]}
                               onClick={()=> {activeButton(1); navigate('/store')}}>
                        Магазин
                    </NavButton>

                    <NavButton isActive={activities[2]}
                               onClick={()=> {activeButton(2); navigate('/about')}}>
                        О нас
                    </NavButton>
                    {isAuth
                        ? <button onClick={()=>logout()} className='enter__button'>Вы вошли</button>
                        : <button className='enter__button'
                                  onClick={()=> {activeButton(-1); navigate('/login')}}>
                            Мой профиль
                        </button>}

                </div>
            </div>
        </header>
    );
};

export default Header;