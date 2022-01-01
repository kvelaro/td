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
        let invaders = objects.filter(function(object) {
            return object instanceof Invader
        })
        //collision detection between invader and defender
        for(let i = 0; i < invaders.length; i++) {
            let invader = <Invader>invaders[i]
            //console.log(invader instanceof Invader)
            if(Collision(invader, this)) {
                this.health -= invader.damage
                if(this.health <= 0) {
                    this.delete = true
                }
            }
        }
        //collision detection between bullet and invader
        for(let i = 0; i < this.bullets.length; i++) {
            let bullet = <Bullet>this.bullets[i]
            for(let j = 0; j < invaders.length; j++) {
                let invader = <Invader>invaders[j]
                if(Collision(this.bullets[i], invader)) {
                    invader.health -= bullet.damage
                    if(invader.health <= 0) {
                        invader.delete = true
                    }
                }
            }
        }
        //if bullets marked as deleted, delete them
        for(let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].isDeleted()) {
                this.bullets.splice(i, 1)
            } else {
                this.bullets[i].update()
            }
        }
    }
}