import Level from "../Level";
export namespace Levels {
    export class Level1 extends Level {
        constructor() {
            super();
            this.waves = [
                {
                    'zombieCount': 50
                },
                {
                    'zombieCount': 100
                },
                {
                    'zombieCount': 150
                }
            ]
            this.currentWave = 0
            this.levelNo = 1
        }
    }
}

