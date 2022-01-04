import Game from "../Game";
import Cell from "../Cell";
import Bullet from "../Bullet";
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
        let objects = this.game.objects
        let cells:Array<Cell> = []
        let defenders: Array<Defender> = []
        objects.forEach(function(object) {
            if(object instanceof Defender) {
                defenders.push(object)
            }
            if(object instanceof Cell) {
                cells.push(object)
            }
        })

        for(let i = 0; i < defenders.length; i++) {
            let object = defenders[i]
            if(Collision(this, object))  {
                object.health -= this.damage
                if(object.health <= 0) {
                    object.delete = true
                    cells.forEach(function(cell) {
                        if(cell.x == object.x - 1 && cell.y == object.y - 1) {
                            cell.defenderExist = false
                        }
                    })
                }
                this.delete = true
            }
        }
    }

    public isDeleted(): boolean {
        return this.delete
    }
}