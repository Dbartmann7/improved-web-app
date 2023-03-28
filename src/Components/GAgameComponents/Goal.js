import {Entity} from "./Entity.js"
export class Goal extends Entity{
    constructor(w,h,x,y){
        super(w,h,x,y)
    }

    draw(context){
        context.fillStyle = "yellow"
        context.fillRect(this.x, this.y, this.w, this.h)
        
    }
}