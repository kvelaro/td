import Game from "./Game";
import Defender from "./Defender";
import Cell from "./Cell";
import angrySheriff from '../images/angry-sheriff.png'

const IMAGE_WIDTH = 840
const IMAGE_HEIGHT = 859

export default class Ensign extends Defender {
    private game: Game

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = angrySheriff
        this.health = 100
        this.power = 15
    }

    draw(): void {
        let ctx = this.game.context()

        ctx.font = '12px Arial'
        ctx.fillText('Ensign', this.x, this.y, this.width)

        let self = this

        ctx.drawImage(self.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, self.x, self.y, self.w(), self.h())

    }

    update(): void {
    }
}