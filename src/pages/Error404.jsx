import React from "react";
import { Link } from "react-router-dom";

const Error = () => {

    return <React.Fragment>
            <div class="error">
                <section class="error__container">
                    <h1 class="error__title">Oups, <span class="error__title--span">Mauvaise page...</span> </h1>
                    <img class="error__img" src="img/crayon.svg" alt="crayon" />
                </section>
                <Link class="error_button" to="/">Retour à l'accueil <img class="error_button__img" src="img/home.png" alt="maison retour accueil" /></Link>
            </div>
             
            </React.Fragment>
}

export default Error;