import { Route, Routes } from 'react-router-dom';
import GAgame from './Components/GAgameComponents/GAgame';
import NEATgame from './Components/NEATgameComponents/NEATgame'
import './App.css';
import NavBar from './Components/NavBar';
import { useState, useRef, useEffect } from 'react';
import {states} from './States.js';
import InfoPopup from './Components/GAgameComponents/Info';

function App() {


  const [gameState, setGameState] = useState(states.paused)
  const stateRef = useRef(gameState)

  useEffect(() =>{
    stateRef.current = gameState
    console.log("state: " + stateRef.current)
  }, [gameState])

  return (
    <>
    <NavBar setGameState={setGameState}/>
    <Routes>
      <Route path="/" element={
        <InfoPopup 
        />
      }/>
      <Route path="/GAgame" element={<GAgame
        stateRef={stateRef}
        setGameState={setGameState}
      />}/>
      <Route path="/NEATgame" element={<NEATgame
        stateRef={stateRef}
        setGameState={setGameState}
      />}/>
    </Routes>
    </>
  );
}

export default App;
