import Game from "../Game";
import Cell from "../Cell";
import zombie from '../../images/zombie-soldier.png'
import Invader from "../Invader";

const IMAGE_WIDTH = 345
const IMAGE_HEIGHT = 486

export default class SoldierZombie extends Invader {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.image = new Image(this.width, this.height)
        this.image.src = zombie
        this.speed = 1
    }

    draw(): void {
        let ctx = this.game.context()
        ctx.drawImage(this.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, this.x, this.y, this.w(), this.h())
    }
}