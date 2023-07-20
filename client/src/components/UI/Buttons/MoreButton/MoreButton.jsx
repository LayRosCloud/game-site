import React from 'react';
import {Link} from "react-router-dom";
import classes from "./MoreButton.module.css";

const MoreButton = ({to}) => {
    return (
        <Link className={classes.btn} to={to}>Подробнее...</Link>
    );
};

export default MoreButton;