import React from 'react';
import PreviewItem from "../../Items/Preview/PreviewItem";

const PreviewsSlider = ({list}) => {
    return (
        <div>
            {list.map(preview =>
                <PreviewItem key={preview.id} preview={preview}/>
            )}
        </div>
    );
};

export default PreviewsSlider;