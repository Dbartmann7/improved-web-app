import { useEffect, useRef } from "react"
import { states } from "../../../States"
import "../../Dashboard.css"
const NEATdashboard = (props) =>{
    const {setGameState, stateRef, 
            curBest, overallBest,
            updatePopSize, popSize,
            updateCRate, cRate} = props
    
    const popInputRef = useRef() 
    const cRateInputRef= useRef()
    // useEffect(() =>{
    //     if(stateRef.current === states.starting || stateRef.current === states.running){
    //         popInputRef.current.disabled = true
    //         cRateInputRef.current.disabled = true
    //     }
    // }, [stateRef.current])
    return(
        <div className="DashboardContainer">
            <div className="inputGrid">
                <div className="inputRow">
                    <div className="inputGridItem">
                        <h2>
                            Current Best: {curBest}<br/>
                            Overall Best: {overallBest} 
                        </h2>
                    </div>
                    <div className="inputGridItem">
                        <button className="startBtn" onClick={ () =>{setGameState(states.starting)}}>
                            <h2>Start Game</h2>
                        </button>
                    </div>
                </div>
                <div className="inputRow">
                    <div className="inputGridItem">
                        <h2 className="inputTitle">PopSize</h2>
                        <input
                            className="inputBox"
                            type="text"
                            value={popSize}
                            onChange={e =>{updatePopSize(e.target.value)}}
                            ref={popInputRef}
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Crossover Rate</h2>
                        <input
                            className="inputBox"
                            type="text"
                            value={cRate}
                            onChange={e => {updateCRate(e.target.value)}}
                            ref={cRateInputRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NEATdashboard