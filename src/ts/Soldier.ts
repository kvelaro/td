import Game from "./Game";
import Defender from "./Defender";
import Cell from "./Cell";

export default class Soldier extends Defender {
    private game: Game
    private width: number
    private height: number
    constructor(game: Game, x: number, y: number) {
        super()
        this.game = game
        this.x = x
        this.y = y
        this.health = 100
        this.power = 5
        this.width = Cell.width - 1
        this.height = Cell.height - 1
    }

    draw(): void {
        let ctx = this.game.context()
        ctx.fillStyle = '#070'
        ctx.font = '12px Arial'
        ctx.fillText('Soldier', this.x, this.y + this.height / 2, this.width)
        ctx.fillRect(this.x, this.y, this.width, this.health)
    }

    update(): void {
    }
}