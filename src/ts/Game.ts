import GameObject from "./interfaces/GameObject";
import Cell from "./Cell";

export default class Game {
    private ctx: CanvasRenderingContext2D
    private width: number
    private height: number
    private gameObjects: Array<GameObject>
    constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.gameObjects = []
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
        this.gameObjects.forEach((object) => object.draw())
        this.gameObjects.forEach((object) => object.update())
    }

    private background(): void {
        let cellWidth = Cell.width
        let cellHeight = Cell.height
        let rows = this.w() / cellWidth
        let cols = this.h() / cellHeight
        for (let i = 0; i < rows; i++ ) {
            for (let j = 0; j < cols; j++ ) {
                this.gameObjects.push(new Cell(this, i * cellWidth, j * cellHeight))
            }
        }
    }
}