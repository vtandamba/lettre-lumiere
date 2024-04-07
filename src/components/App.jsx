import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Index from "../pages/Index";
import Etapes from "../pages/Etapes";
import AlphabetHome from "../pages/AlphabetHome";
import LayoutExercice from './sequences/Exercices/Layout'
import GraphemesHome from "../pages/GraphemesHome";
import Error from '../pages/Error404'

import Auth from "../hooks/useAuth";
// import db from '../Dexie'

import SequenceHome from "../pages/SequenceHome";

// Nouveaux imports

import A from '../components/Exercises/A'
import B from '../components/Exercises/B'
import C from '../components/Exercises/C'
import D from '../components/Exercises/D'
import E from '../components/Exercises/E'
import H from '../components/Exercises/H'
import G from '../components/Exercises/G'
import LayoutAlphabet from '../pages/ExoGraphoAlphabetique'
import Etape from "./Etape";
import Credits from "../pages/Credits";
import SpringModal from "./Modal";
import { UserProvider } from '../contexts/UserContext'; // Update the import path accordingly






const App = () => {

    const [isAuthentificated, setIsAuthentificated] = useState();
    const [scores, setScores] = useState([]);

    const [mode, setMode] = useState();
    const [forceUpdate, setForceUpdate] = useState(0);
    const [openModal, setOpenModal] = useState();
    

    useEffect(() => {
        //useEffect est simplement utilisé pour déclencher la mise à jour
      }, [forceUpdate]);
    
      // Fonction pour forcer la mise à jour
      const handleForceUpdate = () => {
        console.log('Salut, je me déconnecte!');
        setForceUpdate(prevState => prevState + 1);
      
      };

    // console.log('=====> id-user', idUser)


    // Enregistrer les scores hors ligne
    const savingScoreOffline = (scoreBySequence) => {
        let updatedScores = [...scores]; // Copie du tableau existant
        let scoreUpdated = false; // Variable pour suivre si le score a été mis à jour
        
        // Vérifier si un score avec le même ID existe déjà dans le tableau
        updatedScores = updatedScores.map(score => {
            if (score.idSeq === scoreBySequence.idSeq) {
                score.tabScores = scoreBySequence.tabScores; // Mettre à jour le score existant
                scoreUpdated = true; // Marquer que le score a été mis à jour
            }
            return score;
        });
    
        // Si le score n'a pas été mis à jour, cela signifie qu'il n'existe pas encore dans le tableau
        if (!scoreUpdated) {
            updatedScores.push(scoreBySequence); // Ajouter le nouveau score
        }
    
        // Mettre à jour le tableau des scores
        setScores(updatedScores);
    
        console.log('tabScoreBySequence', updatedScores);
    };




    useEffect(() => {
        setIsAuthentificated (Auth.isAuthenticated());

        
     }, [])
    
    return <>
            <UserProvider >
                <HashRouter>
                    <Routes>

                        {/* Route pour les remerciements */}
                        <Route path="/credits" element={<Credits />} />

                        {/* Route pour le bilan d'une séquence */}
                        <Route path="etape/:etape/revisions" element={<LayoutExercice />}/>

                        {/* Route pour la page d'acceuil */}
                        <Route index element={<Home forceUpdate = {handleForceUpdate} />}></Route> 

                        {/* Route pour le formulaire de connexion */}
                        <Route path="/login" index element={<Login />}></Route>

                        {/* Route pour le choix du mode */}
                        <Route path="/home" element={<Index  />}></Route>

                        {/* Route pour l'affichage de toutes les étapes */}
                        <Route path="/etapes" element={<Etapes />}>
                        </Route>

                        {/* Route pour l'affichage des éléments d'une étape */}
                        <Route path="/etape/:etape" element={<Etape />}/>

                        {/* Route pour la page d'erreur 404 */}
                        <Route path="*" element={<Error />}/>

                        {/* Route pour la présentation d'une séquence */}
                        <Route path="/etapes/:sequence" element={<SequenceHome  allScoreByExercises={scores}/>}>

                        </Route>
                        {/* Route pour les exercices de chaque séquence */}
                        <Route path="/etapes/:sequence/exo" element={<LayoutExercice  savingScore={savingScoreOffline}/>}> </Route>

                        {/* Route pour la présentation de l'alphabet */}
                        <Route path="/alphabet" element={<AlphabetHome />}>

                        </Route>

                        {/* Route pour la préentation des graphèmes */}
                        <Route path="/graphemes" element={<GraphemesHome />} >
                        </Route>

                        {/* Routes pour les exercices de l'alphabet et des graphèmes */}
                        <Route path=":categorie/exercices" element={<LayoutAlphabet />}>
                            <Route path="a1" element={<A />} />
                            <Route path="b1" element={<B />} />
                            <Route path="c1" element={<C />} />
                            <Route path="d1" element={<D />} />
                            <Route path="e1" element={<E />} />
                            <Route path="h1" element={<H />} />
                            <Route path="g1" element={<G />} />
                        </Route>
                    

                    </Routes>
                    <SpringModal isOpen={openModal} setOpen={setOpenModal} mode='warningReload'>
                    
                    </SpringModal>
        
                </HashRouter>
            </UserProvider>
        </>
    // LayoutExercice, SequenceHome et Index ont bsoin du user
}

export default App;