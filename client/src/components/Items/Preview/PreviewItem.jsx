import React from 'react';

const PreviewItem = ({preview}) => {
    return (
        <img width={200} src={`http://localhost:5000/previews/${preview.url}`} alt='превью'/>
    );
};

export default PreviewItem;