import React from 'react';
import ContentGameItem from "../../Items/ContentGame/ContentGameItem";

const ContentGamesList = ({list}) => {

    return (
        <div>
            {list.map(item =>
                <ContentGameItem key={item.id} obj={item}/>)
            }
        </div>
    );
};

export default ContentGamesList;