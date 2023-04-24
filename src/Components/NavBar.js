import React from "react"
import { Link } from "react-router-dom"
import { states } from "../States"
import "./Nav.css"
const NavBar = (props) =>{
    const {setGameState} = props 
    return(
    <ul className="navbar">
        <li><Link onClick={() => setGameState(states.paused)} to="/improved-web-app/GAgame" 
            style={{textDecoration: "none", color:"black"}}>Genetic Algorithm</Link></li>
        <li><Link onClick={() => setGameState(states.paused)} to="/improved-web-app/NEATgame" 
            style={{textDecoration: "none", color: "black"}}>NEAT Algorithm</Link></li>
        <li><Link onClick={() => setGameState(states.paused)} to="/improved-web-app/" 
            style={{textDecoration: "none", color: "black"}}>Home</Link></li>
    </ul>
    )
}

export default NavBar