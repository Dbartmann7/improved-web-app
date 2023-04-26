//This class was taken from the NEATjs library by GabrialTavernini (Link: https://github.com/GabrielTavernini/NeatJS/tree/master/src)
// any code that has been altered by me or added will be clearly annotated. Any other code was made by Gabrial Tavernini

import { isColliding } from "./Collision.js";
import Genome from "./Genome.js";
export default class Player{
	constructor(w, h, x, y){
		this.brain = new Genome(3, 1);
		this.fitness = null;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

		this.initialx = x;
		
		this.speed = 10
		this.score = 1;

		this.dead = false;
		this.decisions = []; //Current Output values
		this.vision = []; //Current input values

        this.collidingWith = null;
	}

	clone() { //Returns a copy of this player
		let clone = new Player();
		clone.brain = this.brain.clone();
		return clone;
	}

	crossover(parent){ //Produce a child
		let child = new Player(this.w, this.h, this.initialx, this.y);
		if(parent.fitness < this.fitness)
			child.brain = this.brain.crossover(parent.brain);
		else
			child.brain = parent.brain.crossover(this.brain);

		child.brain.mutate()
		return child;
	}


	// this function was altered by me
	look(nearestCube){
		
		let dist = Math.sqrt(((nearestCube.x) ^2) + ((this.y - nearestCube.y)^2))
		if(nearestCube.x < this.x){
			dist = -dist;
		}
        this.vision = [this.x/100, nearestCube.deadly, dist/100]
	}


	think(){
		this.decisions = this.brain.feedForward(this.vision);
	}

	// this function was altered by me
	move(){
		
		if(this.decisions[0] > 0.7){
            this.x += this.speed
        }
        if(this.decisions[0] < 0.3){
            this.x -= this.speed
        }
	}

	// this function was altered by me
    checkBounds(width){
        if(this.x < 0) this.x=0
        if(this.x > width-this.w) this.x=width-this.w
    }

	// this function was altered by me
	update(nearestBall){
		if(isColliding(nearestBall, this) && this.collidingWith === null){
            if(!nearestBall.deadly){
				this.score++;
            	this.collidingWith = nearestBall;
				
				console.log(this.brain.layers)
			}else{
				this.kill()
			}
			
        }
	}

	// this is a new function created by me
	kill(){
		this.dead = true;
	}

	// this is a new function created by me
    draw(context){
		context.fillStyle = "black"
        context.fillRect(this.x-5, this.y-5, this.w+10, this.h+10) 
		if(this.dead){
			context.fillStyle ="red"
		}else{
			context.fillStyle = "green"
		}
        context.fillRect(this.x, this.y, this.w, this.h) 
		
		
    }

	// this function was altered by me
	calculateFitness(){ 
		this.fitness = this.score;
		if(this.score > 0){
			this.fitness /= this.brain.calculateWeight();
		}
		
	}
}