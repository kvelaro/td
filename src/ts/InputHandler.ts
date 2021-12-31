import Game from "./Game";
import Collision from "./Collision";
import Pixel from "./interfaces/Pixel";
import Cell from "./Cell";
import Corporal from "./Corporal";
import Soldier from "./Soldier";
import Sergeant from "./Sergeant";
import Ensign from "./Ensign";
import Lieutenant from "./Lieutenant";

export default class InputHandler {
    game: Game

    constructor(game: Game) {
        this.game = game
        let self = this
        this.game.canvas().addEventListener('click', function(e: MouseEvent) {
            let canvasRect = self.game.canvas().getBoundingClientRect()
            let x = e.x - canvasRect.left
            let y = e.y - canvasRect.top

            self.game.objects.forEach(function(object) {
                let selected = document.querySelector('.menu__item--selected')
                if(!selected) {
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