export class Cube {
    constructor(w, h, x, y, id, game){
        this.id = id
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.game = game
        this.speed=5
		
    }

    update(){
        this.y += this.speed
    }

    draw(context){
        context.fillStyle = "black"
        context.fillRect(this.x-5, this.y-5, this.w+10, this.h+10) 
        context.fillStyle = "green"
        context.fillRect(this.x, this.y, this.w, this.h) 
    }
}