import Drawable from "./interfaces/Drawable";

export default class Menu implements EventTarget, Drawable {
    protected observers: {[index: string]: EventListenerOrEventListenerObject}
    protected observersOptions: {[index: string]: boolean | AddEventListenerOptions}
    constructor() {
        this.observers = {}
        this.observersOptions = {}
    }

    addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions) {
        this.observers[type] = listener
        this.observersOptions[type] = options
    }
    // @ts-ignore
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean) {
        delete this.observers[type]
        delete this.observersOptions[type]
    }

    // @ts-ignore
    dispatchEvent(event: Event): boolean {
        if(event.type in this.observers) {
            let listener = event.type
            if(typeof this.observers[listener] === 'function') {
                // @ts-ignore
                this.observers[listener](event)
            }
            return true
        }
        return false
    }

    public draw(): void {

    }

    public update(): void {

    }
}