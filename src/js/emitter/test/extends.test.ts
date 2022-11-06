import { Emitter } from '../class';

test('extends', () => {
  class Parent extends Emitter {

  }

  const emitter = new Parent({
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