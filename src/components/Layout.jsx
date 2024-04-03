import React, { Children } from "react";
import user from '../assets/images/Customer.svg';
import { IoMdClose } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";


const Layout = ({ Children }) => {
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
        {Children}
        <Outlet />
    </div>
}

export default Layout;