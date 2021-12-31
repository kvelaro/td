import Game from "../Game";
import Defender from "../Defender";
import Cell from "../Cell";
import ninja from '../../images/ninja.png'
import SoldierBullet from "../Bullets/SoldierBullet";

const IMAGE_WIDTH = 600
const IMAGE_HEIGHT = 500

export default class Soldier extends Defender {
    private game: Game
    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = ninja
    }

    draw(): void {
        let ctx = this.game.context()

        ctx.font = '12px Arial'
        ctx.fillText('Soldier', this.x, this.y, this.width)

        let self = this

        ctx.drawImage(self.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, self.x, self.y, self.w(), self.h())

        if(this.timer++ % 100 == 0) {
            this.bullets.push(new SoldierBullet(this.game, this.x, this.y))
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