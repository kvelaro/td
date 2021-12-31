import GameObject from "./GameObject";

export default class Pixel extends GameObject {
    constructor(x: number, y: number) {
        super(x, y)
        this.width = 1
        this.height = 1
    }

    draw(): void {
    }

    update(): void {
    }

}