import Game from "./Game";
const FPS = 1000 / 30

const GAME_WIDTH = window.innerWidth
const GAME_HEIGHT = window.innerHeight

let gameScreen = <HTMLCanvasElement>document.querySelector('#gameScreen')
let ctx = gameScreen.getContext('2d')
ctx.canvas.width  = GAME_WIDTH
ctx.canvas.height = GAME_HEIGHT

let game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT)
game.start()

let prev = 0
function gameLoop(interval: number) {

    if(interval - prev >= FPS) {
        prev = FPS - (interval - prev)
        ctx.clearRect(0 ,0, GAME_WIDTH, GAME_HEIGHT)
        game.loop()
    }
    requestAnimationFrame(gameLoop)
}
gameLoop(0)