import style from './loginForm.module.css'
import React from "react";



function LoginForm(){
    return(
        <>
            <form className={style.container}>
                <input type="text"/>
                <input type="password"/>
                <button>SetNewLogin</button>
            </form>
        </>
    );
}

export default LoginForm