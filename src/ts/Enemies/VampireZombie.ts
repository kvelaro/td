import Game from "../Game";
import Cell from "../Cell";
import zombie from '../../images/zombie2.png'
import Invader from "../Invader";

const IMAGE_WIDTH = 600
const IMAGE_HEIGHT = 500

export default class SoldierZombie extends Invader {
    private game: Game
    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = zombie
        this.speed = 10
    }

    draw(): void {
        let ctx = this.game.context()
        ctx.drawImage(this.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, this.x, this.y, this.w(), this.h())
    }

    update(): void {

    }
}