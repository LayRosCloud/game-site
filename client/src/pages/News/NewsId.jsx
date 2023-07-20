import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import blogController from "../../api/blog-controller";
import contentGamesController from "../../api/content-games-controller";
import ContentGamesList from "../../components/Lists/ContentGames/ContentGamesList";

const NewsId = () => {
    const id = useParams().id
    const [blogInfo, setBlogInfo] = useState({})
    const [moreNews, setMoreNews] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        start()
    })
    async function start(){
        try {

            const response = await blogController.getById(id);
            setBlogInfo(response.data)
            const responseMoreInfo = await contentGamesController.getAll(id, 1)
            setMoreNews(responseMoreInfo.data);
        }
        catch (e){
            navigate('/error')
        }
    }
    return (
        <div>
            <h1>{blogInfo.title}</h1>
            <img height='300' src={`http://localhost:5000/previews/${blogInfo.preview}`} alt='Превью новости'></img>
            <p>{blogInfo.description}</p>
            <ContentGamesList list={moreNews}/>
        </div>
    );
};

export default NewsId;