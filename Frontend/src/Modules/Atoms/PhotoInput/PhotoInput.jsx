import React from 'react';
import style from './PhotoInput.module.css';

function PhotoInput({ photos, handlePhotoChange, addPhoto }) {
    return (
        <div className={style.formGroup}>
            <label>Фотографии:</label>
            {photos.map((photo, index) => (
                <div key={index} className={style.photoGroup}>
                    <input
                        type="text"
                        name="url"
                        placeholder="URL фотографии"
                        value={photo.url}
                        onChange={(e) =>
                            handlePhotoChange(index, "url", e.target.value)
                        }
                        className={style.input}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Описание"
                        value={photo.description}
                        onChange={(e) =>
                            handlePhotoChange(index, "description", e.target.value)
                        }
                        className={style.input}
                    />
                    <input
                        type="datetime-local"
                        name="uploaded_at"
                        value={new Date(photo.uploaded_at).toISOString().slice(0, 16)}
                        onChange={(e) =>
                            handlePhotoChange(index, "uploaded_at", e.target.value)
                        }
                        className={style.input}
                    />
                </div>
            ))}
            <button type="button" onClick={addPhoto} className={style.addButton}>
                + Добавить фотографию
            </button>
        </div>
    );
}

export default PhotoInput;
