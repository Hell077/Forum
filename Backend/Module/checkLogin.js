import express from 'express';
import { getDB } from '../mongoDb.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).send({ error: 'Логин и пароль должны быть заполнены' });
    }

    try {
        const db = getDB();
        const user = await db.collection('Users').findOne({ login, password });

        if (user) {
            res.status(200).send({ message: 'Успешная авторизация', user });
        } else {
            res.status(401).send({ error: 'Неверные логин или пароль' });
        }
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).send({ error: 'Внутренняя ошибка сервера' });
    }
});

router.post('/register', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).send({ error: 'Логин и пароль должны быть заполнены' });
    }

    try {
        const db = getDB();
        const existingUser = await db.collection('Users').findOne({ login });

        if (existingUser) {
            return res.status(409).send({ error: 'Логин уже используется' });
        }

        const newUser = { login, password };
        await db.collection('Users').insertOne(newUser);
        res.status(201).send({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).send({ error: 'Внутренняя ошибка сервера' });
    }
});


router.get('/users', async (req, res) => {
    try {
        const db = getDB();
        const users = await db.collection('Users').find({}).toArray();
        res.status(200).send(users);
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        res.status(500).send({ error: 'Внутренняя ошибка сервера' });
    }
});

export default router;
