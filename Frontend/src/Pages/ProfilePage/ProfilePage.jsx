import React, { useState } from 'react';
import Header from "../../Modules/Header/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../Store/loginSlice.js";
import LoginForm from "../../Modules/Atoms/loginForm/loginForm.jsx";
import { ToastContainer } from "react-toastify";
import MyPosts from "../../Modules/MyPosts/MyPosts.jsx";
import AddPosts from "../../Modules/addPosts/addPosts.jsx";

const MemoizedHeader = React.memo(Header);
const MemoizedToastContainer = React.memo(ToastContainer);

function ProfilePage() {
    const dispatch = useDispatch();
    const login = useSelector(state => state.login.login);
    const [current, setCurrent] = useState('addPosts');

    const handleSetLogin = () => {
        dispatch(setLogin(null));
    };

    if (!login) {
        return (
            <>
                <MemoizedToastContainer />
                <MemoizedHeader />
                <LoginForm />
            </>
        );
    } else {
        return (
            <>
                <MemoizedToastContainer />
                <MemoizedHeader />
                <div>
                    <button onClick={() => setCurrent('addPosts')}>Add Posts</button>
                    <button onClick={() => setCurrent('myPosts')}>My Posts</button>
                </div>
                {current === 'addPosts' ? <AddPosts key="addPosts" /> : <MyPosts key="myPosts" />}
                <h1>{login}</h1>
                <button onClick={handleSetLogin}>Выйти</button>
            </>
        );
    }
}

export default ProfilePage;
