export default abstract class GameObject {
    public x: number
    public y: number
    protected width: number
    protected height: number
    public delete: boolean

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.delete = false
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