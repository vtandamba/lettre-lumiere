import React, { useEffect, useState } from "react";
import { getElementRandom } from "../../hooks/useRandom";
import { Link, useParams } from "react-router-dom";
import { IoArrowForwardSharp } from "react-icons/io5";
import hautParleur from '../../assets/images/haut-parleur.svg';
import useSpeak from "../../hooks/useSpeak";

const E = () => {
    const speak = useSpeak();
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));
    const [item, setItem] = useState(''); // Masquer l'item initialement
    const [input, setInput] = useState("");
    const [showResponse, setShowResponse] = useState(false);
    const [maxEntries, setMaxEntries] = useState();
    const params = useParams();

    const graphemesGroups = [
        ['in', 'un'],
        ['an', 'en'],
        ['on'],
        ['au', 'eau'],
        ['ou'],
        ['eu', 'œu'],
        ['ei', 'et', 'er'],
        ['est', 'ai', 'es'],
        ['ien'],
        ['ed']
    ];

    const selectDisplayGraphemes = () => {
        const selectedGraphemes = graphemesGroups.map(group => getElementRandom(group));
        setItem(getElementRandom(selectedGraphemes));
    };

    useEffect(() => {
        setMaxEntries(params.categorie === "alphabet" ? 1 : 3);
        if (params.categorie === "alphabet") {
            setItem(getElementRandom(alphabet));
        } else {
            selectDisplayGraphemes();
        }
        speak(item); // Parler immédiatement après l'affectation de l'item
    }, [params.categorie]);

    const handleChange = (e) => {
        const inputModified = params.categorie === 'alphabet' ? e.target.value.toUpperCase() : e.target.value.toLowerCase();
        if (e.target.value.length <= maxEntries) {
            setInput(e.target.value);

            // Vérification automatique de la réponse
            const responseInput = document.querySelector('.exercice__input');
            if (inputModified.toLowerCase() === item?.toLowerCase()) {
                responseInput?.classList.add('true'); // Bonne réponse
                setShowResponse(false);
            } else {
                responseInput?.classList.remove('true');
                setShowResponse(true); // Afficher l'item correct si la réponse est fausse
            }
        }
    };

    return (
        <React.Fragment>
            <div onClick={() => speak(`Ecris ${params.categorie === "alphabet" ? "la lettre" : "le graphème"} dictée`)}>
                <h2 className="exercice__consigne ligne">
                    <span>
                        <img src={hautParleur} alt="Haut-parleur" />
                    </span>
                    Ecris {params.categorie === "alphabet" ? "la lettre" : "le graphème"} dictée
                </h2>
            </div>

            <p className="exercice__sound" onClick={() => speak(item)}>?</p>

            <React.Fragment>
                <form className="exercice__form">
                    <input
                        type="text"
                        value={input}
                        onChange={handleChange}
                        autoFocus
                        className="exercice__input"
                    />
                    {showResponse && <p className="exercice__response">{item}</p>}
                </form>
                <Link className="exercice__validate" to={params.categorie === "alphabet" ? "/alphabet" : "/graphemes/exercices/g1"}>
                {/* <Link className="exercice__validate" to={params.categorie === "alphabet" ? "/alphabet/exercices/h1" : "/graphemes/exercices/g1"}> */}
                    <p>OK</p>
                    <IoArrowForwardSharp />
                </Link>
            </React.Fragment>
        </React.Fragment>
    );
};

export default E;
