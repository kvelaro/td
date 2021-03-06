import Game from "../Game";
import Cell from "../Cell";
import Bullet from "../Bullet";

export default class SergeantBullet extends Bullet {
    constructor(game: Game, x: number, y: number) {
        super(x, y);
        this.game = game
        this.width = 7
        this.height = 7
        this.speed = 5
        this.damage = 7
    }

    draw() {
        this.game.context().fillStyle = '#f0f'
        this.game.context().fillRect(this.x + Cell.width, this.y + Cell.height / 2, this.width, this.height)
    }

    public isDeleted(): boolean {
        return this.delete
    }
}