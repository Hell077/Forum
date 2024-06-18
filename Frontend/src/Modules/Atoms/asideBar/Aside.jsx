import React, { useState, useEffect } from 'react';
import style from './aside.module.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Aside({ onFilterChange }) {
    const [selectedFilters, setSelectedFilters] = useState({
        tags: [],
        date: ""
    });
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        onFilterChange(selectedFilters);
    }, [selectedFilters, onFilterChange]);

    const handleTagChange = (event) => {
        const { value, checked } = event.target;
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            tags: checked ? [...prevFilters.tags, value] : prevFilters.tags.filter(tag => tag !== value)
        }));
    };

    const handleDateChange = (event) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            date: event.target.value
        }));
    };

    const handleTagInputChange = (event) => {
        setTagInput(event.target.value);
    };

    const addTag = () => {
        if (tagInput.trim() === "") {
            toast.error("Введите текст тега!");
            return;
        }

        if (!selectedFilters.tags.includes(tagInput)) {
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                tags: [...prevFilters.tags, tagInput]
            }));
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            tags: prevFilters.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    return (
        <>

            <aside className={style.aside}>
                <ToastContainer/>
                <div className={style.filterSection}>
                    <h3>Фильтры</h3>
                    <div className={style.filterGroup}>
                        <h4>Теги</h4>
                        {selectedFilters.tags.map(tag => (
                            <div key={tag} className={style.tagItem}>
                                <span>{tag}</span>
                                <button onClick={() => removeTag(tag)} className={style.removeTagButton}>x</button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            placeholder="Добавить тег"
                            className={style.tagInput}
                        />
                        <button onClick={addTag} className={style.addTagButton}>Добавить</button>
                    </div>
                    <div className={style.filterGroup}>
                        <h4>Дата</h4>
                        <input type="date" value={selectedFilters.date} onChange={handleDateChange}
                               className={style.dateInput}/>
                    </div>
                </div>
            </aside>
        </>

    );
}

export default Aside;
