/*! @bivarcs/emitter 0.0.7 | MIT | https://github.com/bivarcs/emitter */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
class Emitter {
  constructor(options) {
    this.Emitter$entries = {};
    if (options && options.on) {
      options.on.forEach(entry => {
        this.on(...entry);
      });
    }
  }
  on(type, callback, options) {
    let entries = this.Emitter$entries;
    if (!entries[type] || !entries[type].some(entry => {
      return type === entry[0] && callback === entry[1];
    })) {
      if (!entries[type]) {
        entries[type] = [];
      }
      entries[type].push([type, callback, __spreadValues(__spreadValues({}, {
        once: false,
        order: 0
      }), options)]);
      entries[type].sort((a, b) => (a[2].order || 0) - (b[2].order || 0));
    }
  }
  off(type, callback) {
    let entries = this.Emitter$entries;
    if (entries[type]) {
      entries[type] = entries[type].filter(entry => {
        return callback !== entry[1];
      });
    }
  }
  emit(type, data) {
    let entries = this.Emitter$entries;
    let event = __spreadProps(__spreadValues({}, data && "object" === typeof data && !Array.isArray(data) ? data : {
      data
    }), {
      type,
      target: this
    });
    if (entries[type] && entries[type].length) {
      entries[type].forEach(entry => {
        entry[1](event);
        if (entry[2].once) {
          this.off(type, entry[1]);
        }
      });
    }
    return event;
  }
  destroy() {
    this.Emitter$entries = {};
  }
}
exports["default"] = Emitter;
