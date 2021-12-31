import GameObject from "./GameObject";
import Game from "./Game";
import chest from '../images/chest.png'

const IMAGE_WIDTH = 1000
const IMAGE_HEIGHT = 1000
const INITIAL_AMOUNT = 3000

export default class Money extends GameObject {
    private game: Game
    private image: HTMLImageElement
    private amount: number
    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = 75
        this.height = 75
        this.amount = INITIAL_AMOUNT
        this.image = new Image()
        this.image.src = chest
    }

    public addAmount(amount: number): void {
        this.amount += amount
    }

    public getAmount(): number {
        return this.amount
    }

    draw() {
        this.game.context().drawImage(this.image, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, this.x, this.y, this.width, this.height)
    }

    update() {
        this.game.context().font = '20px Arial'
        this.game.context().fillText(<string><unknown>this.amount, this.x, this.y + 20)
    }
}