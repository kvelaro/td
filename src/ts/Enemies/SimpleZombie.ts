import Game from "../Game";
import Cell from "../Cell";
import zombie from '../../images/zombie1.png'
import Invader from "../Invader";
import Defender from "../Defender";
import Collision from "../Collision";

const IMAGE_WIDTH = 600
const IMAGE_HEIGHT = 500

export default class SimpleZombie extends Invader {
    private game: Game
    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = Cell.width - 2
        this.height = Cell.height - 2
        this.image = new Image(this.width, this.height)
        this.image.src = zombie
        this.speed = 2
        this.currentSpeed = this.speed
    }

    draw(): void {
        let ctx = this.game.context()
        ctx.drawImage(this.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, this.x, this.y, this.w(), this.h())
    }

    update(): void {
        let objects = this.game.objects
        for(let i = 0; i < objects.length; i++) {
            if(objects[i] instanceof Defender && Collision(objects[i], this)) {
                this.currentSpeed = 0
            }
        }
        this.x += this.currentSpeed * -1
        if(this.x <= -100) {
            this.game.over()
        }
    }
}