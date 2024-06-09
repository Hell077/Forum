import style from "./Logo.module.css";
import React from "react";
import { useNavigate } from 'react-router-dom';



function Logo(){
const navigate = useNavigate();
    return(
        <>
            <div className={style.logo} onClick={() => navigate('/')}>
                Blogs
            </div>
        </>
    );
}

export default Logo