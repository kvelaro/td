import Game from "../Game";
import Cell from "../Cell";
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
        ctx.drawImage(this.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, this.x, this.y, this.w(), this.h())
    }
}