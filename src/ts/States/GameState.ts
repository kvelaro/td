import State from "../State";
import Game from "../Game";

export default abstract class GameState extends State {

    protected game: Game
    protected href: State
    protected frame: number

    public constructor(game: Game) {
        super()
        this.game = game
        this.frame = 0
    }

    public enter() {
        super.enter()
        this.game.objects = []
    }

    public run(): void {
        this.frame++
    }

    public getFrame(): number {
        return this.frame
    }
}