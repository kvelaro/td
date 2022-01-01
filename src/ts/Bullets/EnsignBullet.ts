import Game from "../Game";
import Cell from "../Cell";
import Bullet from "../Bullet";

export default class EnsignBullet extends Bullet {
    protected speed: number
    constructor(game: Game, x: number, y: number) {
        super(x, y);
        this.game = game
        this.width = 7
        this.height = 7
        this.speed = 5
        this.damage = 9
    }

    draw() {
        this.game.context().fillStyle = '#050'
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