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

export default class GamePlayingState extends GameState {
    protected game: Game
    protected level: Level
    constructor(game: Game, level: Level) {
        super()
        this.game = game
        this.level = level
    }

    enter() {
        super.enter()
        this.game.background()
    }

    public run(): void {
        this.game.playing(this.level)
    }

    handleInput(event: Event): void {
        if(event instanceof KeyboardEvent && event.type == 'keydown') {
            switch (event.code) {
                case 'Escape':
                    this.game.setState(new GamePausedState(this.game))
                    break
            }
        }
        else if(event instanceof MouseEvent) {
            this.game.canvas().addEventListener('click', (e: MouseEvent) => {console.log(e)
                let canvasRect = this.game.canvas().getBoundingClientRect()
                let x = e.x - canvasRect.left
                let y = e.y - canvasRect.top

                let filter = this.game.objects.filter(function(object) {
                    return object instanceof Money
                })

                if(!filter) {
                    return
                }
                let moneyObject = <Money>filter.pop()

                let selected = document.querySelector('.menu__item--selected')
                if(!selected) {
                    return
                }
                let cost = <number><unknown>selected.getAttribute('data-cost')
                if(cost > moneyObject.getAmount()) {
                    return
                }

                let cellObjects:Array<Cell> = []
                let defenderObjects:Array<Defender> = []

                this.game.objects.forEach(function(object) {
                    if(object instanceof Cell) {
                        cellObjects.push(object)
                    }
                    if(object instanceof Defender) {
                        defenderObjects.push(object)
                    }
                })

                let dataClass = selected.getAttribute('data-class')
                cellObjects.forEach(function(object) {
                    if(
                        Collision(object, new Pixel(x, y)) &&
                        object.defenderExist == false &&
                        object.isFullyDrawn()
                    ) {

                        let defender = null
                        switch (dataClass) {
                            case 'soldier':
                                defender = new Soldier(this.game, object.x + 1, object.y + 1)
                                break;
                            case 'sergeant':
                                defender = new Sergeant(this.game, object.x + 1, object.y + 1)
                                break;
                            case 'ensign':
                                defender = new Ensign(this.game, object.x + 1, object.y + 1)
                                break;
                            case 'lieutenant':
                                defender = new Lieutenant(this.game, object.x + 1, object.y + 1)
                                break;
                            case 'corporal':
                                defender = new Corporal(this.game, object.x + 1, object.y + 1)
                                break;
                            default:
                                break;
                        }

                        moneyObject.addAmount(cost * -1)
                        object.defenderExist = true
                        this.game.objects.push(defender)
                    }
                })
            })

            let menuItems = document.querySelectorAll('.menu__item')
            for(let i = 0; i < menuItems.length; i++) {
                menuItems[i].addEventListener('click', function (e) {
                    let el = <HTMLElement>e.currentTarget
                    if(el.classList.contains('menu__item--selected')) {
                        el.classList.remove('menu__item--selected')
                        return
                    }
                    for(let j = 0; j < menuItems.length; j++) {
                        menuItems[j].classList.remove('menu__item--selected')
                    }
                    el.classList.add('menu__item--selected')
                })
            }
        }
    }
}