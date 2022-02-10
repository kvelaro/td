import Game from "../Game";
import GamePlayingState from "./GamePlayingState";
import GameState from "./GameState";
import DefendersMenu from "../Menu/DefendersMenu";

export default class GameOverState extends GameState {
    protected defendersMenu: DefendersMenu
    constructor(game: Game) {
        super(game)
        this.defendersMenu = new DefendersMenu()
    }

    enter() {
        super.enter()
        this.defendersMenu.delete()
        this.game.over()
    }

    handleInput(event: KeyboardEvent): void {
        if(event.code == 'Space' && event.type == 'keydown') {
            this.game.setState(new GamePlayingState(this.game, this.game.level))
        }
    }

    public run(): void {
        super.run()
    }
}