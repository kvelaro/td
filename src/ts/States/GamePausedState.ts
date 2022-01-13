import Game from "../Game";
import GamePlayingState from "./GamePlayingState";
import GameState from "./GameState";

export default class GamePausedState extends GameState {
    protected game: Game
    constructor(game: Game) {
        super()
        this.game = game
    }

    enter() {
        super.enter()
        this.game.paused()
    }

    handleInput(event: KeyboardEvent): void {
        if(event.code == 'Escape' && event.type == 'keydown') {
            this.game.setState(new GamePlayingState(this.game))
        }
    }

    public run(): void {
    }
}