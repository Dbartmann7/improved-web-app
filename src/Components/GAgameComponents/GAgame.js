import "../../App.css"
import React, { useRef, useEffect } from "react"
import Data from "./Data"

import { states } from "../../States"
import { Game } from "./game"
import GAdashboard from "./GAdashboard"
import { GeneticAlgorithm } from "./GeneticAlgorithm"

const GAgame = (props) =>{
    const {canvasData} = Data 
    const {stateRef, setGameState} = props
    const canvasRef = useRef()
    const contextRef = useRef()
    const animationRef = useRef()
    const gameRef = useRef()
    const GAref = useRef()

    useEffect(() =>{
        function initialise(){
            contextRef.current = canvasRef.current.getContext("2d")
            gameRef.current = new Game(canvasData.w, canvasData.h, 100, 5, 5, 100)
            gameRef.current.initialise()
        }
        const run = () =>{
           
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
                    break
                default:
                    console.log("states are broken")
                    break
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
        <div className="CanvasContainer">
            <canvas id="GameCanvas"
                width={canvasData.w}
                height={canvasData.h}
                ref={canvasRef}
            />
        </div>
            <GAdashboard
                setGameState={setGameState}
                stateRef={stateRef}
            />
        </>
    )
}

export default GAgame