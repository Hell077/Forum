import React from 'react';
import style from './header.module.css';
import ProfileNav from '../Atoms/ProfileButton/ProfileBtn.jsx';
import Logo from "../Atoms/Logo/Logo.jsx";
import {useState} from "react";


function Header() {


    return (
        <header className={style.header}>
            <div className={style.container}>
                <Logo/>
                <ProfileNav />

            </div>
        </header>
    );
}

export default Header;
