import Game from "../Game";
import GamePlayingState from "./GamePlayingState";
import GameState from "./GameState";

export default class GameOverState extends GameState {

    constructor(game: Game) {
        super(game)
    }

    enter() {
        super.enter()
        this.game.over()
    }

    handleInput(event: KeyboardEvent): void {
        if(event.code == 'Space' && event.type == 'keydown') {
            this.game.setState(new GamePlayingState(this.game, this.game.level))
        }
    }

    public run(): void {
    }
}