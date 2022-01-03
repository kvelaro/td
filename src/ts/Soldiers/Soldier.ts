import Game from "../Game";
import Defender from "../Defender";
import Cell from "../Cell";
import ninja from '../../images/ninja.png'
import SoldierBullet from "../Bullets/SoldierBullet";
import Invader from "../Invader";
import Collision from "../Collision";
import Bullet from "../Bullet";

const IMAGE_WIDTH = 250
const IMAGE_HEIGHT = 402

export default class Soldier extends Defender {
    private speed: number
    private currentSpeed: number
    private initialXPosition: number
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.initialXPosition = this.x
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = ninja
        this.speed = 2
        this.currentSpeed = this.speed
        this.damage = 5
    }

    draw(): void {
        super.draw()
        this.currentSpeed = this.speed
        if (!this.shooting && this.x != this.initialXPosition && this.x > this.initialXPosition) {
            this.x -= this.currentSpeed
        }
        let ctx = this.game.context()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '12px Arial'
        ctx.fillText(`Soldier ${this.health}`, this.x, this.y, this.width)
        ctx.restore()

        let self = this

        ctx.drawImage(self.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, self.x, self.y, self.w(), self.h())

        if(this.shooting) {
            if(this.timer++ % 100 == 0) {
                this.bullets.push(new SoldierBullet(this.game, this.x, this.y))
            }
            this.bullets.forEach(function(bullet) {
                bullet.draw()
            })
        }
    }

    update() {
        if(this.shooting) {
            this.x += this.currentSpeed
        }
        let objects = this.game.objects
        let invaders = objects.filter(function(object) {
            return object instanceof Invader
        })
        //collision detection between invader and defender
        for(let i = 0; i < invaders.length; i++) {
            let invader = <Invader>invaders[i]
            //console.log(invader instanceof Invader)
            if(Collision(invader, this)) {
                this.currentSpeed = 0
                this.health -= invader.damage
                invader.health -= this.damage
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
                        this.shooting = false
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