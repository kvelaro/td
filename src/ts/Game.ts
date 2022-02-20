import InputHandler from "./InputHandler";
import Level from "./Level";
import GameState from "./States/GameState";
import GameMenuState from "./States/GameMenuState";
import GamePlayingState from "./States/GamePlayingState";

export default class Game {
    private gameCanvasElement: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private width: number
    private height: number
    private frame: number
    public rows: number
    public cols: number
    private state: GameState
    protected input: InputHandler
    public level: Level

    public playingStateAfterPause: GamePlayingState

    constructor(gameScreen: HTMLCanvasElement, width: number, height: number) {
        this.gameCanvasElement = gameScreen
        this.ctx = gameScreen.getContext('2d')
        this.width = width
        this.height = height

        this.ctx.canvas.width  = this.width
        this.ctx.canvas.height = this.height

        this.frame = 0
        this.input = new InputHandler(this)
        this.state = null
        this.playingStateAfterPause = null
    }

    public canvas(): HTMLCanvasElement {
        return this.gameCanvasElement
    }

    public context(): CanvasRenderingContext2D {
        return this.ctx
    }

    public w(): number {
        return this.width
    }

    public h(): number {
        return this.height
    }

    public start(): void {
        this.setState(new GameMenuState(this))
    }

    public loop(): void {
        this.frame++
        this.state.run()
    }

    public paused(): void {
        this.context().save()
        this.context().fillStyle = "#000"
        this.context().font = "50px Arial"
        this.context().textAlign = 'center'
        this.context().fillText('PAUSED', this.width / 2, this.height / 2)
        this.context().restore()
    }

    public win(): void {
        this.context().save()
        this.context().fillStyle = "#000"
        this.context().font = "50px Arial"
        this.context().textAlign = 'center'
        this.context().fillText('YOU WIN', this.width / 2, this.height / 2)
        this.context().restore()
    }

    public setState(state: GameState): void {
        let prevState = null
        if(this.currentState() != null) {
            prevState = this.currentState()
            this.currentState().leave()
        }
        this.state = state
        this.state.enter(prevState)
    }

    public currentState(): GameState {
        return this.state
    }

    public currentFrame() {
        return this.frame
    }
}