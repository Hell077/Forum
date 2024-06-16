import React from 'react';
import style from './FormGroup.module.css'

function FormGroup({ label, children }) {
    return (
        <div className={style.formGroup}>
            <label>{label}</label>
            {children}
        </div>
    );
}

export default FormGroup;
