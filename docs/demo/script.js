const emitter = new Emitter({
  on: [
    ["myevent", (event) => {
      console.log("event:", event);
      console.log("event.type:", event.type);
      console.log("event.data:", event.data);
    }],
  ],
});

emitter.emit("myevent", "some data");
