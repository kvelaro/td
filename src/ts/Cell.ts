import Game from "./Game"
import grassImage from '../images/grass.jpg'
import GameObject from "./GameObject";

const CELL_WIDTH = 100
const CELL_HEIGHT = 100

export default class Cell extends GameObject {
    public static width: number = CELL_WIDTH
    public static height: number = CELL_HEIGHT

    private game: Game
    private image: HTMLImageElement
    private fullyDrawn: boolean = true

    protected row: number
    protected col: number

    public defenderExist: boolean

    constructor(game: Game, row: number, col: number) {
        super( col * CELL_WIDTH, row * CELL_HEIGHT)
        this.game = game
        this.row = row
        this.col = col
        this.image = new Image()
        this.image.src = grassImage
        if(this.x + Cell.width > this.game.w() || this.y + Cell.height > this.game.h()) {
            this.fullyDrawn = false
        }
        this.defenderExist = false
    }

    draw(): void {
        this.game.context().strokeStyle = '#ccc'
        if(!this.fullyDrawn) {
            this.game.context().strokeStyle = '#000'
        }
        this.game.context().strokeRect(this.x, this.y, Cell.width, Cell.height)
        this.game.context().drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, Cell.width, Cell.height)
    }

    update(): void {

    }

    public w(): number {
        return Cell.width
    }

    public h(): number {
        return Cell.height
    }

    public isFullyDrawn(): boolean {
        return this.fullyDrawn
    }
}