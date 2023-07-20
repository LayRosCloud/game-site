import React from 'react';
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <footer>
            <div className={classes.container}>
                <p>Наши соц. сети</p>
                <div className={classes.links}>
                    <p className={`${classes.link} ${classes.vk}`}>vk</p>
                    <p className={`${classes.link} ${classes.ok}`}>ok</p>
                </div>
                <p>Copyright 2023 by studio "leafall"</p>
            </div>
        </footer>
    );
};

export default Footer;