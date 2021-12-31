export default abstract class GameObject {
    public x: number
    public y: number
    protected width: number
    protected height: number
    protected type: string

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public w(): number {
        return this.width
    }

    public h(): number {
        return this.height
    }

    draw(): void {
    }

    update(): void {

    }
}