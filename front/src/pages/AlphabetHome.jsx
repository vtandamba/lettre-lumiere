import React from "react";
import logoLettres from '../assets/images/Logo lettres en lumière.png'
import courreur from '../assets/images/coureur.png'
import { Link, Outlet } from "react-router-dom";
import speak from '../hooks/useSpeak.js';

const AlphabetHome = () => {
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));

    return (<React.Fragment>



        <header className="index__header">
            <Link to="/home">
                <img src={logoLettres} alt="" className="index__logo" />
            </Link>
           
            <Link to={'/home'}><button class="bouton__croix">
                QUITTER <span class="close-icon">&times;</span>
            </button>
            </Link>

        </header>
        <main className="alphabet">


            <section class="alphabet__title" onClick={() => speak("l'alphabet")}>
                <p class="section__1">a b c</p>
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
                <section class="entrainement">

                    <div class="entrainement__test">
                        <p class="entrainement__bouton">S'entraîner</p>
                        <img class="entrainement__logo" src={courreur} alt="entrainement" />
                    </div>

                </section>
            </Link>
        </main>

    </React.Fragment>)
}

export default AlphabetHome;