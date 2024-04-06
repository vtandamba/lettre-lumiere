import React, { useEffect } from "react";
import user from '../assets/images/Customer.svg';
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import logoLettres from '../assets/images/Logo lettres en lumière.png'


const MainHeader = (props) => {
    const {link, role} = props

    const username = sessionStorage.getItem('user_name');


    return  <header className="header">
               { role !== "user" 
                        ? <img src={logoLettres} alt="Page des étapes" className="header__logo" /> 
                        :<div className="user">
                                <img src={user} alt="Profil utilisateur " className="user__img" />
                                <p className="user__name">{username || 'utilisateur'}</p>
                         </div> }
                <button className="bouton__croix" >
                    <Link to={link} style={{ color: "#000" }}>
                        QUITTER <span className="close-icon">&times;</span>
                    </Link>

                </button>
            </header>
}

export default MainHeader;