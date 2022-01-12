import Game from "../Game";
import Cell from "../Cell";
import Bullet from "../Bullet";

export default class LieutenantBullet extends Bullet {
    protected speed: number
    constructor(game: Game, x: number, y: number) {
        super(x, y);
        this.game = game
        this.width = 9
        this.height = 9
        this.speed = 7
        this.damage = 10
    }

    draw() {
        this.game.context().fillStyle = '#afa'
        this.game.context().fillRect(this.x + Cell.width, this.y + Cell.height / 2, this.width, this.height)
    }

    public isDeleted(): boolean {
        return this.delete
    }
}