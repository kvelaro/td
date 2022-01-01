import GameObject from "./GameObject";
import Bullet from "./Bullet";
import Game from "./Game";
import Invader from "./Invader";

export default abstract class Defender extends GameObject {
    protected game: Game
    protected image: HTMLImageElement
    public health: number
    protected power: number
    protected timer: number
    protected bullets: Array<Bullet>

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.health = 100
        this.bullets = []
        this.timer = 0
    }
    update() {
        //if bullets marked as deleted, delete them
        // for(let i = 0; i < this.bullets.length; i++) {
        //     if (this.bullets[i].isDeleted()) {
        //         this.bullets.splice(i, 1)
        //     } else {
        //         this.bullets[i].update()
        //     }
        // }
    }
}