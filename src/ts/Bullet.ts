import GameObject from "./GameObject";
import Game from "./Game";

export default abstract class Bullet extends GameObject {
    protected game: Game
    protected speed: number
    public damage: number

    public isDeleted(): boolean {
        return this.delete
    }

    public update() {

    }
}