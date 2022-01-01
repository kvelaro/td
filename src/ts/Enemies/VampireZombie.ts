import Game from "../Game";
import Cell from "../Cell";
import zombie from '../../images/zombie2.png'
import Invader from "../Invader";

const IMAGE_WIDTH = 600
const IMAGE_HEIGHT = 500

export default class VampireZombie extends Invader {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.image = new Image(this.width, this.height)
        this.image.src = zombie
        this.speed = 1
        this.damage = 1
    }

    draw(): void {
        let ctx = this.game.context()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '12px Arial'
        ctx.fillText(`Vampire zombie ${this.health}`, this.x, this.y, this.width)
        ctx.restore()
        ctx.drawImage(this.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, this.x, this.y, this.w(), this.h())
    }
}