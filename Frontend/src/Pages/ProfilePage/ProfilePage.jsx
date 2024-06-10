import React from 'react';
import Header from "../../Modules/Header/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../Store/loginSlice.js"; // Убедитесь, что путь правильный

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
                <input type="text"/>
                <input type="password"/>
                <button onClick={handleSetLogin}>SetNewLogin</button>
            </>
        )
    } else {
        return (
            <>
                <Header />
                <h1>{login}</h1>
                <button onClick={handleSetLogin}>SetNewLogin</button>
            </>
        );
    }


}

export default ProfilePage;
