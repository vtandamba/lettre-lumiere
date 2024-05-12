import React from "react";
import checkIcon from '../assets/images/check.svg'

const ButtonValid = ({handleClick}) => {
    return <>
        <button className="exercice__valid" onClick={handleClick}>Ok <img src={checkIcon} alt="ok" /></button>
    </>
}

export default ButtonValid;