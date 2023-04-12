import React, { useEffect, useRef, useState } from "react";
import "../../Info.css"
const Info = (props) =>{
    const {setInfoShown} = props
    const [showingMain, setShowingMain] = useState(true)
    const [showingTutorial, setShowingTutorial] = useState(false)
    const [showingGA, setShowingGA] = useState(false)
    return (
        <div className="info-container">
            <div className="info-inner">
                {showingMain ? <div className="mainInfo">
                        <div className="infoButtonGrid">
                            <button className="infoButton" onClick={()=>{setShowingMain(false); setShowingTutorial(true)}}>
                                <h1>Overview</h1>
                            </button>
                            <button className="infoButton" onClick={()=>{setShowingMain(false); setShowingGA(true)}}>
                                <h1>Genetic Algorithm</h1>
                            </button>
                        </div>
                </div>: null}
                {showingTutorial ? <div className="tutorialInfo">
                    <div className="header">
                        <button className="backBtn" onClick={()=>{setShowingMain(true); setShowingTutorial(false)}}>
                            <h1>Back</h1>
                        </button>
                        <h1>Overview</h1>
                    </div>
                    <div className="tutorialMainWrapper">
                        <h1><u>What Is This App?</u></h1>
                        <p>
                            The purpose of this app is to teach it's users about 2 biologically inspired algorithms: <b><i>Genetic Algorithms</i></b> and <b><i>NeuroEvolution Through Augmenting Topologies (NEAT).</i></b>
                        </p>
                        <h1><u>Genetic Algorithm</u></h1>
                        <p>
                                The aim for the A.I. in this section is to reach the goal (the yellow rectangle at the end) without touching any of the spikes. The way it learns to do this is through a Genetic Algorithm
                            <br/><br/>
                                Genetic Algorithms are heavily inspired from natural selection in real biology. The algorithm starts off by creating a population where each individual's DNA is a list of the consecutive moves it will make (example: [left, left, right, jump, right, right, jump]). The population 
                                will then play the game, carrying out the moves in it's DNA. Once every move has been made, a new population is created through natural selection. Each individual is judged based on how well it did
                                (how close it got to the goal, and if it died or not). The better the individual did, the higher chance it has to pass onto the next generation. Some individuals DNA are combined before moving on (crossover)
                                and some moves are randomly changed (mutation). The hope is that the new population will perform better than the last, and that an individual will complete it's goal after enough generations.
                                This is just a brief overview of what a Genetic Algorithm is. This app also contains a more in depth explaination.
                            <br/><br/>
                                An important part of Genetic Algorithms is the <i>diversity</i> within the population. We don't want to get rid of the poorer performing individuals right away as they may end becoming the best performing individuals later on.
                                When running the simulation, pay attention to how the population evolves to pass the middle section. It is much easier for the population to take the path below but this leads to an obstacle that is impossible to get passed. If we
                                fully commited to this path as it initially leads to the population performing better, the population will never reach the goal. We want the algorithm to explore a variety of different paths so that it can reach the absolute best solution.
                            <br/><br/> 
                                There is also the option to limit the amount of moves that the A.I. can currently make, and increase this value after X amount of generations. This is so that the algorithm can optimise the first few moves before adding more. 
                                Be careful not to set the number of moves it adds too low as this will result in less diversity within the population
                            <br/><br/>
                                You can alter different settings like the mutation rate and crossover rate to see how it impacts the diversity within the population, and the amount of generations and moves it takes the population to reach the goal.
                                Changes to the settings will not effect any simulation that is running. Click "Start New Game" to start a new simulation.
                        </p>
                    <br/><br/>
                    <h1><u>NeuroEvolution Through Augmenting Topologies (NEAT)</u></h1>
                        <p>
                                The aim for the A.I. in this section is to catch the green squares and avoid the red squares. It learns to do this through the NEAT algorithm.
                            <br/><br/>
                                Like Genetic Algorithms, NEAT is heavily inspired from natural selection in real biology. However, the main difference is that NEAT evolves an Artificial Neural Network.
                                The algorithm starts off by 
                          
                        </p>
                    </div>
                </div>:null}
                {showingGA ? <div className="tutorialInfo">
                    <div className="header">
                        <button className="backBtn" onClick={()=>{setShowingMain(true); setShowingGA(false)}}>
                            <h1>Back</h1>
                        </button>
                        <h1>Genetic Algorithm</h1>
                    </div>
                    <div className="tutorialMainWrapper">
                        <h1><u>What are Genetic Algorithms?</u></h1>
                        <p>
                            Genetic Algorithms are a form of A.I. that attempts to find the best solution to a problem through natural selection. The main steps of the algorithm are:
                            <ol>
                                <li>Initialise a random population of solutions to the problem</li>
                                <li>Evaluate each individual's fitness according to a given fitness function (a function that tells you how well the individual performed)</li>
                                <li>Selection</li>
                                <li>Crossover</li>
                                <li>Mutation</li>
                                <li>Repeat from step 2 until the optimal solution is found or after aa certain amount of generations</li>
                            </ol>
                            <h2><u>1. Initialisation</u></h2>
                                A standard Genetic Algorithm usually starts off by initialising a population containing individual solutions to the given problem. In this case, a population of a randomised list of 
                                moves is generated (e.g. left, right, jump, jump, right, right). 
                            <h2><u>2. Evaluation</u></h2>
                                Each individual is given a fitness value according to a fitness function. This helps determine how good each solution is at solving a given problem. For example, fitness function for this app
                                is the distance between an individual and the goal plus a value if they have hit a spike. So in this case, the individual with a lower fitness value are performing better
                            <h2><u>3. Selection</u></h2>
                                Next, we need to create a pool of individuals (i.e. parents) that will be used to create the next generation by selecting mostly the best performing individuals but also some poorer performing individuals.
                                This is because an individual who is the best 
                        </p>
                        
                    </div>
                </div>:null}
            </div>
        </div>
    )

}

export default Info