import Wave from "./interfaces/Wave";

export default class Level {
    protected waves: Array<Wave>
    protected currentWave: number

    public next(): object {
        return this.waves[this.currentWave++]
    }

    public current(): number {
        return this.currentWave
    }
}