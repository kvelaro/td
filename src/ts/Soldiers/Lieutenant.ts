import Game from "../Game";
import Defender from "../Defender";
import Cell from "../Cell";
import irelandSoldier from '../../images/ireland-soldier.png'
import LieutenantBullet from "../Bullets/LieutenantBullet";

const IMAGE_WIDTH = 492
const IMAGE_HEIGHT = 566

export default class Lieutenant extends Defender {
    private game: Game

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = irelandSoldier
    }

    draw(): void {
        let ctx = this.game.context()

        ctx.font = '12px Arial'
        ctx.fillText('Lieutenant', this.x, this.y, this.width)

        let self = this

        ctx.drawImage(self.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, self.x, self.y, self.w(), self.h())

        if(this.timer++ % 100 == 0) {
            this.bullets.push(new LieutenantBullet(this.game, this.x, this.y))
        }
        this.bullets.forEach(function(bullet) {
            bullet.draw()
        })
    }

    update(): void {
        for(let i = 0; i < this.bullets.length; i++) {
            if(this.bullets[i].isDeleted()) {
                this.bullets.splice(i, 1)
            }
            this.bullets[i].update()
        }
    }
}