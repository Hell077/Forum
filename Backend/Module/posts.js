import { Router } from 'express';
import { getDB } from '../mongoDb.js';
import { ObjectId } from 'mongodb';

const router = Router();

router.get('/posts', async (req, res) => {
    try {
        const db = getDB();
        const posts = await db.collection('Posts').find({}).toArray();
        res.status(200).send(posts);
    } catch (error) {
        console.error('Ошибка при получении постов:', error);
        res.status(500).send({ error: 'Внутренняя ошибка сервера' });
    }
});

router.get('/posts/user/:username', async (req, res) => {
    try {
        const db = getDB();
        const { username } = req.params;

        const userPosts = await db.collection('Posts').find({ 'author.name': username }).toArray();
        res.status(200).send(userPosts);
    } catch (error) {
        console.error('Ошибка при получении постов пользователя:', error);
        res.status(500).send({ error: 'Внутренняя ошибка сервера' });
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const db = getDB();
        const postId = req.params.id;
        if (!ObjectId.isValid(postId)) {
            return res.status(400).send({ error: 'Неверный формат ID' });
        }

        const post = await db.collection('Posts').findOne({ _id: new ObjectId(postId) });
        if (!post) {
            return res.status(404).send({ error: 'Пост не найден' });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error('Ошибка при получении поста:', error);
        res.status(500).send({ error: 'Внутренняя ошибка сервера' });
    }
});

router.post('/posts/add', async (req, res) => {
    try {
        const db = getDB();
        const { title, content, created_at, author, tags, photos } = req.body;

        const newPost = {
            _id: new ObjectId(),
            title,
            content,
            created_at: new Date(created_at),
            author: {
                id: new ObjectId(author.id),
                name: author.name,
            },
            tags,
            photos: [], // Создаем пустой массив для фотографий
        };

        // Проверяем наличие фотографий и добавляем их в новый пост, если они есть
        if (photos && photos.length > 0) {
            newPost.photos = photos.map(photo => ({
                photo_id: new ObjectId(),
                url: photo.url,
                description: photo.description,
                uploaded_at: new Date(photo.uploaded_at),
            }));
        }

        const result = await db.collection('Posts').insertOne(newPost);
        res.status(201).json();
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'An error occurred while creating the post.' });
    }
});
export default router;
