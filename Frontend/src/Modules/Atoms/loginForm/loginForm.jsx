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
    const [selected, setSelected] = useState('login');
    const dispatch = useDispatch();

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

            if (response.status >= 200 && response.status < 300 ) {
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
                setSelected('login');
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
            <ToastContainer />
            <div className={style.cont}>
                <div className={style.container}>
                    <div className={style.switch}>
                        <button
                            className={selected === 'login' ? style.active : ''}
                            onClick={() => setSelected('login')}
                        >
                            Login
                        </button>
                        <button
                            className={selected === 'register' ? style.active : ''}
                            onClick={() => setSelected('register')}
                        >
                            Register
                        </button>
                    </div>
                    <form onSubmit={selected === 'login' ? handleLogin : handleRegister}>
                        <input
                            type="text"
                            placeholder="Login"
                            value={loginInput}
                            onChange={(e) => setLoginInput(e.target.value)}
                            className={style.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={style.input}
                        />
                        <button type="submit" className={style.submitButton}>
                            {selected === 'login' ? 'Login' : 'Register'}
                        </button>
                    </form>
                </div>

            </div>
        </>
    );
}

export default LoginForm;
