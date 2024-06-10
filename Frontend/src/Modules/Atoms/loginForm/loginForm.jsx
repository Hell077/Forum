import style from './loginForm.module.css'
import React from "react";



function LoginForm(){
    return(
        <>
            <form className={style.container}>
                <input type="text" placeholder={"Login"}/>
                <input type="password" placeholder={"Password"}/>
                <button>Login</button>
            </form>
        </>
    );
}

export default LoginForm