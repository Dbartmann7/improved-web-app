//The Population Class
//Here is where the power of all the classes
import Player from "./Player.js";

//comes together to destroy the game score records
export default class Population{
	constructor(size, playerData, bounds){
		this.population = [];
		this.bestScore = 0;
		this.size = size;

		this.generation = 0;
		this.matingPool = [];

		this.bounds = bounds;

		for(let i = 0; i < size; i++){
			this.population.push(new Player(playerData.w,playerData.h,playerData.x,playerData.y));
			this.population[i].brain.generateNetwork();
			this.population[i].brain.mutate();
		}
	}

	updateAlive(nearestBall){
		for(let i = 0; i < this.population.length; i++){
			if(!this.population[i].dead){
				this.population[i].look(nearestBall);
				this.population[i].think();
				this.population[i].move();
				this.population[i].checkBounds(this.bounds)
				this.population[i].update(nearestBall)
			}
		}
	}

	done(){
		for(let i = 0; i < this.population.length; i++){
			if(!this.population[i].dead){
				return false;
			}
		}
		
		return true;
	}
	
	naturalSelection(){
		this.calculateFitness();
		
		let children = [];
		
		this.fillMatingPool();
		for(let i = 0; i < this.population.length; i++){
			let parent1 = this.selectPlayer();
			let parent2 = this.selectPlayer();
			if(parent1.fitness > parent2.fitness)
				children.push(parent1.crossover(parent2));
			else
				children.push(parent2.crossover(parent1));
		}


		this.population.splice(0, this.population.length);
		this.population = children.slice(0);
		this.generation++;
		this.population.forEach((element) => { 
			element.brain.generateNetwork();
		});	
		this.bestScore = 0
		this.numAlive = this.size
		console.log("Generation " + this.generation);
		//console.log(this);
	}

	calculateFitness(){
		let currentMax = 0;
		this.population.forEach((element) => { 
			element.calculateFitness();
			if(element.fitness > currentMax)
				currentMax = element.fitness;
		});
		

		//Normalize
		this.population.forEach((element, elementN) => { 
			if(currentMax > 0){
				element.fitness /= currentMax;
			}
		});
	}

	fillMatingPool(){
		this.matingPool.splice(0, this.matingPool.length);
		this.population.forEach((element, elementN) => { 
			let n = element.fitness * 100;
			for(let i = 0; i < n; i++)
				this.matingPool.push(elementN);
		});
	}

	selectPlayer(){
		let rand = Math.floor(Math.random() *  this.matingPool.length);
		return this.population[this.matingPool[rand]];
	}

	getBestScore(){
		for(let i=0; i<this.population.length; i++){
			if(this.population[i].score > this.bestScore){
				this.bestScore = this.population[i].score
			}
		}
		return this.bestScore
	}

	draw(ctx){
		for(let i=0; i<this.population.length; i++){
			this.population[i].draw(ctx)
		}
	}
}