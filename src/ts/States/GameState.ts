import State from "../State";

export default abstract class GameState extends State {

    public abstract run(): void
}