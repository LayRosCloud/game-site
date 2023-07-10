import React, {useState} from 'react';
import classes from "./AuthInput.module.css";

const AuthInput = ({value, setValue, regex, tooltip, setBad, ...props}) => {
    const [badInput, setBadInput] = useState(false)

    function InputSymbol(text){
        setBadInput(!regex.test(text))
        setBad(badInput)
        setValue(text)
    }

    return (
        <input className={badInput? `${classes.inp} ${classes.bad__input}`: classes.inp} type='text'
               value={value}
               onChange={(e) => InputSymbol(e.target.value)}
               title={badInput ? tooltip : ''}
               {...props}/>
    );
};

export default AuthInput;