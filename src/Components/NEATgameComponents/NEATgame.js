import React, { useEffect , useRef, useState} from "react"
import Data from "./Data"
import "../../App.css"
import NEATdashboard from "./game/NEATdashboard"
import { states } from "../../States"
import { Game } from "./game/game"


const NEATgame = (props) =>{
    let {canvasData} = Data
    let {stateRef, setGameState} = props
    let animationRef = useRef()
    let canvasRef = useRef()
    let contextRef = useRef()
    let gameRef = useRef(null)

    const [curBest, setCurBest] = useState()
    const [overallBest, setOverallBest] = useState()

    const [curGen, setCurGen] = useState()
  
    const [popSize, setPopSize] = useState(20)
    const popRef = useRef(popSize)

    let curBestRef = useRef()
    let overallBestRef = useRef()
    


    useEffect(() =>{
        popRef.current = popSize
        console.log("Neat Pop Size: " + popRef.current)
      }, [popSize])


    useEffect(() =>{
        function changeBest(best, reset=false){
            curBestRef.current = best
            setCurBest(best)
            if(curBestRef.current> overallBestRef.current && !reset){
                overallBestRef.current = curBestRef.current
                setOverallBest(curBestRef.current)
            }
            if(reset){
                setOverallBest(0)
            }
        }
        function initialise(){
            gameRef.current = new Game(canvasData.w, canvasData.height, popRef.current)
            gameRef.current.initialise()
            contextRef.current = canvasRef.current.getContext("2d")
            setCurBest(0)
            curBestRef.current = 0
            overallBestRef.current = 0
            setOverallBest(0)
        }
        const run = () =>{
            switch(stateRef.current){
                case states.paused:
                    //code
                    break
                case states.starting:
                    console.log("starting game...")
                    initialise()
                    setGameState(states.running)
                    break
                case states.running:
                    contextRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height)
                    gameRef.current.run(contextRef.current)
                    changeBest(gameRef.current.getBestScore())
                    setCurGen(gameRef.current.currentGeneration)
                    break
                default:
                    console.log("states are broken")
                    break
            }
            animationRef.current = requestAnimationFrame(run)
        }
        animationRef.current = requestAnimationFrame(run)
        //cleanup
        return() =>{
            cancelAnimationFrame(animationRef.current)
            gameRef.current = null
            setGameState(states.paused)
            changeBest(0, true)
        }
    },[])

    return(
        <div className="gameContainer">
            <div className="NeatCanvasContainer">
                <canvas id="GameCanvas"
                    width={canvasData.w}
                    height= {canvasData.h}
                    ref={canvasRef}
                />
            </div>
            <NEATdashboard
                stateRef={stateRef}
                setGameState={setGameState}
                
                curBest={curBest}
                overallBest={overallBest}

                curGen={curGen}
                setPopSize={setPopSize}
                popSize={popSize}

            />
        </div>
    )
}

export default NEATgame