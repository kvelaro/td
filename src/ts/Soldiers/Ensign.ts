import Game from "../Game";
import Defender from "../Defender";
import Cell from "../Cell";
import angrySheriff from '../../images/angry-sheriff.png'
import EnsignBullet from "../Bullets/EnsignBullet";

const IMAGE_WIDTH = 678
const IMAGE_HEIGHT = 859

export default class Ensign extends Defender {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y)
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = angrySheriff
    }

    draw(): void {
        let ctx = this.game.context()
        ctx.save()
        ctx.fillStyle = '#000'
        ctx.font = '12px Arial'
        ctx.fillText(`Ensign ${this.health}`, this.x, this.y, this.width)
        ctx.restore()

        let self = this

        ctx.drawImage(self.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, self.x, self.y, self.w(), self.h())

        if(this.timer++ % 100 == 0) {
            this.bullets.push(new EnsignBullet(this.game, this.x, this.y))
        }
        this.bullets.forEach(function(bullet) {
            bullet.draw()
        })
    }
}