import React, { useState } from 'react';
import Header from "../../Modules/Header/Header.jsx";
import Posts from "../../Modules/Posts/Posts.jsx";
import style from './mainPage.module.css';
import Aside from "../../Modules/Atoms/asideBar/Aside.jsx";
import Find from "../../Modules/Atoms/Find/Find.jsx";

function MainPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ tags: [], date: "" });

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <Header />
            <Find onSearch={handleSearch} />
            <div className={style.container}>
                <Aside onFilterChange={handleFilterChange} />
                <Posts searchQuery={searchQuery} filters={filters} />
            </div>
        </>
    );
}

export default MainPage;
