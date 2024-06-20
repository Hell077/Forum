import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import style from './addPosts.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagInput from '../Atoms/TagInput/TagInput.jsx';
import PhotoInput from '../Atoms/PhotoInput/PhotoInput.jsx';
import FormGroup from '../Atoms/FormGroup/FormGroup.jsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddPosts() {
    const login = useSelector(state => state.login.login);
    const initialState = {
        title: "",
        content: "",
        created_at: new Date().toISOString(),
        author: {
            id: "",
            name: login,
        },
        tags: [""],
        photos: [],
    };
    const [postData, setPostData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const handleContentChange = (value) => {
        setPostData({
            ...postData,
            content: value,
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

    const addTag = () => {
        setPostData({
            ...postData,
            tags: [
                ...postData.tags,
                "",
            ],
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
                    tag: ""
                },
            ],
        });
    };

    const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!postData.title || !postData.content || postData.tags.length === 0 || postData.tags.includes("")) {
            toast.error('Заполните все поля и добавьте хотя бы один тег.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

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
            setPostData(initialState);
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
            console.error('Ошибка при создании поста:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.sections}>
                    <div className={style.leftSection}>
                        <FormGroup>
                            <input
                                placeholder={"Заголовок"}
                                type="text"
                                id="title"
                                name="title"
                                value={postData.title}
                                onChange={handleChange}
                                className={style.title}
                            />
                        </FormGroup>
                        <FormGroup label="Содержимое:">
                            <ReactQuill
                                theme="snow"
                                value={postData.content}
                                onChange={handleContentChange}
                                className={style.textarea}
                            />
                        </FormGroup>
                    </div>
                    <div className={style.rightSection}>
                        <TagInput
                            className={style.formGroupTags}
                            tags={postData.tags}
                            handleTagChange={handleTagChange}
                            addTag={addTag}
                        />
                        <PhotoInput
                            className={style.formGroupPhoto}
                            photos={postData.photos}
                            handlePhotoChange={handlePhotoChange}
                            addPhoto={addPhoto}
                        />
                    </div>
                </div>
                <button type="submit" className={style.submitButton}>Отправить</button>
            </form>
        </div>

    );
}

export default AddPosts;
