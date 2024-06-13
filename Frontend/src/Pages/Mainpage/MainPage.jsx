import Header from "../../Modules/Header/Header.jsx";
import Posts from "../../Modules/Posts/Posts.jsx";
import style from './mainPage.module.css'

function MainPage(){
    return(
    <>
        <Header/>
        <div className={style.container}>
            <Posts/>
        </div>
    </>
    );
}

export default MainPage