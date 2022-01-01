import GameObject from "./GameObject";
import Bullet from "./Bullet";

export default abstract class Defender extends GameObject {

    protected image: HTMLImageElement
    public health: number
    protected power: number
    protected timer: number
    protected bullets: Array<Bullet>

    constructor(x: number, y: number) {
        super(x, y);
        this.health = 100
        this.bullets = []
        this.timer = 0
    }
}