import React, {useState} from 'react';
import CommentItem from "../../Items/Comment/CommentItem";
import TextInput from "../../UI/Inputs/TextInput/TextInput";
import DefaultButton from "../../UI/Buttons/DefaultButton/DefaultButton";
import {useStore} from "react-redux";
import commentsController from "../../../api/comments-controller";

const CommentsList = ({list, gameId}) => {
    const [comment, setComment] = useState('')
    const store = useStore();
    const userId = localStorage.getItem('id');

    async function sendComment(){
        await commentsController.create(gameId, userId, comment);
        setComment('');
    }

    return (
        <div>
            {store.getState().isAuth
                ? <div>
                    <TextInput value={comment}
                           setValue={(e) => setComment(e)}
                               placeholder='Введите комментарий'/>
                    <DefaultButton onClick = {()=>sendComment()}>Отправить</DefaultButton>
                </div>
                : ''}

            {list.map(comment => <CommentItem key={comment.id} comment={comment}/>)}
        </div>
    );
};

export default CommentsList;