import GameObject from "./interfaces/GameObject"
import Game from "./Game"
import grassImage from '../images/grass.jpg'

const CELL_WIDTH = 100
const CELL_HEIGHT = 100

export default class Cell implements GameObject {

    private game: Game
    private x: number
    private y: number
    private image: HTMLImageElement
    public static width: number = CELL_WIDTH
    public static height: number = CELL_HEIGHT

    constructor(game: Game, x: number, y: number) {
        this.game = game
        this.x = x
        this.y = y
        this.image = new Image()
        this.image.src = grassImage
    }

    draw(): void {
        this.game.context().strokeStyle = '#ccc'
        this.game.context().strokeRect(this.x, this.y, Cell.width, Cell.height)
        this.game.context().drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, Cell.width, Cell.height)
    }

    update(): void {

    }

}