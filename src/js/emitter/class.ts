/**
 * event type.
 */
export type Type = string;

/**
 * Passed as an argument of the callback function.
 * 
 * target: Instance that fired the event.  
 * type: The name of the event type.  
 * data: Event data passed to the callback.
 */
export type Event = {
  readonly target: object
  readonly type: Type
  readonly data?: Data
}

/**
 * Passed as `event.data` in the callback function.
 */
export type Data = any;

/**
 * A function called when a event occurs.
 */
export type Listener = (event: Event) => void;

/**
 * Data for individual event listeners.
 */
export type Entry = [Type, Listener, ListenerOptions,]

/**
 * A collection of Entry.
 */
export type EntryList = Array<Entry>

/**
 * Options for event listeners.
 * 
 * once: One-time run.
 * order: Order in events of the same type.
 */
export type ListenerOptions = {
  readonly once?: boolean
  readonly order?: number
}

/**
 * class options.
 * 
 * on: Event listeners registered at instance initialization.
 */
export type Options = {
  on?: EntryList,
  [key: string]: any,
}

/**
 * class
 */
export class Emitter {
  private Emitter$entries: {
    [key: string]: EntryList
  } = {}

  constructor(options?: Options) {
    if (options && options.on) {
      options.on.forEach((entry) => {
        this.on(...entry);
      })
    }
  }

  /**
   * Add an event.
   */
  on(type: Type, callback: Listener, options?: ListenerOptions): void {
    let entries = this.Emitter$entries;

    if (!entries[type] || !entries[type].some((entry) => {
      return type === entry[0] && callback === entry[1];
    })) {
      if (!entries[type]) {
        entries[type] = [];
      }

      entries[type].push([type, callback, {
        ...{
          once: false,
          order: 0,
        },
        ...options,
      },]);

      entries[type].sort((a, b) => (a[2].order || 0) - (b[2].order || 0));
    }
  }

  /**
   * Remove an event.
   */
  off(type: Type, callback: Listener): void {
    let entries = this.Emitter$entries;

    if (entries[type]) {
      entries[type] = entries[type].filter((entry) => {
        return callback !== entry[1];
      });
    }
  }

  /**
   * Emit an event.
   */
  emit(type: Type, data?: Data): void {
    let entries = this.Emitter$entries;

    if (entries[type]) {
      entries[type].forEach((entry) => {
        entry[1]({
          data,
          target: this,
          type,
        } as Event);

        if (entry[2].once) {
          this.off(type, entry[1]);
        }
      });
    }
  }

  /**
   * Remove all events and stop functioning.
   */
  destroy() {
    this.Emitter$entries = {};
  }
}
