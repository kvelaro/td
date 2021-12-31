import GameObject from "./GameObject";
import Game from "./Game";

export default abstract class Bullet extends GameObject {
    protected game: Game
    protected speed: number
    protected delete: boolean
    protected damage: number

    public isDeleted(): boolean {
        return this.delete
    }
}