import "../../App.css"
import React, { useRef, useState, useEffect } from "react"
import {Data} from "./Data"

import { states } from "../../States"
import { Game } from "./game"
import GAdashboard from "./GAdashboard"

const GAgame = (props) =>{
    const {canvasData} = Data 
    const {stateRef, setGameState} = props

      //GA data
  const [popSize, setPopSize] = useState(200)
  const popSizeRef = useRef(popSize)

  const [cRate, setCRate] = useState(0.9)
  const cRateRef = useRef(cRate)

  const [mRate, setMRate] = useState(0.1)
  const mRateRef = useRef(mRate)

  const [selAlgor, setSelAlgor] = useState("tour")
  const selAlgorRef = useRef(selAlgor)

  const [crossoverType, setCrossoverType] = useState("single")
  const crossoverTypeRef = useRef(crossoverType)

  const [tourSize, setTourSize] = useState(2)
  const tourSizeRef = useRef(tourSize)

  const [moveInc, setMoveInc] = useState(5)
  const moveIncRef = useRef(moveInc)

  const [moveInt, setMoveInt] = useState(10)
  const moveIntRef = useRef(moveInt)

  const [maxMoves, setMaxMoves] = useState(100)
  const maxMovesRef = useRef(maxMoves)

  const [speedMult, setSpeedMult] = useState(1)
  const speedMultRef = useRef(speedMult)

  const [winGens, setWinGens] = useState(0)
  const [winMoves, setWinMoves] = useState(0)
  const [curGen, setCurGen] = useState(0)
  const [curMoves, setCurMoves] = useState(0)
    const canvasRef = useRef()
    const contextRef = useRef()
    const animationRef = useRef()
    const gameRef = useRef()

    const startTimeRef = useRef(0)
    const timerRef = useRef(1000/60)


  useEffect(() => {
    popSizeRef.current = popSize
    console.log("GA Pop Size: " + popSizeRef.current)
  }, [popSize])

  useEffect(() => {
    cRateRef.current = cRate
    console.log("GA CRate: " + cRateRef.current)
  }, [cRate])

  useEffect(() => {
    mRateRef.current = mRate
    console.log("GA MRate: " + mRateRef.current)
  }, [mRate])

  useEffect(() =>{
    selAlgorRef.current = selAlgor
    console.log(selAlgorRef.current)
  }, [selAlgor])

  useEffect(() =>{
    crossoverTypeRef.current = crossoverType
    console.log("crossover type: " + crossoverTypeRef.current)
  }, [crossoverType])

  useEffect(() =>{
    tourSizeRef.current = tourSize
    console.log("GA Tour Size: " + tourSizeRef.current)
  })

  useEffect(() =>{
    moveIncRef.current = moveInc
    console.log("Move increment: " + moveIncRef.current)
  }, [moveInc])

  useEffect(() =>{
    moveIntRef.current = moveInt
    console.log("Move Interval: " + moveIntRef.current)
  }, [moveInt])

  useEffect(() =>{
    maxMovesRef.current = maxMoves
    console.log("Max Moves: " + maxMovesRef.current)
  }, [maxMoves])

  useEffect(() => {
    speedMultRef.current = speedMult
  }, [speedMult])


    useEffect(() =>{
        function initialise(){
            const GAinfo = {
                crossoverRate:cRateRef.current,
                mutationRate:mRateRef.current,
                selectAlgor:selAlgorRef.current,
                crossoverType:crossoverTypeRef.current,
                tourSize:tourSizeRef.current
            }
            contextRef.current = canvasRef.current.getContext("2d")
            gameRef.current = new Game(canvasData.w, canvasData.h, popSizeRef.current, moveIncRef.current, moveIntRef.current, maxMovesRef.current, speedMultRef.current, GAinfo)
            gameRef.current.initialise()
        }
        
        const run = () =>{
        if(Date.now() - startTimeRef.current > timerRef.current){

            startTimeRef.current = Date.now()
            switch(stateRef.current){
                case states.paused:
                    break
                case states.starting:
                    console.log("starting...")
                    
                    initialise()
                    setGameState(states.running)
                  
                    
                    break
                case states.running:
                    contextRef.current.clearRect(0,0, canvasData.w, canvasData.h)
                    gameRef.current.run(contextRef.current)
  
                    setWinGens(gameRef.current.winGen)
                    setWinMoves(gameRef.current.winMoves)
                    setCurGen(gameRef.current.gen+1)
                    setCurMoves(Number(gameRef.current.numMoves))

                    break
                default:
                    console.log("states are broken")
                    break
            }
        }

            animationRef.current = requestAnimationFrame(run)
        }
        animationRef.current = requestAnimationFrame(run)

        return() =>{
            cancelAnimationFrame(animationRef.current)
            setGameState(states.paused)
        }
    },[])

    return(
        <>
        <div className="GACanvasContainer">
            <canvas id="GameCanvas"
                width={canvasData.w}
                height={canvasData.h}
                ref={canvasRef}
            />
        </div>
 
            <GAdashboard
                setGameState={setGameState}
                
                popSize={popSize}
                setPopSize={setPopSize}

                cRate={cRate}
                setCRate={setCRate}

                mRate={mRate}
                setMRate={setMRate}

                setSelAlgor={setSelAlgor}
                setCrossoverType={setCrossoverType}

                tourSize={tourSize}
                setTourSize={setTourSize}

                moveInc={moveInc}
                setMoveInc={setMoveInc}

                moveInt={moveInt}
                setMoveInt={setMoveInt}

                maxMoves={maxMoves}
                setMaxMoves={setMaxMoves}
      
                setSpeedMult={setSpeedMult}

                winGen={winGens}
                winMove={winMoves}

                curGen={curGen}
                curMoves={curMoves}
            />
        </>
    )
}

export default GAgame