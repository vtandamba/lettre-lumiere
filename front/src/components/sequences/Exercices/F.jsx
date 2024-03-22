import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';


const ItemTypes = {
  LETTER: 'letter',
};

const DraggableLetter = ({ letter }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.LETTER,
    item: { letter }, // Assure-toi de passer la lettre ici
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, fontWeight: 'bold', cursor: 'move' }}>
      {letter}
    </div>
  );
};


const WordScramble = ({ word }) => {
  const [letters, setLetters] = useState(word.split(''));
  const [showWord, setShowWord] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWord(false);
      // Prononcer le mot ici
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    }, 2000);
    return () => clearTimeout(timer);
  }, [word]);

  const moveLetter = (dragIndex, hoverIndex) => {
    const dragLetter = letters[dragIndex];
    setLetters(update(letters, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragLetter],
      ],
    }));
  };

 // Importe ou définis ItemTypes ailleurs

const DroppableArea = () => {
  // Cet état gardera une trace des lettres déposées
  const [droppedLetters, setDroppedLetters] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.LETTER,
    drop: (item, monitor) => {
      // Ajouter la lettre déposée à l'état droppedLetters
      setDroppedLetters(oldDroppedLetters => [...oldDroppedLetters, item.letter]);
    },
  }));

  return (
    <div ref={drop} style={{ height: '12rem', width: '12rem', border: '1px dashed gray', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      Déposez l'élément ici
      <div>
        {droppedLetters.map((letter, index) => (
          <span key={index} style={{ padding: '0 4px', fontSize: '20px' }}>{letter}</span>
        ))}
      </div>
    </div>
  );
};


  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ marginBottom: '20px', minHeight: '30px' }}>
        {showWord && <span style={{ fontSize: '24px' }}>{word}</span>}
      </div>
      <div>
        {letters.map((letter, i) => (
          <DraggableLetter key={letter + i} id={letter + i} letter={letter} index={i} moveLetter={moveLetter} />
        ))}
      </div>
    </DndProvider>
  );
};

const App = () => {
  return <WordScramble word="exemple" />;
};

export default App;
