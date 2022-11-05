# Emitter
![](https://img.shields.io/npm/types/@bivarcs/emitter)
![](https://img.shields.io/node/v/@bivarcs/emitter)
![](https://img.shields.io/github/license/bivarcs/emitter)

A generic event emitter class with hook and filter functionality.

## Demo
https://bivarcs.github.io/emitter/demo/

```js
const emitter = new Emitter({
  on: [
    ["myhook", (event) => console.log("hook:" ,event.type, event)],
    ["filter:myfilter", (event) => {
      console.log("filter:", event.type, event);
      return "new value";
    }],
  ],
});

emitter.hook("myhook", "some data");

const newValue = emitter.filter("myfilter", "old value");
console.log("newValue", newValue);
```

## Installation
### Package Manager
npm: `npm i @bivarcs/emitter`  
yarn: `yarn add @bivarcs/emitter`  

### CDN
```js
<script src="https://unpkg.com/@bivarcs/emitter/dist/js/emitter.min.js"></script>
```

## Document
- [API Documentation](https://bivarcs.github.io/emitter/docs/) (via: [Typedoc](https://github.com/TypeStrong/typedoc))

## Usage
A hook event is a generic event.  
  
A filter event is an event that returns a value.  
Can be used to specify property values dynamically.  
Filter events require a "filter:" prefix.

```js
const emitter = new Emitter({
  on: [
    // [type, listener, options?]

    // hook event
    ["test1", (event) => {
      console.log(event.type, event);
    }],
    ["test2", (event) => {
      console.log(event.type, event);
    }, {
      once: false,
      order: 1,  // Order when there is an event with the same name.
    }],

    // filter event
    ["filter:disabled", (event) => {
      const currentValue = event.data;
      // something...
      return "new value";
    }],
  ],
});
```

### extends
```js
class Hoge extends Emitter {
  constructor(options) {
    super(options);
  }
}

new Hoge({
  on: [
    // ...
  ],
});
```

### on(), off()
There are also `on()` and `off()` methods.

```js
const listener = (event) => {
      console.log(event.type, event);
    };

// (type, listener, options?)
emitter.on("test1", listener, {
      once: false,
      order: 1,  // Order when there is an event with the same name.
    });

// (type, listener)
emitter.off("test1", listener);
```

### hook()
Emit a hook event.

```js
emitter.hook("test1");
emitter.hook("test2", "some value");
```

### filter()
Emit a filter event.  
Omit the `"filter:"` prefix. (`"filter:disabled"` => `"disabled"`)

```js
const dynamicDisabled = emitter.filter("disabled");

if (dynamicDisabled) {
  // something...
}
```

### event
Arguments passed to the callback function.

```js
{
  target: emitter,
  type: "test1",
  data: any,  // Optional. Second argument to `hook()` or `filter()`.
}
```

### destroy()
You can do `destroy()`.

```js
emitter.destroy();
```

## License
Emitter is available under the [MIT license](LICENSE.md).