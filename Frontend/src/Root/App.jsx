import './Root.css';
import { Provider } from 'react-redux';
import store from '../Store/Store.js';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from '../Pages/Mainpage/MainPage.jsx';
import ProfilePage from '../Pages/ProfilePage/ProfilePage.jsx';

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route exact path="/" element=<MainPage /> />
                <Route exact path="/profile" element=<ProfilePage /> />
            </Routes>
        </Provider>
    );
}

export default App;
