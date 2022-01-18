import Game from "../Game";
import zombie from '../../images/zombie1.png'
import Invader from "../Invader";

const IMAGE_WIDTH = 600
const IMAGE_HEIGHT = 500

export default class SimpleZombie extends Invader {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.image = new Image(this.width, this.height)
        this.image.src = zombie
        this.speed = 2
        this.currentSpeed = this.speed
    }

    draw(): void {
        let ctx = this.game.context()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '12px Arial'
        ctx.fillText(`Simple zombie ${this.health}`, this.x, this.y, this.width)
        ctx.restore()
        ctx.strokeRect(this.x, this.y, this.w(), this.h())
        ctx.drawImage(this.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, this.x, this.y, this.w(), this.h())
    }
}