import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from './PostDetail.module.css';
import Loader from '../Loader/Loader.jsx';
import Header from '../Header/Header.jsx';

function PostDetail() {
    const { postId } = useParams(); // Получение параметра маршрута
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${postId}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении поста:', error);
            });
    }, [postId]);

    if (!post) {
        return <Loader/>;
    }

    const MemoizedHeader = React.memo(Header);

    return (
        <>
            <MemoizedHeader />
            <div className={style.PostDetail}>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{__html: post.content}}/>
                <p>Картинки к посту: </p>
                <div className={style.Photos}>

                    {post.photos.map(photo => (
                        <div key={photo.photo_id} className={style.Photo}>
                            <img src={photo.url} alt={photo.description}/>
                            <p>{photo.description}</p>
                        </div>
                    ))}
                </div>
                <p>Автор: {post.author.name}</p>
                <p>Дата создания: {new Date(post.created_at).toLocaleDateString()}</p>
            </div>
        </>
    );
}

export default PostDetail;
