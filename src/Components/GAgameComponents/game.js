
import { Spike } from "./Entities/Spike.js"
import { Goal } from "./Entities/Goal.js"
import { Population } from "./Population.js"
import { spikes, grounds, goalData } from "./Data.js"
import { Ground } from "./Entities/gound.js"

export class Game{
   
    constructor(width, height, popSize, movesInc, movesInterval, movesCap, speedMult, GAInfo){
        // initialise canvas data
        this.width = width
        this.height = height
    
        this.speedMultiplier = speedMult

        // initialise population logic
        this.popSize = popSize
        this.movesList = ["RIGHT", "LEFT", "JUMP"]
        this.movesInc = movesInc
        this.numMoves = movesInc
        this.population = new Population(popSize, this.numMoves, movesInc,movesCap, GAInfo)
        this.movesInterval = movesInterval
        this.movesCap = movesCap
        this.blockProbabilities = []

        this.spikes = []
        this.grounds = []
        this.startTime = Date.now()
   
        this.moveImpact = 6
        this.impactCount = 0
        this.gen = 0
        this.winGen = 0
        this.winMoves = 0

        // main game loop
        this.run = (context) =>{
            
            
                for(let i=0; i<this.speedMultiplier; i++){
                    this.update()
                    this.impactCount++
                    
                }
                this.draw(context)
                
                
                if(this.impactCount === this.moveImpact){
                    this.population.iteration++
                    this.impactCount=0
                }
                
                
                
                
                if(this.population.iteration >= this.population.numMoves){
                    this.endGame()
                }
                
            
        }
        
    }

    update(){
        this.population.update()   
        if(this.population.hasWon && this.winGen === 0){
            this.winGen = this.gen
            this.winMoves = this.population.iteration
        }
    }

    draw(context){
        this.goal.draw(context)
        // draw spikes
        for(let j=0; j<this.spikes.length; j++){
            this.spikes[j].draw(context)
        }
        for(let j=0; j<this.grounds.length; j++){
            this.grounds[j].draw(context)
        }
        this.population.draw(context)
        

           
    }

    endGame(){
        // evolve population, reset game and start again

        if((this.gen+1) % this.movesInterval ===0 && this.population.numMoves < this.movesCap){
            if(this.numMoves + this.movesInc <= this.movesCap){
                this.population.increaseMoves(this.movesInc)
            }
            else{
                this.population.increaseMoves(this.movesInc)
            }
            
            this.numMoves += Number(this.movesInc)
            console.log(this.movesInc)
        
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
        
        
        // //this.spikes.push(new Spike(25, 25, 900, this.height-25))
        // this.spikes.push(new Spike(25, 25, 700, this.height-25))
        // //this.spikes.push(new Spike(25, 25, 500, this.height-25)) 
        // this.spikes.push(new Spike(25, 25, 200, this.height-25)) 
        for(let i=0; i<spikes.length; i++){
            this.spikes.push(new Spike(spikes[i].w,spikes[i].h, spikes[i].x, spikes[i].y, spikes[i].upsideDown))
        }
        for(let i=0; i<grounds.length; i++){
            this.grounds.push(new Ground(grounds[i].w,grounds[i].h,grounds[i].x,grounds[i].y ))
        }
       
        this.goal = new Goal(goalData.w, goalData.h, goalData.x, goalData.y)
        
        //this.increaseMoves()
    }

    

    reset(){
        for(var i=0; i<this.popSize; i++){
            this.population.reset()
        }
        this.population.iteration = 0
    }
}
