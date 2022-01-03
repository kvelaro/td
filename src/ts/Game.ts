import Cell from "./Cell";
import InputHandler from "./InputHandler";
import GameObject from "./GameObject";
import Money from "./Money";
import SimpleZombie from "./Enemies/SimpleZombie";
import SoldierZombie from "./Enemies/SoldierZombie";
import VampireZombie from "./Enemies/VampireZombie";
import Invader from "./Invader";
import Level1 from "./Levels/Level1";
import Level from "./Level";
import Wave from "./interfaces/Wave";

const STATE_PLAYING = 'PLAYING'
const STATE_PAUSED = 'PAUSED'
const STATE_OVER = 'OVER'

export default class Game {
    private gameCanvasElement: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private width: number
    private height: number
    public objects: Array<GameObject>
    private frame: number
    private rows: number
    private cols: number
    private state: string
    private level: Level
    constructor(gameScreen: HTMLCanvasElement, width: number, height: number) {
        this.gameCanvasElement = gameScreen
        this.ctx = gameScreen.getContext('2d')
        this.width = width
        this.height = height

        this.ctx.canvas.width  = this.width
        this.ctx.canvas.height = this.height

        this.objects = []
        this.frame = 0
        this.state = STATE_PLAYING
        new InputHandler(this)
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
        this.state = STATE_PLAYING
        this.level = new Level1()
        this.background()
    }

    public loop(): void {

        if(this.currentState() == STATE_PLAYING) {
            this.context().clearRect(0 ,0, this.width, this.height)
            this.frame++
            this.zombies()

            let objects = this.objects

            let filter = objects.filter(function(invader) {
                return invader instanceof Invader
            })
            objects.forEach(function(object, i) {
                if(object && object.delete) {
                    objects.splice(i, 1)
                }
                else if (object) {
                    object.draw()
                    object.update()
                }
            })
        }
    }

    public currentState(): string {
        return this.state
    }

    private background(): void {
        let cellWidth = Cell.width
        let cellHeight = Cell.height

        this.rows = Math.floor(this.h() / cellHeight)
        this.cols = Math.floor(this.w() / cellWidth)
        for (let i = 0; i <= this.rows; i++ ) {
            for (let j = 0; j <= this.cols; j++ ) {
                this.objects.push(new Cell(this, j * cellWidth, i * cellHeight))
            }
        }
        this.objects.push(new Money(this, this.width - 200, 20))
    }

    private zombies(): void {
        if(this.frame % 5000 == 0) {
            this.zombiesWave()
        }
        if(this.frame % 100 == 0) {
            this.objects.push(this.zombie())
        }
    }

    public over(): void {
        this.state = STATE_OVER
        this.context().save()
        this.context().fillStyle = "#000"
        this.context().font = "50px Arial"
        this.context().textAlign = 'center'
        this.context().fillText('GAME OVER', this.width / 2, this.height / 2)
        this.context().restore()
    }

    public win(): void {
        this.state = STATE_OVER
        this.context().save()
        this.context().fillStyle = "#000"
        this.context().font = "50px Arial"
        this.context().textAlign = 'center'
        this.context().fillText('YOU WON', this.width / 2, this.height / 2)
        this.context().restore()
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
        let waveObj = <Wave>this.level.next()
        if(!waveObj) {
            this.win()
        }
        for(let i = 0; i < waveObj.zombieCount; i++) {
            this.objects.push(this.zombie())
        }
    }
}