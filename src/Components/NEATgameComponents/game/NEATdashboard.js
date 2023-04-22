import { useEffect, useRef } from "react"
import { states } from "../../../States"
import "../../Dashboard.css"
const NEATdashboard = (props) =>{
    const {setGameState, 
            curBest, overallBest, curGen,
            setPopSize, popSize} = props
    
    const popInputRef = useRef() 
   
    function StartGame(){
        let validChars = ["0","1","2","3","4","5","6","7","8","9"]

        if(popSize < 2 || popSize > 10000){
            alert("Please enter a valid Population Size")
            return
        }
        popSize.toString().split("").forEach(char =>{
            if(!validChars.includes(char)){
                alert("Please enter a valid Population Size")
                return
            }
        })

        setGameState(states.starting)
    }


    return(
        <div className="DashboardContainer">
            <div className="inputGrid">
                <div className="inputRow">
                    <div className="inputGridItem">
                        <h2>
                            Current Best: {curBest}<br/>
                            Overall Best: {overallBest}<br/>
                            Current Gen: {curGen}
                        </h2>
                    </div>
                    <div className="inputGridItem">
                        <button className="startBtn" onClick={ () =>{StartGame()}}>
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
                            onChange={e =>{setPopSize(e.target.value)}}
                            ref={popInputRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NEATdashboard