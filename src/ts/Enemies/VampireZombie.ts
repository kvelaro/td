import Game from "../Game";
import Cell from "../Cell";
import zombie from '../../images/zombie2.png'
import Invader from "../Invader";
import VampireBullet from "../Bullets/VampireBullet";
import Bullet from "../Bullet";
import Collision from "../Collision";
import Defender from "../Defender";

const IMAGE_WIDTH = 330
const IMAGE_HEIGHT = 352

export default class VampireZombie extends Invader {
    protected timer: number
    protected bullets: Array<VampireBullet>
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.image = new Image(this.width, this.height)
        this.image.src = zombie
        this.speed = 1
        this.currentSpeed = this.speed
        this.timer = 0
        this.bullets = []
    }

    draw(): void {
        let ctx = this.game.context()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '12px Arial'
        ctx.fillText(`Vampire zombie ${this.health}`, this.x, this.y, this.width)
        ctx.restore()
        ctx.drawImage(this.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, this.x, this.y, this.w(), this.h())

        if(this.timer++ % 150 == 0) {
            this.bullets.push(new VampireBullet(this.game, this.x, this.y))
        }
        this.bullets.forEach(function(bullet) {
            bullet.draw()
        })
    }

    update() {
        super.update()
        let objects = this.game.objects
        let defenders: Array<Defender> = []
        let cells: Array<Cell> = []
        objects.forEach(function(object) {
            if(object instanceof Defender) {
                defenders.push(object)
            }
            if(object instanceof Cell) {
                cells.push(object)
            }
        })
        //collision detection between bullet and defender
        for(let i = 0; i < this.bullets.length; i++) {
            let bullet = <Bullet>this.bullets[i]
            for(let j = 0; j < defenders.length; j++) {
                let defender = <Defender>defenders[j]
                if(Collision(this.bullets[i], defender)) {
                    defender.health -= bullet.damage
                    if(defender.health <= 0) {
                        defender.delete = true
                        let self = this
                        cells.forEach(function(cell) {
                            if(cell.x == self.x - 1 && cell.y == self.y - 1) {
                                cell.defenderExist = false
                            }
                        })
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