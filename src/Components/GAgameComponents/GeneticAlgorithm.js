
import { Moves } from "./Moves"
export class GeneticAlgorithm{
    constructor(sAlgorithm, cRate, mRate, ){
        this.sAlgorithm = sAlgorithm
        this.cRate = cRate
        this.mRate = mRate
    }

    evolve(population, numMoves, tourSize){
        let parents = []
        let newPopulation = []
        if(this.sAlgorithm = "tour"){
            parents = this.TourSelection(population, tourSize)
        }

        for(let i=0; i<population.length; i++){
            let par1index = Math.floor(Math.random() * parents.length)
            let par2index = Math.floor(Math.random() * parents.length)
            while(par2index === par1index){
                par2index = Math.floor(Math.random() * parents.length)
            }
            let parent1 = parents[par1index]
            let parent2 = parents[par2index]

            let child1 = parent1
            let child2 = parent2

            if(Math.random() < this.cRate){
                let cPoint =  Math.floor(Math.random()*numMoves)
                child1.moves = parent1.moves.slice(0, cPoint).concat(parent2.moves.slice(cPoint))
                child2.moves = parent2.moves.slice(0, cPoint).concat(parent1.moves.slice(cPoint))
            }
            if(Math.random()<this.mRate){
                // let block = null
                // let roll = Math.random()
                // for(let i=0; i<this.game.blockProbabilities.length; i++){
                //     if(roll<=this.game.blockProbabilities[i]){
                //         block = i
                //         break
                //     }else{
                //         roll -= this.game.blockProbabilities[i]
                //     }
                // }
                

                // moves mpoint to specified block then chooses a random index in that block
                // e.g. mpoint = block2 + index 3
                // let mPoint = (this.game.movesInc * block) + (Math.floor(Math.random()*this.game.movesInc))
                let mPoint = (Math.floor(Math.random()*population[0].moves.length))
                let oldMove = child1[mPoint]
                let newMove = Moves[Math.floor(Math.random()*Moves.length)]
                while(newMove === oldMove){
                    newMove = Moves[Math.floor(Math.random()*Moves.length)]
                }
                child1[mPoint] = newMove
                
                oldMove = child2[mPoint]
                newMove = Moves[Math.floor(Math.random()*Moves.length)]
                while(newMove === oldMove){
                    newMove = Moves[Math.floor(Math.random()*Moves.length)]
                }
                child2[mPoint] = newMove
            }
            newPopulation.push(child1)
            newPopulation.push(child2)
        }
        return newPopulation
    }

    TourSelection(population, tourSize){
        // let parents = []
        // for(let i=0; i<this.game.popSize; i++){
        //     let participents = []
        //     let winner = NaN
        //     for(let j=0; j<tourSize; j++){
        //         participents.push(this.game.population[Math.floor(Math.random()*this.game.popSize)])
        //         participents[j].evaluate()
        //         if(j == 0 || winner.fitness < participents[j].fitness){
        //             winner = participents[j]
        //         }
        //     }
        //     parents.push(winner)
        // }
        // return parents
        let parents = []
        for(let i=0; i<20; i++){
            let participents = []
            let winner = NaN
            for(let j=0; j<tourSize; j++){
                participents.push(population[Math.floor(Math.random()*population.length)])
                if(j == 0 || winner.fitness < participents[j].fitness){
                    winner = participents[j]
                }
            }
            parents.push(winner)
        }
        return parents
    }
}
