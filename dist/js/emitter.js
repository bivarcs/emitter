/*! @bivarcs/emitter 0.0.1 | MIT | https://github.com/bivarcs/emitter */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Emitter = factory());
})(this, function () {
  'use strict';

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
        this.event.push([type, callback, options || {}]);
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
            if (entry[2]) {
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
  return Emitter;
});
