import Game from "./Game";
import Defender from "./Defender";
import Cell from "./Cell";
import aborigen from '../images/aborigen.png'

const IMAGE_WIDTH = 532
const IMAGE_HEIGHT = 433

export default class Sergeant extends Defender {
    private game: Game

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = aborigen
        this.health = 100
        this.power = 7
    }

    draw(): void {
        let ctx = this.game.context()

        ctx.font = '12px Arial'
        ctx.fillText('Sergeant', this.x, this.y, this.width)

        let self = this

        ctx.drawImage(self.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, self.x, self.y, self.w(), self.h())

    }

    update(): void {
    }
}