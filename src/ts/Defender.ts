import GameObject from "./GameObject";
import Bullet from "./Bullet";
import Game from "./Game";
import Invader from "./Invader";
import Collision from "./Collision";
import Cell from "./Cell";

export default abstract class Defender extends GameObject {
    protected game: Game
    protected image: HTMLImageElement
    public health: number
    public damage: number
    protected timer: number
    protected bullets: Array<Bullet>
    protected shooting: boolean
    protected static price: number

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.health = 100
        this.bullets = []
        this.timer = 0
        this.damage = 0
        this.shooting = false
    }

    public static getPrice() {
        return this.price
    }

    draw() {
        super.draw()
        this.shooting = false
        let self = this
        this.game.objects.forEach(function (object) {
            if(object instanceof Invader && self.y == object.y) {
                self.shooting = true
            }
        })
    }

    update() {
        let objects = this.game.objects
        let invaders:Array<Invader> = []
        let cells:Array<Cell> = []
        objects.forEach(function(object) {
            if(object instanceof Invader) {
                invaders.push(object)
            }
            if(object instanceof Cell) {
                cells.push(object)
            }
        })

        //collision detection between invader and defender
        for(let i = 0; i < invaders.length; i++) {
            let invader = <Invader>invaders[i]
            if(Collision(invader, this)) {
                this.health -= invader.damage
                if(this.health <= 0) {
                    this.delete = true
                    let self = this
                    cells.forEach(function(cell) {
                        if(cell.x == self.x - 1 && cell.y == self.y - 1) {
                            cell.defenderExist = false
                        }
                    })
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