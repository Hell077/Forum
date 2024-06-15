import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import style from './addPosts.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddPosts() {
    const login = useSelector(state => state.login.login);
    const [postData, setPostData] = useState({
        title: "Заголовок поста",
        content: "Содержимое поста",
        created_at: new Date().toISOString(),
        author: {
            id: "", // id пользователя будет установлен на сервере
            name: login,
        },
        tags: ["тег1", "тег2", "тег3"],
        photos: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const handleTagChange = (index, value) => {
        const newTags = [...postData.tags];
        newTags[index] = value;
        setPostData({
            ...postData,
            tags: newTags,
        });
    };

    const handlePhotoChange = (index, name, value) => {
        const newPhotos = [...postData.photos];
        newPhotos[index] = {
            ...newPhotos[index],
            [name]: value,
        };
        setPostData({
            ...postData,
            photos: newPhotos,
        });
    };

    const addPhoto = () => {
        setPostData({
            ...postData,
            photos: [
                ...postData.photos,
                {
                    photo_id: generateRandomId(),
                    url: "",
                    description: "",
                    uploaded_at: new Date().toISOString(),
                },
            ],
        });
    };

    const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:3000/posts/add', {
                title: postData.title,
                content: postData.content,
                created_at: postData.created_at,
                author: {
                    name: login,
                },
                tags: postData.tags,
                photos: postData.photos,
            });
            console.log('Post created:', response.data);
            setLoading(false);
            setPostData({
                title: "Заголовок поста",
                content: "Содержимое поста",
                created_at: new Date().toISOString(),
                author: {
                    id: "",
                    name: login,
                },
                tags: ["тег1", "тег2", "тег3"],
                photos: [],
            });

            // Вызываем уведомление об успешном добавлении поста
            toast.success('Пост успешно добавлен!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Error creating post:', error);
            setError(error.message);
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.formGroup}>
                <label htmlFor="title">Заголовок:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                    className={style.input}
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="content">Содержимое:</label>
                <textarea
                    id="content"
                    name="content"
                    value={postData.content}
                    onChange={handleChange}
                    className={style.textarea}
                ></textarea>
            </div>
            <div className={style.formGroup}>
                <label>Теги:</label>
                {postData.tags.map((tag, index) => (
                    <input
                        key={index}
                        type="text"
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        className={style.input}
                    />
                ))}
            </div>
            <div className={style.formGroup}>
                <label>Фотографии:</label>
                {postData.photos.map((photo, index) => (
                    <div key={index} className={style.photoGroup}>
                        <input
                            type="text"
                            name="url"
                            placeholder="URL фотографии"
                            value={photo.url}
                            onChange={(e) =>
                                handlePhotoChange(index, "url", e.target.value)
                            }
                            className={style.input}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Описание"
                            value={photo.description}
                            onChange={(e) =>
                                handlePhotoChange(index, "description", e.target.value)
                            }
                            className={style.input}
                        />
                        <input
                            type="datetime-local"
                            name="uploaded_at"
                            value={new Date(photo.uploaded_at).toISOString().slice(0, 16)}
                            onChange={(e) =>
                                handlePhotoChange(index, "uploaded_at", e.target.value)
                            }
                            className={style.input}
                        />
                    </div>
                ))}
                <button type="button" onClick={addPhoto} className={style.addButton}>
                    + Добавить фотографию
                </button>
            </div>
            <button type="submit" className={style.submitButton}>Отправить</button>
        </form>
    );
}

export default AddPosts;





