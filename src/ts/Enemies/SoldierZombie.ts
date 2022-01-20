import Game from "../Game";
import zombieSoldier from '../../images/zombie-soldier.png'
import Invader from "../Invader";

const IMAGE_WIDTH = 345
const IMAGE_HEIGHT = 486

export default class SoldierZombie extends Invader {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.image = new Image(this.width, this.height)
        this.image.src = zombieSoldier
        this.speed = 1
        this.currentSpeed = this.speed
        this.damage = 2
    }

    draw(): void {
        let ctx = this.game.context()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '12px Arial'
        ctx.fillText(`Soldier zombie ${this.health}`, this.x, this.y, this.width)
        ctx.restore()
        ctx.drawImage(this.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, this.x, this.y, this.w(), this.h())
    }
}