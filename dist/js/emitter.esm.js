/*! @bivarcs/emitter 0.0.5 | MIT | https://github.com/bivarcs/emitter */
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)) {
    if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  return a;
};
class Emitter {
  constructor(options) {
    this.event = [];
    if (options && options.on) {
      options.on.forEach(entry => {
        this.on(...entry);
      });
    }
  }
  on(type, callback, options) {
    if (this.event && !this.event.some(entry => {
      return type === entry[0] && callback === entry[1];
    })) {
      this.event.push([type, callback, __spreadValues(__spreadValues({}, {
        once: false,
        order: 0
      }), options)]);
      this.event.sort((a, b) => (a[2].order || 0) - (b[2].order || 0));
    }
  }
  off(type, callback) {
    if (this.event) {
      this.event = this.event.filter(entry => {
        return !(type === entry[0] && callback === entry[1]);
      });
    }
  }
  filter(shortType, data) {
    if (this.event) {
      var value;
      this.event.forEach(entry => {
        var type = "filter:" + shortType;
        if (type === entry[0]) {
          value = entry[1]({
            data,
            target: this,
            type
          });
          if (entry[2].once) {
            this.off(type, entry[1]);
          }
        }
      });
      return value;
    }
  }
  hook(type, data) {
    if (this.event) {
      this.event.forEach(entry => {
        if (type === entry[0]) {
          entry[1]({
            data,
            target: this,
            type
          });
          if (entry[2].once) {
            this.off(type, entry[1]);
          }
        }
      });
    }
  }
  destroy() {
    this.event = null;
  }
}
export { Emitter as default };
