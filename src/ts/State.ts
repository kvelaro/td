export default abstract class State {

    public enter() {}

    abstract handleInput(event: Event): void

    public leave() {}
}
