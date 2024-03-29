import Data from "../Data.js"
import { Cube } from "./Cube.js"
import Population from "./Population"

export class Game{
   
    constructor(width, height, popSize){
        // initialise canvas data
        this.width = width
        this.height = height
        const {playerData} = Data
        this.cubes = []
        this.population = new Population(popSize, playerData, width);

        this.timeSinceLastSpawn = null
        this.spawnTime = 1250
        this.cubeNum = 0
        this.currentGeneration = 0

        this.run = (context) =>{
            if(!this.population.done()){
                if(Date.now() - this.timeSinceLastSpawn > this.spawnTime){
                    this.addCube()
                }
                this.update()
                this.draw(context)
              
                if(this.cubes[0].y >= 950){
                    this.removeCube()
                }
            }else{
                this.currentGeneration++
                this.population.naturalSelection()
            }
            return context
        }
    }

    update(){
        for(let i=0; i<this.cubes.length; i++){
            this.cubes[i].update()
        }
        this.population.updateAlive(this.cubes[0]);
    }

    draw(context){
        for(let i=0; i<this.cubes.length; i++){
            this.cubes[i].draw(context)
        }
        for(let i=0; i<this.population.population.length; i++){
            if(this.population.population[i].dead){
                this.population.population[i].draw(context)
            }
        }
        for(let i=0; i<this.population.population.length; i++){
            if(!this.population.population[i].dead){
                this.population.population[i].draw(context)
            }
        }
    }

    initialise(){
        this.addCube()
        this.currentGeneration = 1;
        this.timeSinceLastSpawn = Date.now()
    }

    addCube(){
        let spawnX = Math.floor(Math.random()*this.width)
        if(spawnX < Data.playerData.w) spawnX = 101
        if(spawnX > Data.canvasData.w - Data.playerData.w - 10) spawnX = Data.canvasData.w - Data.playerData.w - 20
        this.cubes.push(new Cube(20, 20, spawnX , 50, this.cubeNum, Math.random()))
        this.timeSinceLastSpawn = Date.now()
        this.idNum++
    }

    removeCube(){
        let cubeRemoved = this.cubes.splice(0,1)[0]
        
        if(!cubeRemoved.deadly){
            for(let i=0; i<this.population.size; i++){
                if(this.population.population[i].collidingWith === null){
                    this.population.population[i].kill();
                }
                this.population.population[i].collidingWith = null
            }
        }else{
            for(let i=0; i<this.population.size; i++){
                if(!this.population.population[i].dead){
                    this.population.population[i].score++
                }
                
            }
        }
        
    }
    
    getBestScore(){
        return this.population.getBestScore()
    }

   
    
}
