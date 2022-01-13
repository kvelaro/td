import Game from "../Game";
import GameState from "./GameState";
import GamePlayingState from "./GamePlayingState";

export default class GameMenuState extends GameState {
    protected game: Game
    constructor(game: Game) {
        super()
        this.game = game
    }

    handleInput(event: KeyboardEvent): void {
        if(event.code == 'Space' && event.type == 'keydown') {
            this.game.setState(new GamePlayingState(this.game))
        }
    }

    run() {
        this.game.menu()
    }
}