import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './mongoDb.js';
import checkLoginRoutes from "./Module/checkLogin.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

connectDB().then(() => {
    app.use(checkLoginRoutes);

    app.listen(port, () => {
        console.log(`Сервер запущен на порту localhost:${port}`);
    });
}).catch(console.error);
