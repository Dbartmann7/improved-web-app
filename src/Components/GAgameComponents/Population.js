import { Individual_Bot } from "./Entities/Individual_Bot.js";
import { Data, spikes } from "./Data.js";
import Moves from "./Moves.js";
import { GeneticAlgorithm } from "./GeneticAlgorithm.js";
import { isColliding } from "./Collision.js";
export class Population{
    constructor(popSize, numMoves, movesInc, maxMoves, sAlgor, cRate, mRate){
       // this.GA = new GeneticAlgorithm(sAlgor, cRate, mRate)
        this.population = []
        this.popSize = popSize
        this.iteration = 0
        this.numMoves = numMoves
        this.movesInc = movesInc
        this.maxMoves = maxMoves
        this.blockProbabilities = [1]
        
        this.GA = new GeneticAlgorithm(popSize, sAlgor, cRate, mRate)

        const {playerData} = Data
        for(let i=0; i<popSize; i++){
            this.population.push(new Individual_Bot(playerData.w, playerData.h, playerData.x, playerData.y))
            let moves = Array.from({length: this.numMoves},() => Moves[Math.floor(Math.random() * Moves.length)])
            this.population[i].setMoves(moves)
        }
    }

    update(){
        for(let i=0; i<this.population.length; i++){
            if(this.population[i].alive && !this.population[i].won){
                this.population[i].update(this.iteration)
                for(let j=0; j<spikes.length; j++){
                    if(isColliding(this.population[i], spikes[j])){
                        this.population[i].kill()
                    }
                }
            }
        }
    }

    draw(ctx){
        for(let i=0; i<this.population.length; i++){
            this.population[i].draw(ctx)
        }
    } 

    evolve(){
        
        let newPopulation = this.GA.evolve(this.population, this.numMoves, 2)
        this.population.splice(0, this.population.length)
        this.population = newPopulation.slice(0)

    }

    reset(){
        for(let i=0; i<this.population.length; i++){
            this.population[i].reset()
        }
    }

    increaseMoves(movesInc){
        console.log(this.popSize)
        for(let i=0; i<this.popSize; i++){
            
            let newMoves = Array.from({length: movesInc}, () => Moves[Math.floor(Math.random()*3)])
            this.population[i].setMoves(this.population[i].moves.concat(newMoves))
            
            
        }
        this.numMoves = this.population[0].moves.length
        console.log(this.numMoves)
        

        this.blockProbabilities.splice(0)


       
        let sum = 0
        this.numBlocks = (this.numMoves/this.movesInc)   
        console.log(this.numBlocks)     
        for(let i=1; i<=this.numBlocks; i++){
            sum += i
        }
  
        for(let i=1; i<=this.numBlocks; i++){
            this.blockProbabilities.push(i/sum)
            console.log("sum: " + sum)
        }
        
    }
}