import React from 'react';
import style from './Burger.module.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'


function Burger(){
    return(
    <>
        <FontAwesomeIcon icon={faBars} />
    </>
    );
}

export default Burger