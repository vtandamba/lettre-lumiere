import React from "react";
import user from '../assets/images/Customer.svg';
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";


const MainHeader = () => {
    return <header className="header">
                <div className="user">
                    <img src={user} alt="Profil utilisateur " className="user__img" />
                    <p className="user__name">José</p>
                </div>
                <div className="quit">
                    <Link to='/home'>   <p>Quitter</p> </Link>

                    <p className="quit__img"><IoMdClose size={23} /></p>

                </div>
            </header>
}

export default MainHeader;