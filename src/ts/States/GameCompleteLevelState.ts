import Game from "../Game";
import GamePlayingState from "./GamePlayingState";
import GameState from "./GameState";

export default class GameCompleteLevelState extends GameState {
    protected game: Game
    constructor(game: Game) {
        super()
        this.game = game
    }

    enter() {
        super.enter()
        this.game.win()
    }

    handleInput(event: KeyboardEvent): void {
        if(event.code == 'Space' && event.type == 'keydown') {
            let levelNo = this.game.level.levelNo
            let className: any =  new (<any>window)[`Level${levelNo}`]()
            this.game.setState(new GamePlayingState(this.game, className))
        }
    }

    public run(): void {
    }
}