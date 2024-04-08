import React from "react";
import logoLettres from '../assets/images/Logo lettres en lumière.png';
import { Link, Outlet } from "react-router-dom";
import speak from "../hooks/useSpeak";
import imageTraining from '../assets/images/coureur.png'
import soundTitle from '../assets/sons/graphemes/titreGraphemes.mp3';
import MainHeader from "../components/MainHeader";
import courreur from '../assets/images/courreur.svg'

const GraphemesHome = () => {

    const graphemes = [
        {
            color: '#3CA83D',
            grapheme: ['in', 'un']
        },
        {
            color: '#F26A1B',
            grapheme: ['an', 'en']
        },
        {
            color: '#F2E52E',
            grapheme: ['au', 'eau'],
        },
        {
            color: '#7BA1CE',
            grapheme: ['eu', 'œu'],
        },
        {
            color: '#B9829E',
            grapheme: ['ai', 'ei', 'est', 'et'],
        },
        {
            color: '#7B0D80',
            grapheme: ['_er', '_ez', '_es', '_ed'],
        },
        {
            color: '#EEEEEE',
            grapheme: ['ien'],
        },
        {
            color: '#B05C0E',
            grapheme: ['on'],
        },
        {
            color: '#F20002',
            grapheme: ['ou'],
        },
        {
            color: '#000000',
            grapheme: ['oi'],
        }

    ]

    const isDarkColor = (color) => {
        const rgb = parseInt(color.substring(1), 16);
        const luma = 0.2126 * ((rgb >> 16) / 255) + 0.7152 * (((rgb >> 8) & 0xff) / 255) + 0.0722 * ((rgb & 0xff) / 255);
        return luma < 0.5;
    };

    const handleSpeak = () => {

        let audio = new Audio(soundTitle);
        audio.play();
    }

    return <React.Fragment>


        <MainHeader link={"/home"} />
        <main className="graphemes">
            <h1 className="alphabet__title" onClick={handleSpeak}>an  on  in</h1>
            <div className="list">
                {graphemes.map((g, index) => (
                    <div
                        key={index}
                        style={{

                            color: isDarkColor(g.color) ? '#FFFFFF' : '#000000',
                            padding: '10px',
                            margin: '5px 0',
                        }}
                        className="grapheme__elements"
                    >
                        {g.grapheme.map((graphemeElement, index) => (
                            <div className="grapheme__fonts" style={{ backgroundColor: g.color }} key={index}>
                                <p style={{ margin: '5px 0' }} className="grapheme__item grapheme__item--verdana">
                                    {graphemeElement}
                                </p>
                                <p style={{ margin: '5px 0' }} className="grapheme__item grapheme__item--belleallure">
                                    {graphemeElement}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}

            </div>

            {/* <p className="graphemes__next"><Link to="exercices/a1" >S'entraîner </Link><img src={imageTraining} alt="" /> </p> */}
            <div className="alphabet">
                <section className="entrainement">
                    <Link to="exercices/a1">
                        <div className="entrainement__test">
                            <p className="entrainement__bouton">S'entraîner</p>
                            <img className="entrainement__logo" src={courreur} alt="entrainement" />
                        </div>
                    </Link>
                </section>
            </div>
        </main>
    </React.Fragment>
}

export default GraphemesHome;