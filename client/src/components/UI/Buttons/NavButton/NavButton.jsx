import React from 'react';
import classes from './NavButton.module.css'

const NavButton = ({children, isActive, ...props}) => {

    return (
        <button {...props} className={isActive ? `${classes.nav__button} ${classes.active__button}` : `${classes.nav__button}`}>
            {children}
        </button>
    );
};

export default NavButton;