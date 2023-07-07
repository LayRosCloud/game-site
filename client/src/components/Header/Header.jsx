import React, {useState} from 'react';
import './header.css'
import NavButton from "../UI/Buttons/NavButton/NavButton";

const Header = () => {
    const [activities, setActivities] = useState([false, false, false])

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

    return (
        <header>
            <div className='content__container header'>
                <div className='logo'>
                    <h1>
                        leafall
                    </h1>
                </div>
                <div className='buttons__container'>
                    <NavButton isActive={activities[0]} onClick={()=> activeButton(0) }>Новости</NavButton>
                    <NavButton isActive={activities[1]} onClick={()=> activeButton(1) }>Магазин</NavButton>
                    <NavButton isActive={activities[2]} onClick={()=> activeButton(2) }>О нас</NavButton>

                    <button className='enter__button' onClick={()=>activeButton(-1)}>Мой профиль</button>
                </div>
            </div>
        </header>
    );
};

export default Header;