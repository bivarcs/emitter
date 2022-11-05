/**
 * The name of the hook event type.
 * Cannot start with "filter:".
 */
declare type HookType = string;
/**
 * The name of the filter event type.Requires "filter:" in prefix.
 * Specify with `on()` or `{ on: [...] }`.
 */
declare type FilterType = `${"filter:"}${FilterShortType}`;
/**
 * The name of the filter event type.
 * A string without the prefix from FilterType.
 */
declare type FilterShortType = string;
/**
 * Passed as an argument of the callback function.
 *
 * target: Instance that fired the event.
 * type: The name of the event type.
 * data: Event data passed to the callback.
 */
declare type Event = {
    readonly target: object;
    readonly type: HookType | FilterShortType;
    readonly data?: Data;
};
/**
 * Passed as Event.data in the callback function.
 */
declare type Data = any;
/**
 * A function called when a hook or filter occurs.
 */
declare type Listener = (event: Event) => any;
/**
 * Data for individual event listeners.
 */
declare type Entry = [HookType | FilterType, Listener, ListenerOptions];
/**
 * A collection of Entry.
 */
declare type EntryList = Array<Entry>;
/**
 * Options for event listeners.
 *
 * @property {boolean} once - If `true`, it will be discarded once.
 * @property {number} order - If there are events with the same name, the smaller number will be called first.  Default is `0`.
 */
declare type ListenerOptions = {
    readonly once?: boolean;
    readonly order?: number;
};
/**
 * class options.
 *
 * @param {EntryList} on - Event listeners registered at instance initialization.
 */
declare type Options = {
    on?: EntryList;
    [key: string]: any;
};
/**
 * A class with hook and filter functionality
 *
 * @typeParam event After `destroy()` it becomes `null`. After that, all operations are disabled.
 */
declare class Emitter {
    private event;
    constructor(options?: Options);
    /**
     * Add an hook or filter event.
     */
    on(type: HookType | FilterType, callback: Listener, options?: ListenerOptions): void;
    /**
     * Remove an hook or filter event.
     */
    protected off(type: HookType | FilterType, callback: Listener): void;
    /**
     * Emit an filter event.
     */
    protected filter(shortType: FilterShortType, data?: Data): any;
    /**
     * Emit an hook event.
     */
    protected hook(type: HookType, data?: Data): void;
    /**
     * Remove all events and stop functioning.
     */
    protected destroy(): void;
}

export { Emitter as default };
