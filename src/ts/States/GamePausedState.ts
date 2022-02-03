import Game from "../Game";
import GamePlayingState from "./GamePlayingState";
import GameState from "./GameState";

export default class GamePausedState extends GameState {
    constructor(game: Game) {
        super(game)
    }

    enter() {
        super.enter()
        this.game.paused()
    }

    handleInput(event: KeyboardEvent): void {
        if(event.code == 'Escape' && event.type == 'keydown') {
            this.game.setState(new GamePlayingState(this.game, this.game.level))
        }
    }

    public run(): void {
    }
}