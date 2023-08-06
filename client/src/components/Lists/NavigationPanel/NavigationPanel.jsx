import React from 'react';
import NavigationPanelItem from "../../Items/NavigationPanel/NavigationPanelItem";
import classes from "./NavigationPanel.module.css";

const NavigationPanel = ({list}) => {
    return (
        <div className={classes.container} align='left'>
            {list.map(element =>
                <NavigationPanelItem key={element.text} icon={element.icon} text={element.text} to={element.to}/>)}
        </div>
    );
};

export default NavigationPanel;