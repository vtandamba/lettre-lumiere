import React, { useEffect, useState } from "react";
import speak from "../../hooks/useSpeak";
import { getElementRandom } from "../../hooks/useRandom";
import { Link, useParams } from "react-router-dom";
import { IoArrowForwardSharp } from "react-icons/io5";
import hautParleur from '../../assets/images/haut-parleur.svg';

const E = () => {
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));
    const [item, setItem] = useState(getElementRandom(alphabet));
    const [input, setInput] = useState("")
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
        (params.categorie === "alphabet") ? setItem(getElementRandom(alphabet)) :selectDisplayGraphemes();
      }, [])

   


    const handleSpeakerClick = (evt) => {
        speak(item);
        console.log(item);
    };

    const handleSubmit = () => {
        const responseInput = document.querySelector('.exercice__input');
        console.log(responseInput.value);
        if (responseInput.value.trim() !== "") {
            responseInput.classList.remove('false');
            responseInput.classList.remove('true');
            (responseInput.value.toUpperCase() !== item.toUpperCase()) ? (responseInput.classList.add('false')) : responseInput.classList.add('true')
            console.log('item', item);
            console.log('value', responseInput.value)
            console.log(responseInput.value.toUpperCase() === item)
        } else {
            responseInput.classList.remove('false');
            responseInput.classList.remove('true');
        }
    }


    const handleChange = (evt) => {
        if (params.categorie==="alphabet"){
            if (evt.target.value.length < input.length || input.length === 0) {
                setInput(evt.target.value.slice(0, 1));
            }
    
        }else{
            if (evt.target.value.length < input.length) {
                setInput(evt.target.value);
            } 
            else if (input.length < 3) {
                setInput(evt.target.value);
            }
        }
    }

    useEffect(() => {
        speak(item);
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
            <p className="exercice__sound" onClick={handleSpeakerClick}>?</p>

            <form onSubmit={handleSubmit} className="exercice__form">
                    <input type="text" value={input} className="exercice__input" onChange={handleChange} autoFocus />
            </form>

            <button className={`exercice__validate`} >

                <Link to={params.categorie === "alphabet" ? "/alphabet/exercices/h1" : "/graphemes/exercices/g1"}>
                    Suivant
                </Link>
                <IoArrowForwardSharp />
            </button>
    </React.Fragment>
}

export default E;