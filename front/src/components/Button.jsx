import React from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Button = (props) => {
    const {
        link, buttonName
    } = props


    return (
        <button className="exercice__validate">
            <Link to={link}>{buttonName}</Link>
            <IoArrowForwardSharp />
        </button>
    );
};

export default Button;
