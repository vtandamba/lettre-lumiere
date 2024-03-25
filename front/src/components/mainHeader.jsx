import React from "react";
import user from '../assets/images/Customer.svg';
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import logoLettres from '../assets/images/Logo lettres en lumière.png'


const MainHeader = () => {

    const username = sessionStorage.getItem('user_id');
    return  <header className="header">
                <img src={logoLettres} alt="Page des étapes" className="header__logo" />
                <button className="bouton__croix">
                    <Link to="/" style={{ color: "#000" }}>
                        QUITTER <span className="close-icon">&times;</span>
                    </Link>

                </button>
            </header>
}

export default MainHeader;