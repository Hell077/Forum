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

export default router;
