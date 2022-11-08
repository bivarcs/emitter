# Emitter
![](https://img.shields.io/npm/types/@bivarcs/emitter)
![](https://img.shields.io/node/v/@bivarcs/emitter)
![](https://img.shields.io/github/license/bivarcs/emitter)

A generic event emitter class.

## Demo
https://bivarcs.github.io/emitter/demo/

```js
const emitter = new Emitter({
  on: [
    ["myevent", (event) => console.log("event:", event)],
  ],
});

emitter.emit("myevent", {
  hoge: "fuga",
});
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
```js
const emitter = new Emitter({
  on: [
    // [type, listener, options?]
    ["test1", (event) => {
      console.log(event.type, event);
    }],
    ["test2", (event) => {
      console.log(event.type, event);
    }, {
      once: false,  // One-time run.
      order: 1,  // Order in events of the same type.
    }],
  ],
});
```

### extends
Please create the extended class as follows.

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
emitter.on("test", listener, {
  once: false,
  order: 1,
});

// (type, listener)
emitter.off("test", listener);
```

### emit()
Emit an event.  
The second argument is interpreted as `{data: value}` if it is not an object.

```js
emitter.emit("test1");
/*
The callback is received as the first argument.

{
  type: "test1",
  target: instance,
}
*/

emitter.emit("test2", {
  hoge: "some value1",
  fufa: "some value2",
});
/*
{
  type: "test2",
  target: instance,
  hoge: "some value1",
  fufa: "some value2",
}
*/

emitter.emit("test3", "some value");
/*
{
  type: "test3",
  target: instance,
  data: "some value",
}
*/
```

### destroy()
You can do `destroy()`.

```js
emitter.destroy();
```

## License
Emitter is available under the [MIT license](LICENSE.md).