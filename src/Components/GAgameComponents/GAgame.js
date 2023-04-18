import "../../App.css"
import React, { useRef, useEffect } from "react"
import {Data} from "./Data"

import { states } from "../../States"
import { Game } from "./game"
import GAdashboard from "./GAdashboard"

const GAgame = (props) =>{
    const {canvasData} = Data 
    const {infoShown, setInfoShown, stateRef, setGameState,
            updatePopSize, popSize, popRef,
            updateCRate, cRate, cRateRef,
            updateMRate, mRate, mRateRef,
            updateSelAlgor, selAlgor, selAlgorRef,
            updateCrossoverType, crossoverType, crossoverTypeRef, 
            updateTourSize, tourSize, tourSizeRef,
            updateMoveInc, moveInc, moveIncRef,
            updateMoveInt, moveInt, moveIntRef,
            updateMaxMoves, maxMoves, maxMovesRef,
            updateSpeedMult, speedMult, speedMultRef,
            winGens, setWinGens, winMoves, setWinMoves,
            curGen, setCurGen, curMoves, setCurMoves} = props
    const canvasRef = useRef()
    const contextRef = useRef()
    const animationRef = useRef()
    const gameRef = useRef()

    const startTimeRef = useRef(0)
    const timerRef = useRef(1000/60)

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
            gameRef.current = new Game(canvasData.w, canvasData.h, popRef.current, moveIncRef.current, moveIntRef.current, maxMovesRef.current, speedMultRef.current, GAinfo)
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
                infoShown={infoShown}
                setInfoShown={setInfoShown}

                setGameState={setGameState}
                stateRef={stateRef}

                popSize={popSize}
                updatePopSize={updatePopSize}

                cRate={cRate}
                updateCRate={updateCRate}

                mRate={mRate}
                updateMRate={updateMRate}

                selAlgor={selAlgor}
                updateSelAlgor={updateSelAlgor}

                crossoverType={crossoverType}
                updateCrossoverType={updateCrossoverType}

                tourSize={tourSize}
                updateTourSize={updateTourSize}

                moveInc={moveInc}
                updateMoveInc={updateMoveInc}

                moveInt={moveInt}
                updateMoveInt={updateMoveInt}

                maxMoves={maxMoves}
                updateMaxMoves={updateMaxMoves}
                
                speedMult={speedMult}
                updateSpeedMult={updateSpeedMult}

                winGen={winGens}
                winMove={winMoves}

                curGen={curGen}
                curMoves={curMoves}
            />
        </>
    )
}

export default GAgame