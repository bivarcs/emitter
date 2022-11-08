const emitter = new Emitter({
  on: [
    ["myevent", (event) => {
      console.log("event:", event);
    }],
  ],
});

emitter.emit("myevent", {
  test: "some data",
});



/*
  defaultPrevented: false,
  preventDefault: function () {
    this.defaultPrevented = true;
  },
*/