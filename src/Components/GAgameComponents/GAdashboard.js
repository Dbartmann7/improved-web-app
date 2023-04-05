import { useEffect, useRef } from "react"
import Select from "react-select"
import { states } from "../../States"
import "../Dashboard.css"
const GAdashboard = (props) =>{
    const {setGameState, stateRef,
            popSize, updatePopSize,
            cRate, updateCRate,
            mRate, updateMRate,
            selAlgor, updateSelAlgor,
            moveInc, updateMoveInc,
            moveInt, updateMoveInt,
            maxMoves, updateMaxMoves,
            speedMult, updateSpeedMult} = props
    
    const popInputRef = useRef()
    const cRateInputRef = useRef()
    const mRateInputRef = useRef()
    const selAlgorInputRef = useRef()
    const moveIncInputRef = useRef()
    const moveIntInputRef = useRef()
    const maxMovesInputRef = useRef()
    const speedMultInputRef = useRef()
    

    const selAlgorOptions = [
        {value: "tour", label: "Tournament", isdisabled: false},
        {value: "roul", label: "Roulette", isdisabled: false},
        {value: "rank", label :"Rank", isdisabled: false}
    ]

    const speedMultOptions = [
        {value: "1", label: "1x", isdisabled: false},
        {value: "2", label: "2x", isdisabled: false},
        {value: "3", label: "3x", isdisabled: false},
        {value: "6", label: "6x", isdisabled: false},
    ]
    const sAlgorSelectedRef = useRef(selAlgorOptions[0])
    const speedMultSelectedRef = useRef(speedMultOptions[0])

    useEffect(() =>{
        if(stateRef.current === states.starting || stateRef.current === states.running){
            popInputRef.current.disabled = true
            cRateInputRef.current.disabled = true
            mRateInputRef.current.disabled = true
            for(let i=0; i<selAlgorOptions.length; i++){
                selAlgorOptions[i].isdisabled = true
            }
            for(let i=0; i<speedMultOptions.length; i++){
                speedMultOptions[i].isdisabled = true
            }
            moveIncInputRef.current.disabled = true
            moveIntInputRef.current.disabled = true
            maxMovesInputRef.current.disabled = true
        }else{
            popInputRef.current.disabled = false
            cRateInputRef.current.disabled = false
            mRateInputRef.current.disabled = false
            for(let i=0; i<selAlgorOptions.length; i++){
                selAlgorOptions[i].isdisabled = false
            }
            for(let i=0; i<speedMultOptions.length; i++){
                speedMultOptions[i].isdisabled = false
            }
            moveIncInputRef.current.disabled = false
            moveIntInputRef.current.disabled = false
            maxMovesInputRef.current.disabled = false
            speedMultInputRef.current.disabled = false
        }
    }, [stateRef.current])

    return(
        <div className="DashboardContainer">
            <div className="inputGrid">
                <div className="inputRow">
                    <div className="inputGridItem">
                        <button className="startBtn" onClick={ () =>{setGameState(states.starting)}}>
                            <h1>Start Game</h1>
                        </button>
                    </div>
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
                            onChange={e =>{updateCRate(e.target.value)}}
                            ref={cRateInputRef}
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Mutation Rate</h2>
                        <input
                            className="inputBox"
                            type="text"
                            value={mRate}
                            onChange={e =>{updateMRate(e.target.value)}}
                            ref={mRateInputRef}
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle" style={{fontSize: 1.3+"em"}}>Selection Algorithm</h2>
                        <Select
                            //className="inputBox"
                            defaultValue={sAlgorSelectedRef.current}
                            //style={{width: 10+"em"}}
                            onChange={e =>{updateSelAlgor(e.value)}}
                            options={selAlgorOptions}
                            isOptionDisabled={(option) => option.isdisabled}
                            ref={selAlgorInputRef}
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Move Increment</h2>
                        <input
                            className="inputBox"
                            type="text"
                            value={moveInc}
                            onChange={e =>{updateMoveInc(e.target.value)}}
                            ref={moveIncInputRef}
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Move Interval</h2>
                        <input
                            className="inputBox"
                            type="text"
                            value={moveInt}
                            onChange={e =>{updateMoveInt(e.target.value)}}
                            ref={moveIntInputRef}
                        />
                    </div>
                </div>
                <div className="inputRow">
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Max Moves</h2>
                        <input
                            className="inputBox"
                            type="text"
                            value={maxMoves}
                            onChange={e =>{updateMaxMoves(e.target.value)}}
                            ref={maxMovesInputRef}
                        />
                    </div>
                    <div className="inputGridItem">
                        <h2 className="inputTitle">Speed Multiplier</h2>
                        <Select
                            //className="inputBox"
                            defaultValue={speedMultSelectedRef.current}
                            //style={{width: 10+"em"}}
                            onChange={e =>{updateSpeedMult(e.value)}}
                            options={speedMultOptions}
                            isOptionDisabled={(option) => option.isdisabled}
                            ref={speedMultInputRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GAdashboard