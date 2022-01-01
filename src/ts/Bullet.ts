import GameObject from "./GameObject";
import Game from "./Game";
import Invader from "./Invader";
import Collision from "./Collision";
import Money from "./Money";

export default abstract class Bullet extends GameObject {
    protected game: Game
    protected speed: number
    public damage: number

    public isDeleted(): boolean {
        return this.delete
    }

    public update() {
        this.x += this.speed
        if(this.x >= this.game.w()) {
            this.delete = true
        }

        let moneyObject = null
        let filter = this.game.objects.filter(object => {return object instanceof Money})
        if(filter) {
            moneyObject = <Money>filter.pop()
        }

        for(let i = 0; i < this.game.objects.length; i++) {
            let obj = this.game.objects[i]
            if(obj instanceof Invader && Collision(this, obj))  {
                obj.health -= this.damage
                moneyObject.addAmount(this.damage * 10)
                if(obj.health <= 0) {
                    obj.delete = true
                }
                this.delete = true
            }
        }
    }
}