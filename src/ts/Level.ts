import Wave from "./interfaces/Wave";

export default class Level {
    protected waves: Array<Wave>
    protected currentWave: number

    public levelNo: number

    public next(): object {
        return this.waves[this.currentWave++]
    }

    public current(): number {
        return this.currentWave
    }

    public wavesExist(): boolean {
        return this.waves.length > this.currentWave + 1
    }
}