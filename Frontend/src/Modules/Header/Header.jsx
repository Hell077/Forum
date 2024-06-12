import React from 'react';
import style from './header.module.css';
import ProfileNav from '../Atoms/ProfileButton/ProfileBtn.jsx';
import Logo from "../Atoms/Logo/Logo.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Header() {
    const login = useSelector(state => state.login.login);

    if (login === null || login === undefined || login === ''){
        return (
            <header className={style.header}>
                <div className={style.container}>
                    <Logo/>
                    <Link to="/profile">
                        <h3>Войдите в аккаунт</h3>
                    </Link>
                </div>
            </header>
        )
    }
    else{
        return (
            <header className={style.header}>
                <div className={style.container}>
                    <Logo/>
                    <Link to="/profile">
                        <h3>{login}</h3>
                    </Link>
                </div>
            </header>
        );
    }


}

export default Header;
