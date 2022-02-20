import Level from "../Level";
export namespace GameLevels {
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

    export class Level2 extends Level {
        constructor() {
            super();
            this.waves = [
                {
                    'zombieCount': 200
                },
                {
                    'zombieCount': 250
                },
                {
                    'zombieCount': 300
                }
            ]
            this.currentWave = 0
            this.levelNo = 2
        }
    }
}

