import React, { useEffect, useRef, useState } from "react";
import "../../Info.css"

const Home = (props) =>{
    const {setInfoShown} = props
    const [showingMain, setShowingMain] = useState(true)
    const [showingTutorial, setShowingTutorial] = useState(false)
    const [showingGA, setShowingGA] = useState(false)
    const [showingNEAT, setShowingNEAT] = useState(false)
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
                            <button className="infoButton" onClick={()=>{setShowingMain(false); setShowingNEAT(true)}}>
                                <h1>NEAT</h1>
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
                            The Genetic Algorithm portion of the app contains a demonstration of the algorithm learning how to complete a simple platformer game. You can also alter different perameters to see how it effects 
                            the diversity of the population, and the amount of generations and moves it takes to complete the game. The NEAT part of the app contains a demonstration of the algorithm learning
                            how to play a simple catch game. This section gives a brief overview of both algorithms, however this app also contains more detailed explainations.
                        </p>
                        <h1><u>Genetic Algorithm</u></h1>
                        <p>
                                The aim for the A.I. in this section is to reach the goal (the yellow rectangle at the end) without touching any of the spikes. The way it learns to do this is through a Genetic Algorithm.
                            <br/><br/>
                                Genetic Algorithms are heavily inspired from natural selection in biology. It is an optimisation algorithm, meaning it is mainly used to find the optimal solution to a problem. The algorithm starts off by creating a population where each individual's DNA is a list of the consecutive moves it will make (example: [left, left, right, jump, right, right, jump]). The population 
                                will then play the game, carrying out the moves in it's DNA. Once every move has been made, a new population is created through natural selection. Each individual is judged based on how well it did
                                (how close it got to the goal, how many spikes it passed and if it died or not). The better the individual did, the higher chance it has to pass onto the next generation. Some individuals DNA are combined before moving on (crossover)
                                and some moves are randomly changed (mutation). The hope is that the new population will perform better than the last, and that an individual will complete it's goal after enough generations.
                                This is just a brief overview of what a Genetic Algorithm is. This app also contains a more in depth explaination on genetic algorithms and what each hyperperameter is and how it effects the algorithm.
                                This app also allows you to alter the different hyperperameters that make up the algorithm to see how it impacts the performance of the algorithm.
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
                                Like Genetic Algorithms, NEAT is heavily inspired from natural selection in biology. However, the main difference is that a standard Genetic Algorithm evolves a sequence of values.
                                In NEAT, each individual has an Artificial Neural Network (brain) that takes in values from it's environment and makes a decision on what it should do based on these values.
                                <br/>An ANN is made up of 3 main parts: 
                        </p>
                                <ul>
                                    <li>An Input Layer - This layer takes in information from it's environment</li>
                                    <li>Hidden Layers - Layers that process the data from the Input Layer</li>
                                    <li>An Output Layer - This layer makes a decision on what to do. In this case, move right, left, or not at all</li>
                                </ul>
                        <p>
                                A node in a given layer is connected to a node the next layer. Each connection has a weight assosiated with it. Each hidden and output node adds up each input it gets from the previous layer multiplied by the weight of the connection, adds a value called the bias,
                                proccesses it through an activation function. Hidden nodes pass this final number to the next layer wheras the final number created by output nodes is the result.  
                            <br/><br/>
                                The NEAT algorithm starts off by generating a population of individuals with a simple brain. The goal of NEAT is to try to find the simplest brain structure that can solve a given problem, so each brain initially consists of just an
                                input layer and an ouput layer where every input node is connected to every output node. The weights of each connection, and the bias and activation function of each output node is random. 
                                Each individual plays the game based on the decisions it makes given it's environment. Once every individual has failed, the population is evolved. This mainly consists of randomly changing the 
                                weight of a connection, the bias of a node, or the activation function of a node. There is also a chance that a node will be inserted into a hidden layer inbetween the input and output layer, or a connection will be randomly 
                                added or disabled. This is important as the simplest brain structure (no hidden layers) may be too simple for the problem it's trying to solve. Evolving the structure of the brain allows the algorithm to explore more complicated
                                brain structures and find the simplest one that solves the given problem.
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
                            Genetic Algorithms are a form of A.I. that attempts to find the best solution to a problem through natural selection. In this app, a Genetic algorithm 
                            will learn to play a simple platformer game. The main steps of the algorithm are:
                        </p>
                            <ol>
                                <li>Initialisation</li>
                                <li>Evaluation</li>
                                <li>Selection</li>
                                <li>Crossover</li>
                                <li>Mutation</li>
                            </ol>
                        
                            <h1><u>1. Initialisation</u></h1>
                        <p>
                                A standard Genetic Algorithm starts off by initialising a population containing individual solutions to the given problem. Each solution consists of a list of data. This can
                                be a binary encoding (1,0,0,1,0,1,1), a list of numbers, or in this case, a randomised list of moves (e.g. left, right, jump, jump, right, right). It is important for the initial population to be random as we want to explore a wide variety of possible solutions.
                        </p>
                            <h1><u>2. Evaluation</u></h1>
                        <p>
                                Each individual is given a fitness value that measures how good that individual is at solving a given problem. This fitness value is calculated using a fitness function.
                                The fitness function is unique to the problem it is being applied to. For example, the goal of the Genetic Algorithm used in this app is to reach the goal on the right side
                                of the screen. So the fitness function used is <u><i>M - G + 100S - 100D + 100 </i></u> where M = the maximum distance an individual can get from the goal, G = the actual distance between 
                                the individual and the goal, S = the number of spikes the individual has passed, and D is whether the individual has died or not (1 or 0).
                                The 100 added onto the end is to make sure an individual's fitness never goes below 0. This fitness function rewards individuals for behaviours we want to see (getting passed spikes) and punishes them for behaviours we don't (hitting a spike) but
                                many fitness functions won't include this.
                        </p>
                            <h1><u>3. Selection</u></h1>
                        <p>
                                Next, we need to create a pool of individuals (parents) that will be used to create the next generation. It might seem like the best way to do this is to only pick the best performing individuals
                                but this leads to a <i>Local Optima</i> (the best solution found using a limited number of paths). We want to find the <i>Global Optima</i> (the best overall solution). 
                                The Genetic Algorithm has 2 paths it can take in the middle of the game in this app. The bottom path is easy to enter but leads to a dead end (the local optima). The top path is more difficult to enter 
                                and the population prefer to take the bottom path at first and get stuck. However, a few individuals should continue with the top path and eventually get closer to the goal than the individuals who took the bottom path.
                                By only focusing on the individuals that are <i>currently</i> performing the best, we might be missing out on the best possible solution. To fix this problem, we need to include some individuals who are performing poorly 
                                in the next generation to keep genetic diversity within the population so that the population can explore a wide variety of solutions.<br/>
                                There are several selection algorithms that try to find the right balance between the better and poorer performing individuals. This app focuses on 3:<br/>
                        </p>       
                                <ul>
                                    <li>Roulette Wheel Selection</li>
                                    <li>Rank Selection</li>
                                    <li>Tournament Selection</li>
                                </ul> 
                            <br/>
                            <h2><u>Roulette Wheel Selection</u></h2>
                        <p>
                            Roulette wheel selection works by assigning each individual in the population a probability of being selected as a parent based on it's fitness and then randomly selecting an individual until there are enough
                            parents. Imagine a roulette wheel where the better performing individuals take up more of the wheel. An individual's probability is calculated by dividing the individual's fitness by the sum of every individual's fitness
                            in the population. 
                            <br/><img src={require("./roul_infographic.png")} width={75+"%"}></img><br/>
                            
                            Once the "wheel" has been created, the algorithm "spins" this wheel until there are enough parents to create a new generation. This results in the parents containing both better and poorer performing individuals. 
                            However, the main disadvantage to roulette wheel selection is when an individual (or a group of individuals) performs significantly better 
                            then the rest of the population. This group will then take up a much larger portion of the wheel and be selected much more frequently than the others, decreasing the diversity in the population and increasing the chance of 
                            getting stuck at a local optima as fewer paths have been explored. 
                        </p>
                            <h2><u>Rank Selection</u></h2>
                        <p>
                                Rank selection is an attempt to fix the main disadvantage of Roulette Wheel Selection. It does this by sorting the population in ascending order of fitness, then assigning a rank to each individual. The worst performing individual will 
                                be rank 1, the next rank 2, and so on. The best performing individual will have a rank equal to the population size.
                                <br/><img src={require("./rank_infographic.png")} width={75+"%"}></img><br/>
                                Notice how the dominant individual takes up less space and the poorer performing individuals take up more space than in Roulette Wheel Selection.
                                The rest of the algorithm is the same as Roulette Wheel Selection except the probabily that an individual is selected 
                                is calculated by dividing the individual's rank by the sum of all ranks. This gives each individual a fairer share of the wheel and makes sure that a dominant individual doesn't get picked too often.

                        </p> 
                            <h2><u>Tournament Selection</u></h2>
                        <p>
                                Tournament Selection works by randomly selecting a number of individuals and putting them into a tournament wh  ere the individual with the highest fitness wins and gets selected to be a parent.
                                <br/><img src={require("./tour_infographic.png")} width={75+"%"}></img><br/>
                        </p>
                            <h1><u>4. Crossover</u></h1>
                        <p>
                                After the parents of the new generation have been selected, the new population needs to be created. This starts with Crossover, where the genomes of the 2 parents are combined to create 2 new genomes. 
                                Crossover starts by selecting 2 parents from the pool of parents at random.
                                Each pair of parents will produce 2 children. The chance that crossover takes place between 2 parents is called the Crossover Rate. If the Crossover Rate is 0.7, there is a 70% chance the 2 parent's genomes are combined.
                                If crossover does not take place, the 2 children produced will be exact copies of their parents.If crossover does take place, the point the 2 genomes are combined is randomly selected. This is called the crossover point. 
                                <br/>
                                There are 2 types of crossover: <i>Single-Point Crossover</i> and <i>Double Point Crossover</i> In Single-Point Crossover, a single Crossover Point is created. For child 1, all genes up to the Crossover point will be taken
                                from parent 1 and all genes after the Crossover Point will be taken from parent 2. Child 2 is created the same way but with the parents swapped
                                <br/><img src={require("./single_point_infographic.png")} width={75+"%"}></img><br/>
                                Double-point Crossover is the same but with a second Crossover Point where all of the genes after the second Crossover Point are from the original parent. It's like we are replacing a section of one parent's
                                genome with the other parent's genome.
                                <br/><img src={require("./double_point_infographic.png")} width={75+"%"}></img><br/>
                        </p>
                            <h1><u>5. Mutation</u></h1>
                        <p>
                                Once the children have been created after crossover, a gene within the child's genome is randomly mutated. This adds another degree of randomness to the algorithm, increasing the genetic diversity in the population.
                                Whether mutation takes place in a child is determined 
                                by the mutation rate. Mutation works by randomly selecting a gene in the child's genome and changing it to a random value. In this case, a single move is randomly changed to another move. 
                                <br/><img src={require("./mutation_infographic.png")} width={75+"%"}></img><br/>
                                In a binary encoding, this could be switching a 1 to a 0. In more advanced problems where there are a large number of possible values (e.g. -100 to 100), you may want to optimise mutation by selecting a value that is 
                                relativly close to it's current value.
                        </p>
                            <h1><u>6. Move Increment</u></h1>
                        <p>
                                This is not a part of a standard Genetic Algorithm but is included in this implementation and worth mentioning. Each individual starts off with only a small amount of the total moves they can make. 
                                After a number of generations have passed (the move interval), more moves are added to the total amount of moves they can make (the move increment). This continues until the maximum amount of moves is reached. 
                                This is to optimise the algorithm to solve the problem in a shorter amount of time and with fewer moves. If you want to test the algorithm without this, set the move increment to be the same as the maximum amount of moves.
                        </p>
                        
                    </div>
                </div>:null}
                {showingNEAT ? <div className="tutorialInfo">
                    <div className="header">
                        <button className="backBtn" onClick={()=>{setShowingMain(true); setShowingNEAT(false)}}>
                            <h1>Back</h1>
                        </button>
                        <h1>NeuroEvolution Through Augmenting <br/>Topologies (NEAT)</h1>
                    </div>
                    <div className="tutorialMainWrapper">
                        <h1><u>What Is NEAT?</u></h1>
                            <p>
                                Like Genetic Algorithms, NEAT is a form of A.I. that attempts to find the best solution to a given problem through Natural Selection. NEAT follows the main steps of 
                                Genetic Algorithms (Selection. Crossover, Mutation), however the key difference is while standard Genetic Algorithms evolve a sequence of values, NEAT evolves Artificial Neural Networks.
                                
                            </p>
                            <h1><u>1. Artificial Neural Networks</u></h1>
                                <p>
                                    Artificial Neural Networks are a form of A.I. that is heavily inspired by real life brains. An ANN is made up of 3 parts:
                                </p>
                                    <ol>
                                        <li>An Input Layer</li>
                                        <li>An optional number of Hidden Layers</li>
                                        <li>An Output Layer</li>
                                    </ol>
                                <br/><img src={require("../../Images/ANN_infographic.png")} width={75+"%"}></img><br/>
                                <p>
                                Each layer consists of a number of nodes (neurons) that are connected to a node in the next layer. Each connection has an associated weight which is multipled with the value from the previous node
                                (So if the weight is 0.5, the value is halved before it reaches the next node). Each node in the hidden and output layers then adds up all the weighted values it recieves from the previous layer, adds a value 
                                to the result called the bias, puts the result value through an activation function and passes the final result to the next layer. The activation functions this app includes are Sigmoid, Identity, Step, Tanh, ReLu and Sigmoid.                           </p>
                                <br/><img src={require("../../Images/neuron_infographic.png")} width={75+"%"}></img><br/>
                                <p>The structure of the network (number of hidden layers, number of nodes in each layer, which nodes to connect, the activation function for each node) can severly impact how well a network can solve a given problem and is usually 
                                    constructed using trial and error. Good practice is to try to make the network as simple as possible. In this case, each network 
                                    has 3 input nodes (current position, distance between itself and the nearest square, and a value (0 or 1) showing whether the nearest square is green or red) and 1 output node (if the output is below a certain value, move left. 
                                    If the output value is above a certain value, move right). Networks that are too complex contain unnecessary values to evolve, and will take longer to find the best solution.
                                </p>
                                <br/>


                            <h1><u>2. NEAT</u></h1>
                            <p>
                                NEAT is an attempt to apply Genetic Algorithms to ANNs to find the simplest network structure that can solve a given problem. In this case, find the simplest network structure that can never lose a simple catch game.
                            </p>
                            <h2><u>The Genome</u></h2>
                                <p>
                                    The Genome of the ANN is represented by 2 lists: A Node List and a Connection List, shown below.<br/>
                                    <br/><img src={require("../../Images/neat_genome.PNG")} width={75+"%"}></img><br/>
                                    Image from the original NEAT paper<br/><br/>
                                    Each node contains an ID number and a value indicating which layer it is in. In this implementation, each node also contains a bias and activation function. Each connection contains the ID of both the 
                                    input node and output node, the weight of the connection, a value indicating whether the connection is enabled or disabled and the innovation number of the connection. The innovation number will be explained in the crossover section.
                                </p>
                            <h2><u>Initialisation and Evaluation</u></h2>
                                <p>
                                    NEAT begins by generating a population of individuals with an ANN that contains no hidden layers. Each output node contains a random activation function.  Each individual then plays the game based on the decisions they make using their ANN.
                                    Once every individual has lost the game, a new population is created. The fitness function in this case is the number of green squares they caught plus the number of red squares they avoided.
                                </p>
                            <h2><u>Mutation</u></h2>
                                <p>
                                    In mutation, there is a random chance that the weights, biases or activation function is changed. There are many ways to change the weights and biases such as changing them 
                                    to a random value within a range or by using a random gaussian distribution.<br/>
                                    NEAT also has a very low chance to mutate the structure of the ANN. It does this by either adding a connection with a random weight between 2 unconnected nodes that are in different layers, or by adding a new node inbetween 2 connected nodes.
                                    <br/><img src={require("../../Images/neat_mutation.PNG")} width={75+"%"}></img><br/>Image from the original NEAT paper showing the 2 structural mutations<br/><br/>
                                    Every connection is within the network is tracked and given an "innovation number". Whenever a new connection is created, it is checked against every existing connection. If the connection already exists, it is given the same innovation number. If it does not, it 
                                    is given a new innovation number. The innovation number starts at 1 and is incremented whenever a brand new connection is added. This innovation number is important during crossover.
                                    This allows the NEAT algorithm to explore how effective more complicated structures are at solving the given problem. 
                                </p>
                            <h2><u>Crossover</u></h2>
                                <p>
                                    There are 3 types of connections when trying to combine 2 parent ANNs:
                                </p>
                                    <ul>
                                        <li>Matching Connections - Connections that exist in both parents (i.e. they have the same innovation number)</li>
                                        <li>Disjoint Connections - Connections that only exist in 1 parent and the other parent has an innovation number greater than the disjoint connection</li>
                                        <li>Excess Connections - Connections that only exist in 1 parent and has an innovation number greater than the largest innovation number in the other parent</li>
                                    </ul>
                                <p>
                                During crossover, the connection lists for both parents are combined. If a connection is matching, the connection that is passed on is randomly selected. If a connection 
                                is a disjoin or excess connection, it is passed on with no changes. 
                                <br/><img src={require("../../Images/neat_crossover.PNG")} width={75+"%"}></img><br/>Image from the original neat paper showing how crossover in NEAT works.<br/><br/>
                                </p>
                            <h2><u>Speciation</u></h2>
                            <p>
                                Speciation is not included in this implementation but is important when NEAT starts to produce a variety of complicated networks. When a new connection or node is added, they weights and biases 
                                will likely not be optimal for the new structure. This can lead to a new structure being eliminated from the population before it has had a chance to optimise it's weights and biases. 
                                Speciation divides the population into different species. A new species is created whenever a network becomes to different from the rest of the population to be compaired fairly. Then, all new networks that are 
                                similar to the new species are added to that species. Netowrks can only crossover with other networks within the same population   
                                <br/>
                                The difference between each gene is calculated by this function:
                                <br/><img src={require("../../Images/speciation_function.PNG")} width={25+"%"}></img><br/>Image from the original neat paper<br/><br/>
                                c1, c2, and c3 are contstants, E is the number of excess genes, D is the number disjoint genes, W is the average of all the weights in the network and N is the number 
                                of total connections (N is set to 1 if there are fewer than 20 connections). If the difference between 2 networks is lower than a predefined threshold, they are the same species. 
                                If a network cannot be placed in the same species as any species that currently exists, a new species is created. <br/>
                                The main benifit of speciation is that allows the algorithm to keep networks brand new complicated networks for longer. This allows for more complicated networks to be explored.
                            </p>
                            <p>
                                Original NEAT paper: Stanley, K.O. and Miikkulainen, R., 2002. Evolving neural networks through augmenting topologies. Evolutionary computation, 10(2), pp.99-127.
                            </p>       
                    </div>
                </div>:null}
            </div>
        </div>
    )

}

export default Home