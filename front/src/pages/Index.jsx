import React from "react";
import logoBrain from '../assets/images/brainLogo.png';
import logoLettres from '../assets/images/Logo lettres en lumière.png'
import logoChrono from '../assets/images/bx_timer.png';
import { Link } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import { motion } from "framer-motion";

const Index = () => {
    return (<div className="index">
        
        <MainHeader role="general" link="/"/>
        <main>
            {/* <div className="progress">
                <p className="progress__container"></p> <p>0%</p>
            </div>
            <div >

            </div> */}
            <div className="progress-container">
                <div className="progress-bar" data-percentage="10"> </div>
            </div>
            <p className="index__message">Bonjour {sessionStorage.getItem("user_name")}</p>

            <div className="parts">
             
                    <Link to="/etapes"> 
                        <motion.div
                            className="index__logoBrain"
                            initial={{ y: 100}} 
                            animate={{
                                y: [-10, 0, -10], // Utilisez une liste pour définir les différentes hauteurs de lévitation
                                transition: { duration: 1.5, repeat: Infinity },
                                // Définissez la durée de l'animation et la répétition infinie
                            }}
                        >
                            <img src={logoBrain} alt="" />
                        </motion.div>
                    </Link>
           
                <Link to="/alphabet">

                    <motion.div
                            className="parts__alphabet"
                            initial={{ x: -500, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }} 
                            transition={{duration:0.5}}
                    >
                        <p> a b c </p>
                    </motion.div>
                </Link>
                <Link to="/graphemes">
                    <motion.div
                           className="parts__phonemes"
                            initial={{ x: 500, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }}
                            transition={{duration:0.5}} 
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
        </main>


    </div>)
}

export default Index;