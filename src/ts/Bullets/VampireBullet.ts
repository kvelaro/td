import Game from "../Game";
import Cell from "../Cell";
import Bullet from "../Bullet";
import Money from "../Money";
import Invader from "../Invader";
import Collision from "../Collision";
import Defender from "../Defender";

export default class VampireBullet extends Bullet {
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

    public update() {
        this.x -= this.speed
        if(this.x < 0) {
            this.delete = true
        }

        for(let i = 0; i < this.game.objects.length; i++) {
            let obj = this.game.objects[i]
            if(obj instanceof Defender && Collision(this, obj))  {
                obj.health -= this.damage
                if(obj.health <= 0) {
                    obj.delete = true
                }
                this.delete = true
            }
        }
    }

    public isDeleted(): boolean {
        return this.delete
    }
}