import { states } from "../../States"

const GAdashboard = (props) =>{
    const {setGameState} = props
    
    return(
        <div className="DashboardContainer">
            <button onClick={ () =>{setGameState(states.starting)}}>
                Start Game
            </button>
            <div className="inputGrid">
                <div className="inputGridItem">
                </div>
            </div>
        </div>
    )
}

export default GAdashboard