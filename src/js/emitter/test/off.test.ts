import { Emitter } from '../class';

test('off()', () => {
  const emitter = new Emitter;

  // off
  let hookCount = 0;

  const listener = () => {
    ++hookCount;
  };

  emitter.on("test", listener);
  emitter.hook("test");
  emitter.hook("test");

  emitter.off("test", listener)
  emitter.hook("test");

  expect(hookCount).toBe(2);
});