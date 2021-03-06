import Menu from "../Menu";
import Soldier from "../Soldiers/Soldier";
import Sergeant from "../Soldiers/Sergeant";
import Ensign from "../Soldiers/Ensign";
import Lieutenant from "../Soldiers/Lieutenant";
import Corporal from "../Soldiers/Corporal";
import GameState from "../States/GameState";

export default class DefendersMenu extends Menu {
    protected activeDefenderClass: string
    protected gameState: GameState
    constructor(gameState: GameState) {
        super()
        let href = this
        this.activeDefenderClass = null
        this.gameState = gameState
        this.addEventListener('menu-selected', function(e: CustomEvent) {
            href.setItemActive(e)
        })
    }

    private defenders() {
        return [
            {
                title: Sergeant.title,
                link: Sergeant.link,
                price: Sergeant.price,
            },
            {
                title: Ensign.title,
                link: Ensign.link,
                price: Ensign.price,
            },
            {
                title: Lieutenant.title,
                link: Lieutenant.link,
                price: Lieutenant.price,
            },
            {
                title: Soldier.title,
                link: Soldier.link,
                price: Soldier.price,
            },
            {
                title: Corporal.title,
                link: Corporal.link,
                price: Corporal.price,
            }
        ]
    }

    draw() {
        super.draw()
        let href = this
        let defendersMenuTemplate = require("../../views/menu/defenders-menu.handlebars")

        let body = document.querySelector('body')

        let menuSection = document.createElement('section')
        menuSection.classList.add('menu')
        menuSection.innerHTML = defendersMenuTemplate({
            menuItems: this.defenders()
        })

        let playing = false

        menuSection.addEventListener('mouseenter', function() {
            if(playing) {
                return false
            }
            menuSection.classList.remove('fade-out')
            menuSection.classList.add('fade-in')
        })

        menuSection.addEventListener('mouseleave', function() {
            if(playing) {
                return false
            }
            menuSection.classList.remove('fade-in')
            menuSection.classList.add('fade-out')
        })

        menuSection.addEventListener('animationstart', function () {
            playing = true
        })

        menuSection.addEventListener('animationend', function () {
            playing = false

            // let menu = this.getClientRects()[0]
            // console.log(menu.x)
        })

        body.prepend(menuSection)
        let menuItems = document.querySelectorAll('.menu__items-item')
        for(let i = 0; i < menuItems.length; i++) {
            menuItems[i].addEventListener('click', function (e) {
                href.dispatchEvent(new CustomEvent('menu-selected', {detail: e.currentTarget}))
            })
        }
    }

    public setItemActive(e: CustomEvent) {
        let el = <HTMLElement>e.detail
        if(el.classList.contains('menu__items-item--selected')) {
            this.activeDefenderClass = null
            el.classList.remove('menu__items-item--selected')
            return
        }
        let menuItems = document.querySelectorAll('.menu__items-item')
        for(let j = 0; j < menuItems.length; j++) {
            menuItems[j].classList.remove('menu__items-item--selected')
        }
        this.activeDefenderClass = el.dataset.class
        el.classList.add('menu__items-item--selected')
    }

    public getActiveDefenderClass() {
        return this.activeDefenderClass
    }

    public static delete() {
        let menuEl = document.querySelector('section.menu')
        menuEl.parentElement.removeChild(menuEl)
    }
}