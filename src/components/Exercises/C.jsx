import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoArrowForwardSharp } from "react-icons/io5";
import hautParleur from '../../assets/images/haut-parleur.svg';
import useSpeak from "../../hooks/useSpeak";

const C = () => {
  const speak = useSpeak();
  const params = useParams();
  const [item, setItem] = useState(null);
  const [input, setInput] = useState('');
  const [showItem, setShowItem] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [maxEntries, setMaxEntries] = useState();

  useEffect(() => {
    setMaxEntries(params.categorie === "alphabet" ? 1 : 3);
    const newLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    setItem(newLetter);
    const timer = setTimeout(() => {
      setShowItem(false);
      speak(newLetter);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const inputModified = params.categorie === 'alphabet' ? e.target.value.toUpperCase() : e.target.value.toLowerCase();
    if (e.target.value.length <= maxEntries) {
      setInput(e.target.value);

      // Vérification automatique de la réponse
      const responseInput = document.querySelector('.exercice__input');
      if (inputModified.toUpperCase() === item) {
        responseInput?.classList.add('true'); // Ajoute la classe "true" si la réponse est correcte
        setShowResponse(false);
      } else {
        responseInput?.classList.remove('true');
        setShowResponse(true); // Affiche l'item correct si la réponse est fausse
      }
    }
  };

  useEffect(() => {
    speak(item);
  }, [item]);

  return (
    <React.Fragment>
      <div onClick={() => speak(`Ecris ${params.categorie === "alphabet" ? "la lettre" : "le graphème"} dictée`)}>
        <h2 className="exercice__consigne ligne" onClick={(evt) => speak(evt.target.textContent)}>
          <span>
            <img src={hautParleur} alt="Haut-parleur" />
          </span>
          Ecris {params.categorie === "alphabet" ? "la lettre" : "le graphème"} dictée
        </h2>
      </div>

      <p className="exercice__sound" onClick={() => speak(item)}>?</p>

      {showItem ? (
        <p className="exercice__grapheme">{item}</p>
      ) : (
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
          <Link className="exercice__validate" to={`/${params?.categorie}/exercices/d1`}>
            <p>OK</p>
            <IoArrowForwardSharp />
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default C;
