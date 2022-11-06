import { Emitter } from '../class';

test('hook', () => {
  const emitter = new Emitter;

  let hookCount = 0;

  emitter.on("test", (event) => {
    expect(event.data).toBe("hoge");

    ++hookCount;
  }, {
    once: true,
  });

  emitter.hook("test", "hoge");
  emitter.hook("test");
  expect(hookCount).toBe(1);
});
