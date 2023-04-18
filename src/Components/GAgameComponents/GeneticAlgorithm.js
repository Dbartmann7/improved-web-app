import Moves from "./Moves.js"

export class GeneticAlgorithm{
    constructor(popSize, sAlgorithm, cRate, mRate, tourSize, crossoverType){
        this.popSize = popSize
        this.sAlgorithm = sAlgorithm
        this.cRate = cRate
        this.mRate = mRate
        this.tourSize = tourSize
        this.crossoverType = crossoverType
    }

    evolve(population, numMoves){
        let parents = []
        let newPopulation = []

        switch(this.sAlgorithm){
            case "tour":
                parents = this.TourSelection(population)
                break
            case "roul":
                parents = this.RoulSelection(population)
                break
            case "rank":
                parents = this.RankSelection(population)
                break
            default:
                alert("selection algorithm not recognised")
                break

        } 
        // if(this.sAlgorithm = "tour"){
        //     parents = this.TourSelection(population, tourSize)
        // }

        for(let i=0; i<this.popSize/2; i++){
            if(i===Math.floor(this.popSize/2) && this.popSize % 2 === 1 && this.sAlgorithm === "tour"){
                newPopulation.push(population[parents[0]].clone())
                console.log(newPopulation.length)
                return newPopulation
            }
            let par1index = parents.splice(Math.floor(Math.random() * parents.length), 1)
            let par2index = parents.splice(Math.floor(Math.random() * parents.length), 1)
            // while(par2index === par1index){
            //     par2index = parents[Math.floor(Math.random() * parents.length)]
            // }
            let parent1 = population[par1index].clone()
            let parent2 = population[par2index].clone()

            let child1 = parent1.clone()
            let child2 = parent2.clone()

            if(Math.random() < this.cRate){
                switch(this.crossoverType){
                    case "single":
                        this.singlePointCrossover(parent1, parent2, child1, child2, numMoves)
                        break
                    case "double":
                        this.doublePointCrossover(parent1, parent2, child1, child2, numMoves)
                        break
                    default:
                        console.log("crossover type not recognised")
                }
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
                let oldMove = child1.moves[mPoint]
                let newMove = Moves[Math.floor(Math.random()*Moves.length)]
                while(newMove === oldMove){
                    newMove = Moves[Math.floor(Math.random()*Moves.length)]
                }
                child1.moves[mPoint] = newMove
                
                oldMove = child2.moves[mPoint]
                newMove = Moves[Math.floor(Math.random()*Moves.length)]
                while(newMove === oldMove){
                    newMove = Moves[Math.floor(Math.random()*Moves.length)]
                }
                child2.moves[mPoint] = newMove
            }

            newPopulation.push(child1)
            newPopulation.push(child2)
        }
        return newPopulation
    }

    TourSelection(population){
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
        for(let i=0; i<population.length; i++){
            let participents = []
            let winner = NaN
            for(let j=0; j<this.tourSize; j++){
                participents.push(Math.floor(Math.random()*population.length))
                population[participents[j]].evaluate()
                
                if(j == 0 || population[winner].fitness < population[participents[j]].fitness){
                    winner = participents[j]
                }
            }
            parents.push(winner)
        }
        return parents
    }

    RoulSelection(population){
        let parents = []
        let probabilities = []
        
        let sum=0
        for(let i=0; i<population.length; i++){
            population[i].evaluate()
            sum += population[i].fitness
        }

        population.sort((a,b) => b.fitness-a.fitness)

        for(let i=0; i<population.length; i++){
            probabilities.push(population[i].fitness/sum)
            console.log(population[i].fitness)
        }

        let x = Math.random()
        for(let j=0; j<population.length; j++){
            for(let i=0; i<probabilities.length; i++){
                if(x<=probabilities[i]){
                    parents.push(i)
                    break
                }else{
                    x -= probabilities[i]
                }
            }
        }
        
        
        return parents
    }

    RankSelection(population){
        let parents = []
      
        function compare(a, b){
            if(a.fitness>b.fitness){
                return 1 
            }else{
                return -1
            }
        }
        let sum = 0
        for(let i=0; i<population.length; i++){
            population[i].evaluate()
            sum += i+1
        }

        population = population.sort(compare)

        for(let i=0; i<population.length; i++){
            let x = Math.floor(Math.random() * sum + 1)
            for(let j=0; j<population.length; j++){
                if(x<=j+1){
                    parents.push(j)
                    break
                }else{
                    x -= j+1
                }
            }
        }

        console.log(parents)
        return parents
    }

    singlePointCrossover(parent1, parent2, child1, child2, numMoves){
        let cPoint =  Math.floor(Math.random()*numMoves)
        child1.moves = parent1.moves.slice(0, cPoint).concat(parent2.moves.slice(cPoint))
        child2.moves = parent2.moves.slice(0, cPoint).concat(parent1.moves.slice(cPoint))
    }

    doublePointCrossover(parent1, parent2, child1, child2, numMoves){
        let cPoint1 =  Math.floor(Math.random()*numMoves)
        let cPoint2 =  Math.floor(Math.random()* (numMoves - cPoint1))
        child1.moves = parent1.moves.slice(0, cPoint1).concat(parent2.moves.slice(cPoint1, cPoint2).concat(parent1.moves.slice(cPoint2)))
        child2.moves = parent2.moves.slice(0, cPoint1).concat(parent1.moves.slice(cPoint1, cPoint2).concat(parent2.moves.slice(cPoint2)))
    }
}