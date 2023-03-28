import {Entity} from "./Entity.js"
import Data from "./Data.js"
export class Individual_Bot extends Entity{
    constructor(w ,h, x, y){
        super(w, h, x, y)
        this.vy =0
        this.moves = []
        this.speed = 10
        this.onGround = false
        this.alive = true
        this.fitness = NaN
        this.initx = x
        this.inity = y
        this.bounds = Data.canvasData.w
        this.won = false
    }

    update(iteration){
        if(this.alive && !this.won){
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
            this.y = 450
            this.vy = 0
        }
        if(this.x < 0) this.x=0
        if(this.x > this.bounds-this.w) this.x=this.bounds-this.w
        this.onGround = (this.y >= 500-this.h)
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

    evaluate(goal){
        let a = Math.pow(goal.x+50 - this.x, 2)
        let b = Math.pow(goal.y - this.y, 2)
        this.fitness = Math.sqrt(a + b)
        if(!this.alive){
            this.fitness += 100
        }
    }
    
    dead(){
        this.alive=false
    }

    win(){
        this.won = true
    }

    reset(){
        this.x = this.initx
        this.y = this.inity
        this.alive = true
        this.won = false
    }
}