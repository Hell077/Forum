import style from './loginForm.module.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../Store/loginSlice.js';

function LoginForm() {
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();  // Предотвращаем отправку формы по умолчанию

        if (!loginInput || !password) {
            toast.error('Логин и пароль должны быть заполнены');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login', {
                login: loginInput,
                password: password,
            });

            if (response.status === 200) {
                toast.success('Успешная авторизация');
                dispatch(setLogin(loginInput));
            } else {
                toast.error('Неверный логин или пароль');
            }
        } catch (error) {
            toast.error('Ошибка при отправке данных на сервер');
        } finally {
            setLoginInput('');
            setPassword('');
        }
    };

    return (
        <>
            <form className={style.container} onSubmit={handleLogin}>
                <input type="text" placeholder="Login" value={loginInput}
                       onChange={(e) => setLoginInput(e.target.value)} />
                <input type="password" placeholder="Password" value={password}
                       onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </>
    );
}

export default LoginForm;
