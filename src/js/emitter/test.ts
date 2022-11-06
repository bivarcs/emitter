import { Emitter } from './class';

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

test('filter()', () => {
  const emitter = new Emitter;

  emitter.on("filter:test", (event) => {
    return event.data + 2;
  }, {
    once: true,
  });


  expect(emitter.filter("test", 1)).toBe(3);
  expect(emitter.filter("test", 1)).toBe(undefined);
});

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