import React from 'react';

const CommentItem = ({comment}) => {
    return (
        <div>
            <p>Ник: {comment.user.login} Комментарий: {comment.content}</p>
        </div>
    );
};

export default CommentItem;