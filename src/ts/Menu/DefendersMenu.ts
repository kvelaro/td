import Menu from "../Menu";
import Soldier from "../Soldiers/Soldier";
import Sergeant from "../Soldiers/Sergeant";
import Ensign from "../Soldiers/Ensign";
import Lieutenant from "../Soldiers/Lieutenant";
import Corporal from "../Soldiers/Corporal";

export default class DefendersMenu extends Menu {
    constructor() {
        super()
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

        let defendersMenuTemplate = require("../../views/menu/defenders-menu.handlebars")

        let body = document.querySelector('body')

        let menuSection = document.createElement('section')
        menuSection.classList.add('menu')
        menuSection.innerHTML = defendersMenuTemplate({
            menuItems: this.defenders()
        })
        body.prepend(menuSection)

    }

    public setItemActive(e: Event) {
        console.log(e)
        // let el = <HTMLElement>e.currentTarget
        // if(el.classList.contains('menu__items-item--selected')) {
        //     el.classList.remove('menu__items-item--selected')
        //     return
        // }
        // for(let j = 0; j < menuItems.length; j++) {
        //     menuItems[j].classList.remove('menu__items-item--selected')
        // }
        // el.classList.add('menu__items-item--selected')
    }
}