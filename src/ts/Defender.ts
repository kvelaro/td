import GameObject from "./interfaces/GameObject";

export default abstract class Defender implements GameObject {
    protected x: number
    protected y: number
    protected health: number
    protected power: number

    draw(): void {
    }

    update(): void {
    }
}