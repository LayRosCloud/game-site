import React from 'react';
import classes from './Dropdown.module.css'
const Dropdown = ({parent, children}) => {
    return (
        <div className={classes.dropdown}>
            <span>Mouse over me</span>
            <div className={classes.dropdownContent}>
                <p>hover me</p>
            </div>
        </div>
    );
};

export default Dropdown;