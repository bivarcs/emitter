import { Emitter } from '../class';

test('off()', () => {
  const emitter = new Emitter;

  // off
  let count = 0;

  const listener = () => {
    ++count;
  };

  emitter.on("test", listener);
  emitter.emit("test");
  emitter.emit("test");

  emitter.off("test", listener)
  emitter.emit("test");

  expect(count).toBe(2);
});