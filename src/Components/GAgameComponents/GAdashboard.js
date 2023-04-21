import { useEffect, useRef } from "react"
import Select from "react-select"
import { states } from "../../States"
import "../Dashboard.css"
import InfoPopup from "./Info"
const GAdashboard = (props) =>{
    const {setGameState,
            popSize, setPopSize,
            cRate, setCRate,
            mRate, setMRate,
            setSelAlgor,
            setCrossoverType,
            tourSize, setTourSize,
            moveInc, setMoveInc,
            moveInt, setMoveInt,
            maxMoves, setMaxMoves,
            setSpeedMult,
            winGen, winMove, curGen, curMoves} = props
    
  
    const selAlgorOptions = [
        {value: "tour", label: "Tournament", isdisabled: false},
        {value: "roul", label: "Roulette", isdisabled: false},
        {value: "rank", label :"Rank", isdisabled: false}
    ]

    const crossoverTypeOptions = [
        {value: "single", label: "Single-Point", isdisabled: false},
        {value: "double", label: "Double-Point", isdisabled: false},
    ]

    const speedMultOptions = [
        {value: "1", label: "1x", isdisabled: false},
        {value: "2", label: "2x", isdisabled: false},
        {value: "3", label: "3x", isdisabled: false},
        {value: "6", label: "6x", isdisabled: false},
    ]

    const validation = {
        popSize: ["0","1","2","3","4","5","6","7","8","9"],
        crossoverRate: ["0","1","2","3","4","5","6","7","8","9", "."],
        mutationRate: ["0","1","2","3","4","5","6","7","8","9", "."],
        tournamentSize: ["0","1","2","3","4","5","6","7","8","9"],
        incrementSize: ["0","1","2","3","4","5","6","7","8","9"],
        intervalSize:["0","1","2","3","4","5","6","7","8","9"],
        maxMovesSize: ["0","1","2","3","4","5","6","7","8","9"]

    }
    const sAlgorSelectedRef = useRef(selAlgorOptions[0])
    const speedMultSelectedRef = useRef(speedMultOptions[0])
    const crossoverTypeSelectedRef = useRef(crossoverTypeOptions[0])

  
    function startGame(){
        if(!checkValid(popSize, validation.popSize, 2, 10000)){
            alert("Please enter a valid Population Size")
            return
        }
        if(!checkValid(cRate, validation.crossoverRate, 0, 1)){
            alert("Please enter a valid Crossover Rate")
            return
        }
        if(!checkValid(mRate, validation.mutationRate, 0, 1)){
            alert("Please enter a valid Mutation Rate")
            return
        }
        if(!checkValid(tourSize, validation.tournamentSize, 1, popSize)){
            alert("Please enter a valid Tournament Size")
            return
        }
        if(!checkValid(moveInc, validation.incrementSize, 1, 100000)){
            alert("Please enter a valid Move Increment")
            return
        }
        if(!checkValid(moveInt, validation.intervalSize, 1, 100000)){
            alert("Please enter a valid Move Interval")
            return
        }
        if(!checkValid(maxMoves, validation.maxMovesSize, 1, 100000)){
            alert("Please enter a valid Maximum amount of moves")
            return
        }
        
        setGameState(states.starting)
    }

    function checkValid(target, validChars, min, max){
        if(target<min || target >max){
            return false
        }else{
            target.toString().split("").forEach(char=> {
                console.log(validChars.includes(char))
                if(!validChars.includes(char)){
                    return false
                }
            });
        }
        return true
    }

    return(
        <>
        <div className="DashboardContainer">
            <div className="inputGrid">
                <div className="inputRow">
                    <div className="inputGridItem">
                        <button className="startBtn" onClick={ () =>{startGame()}}>
                            <h1>Start New Game</h1>
                        </button>
                        
                    </div>
                    <div className="inputGridItem">
                        <h3>
                            Current Gen: {curGen}<br/>
                            Current Moves: {curMoves}<br/>
                            Won in {winGen} Generations<br/>
                            Won in {winMove} Moves
                        </h3>
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">PopSize</h2>
                        <input
                            className="inputBox"
                            type="number"
                            min={2}
                            value={popSize}
                            onChange={e =>{setPopSize(e.target.value)}}
                            
                        />
                    </div>
                    <div className="inputGridItem">
                        <h3 className="inputTitle">Crossover Rate</h3>
                        <input
                            className="inputBox"
                            type="text"
                            value={cRate}
                            onChange={e =>{setCRate(e.target.value)}}
                           
                        />
                    </div>
                    <div className="inputGridItem">
                        <h3 className="inputTitle">Mutation Rate</h3>
                        <input
                            className="inputBox"
                            type="text"
                            value={mRate}
                            onChange={e =>{setMRate(e.target.value)}}
                            
                        />
                    </div>
                    <div className="inputGridItem">
                        <h3 className="inputTitle" style={{fontSize: 1.1+"em"}}>Selection Algorithm</h3>
                        <Select
                            //className="inputBox"
                            defaultValue={sAlgorSelectedRef.current}
                            //style={{width: 10+"em"}}
                            onChange={e =>{setSelAlgor(e.value)}}
                            options={selAlgorOptions}
                            isOptionDisabled={(option) => option.isdisabled}
                            
                        />
                    </div>
                    <div className="inputGridItem">
                        <h3 className="inputTitle" style={{fontSize: 1.1+"em"}}>Crossover Type</h3>
                        <Select
                            //className="inputBox"
                            defaultValue={crossoverTypeSelectedRef.current}
                            //style={{width: 10+"em"}}
                            onChange={e =>{setCrossoverType(e.value)}}
                            options={crossoverTypeOptions}
                            isOptionDisabled={(option) => option.isdisabled}
                            
                        />
                    </div>

                </div>
                <div className="inputRow">
                    <div className="inputGridItem">
                        <h3 className="inputTitle">Tournament Size</h3>
                        <input
                            className="inputBox"
                            type="text"
                            value={tourSize}
                            onChange={e =>{setTourSize(e.target.value)}}
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Move Increment</h2>
                        <input
                            className="inputBox"
                            type="text"
                            value={moveInc}
                            onChange={e =>{setMoveInc(e.target.value)}}
                            
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Move Interval</h2>
                        <input
                            className="inputBox"
                            type="text"
                            value={moveInt}
                            onChange={e =>{setMoveInt(e.target.value)}}
                          
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Max Moves</h2>
                        <input
                            className="inputBox"
                            type="text"
                            value={maxMoves}
                            onChange={e =>{setMaxMoves(e.target.value)}}
                           
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Speed Multiplier</h2>
                        <Select
                            defaultValue={speedMultSelectedRef.current}
                            onChange={e =>{setSpeedMult(e.value)}}
                            options={speedMultOptions}
                            isOptionDisabled={(option) => option.isdisabled}
                           
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default GAdashboard