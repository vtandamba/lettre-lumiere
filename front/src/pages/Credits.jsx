import React from "react";
import { Link } from "react-router-dom";

const Credits = () => {
    return <div>
            <header className="header">
                <Link to="/" className="header__quit">
                    <p> Quitter</p>
                    <span class="close-icon">&times;</span>
                </Link>
            </header>
            <main className="credits">
          
                <h1 className="credits__title">Crédits</h1>
                <div class="credits__remerciements"> Projet destiné aux apprenants de la maison centrale de Saint-Martin-de-Ré,
                        réalisé par un
                        groupe de 4 étudiantes de l'université de La Rochelle
                        inscrites en licence professionnelle MIAW
                        (métiers de l'informatique - applications web)
                        en 2023-2024 : Marilyne Delia TSENE , Victoria TANDAMBA, Clarence Noirot et Loane SENE.
                        Coordination pédagogique : Camille BÜRR, enseignant spécialisé
                        <br/>
                        <br/>
                        Crédits photographiques : images libres de droit istockphotos.com
                        (projet en version maquette)
                        <br/>
                        <br/>
                        Police de caractère (cursive) : Belle allure GS
                        Remerciements : merci aux personnes détenues du cours d'alphabétisation
                        pour leur
                        participation au projet et pour l'écriture des graphèmes
                        (Abdelkader, Francis, Gilles, José,
                        Ousseni, Stanis),
                        <br/>
                        <br/>
                        merci aux personnes détenues de l'atelier vidéo pour le tournage et
                        le
                        montage des séquences vidéos (Hidayet, Mathieu, Niels, Arnaud),
                        <br/>
                        <br/>
                        merci aux enseignants de la
                        maison centrale pour la prononciation des phonèmes,
                        <br/>
                        <br/>
                        merci à Olivier pour la coordination du
                        tournage et du montage des séquences vidéos,
                        <br/>
                        <br/>
                        merci à tous les enseignants référents de la
                        licence professionnelle MIAW
                        et à l'université de La Rochelle,
                        <br/>
                        <br/>
                        merci au service informatique de
                        la maison centrale pour leur aide,
                        à la direction de l'établissement
                        et de l'administration
                        pénitentiaire pour leur accord,
                        <br/>
                        <br/>
                        merci à Marilyne Delia TSENE , Victoria TANDAMBA, Clarence Noirot et Loane SENE
                        d'avoir mené ce projet durant 5 mois.
                        <br/>
                        <br/>
                        Ce projet expérimental est une maquette qui ne peut être commercialisée.
                        Celle-ci ne pourra
                        être partagée que dans le cadre de l'expérimentation
                        menée avec le public analphabète ou
                        illettré incarcéré.
                </div>

                
            </main>
            
        </div>
}

export default Credits;