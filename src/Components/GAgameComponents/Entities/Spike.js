import {Entity} from "./Entity.js"

export class Spike extends Entity{
    constructor(w, h, x, y, upsideDown){
        super(w, h, x, y)
        this.upsideDown =upsideDown
    }
    draw(context){
        if(!this.upsideDown){
            context.beginPath()
            context.moveTo(this.x+(this.w/2), this.y)
            context.lineTo(this.x+this.w, this.y+this.h)
            context.lineTo(this.x, this.y+this.h)
            context.lineTo(this.x+(this.w/2), this.y)
            context.closePath()
        }else{
            context.beginPath()
            context.moveTo(this.x+(this.w/2), this.y + this.h)
            context.lineTo(this.x+this.w, this.y)
            context.lineTo(this.x, this.y)
            context.lineTo(this.x+(this.w/2), this.y + this.h)
            context.closePath()
        }
        

        // the outline
        context.lineWidth = 10;
        context.strokeStyle = '#666666';
        context.stroke();

        // the fill color
        context.fillStyle = "grey";
        context.fill();
    }
}