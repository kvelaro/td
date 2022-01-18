import Cell from "./Cell";
import InputHandler from "./InputHandler";
import GameObject from "./GameObject";
import Money from "./Money";
import SimpleZombie from "./Enemies/SimpleZombie";
import SoldierZombie from "./Enemies/SoldierZombie";
import VampireZombie from "./Enemies/VampireZombie";
import Invader from "./Invader";
import Level from "./Level";
import Wave from "./interfaces/Wave";
import GameState from "./States/GameState";
import GameMenuState from "./States/GameMenuState";
import GameCompleteLevelState from "./States/GameCompleteLevelState";

export default class Game {
    private gameCanvasElement: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private width: number
    private height: number
    public objects: Array<GameObject>
    private frame: number
    private rows: number
    private cols: number
    private state: GameState
    protected input: InputHandler
    public level: Level
    public isAboutToComplete: boolean
    constructor(gameScreen: HTMLCanvasElement, width: number, height: number) {
        this.gameCanvasElement = gameScreen
        this.ctx = gameScreen.getContext('2d')
        this.width = width
        this.height = height

        this.ctx.canvas.width  = this.width
        this.ctx.canvas.height = this.height

        this.objects = []
        this.frame = 0
        this.input = new InputHandler(this)
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

    public menu(): void {
        this.context().save()
        this.context().fillStyle = "#000"
        this.context().font = "50px Arial"
        this.context().textAlign = 'center'
        this.context().fillText('PRESS SPACE TO START GAME', this.width / 2, this.height / 2)
        this.context().restore()
    }

    public playing(level: Level): void {
        this.level = level
        this.context().clearRect(0 ,0, this.width, this.height)
        this.zombies()

        let objects = this.objects
        if(this.isAboutToComplete) {
            let filter = objects.filter(function (object: GameObject) {
                return (object instanceof Invader)
            })
            if(!filter) {
                this.setState(new GameCompleteLevelState(this))
            }
        }
        for (let i = 0; i < objects.length; i++) {
            if(objects[i] && objects[i].delete) {
                objects.splice(i, 1)
                continue
            }
            objects[i].draw()
            objects[i].update()
        }
    }

    public paused(): void {
        this.context().save()
        this.context().fillStyle = "#000"
        this.context().font = "50px Arial"
        this.context().textAlign = 'center'
        this.context().fillText('PAUSED', this.width / 2, this.height / 2)
        this.context().restore()
    }

    public over(): void {
        this.context().save()
        this.context().fillStyle = "#000"
        this.context().font = "50px Arial"
        this.context().textAlign = 'center'
        this.context().fillText('GAME OVER', this.width / 2, this.height / 2)
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
        this.state = state
        this.state.enter()
    }

    public currentState(): GameState {
        return this.state
    }

    public background(): void {
        let cellWidth = Cell.width
        let cellHeight = Cell.height

        this.rows = Math.floor(this.h() / cellHeight)
        this.cols = Math.floor(this.w() / cellWidth)
        for (let i = 0; i <= this.rows; i++ ) {
            for (let j = 0; j <= this.cols; j++ ) {
                this.objects.push(new Cell(this, i, j))
            }
        }
        this.objects.push(new Money(this, this.width - 200, 20))
    }

    public currentFrame() {
        return this.frame
    }

    public zombie(rand = false): Invader {
        let zombieRandom = Math.floor(Math.random() * 3)
        let zombie = null
        let yPos = Math.floor(Math.random() * this.rows) * Cell.height
        let random = 1
        if(rand) {
            random = Math.floor(Math.random() * 1000)
        }
        switch (zombieRandom) {
            case 0:
                zombie = new SimpleZombie(this, this.width + random, yPos + 1)
                break
            case 1:
                zombie = new SoldierZombie(this, this.width + random, yPos + 1)
                break
            case 2:
                zombie = new VampireZombie(this, this.width + random, yPos + 1)
                break
        }
        return zombie
    }

    public zombiesWave(): void {
        let wavesExist = this.level.wavesExist()
        if(!wavesExist) {
            this.isAboutToComplete = true
        }
        else {
            let waveObj = <Wave>this.level.next()
            for(let i = 0; i < waveObj.zombieCount; i++) {
                this.objects.push(this.zombie())
            }
        }
    }

    private zombies(): void {
        let bigWaveAtFrame = Math.floor(5000 - (this.level.levelNo - 1) * 250)
        let randomZombieAtFrame = Math.floor(100 - (this.level.levelNo) * 10)
        if(!this.isAboutToComplete) {
            if(this.frame % bigWaveAtFrame == 0) {
                this.zombiesWave()
            }
            if(this.frame % randomZombieAtFrame == 0) {
                this.objects.push(this.zombie())
            }
        }
    }
}