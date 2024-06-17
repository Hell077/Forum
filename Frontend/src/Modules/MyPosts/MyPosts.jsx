import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Импортируем компонент Link
import style from './MyPosts.module.css';

function MyPosts() {
    const login = useSelector(state => state.login.login);
    const id = useSelector(state => state.login.authorId);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/posts/user/${login}`);
                setUserPosts(response.data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, [login]);

    return (
        <>
            <h1 className={style.title}>{id}</h1>
            <div className={style.container}>
                <h1 className={style.title}>Мои посты</h1>

                {userPosts.length === 0 ? (
                    <p>У вас нет ни одного поста</p>
                ) : (
                    <ul className={style.postList}>
                        {userPosts.map(post => (
                            <li key={post._id} className={style.postItem}>
                                <Link to={`/post/${post._id}`} className={style.postLink}>
                                    <h2>{post.title}</h2>
                                </Link>
                                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default MyPosts;
