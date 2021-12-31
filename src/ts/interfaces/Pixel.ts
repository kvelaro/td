import GameObject from "../GameObject";

const TYPE = 'pixel'

export default class Pixel extends GameObject {
    constructor(x: number, y: number) {
        super(x, y)
        this.width = 1
        this.height = 1
        this.type = TYPE
    }

    draw(): void {
    }

    update(): void {
    }

}