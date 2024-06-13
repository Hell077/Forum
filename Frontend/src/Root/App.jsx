import './Root.css';
import { Provider } from 'react-redux';
import store from '../Store/Store.js';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from '../Pages/Mainpage/MainPage.jsx';
import ProfilePage from '../Pages/ProfilePage/ProfilePage.jsx';
import PostDetail from "../Modules/Posts/PostDetail.jsx";

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route exact path="/" element=<MainPage /> />
                <Route exact path="/profile" element=<ProfilePage /> />
                <Route path="/post/:postId" element={<PostDetail />} />
            </Routes>
        </Provider>
    );
}

export default App;
