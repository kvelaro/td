import GameObject from "./GameObject";
import Bullet from "./Bullet";
import Defender from "./Defender";
import Collision from "./Collision";
import Game from "./Game";
import Cell from "./Cell";

export default abstract class Invader extends GameObject {
    protected game: Game
    protected image: HTMLImageElement
    public health: number
    protected power: number
    protected currentSpeed: number
    protected speed: number
    public delete: boolean

    constructor(game: Game, x: number, y: number) {
        super(x, y);
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.health = 100
    }

    update(): void {
        let objects = this.game.objects
        for(let i = 0; i < objects.length; i++) {
            if(objects[i] instanceof Defender && Collision(objects[i], this)) {
                this.currentSpeed = 0
            }
        }
        this.x += this.currentSpeed * -1
        if(this.x <= -100) {
            this.game.over()
        }
    }
}