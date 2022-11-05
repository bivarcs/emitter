/**
 * The name of the hook event type.
 * Cannot start with "filter:".
 */
export type HookType = string;

/**
 * The name of the filter event type.Requires "filter:" in prefix.
 * Specify with `on()` or `{ on: [...] }`.
 */
export type FilterType = `${"filter:"}${FilterShortType}`;

/**
 * The name of the filter event type.
 * A string without the prefix from FilterType.
 */
export type FilterShortType = string;

/**
 * Passed as an argument of the callback function.
 * 
 * target: Instance that fired the event.  
 * type: The name of the event type.  
 * data: Event data passed to the callback.
 */
export type Event = {
  readonly target: object
  readonly type: HookType | FilterShortType
  readonly data?: Data
}

/**
 * Passed as Event.data in the callback function.
 */
export type Data = any;

/**
 * A function called when a hook or filter occurs.
 */
export type Listener = (event: Event) => any;

/**
 * Data for individual event listeners.
 */
export type Entry = [HookType | FilterType, Listener, ListenerOptions,]

/**
 * A collection of Entry.
 */
export type EntryList = Array<Entry>

/**
 * Options for event listeners.
 * 
 * @property {boolean} once - If `true`, it will be discarded once.
 * @property {number} order - If there are events with the same name, the smaller number will be called first.  Default is `0`.
 */
export type ListenerOptions = {
  readonly once?: boolean
  readonly order?: number
}

/**
 * class options.
 * 
 * @param {EntryList} on - Event listeners registered at instance initialization.
 */
export type Options = {
  on?: EntryList,
  [key: string]: any,
}

/**
 * A class with hook and filter functionality
 * 
 * @typeParam event After `destroy()` it becomes `null`. After that, all operations are disabled.
 */
export class Emitter {
  private event: EntryList | null = []

  constructor(options?: Options) {
    if (options && options.on) {
      options.on.forEach((entry) => {
        this.on(...entry);
      })
    }
  }

  /**
   * Add an hook or filter event.
   */
  on(type: HookType | FilterType, callback: Listener, options?: ListenerOptions): void {
    if (this.event && !this.event.some((entry) => {
      return type === entry[0] && callback === entry[1];
    })) {
      this.event.push([type, callback, options || {},]);

      this.event.sort((a, b) => (a[2].order || 0) - (b[2].order || 0));
    }
  }

  /**
   * Remove an hook or filter event.
   */
  protected off(type: HookType | FilterType, callback: Listener): void {
    if (this.event) {
      this.event = this.event.filter((entry) => {
        return !(type === entry[0] && callback === entry[1]);
      });
    }
  }

  /**
   * Emit an filter event.
   */
  protected filter(shortType: FilterShortType, data?: Data): any {
    if (this.event) {
      var value;

      this.event.forEach((entry) => {
        var type = "filter:" + shortType as FilterType;

        if (type === entry[0]) {
          value = entry[1]({
            data,
            target: this,
            type,
          } as Event);

          if (entry[2]) {
            this.off(type, entry[1]);
          }
        }
      });

      return value;
    }
  }

  /**
   * Emit an hook event.
   */
  protected hook(type: HookType, data?: Data): void {
    if (this.event) {
      this.event.forEach((entry) => {
        if (type === entry[0]) {
          entry[1]({
            data,
            target: this,
            type,
          } as Event);

          if (entry[2].once) {
            this.off(type, entry[1]);
          }
        }
      });
    }
  }

  /**
   * Remove all events and stop functioning.
   */
  protected destroy() {
    this.event = null;
  }
}
