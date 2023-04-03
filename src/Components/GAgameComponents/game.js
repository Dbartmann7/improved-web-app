import { Individual_Bot } from "./Entities/Individual_Bot.js"
import { Spike } from "./Entities/Spike.js"
import { Goal } from "./Entities/Goal.js"
import { GeneticAlgorithm } from "./GeneticAlgorithm.js"
import { isColliding} from "./Collision.js"
import { Population } from "./Population.js"
export class Game{
   
    constructor(width, height, canvas, popSize, movesInc, movesInterval, movesCap){
        // initialise canvas data
        this.width = width
        this.height = height
    
        this.speedMultiplier = 5

        // initialise population logic
        this.popSize = popSize
        this.movesList = ["RIGHT", "LEFT", "JUMP"]
        this.movesInc = movesInc
        this.numMoves = movesInc
        this.population = new Population(popSize, this.numMoves, movesInc,movesCap, "tour", 0.8, 0.2)
        this.movesInterval = movesInterval
        this.movesCap = movesCap
        this.blockProbabilities = []

        this.spikes = []
        this.startTime = Date.now()
   
        this.moveImpact = 6
        this.impactCount = 0
        this.gen = 0

        // main game loop
        this.run = (context) =>{
            
            
                for(let i=0; i<2; i++){
                    this.update()
                    this.impactCount++
                    
                }
                this.draw(context)
                
                
                if(this.impactCount === this.moveImpact){
                    this.population.iteration++
                    this.impactCount=0
                }
                
                
                

                if(this.population.iteration === this.population.numMoves){
                    this.endGame()
                }
                
            
        }
        
    }

    update(){
        this.population.update()   
            

    }

    draw(context){

        this.population.draw(context)
        this.goal.draw(context)

        // draw spikes
        for(var j=0; j<this.spikes.length; j++){
            this.spikes[j].draw(context)
        }   
    }

    endGame(){
        // evolve population, reset game and start again

        if(this.gen % this.movesInterval ===0 && this.population.numMoves < this.movesCap){
            this.population.increaseMoves(this.movesInc)
        }
        
        this.population.evolve()
        this.reset()
        this.gen++
        // if(this.gen % this.movesInterval === 0 && this.numMoves < this.movesCap){
        //     this.increaseMoves()
        // }
        // console.log(this.population[0].moves.length)
    
    }

    initialise(){
        
        
        //this.spikes.push(new Spike(25, 25, 900, this.height-25))
        this.spikes.push(new Spike(25, 25, 700, this.height-25))
        //this.spikes.push(new Spike(25, 25, 500, this.height-25)) 
        this.spikes.push(new Spike(25, 25, 200, this.height-25)) 

        this.goal = new Goal(50, this.height, this.width-50, 0)
        
        //this.increaseMoves()
    }

    

    reset(){
        for(var i=0; i<this.popSize; i++){
            this.population.reset()
        }
        this.population.iteration = 0
    }
}
