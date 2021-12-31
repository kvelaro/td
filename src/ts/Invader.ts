import GameObject from "./GameObject";
import Bullet from "./Bullet";

export default abstract class Invader extends GameObject {

    protected image: HTMLImageElement
    protected health: number
    protected power: number
    protected speed: number

    constructor(x: number, y: number) {
        super(x, y);
        this.health = 100
    }
}