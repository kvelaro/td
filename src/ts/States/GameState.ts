import State from "../State";
import Game from "../Game";

export default abstract class GameState extends State {

    protected game: Game

    public constructor(game: Game) {
        super()
        this.game = game
        this.game.objects = []
    }

    public abstract run(): void
}