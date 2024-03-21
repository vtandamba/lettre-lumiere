import React from "react";
import logoBrain from '../assets/images/brainLogo.png';
import logoLettres from '../assets/images/Logo lettres en lumière.png'
import logoChrono from '../assets/images/bx_timer.png';
import { Link } from "react-router-dom";

const Index = () => {
    return (<div className="index">
        <header className="index__header">
            <img src={logoLettres} alt="Page des étapes" className="index__logo" />
            <button className="bouton__croix">
                <Link to="/" style={{ color: "#000" }}>
                    QUITTER <span className="close-icon">&times;</span>
                </Link>

            </button>
        </header>
        <main>
            {/* <div className="progress">
                <p className="progress__container"></p> <p>0%</p>
            </div>
            <div >

            </div> */}
            <div className="progress-container">
                <div className="progress-bar" data-percentage="10"> </div>
            </div>
            <p className="index__message">Bonjour {localStorage.getItem("user_name")}</p>

            <div className="parts">

                <p className="index__logoBrain">
                    <Link to="/etapes"> <img src={logoBrain} alt="" /></Link>

                </p>
                <Link to="/alphabet">
                    <div className="parts__alphabet">
                        <p> a b c </p>
                    </div>
                </Link>
                <Link to="/graphemes">
                    <div className="parts__phonemes">
                        <p>an
                            on
                            in</p>
                    </div>
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