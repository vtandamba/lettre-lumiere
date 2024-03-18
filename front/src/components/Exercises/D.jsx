// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getElementRandom } from "../../hooks/useRandom";
// import speak from "../../hooks/useSpeak";
// import { IoArrowForwardSharp } from "react-icons/io5";

// const D = () => {
//     const params = useParams();

//     const [item, setItem] = useState('');
//     const [tabItems, setTabItems] = useState([]);
//     const [validate, setValidate] = useState(false);
//     const [allItemsWithStyles, setAllItemsWithStyles] = useState([]);

//     let responseGiven = false;
//     console.log(responseGiven);
//     const navigate = useNavigate();


//     const graphemesGroups = [
//         ['in', 'un'],
//         ['an', 'en'],
//         ['on'],
//         ['au', 'eau'],
//         ['ou'],
//         ['eu', 'œu'],
//         ['ei', 'et', 'er'],
//         ['est', 'ai', 'es'],
//         ['ien'],
//         ['ed']
//       ];

//       const selectDisplayGraphemes = () => {
//         const selectedGraphemes = graphemesGroups.map(group => getElementRandom(group));
//         setTabItems(selectedGraphemes);
//         setItem(getElementRandom(selectedGraphemes));
//       };


//       useEffect(() => {

//         const allItemsWithStyles = tabItems.map(item => [
//             { style: "list__item--uppercase", item: item.toUpperCase() },
//             { style: "list__item--lowercase", item: item },
//             // { style: "list__item--belleallure", item: item }
//         ])
    
        
//         shuffleArray(allItemsWithStyles);
//         if (params.categorie==="alphabet") {
//             let newTabItems = [];
//             while (newTabItems.length < 5) {
//                 let candidateItem = String.fromCharCode(65 + Math.floor(Math.random() * 26));
//                 if (!newTabItems.includes(candidateItem)) {
//                     newTabItems.push(candidateItem);
//                 }
//             }
//             setTabItems(newTabItems);
//             if (newTabItems.length > 0) {
//                 setItem(getElementRandom(newTabItems)); 
//             }
//         }else{
//             selectDisplayGraphemes();
//         }

   
//         console.log(item)
//     }, []);

//     useEffect(() => {
//         speak(item)
//     }, [item])

//     const shuffleArray = (array) => {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//     };


    

//     let tabResponse = [];
//     function clickResponse(evt) {
//         // let responseGiven = true;
//         if (tabResponse.length < 3) {
//             tabResponse.push(evt.target);
//             console.log(tabResponse)
//             evt.target.classList.add('choosen');
//         }

//     }

//     const handleChooseResponse = () => {

//         const items = document.querySelectorAll('.list__item');

//         items.forEach(item => {
//             item.classList.remove('choosen', 'true', 'false');
//         });

//         tabResponse.forEach(el => {
//             let isCorrect;
//             if (params.categorie === 'graphemes') {
//                 isCorrect = el.textContent.trim().toLowerCase() === item 
//             } else {
//                 isCorrect = el.textContent.trim() === item
//             }
//             el.classList.add(isCorrect ? 'true' : 'false');
//         });

       
//         items.forEach(oneItem => {
//             if (params.categorie === 'grapheme') {
//                 if (oneItem.textContent.trim().toLowerCase() === item.toLowerCase() && !oneItem.classList.contains('true')) {
//                     oneItem.classList.add('true');
//                 }
//             } else {   
//                 if (oneItem.textContent.trim() === item && !oneItem.classList.contains('true')) {
//                     oneItem.classList.add('true');
//                 }
//             }
//         });

//         setTimeout(() => {
//             navigate(`/${params?.categorie}/exercices/e1`); 
//         }, 1500); 

//     };

//       return <React.Fragment>
       
//             <p className="exercice__sound" onClick={()=>speak(item)}>?</p>
//             <ul className="list">
//                 {allItemsWithStyles.map((item, index) => (
//                     <li className={`list__item ${item.style}`} key={index} onClick={clickResponse}>
//                         {item.item}
//                     </li>
//                 ))}
//             </ul>

//               <button className={`exercice__validate `}  onClick={handleChooseResponse} > 
//               Valider
//               <IoArrowForwardSharp />
//               </button>
//       </React.Fragment>
// }

// export default D;

import React, { useEffect, useState } from "react";
import speak from "../../hooks/useSpeak";
import { IoArrowForwardSharp } from "react-icons/io5";
import { getElementRandom } from "../../hooks/useRandom";
import { useNavigate, useParams } from "react-router-dom";


