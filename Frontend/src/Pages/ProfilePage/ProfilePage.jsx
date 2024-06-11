import React from 'react';
import Header from "../../Modules/Header/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../Store/loginSlice.js";
import LoginForm from "../../Modules/Atoms/loginForm/loginForm.jsx";

function ProfilePage() {
    const dispatch = useDispatch();
    const login = useSelector(state => state.login.login);

    const handleSetLogin = () => {
        dispatch(setLogin(null));
    };
    if(login === ''|| login === undefined || login === null){
        return (
            <>
                <Header/>
                <LoginForm/>
            </>
        )
    } else {
        return (
            <>
                <Header/>
                <h1>{login}</h1>
                <button onClick={handleSetLogin}>Выйти</button>
            </>
        );
    }


}

export default ProfilePage;
