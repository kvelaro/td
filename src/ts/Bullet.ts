import GameObject from "./GameObject";
import Game from "./Game";
import Cell from "./Cell";

export default class Bullet extends GameObject {
    private game: Game
    protected speed: number
    protected delete: boolean
    constructor(game: Game, x: number, y: number) {
        super(x, y);
        this.game = game
        this.width = 10
        this.height = 10
        this.speed = 3
        this.delete = false
    }

    draw() {
        this.game.context().fillStyle = '#fff'
        this.game.context().fillRect(this.x + Cell.width, this.y + Cell.height / 2, this.width, this.height)
    }

    update() {
        this.x += this.speed
        if(this.x >= this.game.w()) {
            this.delete = true
        }
    }

    public isDeleted(): boolean {
        return this.delete
    }
}