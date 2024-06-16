import React from 'react';
import style from './TagInput.module.css';

function TagInput({ tags, handleTagChange, addTag }) {
    return (
        <div className={style.formGroup}>
            <label>Теги:</label>
            {tags.map((tag, index) => (
                <input
                    key={index}
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className={style.input}
                />
            ))}
            <button type="button" onClick={addTag} className={style.addButton}>
                + Добавить тег
            </button>
        </div>
    );
}

export default TagInput;
