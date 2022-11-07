import { Emitter } from '../class';

test('test', () => {
  const emitter = new Emitter;

  let count = 0;

  emitter.on("test", (event) => {
    expect(event.data).toBe("hoge");

    ++count;
  }, {
    once: true,
  });

  emitter.emit("test", "hoge");
  emitter.emit("test");
  expect(count).toBe(1);
});
