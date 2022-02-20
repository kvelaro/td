import Game from "../Game";
import GamePlayingState from "./GamePlayingState";
import GameState from "./GameState";

export default class GameOverState extends GameState {
    constructor(game: Game) {
        super(game)
    }

    enter() {console.log(222)
        this.draw()
        this.game.over()
    }

    draw() {
        this.game.context().clearRect(0 ,0, this.game.w(), this.game.h())
        let objects = this.game.objects
        for (let i = 0; i < objects.length; i++) {
           objects[i].draw()
        }
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