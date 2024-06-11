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
    const [selected, setSelected] = useState('login');

    const handleLogin = async (event) => {
        event.preventDefault();

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
            toast.error('Неверный логин или пароль');
        } finally {
            setLoginInput('');
            setPassword('');
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!loginInput || !password) {
            toast.error('Логин и пароль должны быть заполнены');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/register', {
                login: loginInput,
                password: password,
            });

            if (response.status >= 200 && response.status < 300) {
                toast.success('Успешная регистрация');
                setSelected('login'); // Switch to login after successful registration
            } else {
                toast.error('Ошибка при регистрации');
            }
        } catch (error) {
            toast.error('Такой пользователь зарегистрирован');
        } finally {
            setLoginInput('');
            setPassword('');
        }
    };

    return (
        <>
            <div className={style.cont}>
                <div>
                    <button onClick={() => setSelected('login')}>Login</button>
                    <button onClick={() => setSelected('register')}>Register</button>
                </div>
                <form className={style.container} onSubmit={selected === 'login' ? handleLogin : handleRegister}>
                    <input
                        type="text"
                        placeholder="Login"
                        value={loginInput}
                        onChange={(e) => setLoginInput(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">{selected === 'login' ? 'Login' : 'Register'}</button>
                </form>
                <ToastContainer/>
            </div>
        </>
    );
}

export default LoginForm;
