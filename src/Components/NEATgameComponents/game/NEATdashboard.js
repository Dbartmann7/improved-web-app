import { states } from "../../../States"

const NEATdashboard = (props) =>{
    const {setGameState, updatePopSize, neatPopSize} = props
    
    return(
        <div className="DashboardContainer">
            <button onClick={ () =>{setGameState(states.starting)}}>
                Start Game
            </button>
            <div className="inputGrid">
                <div className="inputGridItem">
                    <h4 className="inputTitle">PopSize</h4>
                    <input
                        type="text"
                        value={neatPopSize}
                        onChange={e =>{updatePopSize(e.target.value)}}
                    />
                </div>
            </div>
        </div>
    )
}

export default NEATdashboard