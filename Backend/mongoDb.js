import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        console.log('Успешно подключено к базе данных');
        db = client.db('postDB');
    } catch (error) {
        console.error('Ошибка при подключении к базе данных:', error);
        throw error; // Остановка сервера при ошибке подключения к БД
    }
}

function getDB() {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB first.");
    }
    return db;
}

export { connectDB, getDB };
