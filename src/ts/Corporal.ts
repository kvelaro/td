import Game from "./Game";
import Defender from "./Defender";
import Cell from "./Cell";
import funnyFox  from '../images/funny-fox.png'

const IMAGE_WIDTH = 417
const IMAGE_HEIGHT = 434

export default class Corporal extends Defender {
    private game: Game

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = funnyFox
        this.health = 100
        this.power = 15
    }

    draw(): void {
        let ctx = this.game.context()

        ctx.font = '12px Arial'
        ctx.fillText('Corporal', this.x, this.y, this.width)

        let self = this

        ctx.drawImage(self.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, self.x, self.y, self.w(), self.h())

    }

    update(): void {
    }
}