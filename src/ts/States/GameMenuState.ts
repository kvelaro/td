import Game from "../Game";
import GameState from "./GameState";
import GamePlayingState from "./GamePlayingState";
import Level1 from "../Levels/Level1";

export default class GameMenuState extends GameState {
    constructor(game: Game) {
        super(game)
    }

    enter() {
        super.enter()
        this.game.background()
    }

    handleInput(event: KeyboardEvent): void {
        if(event.code == 'Space' && event.type == 'keydown') {
            this.game.isAboutToComplete = false
            this.game.setState(new GamePlayingState(this.game, new Level1()))
        }
    }

    run() {
        super.run()
        this.game.menu()
    }
}