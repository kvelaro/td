import Game from "./Game";
import Collision from "./Collision";
import Pixel from "./Pixel";
import Cell from "./Cell";
import Corporal from "./Soldiers/Corporal";
import Soldier from "./Soldiers/Soldier";
import Sergeant from "./Soldiers/Sergeant";
import Ensign from "./Soldiers/Ensign";
import Lieutenant from "./Soldiers/Lieutenant";
import Money from "./Money";

export default class InputHandler {
    game: Game

    constructor(game: Game) {
        this.game = game
        let self = this
        this.game.canvas().addEventListener('click', function(e: MouseEvent) {
            let canvasRect = self.game.canvas().getBoundingClientRect()
            let x = e.x - canvasRect.left
            let y = e.y - canvasRect.top

            let filter = self.game.objects.filter(function(object) {
                return object instanceof Money
            })

            if(!filter) {
                return
            }
            let moneyObject = <Money>filter.pop()

            self.game.objects.forEach(function(object) {
                let selected = document.querySelector('.menu__item--selected')
                if(!selected) {
                    return
                }
                let cost = <number><unknown>selected.getAttribute('data-cost')
                if(cost > moneyObject.getAmount()) {
                    return
                }
                let defender = null
                switch (selected.getAttribute('data-class')) {
                    case 'soldier':
                        defender = new Soldier(self.game, object.x + 1, object.y + 1)
                        break;
                    case 'sergeant':
                        defender = new Sergeant(self.game, object.x + 1, object.y + 1)
                        break;
                    case 'ensign':
                        defender = new Ensign(self.game, object.x + 1, object.y + 1)
                        break;
                    case 'lieutenant':
                        defender = new Lieutenant(self.game, object.x + 1, object.y + 1)
                        break;
                    case 'corporal':
                        defender = new Corporal(self.game, object.x + 1, object.y + 1)
                        break;
                    default:
                        break;
                }

                if(
                    defender &&
                    object instanceof Cell &&
                    Collision(object, new Pixel(x, y)) &&
                    object.defenderExist == false &&
                    object.isFullyDrawn()
                ) {
                    moneyObject.addAmount(cost * -1)
                    object.defenderExist = true
                    self.game.objects.push(defender)
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