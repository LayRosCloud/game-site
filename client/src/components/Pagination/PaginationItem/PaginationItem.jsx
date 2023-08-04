import React from 'react';
import classes from './PaginationItem.module.css'

const PaginationItem = ({number}) => {
    return (
        <>
            <p className={classes.item}>{number}</p>
        </>
    );
};

export default PaginationItem;