import React from "react";
import logoLettres from '../assets/images/Logo lettres en lumière.png'
import courreur from '../assets/images/courreur.svg'
import { Link, Outlet } from "react-router-dom";
import speak from '../hooks/useSpeak.js';
import MainHeader from "../components/MainHeader.jsx";

const AlphabetHome = () => {
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));

    return (<React.Fragment>



       <MainHeader link='/home'/>
        <main className="alphabet">


            <section className="alphabet__title" onClick={() => speak("l'alphabet")}>
                <p className="section__1">a b c</p>
            </section>

            <div className="alphabet__container">

                <div className="alphabet__list">
                    {alphabet.map((lettre, index) => (
                        <span className="alphabet__listItem " key={index}>{lettre}</span>
                    ))}
                </div>



                <div className="alphabet__list">
                    {alphabet.map((lettre, index) => (
                        <span className="alphabet__listItem" key={index}>{lettre.toLowerCase()}</span>
                    ))}
                </div>
            </div>



            <Link to="/alphabet/exercices/a1">
                <section className="entrainement">

                    <div className="entrainement__test">
                        <p className="entrainement__bouton">S'entraîner</p>
                        <img className="entrainement__logo" src={courreur} alt="entrainement" />
                    </div>

                </section>
            </Link>
        </main>

    </React.Fragment>)
}

export default AlphabetHome;