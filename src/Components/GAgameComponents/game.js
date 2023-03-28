
import { Individual_Bot } from "./Individual_Bot.js"
import { Spike } from "./Spike.js"
import { Goal } from "./Goal.js"
import { GeneticAlgorithm } from "./GeneticAlgorithm.js"
import { isColliding } from "./Collision.js"
import { Moves } from "./Moves.js"
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils/index.js"
export class Game{
   
    constructor(width, height, popSize, movesInc, movesInterval, movesCap){
        // initialise canvas data
        this.width = width
        this.height = height
        this.speedMultiplier = 1

        // initialise population logic
        this.population = []
        this.popSize = popSize
        this.movesInc = movesInc
        this.numMoves = 0
        this.movesInterval = movesInterval
        this.movesCap = movesCap
        this.blockProbabilities = []

        this.spikes = []

        this.moveImpact = 5
        this.impactCount = 0
        this.iteration = 0

        this.GA = new GeneticAlgorithm("tour", 0.9, 0.1, this)
        this.gen = 0
        
        // main game loop
        this.run = (context) =>{
                // update and draw each entity
                // for(let i=0; i<this.popSize; i++){
                //     for(let j=0; j<this.speedMultiplier; j++){
                //         if(this.population[i].iteration > this.population[i].moves.length){
                //             break
                //         }
                //         this.population[i].update()
                //         this.population[i].iteration++
                //     }
                //     this.population[i].draw(this.context)
                // }
                
                this.update()
                this.draw(context)
 
                if(this.iteration === this.numMoves){
                    this.endGame()
                }
        }
    }

    update(){
        for(let j=0; j<this.speedMultiplier; j++){
            this.impactCount++
            if(this.impactCount > this.moveImpact){
                this.iteration++
                this.impactCount=0
            }
            for(let i=0; i<this.popSize; i++){
            
                if(this.population[i].iteration>this.population[i].moves.length){
                    break
                }
                
                this.population[i].update(this.iteration)
                // check collisions
                if(this.population[i].alive){
                    for(let j=0; j<this.spikes.length; j++){
                        if(isColliding(this.population[i], this.spikes[j])){
                        this.population[i].dead()
                        this.numDead++
                        }
                    }
                    if(isColliding(this.population[i], this.goal)){
                        this.population[i].won()
                    }
                }
            }
        }
    }
    draw(context){
        this.goal.draw(context)
        // draw spikes
        for(var j=0; j<this.spikes.length; j++){
            this.spikes[j].draw(context)
        }
        for(let i=0; i<this.popSize; i++){
            this.population[i].draw(context)
        }

        
    }
    endGame(){
        // evolve population, reset game and start again
        for(let i=0; i<this.population.length; i++){
            this.population[i].evaluate(this.goal)
        }
        let newPopulation = this.GA.evolve(this.population,this,this.numMoves,  2)
        this.population.splice(0, this.population.length)
        this.population = newPopulation
        this.reset()
        this.gen++
        if(this.gen % this.movesInterval === 0 && this.numMoves < this.movesCap){
            this.increaseMoves()
        }
    }

    initialise(){
        
        //this.spikes.push(new Spike(25, 25, 900, this.height-25))
        this.spikes.push(new Spike(25, 25, 700, this.height-25))
        //this.spikes.push(new Spike(25, 25, 500, this.height-25)) 
        this.spikes.push(new Spike(25, 25, 200, this.height-25)) 

        this.goal = new Goal(50, this.height, this.width-50, 0)
        this.initialisePop()
        this.increaseMoves()
    }

    initialisePop(){
        for(let i=0; i<this.popSize; i++){
            this.population.push(new Individual_Bot(50, 50, 20, this.height-20,this))
        }
    }

    increaseMoves(){
        this.blockProbabilities = []
        for(let i=0; i<this.popSize; i++){
            let newMoves = Array.from({length: this.movesInc}, () => Moves[Math.floor(Math.random()*3)])
            this.population[i].moves = [...this.population[i].moves, ...newMoves]
        }
        this.numMoves += this.movesInc
        let numBlocks = this.population[0].moves.length / this.movesInc
 
       
        let sum = 0
        for(let i=1; i<=numBlocks; i++){
            sum += i
        }
  
        for(let i=1; i<=numBlocks; i++){
            this.blockProbabilities.push(i/sum)
            console.log("sum: " + sum)
        }
    }

    reset(){
        for(var i=0; i<this.popSize; i++){
            this.population[i].reset()
        }
        this.iteration = 0
    }
}
