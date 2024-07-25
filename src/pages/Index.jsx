import React, { useState } from "react";
import logoBrain from '../assets/images/brainLogo.png';
import logoChrono from '../assets/images/bx_timer.png';
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import { motion } from "framer-motion";
import logoutIcon from '../assets/images/logout.png';
import { useUser } from "../contexts/UserContext";
import SpringModal from "../components/Modal";

const Index = () => {
    const { user, setUser } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setTimeout(() => {
            navigate('/');
        }, 500); // Assure que la navigation a lieu après que la modal a été fermée

        setUser(null);
        sessionStorage.clear();
    };

    // Fonction pour calculer et arrondir la progression en pourcentage
    const calculateProgressPercentage = (score) => {
        return Math.round(Math.min(score, 1000) / 1000 * 100); // Limiter à 100% et arrondir
    };

    // Calcul du pourcentage en fonction du score de l'utilisateur
    const progressPercentage = user ? calculateProgressPercentage(user.score) : 0;

    return (
        <div className="index">
            <MainHeader role="general" link="/" />
            <main>
                {user && (
                    <div className="progress-container">
                        <div 
                            className="progress-bar" 
                            data-percentage={progressPercentage}
                            style={{ width: `${progressPercentage}%` }} // Appliquer le pourcentage
                        >
                            {/* Vous pouvez ajouter du contenu ici si nécessaire */}
                        </div>
                    </div>
                )}

                <p className="index__message">Bonjour {user?.username}</p>

                <div className="parts">
                    <Link to="/etapes">
                        <motion.div
                            className="index__logoBrain"
                            initial={{ y: 100 }}
                            animate={{
                                y: [-10, 0, -10],
                                transition: { duration: 1.5, repeat: Infinity },
                            }}
                        >
                            <img src={logoBrain} alt="Logo Brain" />
                        </motion.div>
                    </Link>

                    <Link to="/alphabet">
                        <motion.div
                            className="parts__alphabet"
                            initial={{ x: -500, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p> a b c </p>
                        </motion.div>
                    </Link>

                    <Link to="/graphemes">
                        <motion.div
                            className="parts__phonemes"
                            initial={{ x: 500, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p> an on in </p>
                        </motion.div>
                    </Link>

                    <Link to="/test">
                        <div className="parts__chrono">
                            <img className="section__chrono--logo" src={logoChrono} alt="Logo Chrono" />
                        </div>
                    </Link>
                </div>

                <SpringModal isOpen={openModal} setOpen={setOpenModal} handleClose={handleCloseModal}>
                    <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                </SpringModal>

                {user && (
                    <img src={logoutIcon} alt="logout" className="index__logout" onClick={handleOpenModal} />
                )}
            </main>
        </div>
    );
};

export default Index;
