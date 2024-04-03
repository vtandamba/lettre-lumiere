import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getElementRandom } from "../../hooks/useRandom";
import speak from "../../hooks/useSpeak";
import { IoArrowForwardSharp } from "react-icons/io5";

const B = () => {

    const [item, setItem] = useState();
    const [displayItems, setDisplayItems] = useState([]) // Pour veiller à ce qu'ils le même phonème ne s'affiche pas
    const params = useParams();

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));
    const colors = ['#3CA83D', '#F26A1B', '#F2E52E', '#7BA1CE', '#B05C0E', '#F20002', '#000000', '#B9829E', '#7B0D80', '#EEEEEE'];

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

        const selectedGraphemes = [];
        graphemesGroups.map((graph) => 
            selectedGraphemes.push(getElementRandom(graph))
        )
     
        setDisplayItems(selectedGraphemes);
   
        setItem(getElementRandom(selectedGraphemes));
    };

    useEffect(()=> {
        if(params.categorie==='alphabet'){
            setItem(getElementRandom(alphabet));
            setDisplayItems(alphabet)
        }else {
            selectDisplayGraphemes();
        
        }
    }, [])


    useEffect(() => {
      
        speak(item);
    }, [item]);

    const handleClick = (evt) => {
        const elements = document.querySelectorAll('.list__item');
        elements.forEach(el => el.classList.remove('true', 'false'));
        (evt.target.textContent === item) ? evt.target.classList.add('true') : evt.target.classList.add('false');
    };
    return <React.Fragment>
                <h2 className="exercice__consigne" onClick={(evt)=> speak(evt.target.textContent)}>Clique sur {params.categorie === "alphabet" ? "la lettre" : "le graphème"} correspondant au son écouté</h2>
                <p className="exercice__sound" onClick={() => speak(item)}>?</p>
                <ul className="list">
                    {displayItems.map((grapheme, index) => {
                        return <li key={index} className="list__item" onClick={handleClick}>{grapheme}</li>;
                    })}
                </ul>

        
                  <button className="exercice__validate">
                    <Link to={`/${params?.categorie}/exercices/c1`}>
                        Suivant
                    </Link>
                    <IoArrowForwardSharp />
                </button>
        </React.Fragment>
}

export default B;