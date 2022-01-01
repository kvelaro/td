import GameObject from "./GameObject";
import Bullet from "./Bullet";

export default abstract class Invader extends GameObject {

    protected image: HTMLImageElement
    public health: number
    protected power: number
    protected currentSpeed: number
    protected speed: number
    public delete: boolean

    constructor(x: number, y: number) {
        super(x, y);
        this.health = 100
    }
}