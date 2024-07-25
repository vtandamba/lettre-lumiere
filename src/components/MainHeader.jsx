import React from "react";
import userIcon from '../assets/images/avatar/avatar.svg';
import userBronze from '../assets/images/avatar/avatar_bronze.svg';
import userSilver from '../assets/images/avatar/avatar_silver.svg';
import userGold from '../assets/images/avatar/avatar_gold.svg';
import userPerfect from '../assets/images/avatar/avatar_perfect.svg';
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import logoLettres from '../assets/images/Logo lettres en lumière.png';
import { useUser } from "../contexts/UserContext";

const MainHeader = (props) => {
    const { link, role } = props;
    const { user } = useUser();

    // Fonction pour obtenir l'icône en fonction du niveau
    const getUserIcon = (level) => {
        switch (level) {
            case 'perfect':
                return userPerfect;
            case 'gold':
                return userGold;
            case 'silver':
                return userSilver;
            case 'bronze':
                return userBronze;
            default:
                return userIcon;
        }
    };

    const username = user?.username || 'utilisateur';
    const userLevel = user?.level || 'nobe'; // Niveau de l'utilisateur avec valeur par défaut
    const userAvatar = getUserIcon(userLevel); // Icône basée sur le niveau

    return (
        <header className="header">
            {role !== "user"
                ? <img src={logoLettres} alt="Page des étapes" className="header__logo" />
                : <div className="user">
                    <img src={userAvatar} alt="Profil utilisateur" className="user__img" />
                    <p className="user__name">{username}</p>
                </div>}
            <Link to={link} className="bouton__croix">
                <p style={{ color: "#000" }}>QUITTER</p>
                <p><span className="close-icon">&times;</span></p>
            </Link>
        </header>
    );
};

export default MainHeader;
