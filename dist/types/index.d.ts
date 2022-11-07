/**
 * event type.
 */
declare type Type = string;
/**
 * Passed as an argument of the callback function.
 *
 * target: Instance that fired the event.
 * type: The name of the event type.
 * data: Event data passed to the callback.
 */
declare type Event = {
    readonly target: object;
    readonly type: Type;
    readonly data?: Data;
};
/**
 * Passed as `event.data` in the callback function.
 */
declare type Data = any;
/**
 * A function called when a event occurs.
 */
declare type Listener = (event: Event) => void;
/**
 * Data for individual event listeners.
 */
declare type Entry = [Type, Listener, ListenerOptions];
/**
 * A collection of Entry.
 */
declare type EntryList = Array<Entry>;
/**
 * Options for event listeners.
 *
 * once: One-time run.
 * order: Order in events of the same type.
 */
declare type ListenerOptions = {
    readonly once?: boolean;
    readonly order?: number;
};
/**
 * class options.
 *
 * on: Event listeners registered at instance initialization.
 */
declare type Options = {
    on?: EntryList;
    [key: string]: any;
};
/**
 * class
 */
declare class Emitter {
    private Emitter$entries;
    constructor(options?: Options);
    /**
     * Add an event.
     */
    on(type: Type, callback: Listener, options?: ListenerOptions): void;
    /**
     * Remove an event.
     */
    off(type: Type, callback: Listener): void;
    /**
     * Emit an event.
     */
    emit(type: Type, data?: Data): void;
    /**
     * Remove all events and stop functioning.
     */
    destroy(): void;
}

export { Emitter as default };
