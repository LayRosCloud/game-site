import React from 'react';

const ContentGameItem = ({obj}) => {
    const typeContent = obj['typeContent'];
    if(typeContent.name === 'image'){
        return <img alt='Превью' src={`http://localhost:5000/previews/${obj.content}`}></img>
    }

    return (
        <p>
            {obj.content}
        </p>
    );
};

export default ContentGameItem;