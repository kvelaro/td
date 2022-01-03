import Game from "../Game";
import Defender from "../Defender";
import Cell from "../Cell";
import irelandSoldier from '../../images/ireland-soldier.png'
import LieutenantBullet from "../Bullets/LieutenantBullet";
import SoldierBullet from "../Bullets/SoldierBullet";

const IMAGE_WIDTH = 492
const IMAGE_HEIGHT = 566

export default class Lieutenant extends Defender {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = irelandSoldier
    }

    draw(): void {
        super.draw()
        let ctx = this.game.context()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '12px Arial'
        ctx.fillText(`Lieutenant ${this.health}`, this.x, this.y, this.width)
        ctx.restore()

        let self = this

        ctx.drawImage(self.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, self.x, self.y, self.w(), self.h())

        if(this.shooting) {
            if(this.timer++ % 100 == 0) {
                this.bullets.push(new LieutenantBullet(this.game, this.x, this.y))
            }
            this.bullets.forEach(function(bullet) {
                bullet.draw()
            })
        }
    }
}