import {useNavigate} from "react-router-dom";
import style from "./ProfileButton.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const ProfileNav = () => {
    const navigate = useNavigate();

    return (
        <button className={style.navButton} onClick={() => navigate('/profile')}>
            <FontAwesomeIcon icon={faUser} className={style.icon} />
        </button>
    );
};

export default ProfileNav