import GameObject from "./GameObject";

export default abstract class Defender extends GameObject {

    protected image: HTMLImageElement
    protected health: number
    protected power: number

}