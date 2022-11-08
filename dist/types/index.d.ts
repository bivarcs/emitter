/**
 * event type.
 */
declare type Type = string;
/**
 * Second argument of `emit()`.
 */
declare type Data = any;
/**
 * Passed to the callback function.
 */
declare type EmitterEvent = Data & {
    readonly type: Type;
    readonly target: object;
};
/**
 * A function called when a event occurs.
 */
declare type Listener = (event: EmitterEvent) => void;
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
    emit(type: Type, data?: Data): EmitterEvent;
    /**
     * Remove all events and stop functioning.
     */
    destroy(): void;
}

export { Emitter as default };
