import { Route, Routes } from 'react-router-dom';
import GAgame from './Components/GAgameComponents/GAgame';
import NEATgame from './Components/NEATgameComponents/NEATgame'
import './App.css';
import NavBar from './Components/NavBar';
import { useState, useRef, useEffect } from 'react';
import {states} from './States.js';

function App() {
  const [gameState, setGameState] = useState(states.paused)
  const stateRef = useRef(gameState)

  const [curBest, setCurBest] = useState()
  const [overallBest, setOverallBest] = useState()

  const [neatPopSize, setNeatPopSize] = useState(20)
  const neatPopRef = useRef(neatPopSize)

  useEffect(() =>{
    stateRef.current = gameState
  }, [gameState])

  useEffect(() =>{
    neatPopRef.current = neatPopSize
    console.log(neatPopSize)
  }, [neatPopSize])

  function updateNeatPopSize(popSize){
    setNeatPopSize(popSize)
  }

  return (
    <>
    <NavBar setGameState={setGameState}/>
    <Routes>
      <Route path="/GAgame" element={<GAgame
        stateRef={stateRef}
        setGameState={setGameState}
        curBest={curBest}
        setCurBest={setCurBest}
        overallBest={overallBest}
        setOverallBest={setOverallBest}
        
      />}/>
      <Route path="/NEATgame" element={<NEATgame
        stateRef={stateRef}
        setGameState={setGameState}
        curBest={curBest}
        setCurBest={setCurBest}
        overallBest={overallBest}
        setOverallBest={setOverallBest}

        updatePopSize={updateNeatPopSize}
        neatPopSize={neatPopSize}
        neatPopRef={neatPopRef}

      />}/>
    </Routes>
    </>
  );
}

export default App;
