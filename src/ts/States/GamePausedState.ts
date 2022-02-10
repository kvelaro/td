import Game from "../Game";
import GameState from "./GameState";

export default class GamePausedState extends GameState {
    constructor(game: Game) {
       super(game)
    }

    enter() {
        this.game.paused()
    }

    handleInput(event: KeyboardEvent): void {
        if(event.code == 'Escape' && event.type == 'keydown') {
            this.game.setState(this.game.playingStateAfterPause)
        }
    }

    public run(): void {
        super.run()
    }
}