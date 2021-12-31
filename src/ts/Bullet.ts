import GameObject from "./GameObject";
import Game from "./Game";

export default class Bullet extends GameObject {
    private game: Game
    protected radius: number
    protected speed: number
    constructor(game: Game, x: number, y: number) {
        super(x, y);
        this.radius = 10
        this.speed = 3
    }

    draw() {
        this.game.context().fillStyle = '#fff'
        this.game.context().arc(this.x, this.y, this.radius, 0, Math.PI)
    }

    update() {
        this.x += this.speed
    }
}