const D = (props) => {


    const [item, setItem] = useState();
    // const [tabItems, setTabItems] = useState();
    // const [validate, setValidate] = useState(false);
    const [allItemsWithStyles, setAllItemsWithStyles] = useState([]);
    const [tabResponses, setTabResponses] = useState(new Array(5).fill(null));
    const [tabItems, setTabItems] = useState([]);
    const [attemptCount, setAttemptCount] = useState(0);
    const [answerAlreadyTaken, setAnswerAlreadyTaken] = useState([]);
    const navigate =  useNavigate();

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

        let selectedGraphemes = graphemesGroups.map(group => getElementRandom(group));
        selectedGraphemes = selectedGraphemes.map(el => ({
            value: el,
            state: 'initial',
            isAlreadyChosen: false
        }));
        setTabItems(selectedGraphemes);
        setItem(getElementRandom(selectedGraphemes).value);

    };

    const generateAlphabetItems = () => {
        let newTabItems = [];
        while (newTabItems.length < 5) {
            let candidateItem = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            if (!newTabItems.find((item) => item.value === candidateItem)) {
                newTabItems.push({ value: candidateItem, state: 'initial', isAlreadyChosen: false });
            }
        }

        setTabItems(newTabItems); // Mise à jour de tabItems
        setItem(getElementRandom(newTabItems).value);
    };

    const shuffleArray = (array) => { //Algorithme de mélange de Fisher-Yates 
        for (let i = array?.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const prepareItemsWithoutShuffling = (items) => {
        return items.flatMap(item => [
          { ...item, style: "list__item--uppercase", value: item.value.toUpperCase() },
          { ...item,style: "list__item--lowercase", value: item.value },
          { ...item,style: "list__item--belleallure", value: item.value }
        ]);
      };
   


      useEffect(() => { //UseEffect de l'initialisation de la liste d'éléments

        const loadElements = () => {
            if (params.categorie === "alphabet") {
                generateAlphabetItems();
            } else {
                selectDisplayGraphemes();
            }
            console.log(item);
        };
    
        loadElements();
        console.log(allItemsWithStyles);
    }, [params.categorie]);


    useEffect(() => { //UseEffect pour l'ajout des styles et la réorganisation de la disposition des éléments
        const updatedItemsWithStyles = prepareItemsWithoutShuffling(tabItems);
        shuffleArray(updatedItemsWithStyles);
        setAllItemsWithStyles(updatedItemsWithStyles);
    }, [tabItems]);

  

            
    useEffect(() => { //UseEffect pour le changement de l'item après chaque attemps
        if (item)
        {
            console.log(item);
            speak(item);
        }      
    }, [item])

    useEffect(() =>{ //useEffect pour le passage à l'exercice suivant, si le nombre d'essais est terminé
        console.log(attemptCount);
        if(attemptCount + 1 > tabResponses.length){
            console.log('exo suivant')
            const timeout = setTimeout(()=> {
                navigate(`/${params.categorie}/exercices/e1`)
            }, 800)

            return ()=> clearTimeout(timeout)
            
        }
    }, [attemptCount])

 

    const handleChooseResponse = () => {
        if (attemptCount < tabResponses.length) {
            const allItemsChosen = allItemsWithStyles.filter(el => el.state === 'choosen');
            console.log(allItemsChosen);
            if (allItemsChosen.length > 0) {

                const updatedItems = allItemsWithStyles.map(el => {  //Mettre à vrai ou faux les items correspondant

                    if (el.state === 'choosen') {
                        return {
                            ...el,
                            state: el.value.toLowerCase() === item.toLowerCase() ? 'true' : 'false',
                        };
                    } else {

                        return {
                            ...el,
                            state: el.value.toLowerCase() === item.toLowerCase() ? 'true' : el.state,
                        };
                    }
                });
                setAllItemsWithStyles(updatedItems); //L'assigner pour le nouvel affichage
    
                const timeOutId = setTimeout(() => {
                    setTabResponses(prev => {
                        const newTabResponses = [...prev];
                        newTabResponses[attemptCount] = allItemsChosen.some(el => el.value.toLowerCase() === item);
                        return newTabResponses;
                    });
        
                    setAttemptCount(prevCount => {
                        if (prevCount + 1 < tabResponses.length) {
                            //Prochain essaie
                            setItem(getElementRandom(allItemsWithStyles).value);
                        }
                        return prevCount + 1;
                    });
        
                    resetAllItemsState();
                }, 1000);
                return ()=> clearTimeout(timeOutId)
            }
            console.log(attemptCount);
        }
    };

    function resetAllItemsState() {
        setAllItemsWithStyles(currentItems =>
            currentItems.map(item => ({ ...item, state: 'initial' }))
        );
    }


 

    const clickResponse = (clickedIndex) => {
        // const tab = allItemsWithStyles.map(el => el.state='choosen');
        // setAllItemsWithStyles(tab)
        const allItemsChosen = allItemsWithStyles.filter(el => el.state === 'choosen');
            if (allItemsChosen.length < 3){
                setAllItemsWithStyles(currentItems =>
                    currentItems.map((item, index) => {
                    if (index === clickedIndex){
                        return {
                            ...item,
                            state: item.state === 'initial' ? 'choosen' : 'initial',
                        };
                    }
                        return item;
                    })
                
                );
            }
    };


    return <React.Fragment>
                <h2 className="exercice__consigne" onClick={(evt)=> speak(evt.target.textContent)}> Trouve les 3 écritures {params.categorie === "alphabet" ? "de la même lettre" : "du même graphème"} </h2>
                <p className="exercice__sound" onClick={()=>speak(item)}>?</p>
                <ul className="list">
                    {allItemsWithStyles?.map((item, index) => (
                        <li className={`list__item ${item.style} ${item.state}`} key={index} onClick={()=>clickResponse(index)}>
                            {item.value}
                        </li>
                    ))}
                </ul>


                <div className="exercice__footer">
                    {/* <ul className="progress">
                        {tabResponses.map(response => (
                            <li className={`${response === null ? 'progress__part' : response === true ? 'progress__part progress__part--true' : 'progress__part progress__part--false'}`}></li>
                        ))}
                    </ul> */}
                    <button className="exercice__valid" onClick={handleChooseResponse}>OK</button>
                </div>
            </React.Fragment>
}

export default D;