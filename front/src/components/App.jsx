import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Index from "../pages/Index";
import Etapes from "../pages/Etapes";
import AlphabetHome from "../pages/AlphabetHome";
import LayoutExercice from './sequences/Exercices/Layout'
import GraphemesHome from "../pages/GraphemesHome";
import { fetchAllExerciceForSequences } from "../hooks/useDb";
import { fetchAllSequences } from "../hooks/useDb";
import { fetchAllStages } from "../hooks/useDb";
import { fetchSeqByStageId } from "../hooks/useDb";

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


// const idUser = localStorage.getItem('user_id');
const allSequences = fetchAllSequences();
console.log(allSequences);
const allExerciceForSequences = fetchAllExerciceForSequences(1);
console.log("by seq_id ===> ", allExerciceForSequences);
const allStages = fetchAllStages();
console.log(allStages);

// console.log('the userId ========== >', idUser)
// const user = fecthUser(idUser);
// console.log('the user ========== >', user)
const allSeqBystageId = fetchSeqByStageId(4);
console.log('by id  ===>  ', allSeqBystageId);


const App = () => {
    return <HashRouter>
        <Routes>

            {/* Route pour la page d'acceuil */}
            <Route index element={<Home />}></Route>

            {/* Route pour le formulaire de connexion */}
            <Route path="/login" index element={<Login />}></Route>

            {/* Route pour le choix du mode */}
            <Route path="/home" element={<Index />}></Route>

            {/* Route pour l'affichage de toutes les étapes */}
            <Route path="/etapes" element={<Etapes />}>
            </Route>

            {/* Route pour l'affichage des éléments d'une étape */}

            <Route path="/etape/:etape" element={<Etape />}/>
            {/* Route pour la présentation d'une séquence */}
            <Route path="/etapes/:sequence" element={<SequenceHome />}>

            </Route>
            {/* Route pour les exercices de chaque séquence */}
            <Route path="/etapes/:sequence/exo" element={<LayoutExercice />}> </Route>

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
    </HashRouter>
}

export default App;