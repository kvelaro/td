import Game from "../Game";
import Cell from "../Cell";
import Bullet from "../Bullet";

export default class SoldierBullet extends Bullet {
    constructor(game: Game, x: number, y: number) {
        super(x, y);
        this.game = game
        this.width = 5
        this.height = 5
        this.speed = 3
        this.damage = 5
    }

    draw() {
        this.game.context().fillStyle = '#fff'
        this.game.context().fillRect(this.x + Cell.width, this.y + Cell.height / 2, this.width, this.height)
    }

    public isDeleted(): boolean {
        return this.delete
    }
}