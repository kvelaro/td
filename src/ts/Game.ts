import Cell from "./Cell";
import InputHandler from "./InputHandler";
import GameObject from "./GameObject";

export default class Game {
    private gameCanvasElement: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private width: number
    private height: number
    public objects: Array<GameObject>
    constructor(gameScreen: HTMLCanvasElement, width: number, height: number) {
        this.gameCanvasElement = gameScreen
        this.ctx = gameScreen.getContext('2d')
        this.width = width
        this.height = height

        this.ctx.canvas.width  = this.width
        this.ctx.canvas.height = this.height

        this.objects = []

        new InputHandler(this)
    }

    public canvas(): HTMLCanvasElement {
        return this.gameCanvasElement
    }

    public context(): CanvasRenderingContext2D {
        return this.ctx
    }

    public w(): number {
        return this.width
    }

    public h(): number {
        return this.height
    }

    public start(): void {
       this.background()
    }

    public loop(): void {
        //generic section
        this.objects.forEach((object) => object.draw())
        this.objects.forEach((object) => object.update())
    }

    private background(): void {
        let cellWidth = Cell.width
        let cellHeight = Cell.height
        let rows = this.h() / cellHeight
        let cols = this.w() / cellWidth
        for (let i = 0; i < rows; i++ ) {
            for (let j = 0; j < cols; j++ ) {
                this.objects.push(new Cell(this, j * cellWidth, i * cellHeight))
            }
        }
    }


}