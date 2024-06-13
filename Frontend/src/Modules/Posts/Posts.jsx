import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Замена useHistory на useNavigate
import style from './Posts.module.css';

function Posts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении постов:', error);
            });
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className={style.Posts}>
            {posts.map(post => (
                <div key={post._id} className={style.Post} onClick={() => handlePostClick(post._id)}>
                    <h2>{post.title}</h2>
                    <p className={style.tags}>{post.tags.map(tag => <span key={tag}>#{tag}</span>)}</p>
                    <p className={style.date}> {new Date(post.created_at).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}

export default Posts;
