import React from "react";
import { Link, Outlet } from "react-router-dom";
import user from '../assets/images/Customer.svg';
import { IoMdClose } from "react-icons/io";
import MainHeader from "../components/MainHeader";
const Exercises = (props) => {
    return <div className="exercices">
        <MainHeader role="user" link="/alphabet"/>
        <main className="exercice">
            {props.children}
            <Outlet />
        </main>
    </div>
}

export default Exercises;
