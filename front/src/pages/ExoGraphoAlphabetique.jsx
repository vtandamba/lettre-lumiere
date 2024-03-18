import React from "react";
import { Link, Outlet } from "react-router-dom";
import user from '../assets/images/Customer.svg';
import { IoMdClose } from "react-icons/io";
const Exercises = (props) => {
    return <div className="exercices">
        <header className="exercices__header">
        <div className="user">
                <img src={user} alt="Profil utilisateur " className="user__img" />
                <p className="user__name">José</p>
            </div>
            <div className="quit">
                <Link to='/home'>   <p>Quitter</p> </Link>

                <p className="quit__img"><IoMdClose size={23} /></p>

            </div>
        </header>
        <main className="exercice">
            {props.children}
            <Outlet />
        </main>
    </div>
}

export default Exercises;
