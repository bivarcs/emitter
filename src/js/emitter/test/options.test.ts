import { Emitter } from '../class';

test('options', () => {
  const emitter = new Emitter({
    hoge: "fuga",
    on: [
      ["filter:test", (event) => {
        return event.data + 2;
      }, {
          once: true,
        }],
    ],
  });

  expect(emitter.filter("test", 1)).toBe(3);
  expect(emitter.filter("test", 1)).toBe(undefined);
});