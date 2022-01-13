import Game from "./Game";

export default class InputHandler {
    game: Game
    constructor(game: Game) {
        this.game = game

        this.game.canvas().addEventListener('click', (e: MouseEvent)  => {
            this.game.currentState().handleInput(e)
        })

        document.addEventListener('keydown', (e) => {
            this.game.currentState().handleInput(e)
        })
        document.addEventListener('keyup', (e) => {
            this.game.currentState().handleInput(e)
        })
    }
}