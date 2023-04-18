import { Route, Routes } from 'react-router-dom';
import GAgame from './Components/GAgameComponents/GAgame';
import NEATgame from './Components/NEATgameComponents/NEATgame'
import './App.css';
import NavBar from './Components/NavBar';
import { useState, useRef, useEffect } from 'react';
import {states} from './States.js';
import InfoPopup from './Components/GAgameComponents/Info';

function App() {

  const [infoShown, setInfoShown] = useState(false)

  const [gameState, setGameState] = useState(states.paused)
  const stateRef = useRef(gameState)

  //GA data
  const [gaPopSize, setGAPopSize] = useState(200)
  const gaPopSizeRef = useRef(gaPopSize)

  const [gaCRate, setGACRate] = useState(0.9)
  const gaCRateRef = useRef(gaCRate)

  const [gaMRate, setGAMRate] = useState(0.1)
  const gaMRateRef = useRef(gaMRate)

  const [gaSelAlgor, setGASelAlgor] = useState("tour")
  const gaSelAlgorRef = useRef(gaSelAlgor)

  const [crossoverType, setCrossoverType] = useState("single")
  const crossoverTypeRef = useRef(crossoverType)

  const [gaTourSize, setGATourSize] = useState(2)
  const gaTourSizeRef = useRef(gaTourSize)

  const [moveInc, setMoveInc] = useState(5)
  const moveIncRef = useRef(moveInc)

  const [moveInt, setMoveInt] = useState(10)
  const moveIntRef = useRef(moveInt)

  const [maxMoves, setMaxMoves] = useState(100)
  const maxMovesRef = useRef(maxMoves)

  const [gaSpeedMult, setGASpeedMult] = useState(1)
  const gaSpeedMultRef = useRef(gaSpeedMult)

  const [winGens, setWinGens] = useState(0)
  const [winMoves, setWinMoves] = useState(0)
  const [curGen, setCurGen] = useState(0)
  const [curMoves, setCurMoves] = useState(0)
  //Neat data
  const [curBest, setCurBest] = useState()
  const [overallBest, setOverallBest] = useState()

  const [neatPopSize, setNeatPopSize] = useState(20)
  const neatPopRef = useRef(neatPopSize)

  const [neatCRate, setNeatCRate] = useState(0.9)
  const neatCRateRef = useRef(neatCRate)

  useEffect(() =>{
    console.log(winGens)
  }, [winGens])

  // *********************************** USE EFFECTS AND FUNCTIONS ***********************************\\
  useEffect(() =>{
    stateRef.current = gameState
    console.log("state: " + stateRef.current)
  }, [gameState])


  // GA
  useEffect(() => {
    gaPopSizeRef.current = gaPopSize
    console.log("GA Pop Size: " + gaPopSizeRef.current)
  }, [gaPopSize])

  function updateGAPopSize(popSize){
    setGAPopSize(popSize)
  }


  useEffect(() => {
    gaCRateRef.current = gaCRate
    console.log("GA CRate: " + gaCRateRef.current)
  }, [gaCRate])

  function updateGACRate(cRate){
    setGACRate(cRate)
  }


  useEffect(() => {
    gaMRateRef.current = gaMRate
    console.log("GA MRate: " + gaMRateRef.current)
  }, [gaMRate])

  function updateGAMRate(mRate){
    setGAMRate(mRate)
  }


  useEffect(() =>{
    gaSelAlgorRef.current = gaSelAlgor
    console.log(gaSelAlgorRef.current)
  }, [gaSelAlgor])

  function updateSelAlgor(selAlgor){
    setGASelAlgor(selAlgor)
  }

  useEffect(() =>{
    crossoverTypeRef.current = crossoverType
    console.log("crossover type: " + crossoverTypeRef.current)
  }, [crossoverType])

  function updateCrossoverType(newCrossoverType){
    setCrossoverType(newCrossoverType)
  }

  useEffect(() =>{
    gaTourSizeRef.current = gaTourSize
    console.log("GA Tour Size: " + gaTourSizeRef.current)
  })

  function updateGATourSize(tourSize){
    setGATourSize(tourSize)
  }

  useEffect(() =>{
    moveIncRef.current = moveInc
    console.log("Move increment: " + moveIncRef.current)
  }, [moveInc])

  function updateMoveInc(newMoveInc){
    setMoveInc(parseInt(newMoveInc))
  }


  useEffect(() =>{
    moveIntRef.current = moveInt
    console.log("Move Interval: " + moveIntRef.current)
  }, [moveInt])

  function updateMoveInt(newMoveInt){
    setMoveInt(newMoveInt)
  }

  useEffect(() =>{
    maxMovesRef.current = maxMoves
    console.log("Max Moves: " + maxMovesRef.current)
  }, [maxMoves])

  function updateMaxMoves(newMax){
    setMaxMoves(newMax)
  }

  useEffect(() => {
    gaSpeedMultRef.current = gaSpeedMult
  }, [gaSpeedMult])

  function updateSpeedMult(mult){
    setGASpeedMult(mult)
  }
  // NEAT
  useEffect(() =>{
    neatPopRef.current = neatPopSize
    console.log("Neat Pop Size: " + neatPopRef.current)
  }, [neatPopSize])

  function updateNeatPopSize(popSize){
    setNeatPopSize(popSize)
  }

  useEffect(() =>{
    neatCRateRef.current = neatCRate
    console.log("Neat CRate: " + neatCRateRef.current)
  }, [neatCRate])

  
  
  function updateNeatCRate(cRate){
    setNeatCRate(cRate)
  }

  return (
    <>
    <NavBar setGameState={setGameState}/>
    <Routes>
      <Route path="/" element={
        <InfoPopup 
        />
      }/>
      <Route path="/GAgame" element={<GAgame

        infoShown={infoShown}
        setInfoShown={setInfoShown}
        
        stateRef={stateRef}
        setGameState={setGameState}
        
        popSize={gaPopSize}
        popRef={gaPopSizeRef}
        updatePopSize={updateGAPopSize}

        cRate={gaCRate}
        cRateRef={gaCRateRef}
        updateCRate={updateGACRate}

        mRate={gaMRate}
        mRateRef={gaMRateRef}
        updateMRate={updateGAMRate}

        selAlgor={gaSelAlgor}
        selAlgorRef={gaSelAlgorRef}
        updateSelAlgor={updateSelAlgor}

        crossoverType={crossoverType}
        crossoverTypeRef={crossoverTypeRef}
        updateCrossoverType={updateCrossoverType}

        tourSize={gaTourSize}
        tourSizeRef={gaTourSizeRef}
        updateTourSize={updateGATourSize}

        moveInc={moveInc}
        moveIncRef={moveIncRef}
        updateMoveInc={updateMoveInc}

        moveInt={moveInt}
        moveIntRef={moveIntRef}
        updateMoveInt={updateMoveInt}

        maxMoves={maxMoves}
        maxMovesRef={maxMovesRef}
        updateMaxMoves={updateMaxMoves}

        speedMult={gaSpeedMult}
        speedMultRef={gaSpeedMultRef}
        updateSpeedMult={updateSpeedMult}

        winGens={winGens}
        setWinGens={setWinGens}
        winMoves={winMoves}
        setWinMoves={setWinMoves}

        curGen={curGen}
        setCurGen={setCurGen}
        curMoves={curMoves}
        setCurMoves={setCurMoves}
        
      />}/>
      <Route path="/NEATgame" element={<NEATgame
        stateRef={stateRef}
        setGameState={setGameState}
        
        curBest={curBest}
        setCurBest={setCurBest}
        overallBest={overallBest}
        setOverallBest={setOverallBest}

        updatePopSize={updateNeatPopSize}
        popSize={neatPopSize}
        popRef={neatPopRef}

        updateCRate={updateNeatCRate}
        cRate={neatCRate}
        cRateRef={neatCRateRef}

      />}/>
    </Routes>
    </>
  );
}

export default App;
