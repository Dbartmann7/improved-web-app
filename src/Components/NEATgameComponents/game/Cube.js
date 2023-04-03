export class Cube {
    constructor(w, h, x, y, id, deadlyChance){
        this.id = id
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.speed=5
        this.deadly = null
		if(deadlyChance < 0.7){
            this.deadly = false
        }else{
            this.deadly = true
        }
    }

    update(){
        this.y += this.speed
    }

    draw(context){
        context.fillStyle = "black"
        context.fillRect(this.x-5, this.y-5, this.w+10, this.h+10) 
        if(this.deadly){
            context.fillStyle = "red"
        }else{
            context.fillStyle = "green"
        }
        
        context.fillRect(this.x, this.y, this.w, this.h) 
    }
}