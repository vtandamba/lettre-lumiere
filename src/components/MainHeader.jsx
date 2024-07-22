import React, { useEffect } from "react";
import userIcon from '../assets/images/Customer.svg';
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import logoLettres from '../assets/images/Logo lettres en lumière.png'
import { useUser } from "../contexts/UserContext";


const MainHeader = (props) => {
    const {link, role} = props
    const { user } = useUser();
 
    const username = user?.username;

    return  <header className="header">
               { role !== "user" 
                        ? <img src={logoLettres} alt="Page des étapes" className="header__logo" /> 
                        :<div className="user">
                                <img src={userIcon} alt="Profil utilisateur " className="user__img" />
                                <p className="user__name">{username || 'utilisateur'}</p>
                         </div> }
                         <Link to={link} className="bouton__croix">
                            <p style={{ color: "#000" }}>QUITTER </p>
                            <p><span className="close-icon">&times;</span></p>
                        </Link>
            </header>
}

export default MainHeader;