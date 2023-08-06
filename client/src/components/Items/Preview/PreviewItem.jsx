import React from 'react';
import {API_URL} from "../../../api";

const PreviewItem = ({preview}) => {
    return (
        <img width={200} src={`${API_URL}/previews/${preview.url}`} alt='превью'/>
    );
};

export default PreviewItem;