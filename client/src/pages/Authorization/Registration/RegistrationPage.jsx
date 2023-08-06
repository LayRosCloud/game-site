import React, {useState} from 'react';
import {Link} from "react-router-dom";
import DefaultButton from "../../../components/UI/Buttons/DefaultButton/DefaultButton";
import AuthInput from "../../../components/UI/Inputs/AuthInput/AuthInput";
import userController from "../../../api/user-controller";
import '../Auth.css'

const RegistrationPage = () => {
    const [user, setUser] = useState({login: '',email: '', password: '', passwordRepeat: ''})
    const [errors, setErrors] = useState({lError: true, eError: true, pError: true, prError: true})

    const [successful, setSuccessful]=  useState(false)

    async function Register(){
        console.log(errors.eError || errors.lError || errors.pError || errors.prError)
        if(errors.eError || errors.lError || errors.pError || errors.prError){
            return alert('Ошибка! Неверные поля')
        }
        if(user.password !== user.passwordRepeat){
            return alert('Ошибка! Пароли не совпадают')
        }
        try {

            await userController.registration(user.login, user.password, user.email)
            setSuccessful(true)
        }
        catch (e){
            alert(e.message)
        }

    }

    if(successful){
        return (
            <div className='auth__container'>
                <h1>Успех!</h1>
                <p>{user.login}, на вашу почту
                    <a className='link'
                       href={`https://${user.email.split('@')[1]}`}>
                    {user.email}</a> было отправлено сообщение!
                </p>
            </div>
        )
    }
    else
        return (
            <div className='auth__container'>
                <h1>Регистрация</h1>
                <AuthInput regex={/^(\w{4,32})$/i}
                           tooltip='Используйте латиницу, цифры или _ Длина от 4 до 32 символов'
                           placeholder='Введите логин...'
                           value={user.login}
                           setBad={(bad) => setErrors({...errors, lError: bad})}
                           setValue={(e)=>setUser({...user, login: e})}/>
                <AuthInput regex={/^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/g}
                           tooltip='Неправильный формат почты - example@example.com'
                           placeholder='Введите почту...'
                           value={user.email}
                           setBad={(bad) => setErrors({...errors, eError: bad})}
                           setValue={(e)=>setUser({...user, email: e})}/>
                <AuthInput
                    regex={/^(.{4,32})$/i}
                    tooltip='Пароль от 4 до 32 символов'
                    type='password'
                    placeholder='Введите пароль'
                    value={user.password}
                    setBad={(bad) => setErrors({...errors, pError: bad})}
                    setValue={(e)=>setUser({...user, password: e})}/>
                <AuthInput
                    regex={/^(.{4,32})$/i}
                    tooltip='Пароль от 4 до 32 символов'
                    type='password'
                    placeholder='Повторите пароль...'
                    value={user.passwordRepeat}
                    setBad={(bad) => setErrors({...errors, prError: bad})}
                    setValue={(e)=>setUser({...user, passwordRepeat: e})}/>

                <div className='inputs__container'>
                    <Link className='link' to='/login'>У меня уже есть аккаунт</Link>
                    <DefaultButton onClick={()=>Register()}>Зарегистрироваться</DefaultButton>
                </div>
            </div>
        );
};

export default RegistrationPage;