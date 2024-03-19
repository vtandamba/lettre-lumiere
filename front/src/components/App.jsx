import React, { useEffect } from "react";
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

// useEffect(()=> {

// }, [])

const allSequences = fetchAllSequences();
console.log(allSequences);
const allExerciceForSequences = fetchAllExerciceForSequences(1);
console.log("by seq_id ===> ", allExerciceForSequences);
const allStages = fetchAllStages();
console.log(allStages);


const allSeqBystageId = fetchSeqByStageId(4);
console.log('by id  ===>  ', allSeqBystageId);


const App = () => {
    return <HashRouter>
        <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/login" index element={<Login />}></Route>
            <Route path="/home" element={<Index />}></Route>
            <Route path="/etapes" element={<Etapes />}>
            </Route>

            <Route path="/etapes/:sequence" element={<SequenceHome />}>

            </Route>
            <Route path="/etapes/:sequence/exo" element={<LayoutExercice />}> </Route>
            <Route path="/alphabet" element={<AlphabetHome />}>

            </Route>

            <Route path="/graphemes" element={<GraphemesHome />} >
            </Route>

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