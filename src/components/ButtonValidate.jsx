import React, { useState, useEffect } from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const ButtonValidate = ({ isButtonDisabled, handleChooseResponse }) => {
    const [buttonDisable, setButtonDisable] = useState(true);

    // Utilisez useEffect pour réagir aux changements de isButtonDisabled
    useEffect(() => {
        // Vous pouvez inclure une vérification supplémentaire si nécessaire
        // mais, en général, la mise à jour directe basée sur la prop est ce que vous recherchez
        if (isButtonDisabled !== "") {
            setButtonDisable(isButtonDisabled);
        }
    }, [isButtonDisabled]); // Ce useEffect dépend de isButtonDisabled

    console.log(buttonDisable);

    return (
        <button className="exercice__validate">
            {buttonDisable ? (
                <p  onClick={handleChooseResponse}>Valider</p>
            ) : (

                     <Link to="/graphemes/exercices/e1">Suivant</Link>
                
      
               
            )}
                 <IoArrowForwardSharp />
        </button>
    );
};

export default ButtonValidate;
