import React, { useEffect, useState } from "react";
import speak from "../../hooks/useSpeak";
import { Link, useParams } from "react-router-dom";
import { IoArrowForwardSharp } from "react-icons/io5";
import hautParleur from '../../assets/images/haut-parleur.svg';

const C = () => {

  const params = useParams();
  const [item, setItem] = useState(null);
  const [input, setInput] = useState('');
  const [showItem, setShowItem] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState(null);
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





  const handleSubmit = (e) => {
    e.preventDefault();
    const responseInput = document.querySelector('.exercice__input');
    const inputModified = params.categorie === 'alphabet' ? input.toUpperCase() : input.toLowerCase();
    if (inputModified.toUpperCase() === item) {
      responseInput?.classList.add('true')

      setShowResponse(false)
    } else {
      responseInput?.classList.remove('true')
      setShowResponse(true);

    }
  };

  const handleChange = (e) => {
    if (e.target.value.length < input.length) {
      setInput(e.target.value);
    }
    else if (input.length < maxEntries) {
      setInput(e.target.value);
    }
  }


  useEffect(() => {
    speak(item)
  }, [item])

  return <React.Fragment>

    <div onClick={(evt) => speak(`Ecris ${params.categorie === "alphabet" ? "la lettre" : "le graphème"} dictée`)}>
      <h2 className="exercice__consigne ligne" onClick={(evt) => speak(evt.target.textContent)}>
        <span>
          <img src={hautParleur} />
        </span>
        Ecris {params.categorie === "alphabet" ? "la lettre" : "le graphème"} dictée

      </h2>
    </div>

    <p className="exercice__sound" onClick={() => speak(item)}>?</p>

    {response === true && <p className="exercice__result">Correct</p>}
    {showItem ? <p className="exercice__grapheme">{item}</p> :
      <React.Fragment>
        <form onSubmit={handleSubmit} className="exercice__form">
          <input type="text" value={input} onChange={handleChange} autoFocus className="exercice__input" />
          {showResponse && <p className="exercice__response">{item}</p>}

        </form>
        <button className="exercice__validate">
          <Link to={`/${params?.categorie}/exercices/d1`}>
            OK

          </Link>
          <IoArrowForwardSharp />
        </button>
      </React.Fragment>
    }
  </React.Fragment>

}

export default C;