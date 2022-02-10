import Game from "../Game";
import Money from "../Money";
import Cell from "../Cell";
import Defender from "../Defender";
import Collision from "../Collision";
import Pixel from "../Pixel";
import Soldier from "../Soldiers/Soldier";
import Sergeant from "../Soldiers/Sergeant";
import Ensign from "../Soldiers/Ensign";
import Lieutenant from "../Soldiers/Lieutenant";
import Corporal from "../Soldiers/Corporal";
import GamePausedState from "./GamePausedState";
import GameState from "./GameState";
import Level from "../Level";
import DefendersMenu from "../Menu/DefendersMenu";

export default class GamePlayingState extends GameState {
    protected level: Level
    protected wasPaused: boolean
    protected defendersMenu: DefendersMenu

    constructor(game: Game, level: Level) {
        super(game)
        this.level = level
        this.wasPaused = false
        this.defendersMenu = new DefendersMenu(this)
    }

    enter() {
        if(!this.wasPaused) {
            super.enter()
            this.game.background()
            this.defendersMenu.draw()
        }
    }

    public run(): void {
        super.run()
        this.game.playing(this.level)
    }

    handleInput(event: Event): void {
        let href = this
        if(event instanceof KeyboardEvent && event.type == 'keydown') {
            switch (event.code) {
                case 'Escape':
                    this.game.playingStateAfterPause = this
                    this.wasPaused = true
                    this.game.setState(new GamePausedState(this.game))
                    break
            }
        }
        else if(event instanceof MouseEvent) {
            this.game.canvas().addEventListener('click', (e: MouseEvent) => {
                let canvasRect = this.game.canvas().getBoundingClientRect()
                let x = e.x - canvasRect.left
                let y = e.y - canvasRect.top

                let selected = this.defendersMenu.getActiveDefenderClass()
                if(!selected) {
                    return
                }

                let cellObjects:Array<Cell> = []
                let defenderObjects:Array<Defender> = []
                let moneyObject: Money

                this.game.objects.forEach(function(object) {
                    if(object instanceof Cell) {
                        cellObjects.push(object)
                    }
                    if(object instanceof Defender) {
                        defenderObjects.push(object)
                    }
                    if(object instanceof Money) {
                        moneyObject = object
                    }
                })

                cellObjects.forEach(function(object) {
                    if(
                        Collision(object, new Pixel(x, y)) &&
                        object.defenderExist == false &&
                        object.isFullyDrawn()
                    ) {

                        let defender = null
                        let price = 0
                        switch (selected.toLowerCase()) {
                            case 'soldier':
                                defender = new Soldier(href.game, object.x + 1, object.y + 1)
                                price = Soldier.price
                                break;
                            case 'sergeant':
                                defender = new Sergeant(href.game, object.x + 1, object.y + 1)
                                price = Sergeant.price
                                break;
                            case 'ensign':
                                defender = new Ensign(href.game, object.x + 1, object.y + 1)
                                price = Ensign.price
                                break;
                            case 'lieutenant':
                                defender = new Lieutenant(href.game, object.x + 1, object.y + 1)
                                price = Lieutenant.price
                                break;
                            case 'corporal':
                                defender = new Corporal(href.game, object.x + 1, object.y + 1)
                                price = Corporal.price
                                break;
                            default:
                                break;
                        }

                        if(defender) {
                            if(moneyObject.getAmount() < price) {
                                return
                            }
                            moneyObject.addAmount(price * -1)
                            object.defenderExist = true
                            href.game.objects.push(defender)
                        }
                    }
                })
            })
        }
    }
}