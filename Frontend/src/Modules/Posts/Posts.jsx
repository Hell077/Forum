import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './Posts.module.css';
import Loader from '../Loader/Loader.jsx';

function Posts({ searchQuery, filters }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при получении постов:', error);
                setLoading(true);
            });
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const filteredPosts = posts.filter(post => {
        const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = filters.tags.length === 0 || filters.tags.every(tag => post.tags.includes(tag));
        const matchesDate = !filters.date || new Date(post.created_at).toLocaleDateString() === new Date(filters.date).toLocaleDateString();
        return matchesQuery && matchesTags && matchesDate;
    });

    return (
        <div className={style.Posts}>
            {loading ? (
                <Loader className={style.Loader} />
            ) : (
                filteredPosts.map(post => (
                    <div key={post._id} className={style.Post} onClick={() => handlePostClick(post._id)}>
                        <h2>{post.title}</h2>
                        <p className={style.tags}>{post.tags.map(tag => <span key={tag}>#{tag}</span>)}</p>
                        <p className={style.date}>{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Posts;
