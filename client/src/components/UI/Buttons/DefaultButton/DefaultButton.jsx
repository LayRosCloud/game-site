import React from 'react';
import classes from './DefaultButton.module.css'

const DefaultButton = ({children, ...props}) => {
    return (
        <button className={classes.btn} {...props}>
            {children}
        </button>
    );
};

export default DefaultButton;