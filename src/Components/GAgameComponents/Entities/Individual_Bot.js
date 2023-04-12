import { Data, grounds, spikes , goalData} from "../Data.js"
import {Entity} from "./Entity.js"
import { isColliding } from "../Collision.js"

export class Individual_Bot extends Entity{
    constructor(w ,h, x, y){
        super(w, h, x, y)
        this.vy =0
        this.moves = []
        this.speed = 10
        this.onGround = false
        this.alive = true
        this.won = false
        this.fitness = NaN
        this.initx = Data.playerData.x
        this.inity = Data.playerData.y
        this.canvasData = Data.canvasData
    }

    update(iteration){
        if(this.alive){
            if(this.moves[iteration] == "JUMP" && this.onGround){
                this.vy = 20
                this.onGround = false
            }
            if(this.moves[iteration] == "LEFT"){
                this.x -= this.speed
            }
            if(this.moves[iteration] == "RIGHT"){
                this.x += this.speed
            }   
        }

        
        if(!this.onGround){
            this.y -= this.vy
            this.vy -= 2
        }else{
            this.vy = 0
        }
        if(this.x < 0) this.x=0
        if(this.x > this.canvasData.w-this.w) this.x=this.canvasData.w-this.w
        if(this.x<0) this.x = 0
        this.won = isColliding(this, goalData)
        this.onGround = false
        for(let i=0; i<grounds.length; i++){
         
            if(isColliding(this, grounds[i])){
                this.y=grounds[i].y-this.h
                this.onGround = true
            }
        }
        //this.onGround = (this.y >= this.canvasData.h-this.h)
    }

    draw(context){
        context.fillStyle = "black"
        context.fillRect(this.x-5, this.y-5, this.w+10, this.h+10) 
        if(!this.alive){
            context.fillStyle = "red"
        }else if(this.won){
            context.fillStyle = "blue"
        }else{
            context.fillStyle = "green"
        }
        context.fillRect(this.x, this.y, this.w, this.h) 
    }

    setMoves(moves){
        this.moves.splice(0)
        this.moves = moves.slice(0)
        
    }

    evaluate(){
        let a = Math.pow(goalData.x+50 - this.x, 2)
        let b = Math.pow(goalData.y-100 - this.y, 2)
        this.fitness = a
        if(!this.alive){
            this.fitness += 100
        }

        for(let i=0; i<spikes.length; i++){
            if(this.x > spikes[i].x + spikes[i].w){
                this.fitness -= 100
            }
        }
    }
    
    kill(){
        this.alive=false
    }

    reset(){
        this.x = this.initx
        this.y = this.inity
        this.alive = true
    }

    clone(){
        let clonedIndividual = new Individual_Bot(this.w, this.h, this.x, this.y)
        clonedIndividual.setMoves(this.moves)
        clonedIndividual.fitness = this.fitness
        return clonedIndividual
    }
}