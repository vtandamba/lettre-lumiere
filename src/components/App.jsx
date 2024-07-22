// src/App.js
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Index from "../pages/Index";
import Etapes from "../pages/Etapes";
import AlphabetHome from "../pages/AlphabetHome";
import LayoutExercice from './sequences/Exercices/Layout';
import GraphemesHome from "../pages/GraphemesHome";
import Error from '../pages/Error404';
import SequenceHome from "../pages/SequenceHome";
import A from '../components/Exercises/A';
import B from '../components/Exercises/B';
import C from '../components/Exercises/C';
import D from '../components/Exercises/D';
import E from '../components/Exercises/E';
import H from '../components/Exercises/H';
import G from '../components/Exercises/G';
import LayoutAlphabet from '../pages/ExoGraphoAlphabetique';
import Etape from "./Etape";
import Credits from "../pages/Credits";
import SpringModal from "./Modal";
import { UserProvider } from '../contexts/UserContext';
import { DbProvider } from '../contexts/DbContext';
import Test from "../pages/Test";

const App = () => {
  const [scores, setScores] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [openModal, setOpenModal] = useState();

  const handleForceUpdate = () => {
    setForceUpdate(prevState => prevState + 1);
  };

  const savingScoreOffline = (scoreBySequence) => {
    let updatedScores = [...scores];
    let scoreUpdated = false;
    
    updatedScores = updatedScores.map(score => {
      if (score.idSeq === scoreBySequence.idSeq) {
        score.tabScores = scoreBySequence.tabScores;
        scoreUpdated = true;
      }
      return score;
    });

    if (!scoreUpdated) {
      updatedScores.push(scoreBySequence);
    }

    setScores(updatedScores);
  };

  return (
    <UserProvider>
      <DbProvider>
        <HashRouter>
          <Routes>
            <Route path="/credits" element={<Credits />} />
            <Route path="etape/:etape/revisions" element={<LayoutExercice />} />
            <Route index element={<Home forceUpdate={handleForceUpdate} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Index />} />
            <Route path="/etapes" element={<Etapes />} />
            <Route path="/etape/:etape" element={<Etape />} />
            <Route path="*" element={<Error />} />
            <Route path="/etapes/:sequence" element={<SequenceHome allScoreByExercises={scores} />} />
            <Route path="/etapes/:sequence/exo" element={<LayoutExercice savingScore={savingScoreOffline} />} />
            <Route path="/alphabet" element={<AlphabetHome />} />
            <Route path="/graphemes" element={<GraphemesHome />} />
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
          <SpringModal openModal={openModal} setOpenModal={setOpenModal} />
        </HashRouter>
      </DbProvider>
    </UserProvider>
  );
};

export default App;
