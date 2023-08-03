import React from 'react';
import CommentItem from "../../Items/Comment/CommentItem";

const CommentsList = ({list}) => {
    return (
        <div>
            {list.map(comment => <CommentItem comment={comment}/>)}
        </div>
    );
};

export default CommentsList;