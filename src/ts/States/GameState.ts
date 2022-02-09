import State from "../State";
import Game from "../Game";

export default abstract class GameState extends State {

    protected game: Game
    protected href: State
    public constructor(game: Game) {
        super()
        this.game = game
    }

    public enter() {
        super.enter()
        this.game.objects = []
    }

    public abstract run(): void
}