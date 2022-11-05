const emitter = new Emitter({
  on: [
    ["myhook", (event) => console.log("hook:", event.type, event)],
    ["filter:myfilter", (event) => {
      console.log("filter:", event.type, event);
      return "new value";
    }],
  ],
});

emitter.hook("myhook", "some data");

const newValue = emitter.filter("myfilter", "old value");
console.log("newValue", newValue);