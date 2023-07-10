import React, {useState} from 'react';
import {Link} from "react-router-dom";
import DefaultButton from "../../../components/UI/Buttons/DefaultButton/DefaultButton";
import '../Auth.css'
import AuthInput from "../../../components/UI/Inputs/AuthInput/AuthInput";
import userController from "../../../api/user-controller";


const LoginPage = () => {
    const [user, setUser] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({email: false, password: false})

    async function enterProfile(){
        if(errors.password || errors.email){
            return alert('Ошибка неправильный формат почты или пароля')
        }
        try{
            const response = await userController.login(user.email, user.password)
            console.log(response)
        }
        catch (e){
            alert(e)
        }
    }

    return (
        <div className='auth__container'>
            <h1>Авторизация</h1>
            <AuthInput
                regex={/^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/g}
                tooltip='Неправильный формат почты - example@example.com'
                placeholder='Введите почту...'
                value={user.email}
                setBad={(bad)=>setErrors({...errors, email: bad})}
                setValue={(e)=>setUser({...user, email: e})}/>
            <AuthInput type='password'
                       regex={/^(.{4,32})$/i}
                       tooltip='Неправильный формат пароля'
                       placeholder='Введите пароль...'
                       value={user.password}
                       setBad={(bad)=>setErrors({...errors, password: bad})}
                       setValue={(e) => setUser({...user, password: e})}/>
            <div className='inputs__container'>
                <Link className='link' to='/register'>У меня нет аккаунта</Link>
                <DefaultButton onClick={enterProfile}>Войти</DefaultButton>
            </div>
        </div>
    );
};

export default LoginPage;