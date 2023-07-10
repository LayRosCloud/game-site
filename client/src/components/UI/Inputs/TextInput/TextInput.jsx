import React from 'react';
import classes from "./TextInput.module.css";

const TextInput = ({value, setValue, ...props}) => {
    return (
        <input className={classes.inp} type='text'
               value={value}
               onChange={ (e) => setValue(e.target.value)}
               {...props}/>
    );
};

export default TextInput;