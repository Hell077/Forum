import React, { useState } from 'react';
import style from './Find.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

function Find({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    };

    return (
        <div className={style.container}>
            <input className={style.query}
                type="text"
                placeholder="Поиск по названию"
                value={query}
                onChange={handleInputChange}
            />
            <button className={style.clear} onClick={handleClear}>
                <FontAwesomeIcon icon={faXmark} size="2xl" />
            </button>
            <button className={style.find} onClick={() => onSearch(query)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
            </button>
        </div>
    );
}

export default Find;
