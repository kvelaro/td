import GameObject from "./GameObject";
import Bullet from "./Bullet";
import Game from "./Game";
import Invader from "./Invader";
import Collision from "./Collision";

export default abstract class Defender extends GameObject {
    protected game: Game
    protected image: HTMLImageElement
    public health: number
    public damage: number
    protected timer: number
    protected bullets: Array<Bullet>

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.health = 100
        this.bullets = []
        this.timer = 0
        this.damage = 0
    }
    update() {
        let objects = this.game.objects
        for(let i = 0; i < objects.length; i++) {
            if(objects[i] instanceof Invader && Collision(objects[i], this)) {
                let object = <Invader>objects[i]
                this.health -= object.damage
                if(this.health <= 0) {
                    this.delete = true
                }
            }
        }
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