(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var iro = require("iro.js");
var colorCheckerInterval = void 0;
var colorIsChanging = false;

var colorPickerElem = document.getElementById("color-picker-container");
var colorPicker = new iro.ColorPicker(colorPickerElem, {
  width: 320,
  height: 320,
  color: "#DCD0F3"
});

colorPicker.on("color:change", function (color, changes) {
  socket.emit('color change', color.hexString);
  document.body.style.backgroundColor = color.hexString;
});

function setBgToId(id, color) {
  document.getElementById(id).style.backgroundColor = "#" + color;
}

function setTxtToId(id, color) {
  document.getElementById(id).style.color = "#" + color;
}

},{"iro.js":2}],2:[function(require,module,exports){
/*!
 * iro.js v3.2.0
 * 2016-2017 James Daniel
 * Released under the MIT license
 * github.com/jaames/iro.js
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["iro"] = factory();
	else
		root["iro"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var round = Math.round,
    floor = Math.floor;

// TODO: compare(rgb, hsv, hsl) + clone methods

/**
  * @desc convert hsv object to rgb
  * @param {Object} hsv - hsv object
  * @return {Object} rgb object
*/
function hsv2Rgb(hsv) {
  var r, g, b, i, f, p, q, t;
  var h = hsv.h / 360,
      s = hsv.s / 100,
      v = hsv.v / 100;
  i = floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;break;
    case 1:
      r = q, g = v, b = p;break;
    case 2:
      r = p, g = v, b = t;break;
    case 3:
      r = p, g = q, b = v;break;
    case 4:
      r = t, g = p, b = v;break;
    case 5:
      r = v, g = p, b = q;break;
  }
  return { r: round(r * 255), g: round(g * 255), b: round(b * 255) };
};

/**
  * @desc convert rgb object to hsv
  * @param {Object} rgb - rgb object
  * @return {Object} hsv object
*/
function rgb2Hsv(rgb) {
  // Modified from https://github.com/bgrins/TinyColor/blob/master/tinycolor.js#L446
  var r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255,
      max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      delta = max - min,
      hue;
  switch (max) {
    case min:
      hue = 0;break;
    case r:
      hue = (g - b) / delta + (g < b ? 6 : 0);break;
    case g:
      hue = (b - r) / delta + 2;break;
    case b:
      hue = (r - g) / delta + 4;break;
  }
  hue /= 6;
  return {
    h: round(hue * 360),
    s: round(max == 0 ? 0 : delta / max * 100),
    v: round(max * 100)
  };
};

/**
  * @desc convert hsv object to hsl
  * @param {Object} hsv - hsv object
  * @return {Object} hsl object
*/
function hsv2Hsl(hsv) {
  var s = hsv.s / 100,
      v = hsv.v / 100;
  var l = 0.5 * v * (2 - s);
  s = v * s / (1 - Math.abs(2 * l - 1));
  return {
    h: hsv.h,
    s: round(s * 100) || 0,
    l: round(l * 100)
  };
};

/**
  * @desc convert hsl object to hsv
  * @param {Object} hsl - hsl object
  * @return {Object} hsv object
*/
function hsl2Hsv(hsl) {
  var s = hsl.s / 100,
      l = hsl.l / 100;
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  return {
    h: hsl.h,
    s: round(2 * s / (l + s) * 100),
    v: round((l + s) / 2 * 100)
  };
};

/**
  * @desc convert rgb object to string
  * @param {Object} rgb - rgb object
  * @return {Object} rgb string
*/
function rgb2Str(rgb) {
  return "rgb" + (rgb.a ? "a" : "") + "(" + rgb.r + ", " + rgb.g + ", " + rgb.b + (rgb.a ? ", " + rgb.a : "") + ")";
};

/**
  * @desc convert hsl object to string
  * @param {Object} hsl - hsl object
  * @return {Object} hsl string
*/
function hsl2Str(hsl) {
  return "hsl" + (hsl.a ? "a" : "") + "(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%" + (hsl.a ? ", " + hsl.a : "") + ")";
};

/**
  * @desc convert rgb object to hex string
  * @param {Object} rgb - rgb object
  * @return {Object} hex string
*/
function rgb2Hex(rgb) {
  var r = rgb.r,
      g = rgb.g,
      b = rgb.b;
  // If each RGB channel's value is a multiple of 17, we can use HEX shorthand notation
  var useShorthand = r % 17 == 0 && g % 17 == 0 && b % 17 == 0,

  // If we're using shorthand notation, divide each channel by 17
  divider = useShorthand ? 17 : 1,

  // bitLength of each channel (for example, F is 4 bits long while FF is 8 bits long)
  bitLength = useShorthand ? 4 : 8,

  // Target length of the string (ie "#FFF" or "#FFFFFF")
  strLength = useShorthand ? 4 : 7,

  // Combine the channels together into a single integer
  int = r / divider << bitLength * 2 | g / divider << bitLength | b / divider,

  // Convert that integer to a hex string
  str = int.toString(16);
  // Add right amount of left-padding
  return "#" + new Array(strLength - str.length).join("0") + str;
};

/**
  * @desc generic parser for hsl / rgb / etc string
  * @param {String} str - color string
  * @param {Array} maxValues - max values for each channel (used for calculating percent-based values)
  * @return {Array} type (rgb | rgba | hsl | hsla) values for each channel
*/
function parseColorStr(str, maxValues) {
  var parsed = str.match(/(\S+)\((\d+)(%?)(?:\D+?)(\d+)(%?)(?:\D+?)(\d+)(%?)(?:\D+?)?([0-9\.]+?)?\)/i),
      val1 = parseInt(parsed[2]),
      val2 = parseInt(parsed[4]),
      val3 = parseInt(parsed[6]);
  return [parsed[1], parsed[3] == "%" ? val1 / 100 * maxValues[0] : val1, parsed[5] == "%" ? val2 / 100 * maxValues[1] : val2, parsed[7] == "%" ? val3 / 100 * maxValues[2] : val3, parseFloat(parsed[8]) || undefined];
};

/**
  * @desc parse rgb string
  * @param {String} str - color string
  * @return {Object} rgb object
*/
function parseRgbStr(str) {
  var parsed = parseColorStr(str, [255, 255, 255]);
  return {
    r: parsed[1],
    g: parsed[2],
    b: parsed[3]
  };
};

/**
  * @desc parse hsl string
  * @param {String} str - color string
  * @return {Object} hsl object
*/
function parseHslStr(str) {
  var parsed = parseColorStr(str, [360, 100, 100]);
  return {
    h: parsed[2],
    s: parsed[3],
    l: parsed[4]
  };
};

/**
  * @desc parse hex string
  * @param {String} str - color string
  * @return {Object} rgb object
*/
function parseHexStr(hex) {
  // Strip any "#" characters
  hex = hex.replace("#", "");
  // Prefix the hex string with "0x" which indicates a number in hex notation, then convert to an integer
  var int = parseInt("0x" + hex),

  // If the length of the input is only 3, then it is a shorthand hex color
  isShorthand = hex.length == 3,

  // bitMask for isolating each channel
  bitMask = isShorthand ? 0xF : 0xFF,

  // bitLength of each channel (for example, F is 4 bits long while FF is 8 bits long)
  bitLength = isShorthand ? 4 : 8,

  // If we're using shorthand notation, multiply each channel by 17
  multiplier = isShorthand ? 17 : 1;
  return {
    r: (int >> bitLength * 2 & bitMask) * multiplier,
    g: (int >> bitLength & bitMask) * multiplier,
    b: (int & bitMask) * multiplier
  };
};

/**
  * @desc convert object / string input to color if necessary
  * @param {Object | String | color} value - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @return {color} color instance
*/
function getColor(value) {
  return value instanceof color ? value : new color(value);
};

/**
  * @desc clamp value between min and max
  * @param {Number} value
  * @param {Number} min
  * @param {Number} max
  * @return {Number}
*/
function clamp(value, min, max) {
  return value <= min ? min : value >= max ? max : value;
};

/**
  * @desc compare values between two objects, returns a object representing changes with true/false values
  * @param {Object} a
  * @param {Object} b
  * @return {Object}
*/
function compareObjs(a, b) {
  var changes = {};
  for (var key in a) {
    changes[key] = b[key] != a[key];
  }return changes;
};

/**
  * @desc mix two colors
  * @param {Object | String | color} color1 - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @param {Object | String | color} color2 - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @param {Number} weight - closer to 0 = more color1, closer to 100 = more color2
  * @return {color} color instance
*/
function _mix(color1, color2, weight) {
  var rgb1 = getColor(color1).rgb,
      rgb2 = getColor(color2).rgb;
  weight = clamp(weight / 100 || 0.5, 0, 1);
  return new color({
    r: floor(rgb1.r + (rgb2.r - rgb1.r) * weight),
    g: floor(rgb1.g + (rgb2.g - rgb1.g) * weight),
    b: floor(rgb1.b + (rgb2.b - rgb1.b) * weight)
  });
};

/**
  * @desc lighten color by amount
  * @param {Object | String | color} color - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @param {Number} amount
  * @return {color} color instance
*/
function _lighten(color, amount) {
  var col = getColor(color),
      hsv = col.hsv;
  hsv.v = clamp(hsv.v + amount, 0, 100);
  col.hsv = hsv;
  return col;
};

/**
  * @desc darken color by amount
  * @param {Object | String | color} color - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @param {Number} amount
  * @return {color} color instance
*/
function _darken(color, amount) {
  var col = getColor(color),
      hsv = col.hsv;
  hsv.v = clamp(hsv.v - amount, 0, 100);
  col.hsv = hsv;
  return col;
};

/**
  * @constructor color object
  * @param {Object | String | color} value - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
*/
var color = function color(value) {
  // The watch callback function for this color will be stored here
  this._onChange = false;
  // The default color value
  this._value = { h: undefined, s: undefined, v: undefined };
  if (value) this.set(value);
};

// Expose functions as static helpers
color.mix = _mix;
color.lighten = _lighten;
color.darken = _darken;
color.hsv2Rgb = hsv2Rgb;
color.rgb2Hsv = rgb2Hsv;
color.hsv2Hsl = hsv2Hsl;
color.hsl2Hsv = hsl2Hsv;
color.hsl2Str = hsl2Str;
color.rgb2Str = rgb2Str;
color.rgb2Hex = rgb2Hex;
color.parseHexStr = parseHexStr;
color.parseHslStr = parseHslStr;
color.parseRgbStr = parseRgbStr;

color.prototype = {
  constructor: color,

  /**
    * @desc set the color from any valid value
    * @param {Object | String | color} value - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  */
  set: function set(value) {
    if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
      if (value instanceof color) {
        this.hsv = color.hsv;
      } else if ("r" in value) {
        this.rgb = value;
      } else if ("v" in value) {
        this.hsv = value;
      } else if ("l" in value) {
        this.hsl = value;
      }
    } else if (typeof value == "string") {
      if (/^rgb/.test(value)) {
        this.rgbString = value;
      } else if (/^hsl/.test(value)) {
        this.hslString = value;
      } else if (/^#[0-9A-Fa-f]/.test(value)) {
        this.hexString = value;
      }
    }
  },

  /**
    * @desc shortcut to set a specific channel value
    * @param {String} model - hsv | hsl | rgb
    * @param {String} channel - individual channel to set, for example if model = hsl, chanel = h | s | l
    * @param {Number} value - new value for the channel
  */
  setChannel: function setChannel(model, channel, value) {
    var v = this[model];
    v[channel] = value;
    this[model] = v;
  },

  /**
    * @desc make new color instance with the same value as this one
    * @return {color}
  */
  clone: function clone() {
    return new color(this);
  },

  /**
    * @desc compare this color against another, returns a object representing changes with true/false values
    * @param {Object | String | color} color - color to compare against
    * @param {String} model - hsv | hsl | rgb
    * @return {Object}
  */
  compare: function compare(color, model) {
    model = model || "hsv";
    return compareObjs(this[model], getColor(color)[model]);
  },

  /**
    * @desc mix a color into this one
    * @param {Object | String | color} color - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    * @param {Number} weight - closer to 0 = more current color, closer to 100 = more new color
  */
  mix: function mix(color, weight) {
    this.hsv = _mix(this, color, weight).hsv;
  },

  /**
    * @desc lighten color by amount
    * @param {Number} amount
  */
  lighten: function lighten(amount) {
    _lighten(this, amount);
  },

  /**
    * @desc darken color by amount
    * @param {Number} amount
  */
  darken: function darken(amount) {
    _darken(this, amount);
  }
};

Object.defineProperties(color.prototype, {
  hsv: {
    get: function get() {
      // _value is cloned to allow changes to be made to the values before passing them back
      var v = this._value;
      return { h: v.h, s: v.s, v: v.v };
    },
    set: function set(newValue) {
      // If this color is being watched for changes we need to compare the new and old values to check the difference
      // Otherwise we can just be lazy
      if (this._onChange) {
        var oldValue = this._value;
        for (var channel in oldValue) {
          if (!newValue.hasOwnProperty(channel)) newValue[channel] = oldValue[channel];
        }
        var changes = compareObjs(oldValue, newValue);
        // Update the old value
        this._value = newValue;
        // If the value has changed, call hook callback
        if (changes.h || changes.s || changes.v) this._onChange(this, changes);
      } else {
        this._value = newValue;
      }
    }
  },
  rgb: {
    get: function get() {
      return hsv2Rgb(this._value);
    },
    set: function set(value) {
      this.hsv = rgb2Hsv(value);
    }
  },
  hsl: {
    get: function get() {
      return hsv2Hsl(this._value);
    },
    set: function set(value) {
      this.hsv = hsl2Hsv(value);
    }
  },
  rgbString: {
    get: function get() {
      return rgb2Str(this.rgb);
    },
    set: function set(value) {
      this.rgb = parseRgbStr(value);
    }
  },
  hexString: {
    get: function get() {
      return rgb2Hex(this.rgb);
    },
    set: function set(value) {
      this.rgb = parseHexStr(value);
    }
  },
  hslString: {
    get: function get() {
      return hsl2Str(this.hsl);
    },
    set: function set(value) {
      this.hsl = color.parseHslStr(value);
    }
  }
});

module.exports = color;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
  @constructor stylesheet writer
*/
var stylesheet = function stylesheet() {
  // Create a new style element
  var style = document.createElement("style");
  document.head.appendChild(style);
  // Webkit apparently requires a text node to be inserted into the style element
  // (according to https://davidwalsh.name/add-rules-stylesheets)
  style.appendChild(document.createTextNode(""));
  this.style = style;
  // Create a reference to the style element's CSSStyleSheet object
  // CSSStyleSheet API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
  var sheet = style.sheet;
  this.sheet = sheet;
  // Get a reference to the sheet's CSSRuleList object
  // CSSRuleList API: https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList
  this.rules = sheet.rules || sheet.cssRules;
  // We'll store references to all the CSSStyleDeclaration objects that we change here, keyed by the CSS selector they belong to
  // CSSStyleDeclaration API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
  this.map = {};
};

stylesheet.prototype = {
  constructor: stylesheet,

  /**
    * @desc Set a specific rule for a given selector
    * @param {String} selector - the CSS selector for this rule (e.g. "body", ".class", "#id")
    * @param {String} property - the CSS property to set (e.g. "background-color", "font-family", "z-index")
    * @param {String} value    - the new value for the rule (e.g. "rgb(255, 255, 255)", "Helvetica", "99")
  */
  setRule: function setRule(selector, property, value) {
    var sheet = this.sheet;
    var rules = sheet.rules || sheet.cssRules;
    var map = this.map;
    // Convert property from camelCase to snake-case
    property = property.replace(/([A-Z])/g, function ($1) {
      return "-" + $1.toLowerCase();
    });
    if (!map.hasOwnProperty(selector)) {
      // If the selector hasn't been used yet we want to insert the rule at the end of the CSSRuleList, so we use its length as the index value
      var index = rules.length;
      // Prepare the rule declaration text, since both insertRule and addRule take this format
      var declaration = property + ": " + value;
      // Insert the new rule into the stylesheet
      try {
        // Some browsers only support insertRule, others only support addRule, so we have to use both
        sheet.insertRule(selector + " {" + declaration + ";}", index);
      } catch (e) {
        sheet.addRule(selector, declaration, index);
      } finally {
        // Because safari is perhaps the worst browser in all of history, we have to remind it to keep the sheet rules up-to-date
        rules = sheet.rules || sheet.cssRules;
        // Add our newly inserted rule's CSSStyleDeclaration object to the internal map
        map[selector] = rules[index].style;
      }
    } else {
      map[selector].setProperty(property, value);
    }
  }
};

Object.defineProperties(stylesheet.prototype, {
  enabled: {
    get: function get() {
      return !this.sheet.disabled;
    },
    set: function set(value) {
      this.sheet.disabled = !value;
    }
  },
  // TODO: consider removing cssText + css properties since i don't tink they're that useful
  cssText: {
    /**
      * @desc Get the stylesheet text
      * @return {String} css text
    */
    get: function get() {
      var map = this.map;
      var ret = [];
      for (var selector in map) {
        ret.push(selector.replace(/,\W/g, ",\n") + " {\n\t" + map[selector].cssText.replace(/;\W/g, ";\n\t") + "\n}");
      }
      return ret.join("\n");
    }
  },
  css: {
    /**
     * @desc Get an object representing the current css styles
     * @return {Object} css object
    */
    get: function get() {
      var map = this.map;
      var ret = {};
      for (var selector in map) {
        var ruleSet = map[selector];
        ret[selector] = {};
        for (var i = 0; i < ruleSet.length; i++) {
          var property = ruleSet[i];
          ret[selector][property] = ruleSet.getPropertyValue(property);
        }
      }
      return ret;
    }
  }
});

module.exports = stylesheet;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// css class prefix for this element
var CLASS_PREFIX = "iro__marker";

/**
 * @constructor marker UI
 * @param {svgRoot} svg - svgRoot object
 * @param {Object} opts - options
*/
var marker = function marker(svg, opts) {
  var baseGroup = svg.g({
    class: CLASS_PREFIX
  });
  baseGroup.circle(0, 0, opts.r, {
    class: CLASS_PREFIX + "__outer",
    fill: "none",
    strokeWidth: 5,
    stroke: "#000"
  });
  baseGroup.circle(0, 0, opts.r, {
    class: CLASS_PREFIX + "__inner",
    fill: "none",
    strokeWidth: 2,
    stroke: "#fff"
  });
  this.g = baseGroup;
};

marker.prototype = {
  constructor: marker,

  /**
    * @desc move marker to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move: function move(x, y) {
    this.g.setTransform("translate", [x, y]);
  }
};

module.exports = marker;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wheel = __webpack_require__(7);

var _wheel2 = _interopRequireDefault(_wheel);

var _slider = __webpack_require__(5);

var _slider2 = _interopRequireDefault(_slider);

var _svg = __webpack_require__(6);

var _svg2 = _interopRequireDefault(_svg);

var _color = __webpack_require__(0);

var _color2 = _interopRequireDefault(_color);

var _stylesheet = __webpack_require__(1);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_MOUSEDOWN = "mousedown",
    EVENT_MOUSEMOVE = "mousemove",
    EVENT_MOUSEUP = "mouseup",
    EVENT_TOUCHSTART = "touchstart",
    EVENT_TOUCHMOVE = "touchmove",
    EVENT_TOUCHEND = "touchend",
    EVENT_READYSTATE_CHANGE = "readystatechange",
    READYSTATE_COMPLETE = "complete";

/**
  * @desc listen to one or more events on an element
  * @param {Element} el target element
  * @param {Array} eventList the events to listen to
  * @param {Function} callback the event callback function
*/
function listen(el, eventList, callback) {
  for (var i = 0; i < eventList.length; i++) {
    el.addEventListener(eventList[i], callback);
  }
};

/**
  * @desc remove an event listener on an element
  * @param {Element} el target element
  * @param {Array} eventList the events to remove
  * @param {Function} callback the event callback function
*/
function unlisten(el, eventList, callback) {
  for (var i = 0; i < eventList.length; i++) {
    el.removeEventListener(eventList[i], callback);
  }
};

/**
  * @desc call fn callback when the page document is ready
  * @param {Function} callback callback function to be called
*/
function whenReady(callback) {
  var _this = this;
  if (document.readyState == READYSTATE_COMPLETE) {
    callback();
  } else {
    listen(document, [EVENT_READYSTATE_CHANGE], function stateChange(e) {
      if (document.readyState == READYSTATE_COMPLETE) {
        callback();
        unlisten(document, [EVENT_READYSTATE_CHANGE], stateChange);
      }
    });
  }
};

/**
  * @constructor color wheel object
  * @param {Element | String} el - a DOM element or the CSS selector for a DOM element to use as a container for the UI
  * @param {Object} opts - options for this instance
*/
var colorPicker = function colorPicker(el, opts) {
  var _this2 = this;

  opts = opts || {};
  // event storage for `on` and `off`
  this._events = {};
  this._mouseTarget = false;
  this._colorChangeActive = false;
  this.css = opts.css || opts.styles || undefined;
  // Wait for the document to be ready, then init the UI
  whenReady(function () {
    _this2._init(el, opts);
  });
};

colorPicker.prototype = {
  constructor: colorPicker,

  /**
    * @desc init the color picker UI
    * @param {Element | String} el - a DOM element or the CSS selector for a DOM element to use as a container for the UI
    * @param {Object} opts - options for this instance
    * @access protected
  */
  _init: function _init(el, opts) {
    var _this3 = this;

    // If `el` is a string, use it to select an Element, else assume it's an element
    el = "string" == typeof el ? document.querySelector(el) : el;
    // Find the width and height for the UI
    // If not defined in the options, try the HTML width + height attributes of the wrapper, else default to 320
    var width = opts.width || parseInt(el.width) || 320;
    var height = opts.height || parseInt(el.height) || 320;
    // Calculate layout variables
    var padding = opts.padding + 2 || 6,
        borderWidth = opts.borderWidth || 0,
        markerRadius = opts.markerRadius || 8,
        sliderMargin = opts.sliderMargin || 24,
        sliderHeight = opts.sliderHeight || markerRadius * 2 + padding * 2 + borderWidth * 2,
        bodyWidth = Math.min(height - sliderHeight - sliderMargin, width),
        wheelRadius = bodyWidth / 2 - borderWidth,
        leftMargin = (width - bodyWidth) / 2;
    var marker = {
      r: markerRadius
    };
    var borderStyles = {
      w: borderWidth,
      color: opts.borderColor || "#fff"
    };

    // Create UI elements
    this.el = el;
    this.svg = new _svg2.default(el, width, height);
    this.ui = [new _wheel2.default(this.svg, {
      cX: leftMargin + bodyWidth / 2,
      cY: bodyWidth / 2,
      r: wheelRadius,
      rMax: wheelRadius - (markerRadius + padding),
      marker: marker,
      border: borderStyles,
      lightness: opts.wheelLightness == undefined ? true : opts.wheelLightness,
      anticlockwise: opts.anticlockwise
    }), new _slider2.default(this.svg, {
      sliderType: "v",
      x: leftMargin + borderWidth,
      y: bodyWidth + sliderMargin,
      w: bodyWidth - borderWidth * 2,
      h: sliderHeight - borderWidth * 2,
      r: sliderHeight / 2 - borderWidth,
      marker: marker,
      border: borderStyles
    })];
    // Create an iroStyleSheet for this colorWheel's CSS overrides
    this.stylesheet = new _stylesheet2.default();
    // Create an iroColor to store this colorWheel's selected color
    this.color = new _color2.default();
    // Whenever the selected color changes, trigger a colorWheel update too
    this.color._onChange = this._update.bind(this);
    this.color.set(opts.color || opts.defaultValue || "#fff");
    // Hacky workaround for a couple of Safari SVG url bugs
    // See https://github.com/jaames/iro.js/issues/18
    // TODO: perhaps make this a seperate plugin, it's hacky and takes up more space than I'm happy with
    this.on("history:stateChange", function (base) {
      _this3.svg.updateUrls(base);
    });
    // Listen to events
    listen(this.svg.el, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this);
  },

  /**
    * @desc update the selected color
    * @param {Object} newValue - the new HSV values
    * @param {Object} oldValue - the old HSV values
    * @param {Object} changes - booleans for each HSV channel: true if the new value is different to the old value, else false
    * @access protected
  */
  _update: function _update(color, changes) {
    var rgb = color.rgbString;
    var css = this.css;
    // Loop through each UI element and update it
    for (var i = 0; i < this.ui.length; i++) {
      this.ui[i].update(color, changes);
    }
    // Update the stylesheet too
    for (var selector in css) {
      var properties = css[selector];
      for (var prop in properties) {
        this.stylesheet.setRule(selector, prop, rgb);
      }
    }
    // Prevent infinite loops if the color is set inside a `color:change` callback
    if (!this._colorChangeActive) {
      // While _colorChangeActive = true, this event cannot be fired
      this._colorChangeActive = true;
      this.emit("color:change", color, changes);
      this._colorChangeActive = false;
    }
  },

  /**
  * @desc Set a callback function for an event
  * @param {String} eventType The name of the event to listen to, pass "*" to listen to all events
  * @param {Function} callback The watch callback
  */
  on: function on(eventType, callback) {
    var events = this._events;
    (events[eventType] || (events[eventType] = [])).push(callback);
  },

  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */
  off: function off(eventType, callback) {
    var eventList = this._events[eventType];
    if (eventList) evenList.splice(eventList.indexOf(callback), 1);
  },

  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Array} args array of args to pass to callbacks
  */
  emit: function emit(eventType) {
    var events = this._events,
        callbackList = (events[eventType] || []).concat(events["*"] || []);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(null, args);
    }
  },

  /**
    * @desc DOM event handler
    * @param {Event} e DOM event (currently either mouse or touch events)
  */
  handleEvent: function handleEvent(e) {
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    var point = e.touches ? e.changedTouches[0] : e,

    // Get the screen position of the UI
    rect = this.svg.el.getBoundingClientRect(),

    // Convert the screen-space pointer position to local-space
    x = point.clientX - rect.left,
        y = point.clientY - rect.top;

    switch (e.type) {
      case EVENT_MOUSEDOWN:
      case EVENT_TOUCHSTART:
        // Loop through each UI element and check if the point "hits" it
        for (var i = 0; i < this.ui.length; i++) {
          var uiElement = this.ui[i];
          // If the element is hit, this means the user has clicked the element and is trying to interact with it
          if (uiElement.checkHit(x, y)) {
            // Set an internal reference to the uiElement being interacted with, for other internal event handlers
            this._mouseTarget = uiElement;
            // Attach event listeners
            listen(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this);
            // Emit input start event
            this.emit("input:start");
            // Finally, use the position to update the picked color
            this.color.hsv = this._mouseTarget.input(x, y);
          }
        }
        break;
      case EVENT_MOUSEMOVE:
      case EVENT_TOUCHMOVE:
        // Use the position to update the picker color
        this.color.hsv = this._mouseTarget.input(x, y);
        break;
      case EVENT_MOUSEUP:
      case EVENT_TOUCHEND:
        this._mouseTarget = false;
        this.emit("input:end");
        unlisten(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this);
        break;
    }
    if (this._mouseTarget) {
      e.preventDefault();
    }
  }
};

module.exports = colorPicker;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _colorPicker = __webpack_require__(3);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _color = __webpack_require__(0);

var _color2 = _interopRequireDefault(_color);

var _stylesheet = __webpack_require__(1);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Color: _color2.default,
  ColorPicker: _colorPicker2.default,
  Stylesheet: _stylesheet2.default,
  version: "3.2.0"
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _marker = __webpack_require__(2);

var _marker2 = _interopRequireDefault(_marker);

var _color = __webpack_require__(0);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// css class prefix for this element
var CLASS_PREFIX = "iro__slider";

/**
  * @constructor slider UI
  * @param {svgRoot} svg - svgRoot object
  * @param {Object} opts - options
*/
var slider = function slider(svg, opts) {
  var r = opts.r,
      w = opts.w,
      h = opts.h,
      x = opts.x,
      y = opts.y,
      borderWidth = opts.border.w;

  // "range" limits how far the slider's marker can travel, and where it stops and starts along the X axis
  opts.range = {
    min: x + r,
    max: x + w - r,
    w: w - r * 2
  };

  opts.sliderType = opts.sliderType || "v";

  this.type = "slider";
  this._opts = opts;

  var radius = r + borderWidth / 2;

  var baseGroup = svg.g({
    class: CLASS_PREFIX
  });

  var rect = baseGroup.insert("rect", {
    class: CLASS_PREFIX + "__value",
    rx: radius,
    ry: radius,
    x: x - borderWidth / 2,
    y: y - borderWidth / 2,
    width: w + borderWidth,
    height: h + borderWidth,
    strokeWidth: borderWidth,
    stroke: opts.border.color
  });

  rect.setGradient("fill", svg.gradient("linear", {
    0: { color: "#000" },
    100: { color: "#fff" }
  }));

  this._gradient = rect.gradient;

  this.marker = new _marker2.default(baseGroup, opts.marker);
};

slider.prototype = {
  constructor: slider,

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */
  update: function update(color, changes) {
    var opts = this._opts;
    var range = opts.range;
    var hsv = color.hsv;
    var hsl = _color2.default.hsv2Hsl({ h: hsv.h, s: hsv.s, v: 100 });
    if (opts.sliderType == "v") {
      if (changes.h || changes.s) {
        this._gradient.stops[1].setAttrs({ stopColor: "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)" });
      }
      if (changes.v) {
        var percent = hsv.v / 100;
        this.marker.move(range.min + percent * range.w, opts.y + opts.h / 2);
      }
    }
  },

  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */
  input: function input(x, y) {
    var opts = this._opts;
    var range = opts.range;
    var dist = Math.max(Math.min(x, range.max), range.min) - range.min;
    return {
      v: Math.round(100 / range.w * dist)
    };
  },

  /**
    * @desc Check if a point at (x, y) is inside this element
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Boolean} - true if the point is a "hit", else false
  */
  checkHit: function checkHit(x, y) {
    var opts = this._opts;
    return x > opts.x && x < opts.x + opts.w && y > opts.y && y < opts.y + opts.h;
  }

};

module.exports = slider;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GRADIENT_INDEX = 0;
var GRADIENT_SUFFIX = "Gradient";
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var SVG_ATTRIBUTE_SHORTHANDS = {
  class: "class",
  stroke: "stroke",
  strokeWidth: "stroke-width",
  fill: "fill",
  opacity: "opacity",
  offset: "offset",
  stopColor: "stop-color",
  stopOpacity: "stop-opacity"
};
// TODO: figure out why these aren't being compressed properly?
var SVG_TRANSFORM_SHORTHANDS = {
  translate: "setTranslate",
  scale: "setScale",
  rotate: "setRotate"
};
// sniff useragent string to check if the user is running IE, Edge or Safari
var ua = window.navigator.userAgent.toLowerCase();
var IS_IE = /msie|trident|edge/.test(ua);
var IS_SAFARI = /^((?!chrome|android).)*safari/i.test(ua);
/**
  * @constructor svg element wrapper
  * @param {svgRoot} root - svgRoot object
  * @param {svgElement | Element} parent - parent node 
  * @param {String} type - element tag name
  * @param {Object} attrs - element attributes
*/
var svgElement = function svgElement(root, parent, type, attrs) {
  var el = document.createElementNS(SVG_NAMESPACE, type);
  this.el = el;
  this.setAttrs(attrs);
  (parent.el || parent).appendChild(el);
  this._root = root;
  this._svgTransforms = {};
  this._transformList = el.transform ? el.transform.baseVal : false;
};

svgElement.prototype = {
  constructor: svgElement,

  /**
    * @desc insert a new svgElement
    * @param {String} type - element tag name
    * @param {Object} attrs - element attributes
  */
  insert: function insert(type, attrs) {
    return new svgElement(this._root, this, type, attrs);
  },

  /**
    * @desc shorthand to insert a new group svgElement
    * @param {Object} attrs - element attributes
  */
  g: function g(attrs) {
    return this.insert("g", attrs);
  },

  /**
    * @desc shorthand to insert a new arc svgElement
    * @param {Number} cx - arc center x
    * @param {Number} cy - arc center y
    * @param {Number} radius - arc radius
    * @param {Number} startAngle - arc start angle (in degrees)
    * @param {Number} endAngle - arc end angle (in degrees)
    * @param {Object} attrs - element attributes
  */
  arc: function arc(cx, cy, radius, startAngle, endAngle, attrs) {
    var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    startAngle *= Math.PI / 180;
    endAngle *= Math.PI / 180;
    var x1 = cx + radius * Math.cos(endAngle),
        y1 = cy + radius * Math.sin(endAngle),
        x2 = cx + radius * Math.cos(startAngle),
        y2 = cy + radius * Math.sin(startAngle);
    attrs = attrs || {};
    attrs.d = ["M", x1, y1, "A", radius, radius, 0, largeArcFlag, 0, x2, y2].join(" ");
    return this.insert("path", attrs);
  },

  /**
    * @desc shorthand to insert a new circle svgElement
    * @param {Number} cx - circle center x
    * @param {Number} cy - circle center y
    * @param {Number} radius - circle radius
    * @param {Object} attrs - element attributes
  */
  circle: function circle(cx, cy, radius, attrs) {
    attrs = attrs || {};
    attrs.cx = cx;
    attrs.cy = cy;
    attrs.r = radius;
    return this.insert("circle", attrs);
  },

  /**
    * @desc set a rotate/translate/scale transform on this element
    * @param {String} type - transform (rotate | translate | scale)
    * @param {Array} args - transform values
  */
  setTransform: function setTransform(type, args) {
    if (!IS_IE) {
      var transform, transformFn;
      var svgTransforms = this._svgTransforms;
      if (!svgTransforms[type]) {
        transform = this._root.el.createSVGTransform();
        svgTransforms[type] = transform;
        this._transformList.appendItem(transform);
      } else {
        transform = svgTransforms[type];
      }
      transformFn = type in SVG_TRANSFORM_SHORTHANDS ? SVG_TRANSFORM_SHORTHANDS[type] : type;
      transform[transformFn].apply(transform, args);
    } else {
      // Microsoft still can't make a web browser that actually works, as such, Edge + IE dont implement SVG transforms properly.
      // We have to force them instead... geez
      this.setAttrs({ "transform": type + "(" + args.join(", ") + ")" });
    }
  },

  /**
    * @desc set attributes on this element
    * @param {Object} attrs - element attributes
  */
  setAttrs: function setAttrs(attrs) {
    for (var attr in attrs) {
      var name = attr in SVG_ATTRIBUTE_SHORTHANDS ? SVG_ATTRIBUTE_SHORTHANDS[attr] : attr;
      this.el.setAttribute(name, attrs[attr]);
    }
  },

  setGradient: function setGradient(attr, gradient) {
    var attrs = {};
    attrs[attr] = gradient.getUrl();
    gradient._refs[attr] = this;
    this.gradient = gradient;
    this.setAttrs(attrs);
  }
};

/**
  * @constructor svg gradient wrapper
  * @param {svgRoot} root - svgRoot object
  * @param {String} type - gradient type (linear | radial)
  * @param {Object} stops - gradient stops = {color, opacity} keyed by offset value
*/
var svgGradient = function svgGradient(root, type, stops) {
  var stopElements = [];
  var gradient = root._defs.insert(type + GRADIENT_SUFFIX, {
    id: "iro" + GRADIENT_SUFFIX + GRADIENT_INDEX++
  });
  for (var offset in stops) {
    var stop = stops[offset];
    stopElements.push(gradient.insert("stop", {
      offset: offset + "%",
      stopColor: stop.color,
      stopOpacity: stop.opacity === undefined ? 1 : stop.opacity
    }));
  }
  this.el = gradient.el;
  this.stops = stopElements;
  this._refs = {};
};

svgGradient.prototype.getUrl = function (base) {
  var root = IS_SAFARI ? base || window.location.href : "";
  return "url(" + root + "#" + this.el.id + ")";
};

/**
  * @constructor svg root element (inherits svgElement)
  * @param {svgElement | Element} parent - parent node 
  * @param {Number} width - svg width
  * @param {Number} height - svg height
*/
var svgRoot = function svgRoot(parent, width, height) {
  svgElement.call(this, this, parent, "svg", { width: width, height: height, style: "display:block" });
  this._defs = this.insert("defs");
  this._gradients = [];
};

svgRoot.prototype = Object.create(svgElement.prototype);
svgRoot.prototype.constructor = svgRoot;
svgRoot.prototype.gradient = function (type, stops) {
  var gradient = new svgGradient(this, type, stops);
  this._gradients.push(gradient);
  return gradient;
};
svgRoot.prototype.updateUrls = function (base) {
  if (IS_SAFARI) {
    var gradients = this._gradients;
    for (var i = 0; i < gradients.length; i++) {
      for (var key in gradients[i]._refs) {
        var attrs = {};
        attrs[key] = gradients[i].getUrl(base);
        gradients[i]._refs[key].setAttrs(attrs);
      }
    }
  }
};

module.exports = svgRoot;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _marker = __webpack_require__(2);

var _marker2 = _interopRequireDefault(_marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// css class prefix for this element
var CLASS_PREFIX = "iro__wheel";
// Quick references to reused math functions
var PI = Math.PI,
    sqrt = Math.sqrt,
    abs = Math.abs,
    round = Math.round;

/**
  * @constructor hue wheel UI
  * @param {svgRoot} svg - svgRoot object
  * @param {Object} opts - options
*/
var wheel = function wheel(svg, opts) {
  this._opts = opts;
  this.type = "wheel";

  var cY = opts.cY,
      cX = opts.cX,
      r = opts.r,
      border = opts.border;

  var baseGroup = svg.g({
    class: CLASS_PREFIX
  });

  baseGroup.circle(cX, cY, r + border.w / 2, {
    class: CLASS_PREFIX + "__border",
    fill: "#fff",
    stroke: border.color,
    strokeWidth: border.w
  });

  var ringGroup = baseGroup.g({
    class: CLASS_PREFIX + "__hue",
    strokeWidth: r,
    fill: "none"
  });

  for (var hue = 0; hue < 360; hue++) {
    ringGroup.arc(cX, cY, r / 2, hue, hue + 1.5, {
      stroke: "hsl(" + (opts.anticlockwise ? 360 - hue : hue) + ",100%,50%)"
    });
  }

  var saturation = baseGroup.circle(cX, cY, r, {
    class: CLASS_PREFIX + "__saturation"
  });

  saturation.setGradient("fill", svg.gradient("radial", {
    0: {
      color: "#fff"
    },
    100: {
      color: "#fff",
      opacity: 0
    }
  }));

  this._lightness = baseGroup.circle(cX, cY, r, {
    class: CLASS_PREFIX + "__lightness",
    opacity: 0
  });

  this.marker = new _marker2.default(baseGroup, opts.marker);
};

wheel.prototype = {
  constructor: wheel,

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */
  update: function update(color, changes) {
    var opts = this._opts;
    var hsv = color.hsv;
    // If the V channel has changed, redraw the wheel UI with the new value
    if (changes.v && opts.lightness) {
      this._lightness.setAttrs({ opacity: (1 - hsv.v / 100).toFixed(2) });
    }
    // If the H or S channel has changed, move the marker to the right position
    if (changes.h || changes.s) {
      // convert the hue value to radians, since we'll use it as an angle
      var hueAngle = (opts.anticlockwise ? 360 - hsv.h : hsv.h) * (PI / 180);
      // convert the saturation value to a distance between the center of the ring and the edge
      var dist = hsv.s / 100 * opts.rMax;
      // Move the marker based on the angle and distance
      this.marker.move(opts.cX + dist * Math.cos(hueAngle), opts.cY + dist * Math.sin(hueAngle));
    }
  },

  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */
  input: function input(x, y) {
    var opts = this._opts,
        rangeMax = opts.rMax,
        _x = opts.cX - x,
        _y = opts.cY - y;

    var angle = Math.atan2(_y, _x),

    // Calculate the hue by converting the angle to radians
    hue = round(angle * (180 / PI)) + 180,

    // Find the point's distance from the center of the wheel
    // This is used to show the saturation level
    dist = Math.min(sqrt(_x * _x + _y * _y), rangeMax);

    hue = opts.anticlockwise ? 360 - hue : hue;

    // Return just the H and S channels, the wheel element doesn't do anything with the L channel
    return {
      h: hue,
      s: round(100 / rangeMax * dist)
    };
  },

  /**
    * @desc Check if a point at (x, y) is inside this element
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Boolean} - true if the point is a "hit", else false
  */
  checkHit: function checkHit(x, y) {
    var opts = this._opts;

    // Check if the point is within the hue ring by comparing the point's distance from the centre to the ring's radius
    // If the distance is smaller than the radius, then we have a hit
    var dx = abs(x - opts.cX),
        dy = abs(y - opts.cY);
    return sqrt(dx * dx + dy * dy) < opts.r;
  }
};

module.exports = wheel;

/***/ })
/******/ ]);
});

},{}]},{},[1])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb2xvcnMuanMiLCJub2RlX21vZHVsZXMvaXJvLmpzL2Rpc3QvaXJvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLE1BQU0sUUFBUSxRQUFSLENBQVY7QUFDQSxJQUFJLDZCQUFKO0FBQ0EsSUFBSSxrQkFBa0IsS0FBdEI7O0FBRUEsSUFBSSxrQkFBa0IsU0FBUyxjQUFULENBQXdCLHdCQUF4QixDQUF0QjtBQUNBLElBQUksY0FBYyxJQUFJLElBQUksV0FBUixDQUFvQixlQUFwQixFQUFxQztBQUNyRCxTQUFPLEdBRDhDO0FBRXJELFVBQVEsR0FGNkM7QUFHckQsU0FBTztBQUg4QyxDQUFyQyxDQUFsQjs7QUFNQSxZQUFZLEVBQVosQ0FBZSxjQUFmLEVBQStCLFVBQVMsS0FBVCxFQUFnQixPQUFoQixFQUF5QjtBQUN0RCxTQUFPLElBQVAsQ0FBWSxjQUFaLEVBQTRCLE1BQU0sU0FBbEM7QUFDQSxXQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLGVBQXBCLEdBQXNDLE1BQU0sU0FBNUM7QUFDRCxDQUhEOztBQUtBLFNBQVMsU0FBVCxDQUFtQixFQUFuQixFQUF1QixLQUF2QixFQUE2QjtBQUMzQixXQUFTLGNBQVQsQ0FBd0IsRUFBeEIsRUFBNEIsS0FBNUIsQ0FBa0MsZUFBbEMsR0FBb0QsTUFBTSxLQUExRDtBQUNEOztBQUVELFNBQVMsVUFBVCxDQUFvQixFQUFwQixFQUF3QixLQUF4QixFQUE4QjtBQUM1QixXQUFTLGNBQVQsQ0FBd0IsRUFBeEIsRUFBNEIsS0FBNUIsQ0FBa0MsS0FBbEMsR0FBMEMsTUFBTSxLQUFoRDtBQUNEOzs7QUN0QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxldCBpcm8gPSByZXF1aXJlKFwiaXJvLmpzXCIpO1xubGV0IGNvbG9yQ2hlY2tlckludGVydmFsO1xudmFyIGNvbG9ySXNDaGFuZ2luZyA9IGZhbHNlO1xuXG5sZXQgY29sb3JQaWNrZXJFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1waWNrZXItY29udGFpbmVyXCIpXG5sZXQgY29sb3JQaWNrZXIgPSBuZXcgaXJvLkNvbG9yUGlja2VyKGNvbG9yUGlja2VyRWxlbSwge1xuICB3aWR0aDogMzIwLFxuICBoZWlnaHQ6IDMyMCxcbiAgY29sb3I6IFwiI0RDRDBGM1wiXG59KTtcblxuY29sb3JQaWNrZXIub24oXCJjb2xvcjpjaGFuZ2VcIiwgZnVuY3Rpb24oY29sb3IsIGNoYW5nZXMpIHtcbiAgc29ja2V0LmVtaXQoJ2NvbG9yIGNoYW5nZScsIGNvbG9yLmhleFN0cmluZyk7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3IuaGV4U3RyaW5nXG59KTtcblxuZnVuY3Rpb24gc2V0QmdUb0lkKGlkLCBjb2xvcil7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNcIiArIGNvbG9yXG59XG5cbmZ1bmN0aW9uIHNldFR4dFRvSWQoaWQsIGNvbG9yKXtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmNvbG9yID0gXCIjXCIgKyBjb2xvclxufVxuIiwiLyohXG4gKiBpcm8uanMgdjMuMi4wXG4gKiAyMDE2LTIwMTcgSmFtZXMgRGFuaWVsXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGdpdGh1Yi5jb20vamFhbWVzL2lyby5qc1xuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJpcm9cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiaXJvXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIHJvdW5kID0gTWF0aC5yb3VuZCxcbiAgICBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIFRPRE86IGNvbXBhcmUocmdiLCBoc3YsIGhzbCkgKyBjbG9uZSBtZXRob2RzXG5cbi8qKlxuICAqIEBkZXNjIGNvbnZlcnQgaHN2IG9iamVjdCB0byByZ2JcbiAgKiBAcGFyYW0ge09iamVjdH0gaHN2IC0gaHN2IG9iamVjdFxuICAqIEByZXR1cm4ge09iamVjdH0gcmdiIG9iamVjdFxuKi9cbmZ1bmN0aW9uIGhzdjJSZ2IoaHN2KSB7XG4gIHZhciByLCBnLCBiLCBpLCBmLCBwLCBxLCB0O1xuICB2YXIgaCA9IGhzdi5oIC8gMzYwLFxuICAgICAgcyA9IGhzdi5zIC8gMTAwLFxuICAgICAgdiA9IGhzdi52IC8gMTAwO1xuICBpID0gZmxvb3IoaCAqIDYpO1xuICBmID0gaCAqIDYgLSBpO1xuICBwID0gdiAqICgxIC0gcyk7XG4gIHEgPSB2ICogKDEgLSBmICogcyk7XG4gIHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XG4gIHN3aXRjaCAoaSAlIDYpIHtcbiAgICBjYXNlIDA6XG4gICAgICByID0gdiwgZyA9IHQsIGIgPSBwO2JyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIHIgPSBxLCBnID0gdiwgYiA9IHA7YnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgciA9IHAsIGcgPSB2LCBiID0gdDticmVhaztcbiAgICBjYXNlIDM6XG4gICAgICByID0gcCwgZyA9IHEsIGIgPSB2O2JyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIHIgPSB0LCBnID0gcCwgYiA9IHY7YnJlYWs7XG4gICAgY2FzZSA1OlxuICAgICAgciA9IHYsIGcgPSBwLCBiID0gcTticmVhaztcbiAgfVxuICByZXR1cm4geyByOiByb3VuZChyICogMjU1KSwgZzogcm91bmQoZyAqIDI1NSksIGI6IHJvdW5kKGIgKiAyNTUpIH07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjb252ZXJ0IHJnYiBvYmplY3QgdG8gaHN2XG4gICogQHBhcmFtIHtPYmplY3R9IHJnYiAtIHJnYiBvYmplY3RcbiAgKiBAcmV0dXJuIHtPYmplY3R9IGhzdiBvYmplY3RcbiovXG5mdW5jdGlvbiByZ2IySHN2KHJnYikge1xuICAvLyBNb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9iZ3JpbnMvVGlueUNvbG9yL2Jsb2IvbWFzdGVyL3Rpbnljb2xvci5qcyNMNDQ2XG4gIHZhciByID0gcmdiLnIgLyAyNTUsXG4gICAgICBnID0gcmdiLmcgLyAyNTUsXG4gICAgICBiID0gcmdiLmIgLyAyNTUsXG4gICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgZGVsdGEgPSBtYXggLSBtaW4sXG4gICAgICBodWU7XG4gIHN3aXRjaCAobWF4KSB7XG4gICAgY2FzZSBtaW46XG4gICAgICBodWUgPSAwO2JyZWFrO1xuICAgIGNhc2UgcjpcbiAgICAgIGh1ZSA9IChnIC0gYikgLyBkZWx0YSArIChnIDwgYiA/IDYgOiAwKTticmVhaztcbiAgICBjYXNlIGc6XG4gICAgICBodWUgPSAoYiAtIHIpIC8gZGVsdGEgKyAyO2JyZWFrO1xuICAgIGNhc2UgYjpcbiAgICAgIGh1ZSA9IChyIC0gZykgLyBkZWx0YSArIDQ7YnJlYWs7XG4gIH1cbiAgaHVlIC89IDY7XG4gIHJldHVybiB7XG4gICAgaDogcm91bmQoaHVlICogMzYwKSxcbiAgICBzOiByb3VuZChtYXggPT0gMCA/IDAgOiBkZWx0YSAvIG1heCAqIDEwMCksXG4gICAgdjogcm91bmQobWF4ICogMTAwKVxuICB9O1xufTtcblxuLyoqXG4gICogQGRlc2MgY29udmVydCBoc3Ygb2JqZWN0IHRvIGhzbFxuICAqIEBwYXJhbSB7T2JqZWN0fSBoc3YgLSBoc3Ygb2JqZWN0XG4gICogQHJldHVybiB7T2JqZWN0fSBoc2wgb2JqZWN0XG4qL1xuZnVuY3Rpb24gaHN2MkhzbChoc3YpIHtcbiAgdmFyIHMgPSBoc3YucyAvIDEwMCxcbiAgICAgIHYgPSBoc3YudiAvIDEwMDtcbiAgdmFyIGwgPSAwLjUgKiB2ICogKDIgLSBzKTtcbiAgcyA9IHYgKiBzIC8gKDEgLSBNYXRoLmFicygyICogbCAtIDEpKTtcbiAgcmV0dXJuIHtcbiAgICBoOiBoc3YuaCxcbiAgICBzOiByb3VuZChzICogMTAwKSB8fCAwLFxuICAgIGw6IHJvdW5kKGwgKiAxMDApXG4gIH07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjb252ZXJ0IGhzbCBvYmplY3QgdG8gaHN2XG4gICogQHBhcmFtIHtPYmplY3R9IGhzbCAtIGhzbCBvYmplY3RcbiAgKiBAcmV0dXJuIHtPYmplY3R9IGhzdiBvYmplY3RcbiovXG5mdW5jdGlvbiBoc2wySHN2KGhzbCkge1xuICB2YXIgcyA9IGhzbC5zIC8gMTAwLFxuICAgICAgbCA9IGhzbC5sIC8gMTAwO1xuICBsICo9IDI7XG4gIHMgKj0gbCA8PSAxID8gbCA6IDIgLSBsO1xuICByZXR1cm4ge1xuICAgIGg6IGhzbC5oLFxuICAgIHM6IHJvdW5kKDIgKiBzIC8gKGwgKyBzKSAqIDEwMCksXG4gICAgdjogcm91bmQoKGwgKyBzKSAvIDIgKiAxMDApXG4gIH07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjb252ZXJ0IHJnYiBvYmplY3QgdG8gc3RyaW5nXG4gICogQHBhcmFtIHtPYmplY3R9IHJnYiAtIHJnYiBvYmplY3RcbiAgKiBAcmV0dXJuIHtPYmplY3R9IHJnYiBzdHJpbmdcbiovXG5mdW5jdGlvbiByZ2IyU3RyKHJnYikge1xuICByZXR1cm4gXCJyZ2JcIiArIChyZ2IuYSA/IFwiYVwiIDogXCJcIikgKyBcIihcIiArIHJnYi5yICsgXCIsIFwiICsgcmdiLmcgKyBcIiwgXCIgKyByZ2IuYiArIChyZ2IuYSA/IFwiLCBcIiArIHJnYi5hIDogXCJcIikgKyBcIilcIjtcbn07XG5cbi8qKlxuICAqIEBkZXNjIGNvbnZlcnQgaHNsIG9iamVjdCB0byBzdHJpbmdcbiAgKiBAcGFyYW0ge09iamVjdH0gaHNsIC0gaHNsIG9iamVjdFxuICAqIEByZXR1cm4ge09iamVjdH0gaHNsIHN0cmluZ1xuKi9cbmZ1bmN0aW9uIGhzbDJTdHIoaHNsKSB7XG4gIHJldHVybiBcImhzbFwiICsgKGhzbC5hID8gXCJhXCIgOiBcIlwiKSArIFwiKFwiICsgaHNsLmggKyBcIiwgXCIgKyBoc2wucyArIFwiJSwgXCIgKyBoc2wubCArIFwiJVwiICsgKGhzbC5hID8gXCIsIFwiICsgaHNsLmEgOiBcIlwiKSArIFwiKVwiO1xufTtcblxuLyoqXG4gICogQGRlc2MgY29udmVydCByZ2Igb2JqZWN0IHRvIGhleCBzdHJpbmdcbiAgKiBAcGFyYW0ge09iamVjdH0gcmdiIC0gcmdiIG9iamVjdFxuICAqIEByZXR1cm4ge09iamVjdH0gaGV4IHN0cmluZ1xuKi9cbmZ1bmN0aW9uIHJnYjJIZXgocmdiKSB7XG4gIHZhciByID0gcmdiLnIsXG4gICAgICBnID0gcmdiLmcsXG4gICAgICBiID0gcmdiLmI7XG4gIC8vIElmIGVhY2ggUkdCIGNoYW5uZWwncyB2YWx1ZSBpcyBhIG11bHRpcGxlIG9mIDE3LCB3ZSBjYW4gdXNlIEhFWCBzaG9ydGhhbmQgbm90YXRpb25cbiAgdmFyIHVzZVNob3J0aGFuZCA9IHIgJSAxNyA9PSAwICYmIGcgJSAxNyA9PSAwICYmIGIgJSAxNyA9PSAwLFxuXG4gIC8vIElmIHdlJ3JlIHVzaW5nIHNob3J0aGFuZCBub3RhdGlvbiwgZGl2aWRlIGVhY2ggY2hhbm5lbCBieSAxN1xuICBkaXZpZGVyID0gdXNlU2hvcnRoYW5kID8gMTcgOiAxLFxuXG4gIC8vIGJpdExlbmd0aCBvZiBlYWNoIGNoYW5uZWwgKGZvciBleGFtcGxlLCBGIGlzIDQgYml0cyBsb25nIHdoaWxlIEZGIGlzIDggYml0cyBsb25nKVxuICBiaXRMZW5ndGggPSB1c2VTaG9ydGhhbmQgPyA0IDogOCxcblxuICAvLyBUYXJnZXQgbGVuZ3RoIG9mIHRoZSBzdHJpbmcgKGllIFwiI0ZGRlwiIG9yIFwiI0ZGRkZGRlwiKVxuICBzdHJMZW5ndGggPSB1c2VTaG9ydGhhbmQgPyA0IDogNyxcblxuICAvLyBDb21iaW5lIHRoZSBjaGFubmVscyB0b2dldGhlciBpbnRvIGEgc2luZ2xlIGludGVnZXJcbiAgaW50ID0gciAvIGRpdmlkZXIgPDwgYml0TGVuZ3RoICogMiB8IGcgLyBkaXZpZGVyIDw8IGJpdExlbmd0aCB8IGIgLyBkaXZpZGVyLFxuXG4gIC8vIENvbnZlcnQgdGhhdCBpbnRlZ2VyIHRvIGEgaGV4IHN0cmluZ1xuICBzdHIgPSBpbnQudG9TdHJpbmcoMTYpO1xuICAvLyBBZGQgcmlnaHQgYW1vdW50IG9mIGxlZnQtcGFkZGluZ1xuICByZXR1cm4gXCIjXCIgKyBuZXcgQXJyYXkoc3RyTGVuZ3RoIC0gc3RyLmxlbmd0aCkuam9pbihcIjBcIikgKyBzdHI7XG59O1xuXG4vKipcbiAgKiBAZGVzYyBnZW5lcmljIHBhcnNlciBmb3IgaHNsIC8gcmdiIC8gZXRjIHN0cmluZ1xuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgLSBjb2xvciBzdHJpbmdcbiAgKiBAcGFyYW0ge0FycmF5fSBtYXhWYWx1ZXMgLSBtYXggdmFsdWVzIGZvciBlYWNoIGNoYW5uZWwgKHVzZWQgZm9yIGNhbGN1bGF0aW5nIHBlcmNlbnQtYmFzZWQgdmFsdWVzKVxuICAqIEByZXR1cm4ge0FycmF5fSB0eXBlIChyZ2IgfCByZ2JhIHwgaHNsIHwgaHNsYSkgdmFsdWVzIGZvciBlYWNoIGNoYW5uZWxcbiovXG5mdW5jdGlvbiBwYXJzZUNvbG9yU3RyKHN0ciwgbWF4VmFsdWVzKSB7XG4gIHZhciBwYXJzZWQgPSBzdHIubWF0Y2goLyhcXFMrKVxcKChcXGQrKSglPykoPzpcXEQrPykoXFxkKykoJT8pKD86XFxEKz8pKFxcZCspKCU/KSg/OlxcRCs/KT8oWzAtOVxcLl0rPyk/XFwpL2kpLFxuICAgICAgdmFsMSA9IHBhcnNlSW50KHBhcnNlZFsyXSksXG4gICAgICB2YWwyID0gcGFyc2VJbnQocGFyc2VkWzRdKSxcbiAgICAgIHZhbDMgPSBwYXJzZUludChwYXJzZWRbNl0pO1xuICByZXR1cm4gW3BhcnNlZFsxXSwgcGFyc2VkWzNdID09IFwiJVwiID8gdmFsMSAvIDEwMCAqIG1heFZhbHVlc1swXSA6IHZhbDEsIHBhcnNlZFs1XSA9PSBcIiVcIiA/IHZhbDIgLyAxMDAgKiBtYXhWYWx1ZXNbMV0gOiB2YWwyLCBwYXJzZWRbN10gPT0gXCIlXCIgPyB2YWwzIC8gMTAwICogbWF4VmFsdWVzWzJdIDogdmFsMywgcGFyc2VGbG9hdChwYXJzZWRbOF0pIHx8IHVuZGVmaW5lZF07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBwYXJzZSByZ2Igc3RyaW5nXG4gICogQHBhcmFtIHtTdHJpbmd9IHN0ciAtIGNvbG9yIHN0cmluZ1xuICAqIEByZXR1cm4ge09iamVjdH0gcmdiIG9iamVjdFxuKi9cbmZ1bmN0aW9uIHBhcnNlUmdiU3RyKHN0cikge1xuICB2YXIgcGFyc2VkID0gcGFyc2VDb2xvclN0cihzdHIsIFsyNTUsIDI1NSwgMjU1XSk7XG4gIHJldHVybiB7XG4gICAgcjogcGFyc2VkWzFdLFxuICAgIGc6IHBhcnNlZFsyXSxcbiAgICBiOiBwYXJzZWRbM11cbiAgfTtcbn07XG5cbi8qKlxuICAqIEBkZXNjIHBhcnNlIGhzbCBzdHJpbmdcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIC0gY29sb3Igc3RyaW5nXG4gICogQHJldHVybiB7T2JqZWN0fSBoc2wgb2JqZWN0XG4qL1xuZnVuY3Rpb24gcGFyc2VIc2xTdHIoc3RyKSB7XG4gIHZhciBwYXJzZWQgPSBwYXJzZUNvbG9yU3RyKHN0ciwgWzM2MCwgMTAwLCAxMDBdKTtcbiAgcmV0dXJuIHtcbiAgICBoOiBwYXJzZWRbMl0sXG4gICAgczogcGFyc2VkWzNdLFxuICAgIGw6IHBhcnNlZFs0XVxuICB9O1xufTtcblxuLyoqXG4gICogQGRlc2MgcGFyc2UgaGV4IHN0cmluZ1xuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgLSBjb2xvciBzdHJpbmdcbiAgKiBAcmV0dXJuIHtPYmplY3R9IHJnYiBvYmplY3RcbiovXG5mdW5jdGlvbiBwYXJzZUhleFN0cihoZXgpIHtcbiAgLy8gU3RyaXAgYW55IFwiI1wiIGNoYXJhY3RlcnNcbiAgaGV4ID0gaGV4LnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICAvLyBQcmVmaXggdGhlIGhleCBzdHJpbmcgd2l0aCBcIjB4XCIgd2hpY2ggaW5kaWNhdGVzIGEgbnVtYmVyIGluIGhleCBub3RhdGlvbiwgdGhlbiBjb252ZXJ0IHRvIGFuIGludGVnZXJcbiAgdmFyIGludCA9IHBhcnNlSW50KFwiMHhcIiArIGhleCksXG5cbiAgLy8gSWYgdGhlIGxlbmd0aCBvZiB0aGUgaW5wdXQgaXMgb25seSAzLCB0aGVuIGl0IGlzIGEgc2hvcnRoYW5kIGhleCBjb2xvclxuICBpc1Nob3J0aGFuZCA9IGhleC5sZW5ndGggPT0gMyxcblxuICAvLyBiaXRNYXNrIGZvciBpc29sYXRpbmcgZWFjaCBjaGFubmVsXG4gIGJpdE1hc2sgPSBpc1Nob3J0aGFuZCA/IDB4RiA6IDB4RkYsXG5cbiAgLy8gYml0TGVuZ3RoIG9mIGVhY2ggY2hhbm5lbCAoZm9yIGV4YW1wbGUsIEYgaXMgNCBiaXRzIGxvbmcgd2hpbGUgRkYgaXMgOCBiaXRzIGxvbmcpXG4gIGJpdExlbmd0aCA9IGlzU2hvcnRoYW5kID8gNCA6IDgsXG5cbiAgLy8gSWYgd2UncmUgdXNpbmcgc2hvcnRoYW5kIG5vdGF0aW9uLCBtdWx0aXBseSBlYWNoIGNoYW5uZWwgYnkgMTdcbiAgbXVsdGlwbGllciA9IGlzU2hvcnRoYW5kID8gMTcgOiAxO1xuICByZXR1cm4ge1xuICAgIHI6IChpbnQgPj4gYml0TGVuZ3RoICogMiAmIGJpdE1hc2spICogbXVsdGlwbGllcixcbiAgICBnOiAoaW50ID4+IGJpdExlbmd0aCAmIGJpdE1hc2spICogbXVsdGlwbGllcixcbiAgICBiOiAoaW50ICYgYml0TWFzaykgKiBtdWx0aXBsaWVyXG4gIH07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjb252ZXJ0IG9iamVjdCAvIHN0cmluZyBpbnB1dCB0byBjb2xvciBpZiBuZWNlc3NhcnlcbiAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSB2YWx1ZSAtIGNvbG9yIGluc3RhbmNlLCBvYmplY3QgKGhzdiwgaHNsIG9yIHJnYiksIHN0cmluZyAoaHNsLCByZ2IsIGhleClcbiAgKiBAcmV0dXJuIHtjb2xvcn0gY29sb3IgaW5zdGFuY2VcbiovXG5mdW5jdGlvbiBnZXRDb2xvcih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBjb2xvciA/IHZhbHVlIDogbmV3IGNvbG9yKHZhbHVlKTtcbn07XG5cbi8qKlxuICAqIEBkZXNjIGNsYW1wIHZhbHVlIGJldHdlZW4gbWluIGFuZCBtYXhcbiAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgKiBAcGFyYW0ge051bWJlcn0gbWluXG4gICogQHBhcmFtIHtOdW1iZXJ9IG1heFxuICAqIEByZXR1cm4ge051bWJlcn1cbiovXG5mdW5jdGlvbiBjbGFtcCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIHZhbHVlIDw9IG1pbiA/IG1pbiA6IHZhbHVlID49IG1heCA/IG1heCA6IHZhbHVlO1xufTtcblxuLyoqXG4gICogQGRlc2MgY29tcGFyZSB2YWx1ZXMgYmV0d2VlbiB0d28gb2JqZWN0cywgcmV0dXJucyBhIG9iamVjdCByZXByZXNlbnRpbmcgY2hhbmdlcyB3aXRoIHRydWUvZmFsc2UgdmFsdWVzXG4gICogQHBhcmFtIHtPYmplY3R9IGFcbiAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAqIEByZXR1cm4ge09iamVjdH1cbiovXG5mdW5jdGlvbiBjb21wYXJlT2JqcyhhLCBiKSB7XG4gIHZhciBjaGFuZ2VzID0ge307XG4gIGZvciAodmFyIGtleSBpbiBhKSB7XG4gICAgY2hhbmdlc1trZXldID0gYltrZXldICE9IGFba2V5XTtcbiAgfXJldHVybiBjaGFuZ2VzO1xufTtcblxuLyoqXG4gICogQGRlc2MgbWl4IHR3byBjb2xvcnNcbiAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSBjb2xvcjEgLSBjb2xvciBpbnN0YW5jZSwgb2JqZWN0IChoc3YsIGhzbCBvciByZ2IpLCBzdHJpbmcgKGhzbCwgcmdiLCBoZXgpXG4gICogQHBhcmFtIHtPYmplY3QgfCBTdHJpbmcgfCBjb2xvcn0gY29sb3IyIC0gY29sb3IgaW5zdGFuY2UsIG9iamVjdCAoaHN2LCBoc2wgb3IgcmdiKSwgc3RyaW5nIChoc2wsIHJnYiwgaGV4KVxuICAqIEBwYXJhbSB7TnVtYmVyfSB3ZWlnaHQgLSBjbG9zZXIgdG8gMCA9IG1vcmUgY29sb3IxLCBjbG9zZXIgdG8gMTAwID0gbW9yZSBjb2xvcjJcbiAgKiBAcmV0dXJuIHtjb2xvcn0gY29sb3IgaW5zdGFuY2VcbiovXG5mdW5jdGlvbiBfbWl4KGNvbG9yMSwgY29sb3IyLCB3ZWlnaHQpIHtcbiAgdmFyIHJnYjEgPSBnZXRDb2xvcihjb2xvcjEpLnJnYixcbiAgICAgIHJnYjIgPSBnZXRDb2xvcihjb2xvcjIpLnJnYjtcbiAgd2VpZ2h0ID0gY2xhbXAod2VpZ2h0IC8gMTAwIHx8IDAuNSwgMCwgMSk7XG4gIHJldHVybiBuZXcgY29sb3Ioe1xuICAgIHI6IGZsb29yKHJnYjEuciArIChyZ2IyLnIgLSByZ2IxLnIpICogd2VpZ2h0KSxcbiAgICBnOiBmbG9vcihyZ2IxLmcgKyAocmdiMi5nIC0gcmdiMS5nKSAqIHdlaWdodCksXG4gICAgYjogZmxvb3IocmdiMS5iICsgKHJnYjIuYiAtIHJnYjEuYikgKiB3ZWlnaHQpXG4gIH0pO1xufTtcblxuLyoqXG4gICogQGRlc2MgbGlnaHRlbiBjb2xvciBieSBhbW91bnRcbiAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSBjb2xvciAtIGNvbG9yIGluc3RhbmNlLCBvYmplY3QgKGhzdiwgaHNsIG9yIHJnYiksIHN0cmluZyAoaHNsLCByZ2IsIGhleClcbiAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50XG4gICogQHJldHVybiB7Y29sb3J9IGNvbG9yIGluc3RhbmNlXG4qL1xuZnVuY3Rpb24gX2xpZ2h0ZW4oY29sb3IsIGFtb3VudCkge1xuICB2YXIgY29sID0gZ2V0Q29sb3IoY29sb3IpLFxuICAgICAgaHN2ID0gY29sLmhzdjtcbiAgaHN2LnYgPSBjbGFtcChoc3YudiArIGFtb3VudCwgMCwgMTAwKTtcbiAgY29sLmhzdiA9IGhzdjtcbiAgcmV0dXJuIGNvbDtcbn07XG5cbi8qKlxuICAqIEBkZXNjIGRhcmtlbiBjb2xvciBieSBhbW91bnRcbiAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSBjb2xvciAtIGNvbG9yIGluc3RhbmNlLCBvYmplY3QgKGhzdiwgaHNsIG9yIHJnYiksIHN0cmluZyAoaHNsLCByZ2IsIGhleClcbiAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50XG4gICogQHJldHVybiB7Y29sb3J9IGNvbG9yIGluc3RhbmNlXG4qL1xuZnVuY3Rpb24gX2Rhcmtlbihjb2xvciwgYW1vdW50KSB7XG4gIHZhciBjb2wgPSBnZXRDb2xvcihjb2xvciksXG4gICAgICBoc3YgPSBjb2wuaHN2O1xuICBoc3YudiA9IGNsYW1wKGhzdi52IC0gYW1vdW50LCAwLCAxMDApO1xuICBjb2wuaHN2ID0gaHN2O1xuICByZXR1cm4gY29sO1xufTtcblxuLyoqXG4gICogQGNvbnN0cnVjdG9yIGNvbG9yIG9iamVjdFxuICAqIEBwYXJhbSB7T2JqZWN0IHwgU3RyaW5nIHwgY29sb3J9IHZhbHVlIC0gY29sb3IgaW5zdGFuY2UsIG9iamVjdCAoaHN2LCBoc2wgb3IgcmdiKSwgc3RyaW5nIChoc2wsIHJnYiwgaGV4KVxuKi9cbnZhciBjb2xvciA9IGZ1bmN0aW9uIGNvbG9yKHZhbHVlKSB7XG4gIC8vIFRoZSB3YXRjaCBjYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhpcyBjb2xvciB3aWxsIGJlIHN0b3JlZCBoZXJlXG4gIHRoaXMuX29uQ2hhbmdlID0gZmFsc2U7XG4gIC8vIFRoZSBkZWZhdWx0IGNvbG9yIHZhbHVlXG4gIHRoaXMuX3ZhbHVlID0geyBoOiB1bmRlZmluZWQsIHM6IHVuZGVmaW5lZCwgdjogdW5kZWZpbmVkIH07XG4gIGlmICh2YWx1ZSkgdGhpcy5zZXQodmFsdWUpO1xufTtcblxuLy8gRXhwb3NlIGZ1bmN0aW9ucyBhcyBzdGF0aWMgaGVscGVyc1xuY29sb3IubWl4ID0gX21peDtcbmNvbG9yLmxpZ2h0ZW4gPSBfbGlnaHRlbjtcbmNvbG9yLmRhcmtlbiA9IF9kYXJrZW47XG5jb2xvci5oc3YyUmdiID0gaHN2MlJnYjtcbmNvbG9yLnJnYjJIc3YgPSByZ2IySHN2O1xuY29sb3IuaHN2MkhzbCA9IGhzdjJIc2w7XG5jb2xvci5oc2wySHN2ID0gaHNsMkhzdjtcbmNvbG9yLmhzbDJTdHIgPSBoc2wyU3RyO1xuY29sb3IucmdiMlN0ciA9IHJnYjJTdHI7XG5jb2xvci5yZ2IySGV4ID0gcmdiMkhleDtcbmNvbG9yLnBhcnNlSGV4U3RyID0gcGFyc2VIZXhTdHI7XG5jb2xvci5wYXJzZUhzbFN0ciA9IHBhcnNlSHNsU3RyO1xuY29sb3IucGFyc2VSZ2JTdHIgPSBwYXJzZVJnYlN0cjtcblxuY29sb3IucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogY29sb3IsXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBzZXQgdGhlIGNvbG9yIGZyb20gYW55IHZhbGlkIHZhbHVlXG4gICAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSB2YWx1ZSAtIGNvbG9yIGluc3RhbmNlLCBvYmplY3QgKGhzdiwgaHNsIG9yIHJnYiksIHN0cmluZyAoaHNsLCByZ2IsIGhleClcbiAgKi9cbiAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHZhbHVlKSkgPT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgY29sb3IpIHtcbiAgICAgICAgdGhpcy5oc3YgPSBjb2xvci5oc3Y7XG4gICAgICB9IGVsc2UgaWYgKFwiclwiIGluIHZhbHVlKSB7XG4gICAgICAgIHRoaXMucmdiID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKFwidlwiIGluIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaHN2ID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKFwibFwiIGluIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaHNsID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKC9ecmdiLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICB0aGlzLnJnYlN0cmluZyA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmICgvXmhzbC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5oc2xTdHJpbmcgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoL14jWzAtOUEtRmEtZl0vLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuaGV4U3RyaW5nID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2Mgc2hvcnRjdXQgdG8gc2V0IGEgc3BlY2lmaWMgY2hhbm5lbCB2YWx1ZVxuICAgICogQHBhcmFtIHtTdHJpbmd9IG1vZGVsIC0gaHN2IHwgaHNsIHwgcmdiXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gY2hhbm5lbCAtIGluZGl2aWR1YWwgY2hhbm5lbCB0byBzZXQsIGZvciBleGFtcGxlIGlmIG1vZGVsID0gaHNsLCBjaGFuZWwgPSBoIHwgcyB8IGxcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIG5ldyB2YWx1ZSBmb3IgdGhlIGNoYW5uZWxcbiAgKi9cbiAgc2V0Q2hhbm5lbDogZnVuY3Rpb24gc2V0Q2hhbm5lbChtb2RlbCwgY2hhbm5lbCwgdmFsdWUpIHtcbiAgICB2YXIgdiA9IHRoaXNbbW9kZWxdO1xuICAgIHZbY2hhbm5lbF0gPSB2YWx1ZTtcbiAgICB0aGlzW21vZGVsXSA9IHY7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBtYWtlIG5ldyBjb2xvciBpbnN0YW5jZSB3aXRoIHRoZSBzYW1lIHZhbHVlIGFzIHRoaXMgb25lXG4gICAgKiBAcmV0dXJuIHtjb2xvcn1cbiAgKi9cbiAgY2xvbmU6IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgY29sb3IodGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBjb21wYXJlIHRoaXMgY29sb3IgYWdhaW5zdCBhbm90aGVyLCByZXR1cm5zIGEgb2JqZWN0IHJlcHJlc2VudGluZyBjaGFuZ2VzIHdpdGggdHJ1ZS9mYWxzZSB2YWx1ZXNcbiAgICAqIEBwYXJhbSB7T2JqZWN0IHwgU3RyaW5nIHwgY29sb3J9IGNvbG9yIC0gY29sb3IgdG8gY29tcGFyZSBhZ2FpbnN0XG4gICAgKiBAcGFyYW0ge1N0cmluZ30gbW9kZWwgLSBoc3YgfCBoc2wgfCByZ2JcbiAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgKi9cbiAgY29tcGFyZTogZnVuY3Rpb24gY29tcGFyZShjb2xvciwgbW9kZWwpIHtcbiAgICBtb2RlbCA9IG1vZGVsIHx8IFwiaHN2XCI7XG4gICAgcmV0dXJuIGNvbXBhcmVPYmpzKHRoaXNbbW9kZWxdLCBnZXRDb2xvcihjb2xvcilbbW9kZWxdKTtcbiAgfSxcblxuICAvKipcbiAgICAqIEBkZXNjIG1peCBhIGNvbG9yIGludG8gdGhpcyBvbmVcbiAgICAqIEBwYXJhbSB7T2JqZWN0IHwgU3RyaW5nIHwgY29sb3J9IGNvbG9yIC0gY29sb3IgaW5zdGFuY2UsIG9iamVjdCAoaHN2LCBoc2wgb3IgcmdiKSwgc3RyaW5nIChoc2wsIHJnYiwgaGV4KVxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHdlaWdodCAtIGNsb3NlciB0byAwID0gbW9yZSBjdXJyZW50IGNvbG9yLCBjbG9zZXIgdG8gMTAwID0gbW9yZSBuZXcgY29sb3JcbiAgKi9cbiAgbWl4OiBmdW5jdGlvbiBtaXgoY29sb3IsIHdlaWdodCkge1xuICAgIHRoaXMuaHN2ID0gX21peCh0aGlzLCBjb2xvciwgd2VpZ2h0KS5oc3Y7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBsaWdodGVuIGNvbG9yIGJ5IGFtb3VudFxuICAgICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudFxuICAqL1xuICBsaWdodGVuOiBmdW5jdGlvbiBsaWdodGVuKGFtb3VudCkge1xuICAgIF9saWdodGVuKHRoaXMsIGFtb3VudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBkYXJrZW4gY29sb3IgYnkgYW1vdW50XG4gICAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50XG4gICovXG4gIGRhcmtlbjogZnVuY3Rpb24gZGFya2VuKGFtb3VudCkge1xuICAgIF9kYXJrZW4odGhpcywgYW1vdW50KTtcbiAgfVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY29sb3IucHJvdG90eXBlLCB7XG4gIGhzdjoge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgLy8gX3ZhbHVlIGlzIGNsb25lZCB0byBhbGxvdyBjaGFuZ2VzIHRvIGJlIG1hZGUgdG8gdGhlIHZhbHVlcyBiZWZvcmUgcGFzc2luZyB0aGVtIGJhY2tcbiAgICAgIHZhciB2ID0gdGhpcy5fdmFsdWU7XG4gICAgICByZXR1cm4geyBoOiB2LmgsIHM6IHYucywgdjogdi52IH07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChuZXdWYWx1ZSkge1xuICAgICAgLy8gSWYgdGhpcyBjb2xvciBpcyBiZWluZyB3YXRjaGVkIGZvciBjaGFuZ2VzIHdlIG5lZWQgdG8gY29tcGFyZSB0aGUgbmV3IGFuZCBvbGQgdmFsdWVzIHRvIGNoZWNrIHRoZSBkaWZmZXJlbmNlXG4gICAgICAvLyBPdGhlcndpc2Ugd2UgY2FuIGp1c3QgYmUgbGF6eVxuICAgICAgaWYgKHRoaXMuX29uQ2hhbmdlKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICBmb3IgKHZhciBjaGFubmVsIGluIG9sZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKCFuZXdWYWx1ZS5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkgbmV3VmFsdWVbY2hhbm5lbF0gPSBvbGRWYWx1ZVtjaGFubmVsXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hhbmdlcyA9IGNvbXBhcmVPYmpzKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgb2xkIHZhbHVlXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIC8vIElmIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZCwgY2FsbCBob29rIGNhbGxiYWNrXG4gICAgICAgIGlmIChjaGFuZ2VzLmggfHwgY2hhbmdlcy5zIHx8IGNoYW5nZXMudikgdGhpcy5fb25DaGFuZ2UodGhpcywgY2hhbmdlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmdiOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gaHN2MlJnYih0aGlzLl92YWx1ZSk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5oc3YgPSByZ2IySHN2KHZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIGhzbDoge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIGhzdjJIc2wodGhpcy5fdmFsdWUpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMuaHN2ID0gaHNsMkhzdih2YWx1ZSk7XG4gICAgfVxuICB9LFxuICByZ2JTdHJpbmc6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiByZ2IyU3RyKHRoaXMucmdiKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB0aGlzLnJnYiA9IHBhcnNlUmdiU3RyKHZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIGhleFN0cmluZzoge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHJnYjJIZXgodGhpcy5yZ2IpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMucmdiID0gcGFyc2VIZXhTdHIodmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgaHNsU3RyaW5nOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gaHNsMlN0cih0aGlzLmhzbCk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5oc2wgPSBjb2xvci5wYXJzZUhzbFN0cih2YWx1ZSk7XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb2xvcjtcblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8qKlxuICBAY29uc3RydWN0b3Igc3R5bGVzaGVldCB3cml0ZXJcbiovXG52YXIgc3R5bGVzaGVldCA9IGZ1bmN0aW9uIHN0eWxlc2hlZXQoKSB7XG4gIC8vIENyZWF0ZSBhIG5ldyBzdHlsZSBlbGVtZW50XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIC8vIFdlYmtpdCBhcHBhcmVudGx5IHJlcXVpcmVzIGEgdGV4dCBub2RlIHRvIGJlIGluc2VydGVkIGludG8gdGhlIHN0eWxlIGVsZW1lbnRcbiAgLy8gKGFjY29yZGluZyB0byBodHRwczovL2Rhdmlkd2Fsc2gubmFtZS9hZGQtcnVsZXMtc3R5bGVzaGVldHMpXG4gIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpKTtcbiAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuICAvLyBDcmVhdGUgYSByZWZlcmVuY2UgdG8gdGhlIHN0eWxlIGVsZW1lbnQncyBDU1NTdHlsZVNoZWV0IG9iamVjdFxuICAvLyBDU1NTdHlsZVNoZWV0IEFQSTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NTU1N0eWxlU2hlZXRcbiAgdmFyIHNoZWV0ID0gc3R5bGUuc2hlZXQ7XG4gIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgLy8gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBzaGVldCdzIENTU1J1bGVMaXN0IG9iamVjdFxuICAvLyBDU1NSdWxlTGlzdCBBUEk6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DU1NSdWxlTGlzdFxuICB0aGlzLnJ1bGVzID0gc2hlZXQucnVsZXMgfHwgc2hlZXQuY3NzUnVsZXM7XG4gIC8vIFdlJ2xsIHN0b3JlIHJlZmVyZW5jZXMgdG8gYWxsIHRoZSBDU1NTdHlsZURlY2xhcmF0aW9uIG9iamVjdHMgdGhhdCB3ZSBjaGFuZ2UgaGVyZSwga2V5ZWQgYnkgdGhlIENTUyBzZWxlY3RvciB0aGV5IGJlbG9uZyB0b1xuICAvLyBDU1NTdHlsZURlY2xhcmF0aW9uIEFQSTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NTU1N0eWxlRGVjbGFyYXRpb25cbiAgdGhpcy5tYXAgPSB7fTtcbn07XG5cbnN0eWxlc2hlZXQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3Rvcjogc3R5bGVzaGVldCxcblxuICAvKipcbiAgICAqIEBkZXNjIFNldCBhIHNwZWNpZmljIHJ1bGUgZm9yIGEgZ2l2ZW4gc2VsZWN0b3JcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIHRoZSBDU1Mgc2VsZWN0b3IgZm9yIHRoaXMgcnVsZSAoZS5nLiBcImJvZHlcIiwgXCIuY2xhc3NcIiwgXCIjaWRcIilcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSAtIHRoZSBDU1MgcHJvcGVydHkgdG8gc2V0IChlLmcuIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImZvbnQtZmFtaWx5XCIsIFwiei1pbmRleFwiKVxuICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlICAgIC0gdGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHJ1bGUgKGUuZy4gXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIiwgXCJIZWx2ZXRpY2FcIiwgXCI5OVwiKVxuICAqL1xuICBzZXRSdWxlOiBmdW5jdGlvbiBzZXRSdWxlKHNlbGVjdG9yLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICB2YXIgc2hlZXQgPSB0aGlzLnNoZWV0O1xuICAgIHZhciBydWxlcyA9IHNoZWV0LnJ1bGVzIHx8IHNoZWV0LmNzc1J1bGVzO1xuICAgIHZhciBtYXAgPSB0aGlzLm1hcDtcbiAgICAvLyBDb252ZXJ0IHByb3BlcnR5IGZyb20gY2FtZWxDYXNlIHRvIHNuYWtlLWNhc2VcbiAgICBwcm9wZXJ0eSA9IHByb3BlcnR5LnJlcGxhY2UoLyhbQS1aXSkvZywgZnVuY3Rpb24gKCQxKSB7XG4gICAgICByZXR1cm4gXCItXCIgKyAkMS50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xuICAgIGlmICghbWFwLmhhc093blByb3BlcnR5KHNlbGVjdG9yKSkge1xuICAgICAgLy8gSWYgdGhlIHNlbGVjdG9yIGhhc24ndCBiZWVuIHVzZWQgeWV0IHdlIHdhbnQgdG8gaW5zZXJ0IHRoZSBydWxlIGF0IHRoZSBlbmQgb2YgdGhlIENTU1J1bGVMaXN0LCBzbyB3ZSB1c2UgaXRzIGxlbmd0aCBhcyB0aGUgaW5kZXggdmFsdWVcbiAgICAgIHZhciBpbmRleCA9IHJ1bGVzLmxlbmd0aDtcbiAgICAgIC8vIFByZXBhcmUgdGhlIHJ1bGUgZGVjbGFyYXRpb24gdGV4dCwgc2luY2UgYm90aCBpbnNlcnRSdWxlIGFuZCBhZGRSdWxlIHRha2UgdGhpcyBmb3JtYXRcbiAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHByb3BlcnR5ICsgXCI6IFwiICsgdmFsdWU7XG4gICAgICAvLyBJbnNlcnQgdGhlIG5ldyBydWxlIGludG8gdGhlIHN0eWxlc2hlZXRcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgb25seSBzdXBwb3J0IGluc2VydFJ1bGUsIG90aGVycyBvbmx5IHN1cHBvcnQgYWRkUnVsZSwgc28gd2UgaGF2ZSB0byB1c2UgYm90aFxuICAgICAgICBzaGVldC5pbnNlcnRSdWxlKHNlbGVjdG9yICsgXCIge1wiICsgZGVjbGFyYXRpb24gKyBcIjt9XCIsIGluZGV4KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgc2hlZXQuYWRkUnVsZShzZWxlY3RvciwgZGVjbGFyYXRpb24sIGluZGV4KTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIC8vIEJlY2F1c2Ugc2FmYXJpIGlzIHBlcmhhcHMgdGhlIHdvcnN0IGJyb3dzZXIgaW4gYWxsIG9mIGhpc3RvcnksIHdlIGhhdmUgdG8gcmVtaW5kIGl0IHRvIGtlZXAgdGhlIHNoZWV0IHJ1bGVzIHVwLXRvLWRhdGVcbiAgICAgICAgcnVsZXMgPSBzaGVldC5ydWxlcyB8fCBzaGVldC5jc3NSdWxlcztcbiAgICAgICAgLy8gQWRkIG91ciBuZXdseSBpbnNlcnRlZCBydWxlJ3MgQ1NTU3R5bGVEZWNsYXJhdGlvbiBvYmplY3QgdG8gdGhlIGludGVybmFsIG1hcFxuICAgICAgICBtYXBbc2VsZWN0b3JdID0gcnVsZXNbaW5kZXhdLnN0eWxlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtYXBbc2VsZWN0b3JdLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhzdHlsZXNoZWV0LnByb3RvdHlwZSwge1xuICBlbmFibGVkOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuc2hlZXQuZGlzYWJsZWQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5zaGVldC5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgICB9XG4gIH0sXG4gIC8vIFRPRE86IGNvbnNpZGVyIHJlbW92aW5nIGNzc1RleHQgKyBjc3MgcHJvcGVydGllcyBzaW5jZSBpIGRvbid0IHRpbmsgdGhleSdyZSB0aGF0IHVzZWZ1bFxuICBjc3NUZXh0OiB7XG4gICAgLyoqXG4gICAgICAqIEBkZXNjIEdldCB0aGUgc3R5bGVzaGVldCB0ZXh0XG4gICAgICAqIEByZXR1cm4ge1N0cmluZ30gY3NzIHRleHRcbiAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIG1hcCA9IHRoaXMubWFwO1xuICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgZm9yICh2YXIgc2VsZWN0b3IgaW4gbWFwKSB7XG4gICAgICAgIHJldC5wdXNoKHNlbGVjdG9yLnJlcGxhY2UoLyxcXFcvZywgXCIsXFxuXCIpICsgXCIge1xcblxcdFwiICsgbWFwW3NlbGVjdG9yXS5jc3NUZXh0LnJlcGxhY2UoLztcXFcvZywgXCI7XFxuXFx0XCIpICsgXCJcXG59XCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldC5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgfSxcbiAgY3NzOiB7XG4gICAgLyoqXG4gICAgICogQGRlc2MgR2V0IGFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgY3NzIHN0eWxlc1xuICAgICAqIEByZXR1cm4ge09iamVjdH0gY3NzIG9iamVjdFxuICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgbWFwID0gdGhpcy5tYXA7XG4gICAgICB2YXIgcmV0ID0ge307XG4gICAgICBmb3IgKHZhciBzZWxlY3RvciBpbiBtYXApIHtcbiAgICAgICAgdmFyIHJ1bGVTZXQgPSBtYXBbc2VsZWN0b3JdO1xuICAgICAgICByZXRbc2VsZWN0b3JdID0ge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZVNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHJ1bGVTZXRbaV07XG4gICAgICAgICAgcmV0W3NlbGVjdG9yXVtwcm9wZXJ0eV0gPSBydWxlU2V0LmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVzaGVldDtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8vIGNzcyBjbGFzcyBwcmVmaXggZm9yIHRoaXMgZWxlbWVudFxudmFyIENMQVNTX1BSRUZJWCA9IFwiaXJvX19tYXJrZXJcIjtcblxuLyoqXG4gKiBAY29uc3RydWN0b3IgbWFya2VyIFVJXG4gKiBAcGFyYW0ge3N2Z1Jvb3R9IHN2ZyAtIHN2Z1Jvb3Qgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiovXG52YXIgbWFya2VyID0gZnVuY3Rpb24gbWFya2VyKHN2Zywgb3B0cykge1xuICB2YXIgYmFzZUdyb3VwID0gc3ZnLmcoe1xuICAgIGNsYXNzOiBDTEFTU19QUkVGSVhcbiAgfSk7XG4gIGJhc2VHcm91cC5jaXJjbGUoMCwgMCwgb3B0cy5yLCB7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWCArIFwiX19vdXRlclwiLFxuICAgIGZpbGw6IFwibm9uZVwiLFxuICAgIHN0cm9rZVdpZHRoOiA1LFxuICAgIHN0cm9rZTogXCIjMDAwXCJcbiAgfSk7XG4gIGJhc2VHcm91cC5jaXJjbGUoMCwgMCwgb3B0cy5yLCB7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWCArIFwiX19pbm5lclwiLFxuICAgIGZpbGw6IFwibm9uZVwiLFxuICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgIHN0cm9rZTogXCIjZmZmXCJcbiAgfSk7XG4gIHRoaXMuZyA9IGJhc2VHcm91cDtcbn07XG5cbm1hcmtlci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBtYXJrZXIsXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBtb3ZlIG1hcmtlciB0byBjZW50ZXJwb2ludCAoeCwgeSkgYW5kIHJlZHJhd1xuICAgICogQHBhcmFtIHtOdW1iZXJ9IHggLSBwb2ludCB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gcG9pbnQgeSBjb29yZGluYXRlXG4gICovXG4gIG1vdmU6IGZ1bmN0aW9uIG1vdmUoeCwgeSkge1xuICAgIHRoaXMuZy5zZXRUcmFuc2Zvcm0oXCJ0cmFuc2xhdGVcIiwgW3gsIHldKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXJrZXI7XG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgX3doZWVsID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblxudmFyIF93aGVlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93aGVlbCk7XG5cbnZhciBfc2xpZGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9zbGlkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2xpZGVyKTtcblxudmFyIF9zdmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG52YXIgX3N2ZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdmcpO1xuXG52YXIgX2NvbG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jb2xvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvcik7XG5cbnZhciBfc3R5bGVzaGVldCA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfc3R5bGVzaGVldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXNoZWV0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEVWRU5UX01PVVNFRE9XTiA9IFwibW91c2Vkb3duXCIsXG4gICAgRVZFTlRfTU9VU0VNT1ZFID0gXCJtb3VzZW1vdmVcIixcbiAgICBFVkVOVF9NT1VTRVVQID0gXCJtb3VzZXVwXCIsXG4gICAgRVZFTlRfVE9VQ0hTVEFSVCA9IFwidG91Y2hzdGFydFwiLFxuICAgIEVWRU5UX1RPVUNITU9WRSA9IFwidG91Y2htb3ZlXCIsXG4gICAgRVZFTlRfVE9VQ0hFTkQgPSBcInRvdWNoZW5kXCIsXG4gICAgRVZFTlRfUkVBRFlTVEFURV9DSEFOR0UgPSBcInJlYWR5c3RhdGVjaGFuZ2VcIixcbiAgICBSRUFEWVNUQVRFX0NPTVBMRVRFID0gXCJjb21wbGV0ZVwiO1xuXG4vKipcbiAgKiBAZGVzYyBsaXN0ZW4gdG8gb25lIG9yIG1vcmUgZXZlbnRzIG9uIGFuIGVsZW1lbnRcbiAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsIHRhcmdldCBlbGVtZW50XG4gICogQHBhcmFtIHtBcnJheX0gZXZlbnRMaXN0IHRoZSBldmVudHMgdG8gbGlzdGVuIHRvXG4gICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdGhlIGV2ZW50IGNhbGxiYWNrIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gbGlzdGVuKGVsLCBldmVudExpc3QsIGNhbGxiYWNrKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudExpc3RbaV0sIGNhbGxiYWNrKTtcbiAgfVxufTtcblxuLyoqXG4gICogQGRlc2MgcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIG9uIGFuIGVsZW1lbnRcbiAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsIHRhcmdldCBlbGVtZW50XG4gICogQHBhcmFtIHtBcnJheX0gZXZlbnRMaXN0IHRoZSBldmVudHMgdG8gcmVtb3ZlXG4gICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdGhlIGV2ZW50IGNhbGxiYWNrIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gdW5saXN0ZW4oZWwsIGV2ZW50TGlzdCwgY2FsbGJhY2spIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TGlzdFtpXSwgY2FsbGJhY2spO1xuICB9XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjYWxsIGZuIGNhbGxiYWNrIHdoZW4gdGhlIHBhZ2UgZG9jdW1lbnQgaXMgcmVhZHlcbiAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBjYWxsZWRcbiovXG5mdW5jdGlvbiB3aGVuUmVhZHkoY2FsbGJhY2spIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gUkVBRFlTVEFURV9DT01QTEVURSkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuKGRvY3VtZW50LCBbRVZFTlRfUkVBRFlTVEFURV9DSEFOR0VdLCBmdW5jdGlvbiBzdGF0ZUNoYW5nZShlKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBSRUFEWVNUQVRFX0NPTVBMRVRFKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHVubGlzdGVuKGRvY3VtZW50LCBbRVZFTlRfUkVBRFlTVEFURV9DSEFOR0VdLCBzdGF0ZUNoYW5nZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICAqIEBjb25zdHJ1Y3RvciBjb2xvciB3aGVlbCBvYmplY3RcbiAgKiBAcGFyYW0ge0VsZW1lbnQgfCBTdHJpbmd9IGVsIC0gYSBET00gZWxlbWVudCBvciB0aGUgQ1NTIHNlbGVjdG9yIGZvciBhIERPTSBlbGVtZW50IHRvIHVzZSBhcyBhIGNvbnRhaW5lciBmb3IgdGhlIFVJXG4gICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlXG4qL1xudmFyIGNvbG9yUGlja2VyID0gZnVuY3Rpb24gY29sb3JQaWNrZXIoZWwsIG9wdHMpIHtcbiAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIC8vIGV2ZW50IHN0b3JhZ2UgZm9yIGBvbmAgYW5kIGBvZmZgXG4gIHRoaXMuX2V2ZW50cyA9IHt9O1xuICB0aGlzLl9tb3VzZVRhcmdldCA9IGZhbHNlO1xuICB0aGlzLl9jb2xvckNoYW5nZUFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLmNzcyA9IG9wdHMuY3NzIHx8IG9wdHMuc3R5bGVzIHx8IHVuZGVmaW5lZDtcbiAgLy8gV2FpdCBmb3IgdGhlIGRvY3VtZW50IHRvIGJlIHJlYWR5LCB0aGVuIGluaXQgdGhlIFVJXG4gIHdoZW5SZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgX3RoaXMyLl9pbml0KGVsLCBvcHRzKTtcbiAgfSk7XG59O1xuXG5jb2xvclBpY2tlci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBjb2xvclBpY2tlcixcblxuICAvKipcbiAgICAqIEBkZXNjIGluaXQgdGhlIGNvbG9yIHBpY2tlciBVSVxuICAgICogQHBhcmFtIHtFbGVtZW50IHwgU3RyaW5nfSBlbCAtIGEgRE9NIGVsZW1lbnQgb3IgdGhlIENTUyBzZWxlY3RvciBmb3IgYSBET00gZWxlbWVudCB0byB1c2UgYXMgYSBjb250YWluZXIgZm9yIHRoZSBVSVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlXG4gICAgKiBAYWNjZXNzIHByb3RlY3RlZFxuICAqL1xuICBfaW5pdDogZnVuY3Rpb24gX2luaXQoZWwsIG9wdHMpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIC8vIElmIGBlbGAgaXMgYSBzdHJpbmcsIHVzZSBpdCB0byBzZWxlY3QgYW4gRWxlbWVudCwgZWxzZSBhc3N1bWUgaXQncyBhbiBlbGVtZW50XG4gICAgZWwgPSBcInN0cmluZ1wiID09IHR5cGVvZiBlbCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpIDogZWw7XG4gICAgLy8gRmluZCB0aGUgd2lkdGggYW5kIGhlaWdodCBmb3IgdGhlIFVJXG4gICAgLy8gSWYgbm90IGRlZmluZWQgaW4gdGhlIG9wdGlvbnMsIHRyeSB0aGUgSFRNTCB3aWR0aCArIGhlaWdodCBhdHRyaWJ1dGVzIG9mIHRoZSB3cmFwcGVyLCBlbHNlIGRlZmF1bHQgdG8gMzIwXG4gICAgdmFyIHdpZHRoID0gb3B0cy53aWR0aCB8fCBwYXJzZUludChlbC53aWR0aCkgfHwgMzIwO1xuICAgIHZhciBoZWlnaHQgPSBvcHRzLmhlaWdodCB8fCBwYXJzZUludChlbC5oZWlnaHQpIHx8IDMyMDtcbiAgICAvLyBDYWxjdWxhdGUgbGF5b3V0IHZhcmlhYmxlc1xuICAgIHZhciBwYWRkaW5nID0gb3B0cy5wYWRkaW5nICsgMiB8fCA2LFxuICAgICAgICBib3JkZXJXaWR0aCA9IG9wdHMuYm9yZGVyV2lkdGggfHwgMCxcbiAgICAgICAgbWFya2VyUmFkaXVzID0gb3B0cy5tYXJrZXJSYWRpdXMgfHwgOCxcbiAgICAgICAgc2xpZGVyTWFyZ2luID0gb3B0cy5zbGlkZXJNYXJnaW4gfHwgMjQsXG4gICAgICAgIHNsaWRlckhlaWdodCA9IG9wdHMuc2xpZGVySGVpZ2h0IHx8IG1hcmtlclJhZGl1cyAqIDIgKyBwYWRkaW5nICogMiArIGJvcmRlcldpZHRoICogMixcbiAgICAgICAgYm9keVdpZHRoID0gTWF0aC5taW4oaGVpZ2h0IC0gc2xpZGVySGVpZ2h0IC0gc2xpZGVyTWFyZ2luLCB3aWR0aCksXG4gICAgICAgIHdoZWVsUmFkaXVzID0gYm9keVdpZHRoIC8gMiAtIGJvcmRlcldpZHRoLFxuICAgICAgICBsZWZ0TWFyZ2luID0gKHdpZHRoIC0gYm9keVdpZHRoKSAvIDI7XG4gICAgdmFyIG1hcmtlciA9IHtcbiAgICAgIHI6IG1hcmtlclJhZGl1c1xuICAgIH07XG4gICAgdmFyIGJvcmRlclN0eWxlcyA9IHtcbiAgICAgIHc6IGJvcmRlcldpZHRoLFxuICAgICAgY29sb3I6IG9wdHMuYm9yZGVyQ29sb3IgfHwgXCIjZmZmXCJcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXRlIFVJIGVsZW1lbnRzXG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuc3ZnID0gbmV3IF9zdmcyLmRlZmF1bHQoZWwsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMudWkgPSBbbmV3IF93aGVlbDIuZGVmYXVsdCh0aGlzLnN2Zywge1xuICAgICAgY1g6IGxlZnRNYXJnaW4gKyBib2R5V2lkdGggLyAyLFxuICAgICAgY1k6IGJvZHlXaWR0aCAvIDIsXG4gICAgICByOiB3aGVlbFJhZGl1cyxcbiAgICAgIHJNYXg6IHdoZWVsUmFkaXVzIC0gKG1hcmtlclJhZGl1cyArIHBhZGRpbmcpLFxuICAgICAgbWFya2VyOiBtYXJrZXIsXG4gICAgICBib3JkZXI6IGJvcmRlclN0eWxlcyxcbiAgICAgIGxpZ2h0bmVzczogb3B0cy53aGVlbExpZ2h0bmVzcyA9PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy53aGVlbExpZ2h0bmVzcyxcbiAgICAgIGFudGljbG9ja3dpc2U6IG9wdHMuYW50aWNsb2Nrd2lzZVxuICAgIH0pLCBuZXcgX3NsaWRlcjIuZGVmYXVsdCh0aGlzLnN2Zywge1xuICAgICAgc2xpZGVyVHlwZTogXCJ2XCIsXG4gICAgICB4OiBsZWZ0TWFyZ2luICsgYm9yZGVyV2lkdGgsXG4gICAgICB5OiBib2R5V2lkdGggKyBzbGlkZXJNYXJnaW4sXG4gICAgICB3OiBib2R5V2lkdGggLSBib3JkZXJXaWR0aCAqIDIsXG4gICAgICBoOiBzbGlkZXJIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIsXG4gICAgICByOiBzbGlkZXJIZWlnaHQgLyAyIC0gYm9yZGVyV2lkdGgsXG4gICAgICBtYXJrZXI6IG1hcmtlcixcbiAgICAgIGJvcmRlcjogYm9yZGVyU3R5bGVzXG4gICAgfSldO1xuICAgIC8vIENyZWF0ZSBhbiBpcm9TdHlsZVNoZWV0IGZvciB0aGlzIGNvbG9yV2hlZWwncyBDU1Mgb3ZlcnJpZGVzXG4gICAgdGhpcy5zdHlsZXNoZWV0ID0gbmV3IF9zdHlsZXNoZWV0Mi5kZWZhdWx0KCk7XG4gICAgLy8gQ3JlYXRlIGFuIGlyb0NvbG9yIHRvIHN0b3JlIHRoaXMgY29sb3JXaGVlbCdzIHNlbGVjdGVkIGNvbG9yXG4gICAgdGhpcy5jb2xvciA9IG5ldyBfY29sb3IyLmRlZmF1bHQoKTtcbiAgICAvLyBXaGVuZXZlciB0aGUgc2VsZWN0ZWQgY29sb3IgY2hhbmdlcywgdHJpZ2dlciBhIGNvbG9yV2hlZWwgdXBkYXRlIHRvb1xuICAgIHRoaXMuY29sb3IuX29uQ2hhbmdlID0gdGhpcy5fdXBkYXRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jb2xvci5zZXQob3B0cy5jb2xvciB8fCBvcHRzLmRlZmF1bHRWYWx1ZSB8fCBcIiNmZmZcIik7XG4gICAgLy8gSGFja3kgd29ya2Fyb3VuZCBmb3IgYSBjb3VwbGUgb2YgU2FmYXJpIFNWRyB1cmwgYnVnc1xuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFhbWVzL2lyby5qcy9pc3N1ZXMvMThcbiAgICAvLyBUT0RPOiBwZXJoYXBzIG1ha2UgdGhpcyBhIHNlcGVyYXRlIHBsdWdpbiwgaXQncyBoYWNreSBhbmQgdGFrZXMgdXAgbW9yZSBzcGFjZSB0aGFuIEknbSBoYXBweSB3aXRoXG4gICAgdGhpcy5vbihcImhpc3Rvcnk6c3RhdGVDaGFuZ2VcIiwgZnVuY3Rpb24gKGJhc2UpIHtcbiAgICAgIF90aGlzMy5zdmcudXBkYXRlVXJscyhiYXNlKTtcbiAgICB9KTtcbiAgICAvLyBMaXN0ZW4gdG8gZXZlbnRzXG4gICAgbGlzdGVuKHRoaXMuc3ZnLmVsLCBbRVZFTlRfTU9VU0VET1dOLCBFVkVOVF9UT1VDSFNUQVJUXSwgdGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyB1cGRhdGUgdGhlIHNlbGVjdGVkIGNvbG9yXG4gICAgKiBAcGFyYW0ge09iamVjdH0gbmV3VmFsdWUgLSB0aGUgbmV3IEhTViB2YWx1ZXNcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbGRWYWx1ZSAtIHRoZSBvbGQgSFNWIHZhbHVlc1xuICAgICogQHBhcmFtIHtPYmplY3R9IGNoYW5nZXMgLSBib29sZWFucyBmb3IgZWFjaCBIU1YgY2hhbm5lbDogdHJ1ZSBpZiB0aGUgbmV3IHZhbHVlIGlzIGRpZmZlcmVudCB0byB0aGUgb2xkIHZhbHVlLCBlbHNlIGZhbHNlXG4gICAgKiBAYWNjZXNzIHByb3RlY3RlZFxuICAqL1xuICBfdXBkYXRlOiBmdW5jdGlvbiBfdXBkYXRlKGNvbG9yLCBjaGFuZ2VzKSB7XG4gICAgdmFyIHJnYiA9IGNvbG9yLnJnYlN0cmluZztcbiAgICB2YXIgY3NzID0gdGhpcy5jc3M7XG4gICAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggVUkgZWxlbWVudCBhbmQgdXBkYXRlIGl0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVpLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnVpW2ldLnVwZGF0ZShjb2xvciwgY2hhbmdlcyk7XG4gICAgfVxuICAgIC8vIFVwZGF0ZSB0aGUgc3R5bGVzaGVldCB0b29cbiAgICBmb3IgKHZhciBzZWxlY3RvciBpbiBjc3MpIHtcbiAgICAgIHZhciBwcm9wZXJ0aWVzID0gY3NzW3NlbGVjdG9yXTtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gcHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnN0eWxlc2hlZXQuc2V0UnVsZShzZWxlY3RvciwgcHJvcCwgcmdiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wcyBpZiB0aGUgY29sb3IgaXMgc2V0IGluc2lkZSBhIGBjb2xvcjpjaGFuZ2VgIGNhbGxiYWNrXG4gICAgaWYgKCF0aGlzLl9jb2xvckNoYW5nZUFjdGl2ZSkge1xuICAgICAgLy8gV2hpbGUgX2NvbG9yQ2hhbmdlQWN0aXZlID0gdHJ1ZSwgdGhpcyBldmVudCBjYW5ub3QgYmUgZmlyZWRcbiAgICAgIHRoaXMuX2NvbG9yQ2hhbmdlQWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZW1pdChcImNvbG9yOmNoYW5nZVwiLCBjb2xvciwgY2hhbmdlcyk7XG4gICAgICB0aGlzLl9jb2xvckNoYW5nZUFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgKiBAZGVzYyBTZXQgYSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgYW4gZXZlbnRcbiAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gdG8sIHBhc3MgXCIqXCIgdG8gbGlzdGVuIHRvIGFsbCBldmVudHNcbiAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgd2F0Y2ggY2FsbGJhY2tcbiAgKi9cbiAgb246IGZ1bmN0aW9uIG9uKGV2ZW50VHlwZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgIChldmVudHNbZXZlbnRUeXBlXSB8fCAoZXZlbnRzW2V2ZW50VHlwZV0gPSBbXSkpLnB1c2goY2FsbGJhY2spO1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2MgUmVtb3ZlIGEgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGFuIGV2ZW50IGFkZGVkIHdpdGggb24oKVxuICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSB3YXRjaCBjYWxsYmFjayB0byByZW1vdmUgZnJvbSB0aGUgZXZlbnRcbiAgKi9cbiAgb2ZmOiBmdW5jdGlvbiBvZmYoZXZlbnRUeXBlLCBjYWxsYmFjaykge1xuICAgIHZhciBldmVudExpc3QgPSB0aGlzLl9ldmVudHNbZXZlbnRUeXBlXTtcbiAgICBpZiAoZXZlbnRMaXN0KSBldmVuTGlzdC5zcGxpY2UoZXZlbnRMaXN0LmluZGV4T2YoY2FsbGJhY2spLCAxKTtcbiAgfSxcblxuICAvKipcbiAgICAqIEBkZXNjIEVtaXQgYW4gZXZlbnRcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXRcbiAgICAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgYXJyYXkgb2YgYXJncyB0byBwYXNzIHRvIGNhbGxiYWNrc1xuICAqL1xuICBlbWl0OiBmdW5jdGlvbiBlbWl0KGV2ZW50VHlwZSkge1xuICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHMsXG4gICAgICAgIGNhbGxiYWNrTGlzdCA9IChldmVudHNbZXZlbnRUeXBlXSB8fCBbXSkuY29uY2F0KGV2ZW50c1tcIipcIl0gfHwgW10pO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY2FsbGJhY2tMaXN0W2ldLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICAqIEBkZXNjIERPTSBldmVudCBoYW5kbGVyXG4gICAgKiBAcGFyYW0ge0V2ZW50fSBlIERPTSBldmVudCAoY3VycmVudGx5IGVpdGhlciBtb3VzZSBvciB0b3VjaCBldmVudHMpXG4gICovXG4gIGhhbmRsZUV2ZW50OiBmdW5jdGlvbiBoYW5kbGVFdmVudChlKSB7XG4gICAgLy8gRGV0ZWN0IGlmIHRoZSBldmVudCBpcyBhIHRvdWNoIGV2ZW50IGJ5IGNoZWNraW5nIGlmIGl0IGhhcyB0aGUgYHRvdWNoZXNgIHByb3BlcnR5XG4gICAgLy8gSWYgaXQgaXMgYSB0b3VjaCBldmVudCwgdXNlIHRoZSBmaXJzdCB0b3VjaCBpbnB1dFxuICAgIHZhciBwb2ludCA9IGUudG91Y2hlcyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlLFxuXG4gICAgLy8gR2V0IHRoZSBzY3JlZW4gcG9zaXRpb24gb2YgdGhlIFVJXG4gICAgcmVjdCA9IHRoaXMuc3ZnLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXG4gICAgLy8gQ29udmVydCB0aGUgc2NyZWVuLXNwYWNlIHBvaW50ZXIgcG9zaXRpb24gdG8gbG9jYWwtc3BhY2VcbiAgICB4ID0gcG9pbnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgeSA9IHBvaW50LmNsaWVudFkgLSByZWN0LnRvcDtcblxuICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICBjYXNlIEVWRU5UX01PVVNFRE9XTjpcbiAgICAgIGNhc2UgRVZFTlRfVE9VQ0hTVEFSVDpcbiAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggVUkgZWxlbWVudCBhbmQgY2hlY2sgaWYgdGhlIHBvaW50IFwiaGl0c1wiIGl0XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy51aS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciB1aUVsZW1lbnQgPSB0aGlzLnVpW2ldO1xuICAgICAgICAgIC8vIElmIHRoZSBlbGVtZW50IGlzIGhpdCwgdGhpcyBtZWFucyB0aGUgdXNlciBoYXMgY2xpY2tlZCB0aGUgZWxlbWVudCBhbmQgaXMgdHJ5aW5nIHRvIGludGVyYWN0IHdpdGggaXRcbiAgICAgICAgICBpZiAodWlFbGVtZW50LmNoZWNrSGl0KHgsIHkpKSB7XG4gICAgICAgICAgICAvLyBTZXQgYW4gaW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSB1aUVsZW1lbnQgYmVpbmcgaW50ZXJhY3RlZCB3aXRoLCBmb3Igb3RoZXIgaW50ZXJuYWwgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgICAgIHRoaXMuX21vdXNlVGFyZ2V0ID0gdWlFbGVtZW50O1xuICAgICAgICAgICAgLy8gQXR0YWNoIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgbGlzdGVuKGRvY3VtZW50LCBbRVZFTlRfTU9VU0VNT1ZFLCBFVkVOVF9UT1VDSE1PVkUsIEVWRU5UX01PVVNFVVAsIEVWRU5UX1RPVUNIRU5EXSwgdGhpcyk7XG4gICAgICAgICAgICAvLyBFbWl0IGlucHV0IHN0YXJ0IGV2ZW50XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJpbnB1dDpzdGFydFwiKTtcbiAgICAgICAgICAgIC8vIEZpbmFsbHksIHVzZSB0aGUgcG9zaXRpb24gdG8gdXBkYXRlIHRoZSBwaWNrZWQgY29sb3JcbiAgICAgICAgICAgIHRoaXMuY29sb3IuaHN2ID0gdGhpcy5fbW91c2VUYXJnZXQuaW5wdXQoeCwgeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFVkVOVF9NT1VTRU1PVkU6XG4gICAgICBjYXNlIEVWRU5UX1RPVUNITU9WRTpcbiAgICAgICAgLy8gVXNlIHRoZSBwb3NpdGlvbiB0byB1cGRhdGUgdGhlIHBpY2tlciBjb2xvclxuICAgICAgICB0aGlzLmNvbG9yLmhzdiA9IHRoaXMuX21vdXNlVGFyZ2V0LmlucHV0KHgsIHkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRVZFTlRfTU9VU0VVUDpcbiAgICAgIGNhc2UgRVZFTlRfVE9VQ0hFTkQ6XG4gICAgICAgIHRoaXMuX21vdXNlVGFyZ2V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdChcImlucHV0OmVuZFwiKTtcbiAgICAgICAgdW5saXN0ZW4oZG9jdW1lbnQsIFtFVkVOVF9NT1VTRU1PVkUsIEVWRU5UX1RPVUNITU9WRSwgRVZFTlRfTU9VU0VVUCwgRVZFTlRfVE9VQ0hFTkRdLCB0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLl9tb3VzZVRhcmdldCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb2xvclBpY2tlcjtcblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfY29sb3JQaWNrZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2NvbG9yUGlja2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbG9yUGlja2VyKTtcblxudmFyIF9jb2xvciA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY29sb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29sb3IpO1xuXG52YXIgX3N0eWxlc2hlZXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX3N0eWxlc2hlZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVzaGVldCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDb2xvcjogX2NvbG9yMi5kZWZhdWx0LFxuICBDb2xvclBpY2tlcjogX2NvbG9yUGlja2VyMi5kZWZhdWx0LFxuICBTdHlsZXNoZWV0OiBfc3R5bGVzaGVldDIuZGVmYXVsdCxcbiAgdmVyc2lvbjogXCIzLjIuMFwiXG59O1xuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIF9tYXJrZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX21hcmtlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXJrZXIpO1xuXG52YXIgX2NvbG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jb2xvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIGNzcyBjbGFzcyBwcmVmaXggZm9yIHRoaXMgZWxlbWVudFxudmFyIENMQVNTX1BSRUZJWCA9IFwiaXJvX19zbGlkZXJcIjtcblxuLyoqXG4gICogQGNvbnN0cnVjdG9yIHNsaWRlciBVSVxuICAqIEBwYXJhbSB7c3ZnUm9vdH0gc3ZnIC0gc3ZnUm9vdCBvYmplY3RcbiAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiovXG52YXIgc2xpZGVyID0gZnVuY3Rpb24gc2xpZGVyKHN2Zywgb3B0cykge1xuICB2YXIgciA9IG9wdHMucixcbiAgICAgIHcgPSBvcHRzLncsXG4gICAgICBoID0gb3B0cy5oLFxuICAgICAgeCA9IG9wdHMueCxcbiAgICAgIHkgPSBvcHRzLnksXG4gICAgICBib3JkZXJXaWR0aCA9IG9wdHMuYm9yZGVyLnc7XG5cbiAgLy8gXCJyYW5nZVwiIGxpbWl0cyBob3cgZmFyIHRoZSBzbGlkZXIncyBtYXJrZXIgY2FuIHRyYXZlbCwgYW5kIHdoZXJlIGl0IHN0b3BzIGFuZCBzdGFydHMgYWxvbmcgdGhlIFggYXhpc1xuICBvcHRzLnJhbmdlID0ge1xuICAgIG1pbjogeCArIHIsXG4gICAgbWF4OiB4ICsgdyAtIHIsXG4gICAgdzogdyAtIHIgKiAyXG4gIH07XG5cbiAgb3B0cy5zbGlkZXJUeXBlID0gb3B0cy5zbGlkZXJUeXBlIHx8IFwidlwiO1xuXG4gIHRoaXMudHlwZSA9IFwic2xpZGVyXCI7XG4gIHRoaXMuX29wdHMgPSBvcHRzO1xuXG4gIHZhciByYWRpdXMgPSByICsgYm9yZGVyV2lkdGggLyAyO1xuXG4gIHZhciBiYXNlR3JvdXAgPSBzdmcuZyh7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWFxuICB9KTtcblxuICB2YXIgcmVjdCA9IGJhc2VHcm91cC5pbnNlcnQoXCJyZWN0XCIsIHtcbiAgICBjbGFzczogQ0xBU1NfUFJFRklYICsgXCJfX3ZhbHVlXCIsXG4gICAgcng6IHJhZGl1cyxcbiAgICByeTogcmFkaXVzLFxuICAgIHg6IHggLSBib3JkZXJXaWR0aCAvIDIsXG4gICAgeTogeSAtIGJvcmRlcldpZHRoIC8gMixcbiAgICB3aWR0aDogdyArIGJvcmRlcldpZHRoLFxuICAgIGhlaWdodDogaCArIGJvcmRlcldpZHRoLFxuICAgIHN0cm9rZVdpZHRoOiBib3JkZXJXaWR0aCxcbiAgICBzdHJva2U6IG9wdHMuYm9yZGVyLmNvbG9yXG4gIH0pO1xuXG4gIHJlY3Quc2V0R3JhZGllbnQoXCJmaWxsXCIsIHN2Zy5ncmFkaWVudChcImxpbmVhclwiLCB7XG4gICAgMDogeyBjb2xvcjogXCIjMDAwXCIgfSxcbiAgICAxMDA6IHsgY29sb3I6IFwiI2ZmZlwiIH1cbiAgfSkpO1xuXG4gIHRoaXMuX2dyYWRpZW50ID0gcmVjdC5ncmFkaWVudDtcblxuICB0aGlzLm1hcmtlciA9IG5ldyBfbWFya2VyMi5kZWZhdWx0KGJhc2VHcm91cCwgb3B0cy5tYXJrZXIpO1xufTtcblxuc2xpZGVyLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IHNsaWRlcixcblxuICAvKipcbiAgICAqIEBkZXNjIHVwZGF0ZXMgdGhpcyBlbGVtZW50IHRvIHJlcHJlc2VudCBhIG5ldyBjb2xvciB2YWx1ZVxuICAgICogQHBhcmFtIHtPYmplY3R9IGNvbG9yIC0gYW4gaXJvQ29sb3Igb2JqZWN0IHdpdGggdGhlIG5ldyBjb2xvciB2YWx1ZVxuICAgICogQHBhcmFtIHtPYmplY3R9IGNoYW5nZXMgLSBhbiBvYmplY3QgdGhhdCBnaXZlcyBhIGJvb2xlYW4gZm9yIGVhY2ggSFNWIGNoYW5uZWwsIGluZGljYXRpbmcgd2hldGhlciBvdCBub3QgdGhhdCBjaGFubmVsIGhhcyBjaGFuZ2VkXG4gICovXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGNvbG9yLCBjaGFuZ2VzKSB7XG4gICAgdmFyIG9wdHMgPSB0aGlzLl9vcHRzO1xuICAgIHZhciByYW5nZSA9IG9wdHMucmFuZ2U7XG4gICAgdmFyIGhzdiA9IGNvbG9yLmhzdjtcbiAgICB2YXIgaHNsID0gX2NvbG9yMi5kZWZhdWx0LmhzdjJIc2woeyBoOiBoc3YuaCwgczogaHN2LnMsIHY6IDEwMCB9KTtcbiAgICBpZiAob3B0cy5zbGlkZXJUeXBlID09IFwidlwiKSB7XG4gICAgICBpZiAoY2hhbmdlcy5oIHx8IGNoYW5nZXMucykge1xuICAgICAgICB0aGlzLl9ncmFkaWVudC5zdG9wc1sxXS5zZXRBdHRycyh7IHN0b3BDb2xvcjogXCJoc2woXCIgKyBoc2wuaCArIFwiLFwiICsgaHNsLnMgKyBcIiUsXCIgKyBoc2wubCArIFwiJSlcIiB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLnYpIHtcbiAgICAgICAgdmFyIHBlcmNlbnQgPSBoc3YudiAvIDEwMDtcbiAgICAgICAgdGhpcy5tYXJrZXIubW92ZShyYW5nZS5taW4gKyBwZXJjZW50ICogcmFuZ2Uudywgb3B0cy55ICsgb3B0cy5oIC8gMik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2MgVGFrZXMgYSBwb2ludCBhdCAoeCwgeSkgYW5kIHJldHVybnMgSFNWIHZhbHVlcyBiYXNlZCBvbiB0aGlzIGlucHV0IC0tIHVzZSB0aGlzIHRvIHVwZGF0ZSBhIGNvbG9yIGZyb20gbW91c2UgaW5wdXRcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gcG9pbnQgeCBjb29yZGluYXRlXG4gICAgKiBAcGFyYW0ge051bWJlcn0geSAtIHBvaW50IHkgY29vcmRpbmF0ZVxuICAgICogQHJldHVybiB7T2JqZWN0fSAtIG5ldyBIU1YgY29sb3IgdmFsdWVzIChzb21lIGNoYW5uZWxzIG1heSBiZSBtaXNzaW5nKVxuICAqL1xuICBpbnB1dDogZnVuY3Rpb24gaW5wdXQoeCwgeSkge1xuICAgIHZhciBvcHRzID0gdGhpcy5fb3B0cztcbiAgICB2YXIgcmFuZ2UgPSBvcHRzLnJhbmdlO1xuICAgIHZhciBkaXN0ID0gTWF0aC5tYXgoTWF0aC5taW4oeCwgcmFuZ2UubWF4KSwgcmFuZ2UubWluKSAtIHJhbmdlLm1pbjtcbiAgICByZXR1cm4ge1xuICAgICAgdjogTWF0aC5yb3VuZCgxMDAgLyByYW5nZS53ICogZGlzdClcbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2MgQ2hlY2sgaWYgYSBwb2ludCBhdCAoeCwgeSkgaXMgaW5zaWRlIHRoaXMgZWxlbWVudFxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHggLSBwb2ludCB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gcG9pbnQgeSBjb29yZGluYXRlXG4gICAgKiBAcmV0dXJuIHtCb29sZWFufSAtIHRydWUgaWYgdGhlIHBvaW50IGlzIGEgXCJoaXRcIiwgZWxzZSBmYWxzZVxuICAqL1xuICBjaGVja0hpdDogZnVuY3Rpb24gY2hlY2tIaXQoeCwgeSkge1xuICAgIHZhciBvcHRzID0gdGhpcy5fb3B0cztcbiAgICByZXR1cm4geCA+IG9wdHMueCAmJiB4IDwgb3B0cy54ICsgb3B0cy53ICYmIHkgPiBvcHRzLnkgJiYgeSA8IG9wdHMueSArIG9wdHMuaDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNsaWRlcjtcblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBHUkFESUVOVF9JTkRFWCA9IDA7XG52YXIgR1JBRElFTlRfU1VGRklYID0gXCJHcmFkaWVudFwiO1xudmFyIFNWR19OQU1FU1BBQ0UgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG52YXIgU1ZHX0FUVFJJQlVURV9TSE9SVEhBTkRTID0ge1xuICBjbGFzczogXCJjbGFzc1wiLFxuICBzdHJva2U6IFwic3Ryb2tlXCIsXG4gIHN0cm9rZVdpZHRoOiBcInN0cm9rZS13aWR0aFwiLFxuICBmaWxsOiBcImZpbGxcIixcbiAgb3BhY2l0eTogXCJvcGFjaXR5XCIsXG4gIG9mZnNldDogXCJvZmZzZXRcIixcbiAgc3RvcENvbG9yOiBcInN0b3AtY29sb3JcIixcbiAgc3RvcE9wYWNpdHk6IFwic3RvcC1vcGFjaXR5XCJcbn07XG4vLyBUT0RPOiBmaWd1cmUgb3V0IHdoeSB0aGVzZSBhcmVuJ3QgYmVpbmcgY29tcHJlc3NlZCBwcm9wZXJseT9cbnZhciBTVkdfVFJBTlNGT1JNX1NIT1JUSEFORFMgPSB7XG4gIHRyYW5zbGF0ZTogXCJzZXRUcmFuc2xhdGVcIixcbiAgc2NhbGU6IFwic2V0U2NhbGVcIixcbiAgcm90YXRlOiBcInNldFJvdGF0ZVwiXG59O1xuLy8gc25pZmYgdXNlcmFnZW50IHN0cmluZyB0byBjaGVjayBpZiB0aGUgdXNlciBpcyBydW5uaW5nIElFLCBFZGdlIG9yIFNhZmFyaVxudmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbnZhciBJU19JRSA9IC9tc2llfHRyaWRlbnR8ZWRnZS8udGVzdCh1YSk7XG52YXIgSVNfU0FGQVJJID0gL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdCh1YSk7XG4vKipcbiAgKiBAY29uc3RydWN0b3Igc3ZnIGVsZW1lbnQgd3JhcHBlclxuICAqIEBwYXJhbSB7c3ZnUm9vdH0gcm9vdCAtIHN2Z1Jvb3Qgb2JqZWN0XG4gICogQHBhcmFtIHtzdmdFbGVtZW50IHwgRWxlbWVudH0gcGFyZW50IC0gcGFyZW50IG5vZGUgXG4gICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBlbGVtZW50IHRhZyBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IGF0dHJzIC0gZWxlbWVudCBhdHRyaWJ1dGVzXG4qL1xudmFyIHN2Z0VsZW1lbnQgPSBmdW5jdGlvbiBzdmdFbGVtZW50KHJvb3QsIHBhcmVudCwgdHlwZSwgYXR0cnMpIHtcbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OQU1FU1BBQ0UsIHR5cGUpO1xuICB0aGlzLmVsID0gZWw7XG4gIHRoaXMuc2V0QXR0cnMoYXR0cnMpO1xuICAocGFyZW50LmVsIHx8IHBhcmVudCkuYXBwZW5kQ2hpbGQoZWwpO1xuICB0aGlzLl9yb290ID0gcm9vdDtcbiAgdGhpcy5fc3ZnVHJhbnNmb3JtcyA9IHt9O1xuICB0aGlzLl90cmFuc2Zvcm1MaXN0ID0gZWwudHJhbnNmb3JtID8gZWwudHJhbnNmb3JtLmJhc2VWYWwgOiBmYWxzZTtcbn07XG5cbnN2Z0VsZW1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3Rvcjogc3ZnRWxlbWVudCxcblxuICAvKipcbiAgICAqIEBkZXNjIGluc2VydCBhIG5ldyBzdmdFbGVtZW50XG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIGVsZW1lbnQgdGFnIG5hbWVcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycyAtIGVsZW1lbnQgYXR0cmlidXRlc1xuICAqL1xuICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydCh0eXBlLCBhdHRycykge1xuICAgIHJldHVybiBuZXcgc3ZnRWxlbWVudCh0aGlzLl9yb290LCB0aGlzLCB0eXBlLCBhdHRycyk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBzaG9ydGhhbmQgdG8gaW5zZXJ0IGEgbmV3IGdyb3VwIHN2Z0VsZW1lbnRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycyAtIGVsZW1lbnQgYXR0cmlidXRlc1xuICAqL1xuICBnOiBmdW5jdGlvbiBnKGF0dHJzKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0KFwiZ1wiLCBhdHRycyk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBzaG9ydGhhbmQgdG8gaW5zZXJ0IGEgbmV3IGFyYyBzdmdFbGVtZW50XG4gICAgKiBAcGFyYW0ge051bWJlcn0gY3ggLSBhcmMgY2VudGVyIHhcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSBjeSAtIGFyYyBjZW50ZXIgeVxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZGl1cyAtIGFyYyByYWRpdXNcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydEFuZ2xlIC0gYXJjIHN0YXJ0IGFuZ2xlIChpbiBkZWdyZWVzKVxuICAgICogQHBhcmFtIHtOdW1iZXJ9IGVuZEFuZ2xlIC0gYXJjIGVuZCBhbmdsZSAoaW4gZGVncmVlcylcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycyAtIGVsZW1lbnQgYXR0cmlidXRlc1xuICAqL1xuICBhcmM6IGZ1bmN0aW9uIGFyYyhjeCwgY3ksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGF0dHJzKSB7XG4gICAgdmFyIGxhcmdlQXJjRmxhZyA9IGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA8PSAxODAgPyAwIDogMTtcbiAgICBzdGFydEFuZ2xlICo9IE1hdGguUEkgLyAxODA7XG4gICAgZW5kQW5nbGUgKj0gTWF0aC5QSSAvIDE4MDtcbiAgICB2YXIgeDEgPSBjeCArIHJhZGl1cyAqIE1hdGguY29zKGVuZEFuZ2xlKSxcbiAgICAgICAgeTEgPSBjeSArIHJhZGl1cyAqIE1hdGguc2luKGVuZEFuZ2xlKSxcbiAgICAgICAgeDIgPSBjeCArIHJhZGl1cyAqIE1hdGguY29zKHN0YXJ0QW5nbGUpLFxuICAgICAgICB5MiA9IGN5ICsgcmFkaXVzICogTWF0aC5zaW4oc3RhcnRBbmdsZSk7XG4gICAgYXR0cnMgPSBhdHRycyB8fCB7fTtcbiAgICBhdHRycy5kID0gW1wiTVwiLCB4MSwgeTEsIFwiQVwiLCByYWRpdXMsIHJhZGl1cywgMCwgbGFyZ2VBcmNGbGFnLCAwLCB4MiwgeTJdLmpvaW4oXCIgXCIpO1xuICAgIHJldHVybiB0aGlzLmluc2VydChcInBhdGhcIiwgYXR0cnMpO1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2Mgc2hvcnRoYW5kIHRvIGluc2VydCBhIG5ldyBjaXJjbGUgc3ZnRWxlbWVudFxuICAgICogQHBhcmFtIHtOdW1iZXJ9IGN4IC0gY2lyY2xlIGNlbnRlciB4XG4gICAgKiBAcGFyYW0ge051bWJlcn0gY3kgLSBjaXJjbGUgY2VudGVyIHlcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXMgLSBjaXJjbGUgcmFkaXVzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnMgLSBlbGVtZW50IGF0dHJpYnV0ZXNcbiAgKi9cbiAgY2lyY2xlOiBmdW5jdGlvbiBjaXJjbGUoY3gsIGN5LCByYWRpdXMsIGF0dHJzKSB7XG4gICAgYXR0cnMgPSBhdHRycyB8fCB7fTtcbiAgICBhdHRycy5jeCA9IGN4O1xuICAgIGF0dHJzLmN5ID0gY3k7XG4gICAgYXR0cnMuciA9IHJhZGl1cztcbiAgICByZXR1cm4gdGhpcy5pbnNlcnQoXCJjaXJjbGVcIiwgYXR0cnMpO1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2Mgc2V0IGEgcm90YXRlL3RyYW5zbGF0ZS9zY2FsZSB0cmFuc2Zvcm0gb24gdGhpcyBlbGVtZW50XG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIHRyYW5zZm9ybSAocm90YXRlIHwgdHJhbnNsYXRlIHwgc2NhbGUpXG4gICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzIC0gdHJhbnNmb3JtIHZhbHVlc1xuICAqL1xuICBzZXRUcmFuc2Zvcm06IGZ1bmN0aW9uIHNldFRyYW5zZm9ybSh0eXBlLCBhcmdzKSB7XG4gICAgaWYgKCFJU19JRSkge1xuICAgICAgdmFyIHRyYW5zZm9ybSwgdHJhbnNmb3JtRm47XG4gICAgICB2YXIgc3ZnVHJhbnNmb3JtcyA9IHRoaXMuX3N2Z1RyYW5zZm9ybXM7XG4gICAgICBpZiAoIXN2Z1RyYW5zZm9ybXNbdHlwZV0pIHtcbiAgICAgICAgdHJhbnNmb3JtID0gdGhpcy5fcm9vdC5lbC5jcmVhdGVTVkdUcmFuc2Zvcm0oKTtcbiAgICAgICAgc3ZnVHJhbnNmb3Jtc1t0eXBlXSA9IHRyYW5zZm9ybTtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtTGlzdC5hcHBlbmRJdGVtKHRyYW5zZm9ybSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2Zvcm0gPSBzdmdUcmFuc2Zvcm1zW3R5cGVdO1xuICAgICAgfVxuICAgICAgdHJhbnNmb3JtRm4gPSB0eXBlIGluIFNWR19UUkFOU0ZPUk1fU0hPUlRIQU5EUyA/IFNWR19UUkFOU0ZPUk1fU0hPUlRIQU5EU1t0eXBlXSA6IHR5cGU7XG4gICAgICB0cmFuc2Zvcm1bdHJhbnNmb3JtRm5dLmFwcGx5KHRyYW5zZm9ybSwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1pY3Jvc29mdCBzdGlsbCBjYW4ndCBtYWtlIGEgd2ViIGJyb3dzZXIgdGhhdCBhY3R1YWxseSB3b3JrcywgYXMgc3VjaCwgRWRnZSArIElFIGRvbnQgaW1wbGVtZW50IFNWRyB0cmFuc2Zvcm1zIHByb3Blcmx5LlxuICAgICAgLy8gV2UgaGF2ZSB0byBmb3JjZSB0aGVtIGluc3RlYWQuLi4gZ2VlelxuICAgICAgdGhpcy5zZXRBdHRycyh7IFwidHJhbnNmb3JtXCI6IHR5cGUgKyBcIihcIiArIGFyZ3Muam9pbihcIiwgXCIpICsgXCIpXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2Mgc2V0IGF0dHJpYnV0ZXMgb24gdGhpcyBlbGVtZW50XG4gICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnMgLSBlbGVtZW50IGF0dHJpYnV0ZXNcbiAgKi9cbiAgc2V0QXR0cnM6IGZ1bmN0aW9uIHNldEF0dHJzKGF0dHJzKSB7XG4gICAgZm9yICh2YXIgYXR0ciBpbiBhdHRycykge1xuICAgICAgdmFyIG5hbWUgPSBhdHRyIGluIFNWR19BVFRSSUJVVEVfU0hPUlRIQU5EUyA/IFNWR19BVFRSSUJVVEVfU0hPUlRIQU5EU1thdHRyXSA6IGF0dHI7XG4gICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZShuYW1lLCBhdHRyc1thdHRyXSk7XG4gICAgfVxuICB9LFxuXG4gIHNldEdyYWRpZW50OiBmdW5jdGlvbiBzZXRHcmFkaWVudChhdHRyLCBncmFkaWVudCkge1xuICAgIHZhciBhdHRycyA9IHt9O1xuICAgIGF0dHJzW2F0dHJdID0gZ3JhZGllbnQuZ2V0VXJsKCk7XG4gICAgZ3JhZGllbnQuX3JlZnNbYXR0cl0gPSB0aGlzO1xuICAgIHRoaXMuZ3JhZGllbnQgPSBncmFkaWVudDtcbiAgICB0aGlzLnNldEF0dHJzKGF0dHJzKTtcbiAgfVxufTtcblxuLyoqXG4gICogQGNvbnN0cnVjdG9yIHN2ZyBncmFkaWVudCB3cmFwcGVyXG4gICogQHBhcmFtIHtzdmdSb290fSByb290IC0gc3ZnUm9vdCBvYmplY3RcbiAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIGdyYWRpZW50IHR5cGUgKGxpbmVhciB8IHJhZGlhbClcbiAgKiBAcGFyYW0ge09iamVjdH0gc3RvcHMgLSBncmFkaWVudCBzdG9wcyA9IHtjb2xvciwgb3BhY2l0eX0ga2V5ZWQgYnkgb2Zmc2V0IHZhbHVlXG4qL1xudmFyIHN2Z0dyYWRpZW50ID0gZnVuY3Rpb24gc3ZnR3JhZGllbnQocm9vdCwgdHlwZSwgc3RvcHMpIHtcbiAgdmFyIHN0b3BFbGVtZW50cyA9IFtdO1xuICB2YXIgZ3JhZGllbnQgPSByb290Ll9kZWZzLmluc2VydCh0eXBlICsgR1JBRElFTlRfU1VGRklYLCB7XG4gICAgaWQ6IFwiaXJvXCIgKyBHUkFESUVOVF9TVUZGSVggKyBHUkFESUVOVF9JTkRFWCsrXG4gIH0pO1xuICBmb3IgKHZhciBvZmZzZXQgaW4gc3RvcHMpIHtcbiAgICB2YXIgc3RvcCA9IHN0b3BzW29mZnNldF07XG4gICAgc3RvcEVsZW1lbnRzLnB1c2goZ3JhZGllbnQuaW5zZXJ0KFwic3RvcFwiLCB7XG4gICAgICBvZmZzZXQ6IG9mZnNldCArIFwiJVwiLFxuICAgICAgc3RvcENvbG9yOiBzdG9wLmNvbG9yLFxuICAgICAgc3RvcE9wYWNpdHk6IHN0b3Aub3BhY2l0eSA9PT0gdW5kZWZpbmVkID8gMSA6IHN0b3Aub3BhY2l0eVxuICAgIH0pKTtcbiAgfVxuICB0aGlzLmVsID0gZ3JhZGllbnQuZWw7XG4gIHRoaXMuc3RvcHMgPSBzdG9wRWxlbWVudHM7XG4gIHRoaXMuX3JlZnMgPSB7fTtcbn07XG5cbnN2Z0dyYWRpZW50LnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoYmFzZSkge1xuICB2YXIgcm9vdCA9IElTX1NBRkFSSSA/IGJhc2UgfHwgd2luZG93LmxvY2F0aW9uLmhyZWYgOiBcIlwiO1xuICByZXR1cm4gXCJ1cmwoXCIgKyByb290ICsgXCIjXCIgKyB0aGlzLmVsLmlkICsgXCIpXCI7XG59O1xuXG4vKipcbiAgKiBAY29uc3RydWN0b3Igc3ZnIHJvb3QgZWxlbWVudCAoaW5oZXJpdHMgc3ZnRWxlbWVudClcbiAgKiBAcGFyYW0ge3N2Z0VsZW1lbnQgfCBFbGVtZW50fSBwYXJlbnQgLSBwYXJlbnQgbm9kZSBcbiAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBzdmcgd2lkdGhcbiAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gc3ZnIGhlaWdodFxuKi9cbnZhciBzdmdSb290ID0gZnVuY3Rpb24gc3ZnUm9vdChwYXJlbnQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgc3ZnRWxlbWVudC5jYWxsKHRoaXMsIHRoaXMsIHBhcmVudCwgXCJzdmdcIiwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBzdHlsZTogXCJkaXNwbGF5OmJsb2NrXCIgfSk7XG4gIHRoaXMuX2RlZnMgPSB0aGlzLmluc2VydChcImRlZnNcIik7XG4gIHRoaXMuX2dyYWRpZW50cyA9IFtdO1xufTtcblxuc3ZnUm9vdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN2Z0VsZW1lbnQucHJvdG90eXBlKTtcbnN2Z1Jvb3QucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ZnUm9vdDtcbnN2Z1Jvb3QucHJvdG90eXBlLmdyYWRpZW50ID0gZnVuY3Rpb24gKHR5cGUsIHN0b3BzKSB7XG4gIHZhciBncmFkaWVudCA9IG5ldyBzdmdHcmFkaWVudCh0aGlzLCB0eXBlLCBzdG9wcyk7XG4gIHRoaXMuX2dyYWRpZW50cy5wdXNoKGdyYWRpZW50KTtcbiAgcmV0dXJuIGdyYWRpZW50O1xufTtcbnN2Z1Jvb3QucHJvdG90eXBlLnVwZGF0ZVVybHMgPSBmdW5jdGlvbiAoYmFzZSkge1xuICBpZiAoSVNfU0FGQVJJKSB7XG4gICAgdmFyIGdyYWRpZW50cyA9IHRoaXMuX2dyYWRpZW50cztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYWRpZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIga2V5IGluIGdyYWRpZW50c1tpXS5fcmVmcykge1xuICAgICAgICB2YXIgYXR0cnMgPSB7fTtcbiAgICAgICAgYXR0cnNba2V5XSA9IGdyYWRpZW50c1tpXS5nZXRVcmwoYmFzZSk7XG4gICAgICAgIGdyYWRpZW50c1tpXS5fcmVmc1trZXldLnNldEF0dHJzKGF0dHJzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc3ZnUm9vdDtcblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfbWFya2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9tYXJrZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWFya2VyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gY3NzIGNsYXNzIHByZWZpeCBmb3IgdGhpcyBlbGVtZW50XG52YXIgQ0xBU1NfUFJFRklYID0gXCJpcm9fX3doZWVsXCI7XG4vLyBRdWljayByZWZlcmVuY2VzIHRvIHJldXNlZCBtYXRoIGZ1bmN0aW9uc1xudmFyIFBJID0gTWF0aC5QSSxcbiAgICBzcXJ0ID0gTWF0aC5zcXJ0LFxuICAgIGFicyA9IE1hdGguYWJzLFxuICAgIHJvdW5kID0gTWF0aC5yb3VuZDtcblxuLyoqXG4gICogQGNvbnN0cnVjdG9yIGh1ZSB3aGVlbCBVSVxuICAqIEBwYXJhbSB7c3ZnUm9vdH0gc3ZnIC0gc3ZnUm9vdCBvYmplY3RcbiAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiovXG52YXIgd2hlZWwgPSBmdW5jdGlvbiB3aGVlbChzdmcsIG9wdHMpIHtcbiAgdGhpcy5fb3B0cyA9IG9wdHM7XG4gIHRoaXMudHlwZSA9IFwid2hlZWxcIjtcblxuICB2YXIgY1kgPSBvcHRzLmNZLFxuICAgICAgY1ggPSBvcHRzLmNYLFxuICAgICAgciA9IG9wdHMucixcbiAgICAgIGJvcmRlciA9IG9wdHMuYm9yZGVyO1xuXG4gIHZhciBiYXNlR3JvdXAgPSBzdmcuZyh7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWFxuICB9KTtcblxuICBiYXNlR3JvdXAuY2lyY2xlKGNYLCBjWSwgciArIGJvcmRlci53IC8gMiwge1xuICAgIGNsYXNzOiBDTEFTU19QUkVGSVggKyBcIl9fYm9yZGVyXCIsXG4gICAgZmlsbDogXCIjZmZmXCIsXG4gICAgc3Ryb2tlOiBib3JkZXIuY29sb3IsXG4gICAgc3Ryb2tlV2lkdGg6IGJvcmRlci53XG4gIH0pO1xuXG4gIHZhciByaW5nR3JvdXAgPSBiYXNlR3JvdXAuZyh7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWCArIFwiX19odWVcIixcbiAgICBzdHJva2VXaWR0aDogcixcbiAgICBmaWxsOiBcIm5vbmVcIlxuICB9KTtcblxuICBmb3IgKHZhciBodWUgPSAwOyBodWUgPCAzNjA7IGh1ZSsrKSB7XG4gICAgcmluZ0dyb3VwLmFyYyhjWCwgY1ksIHIgLyAyLCBodWUsIGh1ZSArIDEuNSwge1xuICAgICAgc3Ryb2tlOiBcImhzbChcIiArIChvcHRzLmFudGljbG9ja3dpc2UgPyAzNjAgLSBodWUgOiBodWUpICsgXCIsMTAwJSw1MCUpXCJcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzYXR1cmF0aW9uID0gYmFzZUdyb3VwLmNpcmNsZShjWCwgY1ksIHIsIHtcbiAgICBjbGFzczogQ0xBU1NfUFJFRklYICsgXCJfX3NhdHVyYXRpb25cIlxuICB9KTtcblxuICBzYXR1cmF0aW9uLnNldEdyYWRpZW50KFwiZmlsbFwiLCBzdmcuZ3JhZGllbnQoXCJyYWRpYWxcIiwge1xuICAgIDA6IHtcbiAgICAgIGNvbG9yOiBcIiNmZmZcIlxuICAgIH0sXG4gICAgMTAwOiB7XG4gICAgICBjb2xvcjogXCIjZmZmXCIsXG4gICAgICBvcGFjaXR5OiAwXG4gICAgfVxuICB9KSk7XG5cbiAgdGhpcy5fbGlnaHRuZXNzID0gYmFzZUdyb3VwLmNpcmNsZShjWCwgY1ksIHIsIHtcbiAgICBjbGFzczogQ0xBU1NfUFJFRklYICsgXCJfX2xpZ2h0bmVzc1wiLFxuICAgIG9wYWNpdHk6IDBcbiAgfSk7XG5cbiAgdGhpcy5tYXJrZXIgPSBuZXcgX21hcmtlcjIuZGVmYXVsdChiYXNlR3JvdXAsIG9wdHMubWFya2VyKTtcbn07XG5cbndoZWVsLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IHdoZWVsLFxuXG4gIC8qKlxuICAgICogQGRlc2MgdXBkYXRlcyB0aGlzIGVsZW1lbnQgdG8gcmVwcmVzZW50IGEgbmV3IGNvbG9yIHZhbHVlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gY29sb3IgLSBhbiBpcm9Db2xvciBvYmplY3Qgd2l0aCB0aGUgbmV3IGNvbG9yIHZhbHVlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gY2hhbmdlcyAtIGFuIG9iamVjdCB0aGF0IGdpdmVzIGEgYm9vbGVhbiBmb3IgZWFjaCBIU1YgY2hhbm5lbCwgaW5kaWNhdGluZyB3aGV0aGVyIG90IG5vdCB0aGF0IGNoYW5uZWwgaGFzIGNoYW5nZWRcbiAgKi9cbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoY29sb3IsIGNoYW5nZXMpIHtcbiAgICB2YXIgb3B0cyA9IHRoaXMuX29wdHM7XG4gICAgdmFyIGhzdiA9IGNvbG9yLmhzdjtcbiAgICAvLyBJZiB0aGUgViBjaGFubmVsIGhhcyBjaGFuZ2VkLCByZWRyYXcgdGhlIHdoZWVsIFVJIHdpdGggdGhlIG5ldyB2YWx1ZVxuICAgIGlmIChjaGFuZ2VzLnYgJiYgb3B0cy5saWdodG5lc3MpIHtcbiAgICAgIHRoaXMuX2xpZ2h0bmVzcy5zZXRBdHRycyh7IG9wYWNpdHk6ICgxIC0gaHN2LnYgLyAxMDApLnRvRml4ZWQoMikgfSk7XG4gICAgfVxuICAgIC8vIElmIHRoZSBIIG9yIFMgY2hhbm5lbCBoYXMgY2hhbmdlZCwgbW92ZSB0aGUgbWFya2VyIHRvIHRoZSByaWdodCBwb3NpdGlvblxuICAgIGlmIChjaGFuZ2VzLmggfHwgY2hhbmdlcy5zKSB7XG4gICAgICAvLyBjb252ZXJ0IHRoZSBodWUgdmFsdWUgdG8gcmFkaWFucywgc2luY2Ugd2UnbGwgdXNlIGl0IGFzIGFuIGFuZ2xlXG4gICAgICB2YXIgaHVlQW5nbGUgPSAob3B0cy5hbnRpY2xvY2t3aXNlID8gMzYwIC0gaHN2LmggOiBoc3YuaCkgKiAoUEkgLyAxODApO1xuICAgICAgLy8gY29udmVydCB0aGUgc2F0dXJhdGlvbiB2YWx1ZSB0byBhIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgcmluZyBhbmQgdGhlIGVkZ2VcbiAgICAgIHZhciBkaXN0ID0gaHN2LnMgLyAxMDAgKiBvcHRzLnJNYXg7XG4gICAgICAvLyBNb3ZlIHRoZSBtYXJrZXIgYmFzZWQgb24gdGhlIGFuZ2xlIGFuZCBkaXN0YW5jZVxuICAgICAgdGhpcy5tYXJrZXIubW92ZShvcHRzLmNYICsgZGlzdCAqIE1hdGguY29zKGh1ZUFuZ2xlKSwgb3B0cy5jWSArIGRpc3QgKiBNYXRoLnNpbihodWVBbmdsZSkpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICAqIEBkZXNjIFRha2VzIGEgcG9pbnQgYXQgKHgsIHkpIGFuZCByZXR1cm5zIEhTViB2YWx1ZXMgYmFzZWQgb24gdGhpcyBpbnB1dCAtLSB1c2UgdGhpcyB0byB1cGRhdGUgYSBjb2xvciBmcm9tIG1vdXNlIGlucHV0XG4gICAgKiBAcGFyYW0ge051bWJlcn0geCAtIHBvaW50IHggY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHkgLSBwb2ludCB5IGNvb3JkaW5hdGVcbiAgICAqIEByZXR1cm4ge09iamVjdH0gLSBuZXcgSFNWIGNvbG9yIHZhbHVlcyAoc29tZSBjaGFubmVscyBtYXkgYmUgbWlzc2luZylcbiAgKi9cbiAgaW5wdXQ6IGZ1bmN0aW9uIGlucHV0KHgsIHkpIHtcbiAgICB2YXIgb3B0cyA9IHRoaXMuX29wdHMsXG4gICAgICAgIHJhbmdlTWF4ID0gb3B0cy5yTWF4LFxuICAgICAgICBfeCA9IG9wdHMuY1ggLSB4LFxuICAgICAgICBfeSA9IG9wdHMuY1kgLSB5O1xuXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihfeSwgX3gpLFxuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBodWUgYnkgY29udmVydGluZyB0aGUgYW5nbGUgdG8gcmFkaWFuc1xuICAgIGh1ZSA9IHJvdW5kKGFuZ2xlICogKDE4MCAvIFBJKSkgKyAxODAsXG5cbiAgICAvLyBGaW5kIHRoZSBwb2ludCdzIGRpc3RhbmNlIGZyb20gdGhlIGNlbnRlciBvZiB0aGUgd2hlZWxcbiAgICAvLyBUaGlzIGlzIHVzZWQgdG8gc2hvdyB0aGUgc2F0dXJhdGlvbiBsZXZlbFxuICAgIGRpc3QgPSBNYXRoLm1pbihzcXJ0KF94ICogX3ggKyBfeSAqIF95KSwgcmFuZ2VNYXgpO1xuXG4gICAgaHVlID0gb3B0cy5hbnRpY2xvY2t3aXNlID8gMzYwIC0gaHVlIDogaHVlO1xuXG4gICAgLy8gUmV0dXJuIGp1c3QgdGhlIEggYW5kIFMgY2hhbm5lbHMsIHRoZSB3aGVlbCBlbGVtZW50IGRvZXNuJ3QgZG8gYW55dGhpbmcgd2l0aCB0aGUgTCBjaGFubmVsXG4gICAgcmV0dXJuIHtcbiAgICAgIGg6IGh1ZSxcbiAgICAgIHM6IHJvdW5kKDEwMCAvIHJhbmdlTWF4ICogZGlzdClcbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2MgQ2hlY2sgaWYgYSBwb2ludCBhdCAoeCwgeSkgaXMgaW5zaWRlIHRoaXMgZWxlbWVudFxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHggLSBwb2ludCB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gcG9pbnQgeSBjb29yZGluYXRlXG4gICAgKiBAcmV0dXJuIHtCb29sZWFufSAtIHRydWUgaWYgdGhlIHBvaW50IGlzIGEgXCJoaXRcIiwgZWxzZSBmYWxzZVxuICAqL1xuICBjaGVja0hpdDogZnVuY3Rpb24gY2hlY2tIaXQoeCwgeSkge1xuICAgIHZhciBvcHRzID0gdGhpcy5fb3B0cztcblxuICAgIC8vIENoZWNrIGlmIHRoZSBwb2ludCBpcyB3aXRoaW4gdGhlIGh1ZSByaW5nIGJ5IGNvbXBhcmluZyB0aGUgcG9pbnQncyBkaXN0YW5jZSBmcm9tIHRoZSBjZW50cmUgdG8gdGhlIHJpbmcncyByYWRpdXNcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgc21hbGxlciB0aGFuIHRoZSByYWRpdXMsIHRoZW4gd2UgaGF2ZSBhIGhpdFxuICAgIHZhciBkeCA9IGFicyh4IC0gb3B0cy5jWCksXG4gICAgICAgIGR5ID0gYWJzKHkgLSBvcHRzLmNZKTtcbiAgICByZXR1cm4gc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgPCBvcHRzLnI7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gd2hlZWw7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXJvLmpzLm1hcCJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWNtOTNjMlZ5TFhCaFkyc3ZYM0J5Wld4MVpHVXVhbk1pTENKamIyeHZjbk11YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12YVhKdkxtcHpMMlJwYzNRdmFYSnZMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk96czdRVU5CUVN4SlFVRkpMRTFCUVUwc1VVRkJVU3hSUVVGU0xFTkJRVlk3UVVGRFFTeEpRVUZKTERaQ1FVRktPMEZCUTBFc1NVRkJTU3hyUWtGQmEwSXNTMEZCZEVJN08wRkJSVUVzU1VGQlNTeHJRa0ZCYTBJc1UwRkJVeXhqUVVGVUxFTkJRWGRDTEhkQ1FVRjRRaXhEUVVGMFFqdEJRVU5CTEVsQlFVa3NZMEZCWXl4SlFVRkpMRWxCUVVrc1YwRkJVaXhEUVVGdlFpeGxRVUZ3UWl4RlFVRnhRenRCUVVOeVJDeFRRVUZQTEVkQlJEaERPMEZCUlhKRUxGVkJRVkVzUjBGR05rTTdRVUZIY2tRc1UwRkJUenRCUVVnNFF5eERRVUZ5UXl4RFFVRnNRanM3UVVGTlFTeFpRVUZaTEVWQlFWb3NRMEZCWlN4alFVRm1MRVZCUVN0Q0xGVkJRVk1zUzBGQlZDeEZRVUZuUWl4UFFVRm9RaXhGUVVGNVFqdEJRVU4wUkN4VFFVRlBMRWxCUVZBc1EwRkJXU3hqUVVGYUxFVkJRVFJDTEUxQlFVMHNVMEZCYkVNN1FVRkRRU3hYUVVGVExFbEJRVlFzUTBGQll5eExRVUZrTEVOQlFXOUNMR1ZCUVhCQ0xFZEJRWE5ETEUxQlFVMHNVMEZCTlVNN1FVRkRSQ3hEUVVoRU96dEJRVXRCTEZOQlFWTXNVMEZCVkN4RFFVRnRRaXhGUVVGdVFpeEZRVUYxUWl4TFFVRjJRaXhGUVVFMlFqdEJRVU16UWl4WFFVRlRMR05CUVZRc1EwRkJkMElzUlVGQmVFSXNSVUZCTkVJc1MwRkJOVUlzUTBGQmEwTXNaVUZCYkVNc1IwRkJiMFFzVFVGQlRTeExRVUV4UkR0QlFVTkVPenRCUVVWRUxGTkJRVk1zVlVGQlZDeERRVUZ2UWl4RlFVRndRaXhGUVVGM1FpeExRVUY0UWl4RlFVRTRRanRCUVVNMVFpeFhRVUZUTEdOQlFWUXNRMEZCZDBJc1JVRkJlRUlzUlVGQk5FSXNTMEZCTlVJc1EwRkJhME1zUzBGQmJFTXNSMEZCTUVNc1RVRkJUU3hMUVVGb1JEdEJRVU5FT3pzN1FVTjBRa1E3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUtHWjFibU4wYVc5dUlHVW9kQ3h1TEhJcGUyWjFibU4wYVc5dUlITW9ieXgxS1h0cFppZ2hibHR2WFNsN2FXWW9JWFJiYjEwcGUzWmhjaUJoUFhSNWNHVnZaaUJ5WlhGMWFYSmxQVDFjSW1aMWJtTjBhVzl1WENJbUpuSmxjWFZwY21VN2FXWW9JWFVtSm1FcGNtVjBkWEp1SUdFb2J5d2hNQ2s3YVdZb2FTbHlaWFIxY200Z2FTaHZMQ0V3S1R0MllYSWdaajF1WlhjZ1JYSnliM0lvWENKRFlXNXViM1FnWm1sdVpDQnRiMlIxYkdVZ0oxd2lLMjhyWENJblhDSXBPM1JvY205M0lHWXVZMjlrWlQxY0lrMVBSRlZNUlY5T1QxUmZSazlWVGtSY0lpeG1mWFpoY2lCc1BXNWJiMTA5ZTJWNGNHOXlkSE02ZTMxOU8zUmJiMTFiTUYwdVkyRnNiQ2hzTG1WNGNHOXlkSE1zWm5WdVkzUnBiMjRvWlNsN2RtRnlJRzQ5ZEZ0dlhWc3hYVnRsWFR0eVpYUjFjbTRnY3lodVAyNDZaU2w5TEd3c2JDNWxlSEJ2Y25SekxHVXNkQ3h1TEhJcGZYSmxkSFZ5YmlCdVcyOWRMbVY0Y0c5eWRITjlkbUZ5SUdrOWRIbHdaVzltSUhKbGNYVnBjbVU5UFZ3aVpuVnVZM1JwYjI1Y0lpWW1jbVZ4ZFdseVpUdG1iM0lvZG1GeUlHODlNRHR2UEhJdWJHVnVaM1JvTzI4ckt5bHpLSEpiYjEwcE8zSmxkSFZ5YmlCemZTa2lMQ0pzWlhRZ2FYSnZJRDBnY21WeGRXbHlaU2hjSW1seWJ5NXFjMXdpS1R0Y2JteGxkQ0JqYjJ4dmNrTm9aV05yWlhKSmJuUmxjblpoYkR0Y2JuWmhjaUJqYjJ4dmNrbHpRMmhoYm1kcGJtY2dQU0JtWVd4elpUdGNibHh1YkdWMElHTnZiRzl5VUdsamEyVnlSV3hsYlNBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0Z3aVkyOXNiM0l0Y0dsamEyVnlMV052Ym5SaGFXNWxjbHdpS1Z4dWJHVjBJR052Ykc5eVVHbGphMlZ5SUQwZ2JtVjNJR2x5Ynk1RGIyeHZjbEJwWTJ0bGNpaGpiMnh2Y2xCcFkydGxja1ZzWlcwc0lIdGNiaUFnZDJsa2RHZzZJRE15TUN4Y2JpQWdhR1ZwWjJoME9pQXpNakFzWEc0Z0lHTnZiRzl5T2lCY0lpTkVRMFF3UmpOY0lseHVmU2s3WEc1Y2JtTnZiRzl5VUdsamEyVnlMbTl1S0Z3aVkyOXNiM0k2WTJoaGJtZGxYQ0lzSUdaMWJtTjBhVzl1S0dOdmJHOXlMQ0JqYUdGdVoyVnpLU0I3WEc0Z0lITnZZMnRsZEM1bGJXbDBLQ2RqYjJ4dmNpQmphR0Z1WjJVbkxDQmpiMnh2Y2k1b1pYaFRkSEpwYm1jcE8xeHVJQ0JrYjJOMWJXVnVkQzVpYjJSNUxuTjBlV3hsTG1KaFkydG5jbTkxYm1SRGIyeHZjaUE5SUdOdmJHOXlMbWhsZUZOMGNtbHVaMXh1ZlNrN1hHNWNibVoxYm1OMGFXOXVJSE5sZEVKblZHOUpaQ2hwWkN3Z1kyOXNiM0lwZTF4dUlDQmtiMk4xYldWdWRDNW5aWFJGYkdWdFpXNTBRbmxKWkNocFpDa3VjM1I1YkdVdVltRmphMmR5YjNWdVpFTnZiRzl5SUQwZ1hDSWpYQ0lnS3lCamIyeHZjbHh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnpaWFJVZUhSVWIwbGtLR2xrTENCamIyeHZjaWw3WEc0Z0lHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0dsa0tTNXpkSGxzWlM1amIyeHZjaUE5SUZ3aUkxd2lJQ3NnWTI5c2IzSmNibjFjYmlJc0lpOHFJVnh1SUNvZ2FYSnZMbXB6SUhZekxqSXVNRnh1SUNvZ01qQXhOaTB5TURFM0lFcGhiV1Z6SUVSaGJtbGxiRnh1SUNvZ1VtVnNaV0Z6WldRZ2RXNWtaWElnZEdobElFMUpWQ0JzYVdObGJuTmxYRzRnS2lCbmFYUm9kV0l1WTI5dEwycGhZVzFsY3k5cGNtOHVhbk5jYmlBcUwxeHVLR1oxYm1OMGFXOXVJSGRsWW5CaFkydFZibWwyWlhKellXeE5iMlIxYkdWRVpXWnBibWwwYVc5dUtISnZiM1FzSUdaaFkzUnZjbmtwSUh0Y2JseDBhV1lvZEhsd1pXOW1JR1Y0Y0c5eWRITWdQVDA5SUNkdlltcGxZM1FuSUNZbUlIUjVjR1Z2WmlCdGIyUjFiR1VnUFQwOUlDZHZZbXBsWTNRbktWeHVYSFJjZEcxdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm1GamRHOXllU2dwTzF4dVhIUmxiSE5sSUdsbUtIUjVjR1Z2WmlCa1pXWnBibVVnUFQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnWkdWbWFXNWxMbUZ0WkNsY2JseDBYSFJrWldacGJtVW9XMTBzSUdaaFkzUnZjbmtwTzF4dVhIUmxiSE5sSUdsbUtIUjVjR1Z2WmlCbGVIQnZjblJ6SUQwOVBTQW5iMkpxWldOMEp5bGNibHgwWEhSbGVIQnZjblJ6VzF3aWFYSnZYQ0pkSUQwZ1ptRmpkRzl5ZVNncE8xeHVYSFJsYkhObFhHNWNkRngwY205dmRGdGNJbWx5YjF3aVhTQTlJR1poWTNSdmNua29LVHRjYm4wcEtIUm9hWE1zSUdaMWJtTjBhVzl1S0NrZ2UxeHVjbVYwZFhKdUlDOHFLaW9xS2lvdklDaG1kVzVqZEdsdmJpaHRiMlIxYkdWektTQjdJQzh2SUhkbFluQmhZMnRDYjI5MGMzUnlZWEJjYmk4cUtpb3FLaW92SUZ4MEx5OGdWR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVMeW9xS2lvcUtpOGdYSFIyWVhJZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3lBOUlIdDlPMXh1THlvcUtpb3FLaTljYmk4cUtpb3FLaW92SUZ4MEx5OGdWR2hsSUhKbGNYVnBjbVVnWm5WdVkzUnBiMjVjYmk4cUtpb3FLaW92SUZ4MFpuVnVZM1JwYjI0Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aHRiMlIxYkdWSlpDa2dlMXh1THlvcUtpb3FLaTljYmk4cUtpb3FLaW92SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmk4cUtpb3FLaW92SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2tnZTF4dUx5b3FLaW9xS2k4Z1hIUmNkRngwY21WMGRYSnVJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbVY0Y0c5eWRITTdYRzR2S2lvcUtpb3FMeUJjZEZ4MGZWeHVMeW9xS2lvcUtpOGdYSFJjZEM4dklFTnlaV0YwWlNCaElHNWxkeUJ0YjJSMWJHVWdLR0Z1WkNCd2RYUWdhWFFnYVc1MGJ5QjBhR1VnWTJGamFHVXBYRzR2S2lvcUtpb3FMeUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUx5b3FLaW9xS2k4Z1hIUmNkRngwYVRvZ2JXOWtkV3hsU1dRc1hHNHZLaW9xS2lvcUx5QmNkRngwWEhSc09pQm1ZV3h6WlN4Y2JpOHFLaW9xS2lvdklGeDBYSFJjZEdWNGNHOXlkSE02SUh0OVhHNHZLaW9xS2lvcUx5QmNkRngwZlR0Y2JpOHFLaW9xS2lvdlhHNHZLaW9xS2lvcUx5QmNkRngwTHk4Z1JYaGxZM1YwWlNCMGFHVWdiVzlrZFd4bElHWjFibU4wYVc5dVhHNHZLaW9xS2lvcUx5QmNkRngwYlc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1WTJGc2JDaHRiMlIxYkdVdVpYaHdiM0owY3l3Z2JXOWtkV3hsTENCdGIyUjFiR1V1Wlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrN1hHNHZLaW9xS2lvcUwxeHVMeW9xS2lvcUtpOGdYSFJjZEM4dklFWnNZV2NnZEdobElHMXZaSFZzWlNCaGN5QnNiMkZrWldSY2JpOHFLaW9xS2lvdklGeDBYSFJ0YjJSMWJHVXViQ0E5SUhSeWRXVTdYRzR2S2lvcUtpb3FMMXh1THlvcUtpb3FLaThnWEhSY2RDOHZJRkpsZEhWeWJpQjBhR1VnWlhod2IzSjBjeUJ2WmlCMGFHVWdiVzlrZFd4bFhHNHZLaW9xS2lvcUx5QmNkRngwY21WMGRYSnVJRzF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVMeW9xS2lvcUtpOGdYSFI5WEc0dktpb3FLaW9xTDF4dUx5b3FLaW9xS2k5Y2JpOHFLaW9xS2lvdklGeDBMeThnWlhod2IzTmxJSFJvWlNCdGIyUjFiR1Z6SUc5aWFtVmpkQ0FvWDE5M1pXSndZV05yWDIxdlpIVnNaWE5mWHlsY2JpOHFLaW9xS2lvdklGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV0SUQwZ2JXOWtkV3hsY3p0Y2JpOHFLaW9xS2lvdlhHNHZLaW9xS2lvcUx5QmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzR2S2lvcUtpb3FMeUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVl5QTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTTdYRzR2S2lvcUtpb3FMMXh1THlvcUtpb3FLaThnWEhRdkx5QnBaR1Z1ZEdsMGVTQm1kVzVqZEdsdmJpQm1iM0lnWTJGc2JHbHVaeUJvWVhKdGIyNTVJR2x0Y0c5eWRITWdkMmwwYUNCMGFHVWdZMjl5Y21WamRDQmpiMjUwWlhoMFhHNHZLaW9xS2lvcUx5QmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YVNBOUlHWjFibU4wYVc5dUtIWmhiSFZsS1NCN0lISmxkSFZ5YmlCMllXeDFaVHNnZlR0Y2JpOHFLaW9xS2lvdlhHNHZLaW9xS2lvcUx5QmNkQzh2SUdSbFptbHVaU0JuWlhSMFpYSWdablZ1WTNScGIyNGdabTl5SUdoaGNtMXZibmtnWlhod2IzSjBjMXh1THlvcUtpb3FLaThnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUWdQU0JtZFc1amRHbHZiaWhsZUhCdmNuUnpMQ0J1WVcxbExDQm5aWFIwWlhJcElIdGNiaThxS2lvcUtpb3ZJRngwWEhScFppZ2hYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV2S0dWNGNHOXlkSE1zSUc1aGJXVXBLU0I3WEc0dktpb3FLaW9xTHlCY2RGeDBYSFJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z2JtRnRaU3dnZTF4dUx5b3FLaW9xS2k4Z1hIUmNkRngwWEhSamIyNW1hV2QxY21GaWJHVTZJR1poYkhObExGeHVMeW9xS2lvcUtpOGdYSFJjZEZ4MFhIUmxiblZ0WlhKaFlteGxPaUIwY25WbExGeHVMeW9xS2lvcUtpOGdYSFJjZEZ4MFhIUm5aWFE2SUdkbGRIUmxjbHh1THlvcUtpb3FLaThnWEhSY2RGeDBmU2s3WEc0dktpb3FLaW9xTHlCY2RGeDBmVnh1THlvcUtpb3FLaThnWEhSOU8xeHVMeW9xS2lvcUtpOWNiaThxS2lvcUtpb3ZJRngwTHk4Z1oyVjBSR1ZtWVhWc2RFVjRjRzl5ZENCbWRXNWpkR2x2YmlCbWIzSWdZMjl0Y0dGMGFXSnBiR2wwZVNCM2FYUm9JRzV2Ymkxb1lYSnRiMjU1SUcxdlpIVnNaWE5jYmk4cUtpb3FLaW92SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXVJRDBnWm5WdVkzUnBiMjRvYlc5a2RXeGxLU0I3WEc0dktpb3FLaW9xTHlCY2RGeDBkbUZ5SUdkbGRIUmxjaUE5SUcxdlpIVnNaU0FtSmlCdGIyUjFiR1V1WDE5bGMwMXZaSFZzWlNBL1hHNHZLaW9xS2lvcUx5QmNkRngwWEhSbWRXNWpkR2x2YmlCblpYUkVaV1poZFd4MEtDa2dleUJ5WlhSMWNtNGdiVzlrZFd4bFd5ZGtaV1poZFd4MEoxMDdJSDBnT2x4dUx5b3FLaW9xS2k4Z1hIUmNkRngwWm5WdVkzUnBiMjRnWjJWMFRXOWtkV3hsUlhod2IzSjBjeWdwSUhzZ2NtVjBkWEp1SUcxdlpIVnNaVHNnZlR0Y2JpOHFLaW9xS2lvdklGeDBYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1Rb1oyVjBkR1Z5TENBbllTY3NJR2RsZEhSbGNpazdYRzR2S2lvcUtpb3FMeUJjZEZ4MGNtVjBkWEp1SUdkbGRIUmxjanRjYmk4cUtpb3FLaW92SUZ4MGZUdGNiaThxS2lvcUtpb3ZYRzR2S2lvcUtpb3FMeUJjZEM4dklFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JGeHVMeW9xS2lvcUtpOGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG04Z1BTQm1kVzVqZEdsdmJpaHZZbXBsWTNRc0lIQnliM0JsY25SNUtTQjdJSEpsZEhWeWJpQlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29iMkpxWldOMExDQndjbTl3WlhKMGVTazdJSDA3WEc0dktpb3FLaW9xTDF4dUx5b3FLaW9xS2k4Z1hIUXZMeUJmWDNkbFluQmhZMnRmY0hWaWJHbGpYM0JoZEdoZlgxeHVMeW9xS2lvcUtpOGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5BZ1BTQmNJbHdpTzF4dUx5b3FLaW9xS2k5Y2JpOHFLaW9xS2lvdklGeDBMeThnVEc5aFpDQmxiblJ5ZVNCdGIyUjFiR1VnWVc1a0lISmxkSFZ5YmlCbGVIQnZjblJ6WEc0dktpb3FLaW9xTHlCY2RISmxkSFZ5YmlCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjeUE5SURRcE8xeHVMeW9xS2lvcUtpOGdmU2xjYmk4cUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvdlhHNHZLaW9xS2lvcUx5QW9XMXh1THlvZ01DQXFMMXh1THlvcUtpOGdLR1oxYm1OMGFXOXVLRzF2WkhWc1pTd2daWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWtnZTF4dVhHNWNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVYRzUyWVhJZ1gzUjVjR1Z2WmlBOUlIUjVjR1Z2WmlCVGVXMWliMndnUFQwOUlGd2lablZ1WTNScGIyNWNJaUFtSmlCMGVYQmxiMllnVTNsdFltOXNMbWwwWlhKaGRHOXlJRDA5UFNCY0luTjViV0p2YkZ3aUlEOGdablZ1WTNScGIyNGdLRzlpYWlrZ2V5QnlaWFIxY200Z2RIbHdaVzltSUc5aWFqc2dmU0E2SUdaMWJtTjBhVzl1SUNodlltb3BJSHNnY21WMGRYSnVJRzlpYWlBbUppQjBlWEJsYjJZZ1UzbHRZbTlzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lnSmlZZ2IySnFMbU52Ym5OMGNuVmpkRzl5SUQwOVBTQlRlVzFpYjJ3Z0ppWWdiMkpxSUNFOVBTQlRlVzFpYjJ3dWNISnZkRzkwZVhCbElEOGdYQ0p6ZVcxaWIyeGNJaUE2SUhSNWNHVnZaaUJ2WW1vN0lIMDdYRzVjYm5aaGNpQnliM1Z1WkNBOUlFMWhkR2d1Y205MWJtUXNYRzRnSUNBZ1pteHZiM0lnUFNCTllYUm9MbVpzYjI5eU8xeHVYRzR2THlCVVQwUlBPaUJqYjIxd1lYSmxLSEpuWWl3Z2FITjJMQ0JvYzJ3cElDc2dZMnh2Ym1VZ2JXVjBhRzlrYzF4dVhHNHZLaXBjYmlBZ0tpQkFaR1Z6WXlCamIyNTJaWEowSUdoemRpQnZZbXBsWTNRZ2RHOGdjbWRpWEc0Z0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHaHpkaUF0SUdoemRpQnZZbXBsWTNSY2JpQWdLaUJBY21WMGRYSnVJSHRQWW1wbFkzUjlJSEpuWWlCdlltcGxZM1JjYmlvdlhHNW1kVzVqZEdsdmJpQm9jM1l5VW1kaUtHaHpkaWtnZTF4dUlDQjJZWElnY2l3Z1p5d2dZaXdnYVN3Z1ppd2djQ3dnY1N3Z2REdGNiaUFnZG1GeUlHZ2dQU0JvYzNZdWFDQXZJRE0yTUN4Y2JpQWdJQ0FnSUhNZ1BTQm9jM1l1Y3lBdklERXdNQ3hjYmlBZ0lDQWdJSFlnUFNCb2MzWXVkaUF2SURFd01EdGNiaUFnYVNBOUlHWnNiMjl5S0dnZ0tpQTJLVHRjYmlBZ1ppQTlJR2dnS2lBMklDMGdhVHRjYmlBZ2NDQTlJSFlnS2lBb01TQXRJSE1wTzF4dUlDQnhJRDBnZGlBcUlDZ3hJQzBnWmlBcUlITXBPMXh1SUNCMElEMGdkaUFxSUNneElDMGdLREVnTFNCbUtTQXFJSE1wTzF4dUlDQnpkMmwwWTJnZ0tHa2dKU0EyS1NCN1hHNGdJQ0FnWTJGelpTQXdPbHh1SUNBZ0lDQWdjaUE5SUhZc0lHY2dQU0IwTENCaUlEMGdjRHRpY21WaGF6dGNiaUFnSUNCallYTmxJREU2WEc0Z0lDQWdJQ0J5SUQwZ2NTd2daeUE5SUhZc0lHSWdQU0J3TzJKeVpXRnJPMXh1SUNBZ0lHTmhjMlVnTWpwY2JpQWdJQ0FnSUhJZ1BTQndMQ0JuSUQwZ2Rpd2dZaUE5SUhRN1luSmxZV3M3WEc0Z0lDQWdZMkZ6WlNBek9seHVJQ0FnSUNBZ2NpQTlJSEFzSUdjZ1BTQnhMQ0JpSUQwZ2RqdGljbVZoYXp0Y2JpQWdJQ0JqWVhObElEUTZYRzRnSUNBZ0lDQnlJRDBnZEN3Z1p5QTlJSEFzSUdJZ1BTQjJPMkp5WldGck8xeHVJQ0FnSUdOaGMyVWdOVHBjYmlBZ0lDQWdJSElnUFNCMkxDQm5JRDBnY0N3Z1lpQTlJSEU3WW5KbFlXczdYRzRnSUgxY2JpQWdjbVYwZFhKdUlIc2djam9nY205MWJtUW9jaUFxSURJMU5Ta3NJR2M2SUhKdmRXNWtLR2NnS2lBeU5UVXBMQ0JpT2lCeWIzVnVaQ2hpSUNvZ01qVTFLU0I5TzF4dWZUdGNibHh1THlvcVhHNGdJQ29nUUdSbGMyTWdZMjl1ZG1WeWRDQnlaMklnYjJKcVpXTjBJSFJ2SUdoemRseHVJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J5WjJJZ0xTQnlaMklnYjJKcVpXTjBYRzRnSUNvZ1FISmxkSFZ5YmlCN1QySnFaV04wZlNCb2MzWWdiMkpxWldOMFhHNHFMMXh1Wm5WdVkzUnBiMjRnY21kaU1raHpkaWh5WjJJcElIdGNiaUFnTHk4Z1RXOWthV1pwWldRZ1puSnZiU0JvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2WW1keWFXNXpMMVJwYm5sRGIyeHZjaTlpYkc5aUwyMWhjM1JsY2k5MGFXNTVZMjlzYjNJdWFuTWpURFEwTmx4dUlDQjJZWElnY2lBOUlISm5ZaTV5SUM4Z01qVTFMRnh1SUNBZ0lDQWdaeUE5SUhKbllpNW5JQzhnTWpVMUxGeHVJQ0FnSUNBZ1lpQTlJSEpuWWk1aUlDOGdNalUxTEZ4dUlDQWdJQ0FnYldGNElEMGdUV0YwYUM1dFlYZ29jaXdnWnl3Z1lpa3NYRzRnSUNBZ0lDQnRhVzRnUFNCTllYUm9MbTFwYmloeUxDQm5MQ0JpS1N4Y2JpQWdJQ0FnSUdSbGJIUmhJRDBnYldGNElDMGdiV2x1TEZ4dUlDQWdJQ0FnYUhWbE8xeHVJQ0J6ZDJsMFkyZ2dLRzFoZUNrZ2UxeHVJQ0FnSUdOaGMyVWdiV2x1T2x4dUlDQWdJQ0FnYUhWbElEMGdNRHRpY21WaGF6dGNiaUFnSUNCallYTmxJSEk2WEc0Z0lDQWdJQ0JvZFdVZ1BTQW9aeUF0SUdJcElDOGdaR1ZzZEdFZ0t5QW9aeUE4SUdJZ1B5QTJJRG9nTUNrN1luSmxZV3M3WEc0Z0lDQWdZMkZ6WlNCbk9seHVJQ0FnSUNBZ2FIVmxJRDBnS0dJZ0xTQnlLU0F2SUdSbGJIUmhJQ3NnTWp0aWNtVmhhenRjYmlBZ0lDQmpZWE5sSUdJNlhHNGdJQ0FnSUNCb2RXVWdQU0FvY2lBdElHY3BJQzhnWkdWc2RHRWdLeUEwTzJKeVpXRnJPMXh1SUNCOVhHNGdJR2gxWlNBdlBTQTJPMXh1SUNCeVpYUjFjbTRnZTF4dUlDQWdJR2c2SUhKdmRXNWtLR2gxWlNBcUlETTJNQ2tzWEc0Z0lDQWdjem9nY205MWJtUW9iV0Y0SUQwOUlEQWdQeUF3SURvZ1pHVnNkR0VnTHlCdFlYZ2dLaUF4TURBcExGeHVJQ0FnSUhZNklISnZkVzVrS0cxaGVDQXFJREV3TUNsY2JpQWdmVHRjYm4wN1hHNWNiaThxS2x4dUlDQXFJRUJrWlhOaklHTnZiblpsY25RZ2FITjJJRzlpYW1WamRDQjBieUJvYzJ4Y2JpQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdhSE4ySUMwZ2FITjJJRzlpYW1WamRGeHVJQ0FxSUVCeVpYUjFjbTRnZTA5aWFtVmpkSDBnYUhOc0lHOWlhbVZqZEZ4dUtpOWNibVoxYm1OMGFXOXVJR2h6ZGpKSWMyd29hSE4yS1NCN1hHNGdJSFpoY2lCeklEMGdhSE4yTG5NZ0x5QXhNREFzWEc0Z0lDQWdJQ0IySUQwZ2FITjJMbllnTHlBeE1EQTdYRzRnSUhaaGNpQnNJRDBnTUM0MUlDb2dkaUFxSUNneUlDMGdjeWs3WEc0Z0lITWdQU0IySUNvZ2N5QXZJQ2d4SUMwZ1RXRjBhQzVoWW5Nb01pQXFJR3dnTFNBeEtTazdYRzRnSUhKbGRIVnliaUI3WEc0Z0lDQWdhRG9nYUhOMkxtZ3NYRzRnSUNBZ2N6b2djbTkxYm1Rb2N5QXFJREV3TUNrZ2ZId2dNQ3hjYmlBZ0lDQnNPaUJ5YjNWdVpDaHNJQ29nTVRBd0tWeHVJQ0I5TzF4dWZUdGNibHh1THlvcVhHNGdJQ29nUUdSbGMyTWdZMjl1ZG1WeWRDQm9jMndnYjJKcVpXTjBJSFJ2SUdoemRseHVJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JvYzJ3Z0xTQm9jMndnYjJKcVpXTjBYRzRnSUNvZ1FISmxkSFZ5YmlCN1QySnFaV04wZlNCb2MzWWdiMkpxWldOMFhHNHFMMXh1Wm5WdVkzUnBiMjRnYUhOc01raHpkaWhvYzJ3cElIdGNiaUFnZG1GeUlITWdQU0JvYzJ3dWN5QXZJREV3TUN4Y2JpQWdJQ0FnSUd3Z1BTQm9jMnd1YkNBdklERXdNRHRjYmlBZ2JDQXFQU0F5TzF4dUlDQnpJQ285SUd3Z1BEMGdNU0EvSUd3Z09pQXlJQzBnYkR0Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCb09pQm9jMnd1YUN4Y2JpQWdJQ0J6T2lCeWIzVnVaQ2d5SUNvZ2N5QXZJQ2hzSUNzZ2N5a2dLaUF4TURBcExGeHVJQ0FnSUhZNklISnZkVzVrS0Noc0lDc2djeWtnTHlBeUlDb2dNVEF3S1Z4dUlDQjlPMXh1ZlR0Y2JseHVMeW9xWEc0Z0lDb2dRR1JsYzJNZ1kyOXVkbVZ5ZENCeVoySWdiMkpxWldOMElIUnZJSE4wY21sdVoxeHVJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J5WjJJZ0xTQnlaMklnYjJKcVpXTjBYRzRnSUNvZ1FISmxkSFZ5YmlCN1QySnFaV04wZlNCeVoySWdjM1J5YVc1blhHNHFMMXh1Wm5WdVkzUnBiMjRnY21kaU1sTjBjaWh5WjJJcElIdGNiaUFnY21WMGRYSnVJRndpY21kaVhDSWdLeUFvY21kaUxtRWdQeUJjSW1GY0lpQTZJRndpWENJcElDc2dYQ0lvWENJZ0t5QnlaMkl1Y2lBcklGd2lMQ0JjSWlBcklISm5ZaTVuSUNzZ1hDSXNJRndpSUNzZ2NtZGlMbUlnS3lBb2NtZGlMbUVnUHlCY0lpd2dYQ0lnS3lCeVoySXVZU0E2SUZ3aVhDSXBJQ3NnWENJcFhDSTdYRzU5TzF4dVhHNHZLaXBjYmlBZ0tpQkFaR1Z6WXlCamIyNTJaWEowSUdoemJDQnZZbXBsWTNRZ2RHOGdjM1J5YVc1blhHNGdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR2h6YkNBdElHaHpiQ0J2WW1wbFkzUmNiaUFnS2lCQWNtVjBkWEp1SUh0UFltcGxZM1I5SUdoemJDQnpkSEpwYm1kY2Jpb3ZYRzVtZFc1amRHbHZiaUJvYzJ3eVUzUnlLR2h6YkNrZ2UxeHVJQ0J5WlhSMWNtNGdYQ0pvYzJ4Y0lpQXJJQ2hvYzJ3dVlTQS9JRndpWVZ3aUlEb2dYQ0pjSWlrZ0t5QmNJaWhjSWlBcklHaHpiQzVvSUNzZ1hDSXNJRndpSUNzZ2FITnNMbk1nS3lCY0lpVXNJRndpSUNzZ2FITnNMbXdnS3lCY0lpVmNJaUFySUNob2Myd3VZU0EvSUZ3aUxDQmNJaUFySUdoemJDNWhJRG9nWENKY0lpa2dLeUJjSWlsY0lqdGNibjA3WEc1Y2JpOHFLbHh1SUNBcUlFQmtaWE5qSUdOdmJuWmxjblFnY21kaUlHOWlhbVZqZENCMGJ5Qm9aWGdnYzNSeWFXNW5YRzRnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhKbllpQXRJSEpuWWlCdlltcGxZM1JjYmlBZ0tpQkFjbVYwZFhKdUlIdFBZbXBsWTNSOUlHaGxlQ0J6ZEhKcGJtZGNiaW92WEc1bWRXNWpkR2x2YmlCeVoySXlTR1Y0S0hKbllpa2dlMXh1SUNCMllYSWdjaUE5SUhKbllpNXlMRnh1SUNBZ0lDQWdaeUE5SUhKbllpNW5MRnh1SUNBZ0lDQWdZaUE5SUhKbllpNWlPMXh1SUNBdkx5QkpaaUJsWVdOb0lGSkhRaUJqYUdGdWJtVnNKM01nZG1Gc2RXVWdhWE1nWVNCdGRXeDBhWEJzWlNCdlppQXhOeXdnZDJVZ1kyRnVJSFZ6WlNCSVJWZ2djMmh2Y25Sb1lXNWtJRzV2ZEdGMGFXOXVYRzRnSUhaaGNpQjFjMlZUYUc5eWRHaGhibVFnUFNCeUlDVWdNVGNnUFQwZ01DQW1KaUJuSUNVZ01UY2dQVDBnTUNBbUppQmlJQ1VnTVRjZ1BUMGdNQ3hjYmx4dUlDQXZMeUJKWmlCM1pTZHlaU0IxYzJsdVp5QnphRzl5ZEdoaGJtUWdibTkwWVhScGIyNHNJR1JwZG1sa1pTQmxZV05vSUdOb1lXNXVaV3dnWW5rZ01UZGNiaUFnWkdsMmFXUmxjaUE5SUhWelpWTm9iM0owYUdGdVpDQS9JREUzSURvZ01TeGNibHh1SUNBdkx5QmlhWFJNWlc1bmRHZ2diMllnWldGamFDQmphR0Z1Ym1Wc0lDaG1iM0lnWlhoaGJYQnNaU3dnUmlCcGN5QTBJR0pwZEhNZ2JHOXVaeUIzYUdsc1pTQkdSaUJwY3lBNElHSnBkSE1nYkc5dVp5bGNiaUFnWW1sMFRHVnVaM1JvSUQwZ2RYTmxVMmh2Y25Sb1lXNWtJRDhnTkNBNklEZ3NYRzVjYmlBZ0x5OGdWR0Z5WjJWMElHeGxibWQwYUNCdlppQjBhR1VnYzNSeWFXNW5JQ2hwWlNCY0lpTkdSa1pjSWlCdmNpQmNJaU5HUmtaR1JrWmNJaWxjYmlBZ2MzUnlUR1Z1WjNSb0lEMGdkWE5sVTJodmNuUm9ZVzVrSUQ4Z05DQTZJRGNzWEc1Y2JpQWdMeThnUTI5dFltbHVaU0IwYUdVZ1kyaGhibTVsYkhNZ2RHOW5aWFJvWlhJZ2FXNTBieUJoSUhOcGJtZHNaU0JwYm5SbFoyVnlYRzRnSUdsdWRDQTlJSElnTHlCa2FYWnBaR1Z5SUR3OElHSnBkRXhsYm1kMGFDQXFJRElnZkNCbklDOGdaR2wyYVdSbGNpQThQQ0JpYVhSTVpXNW5kR2dnZkNCaUlDOGdaR2wyYVdSbGNpeGNibHh1SUNBdkx5QkRiMjUyWlhKMElIUm9ZWFFnYVc1MFpXZGxjaUIwYnlCaElHaGxlQ0J6ZEhKcGJtZGNiaUFnYzNSeUlEMGdhVzUwTG5SdlUzUnlhVzVuS0RFMktUdGNiaUFnTHk4Z1FXUmtJSEpwWjJoMElHRnRiM1Z1ZENCdlppQnNaV1owTFhCaFpHUnBibWRjYmlBZ2NtVjBkWEp1SUZ3aUkxd2lJQ3NnYm1WM0lFRnljbUY1S0hOMGNreGxibWQwYUNBdElITjBjaTVzWlc1bmRHZ3BMbXB2YVc0b1hDSXdYQ0lwSUNzZ2MzUnlPMXh1ZlR0Y2JseHVMeW9xWEc0Z0lDb2dRR1JsYzJNZ1oyVnVaWEpwWXlCd1lYSnpaWElnWm05eUlHaHpiQ0F2SUhKbllpQXZJR1YwWXlCemRISnBibWRjYmlBZ0tpQkFjR0Z5WVcwZ2UxTjBjbWx1WjMwZ2MzUnlJQzBnWTI5c2IzSWdjM1J5YVc1blhHNGdJQ29nUUhCaGNtRnRJSHRCY25KaGVYMGdiV0Y0Vm1Gc2RXVnpJQzBnYldGNElIWmhiSFZsY3lCbWIzSWdaV0ZqYUNCamFHRnVibVZzSUNoMWMyVmtJR1p2Y2lCallXeGpkV3hoZEdsdVp5QndaWEpqWlc1MExXSmhjMlZrSUhaaGJIVmxjeWxjYmlBZ0tpQkFjbVYwZFhKdUlIdEJjbkpoZVgwZ2RIbHdaU0FvY21kaUlId2djbWRpWVNCOElHaHpiQ0I4SUdoemJHRXBJSFpoYkhWbGN5Qm1iM0lnWldGamFDQmphR0Z1Ym1Wc1hHNHFMMXh1Wm5WdVkzUnBiMjRnY0dGeWMyVkRiMnh2Y2xOMGNpaHpkSElzSUcxaGVGWmhiSFZsY3lrZ2UxeHVJQ0IyWVhJZ2NHRnljMlZrSUQwZ2MzUnlMbTFoZEdOb0tDOG9YRnhUS3lsY1hDZ29YRnhrS3lrb0pUOHBLRDg2WEZ4RUt6OHBLRnhjWkNzcEtDVS9LU2cvT2x4Y1JDcy9LU2hjWEdRcktTZ2xQeWtvUHpwY1hFUXJQeWsvS0Zzd0xUbGNYQzVkS3o4cFAxeGNLUzlwS1N4Y2JpQWdJQ0FnSUhaaGJERWdQU0J3WVhKelpVbHVkQ2h3WVhKelpXUmJNbDBwTEZ4dUlDQWdJQ0FnZG1Gc01pQTlJSEJoY25ObFNXNTBLSEJoY25ObFpGczBYU2tzWEc0Z0lDQWdJQ0IyWVd3eklEMGdjR0Z5YzJWSmJuUW9jR0Z5YzJWa1d6WmRLVHRjYmlBZ2NtVjBkWEp1SUZ0d1lYSnpaV1JiTVYwc0lIQmhjbk5sWkZzelhTQTlQU0JjSWlWY0lpQS9JSFpoYkRFZ0x5QXhNREFnS2lCdFlYaFdZV3gxWlhOYk1GMGdPaUIyWVd3eExDQndZWEp6WldSYk5WMGdQVDBnWENJbFhDSWdQeUIyWVd3eUlDOGdNVEF3SUNvZ2JXRjRWbUZzZFdWeld6RmRJRG9nZG1Gc01pd2djR0Z5YzJWa1d6ZGRJRDA5SUZ3aUpWd2lJRDhnZG1Gc015QXZJREV3TUNBcUlHMWhlRlpoYkhWbGMxc3lYU0E2SUhaaGJETXNJSEJoY25ObFJteHZZWFFvY0dGeWMyVmtXemhkS1NCOGZDQjFibVJsWm1sdVpXUmRPMXh1ZlR0Y2JseHVMeW9xWEc0Z0lDb2dRR1JsYzJNZ2NHRnljMlVnY21kaUlITjBjbWx1WjF4dUlDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQnpkSElnTFNCamIyeHZjaUJ6ZEhKcGJtZGNiaUFnS2lCQWNtVjBkWEp1SUh0UFltcGxZM1I5SUhKbllpQnZZbXBsWTNSY2Jpb3ZYRzVtZFc1amRHbHZiaUJ3WVhKelpWSm5ZbE4wY2loemRISXBJSHRjYmlBZ2RtRnlJSEJoY25ObFpDQTlJSEJoY25ObFEyOXNiM0pUZEhJb2MzUnlMQ0JiTWpVMUxDQXlOVFVzSURJMU5WMHBPMXh1SUNCeVpYUjFjbTRnZTF4dUlDQWdJSEk2SUhCaGNuTmxaRnN4WFN4Y2JpQWdJQ0JuT2lCd1lYSnpaV1JiTWwwc1hHNGdJQ0FnWWpvZ2NHRnljMlZrV3pOZFhHNGdJSDA3WEc1OU8xeHVYRzR2S2lwY2JpQWdLaUJBWkdWell5QndZWEp6WlNCb2Myd2djM1J5YVc1blhHNGdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJSE4wY2lBdElHTnZiRzl5SUhOMGNtbHVaMXh1SUNBcUlFQnlaWFIxY200Z2UwOWlhbVZqZEgwZ2FITnNJRzlpYW1WamRGeHVLaTljYm1aMWJtTjBhVzl1SUhCaGNuTmxTSE5zVTNSeUtITjBjaWtnZTF4dUlDQjJZWElnY0dGeWMyVmtJRDBnY0dGeWMyVkRiMnh2Y2xOMGNpaHpkSElzSUZzek5qQXNJREV3TUN3Z01UQXdYU2s3WEc0Z0lISmxkSFZ5YmlCN1hHNGdJQ0FnYURvZ2NHRnljMlZrV3pKZExGeHVJQ0FnSUhNNklIQmhjbk5sWkZzelhTeGNiaUFnSUNCc09pQndZWEp6WldSYk5GMWNiaUFnZlR0Y2JuMDdYRzVjYmk4cUtseHVJQ0FxSUVCa1pYTmpJSEJoY25ObElHaGxlQ0J6ZEhKcGJtZGNiaUFnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnYzNSeUlDMGdZMjlzYjNJZ2MzUnlhVzVuWEc0Z0lDb2dRSEpsZEhWeWJpQjdUMkpxWldOMGZTQnlaMklnYjJKcVpXTjBYRzRxTDF4dVpuVnVZM1JwYjI0Z2NHRnljMlZJWlhoVGRISW9hR1Y0S1NCN1hHNGdJQzh2SUZOMGNtbHdJR0Z1ZVNCY0lpTmNJaUJqYUdGeVlXTjBaWEp6WEc0Z0lHaGxlQ0E5SUdobGVDNXlaWEJzWVdObEtGd2lJMXdpTENCY0lsd2lLVHRjYmlBZ0x5OGdVSEpsWm1sNElIUm9aU0JvWlhnZ2MzUnlhVzVuSUhkcGRHZ2dYQ0l3ZUZ3aUlIZG9hV05vSUdsdVpHbGpZWFJsY3lCaElHNTFiV0psY2lCcGJpQm9aWGdnYm05MFlYUnBiMjRzSUhSb1pXNGdZMjl1ZG1WeWRDQjBieUJoYmlCcGJuUmxaMlZ5WEc0Z0lIWmhjaUJwYm5RZ1BTQndZWEp6WlVsdWRDaGNJakI0WENJZ0t5Qm9aWGdwTEZ4dVhHNGdJQzh2SUVsbUlIUm9aU0JzWlc1bmRHZ2diMllnZEdobElHbHVjSFYwSUdseklHOXViSGtnTXl3Z2RHaGxiaUJwZENCcGN5QmhJSE5vYjNKMGFHRnVaQ0JvWlhnZ1kyOXNiM0pjYmlBZ2FYTlRhRzl5ZEdoaGJtUWdQU0JvWlhndWJHVnVaM1JvSUQwOUlETXNYRzVjYmlBZ0x5OGdZbWwwVFdGemF5Qm1iM0lnYVhOdmJHRjBhVzVuSUdWaFkyZ2dZMmhoYm01bGJGeHVJQ0JpYVhSTllYTnJJRDBnYVhOVGFHOXlkR2hoYm1RZ1B5QXdlRVlnT2lBd2VFWkdMRnh1WEc0Z0lDOHZJR0pwZEV4bGJtZDBhQ0J2WmlCbFlXTm9JR05vWVc1dVpXd2dLR1p2Y2lCbGVHRnRjR3hsTENCR0lHbHpJRFFnWW1sMGN5QnNiMjVuSUhkb2FXeGxJRVpHSUdseklEZ2dZbWwwY3lCc2IyNW5LVnh1SUNCaWFYUk1aVzVuZEdnZ1BTQnBjMU5vYjNKMGFHRnVaQ0EvSURRZ09pQTRMRnh1WEc0Z0lDOHZJRWxtSUhkbEozSmxJSFZ6YVc1bklITm9iM0owYUdGdVpDQnViM1JoZEdsdmJpd2diWFZzZEdsd2JIa2daV0ZqYUNCamFHRnVibVZzSUdKNUlERTNYRzRnSUcxMWJIUnBjR3hwWlhJZ1BTQnBjMU5vYjNKMGFHRnVaQ0EvSURFM0lEb2dNVHRjYmlBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0J5T2lBb2FXNTBJRDQrSUdKcGRFeGxibWQwYUNBcUlESWdKaUJpYVhSTllYTnJLU0FxSUcxMWJIUnBjR3hwWlhJc1hHNGdJQ0FnWnpvZ0tHbHVkQ0ErUGlCaWFYUk1aVzVuZEdnZ0ppQmlhWFJOWVhOcktTQXFJRzExYkhScGNHeHBaWElzWEc0Z0lDQWdZam9nS0dsdWRDQW1JR0pwZEUxaGMyc3BJQ29nYlhWc2RHbHdiR2xsY2x4dUlDQjlPMXh1ZlR0Y2JseHVMeW9xWEc0Z0lDb2dRR1JsYzJNZ1kyOXVkbVZ5ZENCdlltcGxZM1FnTHlCemRISnBibWNnYVc1d2RYUWdkRzhnWTI5c2IzSWdhV1lnYm1WalpYTnpZWEo1WEc0Z0lDb2dRSEJoY21GdElIdFBZbXBsWTNRZ2ZDQlRkSEpwYm1jZ2ZDQmpiMnh2Y24wZ2RtRnNkV1VnTFNCamIyeHZjaUJwYm5OMFlXNWpaU3dnYjJKcVpXTjBJQ2hvYzNZc0lHaHpiQ0J2Y2lCeVoySXBMQ0J6ZEhKcGJtY2dLR2h6YkN3Z2NtZGlMQ0JvWlhncFhHNGdJQ29nUUhKbGRIVnliaUI3WTI5c2IzSjlJR052Ykc5eUlHbHVjM1JoYm1ObFhHNHFMMXh1Wm5WdVkzUnBiMjRnWjJWMFEyOXNiM0lvZG1Gc2RXVXBJSHRjYmlBZ2NtVjBkWEp1SUhaaGJIVmxJR2x1YzNSaGJtTmxiMllnWTI5c2IzSWdQeUIyWVd4MVpTQTZJRzVsZHlCamIyeHZjaWgyWVd4MVpTazdYRzU5TzF4dVhHNHZLaXBjYmlBZ0tpQkFaR1Z6WXlCamJHRnRjQ0IyWVd4MVpTQmlaWFIzWldWdUlHMXBiaUJoYm1RZ2JXRjRYRzRnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUhaaGJIVmxYRzRnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUcxcGJseHVJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0J0WVhoY2JpQWdLaUJBY21WMGRYSnVJSHRPZFcxaVpYSjlYRzRxTDF4dVpuVnVZM1JwYjI0Z1kyeGhiWEFvZG1Gc2RXVXNJRzFwYml3Z2JXRjRLU0I3WEc0Z0lISmxkSFZ5YmlCMllXeDFaU0E4UFNCdGFXNGdQeUJ0YVc0Z09pQjJZV3gxWlNBK1BTQnRZWGdnUHlCdFlYZ2dPaUIyWVd4MVpUdGNibjA3WEc1Y2JpOHFLbHh1SUNBcUlFQmtaWE5qSUdOdmJYQmhjbVVnZG1Gc2RXVnpJR0psZEhkbFpXNGdkSGR2SUc5aWFtVmpkSE1zSUhKbGRIVnlibk1nWVNCdlltcGxZM1FnY21Wd2NtVnpaVzUwYVc1bklHTm9ZVzVuWlhNZ2QybDBhQ0IwY25WbEwyWmhiSE5sSUhaaGJIVmxjMXh1SUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCaFhHNGdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR0pjYmlBZ0tpQkFjbVYwZFhKdUlIdFBZbXBsWTNSOVhHNHFMMXh1Wm5WdVkzUnBiMjRnWTI5dGNHRnlaVTlpYW5Nb1lTd2dZaWtnZTF4dUlDQjJZWElnWTJoaGJtZGxjeUE5SUh0OU8xeHVJQ0JtYjNJZ0tIWmhjaUJyWlhrZ2FXNGdZU2tnZTF4dUlDQWdJR05vWVc1blpYTmJhMlY1WFNBOUlHSmJhMlY1WFNBaFBTQmhXMnRsZVYwN1hHNGdJSDF5WlhSMWNtNGdZMmhoYm1kbGN6dGNibjA3WEc1Y2JpOHFLbHh1SUNBcUlFQmtaWE5qSUcxcGVDQjBkMjhnWTI5c2IzSnpYRzRnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1FnZkNCVGRISnBibWNnZkNCamIyeHZjbjBnWTI5c2IzSXhJQzBnWTI5c2IzSWdhVzV6ZEdGdVkyVXNJRzlpYW1WamRDQW9hSE4yTENCb2Myd2diM0lnY21kaUtTd2djM1J5YVc1bklDaG9jMndzSUhKbllpd2dhR1Y0S1Z4dUlDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMElId2dVM1J5YVc1bklId2dZMjlzYjNKOUlHTnZiRzl5TWlBdElHTnZiRzl5SUdsdWMzUmhibU5sTENCdlltcGxZM1FnS0doemRpd2dhSE5zSUc5eUlISm5ZaWtzSUhOMGNtbHVaeUFvYUhOc0xDQnlaMklzSUdobGVDbGNiaUFnS2lCQWNHRnlZVzBnZTA1MWJXSmxjbjBnZDJWcFoyaDBJQzBnWTJ4dmMyVnlJSFJ2SURBZ1BTQnRiM0psSUdOdmJHOXlNU3dnWTJ4dmMyVnlJSFJ2SURFd01DQTlJRzF2Y21VZ1kyOXNiM0l5WEc0Z0lDb2dRSEpsZEhWeWJpQjdZMjlzYjNKOUlHTnZiRzl5SUdsdWMzUmhibU5sWEc0cUwxeHVablZ1WTNScGIyNGdYMjFwZUNoamIyeHZjakVzSUdOdmJHOXlNaXdnZDJWcFoyaDBLU0I3WEc0Z0lIWmhjaUJ5WjJJeElEMGdaMlYwUTI5c2IzSW9ZMjlzYjNJeEtTNXlaMklzWEc0Z0lDQWdJQ0J5WjJJeUlEMGdaMlYwUTI5c2IzSW9ZMjlzYjNJeUtTNXlaMkk3WEc0Z0lIZGxhV2RvZENBOUlHTnNZVzF3S0hkbGFXZG9kQ0F2SURFd01DQjhmQ0F3TGpVc0lEQXNJREVwTzF4dUlDQnlaWFIxY200Z2JtVjNJR052Ykc5eUtIdGNiaUFnSUNCeU9pQm1iRzl2Y2loeVoySXhMbklnS3lBb2NtZGlNaTV5SUMwZ2NtZGlNUzV5S1NBcUlIZGxhV2RvZENrc1hHNGdJQ0FnWnpvZ1pteHZiM0lvY21kaU1TNW5JQ3NnS0hKbllqSXVaeUF0SUhKbllqRXVaeWtnS2lCM1pXbG5hSFFwTEZ4dUlDQWdJR0k2SUdac2IyOXlLSEpuWWpFdVlpQXJJQ2h5WjJJeUxtSWdMU0J5WjJJeExtSXBJQ29nZDJWcFoyaDBLVnh1SUNCOUtUdGNibjA3WEc1Y2JpOHFLbHh1SUNBcUlFQmtaWE5qSUd4cFoyaDBaVzRnWTI5c2IzSWdZbmtnWVcxdmRXNTBYRzRnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1FnZkNCVGRISnBibWNnZkNCamIyeHZjbjBnWTI5c2IzSWdMU0JqYjJ4dmNpQnBibk4wWVc1alpTd2diMkpxWldOMElDaG9jM1lzSUdoemJDQnZjaUJ5WjJJcExDQnpkSEpwYm1jZ0tHaHpiQ3dnY21kaUxDQm9aWGdwWEc0Z0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHRnRiM1Z1ZEZ4dUlDQXFJRUJ5WlhSMWNtNGdlMk52Ykc5eWZTQmpiMnh2Y2lCcGJuTjBZVzVqWlZ4dUtpOWNibVoxYm1OMGFXOXVJRjlzYVdkb2RHVnVLR052Ykc5eUxDQmhiVzkxYm5RcElIdGNiaUFnZG1GeUlHTnZiQ0E5SUdkbGRFTnZiRzl5S0dOdmJHOXlLU3hjYmlBZ0lDQWdJR2h6ZGlBOUlHTnZiQzVvYzNZN1hHNGdJR2h6ZGk1MklEMGdZMnhoYlhBb2FITjJMbllnS3lCaGJXOTFiblFzSURBc0lERXdNQ2s3WEc0Z0lHTnZiQzVvYzNZZ1BTQm9jM1k3WEc0Z0lISmxkSFZ5YmlCamIydzdYRzU5TzF4dVhHNHZLaXBjYmlBZ0tpQkFaR1Z6WXlCa1lYSnJaVzRnWTI5c2IzSWdZbmtnWVcxdmRXNTBYRzRnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1FnZkNCVGRISnBibWNnZkNCamIyeHZjbjBnWTI5c2IzSWdMU0JqYjJ4dmNpQnBibk4wWVc1alpTd2diMkpxWldOMElDaG9jM1lzSUdoemJDQnZjaUJ5WjJJcExDQnpkSEpwYm1jZ0tHaHpiQ3dnY21kaUxDQm9aWGdwWEc0Z0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHRnRiM1Z1ZEZ4dUlDQXFJRUJ5WlhSMWNtNGdlMk52Ykc5eWZTQmpiMnh2Y2lCcGJuTjBZVzVqWlZ4dUtpOWNibVoxYm1OMGFXOXVJRjlrWVhKclpXNG9ZMjlzYjNJc0lHRnRiM1Z1ZENrZ2UxeHVJQ0IyWVhJZ1kyOXNJRDBnWjJWMFEyOXNiM0lvWTI5c2IzSXBMRnh1SUNBZ0lDQWdhSE4ySUQwZ1kyOXNMbWh6ZGp0Y2JpQWdhSE4yTG5ZZ1BTQmpiR0Z0Y0Nob2MzWXVkaUF0SUdGdGIzVnVkQ3dnTUN3Z01UQXdLVHRjYmlBZ1kyOXNMbWh6ZGlBOUlHaHpkanRjYmlBZ2NtVjBkWEp1SUdOdmJEdGNibjA3WEc1Y2JpOHFLbHh1SUNBcUlFQmpiMjV6ZEhKMVkzUnZjaUJqYjJ4dmNpQnZZbXBsWTNSY2JpQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRDQjhJRk4wY21sdVp5QjhJR052Ykc5eWZTQjJZV3gxWlNBdElHTnZiRzl5SUdsdWMzUmhibU5sTENCdlltcGxZM1FnS0doemRpd2dhSE5zSUc5eUlISm5ZaWtzSUhOMGNtbHVaeUFvYUhOc0xDQnlaMklzSUdobGVDbGNiaW92WEc1MllYSWdZMjlzYjNJZ1BTQm1kVzVqZEdsdmJpQmpiMnh2Y2loMllXeDFaU2tnZTF4dUlDQXZMeUJVYUdVZ2QyRjBZMmdnWTJGc2JHSmhZMnNnWm5WdVkzUnBiMjRnWm05eUlIUm9hWE1nWTI5c2IzSWdkMmxzYkNCaVpTQnpkRzl5WldRZ2FHVnlaVnh1SUNCMGFHbHpMbDl2YmtOb1lXNW5aU0E5SUdaaGJITmxPMXh1SUNBdkx5QlVhR1VnWkdWbVlYVnNkQ0JqYjJ4dmNpQjJZV3gxWlZ4dUlDQjBhR2x6TGw5MllXeDFaU0E5SUhzZ2FEb2dkVzVrWldacGJtVmtMQ0J6T2lCMWJtUmxabWx1WldRc0lIWTZJSFZ1WkdWbWFXNWxaQ0I5TzF4dUlDQnBaaUFvZG1Gc2RXVXBJSFJvYVhNdWMyVjBLSFpoYkhWbEtUdGNibjA3WEc1Y2JpOHZJRVY0Y0c5elpTQm1kVzVqZEdsdmJuTWdZWE1nYzNSaGRHbGpJR2hsYkhCbGNuTmNibU52Ykc5eUxtMXBlQ0E5SUY5dGFYZzdYRzVqYjJ4dmNpNXNhV2RvZEdWdUlEMGdYMnhwWjJoMFpXNDdYRzVqYjJ4dmNpNWtZWEpyWlc0Z1BTQmZaR0Z5YTJWdU8xeHVZMjlzYjNJdWFITjJNbEpuWWlBOUlHaHpkakpTWjJJN1hHNWpiMnh2Y2k1eVoySXlTSE4ySUQwZ2NtZGlNa2h6ZGp0Y2JtTnZiRzl5TG1oemRqSkljMndnUFNCb2MzWXlTSE5zTzF4dVkyOXNiM0l1YUhOc01raHpkaUE5SUdoemJESkljM1k3WEc1amIyeHZjaTVvYzJ3eVUzUnlJRDBnYUhOc01sTjBjanRjYm1OdmJHOXlMbkpuWWpKVGRISWdQU0J5WjJJeVUzUnlPMXh1WTI5c2IzSXVjbWRpTWtobGVDQTlJSEpuWWpKSVpYZzdYRzVqYjJ4dmNpNXdZWEp6WlVobGVGTjBjaUE5SUhCaGNuTmxTR1Y0VTNSeU8xeHVZMjlzYjNJdWNHRnljMlZJYzJ4VGRISWdQU0J3WVhKelpVaHpiRk4wY2p0Y2JtTnZiRzl5TG5CaGNuTmxVbWRpVTNSeUlEMGdjR0Z5YzJWU1oySlRkSEk3WEc1Y2JtTnZiRzl5TG5CeWIzUnZkSGx3WlNBOUlIdGNiaUFnWTI5dWMzUnlkV04wYjNJNklHTnZiRzl5TEZ4dVhHNGdJQzhxS2x4dUlDQWdJQ29nUUdSbGMyTWdjMlYwSUhSb1pTQmpiMnh2Y2lCbWNtOXRJR0Z1ZVNCMllXeHBaQ0IyWVd4MVpWeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1FnZkNCVGRISnBibWNnZkNCamIyeHZjbjBnZG1Gc2RXVWdMU0JqYjJ4dmNpQnBibk4wWVc1alpTd2diMkpxWldOMElDaG9jM1lzSUdoemJDQnZjaUJ5WjJJcExDQnpkSEpwYm1jZ0tHaHpiQ3dnY21kaUxDQm9aWGdwWEc0Z0lDb3ZYRzRnSUhObGREb2dablZ1WTNScGIyNGdjMlYwS0haaGJIVmxLU0I3WEc0Z0lDQWdhV1lnS0NoMGVYQmxiMllnZG1Gc2RXVWdQVDA5SUZ3aWRXNWtaV1pwYm1Wa1hDSWdQeUJjSW5WdVpHVm1hVzVsWkZ3aUlEb2dYM1I1Y0dWdlppaDJZV3gxWlNrcElEMDlJRndpYjJKcVpXTjBYQ0lwSUh0Y2JpQWdJQ0FnSUdsbUlDaDJZV3gxWlNCcGJuTjBZVzVqWlc5bUlHTnZiRzl5S1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YUhOMklEMGdZMjlzYjNJdWFITjJPMXh1SUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hjSW5KY0lpQnBiaUIyWVd4MVpTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuSm5ZaUE5SUhaaGJIVmxPMXh1SUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hjSW5aY0lpQnBiaUIyWVd4MVpTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtaHpkaUE5SUhaaGJIVmxPMXh1SUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hjSW14Y0lpQnBiaUIyWVd4MVpTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtaHpiQ0E5SUhaaGJIVmxPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdaV3h6WlNCcFppQW9kSGx3Wlc5bUlIWmhiSFZsSUQwOUlGd2ljM1J5YVc1blhDSXBJSHRjYmlBZ0lDQWdJR2xtSUNndlhuSm5ZaTh1ZEdWemRDaDJZV3gxWlNrcElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVoySlRkSEpwYm1jZ1BTQjJZV3gxWlR0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb0wxNW9jMnd2TG5SbGMzUW9kbUZzZFdVcEtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdWFITnNVM1J5YVc1bklEMGdkbUZzZFdVN1hHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tDOWVJMXN3TFRsQkxVWmhMV1pkTHk1MFpYTjBLSFpoYkhWbEtTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtaGxlRk4wY21sdVp5QTlJSFpoYkhWbE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdmU3hjYmx4dUlDQXZLaXBjYmlBZ0lDQXFJRUJrWlhOaklITm9iM0owWTNWMElIUnZJSE5sZENCaElITndaV05wWm1saklHTm9ZVzV1Wld3Z2RtRnNkV1ZjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQnRiMlJsYkNBdElHaHpkaUI4SUdoemJDQjhJSEpuWWx4dUlDQWdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJR05vWVc1dVpXd2dMU0JwYm1ScGRtbGtkV0ZzSUdOb1lXNXVaV3dnZEc4Z2MyVjBMQ0JtYjNJZ1pYaGhiWEJzWlNCcFppQnRiMlJsYkNBOUlHaHpiQ3dnWTJoaGJtVnNJRDBnYUNCOElITWdmQ0JzWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdkbUZzZFdVZ0xTQnVaWGNnZG1Gc2RXVWdabTl5SUhSb1pTQmphR0Z1Ym1Wc1hHNGdJQ292WEc0Z0lITmxkRU5vWVc1dVpXdzZJR1oxYm1OMGFXOXVJSE5sZEVOb1lXNXVaV3dvYlc5a1pXd3NJR05vWVc1dVpXd3NJSFpoYkhWbEtTQjdYRzRnSUNBZ2RtRnlJSFlnUFNCMGFHbHpXMjF2WkdWc1hUdGNiaUFnSUNCMlcyTm9ZVzV1Wld4ZElEMGdkbUZzZFdVN1hHNGdJQ0FnZEdocGMxdHRiMlJsYkYwZ1BTQjJPMXh1SUNCOUxGeHVYRzRnSUM4cUtseHVJQ0FnSUNvZ1FHUmxjMk1nYldGclpTQnVaWGNnWTI5c2IzSWdhVzV6ZEdGdVkyVWdkMmwwYUNCMGFHVWdjMkZ0WlNCMllXeDFaU0JoY3lCMGFHbHpJRzl1WlZ4dUlDQWdJQ29nUUhKbGRIVnliaUI3WTI5c2IzSjlYRzRnSUNvdlhHNGdJR05zYjI1bE9pQm1kVzVqZEdsdmJpQmpiRzl1WlNncElIdGNiaUFnSUNCeVpYUjFjbTRnYm1WM0lHTnZiRzl5S0hSb2FYTXBPMXh1SUNCOUxGeHVYRzRnSUM4cUtseHVJQ0FnSUNvZ1FHUmxjMk1nWTI5dGNHRnlaU0IwYUdseklHTnZiRzl5SUdGbllXbHVjM1FnWVc1dmRHaGxjaXdnY21WMGRYSnVjeUJoSUc5aWFtVmpkQ0J5WlhCeVpYTmxiblJwYm1jZ1kyaGhibWRsY3lCM2FYUm9JSFJ5ZFdVdlptRnNjMlVnZG1Gc2RXVnpYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZENCOElGTjBjbWx1WnlCOElHTnZiRzl5ZlNCamIyeHZjaUF0SUdOdmJHOXlJSFJ2SUdOdmJYQmhjbVVnWVdkaGFXNXpkRnh1SUNBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlHMXZaR1ZzSUMwZ2FITjJJSHdnYUhOc0lId2djbWRpWEc0Z0lDQWdLaUJBY21WMGRYSnVJSHRQWW1wbFkzUjlYRzRnSUNvdlhHNGdJR052YlhCaGNtVTZJR1oxYm1OMGFXOXVJR052YlhCaGNtVW9ZMjlzYjNJc0lHMXZaR1ZzS1NCN1hHNGdJQ0FnYlc5a1pXd2dQU0J0YjJSbGJDQjhmQ0JjSW1oemRsd2lPMXh1SUNBZ0lISmxkSFZ5YmlCamIyMXdZWEpsVDJKcWN5aDBhR2x6VzIxdlpHVnNYU3dnWjJWMFEyOXNiM0lvWTI5c2IzSXBXMjF2WkdWc1hTazdYRzRnSUgwc1hHNWNiaUFnTHlvcVhHNGdJQ0FnS2lCQVpHVnpZeUJ0YVhnZ1lTQmpiMnh2Y2lCcGJuUnZJSFJvYVhNZ2IyNWxYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZENCOElGTjBjbWx1WnlCOElHTnZiRzl5ZlNCamIyeHZjaUF0SUdOdmJHOXlJR2x1YzNSaGJtTmxMQ0J2WW1wbFkzUWdLR2h6ZGl3Z2FITnNJRzl5SUhKbllpa3NJSE4wY21sdVp5QW9hSE5zTENCeVoySXNJR2hsZUNsY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0IzWldsbmFIUWdMU0JqYkc5elpYSWdkRzhnTUNBOUlHMXZjbVVnWTNWeWNtVnVkQ0JqYjJ4dmNpd2dZMnh2YzJWeUlIUnZJREV3TUNBOUlHMXZjbVVnYm1WM0lHTnZiRzl5WEc0Z0lDb3ZYRzRnSUcxcGVEb2dablZ1WTNScGIyNGdiV2w0S0dOdmJHOXlMQ0IzWldsbmFIUXBJSHRjYmlBZ0lDQjBhR2x6TG1oemRpQTlJRjl0YVhnb2RHaHBjeXdnWTI5c2IzSXNJSGRsYVdkb2RDa3VhSE4yTzF4dUlDQjlMRnh1WEc0Z0lDOHFLbHh1SUNBZ0lDb2dRR1JsYzJNZ2JHbG5hSFJsYmlCamIyeHZjaUJpZVNCaGJXOTFiblJjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQmhiVzkxYm5SY2JpQWdLaTljYmlBZ2JHbG5hSFJsYmpvZ1puVnVZM1JwYjI0Z2JHbG5hSFJsYmloaGJXOTFiblFwSUh0Y2JpQWdJQ0JmYkdsbmFIUmxiaWgwYUdsekxDQmhiVzkxYm5RcE8xeHVJQ0I5TEZ4dVhHNGdJQzhxS2x4dUlDQWdJQ29nUUdSbGMyTWdaR0Z5YTJWdUlHTnZiRzl5SUdKNUlHRnRiM1Z1ZEZ4dUlDQWdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJR0Z0YjNWdWRGeHVJQ0FxTDF4dUlDQmtZWEpyWlc0NklHWjFibU4wYVc5dUlHUmhjbXRsYmloaGJXOTFiblFwSUh0Y2JpQWdJQ0JmWkdGeWEyVnVLSFJvYVhNc0lHRnRiM1Z1ZENrN1hHNGdJSDFjYm4wN1hHNWNiazlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowYVdWektHTnZiRzl5TG5CeWIzUnZkSGx3WlN3Z2UxeHVJQ0JvYzNZNklIdGNiaUFnSUNCblpYUTZJR1oxYm1OMGFXOXVJR2RsZENncElIdGNiaUFnSUNBZ0lDOHZJRjkyWVd4MVpTQnBjeUJqYkc5dVpXUWdkRzhnWVd4c2IzY2dZMmhoYm1kbGN5QjBieUJpWlNCdFlXUmxJSFJ2SUhSb1pTQjJZV3gxWlhNZ1ltVm1iM0psSUhCaGMzTnBibWNnZEdobGJTQmlZV05yWEc0Z0lDQWdJQ0IyWVhJZ2RpQTlJSFJvYVhNdVgzWmhiSFZsTzF4dUlDQWdJQ0FnY21WMGRYSnVJSHNnYURvZ2RpNW9MQ0J6T2lCMkxuTXNJSFk2SUhZdWRpQjlPMXh1SUNBZ0lIMHNYRzRnSUNBZ2MyVjBPaUJtZFc1amRHbHZiaUJ6WlhRb2JtVjNWbUZzZFdVcElIdGNiaUFnSUNBZ0lDOHZJRWxtSUhSb2FYTWdZMjlzYjNJZ2FYTWdZbVZwYm1jZ2QyRjBZMmhsWkNCbWIzSWdZMmhoYm1kbGN5QjNaU0J1WldWa0lIUnZJR052YlhCaGNtVWdkR2hsSUc1bGR5QmhibVFnYjJ4a0lIWmhiSFZsY3lCMGJ5QmphR1ZqYXlCMGFHVWdaR2xtWm1WeVpXNWpaVnh1SUNBZ0lDQWdMeThnVDNSb1pYSjNhWE5sSUhkbElHTmhiaUJxZFhOMElHSmxJR3hoZW5sY2JpQWdJQ0FnSUdsbUlDaDBhR2x6TGw5dmJrTm9ZVzVuWlNrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnYjJ4a1ZtRnNkV1VnUFNCMGFHbHpMbDkyWVd4MVpUdGNiaUFnSUNBZ0lDQWdabTl5SUNoMllYSWdZMmhoYm01bGJDQnBiaUJ2YkdSV1lXeDFaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2doYm1WM1ZtRnNkV1V1YUdGelQzZHVVSEp2Y0dWeWRIa29ZMmhoYm01bGJDa3BJRzVsZDFaaGJIVmxXMk5vWVc1dVpXeGRJRDBnYjJ4a1ZtRnNkV1ZiWTJoaGJtNWxiRjA3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2RtRnlJR05vWVc1blpYTWdQU0JqYjIxd1lYSmxUMkpxY3lodmJHUldZV3gxWlN3Z2JtVjNWbUZzZFdVcE8xeHVJQ0FnSUNBZ0lDQXZMeUJWY0dSaGRHVWdkR2hsSUc5c1pDQjJZV3gxWlZ4dUlDQWdJQ0FnSUNCMGFHbHpMbDkyWVd4MVpTQTlJRzVsZDFaaGJIVmxPMXh1SUNBZ0lDQWdJQ0F2THlCSlppQjBhR1VnZG1Gc2RXVWdhR0Z6SUdOb1lXNW5aV1FzSUdOaGJHd2dhRzl2YXlCallXeHNZbUZqYTF4dUlDQWdJQ0FnSUNCcFppQW9ZMmhoYm1kbGN5NW9JSHg4SUdOb1lXNW5aWE11Y3lCOGZDQmphR0Z1WjJWekxuWXBJSFJvYVhNdVgyOXVRMmhoYm1kbEtIUm9hWE1zSUdOb1lXNW5aWE1wTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZkbUZzZFdVZ1BTQnVaWGRXWVd4MVpUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJSDBzWEc0Z0lISm5Zam9nZTF4dUlDQWdJR2RsZERvZ1puVnVZM1JwYjI0Z1oyVjBLQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR2h6ZGpKU1oySW9kR2hwY3k1ZmRtRnNkV1VwTzF4dUlDQWdJSDBzWEc0Z0lDQWdjMlYwT2lCbWRXNWpkR2x2YmlCelpYUW9kbUZzZFdVcElIdGNiaUFnSUNBZ0lIUm9hWE11YUhOMklEMGdjbWRpTWtoemRpaDJZV3gxWlNrN1hHNGdJQ0FnZlZ4dUlDQjlMRnh1SUNCb2MydzZJSHRjYmlBZ0lDQm5aWFE2SUdaMWJtTjBhVzl1SUdkbGRDZ3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQm9jM1l5U0hOc0tIUm9hWE11WDNaaGJIVmxLVHRjYmlBZ0lDQjlMRnh1SUNBZ0lITmxkRG9nWm5WdVkzUnBiMjRnYzJWMEtIWmhiSFZsS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbWh6ZGlBOUlHaHpiREpJYzNZb2RtRnNkV1VwTzF4dUlDQWdJSDFjYmlBZ2ZTeGNiaUFnY21kaVUzUnlhVzVuT2lCN1hHNGdJQ0FnWjJWME9pQm1kVzVqZEdsdmJpQm5aWFFvS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnY21kaU1sTjBjaWgwYUdsekxuSm5ZaWs3WEc0Z0lDQWdmU3hjYmlBZ0lDQnpaWFE2SUdaMWJtTjBhVzl1SUhObGRDaDJZV3gxWlNrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTV5WjJJZ1BTQndZWEp6WlZKbllsTjBjaWgyWVd4MVpTazdYRzRnSUNBZ2ZWeHVJQ0I5TEZ4dUlDQm9aWGhUZEhKcGJtYzZJSHRjYmlBZ0lDQm5aWFE2SUdaMWJtTjBhVzl1SUdkbGRDZ3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnlaMkl5U0dWNEtIUm9hWE11Y21kaUtUdGNiaUFnSUNCOUxGeHVJQ0FnSUhObGREb2dablZ1WTNScGIyNGdjMlYwS0haaGJIVmxLU0I3WEc0Z0lDQWdJQ0IwYUdsekxuSm5ZaUE5SUhCaGNuTmxTR1Y0VTNSeUtIWmhiSFZsS1R0Y2JpQWdJQ0I5WEc0Z0lIMHNYRzRnSUdoemJGTjBjbWx1WnpvZ2UxeHVJQ0FnSUdkbGREb2dablZ1WTNScGIyNGdaMlYwS0NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdoemJESlRkSElvZEdocGN5NW9jMndwTzF4dUlDQWdJSDBzWEc0Z0lDQWdjMlYwT2lCbWRXNWpkR2x2YmlCelpYUW9kbUZzZFdVcElIdGNiaUFnSUNBZ0lIUm9hWE11YUhOc0lEMGdZMjlzYjNJdWNHRnljMlZJYzJ4VGRISW9kbUZzZFdVcE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlNrN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdZMjlzYjNJN1hHNWNiaThxS2lvdklIMHBMRnh1THlvZ01TQXFMMXh1THlvcUtpOGdLR1oxYm1OMGFXOXVLRzF2WkhWc1pTd2daWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWtnZTF4dVhHNWNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVYRzR2S2lwY2JpQWdRR052Ym5OMGNuVmpkRzl5SUhOMGVXeGxjMmhsWlhRZ2QzSnBkR1Z5WEc0cUwxeHVkbUZ5SUhOMGVXeGxjMmhsWlhRZ1BTQm1kVzVqZEdsdmJpQnpkSGxzWlhOb1pXVjBLQ2tnZTF4dUlDQXZMeUJEY21WaGRHVWdZU0J1WlhjZ2MzUjViR1VnWld4bGJXVnVkRnh1SUNCMllYSWdjM1I1YkdVZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Z3aWMzUjViR1ZjSWlrN1hHNGdJR1J2WTNWdFpXNTBMbWhsWVdRdVlYQndaVzVrUTJocGJHUW9jM1I1YkdVcE8xeHVJQ0F2THlCWFpXSnJhWFFnWVhCd1lYSmxiblJzZVNCeVpYRjFhWEpsY3lCaElIUmxlSFFnYm05a1pTQjBieUJpWlNCcGJuTmxjblJsWkNCcGJuUnZJSFJvWlNCemRIbHNaU0JsYkdWdFpXNTBYRzRnSUM4dklDaGhZMk52Y21ScGJtY2dkRzhnYUhSMGNITTZMeTlrWVhacFpIZGhiSE5vTG01aGJXVXZZV1JrTFhKMWJHVnpMWE4wZVd4bGMyaGxaWFJ6S1Z4dUlDQnpkSGxzWlM1aGNIQmxibVJEYUdsc1pDaGtiMk4xYldWdWRDNWpjbVZoZEdWVVpYaDBUbTlrWlNoY0lsd2lLU2s3WEc0Z0lIUm9hWE11YzNSNWJHVWdQU0J6ZEhsc1pUdGNiaUFnTHk4Z1EzSmxZWFJsSUdFZ2NtVm1aWEpsYm1ObElIUnZJSFJvWlNCemRIbHNaU0JsYkdWdFpXNTBKM01nUTFOVFUzUjViR1ZUYUdWbGRDQnZZbXBsWTNSY2JpQWdMeThnUTFOVFUzUjViR1ZUYUdWbGRDQkJVRWs2SUdoMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBGUVNTOURVMU5UZEhsc1pWTm9aV1YwWEc0Z0lIWmhjaUJ6YUdWbGRDQTlJSE4wZVd4bExuTm9aV1YwTzF4dUlDQjBhR2x6TG5Ob1pXVjBJRDBnYzJobFpYUTdYRzRnSUM4dklFZGxkQ0JoSUhKbFptVnlaVzVqWlNCMGJ5QjBhR1VnYzJobFpYUW5jeUJEVTFOU2RXeGxUR2x6ZENCdlltcGxZM1JjYmlBZ0x5OGdRMU5UVW5Wc1pVeHBjM1FnUVZCSk9pQm9kSFJ3Y3pvdkwyUmxkbVZzYjNCbGNpNXRiM3BwYkd4aExtOXlaeTlsYmkxVlV5OWtiMk56TDFkbFlpOUJVRWt2UTFOVFVuVnNaVXhwYzNSY2JpQWdkR2hwY3k1eWRXeGxjeUE5SUhOb1pXVjBMbkoxYkdWeklIeDhJSE5vWldWMExtTnpjMUoxYkdWek8xeHVJQ0F2THlCWFpTZHNiQ0J6ZEc5eVpTQnlaV1psY21WdVkyVnpJSFJ2SUdGc2JDQjBhR1VnUTFOVFUzUjViR1ZFWldOc1lYSmhkR2x2YmlCdlltcGxZM1J6SUhSb1lYUWdkMlVnWTJoaGJtZGxJR2hsY21Vc0lHdGxlV1ZrSUdKNUlIUm9aU0JEVTFNZ2MyVnNaV04wYjNJZ2RHaGxlU0JpWld4dmJtY2dkRzljYmlBZ0x5OGdRMU5UVTNSNWJHVkVaV05zWVhKaGRHbHZiaUJCVUVrNklHaDBkSEJ6T2k4dlpHVjJaV3h2Y0dWeUxtMXZlbWxzYkdFdWIzSm5MMlZ1TFZWVEwyUnZZM012VjJWaUwwRlFTUzlEVTFOVGRIbHNaVVJsWTJ4aGNtRjBhVzl1WEc0Z0lIUm9hWE11YldGd0lEMGdlMzA3WEc1OU8xeHVYRzV6ZEhsc1pYTm9aV1YwTG5CeWIzUnZkSGx3WlNBOUlIdGNiaUFnWTI5dWMzUnlkV04wYjNJNklITjBlV3hsYzJobFpYUXNYRzVjYmlBZ0x5b3FYRzRnSUNBZ0tpQkFaR1Z6WXlCVFpYUWdZU0J6Y0dWamFXWnBZeUJ5ZFd4bElHWnZjaUJoSUdkcGRtVnVJSE5sYkdWamRHOXlYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UxTjBjbWx1WjMwZ2MyVnNaV04wYjNJZ0xTQjBhR1VnUTFOVElITmxiR1ZqZEc5eUlHWnZjaUIwYUdseklISjFiR1VnS0dVdVp5NGdYQ0ppYjJSNVhDSXNJRndpTG1Oc1lYTnpYQ0lzSUZ3aUkybGtYQ0lwWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdjSEp2Y0dWeWRIa2dMU0IwYUdVZ1ExTlRJSEJ5YjNCbGNuUjVJSFJ2SUhObGRDQW9aUzVuTGlCY0ltSmhZMnRuY205MWJtUXRZMjlzYjNKY0lpd2dYQ0ptYjI1MExXWmhiV2xzZVZ3aUxDQmNJbm90YVc1a1pYaGNJaWxjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQjJZV3gxWlNBZ0lDQXRJSFJvWlNCdVpYY2dkbUZzZFdVZ1ptOXlJSFJvWlNCeWRXeGxJQ2hsTG1jdUlGd2ljbWRpS0RJMU5Td2dNalUxTENBeU5UVXBYQ0lzSUZ3aVNHVnNkbVYwYVdOaFhDSXNJRndpT1RsY0lpbGNiaUFnS2k5Y2JpQWdjMlYwVW5Wc1pUb2dablZ1WTNScGIyNGdjMlYwVW5Wc1pTaHpaV3hsWTNSdmNpd2djSEp2Y0dWeWRIa3NJSFpoYkhWbEtTQjdYRzRnSUNBZ2RtRnlJSE5vWldWMElEMGdkR2hwY3k1emFHVmxkRHRjYmlBZ0lDQjJZWElnY25Wc1pYTWdQU0J6YUdWbGRDNXlkV3hsY3lCOGZDQnphR1ZsZEM1amMzTlNkV3hsY3p0Y2JpQWdJQ0IyWVhJZ2JXRndJRDBnZEdocGN5NXRZWEE3WEc0Z0lDQWdMeThnUTI5dWRtVnlkQ0J3Y205d1pYSjBlU0JtY205dElHTmhiV1ZzUTJGelpTQjBieUJ6Ym1GclpTMWpZWE5sWEc0Z0lDQWdjSEp2Y0dWeWRIa2dQU0J3Y205d1pYSjBlUzV5WlhCc1lXTmxLQzhvVzBFdFdsMHBMMmNzSUdaMWJtTjBhVzl1SUNna01Ta2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlGd2lMVndpSUNzZ0pERXVkRzlNYjNkbGNrTmhjMlVvS1R0Y2JpQWdJQ0I5S1R0Y2JpQWdJQ0JwWmlBb0lXMWhjQzVvWVhOUGQyNVFjbTl3WlhKMGVTaHpaV3hsWTNSdmNpa3BJSHRjYmlBZ0lDQWdJQzh2SUVsbUlIUm9aU0J6Wld4bFkzUnZjaUJvWVhOdUozUWdZbVZsYmlCMWMyVmtJSGxsZENCM1pTQjNZVzUwSUhSdklHbHVjMlZ5ZENCMGFHVWdjblZzWlNCaGRDQjBhR1VnWlc1a0lHOW1JSFJvWlNCRFUxTlNkV3hsVEdsemRDd2djMjhnZDJVZ2RYTmxJR2wwY3lCc1pXNW5kR2dnWVhNZ2RHaGxJR2x1WkdWNElIWmhiSFZsWEc0Z0lDQWdJQ0IyWVhJZ2FXNWtaWGdnUFNCeWRXeGxjeTVzWlc1bmRHZzdYRzRnSUNBZ0lDQXZMeUJRY21Wd1lYSmxJSFJvWlNCeWRXeGxJR1JsWTJ4aGNtRjBhVzl1SUhSbGVIUXNJSE5wYm1ObElHSnZkR2dnYVc1elpYSjBVblZzWlNCaGJtUWdZV1JrVW5Wc1pTQjBZV3RsSUhSb2FYTWdabTl5YldGMFhHNGdJQ0FnSUNCMllYSWdaR1ZqYkdGeVlYUnBiMjRnUFNCd2NtOXdaWEowZVNBcklGd2lPaUJjSWlBcklIWmhiSFZsTzF4dUlDQWdJQ0FnTHk4Z1NXNXpaWEowSUhSb1pTQnVaWGNnY25Wc1pTQnBiblJ2SUhSb1pTQnpkSGxzWlhOb1pXVjBYRzRnSUNBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNBdkx5QlRiMjFsSUdKeWIzZHpaWEp6SUc5dWJIa2djM1Z3Y0c5eWRDQnBibk5sY25SU2RXeGxMQ0J2ZEdobGNuTWdiMjVzZVNCemRYQndiM0owSUdGa1pGSjFiR1VzSUhOdklIZGxJR2hoZG1VZ2RHOGdkWE5sSUdKdmRHaGNiaUFnSUNBZ0lDQWdjMmhsWlhRdWFXNXpaWEowVW5Wc1pTaHpaV3hsWTNSdmNpQXJJRndpSUh0Y0lpQXJJR1JsWTJ4aGNtRjBhVzl1SUNzZ1hDSTdmVndpTENCcGJtUmxlQ2s3WEc0Z0lDQWdJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnSUNBZ0lITm9aV1YwTG1Ga1pGSjFiR1VvYzJWc1pXTjBiM0lzSUdSbFkyeGhjbUYwYVc5dUxDQnBibVJsZUNrN1hHNGdJQ0FnSUNCOUlHWnBibUZzYkhrZ2UxeHVJQ0FnSUNBZ0lDQXZMeUJDWldOaGRYTmxJSE5oWm1GeWFTQnBjeUJ3WlhKb1lYQnpJSFJvWlNCM2IzSnpkQ0JpY205M2MyVnlJR2x1SUdGc2JDQnZaaUJvYVhOMGIzSjVMQ0IzWlNCb1lYWmxJSFJ2SUhKbGJXbHVaQ0JwZENCMGJ5QnJaV1Z3SUhSb1pTQnphR1ZsZENCeWRXeGxjeUIxY0MxMGJ5MWtZWFJsWEc0Z0lDQWdJQ0FnSUhKMWJHVnpJRDBnYzJobFpYUXVjblZzWlhNZ2ZId2djMmhsWlhRdVkzTnpVblZzWlhNN1hHNGdJQ0FnSUNBZ0lDOHZJRUZrWkNCdmRYSWdibVYzYkhrZ2FXNXpaWEowWldRZ2NuVnNaU2R6SUVOVFUxTjBlV3hsUkdWamJHRnlZWFJwYjI0Z2IySnFaV04wSUhSdklIUm9aU0JwYm5SbGNtNWhiQ0J0WVhCY2JpQWdJQ0FnSUNBZ2JXRndXM05sYkdWamRHOXlYU0E5SUhKMWJHVnpXMmx1WkdWNFhTNXpkSGxzWlR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdiV0Z3VzNObGJHVmpkRzl5WFM1elpYUlFjbTl3WlhKMGVTaHdjbTl3WlhKMGVTd2dkbUZzZFdVcE8xeHVJQ0FnSUgxY2JpQWdmVnh1ZlR0Y2JseHVUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblJwWlhNb2MzUjViR1Z6YUdWbGRDNXdjbTkwYjNSNWNHVXNJSHRjYmlBZ1pXNWhZbXhsWkRvZ2UxeHVJQ0FnSUdkbGREb2dablZ1WTNScGIyNGdaMlYwS0NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUNGMGFHbHpMbk5vWldWMExtUnBjMkZpYkdWa08xeHVJQ0FnSUgwc1hHNGdJQ0FnYzJWME9pQm1kVzVqZEdsdmJpQnpaWFFvZG1Gc2RXVXBJSHRjYmlBZ0lDQWdJSFJvYVhNdWMyaGxaWFF1WkdsellXSnNaV1FnUFNBaGRtRnNkV1U3WEc0Z0lDQWdmVnh1SUNCOUxGeHVJQ0F2THlCVVQwUlBPaUJqYjI1emFXUmxjaUJ5WlcxdmRtbHVaeUJqYzNOVVpYaDBJQ3NnWTNOeklIQnliM0JsY25ScFpYTWdjMmx1WTJVZ2FTQmtiMjRuZENCMGFXNXJJSFJvWlhrbmNtVWdkR2hoZENCMWMyVm1kV3hjYmlBZ1kzTnpWR1Y0ZERvZ2UxeHVJQ0FnSUM4cUtseHVJQ0FnSUNBZ0tpQkFaR1Z6WXlCSFpYUWdkR2hsSUhOMGVXeGxjMmhsWlhRZ2RHVjRkRnh1SUNBZ0lDQWdLaUJBY21WMGRYSnVJSHRUZEhKcGJtZDlJR056Y3lCMFpYaDBYRzRnSUNBZ0tpOWNiaUFnSUNCblpYUTZJR1oxYm1OMGFXOXVJR2RsZENncElIdGNiaUFnSUNBZ0lIWmhjaUJ0WVhBZ1BTQjBhR2x6TG0xaGNEdGNiaUFnSUNBZ0lIWmhjaUJ5WlhRZ1BTQmJYVHRjYmlBZ0lDQWdJR1p2Y2lBb2RtRnlJSE5sYkdWamRHOXlJR2x1SUcxaGNDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhRdWNIVnphQ2h6Wld4bFkzUnZjaTV5WlhCc1lXTmxLQzhzWEZ4WEwyY3NJRndpTEZ4Y2Jsd2lLU0FySUZ3aUlIdGNYRzVjWEhSY0lpQXJJRzFoY0Z0elpXeGxZM1J2Y2wwdVkzTnpWR1Y0ZEM1eVpYQnNZV05sS0M4N1hGeFhMMmNzSUZ3aU8xeGNibHhjZEZ3aUtTQXJJRndpWEZ4dWZWd2lLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSEpsZEhWeWJpQnlaWFF1YW05cGJpaGNJbHhjYmx3aUtUdGNiaUFnSUNCOVhHNGdJSDBzWEc0Z0lHTnpjem9nZTF4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVCa1pYTmpJRWRsZENCaGJpQnZZbXBsWTNRZ2NtVndjbVZ6Wlc1MGFXNW5JSFJvWlNCamRYSnlaVzUwSUdOemN5QnpkSGxzWlhOY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0UFltcGxZM1I5SUdOemN5QnZZbXBsWTNSY2JpQWdJQ0FxTDF4dUlDQWdJR2RsZERvZ1puVnVZM1JwYjI0Z1oyVjBLQ2tnZTF4dUlDQWdJQ0FnZG1GeUlHMWhjQ0E5SUhSb2FYTXViV0Z3TzF4dUlDQWdJQ0FnZG1GeUlISmxkQ0E5SUh0OU8xeHVJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2MyVnNaV04wYjNJZ2FXNGdiV0Z3S1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJ5ZFd4bFUyVjBJRDBnYldGd1czTmxiR1ZqZEc5eVhUdGNiaUFnSUNBZ0lDQWdjbVYwVzNObGJHVmpkRzl5WFNBOUlIdDlPMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUhKMWJHVlRaWFF1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lDQWdJQ0IyWVhJZ2NISnZjR1Z5ZEhrZ1BTQnlkV3hsVTJWMFcybGRPMXh1SUNBZ0lDQWdJQ0FnSUhKbGRGdHpaV3hsWTNSdmNsMWJjSEp2Y0dWeWRIbGRJRDBnY25Wc1pWTmxkQzVuWlhSUWNtOXdaWEowZVZaaGJIVmxLSEJ5YjNCbGNuUjVLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJSEpsZER0Y2JpQWdJQ0I5WEc0Z0lIMWNibjBwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlITjBlV3hsYzJobFpYUTdYRzVjYmk4cUtpb3ZJSDBwTEZ4dUx5b2dNaUFxTDF4dUx5b3FLaThnS0daMWJtTjBhVzl1S0cxdlpIVnNaU3dnWlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrZ2UxeHVYRzVjSW5WelpTQnpkSEpwWTNSY0lqdGNibHh1WEc0dkx5QmpjM01nWTJ4aGMzTWdjSEpsWm1sNElHWnZjaUIwYUdseklHVnNaVzFsYm5SY2JuWmhjaUJEVEVGVFUxOVFVa1ZHU1ZnZ1BTQmNJbWx5YjE5ZmJXRnlhMlZ5WENJN1hHNWNiaThxS2x4dUlDb2dRR052Ym5OMGNuVmpkRzl5SUcxaGNtdGxjaUJWU1Z4dUlDb2dRSEJoY21GdElIdHpkbWRTYjI5MGZTQnpkbWNnTFNCemRtZFNiMjkwSUc5aWFtVmpkRnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5d2RITWdMU0J2Y0hScGIyNXpYRzRxTDF4dWRtRnlJRzFoY210bGNpQTlJR1oxYm1OMGFXOXVJRzFoY210bGNpaHpkbWNzSUc5d2RITXBJSHRjYmlBZ2RtRnlJR0poYzJWSGNtOTFjQ0E5SUhOMlp5NW5LSHRjYmlBZ0lDQmpiR0Z6Y3pvZ1EweEJVMU5mVUZKRlJrbFlYRzRnSUgwcE8xeHVJQ0JpWVhObFIzSnZkWEF1WTJseVkyeGxLREFzSURBc0lHOXdkSE11Y2l3Z2UxeHVJQ0FnSUdOc1lYTnpPaUJEVEVGVFUxOVFVa1ZHU1ZnZ0t5QmNJbDlmYjNWMFpYSmNJaXhjYmlBZ0lDQm1hV3hzT2lCY0ltNXZibVZjSWl4Y2JpQWdJQ0J6ZEhKdmEyVlhhV1IwYURvZ05TeGNiaUFnSUNCemRISnZhMlU2SUZ3aUl6QXdNRndpWEc0Z0lIMHBPMXh1SUNCaVlYTmxSM0p2ZFhBdVkybHlZMnhsS0RBc0lEQXNJRzl3ZEhNdWNpd2dlMXh1SUNBZ0lHTnNZWE56T2lCRFRFRlRVMTlRVWtWR1NWZ2dLeUJjSWw5ZmFXNXVaWEpjSWl4Y2JpQWdJQ0JtYVd4c09pQmNJbTV2Ym1WY0lpeGNiaUFnSUNCemRISnZhMlZYYVdSMGFEb2dNaXhjYmlBZ0lDQnpkSEp2YTJVNklGd2lJMlptWmx3aVhHNGdJSDBwTzF4dUlDQjBhR2x6TG1jZ1BTQmlZWE5sUjNKdmRYQTdYRzU5TzF4dVhHNXRZWEpyWlhJdWNISnZkRzkwZVhCbElEMGdlMXh1SUNCamIyNXpkSEoxWTNSdmNqb2diV0Z5YTJWeUxGeHVYRzRnSUM4cUtseHVJQ0FnSUNvZ1FHUmxjMk1nYlc5MlpTQnRZWEpyWlhJZ2RHOGdZMlZ1ZEdWeWNHOXBiblFnS0hnc0lIa3BJR0Z1WkNCeVpXUnlZWGRjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQjRJQzBnY0c5cGJuUWdlQ0JqYjI5eVpHbHVZWFJsWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdlU0F0SUhCdmFXNTBJSGtnWTI5dmNtUnBibUYwWlZ4dUlDQXFMMXh1SUNCdGIzWmxPaUJtZFc1amRHbHZiaUJ0YjNabEtIZ3NJSGtwSUh0Y2JpQWdJQ0IwYUdsekxtY3VjMlYwVkhKaGJuTm1iM0p0S0Z3aWRISmhibk5zWVhSbFhDSXNJRnQ0TENCNVhTazdYRzRnSUgxY2JuMDdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnYldGeWEyVnlPMXh1WEc0dktpb3FMeUI5S1N4Y2JpOHFJRE1nS2k5Y2JpOHFLaW92SUNobWRXNWpkR2x2YmlodGIyUjFiR1VzSUdWNGNHOXlkSE1zSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4cElIdGNibHh1WENKMWMyVWdjM1J5YVdOMFhDSTdYRzVjYmx4dWRtRnlJRjkzYUdWbGJDQTlJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTnlrN1hHNWNiblpoY2lCZmQyaGxaV3d5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmZDJobFpXd3BPMXh1WEc1MllYSWdYM05zYVdSbGNpQTlJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTlNrN1hHNWNiblpoY2lCZmMyeHBaR1Z5TWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDNOc2FXUmxjaWs3WEc1Y2JuWmhjaUJmYzNabklEMGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWcyS1R0Y2JseHVkbUZ5SUY5emRtY3lJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZjM1puS1R0Y2JseHVkbUZ5SUY5amIyeHZjaUE5SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b01DazdYRzVjYm5aaGNpQmZZMjlzYjNJeUlEMGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENoZlkyOXNiM0lwTzF4dVhHNTJZWElnWDNOMGVXeGxjMmhsWlhRZ1BTQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLREVwTzF4dVhHNTJZWElnWDNOMGVXeGxjMmhsWlhReUlEMGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENoZmMzUjViR1Z6YUdWbGRDazdYRzVjYm1aMWJtTjBhVzl1SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9iMkpxS1NCN0lISmxkSFZ5YmlCdlltb2dKaVlnYjJKcUxsOWZaWE5OYjJSMWJHVWdQeUJ2WW1vZ09pQjdJR1JsWm1GMWJIUTZJRzlpYWlCOU95QjlYRzVjYm5aaGNpQkZWa1ZPVkY5TlQxVlRSVVJQVjA0Z1BTQmNJbTF2ZFhObFpHOTNibHdpTEZ4dUlDQWdJRVZXUlU1VVgwMVBWVk5GVFU5V1JTQTlJRndpYlc5MWMyVnRiM1psWENJc1hHNGdJQ0FnUlZaRlRsUmZUVTlWVTBWVlVDQTlJRndpYlc5MWMyVjFjRndpTEZ4dUlDQWdJRVZXUlU1VVgxUlBWVU5JVTFSQlVsUWdQU0JjSW5SdmRXTm9jM1JoY25SY0lpeGNiaUFnSUNCRlZrVk9WRjlVVDFWRFNFMVBWa1VnUFNCY0luUnZkV05vYlc5MlpWd2lMRnh1SUNBZ0lFVldSVTVVWDFSUFZVTklSVTVFSUQwZ1hDSjBiM1ZqYUdWdVpGd2lMRnh1SUNBZ0lFVldSVTVVWDFKRlFVUlpVMVJCVkVWZlEwaEJUa2RGSUQwZ1hDSnlaV0ZrZVhOMFlYUmxZMmhoYm1kbFhDSXNYRzRnSUNBZ1VrVkJSRmxUVkVGVVJWOURUMDFRVEVWVVJTQTlJRndpWTI5dGNHeGxkR1ZjSWp0Y2JseHVMeW9xWEc0Z0lDb2dRR1JsYzJNZ2JHbHpkR1Z1SUhSdklHOXVaU0J2Y2lCdGIzSmxJR1YyWlc1MGN5QnZiaUJoYmlCbGJHVnRaVzUwWEc0Z0lDb2dRSEJoY21GdElIdEZiR1Z0Wlc1MGZTQmxiQ0IwWVhKblpYUWdaV3hsYldWdWRGeHVJQ0FxSUVCd1lYSmhiU0I3UVhKeVlYbDlJR1YyWlc1MFRHbHpkQ0IwYUdVZ1pYWmxiblJ6SUhSdklHeHBjM1JsYmlCMGIxeHVJQ0FxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdOaGJHeGlZV05ySUhSb1pTQmxkbVZ1ZENCallXeHNZbUZqYXlCbWRXNWpkR2x2Ymx4dUtpOWNibVoxYm1OMGFXOXVJR3hwYzNSbGJpaGxiQ3dnWlhabGJuUk1hWE4wTENCallXeHNZbUZqYXlrZ2UxeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUdWMlpXNTBUR2x6ZEM1c1pXNW5kR2c3SUdrckt5a2dlMXh1SUNBZ0lHVnNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9aWFpsYm5STWFYTjBXMmxkTENCallXeHNZbUZqYXlrN1hHNGdJSDFjYm4wN1hHNWNiaThxS2x4dUlDQXFJRUJrWlhOaklISmxiVzkyWlNCaGJpQmxkbVZ1ZENCc2FYTjBaVzVsY2lCdmJpQmhiaUJsYkdWdFpXNTBYRzRnSUNvZ1FIQmhjbUZ0SUh0RmJHVnRaVzUwZlNCbGJDQjBZWEpuWlhRZ1pXeGxiV1Z1ZEZ4dUlDQXFJRUJ3WVhKaGJTQjdRWEp5WVhsOUlHVjJaVzUwVEdsemRDQjBhR1VnWlhabGJuUnpJSFJ2SUhKbGJXOTJaVnh1SUNBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHTmhiR3hpWVdOcklIUm9aU0JsZG1WdWRDQmpZV3hzWW1GamF5Qm1kVzVqZEdsdmJseHVLaTljYm1aMWJtTjBhVzl1SUhWdWJHbHpkR1Z1S0dWc0xDQmxkbVZ1ZEV4cGMzUXNJR05oYkd4aVlXTnJLU0I3WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2daWFpsYm5STWFYTjBMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnWld3dWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpaGxkbVZ1ZEV4cGMzUmJhVjBzSUdOaGJHeGlZV05yS1R0Y2JpQWdmVnh1ZlR0Y2JseHVMeW9xWEc0Z0lDb2dRR1JsYzJNZ1kyRnNiQ0JtYmlCallXeHNZbUZqYXlCM2FHVnVJSFJvWlNCd1lXZGxJR1J2WTNWdFpXNTBJR2x6SUhKbFlXUjVYRzRnSUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1kyRnNiR0poWTJzZ1kyRnNiR0poWTJzZ1puVnVZM1JwYjI0Z2RHOGdZbVVnWTJGc2JHVmtYRzRxTDF4dVpuVnVZM1JwYjI0Z2QyaGxibEpsWVdSNUtHTmhiR3hpWVdOcktTQjdYRzRnSUhaaGNpQmZkR2hwY3lBOUlIUm9hWE03WEc0Z0lHbG1JQ2hrYjJOMWJXVnVkQzV5WldGa2VWTjBZWFJsSUQwOUlGSkZRVVJaVTFSQlZFVmZRMDlOVUV4RlZFVXBJSHRjYmlBZ0lDQmpZV3hzWW1GamF5Z3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR3hwYzNSbGJpaGtiMk4xYldWdWRDd2dXMFZXUlU1VVgxSkZRVVJaVTFSQlZFVmZRMGhCVGtkRlhTd2dablZ1WTNScGIyNGdjM1JoZEdWRGFHRnVaMlVvWlNrZ2UxeHVJQ0FnSUNBZ2FXWWdLR1J2WTNWdFpXNTBMbkpsWVdSNVUzUmhkR1VnUFQwZ1VrVkJSRmxUVkVGVVJWOURUMDFRVEVWVVJTa2dlMXh1SUNBZ0lDQWdJQ0JqWVd4c1ltRmpheWdwTzF4dUlDQWdJQ0FnSUNCMWJteHBjM1JsYmloa2IyTjFiV1Z1ZEN3Z1cwVldSVTVVWDFKRlFVUlpVMVJCVkVWZlEwaEJUa2RGWFN3Z2MzUmhkR1ZEYUdGdVoyVXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHBPMXh1SUNCOVhHNTlPMXh1WEc0dktpcGNiaUFnS2lCQVkyOXVjM1J5ZFdOMGIzSWdZMjlzYjNJZ2QyaGxaV3dnYjJKcVpXTjBYRzRnSUNvZ1FIQmhjbUZ0SUh0RmJHVnRaVzUwSUh3Z1UzUnlhVzVuZlNCbGJDQXRJR0VnUkU5TklHVnNaVzFsYm5RZ2IzSWdkR2hsSUVOVFV5QnpaV3hsWTNSdmNpQm1iM0lnWVNCRVQwMGdaV3hsYldWdWRDQjBieUIxYzJVZ1lYTWdZU0JqYjI1MFlXbHVaWElnWm05eUlIUm9aU0JWU1Z4dUlDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnZjSFJ6SUMwZ2IzQjBhVzl1Y3lCbWIzSWdkR2hwY3lCcGJuTjBZVzVqWlZ4dUtpOWNiblpoY2lCamIyeHZjbEJwWTJ0bGNpQTlJR1oxYm1OMGFXOXVJR052Ykc5eVVHbGphMlZ5S0dWc0xDQnZjSFJ6S1NCN1hHNGdJSFpoY2lCZmRHaHBjeklnUFNCMGFHbHpPMXh1WEc0Z0lHOXdkSE1nUFNCdmNIUnpJSHg4SUh0OU8xeHVJQ0F2THlCbGRtVnVkQ0J6ZEc5eVlXZGxJR1p2Y2lCZ2IyNWdJR0Z1WkNCZ2IyWm1ZRnh1SUNCMGFHbHpMbDlsZG1WdWRITWdQU0I3ZlR0Y2JpQWdkR2hwY3k1ZmJXOTFjMlZVWVhKblpYUWdQU0JtWVd4elpUdGNiaUFnZEdocGN5NWZZMjlzYjNKRGFHRnVaMlZCWTNScGRtVWdQU0JtWVd4elpUdGNiaUFnZEdocGN5NWpjM01nUFNCdmNIUnpMbU56Y3lCOGZDQnZjSFJ6TG5OMGVXeGxjeUI4ZkNCMWJtUmxabWx1WldRN1hHNGdJQzh2SUZkaGFYUWdabTl5SUhSb1pTQmtiMk4xYldWdWRDQjBieUJpWlNCeVpXRmtlU3dnZEdobGJpQnBibWwwSUhSb1pTQlZTVnh1SUNCM2FHVnVVbVZoWkhrb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lGOTBhR2x6TWk1ZmFXNXBkQ2hsYkN3Z2IzQjBjeWs3WEc0Z0lIMHBPMXh1ZlR0Y2JseHVZMjlzYjNKUWFXTnJaWEl1Y0hKdmRHOTBlWEJsSUQwZ2UxeHVJQ0JqYjI1emRISjFZM1J2Y2pvZ1kyOXNiM0pRYVdOclpYSXNYRzVjYmlBZ0x5b3FYRzRnSUNBZ0tpQkFaR1Z6WXlCcGJtbDBJSFJvWlNCamIyeHZjaUJ3YVdOclpYSWdWVWxjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdSV3hsYldWdWRDQjhJRk4wY21sdVozMGdaV3dnTFNCaElFUlBUU0JsYkdWdFpXNTBJRzl5SUhSb1pTQkRVMU1nYzJWc1pXTjBiM0lnWm05eUlHRWdSRTlOSUdWc1pXMWxiblFnZEc4Z2RYTmxJR0Z6SUdFZ1kyOXVkR0ZwYm1WeUlHWnZjaUIwYUdVZ1ZVbGNiaUFnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCdmNIUnpJQzBnYjNCMGFXOXVjeUJtYjNJZ2RHaHBjeUJwYm5OMFlXNWpaVnh1SUNBZ0lDb2dRR0ZqWTJWemN5QndjbTkwWldOMFpXUmNiaUFnS2k5Y2JpQWdYMmx1YVhRNklHWjFibU4wYVc5dUlGOXBibWwwS0dWc0xDQnZjSFJ6S1NCN1hHNGdJQ0FnZG1GeUlGOTBhR2x6TXlBOUlIUm9hWE03WEc1Y2JpQWdJQ0F2THlCSlppQmdaV3hnSUdseklHRWdjM1J5YVc1bkxDQjFjMlVnYVhRZ2RHOGdjMlZzWldOMElHRnVJRVZzWlcxbGJuUXNJR1ZzYzJVZ1lYTnpkVzFsSUdsMEozTWdZVzRnWld4bGJXVnVkRnh1SUNBZ0lHVnNJRDBnWENKemRISnBibWRjSWlBOVBTQjBlWEJsYjJZZ1pXd2dQeUJrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtHVnNLU0E2SUdWc08xeHVJQ0FnSUM4dklFWnBibVFnZEdobElIZHBaSFJvSUdGdVpDQm9aV2xuYUhRZ1ptOXlJSFJvWlNCVlNWeHVJQ0FnSUM4dklFbG1JRzV2ZENCa1pXWnBibVZrSUdsdUlIUm9aU0J2Y0hScGIyNXpMQ0IwY25rZ2RHaGxJRWhVVFV3Z2QybGtkR2dnS3lCb1pXbG5hSFFnWVhSMGNtbGlkWFJsY3lCdlppQjBhR1VnZDNKaGNIQmxjaXdnWld4elpTQmtaV1poZFd4MElIUnZJRE15TUZ4dUlDQWdJSFpoY2lCM2FXUjBhQ0E5SUc5d2RITXVkMmxrZEdnZ2ZId2djR0Z5YzJWSmJuUW9aV3d1ZDJsa2RHZ3BJSHg4SURNeU1EdGNiaUFnSUNCMllYSWdhR1ZwWjJoMElEMGdiM0IwY3k1b1pXbG5hSFFnZkh3Z2NHRnljMlZKYm5Rb1pXd3VhR1ZwWjJoMEtTQjhmQ0F6TWpBN1hHNGdJQ0FnTHk4Z1EyRnNZM1ZzWVhSbElHeGhlVzkxZENCMllYSnBZV0pzWlhOY2JpQWdJQ0IyWVhJZ2NHRmtaR2x1WnlBOUlHOXdkSE11Y0dGa1pHbHVaeUFySURJZ2ZId2dOaXhjYmlBZ0lDQWdJQ0FnWW05eVpHVnlWMmxrZEdnZ1BTQnZjSFJ6TG1KdmNtUmxjbGRwWkhSb0lIeDhJREFzWEc0Z0lDQWdJQ0FnSUcxaGNtdGxjbEpoWkdsMWN5QTlJRzl3ZEhNdWJXRnlhMlZ5VW1Ga2FYVnpJSHg4SURnc1hHNGdJQ0FnSUNBZ0lITnNhV1JsY2sxaGNtZHBiaUE5SUc5d2RITXVjMnhwWkdWeVRXRnlaMmx1SUh4OElESTBMRnh1SUNBZ0lDQWdJQ0J6Ykdsa1pYSklaV2xuYUhRZ1BTQnZjSFJ6TG5Oc2FXUmxja2hsYVdkb2RDQjhmQ0J0WVhKclpYSlNZV1JwZFhNZ0tpQXlJQ3NnY0dGa1pHbHVaeUFxSURJZ0t5QmliM0prWlhKWGFXUjBhQ0FxSURJc1hHNGdJQ0FnSUNBZ0lHSnZaSGxYYVdSMGFDQTlJRTFoZEdndWJXbHVLR2hsYVdkb2RDQXRJSE5zYVdSbGNraGxhV2RvZENBdElITnNhV1JsY2sxaGNtZHBiaXdnZDJsa2RHZ3BMRnh1SUNBZ0lDQWdJQ0IzYUdWbGJGSmhaR2wxY3lBOUlHSnZaSGxYYVdSMGFDQXZJRElnTFNCaWIzSmtaWEpYYVdSMGFDeGNiaUFnSUNBZ0lDQWdiR1ZtZEUxaGNtZHBiaUE5SUNoM2FXUjBhQ0F0SUdKdlpIbFhhV1IwYUNrZ0x5QXlPMXh1SUNBZ0lIWmhjaUJ0WVhKclpYSWdQU0I3WEc0Z0lDQWdJQ0J5T2lCdFlYSnJaWEpTWVdScGRYTmNiaUFnSUNCOU8xeHVJQ0FnSUhaaGNpQmliM0prWlhKVGRIbHNaWE1nUFNCN1hHNGdJQ0FnSUNCM09pQmliM0prWlhKWGFXUjBhQ3hjYmlBZ0lDQWdJR052Ykc5eU9pQnZjSFJ6TG1KdmNtUmxja052Ykc5eUlIeDhJRndpSTJabVpsd2lYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lDOHZJRU55WldGMFpTQlZTU0JsYkdWdFpXNTBjMXh1SUNBZ0lIUm9hWE11Wld3Z1BTQmxiRHRjYmlBZ0lDQjBhR2x6TG5OMlp5QTlJRzVsZHlCZmMzWm5NaTVrWldaaGRXeDBLR1ZzTENCM2FXUjBhQ3dnYUdWcFoyaDBLVHRjYmlBZ0lDQjBhR2x6TG5WcElEMGdXMjVsZHlCZmQyaGxaV3d5TG1SbFptRjFiSFFvZEdocGN5NXpkbWNzSUh0Y2JpQWdJQ0FnSUdOWU9pQnNaV1owVFdGeVoybHVJQ3NnWW05a2VWZHBaSFJvSUM4Z01peGNiaUFnSUNBZ0lHTlpPaUJpYjJSNVYybGtkR2dnTHlBeUxGeHVJQ0FnSUNBZ2Nqb2dkMmhsWld4U1lXUnBkWE1zWEc0Z0lDQWdJQ0J5VFdGNE9pQjNhR1ZsYkZKaFpHbDFjeUF0SUNodFlYSnJaWEpTWVdScGRYTWdLeUJ3WVdSa2FXNW5LU3hjYmlBZ0lDQWdJRzFoY210bGNqb2diV0Z5YTJWeUxGeHVJQ0FnSUNBZ1ltOXlaR1Z5T2lCaWIzSmtaWEpUZEhsc1pYTXNYRzRnSUNBZ0lDQnNhV2RvZEc1bGMzTTZJRzl3ZEhNdWQyaGxaV3hNYVdkb2RHNWxjM01nUFQwZ2RXNWtaV1pwYm1Wa0lEOGdkSEoxWlNBNklHOXdkSE11ZDJobFpXeE1hV2RvZEc1bGMzTXNYRzRnSUNBZ0lDQmhiblJwWTJ4dlkydDNhWE5sT2lCdmNIUnpMbUZ1ZEdsamJHOWphM2RwYzJWY2JpQWdJQ0I5S1N3Z2JtVjNJRjl6Ykdsa1pYSXlMbVJsWm1GMWJIUW9kR2hwY3k1emRtY3NJSHRjYmlBZ0lDQWdJSE5zYVdSbGNsUjVjR1U2SUZ3aWRsd2lMRnh1SUNBZ0lDQWdlRG9nYkdWbWRFMWhjbWRwYmlBcklHSnZjbVJsY2xkcFpIUm9MRnh1SUNBZ0lDQWdlVG9nWW05a2VWZHBaSFJvSUNzZ2MyeHBaR1Z5VFdGeVoybHVMRnh1SUNBZ0lDQWdkem9nWW05a2VWZHBaSFJvSUMwZ1ltOXlaR1Z5VjJsa2RHZ2dLaUF5TEZ4dUlDQWdJQ0FnYURvZ2MyeHBaR1Z5U0dWcFoyaDBJQzBnWW05eVpHVnlWMmxrZEdnZ0tpQXlMRnh1SUNBZ0lDQWdjam9nYzJ4cFpHVnlTR1ZwWjJoMElDOGdNaUF0SUdKdmNtUmxjbGRwWkhSb0xGeHVJQ0FnSUNBZ2JXRnlhMlZ5T2lCdFlYSnJaWElzWEc0Z0lDQWdJQ0JpYjNKa1pYSTZJR0p2Y21SbGNsTjBlV3hsYzF4dUlDQWdJSDBwWFR0Y2JpQWdJQ0F2THlCRGNtVmhkR1VnWVc0Z2FYSnZVM1I1YkdWVGFHVmxkQ0JtYjNJZ2RHaHBjeUJqYjJ4dmNsZG9aV1ZzSjNNZ1ExTlRJRzkyWlhKeWFXUmxjMXh1SUNBZ0lIUm9hWE11YzNSNWJHVnphR1ZsZENBOUlHNWxkeUJmYzNSNWJHVnphR1ZsZERJdVpHVm1ZWFZzZENncE8xeHVJQ0FnSUM4dklFTnlaV0YwWlNCaGJpQnBjbTlEYjJ4dmNpQjBieUJ6ZEc5eVpTQjBhR2x6SUdOdmJHOXlWMmhsWld3bmN5QnpaV3hsWTNSbFpDQmpiMnh2Y2x4dUlDQWdJSFJvYVhNdVkyOXNiM0lnUFNCdVpYY2dYMk52Ykc5eU1pNWtaV1poZFd4MEtDazdYRzRnSUNBZ0x5OGdWMmhsYm1WMlpYSWdkR2hsSUhObGJHVmpkR1ZrSUdOdmJHOXlJR05vWVc1blpYTXNJSFJ5YVdkblpYSWdZU0JqYjJ4dmNsZG9aV1ZzSUhWd1pHRjBaU0IwYjI5Y2JpQWdJQ0IwYUdsekxtTnZiRzl5TGw5dmJrTm9ZVzVuWlNBOUlIUm9hWE11WDNWd1pHRjBaUzVpYVc1a0tIUm9hWE1wTzF4dUlDQWdJSFJvYVhNdVkyOXNiM0l1YzJWMEtHOXdkSE11WTI5c2IzSWdmSHdnYjNCMGN5NWtaV1poZFd4MFZtRnNkV1VnZkh3Z1hDSWpabVptWENJcE8xeHVJQ0FnSUM4dklFaGhZMnQ1SUhkdmNtdGhjbTkxYm1RZ1ptOXlJR0VnWTI5MWNHeGxJRzltSUZOaFptRnlhU0JUVmtjZ2RYSnNJR0oxWjNOY2JpQWdJQ0F2THlCVFpXVWdhSFIwY0hNNkx5OW5hWFJvZFdJdVkyOXRMMnBoWVcxbGN5OXBjbTh1YW5NdmFYTnpkV1Z6THpFNFhHNGdJQ0FnTHk4Z1ZFOUVUem9nY0dWeWFHRndjeUJ0WVd0bElIUm9hWE1nWVNCelpYQmxjbUYwWlNCd2JIVm5hVzRzSUdsMEozTWdhR0ZqYTNrZ1lXNWtJSFJoYTJWeklIVndJRzF2Y21VZ2MzQmhZMlVnZEdoaGJpQkpKMjBnYUdGd2NIa2dkMmwwYUZ4dUlDQWdJSFJvYVhNdWIyNG9YQ0pvYVhOMGIzSjVPbk4wWVhSbFEyaGhibWRsWENJc0lHWjFibU4wYVc5dUlDaGlZWE5sS1NCN1hHNGdJQ0FnSUNCZmRHaHBjek11YzNabkxuVndaR0YwWlZWeWJITW9ZbUZ6WlNrN1hHNGdJQ0FnZlNrN1hHNGdJQ0FnTHk4Z1RHbHpkR1Z1SUhSdklHVjJaVzUwYzF4dUlDQWdJR3hwYzNSbGJpaDBhR2x6TG5OMlp5NWxiQ3dnVzBWV1JVNVVYMDFQVlZORlJFOVhUaXdnUlZaRlRsUmZWRTlWUTBoVFZFRlNWRjBzSUhSb2FYTXBPMXh1SUNCOUxGeHVYRzRnSUM4cUtseHVJQ0FnSUNvZ1FHUmxjMk1nZFhCa1lYUmxJSFJvWlNCelpXeGxZM1JsWkNCamIyeHZjbHh1SUNBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHNWxkMVpoYkhWbElDMGdkR2hsSUc1bGR5QklVMVlnZG1Gc2RXVnpYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2IyeGtWbUZzZFdVZ0xTQjBhR1VnYjJ4a0lFaFRWaUIyWVd4MVpYTmNiaUFnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCamFHRnVaMlZ6SUMwZ1ltOXZiR1ZoYm5NZ1ptOXlJR1ZoWTJnZ1NGTldJR05vWVc1dVpXdzZJSFJ5ZFdVZ2FXWWdkR2hsSUc1bGR5QjJZV3gxWlNCcGN5QmthV1ptWlhKbGJuUWdkRzhnZEdobElHOXNaQ0IyWVd4MVpTd2daV3h6WlNCbVlXeHpaVnh1SUNBZ0lDb2dRR0ZqWTJWemN5QndjbTkwWldOMFpXUmNiaUFnS2k5Y2JpQWdYM1Z3WkdGMFpUb2dablZ1WTNScGIyNGdYM1Z3WkdGMFpTaGpiMnh2Y2l3Z1kyaGhibWRsY3lrZ2UxeHVJQ0FnSUhaaGNpQnlaMklnUFNCamIyeHZjaTV5WjJKVGRISnBibWM3WEc0Z0lDQWdkbUZ5SUdOemN5QTlJSFJvYVhNdVkzTnpPMXh1SUNBZ0lDOHZJRXh2YjNBZ2RHaHliM1ZuYUNCbFlXTm9JRlZKSUdWc1pXMWxiblFnWVc1a0lIVndaR0YwWlNCcGRGeHVJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2RHaHBjeTUxYVM1c1pXNW5kR2c3SUdrckt5a2dlMXh1SUNBZ0lDQWdkR2hwY3k1MWFWdHBYUzUxY0dSaGRHVW9ZMjlzYjNJc0lHTm9ZVzVuWlhNcE8xeHVJQ0FnSUgxY2JpQWdJQ0F2THlCVmNHUmhkR1VnZEdobElITjBlV3hsYzJobFpYUWdkRzl2WEc0Z0lDQWdabTl5SUNoMllYSWdjMlZzWldOMGIzSWdhVzRnWTNOektTQjdYRzRnSUNBZ0lDQjJZWElnY0hKdmNHVnlkR2xsY3lBOUlHTnpjMXR6Wld4bFkzUnZjbDA3WEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJ3Y205d0lHbHVJSEJ5YjNCbGNuUnBaWE1wSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV6ZEhsc1pYTm9aV1YwTG5ObGRGSjFiR1VvYzJWc1pXTjBiM0lzSUhCeWIzQXNJSEpuWWlrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQWdJQzh2SUZCeVpYWmxiblFnYVc1bWFXNXBkR1VnYkc5dmNITWdhV1lnZEdobElHTnZiRzl5SUdseklITmxkQ0JwYm5OcFpHVWdZU0JnWTI5c2IzSTZZMmhoYm1kbFlDQmpZV3hzWW1GamExeHVJQ0FnSUdsbUlDZ2hkR2hwY3k1ZlkyOXNiM0pEYUdGdVoyVkJZM1JwZG1VcElIdGNiaUFnSUNBZ0lDOHZJRmRvYVd4bElGOWpiMnh2Y2tOb1lXNW5aVUZqZEdsMlpTQTlJSFJ5ZFdVc0lIUm9hWE1nWlhabGJuUWdZMkZ1Ym05MElHSmxJR1pwY21Wa1hHNGdJQ0FnSUNCMGFHbHpMbDlqYjJ4dmNrTm9ZVzVuWlVGamRHbDJaU0E5SUhSeWRXVTdYRzRnSUNBZ0lDQjBhR2x6TG1WdGFYUW9YQ0pqYjJ4dmNqcGphR0Z1WjJWY0lpd2dZMjlzYjNJc0lHTm9ZVzVuWlhNcE8xeHVJQ0FnSUNBZ2RHaHBjeTVmWTI5c2IzSkRhR0Z1WjJWQlkzUnBkbVVnUFNCbVlXeHpaVHRjYmlBZ0lDQjlYRzRnSUgwc1hHNWNiaUFnTHlvcVhHNGdJQ29nUUdSbGMyTWdVMlYwSUdFZ1kyRnNiR0poWTJzZ1puVnVZM1JwYjI0Z1ptOXlJR0Z1SUdWMlpXNTBYRzRnSUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUdWMlpXNTBWSGx3WlNCVWFHVWdibUZ0WlNCdlppQjBhR1VnWlhabGJuUWdkRzhnYkdsemRHVnVJSFJ2TENCd1lYTnpJRndpS2x3aUlIUnZJR3hwYzNSbGJpQjBieUJoYkd3Z1pYWmxiblJ6WEc0Z0lDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdZMkZzYkdKaFkyc2dWR2hsSUhkaGRHTm9JR05oYkd4aVlXTnJYRzRnSUNvdlhHNGdJRzl1T2lCbWRXNWpkR2x2YmlCdmJpaGxkbVZ1ZEZSNWNHVXNJR05oYkd4aVlXTnJLU0I3WEc0Z0lDQWdkbUZ5SUdWMlpXNTBjeUE5SUhSb2FYTXVYMlYyWlc1MGN6dGNiaUFnSUNBb1pYWmxiblJ6VzJWMlpXNTBWSGx3WlYwZ2ZId2dLR1YyWlc1MGMxdGxkbVZ1ZEZSNWNHVmRJRDBnVzEwcEtTNXdkWE5vS0dOaGJHeGlZV05yS1R0Y2JpQWdmU3hjYmx4dUlDQXZLaXBjYmlBZ0lDQXFJRUJrWlhOaklGSmxiVzkyWlNCaElHTmhiR3hpWVdOcklHWjFibU4wYVc5dUlHWnZjaUJoYmlCbGRtVnVkQ0JoWkdSbFpDQjNhWFJvSUc5dUtDbGNiaUFnSUNBcUlFQndZWEpoYlNCN1UzUnlhVzVuZlNCbGRtVnVkRlI1Y0dVZ1ZHaGxJRzVoYldVZ2IyWWdkR2hsSUdWMlpXNTBYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQmpZV3hzWW1GamF5QlVhR1VnZDJGMFkyZ2dZMkZzYkdKaFkyc2dkRzhnY21WdGIzWmxJR1p5YjIwZ2RHaGxJR1YyWlc1MFhHNGdJQ292WEc0Z0lHOW1aam9nWm5WdVkzUnBiMjRnYjJabUtHVjJaVzUwVkhsd1pTd2dZMkZzYkdKaFkyc3BJSHRjYmlBZ0lDQjJZWElnWlhabGJuUk1hWE4wSUQwZ2RHaHBjeTVmWlhabGJuUnpXMlYyWlc1MFZIbHdaVjA3WEc0Z0lDQWdhV1lnS0dWMlpXNTBUR2x6ZENrZ1pYWmxia3hwYzNRdWMzQnNhV05sS0dWMlpXNTBUR2x6ZEM1cGJtUmxlRTltS0dOaGJHeGlZV05yS1N3Z01TazdYRzRnSUgwc1hHNWNiaUFnTHlvcVhHNGdJQ0FnS2lCQVpHVnpZeUJGYldsMElHRnVJR1YyWlc1MFhHNGdJQ0FnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnWlhabGJuUlVlWEJsSUZSb1pTQnVZVzFsSUc5bUlIUm9aU0JsZG1WdWRDQjBieUJsYldsMFhHNGdJQ0FnS2lCQWNHRnlZVzBnZTBGeWNtRjVmU0JoY21keklHRnljbUY1SUc5bUlHRnlaM01nZEc4Z2NHRnpjeUIwYnlCallXeHNZbUZqYTNOY2JpQWdLaTljYmlBZ1pXMXBkRG9nWm5WdVkzUnBiMjRnWlcxcGRDaGxkbVZ1ZEZSNWNHVXBJSHRjYmlBZ0lDQjJZWElnWlhabGJuUnpJRDBnZEdocGN5NWZaWFpsYm5SekxGeHVJQ0FnSUNBZ0lDQmpZV3hzWW1GamEweHBjM1FnUFNBb1pYWmxiblJ6VzJWMlpXNTBWSGx3WlYwZ2ZId2dXMTBwTG1OdmJtTmhkQ2hsZG1WdWRITmJYQ0lxWENKZElIeDhJRnRkS1R0Y2JseHVJQ0FnSUdadmNpQW9kbUZ5SUY5c1pXNGdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9MQ0JoY21keklEMGdRWEp5WVhrb1gyeGxiaUErSURFZ1B5QmZiR1Z1SUMwZ01TQTZJREFwTENCZmEyVjVJRDBnTVRzZ1gydGxlU0E4SUY5c1pXNDdJRjlyWlhrckt5a2dlMXh1SUNBZ0lDQWdZWEpuYzF0ZmEyVjVJQzBnTVYwZ1BTQmhjbWQxYldWdWRITmJYMnRsZVYwN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCallXeHNZbUZqYTB4cGMzUXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUdOaGJHeGlZV05yVEdsemRGdHBYUzVoY0hCc2VTaHVkV3hzTENCaGNtZHpLVHRjYmlBZ0lDQjlYRzRnSUgwc1hHNWNiaUFnTHlvcVhHNGdJQ0FnS2lCQVpHVnpZeUJFVDAwZ1pYWmxiblFnYUdGdVpHeGxjbHh1SUNBZ0lDb2dRSEJoY21GdElIdEZkbVZ1ZEgwZ1pTQkVUMDBnWlhabGJuUWdLR04xY25KbGJuUnNlU0JsYVhSb1pYSWdiVzkxYzJVZ2IzSWdkRzkxWTJnZ1pYWmxiblJ6S1Z4dUlDQXFMMXh1SUNCb1lXNWtiR1ZGZG1WdWREb2dablZ1WTNScGIyNGdhR0Z1Wkd4bFJYWmxiblFvWlNrZ2UxeHVJQ0FnSUM4dklFUmxkR1ZqZENCcFppQjBhR1VnWlhabGJuUWdhWE1nWVNCMGIzVmphQ0JsZG1WdWRDQmllU0JqYUdWamEybHVaeUJwWmlCcGRDQm9ZWE1nZEdobElHQjBiM1ZqYUdWellDQndjbTl3WlhKMGVWeHVJQ0FnSUM4dklFbG1JR2wwSUdseklHRWdkRzkxWTJnZ1pYWmxiblFzSUhWelpTQjBhR1VnWm1seWMzUWdkRzkxWTJnZ2FXNXdkWFJjYmlBZ0lDQjJZWElnY0c5cGJuUWdQU0JsTG5SdmRXTm9aWE1nUHlCbExtTm9ZVzVuWldSVWIzVmphR1Z6V3pCZElEb2daU3hjYmx4dUlDQWdJQzh2SUVkbGRDQjBhR1VnYzJOeVpXVnVJSEJ2YzJsMGFXOXVJRzltSUhSb1pTQlZTVnh1SUNBZ0lISmxZM1FnUFNCMGFHbHpMbk4yWnk1bGJDNW5aWFJDYjNWdVpHbHVaME5zYVdWdWRGSmxZM1FvS1N4Y2JseHVJQ0FnSUM4dklFTnZiblpsY25RZ2RHaGxJSE5qY21WbGJpMXpjR0ZqWlNCd2IybHVkR1Z5SUhCdmMybDBhVzl1SUhSdklHeHZZMkZzTFhOd1lXTmxYRzRnSUNBZ2VDQTlJSEJ2YVc1MExtTnNhV1Z1ZEZnZ0xTQnlaV04wTG14bFpuUXNYRzRnSUNBZ0lDQWdJSGtnUFNCd2IybHVkQzVqYkdsbGJuUlpJQzBnY21WamRDNTBiM0E3WEc1Y2JpQWdJQ0J6ZDJsMFkyZ2dLR1V1ZEhsd1pTa2dlMXh1SUNBZ0lDQWdZMkZ6WlNCRlZrVk9WRjlOVDFWVFJVUlBWMDQ2WEc0Z0lDQWdJQ0JqWVhObElFVldSVTVVWDFSUFZVTklVMVJCVWxRNlhHNGdJQ0FnSUNBZ0lDOHZJRXh2YjNBZ2RHaHliM1ZuYUNCbFlXTm9JRlZKSUdWc1pXMWxiblFnWVc1a0lHTm9aV05ySUdsbUlIUm9aU0J3YjJsdWRDQmNJbWhwZEhOY0lpQnBkRnh1SUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUhSb2FYTXVkV2t1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lDQWdJQ0IyWVhJZ2RXbEZiR1Z0Wlc1MElEMGdkR2hwY3k1MWFWdHBYVHRjYmlBZ0lDQWdJQ0FnSUNBdkx5QkpaaUIwYUdVZ1pXeGxiV1Z1ZENCcGN5Qm9hWFFzSUhSb2FYTWdiV1ZoYm5NZ2RHaGxJSFZ6WlhJZ2FHRnpJR05zYVdOclpXUWdkR2hsSUdWc1pXMWxiblFnWVc1a0lHbHpJSFJ5ZVdsdVp5QjBieUJwYm5SbGNtRmpkQ0IzYVhSb0lHbDBYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tIVnBSV3hsYldWdWRDNWphR1ZqYTBocGRDaDRMQ0I1S1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1UyVjBJR0Z1SUdsdWRHVnlibUZzSUhKbFptVnlaVzVqWlNCMGJ5QjBhR1VnZFdsRmJHVnRaVzUwSUdKbGFXNW5JR2x1ZEdWeVlXTjBaV1FnZDJsMGFDd2dabTl5SUc5MGFHVnlJR2x1ZEdWeWJtRnNJR1YyWlc1MElHaGhibVJzWlhKelhHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOXRiM1Z6WlZSaGNtZGxkQ0E5SUhWcFJXeGxiV1Z1ZER0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUVGMGRHRmphQ0JsZG1WdWRDQnNhWE4wWlc1bGNuTmNiaUFnSUNBZ0lDQWdJQ0FnSUd4cGMzUmxiaWhrYjJOMWJXVnVkQ3dnVzBWV1JVNVVYMDFQVlZORlRVOVdSU3dnUlZaRlRsUmZWRTlWUTBoTlQxWkZMQ0JGVmtWT1ZGOU5UMVZUUlZWUUxDQkZWa1ZPVkY5VVQxVkRTRVZPUkYwc0lIUm9hWE1wTzF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnUlcxcGRDQnBibkIxZENCemRHRnlkQ0JsZG1WdWRGeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWxiV2wwS0Z3aWFXNXdkWFE2YzNSaGNuUmNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJHYVc1aGJHeDVMQ0IxYzJVZ2RHaGxJSEJ2YzJsMGFXOXVJSFJ2SUhWd1pHRjBaU0IwYUdVZ2NHbGphMlZrSUdOdmJHOXlYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbU52Ykc5eUxtaHpkaUE5SUhSb2FYTXVYMjF2ZFhObFZHRnlaMlYwTG1sdWNIVjBLSGdzSUhrcE8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCaWNtVmhhenRjYmlBZ0lDQWdJR05oYzJVZ1JWWkZUbFJmVFU5VlUwVk5UMVpGT2x4dUlDQWdJQ0FnWTJGelpTQkZWa1ZPVkY5VVQxVkRTRTFQVmtVNlhHNGdJQ0FnSUNBZ0lDOHZJRlZ6WlNCMGFHVWdjRzl6YVhScGIyNGdkRzhnZFhCa1lYUmxJSFJvWlNCd2FXTnJaWElnWTI5c2IzSmNiaUFnSUNBZ0lDQWdkR2hwY3k1amIyeHZjaTVvYzNZZ1BTQjBhR2x6TGw5dGIzVnpaVlJoY21kbGRDNXBibkIxZENoNExDQjVLVHRjYmlBZ0lDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ0lDQmpZWE5sSUVWV1JVNVVYMDFQVlZORlZWQTZYRzRnSUNBZ0lDQmpZWE5sSUVWV1JVNVVYMVJQVlVOSVJVNUVPbHh1SUNBZ0lDQWdJQ0IwYUdsekxsOXRiM1Z6WlZSaGNtZGxkQ0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtVnRhWFFvWENKcGJuQjFkRHBsYm1SY0lpazdYRzRnSUNBZ0lDQWdJSFZ1YkdsemRHVnVLR1J2WTNWdFpXNTBMQ0JiUlZaRlRsUmZUVTlWVTBWTlQxWkZMQ0JGVmtWT1ZGOVVUMVZEU0UxUFZrVXNJRVZXUlU1VVgwMVBWVk5GVlZBc0lFVldSVTVVWDFSUFZVTklSVTVFWFN3Z2RHaHBjeWs3WEc0Z0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9kR2hwY3k1ZmJXOTFjMlZVWVhKblpYUXBJSHRjYmlBZ0lDQWdJR1V1Y0hKbGRtVnVkRVJsWm1GMWJIUW9LVHRjYmlBZ0lDQjlYRzRnSUgxY2JuMDdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWTI5c2IzSlFhV05yWlhJN1hHNWNiaThxS2lvdklIMHBMRnh1THlvZ05DQXFMMXh1THlvcUtpOGdLR1oxYm1OMGFXOXVLRzF2WkhWc1pTd2daWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWtnZTF4dVhHNWNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVYRzUyWVhJZ1gyTnZiRzl5VUdsamEyVnlJRDBnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlnektUdGNibHh1ZG1GeUlGOWpiMnh2Y2xCcFkydGxjaklnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlqYjJ4dmNsQnBZMnRsY2lrN1hHNWNiblpoY2lCZlkyOXNiM0lnUFNCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktEQXBPMXh1WEc1MllYSWdYMk52Ykc5eU1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gyTnZiRzl5S1R0Y2JseHVkbUZ5SUY5emRIbHNaWE5vWldWMElEMGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWd4S1R0Y2JseHVkbUZ5SUY5emRIbHNaWE5vWldWME1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gzTjBlV3hsYzJobFpYUXBPMXh1WEc1bWRXNWpkR2x2YmlCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRzlpYWlrZ2V5QnlaWFIxY200Z2IySnFJQ1ltSUc5aWFpNWZYMlZ6VFc5a2RXeGxJRDhnYjJKcUlEb2dleUJrWldaaGRXeDBPaUJ2WW1vZ2ZUc2dmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUh0Y2JpQWdRMjlzYjNJNklGOWpiMnh2Y2pJdVpHVm1ZWFZzZEN4Y2JpQWdRMjlzYjNKUWFXTnJaWEk2SUY5amIyeHZjbEJwWTJ0bGNqSXVaR1ZtWVhWc2RDeGNiaUFnVTNSNWJHVnphR1ZsZERvZ1gzTjBlV3hsYzJobFpYUXlMbVJsWm1GMWJIUXNYRzRnSUhabGNuTnBiMjQ2SUZ3aU15NHlMakJjSWx4dWZUdGNibHh1THlvcUtpOGdmU2tzWEc0dktpQTFJQ292WEc0dktpb3FMeUFvWm5WdVkzUnBiMjRvYlc5a2RXeGxMQ0JsZUhCdmNuUnpMQ0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS1NCN1hHNWNibHdpZFhObElITjBjbWxqZEZ3aU8xeHVYRzVjYm5aaGNpQmZiV0Z5YTJWeUlEMGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWd5S1R0Y2JseHVkbUZ5SUY5dFlYSnJaWEl5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmYldGeWEyVnlLVHRjYmx4dWRtRnlJRjlqYjJ4dmNpQTlJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTUNrN1hHNWNiblpoY2lCZlkyOXNiM0l5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmWTI5c2IzSXBPMXh1WEc1bWRXNWpkR2x2YmlCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRzlpYWlrZ2V5QnlaWFIxY200Z2IySnFJQ1ltSUc5aWFpNWZYMlZ6VFc5a2RXeGxJRDhnYjJKcUlEb2dleUJrWldaaGRXeDBPaUJ2WW1vZ2ZUc2dmVnh1WEc0dkx5QmpjM01nWTJ4aGMzTWdjSEpsWm1sNElHWnZjaUIwYUdseklHVnNaVzFsYm5SY2JuWmhjaUJEVEVGVFUxOVFVa1ZHU1ZnZ1BTQmNJbWx5YjE5ZmMyeHBaR1Z5WENJN1hHNWNiaThxS2x4dUlDQXFJRUJqYjI1emRISjFZM1J2Y2lCemJHbGtaWElnVlVsY2JpQWdLaUJBY0dGeVlXMGdlM04yWjFKdmIzUjlJSE4yWnlBdElITjJaMUp2YjNRZ2IySnFaV04wWEc0Z0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOXdkSE1nTFNCdmNIUnBiMjV6WEc0cUwxeHVkbUZ5SUhOc2FXUmxjaUE5SUdaMWJtTjBhVzl1SUhOc2FXUmxjaWh6ZG1jc0lHOXdkSE1wSUh0Y2JpQWdkbUZ5SUhJZ1BTQnZjSFJ6TG5Jc1hHNGdJQ0FnSUNCM0lEMGdiM0IwY3k1M0xGeHVJQ0FnSUNBZ2FDQTlJRzl3ZEhNdWFDeGNiaUFnSUNBZ0lIZ2dQU0J2Y0hSekxuZ3NYRzRnSUNBZ0lDQjVJRDBnYjNCMGN5NTVMRnh1SUNBZ0lDQWdZbTl5WkdWeVYybGtkR2dnUFNCdmNIUnpMbUp2Y21SbGNpNTNPMXh1WEc0Z0lDOHZJRndpY21GdVoyVmNJaUJzYVcxcGRITWdhRzkzSUdaaGNpQjBhR1VnYzJ4cFpHVnlKM01nYldGeWEyVnlJR05oYmlCMGNtRjJaV3dzSUdGdVpDQjNhR1Z5WlNCcGRDQnpkRzl3Y3lCaGJtUWdjM1JoY25SeklHRnNiMjVuSUhSb1pTQllJR0Y0YVhOY2JpQWdiM0IwY3k1eVlXNW5aU0E5SUh0Y2JpQWdJQ0J0YVc0NklIZ2dLeUJ5TEZ4dUlDQWdJRzFoZURvZ2VDQXJJSGNnTFNCeUxGeHVJQ0FnSUhjNklIY2dMU0J5SUNvZ01seHVJQ0I5TzF4dVhHNGdJRzl3ZEhNdWMyeHBaR1Z5Vkhsd1pTQTlJRzl3ZEhNdWMyeHBaR1Z5Vkhsd1pTQjhmQ0JjSW5aY0lqdGNibHh1SUNCMGFHbHpMblI1Y0dVZ1BTQmNJbk5zYVdSbGNsd2lPMXh1SUNCMGFHbHpMbDl2Y0hSeklEMGdiM0IwY3p0Y2JseHVJQ0IyWVhJZ2NtRmthWFZ6SUQwZ2NpQXJJR0p2Y21SbGNsZHBaSFJvSUM4Z01qdGNibHh1SUNCMllYSWdZbUZ6WlVkeWIzVndJRDBnYzNabkxtY29lMXh1SUNBZ0lHTnNZWE56T2lCRFRFRlRVMTlRVWtWR1NWaGNiaUFnZlNrN1hHNWNiaUFnZG1GeUlISmxZM1FnUFNCaVlYTmxSM0p2ZFhBdWFXNXpaWEowS0Z3aWNtVmpkRndpTENCN1hHNGdJQ0FnWTJ4aGMzTTZJRU5NUVZOVFgxQlNSVVpKV0NBcklGd2lYMTkyWVd4MVpWd2lMRnh1SUNBZ0lISjRPaUJ5WVdScGRYTXNYRzRnSUNBZ2NuazZJSEpoWkdsMWN5eGNiaUFnSUNCNE9pQjRJQzBnWW05eVpHVnlWMmxrZEdnZ0x5QXlMRnh1SUNBZ0lIazZJSGtnTFNCaWIzSmtaWEpYYVdSMGFDQXZJRElzWEc0Z0lDQWdkMmxrZEdnNklIY2dLeUJpYjNKa1pYSlhhV1IwYUN4Y2JpQWdJQ0JvWldsbmFIUTZJR2dnS3lCaWIzSmtaWEpYYVdSMGFDeGNiaUFnSUNCemRISnZhMlZYYVdSMGFEb2dZbTl5WkdWeVYybGtkR2dzWEc0Z0lDQWdjM1J5YjJ0bE9pQnZjSFJ6TG1KdmNtUmxjaTVqYjJ4dmNseHVJQ0I5S1R0Y2JseHVJQ0J5WldOMExuTmxkRWR5WVdScFpXNTBLRndpWm1sc2JGd2lMQ0J6ZG1jdVozSmhaR2xsYm5Rb1hDSnNhVzVsWVhKY0lpd2dlMXh1SUNBZ0lEQTZJSHNnWTI5c2IzSTZJRndpSXpBd01Gd2lJSDBzWEc0Z0lDQWdNVEF3T2lCN0lHTnZiRzl5T2lCY0lpTm1abVpjSWlCOVhHNGdJSDBwS1R0Y2JseHVJQ0IwYUdsekxsOW5jbUZrYVdWdWRDQTlJSEpsWTNRdVozSmhaR2xsYm5RN1hHNWNiaUFnZEdocGN5NXRZWEpyWlhJZ1BTQnVaWGNnWDIxaGNtdGxjakl1WkdWbVlYVnNkQ2hpWVhObFIzSnZkWEFzSUc5d2RITXViV0Z5YTJWeUtUdGNibjA3WEc1Y2JuTnNhV1JsY2k1d2NtOTBiM1I1Y0dVZ1BTQjdYRzRnSUdOdmJuTjBjblZqZEc5eU9pQnpiR2xrWlhJc1hHNWNiaUFnTHlvcVhHNGdJQ0FnS2lCQVpHVnpZeUIxY0dSaGRHVnpJSFJvYVhNZ1pXeGxiV1Z1ZENCMGJ5QnlaWEJ5WlhObGJuUWdZU0J1WlhjZ1kyOXNiM0lnZG1Gc2RXVmNiaUFnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCamIyeHZjaUF0SUdGdUlHbHliME52Ykc5eUlHOWlhbVZqZENCM2FYUm9JSFJvWlNCdVpYY2dZMjlzYjNJZ2RtRnNkV1ZjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmphR0Z1WjJWeklDMGdZVzRnYjJKcVpXTjBJSFJvWVhRZ1oybDJaWE1nWVNCaWIyOXNaV0Z1SUdadmNpQmxZV05vSUVoVFZpQmphR0Z1Ym1Wc0xDQnBibVJwWTJGMGFXNW5JSGRvWlhSb1pYSWdiM1FnYm05MElIUm9ZWFFnWTJoaGJtNWxiQ0JvWVhNZ1kyaGhibWRsWkZ4dUlDQXFMMXh1SUNCMWNHUmhkR1U2SUdaMWJtTjBhVzl1SUhWd1pHRjBaU2hqYjJ4dmNpd2dZMmhoYm1kbGN5a2dlMXh1SUNBZ0lIWmhjaUJ2Y0hSeklEMGdkR2hwY3k1ZmIzQjBjenRjYmlBZ0lDQjJZWElnY21GdVoyVWdQU0J2Y0hSekxuSmhibWRsTzF4dUlDQWdJSFpoY2lCb2MzWWdQU0JqYjJ4dmNpNW9jM1k3WEc0Z0lDQWdkbUZ5SUdoemJDQTlJRjlqYjJ4dmNqSXVaR1ZtWVhWc2RDNW9jM1l5U0hOc0tIc2dhRG9nYUhOMkxtZ3NJSE02SUdoemRpNXpMQ0IyT2lBeE1EQWdmU2s3WEc0Z0lDQWdhV1lnS0c5d2RITXVjMnhwWkdWeVZIbHdaU0E5UFNCY0luWmNJaWtnZTF4dUlDQWdJQ0FnYVdZZ0tHTm9ZVzVuWlhNdWFDQjhmQ0JqYUdGdVoyVnpMbk1wSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVmWjNKaFpHbGxiblF1YzNSdmNITmJNVjB1YzJWMFFYUjBjbk1vZXlCemRHOXdRMjlzYjNJNklGd2lhSE5zS0Z3aUlDc2dhSE5zTG1nZ0t5QmNJaXhjSWlBcklHaHpiQzV6SUNzZ1hDSWxMRndpSUNzZ2FITnNMbXdnS3lCY0lpVXBYQ0lnZlNrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9ZMmhoYm1kbGN5NTJLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQndaWEpqWlc1MElEMGdhSE4yTG5ZZ0x5QXhNREE3WEc0Z0lDQWdJQ0FnSUhSb2FYTXViV0Z5YTJWeUxtMXZkbVVvY21GdVoyVXViV2x1SUNzZ2NHVnlZMlZ1ZENBcUlISmhibWRsTG5jc0lHOXdkSE11ZVNBcklHOXdkSE11YUNBdklESXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlN4Y2JseHVJQ0F2S2lwY2JpQWdJQ0FxSUVCa1pYTmpJRlJoYTJWeklHRWdjRzlwYm5RZ1lYUWdLSGdzSUhrcElHRnVaQ0J5WlhSMWNtNXpJRWhUVmlCMllXeDFaWE1nWW1GelpXUWdiMjRnZEdocGN5QnBibkIxZENBdExTQjFjMlVnZEdocGN5QjBieUIxY0dSaGRHVWdZU0JqYjJ4dmNpQm1jbTl0SUcxdmRYTmxJR2x1Y0hWMFhHNGdJQ0FnS2lCQWNHRnlZVzBnZTA1MWJXSmxjbjBnZUNBdElIQnZhVzUwSUhnZ1kyOXZjbVJwYm1GMFpWeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUhrZ0xTQndiMmx1ZENCNUlHTnZiM0prYVc1aGRHVmNiaUFnSUNBcUlFQnlaWFIxY200Z2UwOWlhbVZqZEgwZ0xTQnVaWGNnU0ZOV0lHTnZiRzl5SUhaaGJIVmxjeUFvYzI5dFpTQmphR0Z1Ym1Wc2N5QnRZWGtnWW1VZ2JXbHpjMmx1WnlsY2JpQWdLaTljYmlBZ2FXNXdkWFE2SUdaMWJtTjBhVzl1SUdsdWNIVjBLSGdzSUhrcElIdGNiaUFnSUNCMllYSWdiM0IwY3lBOUlIUm9hWE11WDI5d2RITTdYRzRnSUNBZ2RtRnlJSEpoYm1kbElEMGdiM0IwY3k1eVlXNW5aVHRjYmlBZ0lDQjJZWElnWkdsemRDQTlJRTFoZEdndWJXRjRLRTFoZEdndWJXbHVLSGdzSUhKaGJtZGxMbTFoZUNrc0lISmhibWRsTG0xcGJpa2dMU0J5WVc1blpTNXRhVzQ3WEc0Z0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lIWTZJRTFoZEdndWNtOTFibVFvTVRBd0lDOGdjbUZ1WjJVdWR5QXFJR1JwYzNRcFhHNGdJQ0FnZlR0Y2JpQWdmU3hjYmx4dUlDQXZLaXBjYmlBZ0lDQXFJRUJrWlhOaklFTm9aV05ySUdsbUlHRWdjRzlwYm5RZ1lYUWdLSGdzSUhrcElHbHpJR2x1YzJsa1pTQjBhR2x6SUdWc1pXMWxiblJjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQjRJQzBnY0c5cGJuUWdlQ0JqYjI5eVpHbHVZWFJsWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdlU0F0SUhCdmFXNTBJSGtnWTI5dmNtUnBibUYwWlZ4dUlDQWdJQ29nUUhKbGRIVnliaUI3UW05dmJHVmhibjBnTFNCMGNuVmxJR2xtSUhSb1pTQndiMmx1ZENCcGN5QmhJRndpYUdsMFhDSXNJR1ZzYzJVZ1ptRnNjMlZjYmlBZ0tpOWNiaUFnWTJobFkydElhWFE2SUdaMWJtTjBhVzl1SUdOb1pXTnJTR2wwS0hnc0lIa3BJSHRjYmlBZ0lDQjJZWElnYjNCMGN5QTlJSFJvYVhNdVgyOXdkSE03WEc0Z0lDQWdjbVYwZFhKdUlIZ2dQaUJ2Y0hSekxuZ2dKaVlnZUNBOElHOXdkSE11ZUNBcklHOXdkSE11ZHlBbUppQjVJRDRnYjNCMGN5NTVJQ1ltSUhrZ1BDQnZjSFJ6TG5rZ0t5QnZjSFJ6TG1nN1hHNGdJSDFjYmx4dWZUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0J6Ykdsa1pYSTdYRzVjYmk4cUtpb3ZJSDBwTEZ4dUx5b2dOaUFxTDF4dUx5b3FLaThnS0daMWJtTjBhVzl1S0cxdlpIVnNaU3dnWlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrZ2UxeHVYRzVjSW5WelpTQnpkSEpwWTNSY0lqdGNibHh1WEc1MllYSWdSMUpCUkVsRlRsUmZTVTVFUlZnZ1BTQXdPMXh1ZG1GeUlFZFNRVVJKUlU1VVgxTlZSa1pKV0NBOUlGd2lSM0poWkdsbGJuUmNJanRjYm5aaGNpQlRWa2RmVGtGTlJWTlFRVU5GSUQwZ1hDSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMloxd2lPMXh1ZG1GeUlGTldSMTlCVkZSU1NVSlZWRVZmVTBoUFVsUklRVTVFVXlBOUlIdGNiaUFnWTJ4aGMzTTZJRndpWTJ4aGMzTmNJaXhjYmlBZ2MzUnliMnRsT2lCY0luTjBjbTlyWlZ3aUxGeHVJQ0J6ZEhKdmEyVlhhV1IwYURvZ1hDSnpkSEp2YTJVdGQybGtkR2hjSWl4Y2JpQWdabWxzYkRvZ1hDSm1hV3hzWENJc1hHNGdJRzl3WVdOcGRIazZJRndpYjNCaFkybDBlVndpTEZ4dUlDQnZabVp6WlhRNklGd2liMlptYzJWMFhDSXNYRzRnSUhOMGIzQkRiMnh2Y2pvZ1hDSnpkRzl3TFdOdmJHOXlYQ0lzWEc0Z0lITjBiM0JQY0dGamFYUjVPaUJjSW5OMGIzQXRiM0JoWTJsMGVWd2lYRzU5TzF4dUx5OGdWRTlFVHpvZ1ptbG5kWEpsSUc5MWRDQjNhSGtnZEdobGMyVWdZWEpsYmlkMElHSmxhVzVuSUdOdmJYQnlaWE56WldRZ2NISnZjR1Z5YkhrL1hHNTJZWElnVTFaSFgxUlNRVTVUUms5U1RWOVRTRTlTVkVoQlRrUlRJRDBnZTF4dUlDQjBjbUZ1YzJ4aGRHVTZJRndpYzJWMFZISmhibk5zWVhSbFhDSXNYRzRnSUhOallXeGxPaUJjSW5ObGRGTmpZV3hsWENJc1hHNGdJSEp2ZEdGMFpUb2dYQ0p6WlhSU2IzUmhkR1ZjSWx4dWZUdGNiaTh2SUhOdWFXWm1JSFZ6WlhKaFoyVnVkQ0J6ZEhKcGJtY2dkRzhnWTJobFkyc2dhV1lnZEdobElIVnpaWElnYVhNZ2NuVnVibWx1WnlCSlJTd2dSV1JuWlNCdmNpQlRZV1poY21sY2JuWmhjaUIxWVNBOUlIZHBibVJ2ZHk1dVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MExuUnZURzkzWlhKRFlYTmxLQ2s3WEc1MllYSWdTVk5mU1VVZ1BTQXZiWE5wWlh4MGNtbGtaVzUwZkdWa1oyVXZMblJsYzNRb2RXRXBPMXh1ZG1GeUlFbFRYMU5CUmtGU1NTQTlJQzllS0NnL0lXTm9jbTl0Wlh4aGJtUnliMmxrS1M0cEtuTmhabUZ5YVM5cExuUmxjM1FvZFdFcE8xeHVMeW9xWEc0Z0lDb2dRR052Ym5OMGNuVmpkRzl5SUhOMlp5QmxiR1Z0Wlc1MElIZHlZWEJ3WlhKY2JpQWdLaUJBY0dGeVlXMGdlM04yWjFKdmIzUjlJSEp2YjNRZ0xTQnpkbWRTYjI5MElHOWlhbVZqZEZ4dUlDQXFJRUJ3WVhKaGJTQjdjM1puUld4bGJXVnVkQ0I4SUVWc1pXMWxiblI5SUhCaGNtVnVkQ0F0SUhCaGNtVnVkQ0J1YjJSbElGeHVJQ0FxSUVCd1lYSmhiU0I3VTNSeWFXNW5mU0IwZVhCbElDMGdaV3hsYldWdWRDQjBZV2NnYm1GdFpWeHVJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JoZEhSeWN5QXRJR1ZzWlcxbGJuUWdZWFIwY21saWRYUmxjMXh1S2k5Y2JuWmhjaUJ6ZG1kRmJHVnRaVzUwSUQwZ1puVnVZM1JwYjI0Z2MzWm5SV3hsYldWdWRDaHliMjkwTENCd1lYSmxiblFzSUhSNWNHVXNJR0YwZEhKektTQjdYRzRnSUhaaGNpQmxiQ0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUk9VeWhUVmtkZlRrRk5SVk5RUVVORkxDQjBlWEJsS1R0Y2JpQWdkR2hwY3k1bGJDQTlJR1ZzTzF4dUlDQjBhR2x6TG5ObGRFRjBkSEp6S0dGMGRISnpLVHRjYmlBZ0tIQmhjbVZ1ZEM1bGJDQjhmQ0J3WVhKbGJuUXBMbUZ3Y0dWdVpFTm9hV3hrS0dWc0tUdGNiaUFnZEdocGN5NWZjbTl2ZENBOUlISnZiM1E3WEc0Z0lIUm9hWE11WDNOMloxUnlZVzV6Wm05eWJYTWdQU0I3ZlR0Y2JpQWdkR2hwY3k1ZmRISmhibk5tYjNKdFRHbHpkQ0E5SUdWc0xuUnlZVzV6Wm05eWJTQS9JR1ZzTG5SeVlXNXpabTl5YlM1aVlYTmxWbUZzSURvZ1ptRnNjMlU3WEc1OU8xeHVYRzV6ZG1kRmJHVnRaVzUwTG5CeWIzUnZkSGx3WlNBOUlIdGNiaUFnWTI5dWMzUnlkV04wYjNJNklITjJaMFZzWlcxbGJuUXNYRzVjYmlBZ0x5b3FYRzRnSUNBZ0tpQkFaR1Z6WXlCcGJuTmxjblFnWVNCdVpYY2djM1puUld4bGJXVnVkRnh1SUNBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlIUjVjR1VnTFNCbGJHVnRaVzUwSUhSaFp5QnVZVzFsWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdZWFIwY25NZ0xTQmxiR1Z0Wlc1MElHRjBkSEpwWW5WMFpYTmNiaUFnS2k5Y2JpQWdhVzV6WlhKME9pQm1kVzVqZEdsdmJpQnBibk5sY25Rb2RIbHdaU3dnWVhSMGNuTXBJSHRjYmlBZ0lDQnlaWFIxY200Z2JtVjNJSE4yWjBWc1pXMWxiblFvZEdocGN5NWZjbTl2ZEN3Z2RHaHBjeXdnZEhsd1pTd2dZWFIwY25NcE8xeHVJQ0I5TEZ4dVhHNGdJQzhxS2x4dUlDQWdJQ29nUUdSbGMyTWdjMmh2Y25Sb1lXNWtJSFJ2SUdsdWMyVnlkQ0JoSUc1bGR5Qm5jbTkxY0NCemRtZEZiR1Z0Wlc1MFhHNGdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWVhSMGNuTWdMU0JsYkdWdFpXNTBJR0YwZEhKcFluVjBaWE5jYmlBZ0tpOWNiaUFnWnpvZ1puVnVZM1JwYjI0Z1p5aGhkSFJ5Y3lrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxtbHVjMlZ5ZENoY0ltZGNJaXdnWVhSMGNuTXBPMXh1SUNCOUxGeHVYRzRnSUM4cUtseHVJQ0FnSUNvZ1FHUmxjMk1nYzJodmNuUm9ZVzVrSUhSdklHbHVjMlZ5ZENCaElHNWxkeUJoY21NZ2MzWm5SV3hsYldWdWRGeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUdONElDMGdZWEpqSUdObGJuUmxjaUI0WEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdZM2tnTFNCaGNtTWdZMlZ1ZEdWeUlIbGNiaUFnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCeVlXUnBkWE1nTFNCaGNtTWdjbUZrYVhWelhHNGdJQ0FnS2lCQWNHRnlZVzBnZTA1MWJXSmxjbjBnYzNSaGNuUkJibWRzWlNBdElHRnlZeUJ6ZEdGeWRDQmhibWRzWlNBb2FXNGdaR1ZuY21WbGN5bGNiaUFnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCbGJtUkJibWRzWlNBdElHRnlZeUJsYm1RZ1lXNW5iR1VnS0dsdUlHUmxaM0psWlhNcFhHNGdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWVhSMGNuTWdMU0JsYkdWdFpXNTBJR0YwZEhKcFluVjBaWE5jYmlBZ0tpOWNiaUFnWVhKak9pQm1kVzVqZEdsdmJpQmhjbU1vWTNnc0lHTjVMQ0J5WVdScGRYTXNJSE4wWVhKMFFXNW5iR1VzSUdWdVpFRnVaMnhsTENCaGRIUnljeWtnZTF4dUlDQWdJSFpoY2lCc1lYSm5aVUZ5WTBac1lXY2dQU0JsYm1SQmJtZHNaU0F0SUhOMFlYSjBRVzVuYkdVZ1BEMGdNVGd3SUQ4Z01DQTZJREU3WEc0Z0lDQWdjM1JoY25SQmJtZHNaU0FxUFNCTllYUm9MbEJKSUM4Z01UZ3dPMXh1SUNBZ0lHVnVaRUZ1WjJ4bElDbzlJRTFoZEdndVVFa2dMeUF4T0RBN1hHNGdJQ0FnZG1GeUlIZ3hJRDBnWTNnZ0t5QnlZV1JwZFhNZ0tpQk5ZWFJvTG1OdmN5aGxibVJCYm1kc1pTa3NYRzRnSUNBZ0lDQWdJSGt4SUQwZ1kza2dLeUJ5WVdScGRYTWdLaUJOWVhSb0xuTnBiaWhsYm1SQmJtZHNaU2tzWEc0Z0lDQWdJQ0FnSUhneUlEMGdZM2dnS3lCeVlXUnBkWE1nS2lCTllYUm9MbU52Y3loemRHRnlkRUZ1WjJ4bEtTeGNiaUFnSUNBZ0lDQWdlVElnUFNCamVTQXJJSEpoWkdsMWN5QXFJRTFoZEdndWMybHVLSE4wWVhKMFFXNW5iR1VwTzF4dUlDQWdJR0YwZEhKeklEMGdZWFIwY25NZ2ZId2dlMzA3WEc0Z0lDQWdZWFIwY25NdVpDQTlJRnRjSWsxY0lpd2dlREVzSUhreExDQmNJa0ZjSWl3Z2NtRmthWFZ6TENCeVlXUnBkWE1zSURBc0lHeGhjbWRsUVhKalJteGhaeXdnTUN3Z2VESXNJSGt5WFM1cWIybHVLRndpSUZ3aUtUdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NXBibk5sY25Rb1hDSndZWFJvWENJc0lHRjBkSEp6S1R0Y2JpQWdmU3hjYmx4dUlDQXZLaXBjYmlBZ0lDQXFJRUJrWlhOaklITm9iM0owYUdGdVpDQjBieUJwYm5ObGNuUWdZU0J1WlhjZ1kybHlZMnhsSUhOMlowVnNaVzFsYm5SY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JqZUNBdElHTnBjbU5zWlNCalpXNTBaWElnZUZ4dUlDQWdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJR041SUMwZ1kybHlZMnhsSUdObGJuUmxjaUI1WEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdjbUZrYVhWeklDMGdZMmx5WTJ4bElISmhaR2wxYzF4dUlDQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR0YwZEhKeklDMGdaV3hsYldWdWRDQmhkSFJ5YVdKMWRHVnpYRzRnSUNvdlhHNGdJR05wY21Oc1pUb2dablZ1WTNScGIyNGdZMmx5WTJ4bEtHTjRMQ0JqZVN3Z2NtRmthWFZ6TENCaGRIUnljeWtnZTF4dUlDQWdJR0YwZEhKeklEMGdZWFIwY25NZ2ZId2dlMzA3WEc0Z0lDQWdZWFIwY25NdVkzZ2dQU0JqZUR0Y2JpQWdJQ0JoZEhSeWN5NWplU0E5SUdONU8xeHVJQ0FnSUdGMGRISnpMbklnUFNCeVlXUnBkWE03WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11YVc1elpYSjBLRndpWTJseVkyeGxYQ0lzSUdGMGRISnpLVHRjYmlBZ2ZTeGNibHh1SUNBdktpcGNiaUFnSUNBcUlFQmtaWE5qSUhObGRDQmhJSEp2ZEdGMFpTOTBjbUZ1YzJ4aGRHVXZjMk5oYkdVZ2RISmhibk5tYjNKdElHOXVJSFJvYVhNZ1pXeGxiV1Z1ZEZ4dUlDQWdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJSFI1Y0dVZ0xTQjBjbUZ1YzJadmNtMGdLSEp2ZEdGMFpTQjhJSFJ5WVc1emJHRjBaU0I4SUhOallXeGxLVnh1SUNBZ0lDb2dRSEJoY21GdElIdEJjbkpoZVgwZ1lYSm5jeUF0SUhSeVlXNXpabTl5YlNCMllXeDFaWE5jYmlBZ0tpOWNiaUFnYzJWMFZISmhibk5tYjNKdE9pQm1kVzVqZEdsdmJpQnpaWFJVY21GdWMyWnZjbTBvZEhsd1pTd2dZWEpuY3lrZ2UxeHVJQ0FnSUdsbUlDZ2hTVk5mU1VVcElIdGNiaUFnSUNBZ0lIWmhjaUIwY21GdWMyWnZjbTBzSUhSeVlXNXpabTl5YlVadU8xeHVJQ0FnSUNBZ2RtRnlJSE4yWjFSeVlXNXpabTl5YlhNZ1BTQjBhR2x6TGw5emRtZFVjbUZ1YzJadmNtMXpPMXh1SUNBZ0lDQWdhV1lnS0NGemRtZFVjbUZ1YzJadmNtMXpXM1I1Y0dWZEtTQjdYRzRnSUNBZ0lDQWdJSFJ5WVc1elptOXliU0E5SUhSb2FYTXVYM0p2YjNRdVpXd3VZM0psWVhSbFUxWkhWSEpoYm5ObWIzSnRLQ2s3WEc0Z0lDQWdJQ0FnSUhOMloxUnlZVzV6Wm05eWJYTmJkSGx3WlYwZ1BTQjBjbUZ1YzJadmNtMDdYRzRnSUNBZ0lDQWdJSFJvYVhNdVgzUnlZVzV6Wm05eWJVeHBjM1F1WVhCd1pXNWtTWFJsYlNoMGNtRnVjMlp2Y20wcE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ2RISmhibk5tYjNKdElEMGdjM1puVkhKaGJuTm1iM0p0YzF0MGVYQmxYVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSFJ5WVc1elptOXliVVp1SUQwZ2RIbHdaU0JwYmlCVFZrZGZWRkpCVGxOR1QxSk5YMU5JVDFKVVNFRk9SRk1nUHlCVFZrZGZWRkpCVGxOR1QxSk5YMU5JVDFKVVNFRk9SRk5iZEhsd1pWMGdPaUIwZVhCbE8xeHVJQ0FnSUNBZ2RISmhibk5tYjNKdFczUnlZVzV6Wm05eWJVWnVYUzVoY0hCc2VTaDBjbUZ1YzJadmNtMHNJR0Z5WjNNcE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0F2THlCTmFXTnliM052Wm5RZ2MzUnBiR3dnWTJGdUozUWdiV0ZyWlNCaElIZGxZaUJpY205M2MyVnlJSFJvWVhRZ1lXTjBkV0ZzYkhrZ2QyOXlhM01zSUdGeklITjFZMmdzSUVWa1oyVWdLeUJKUlNCa2IyNTBJR2x0Y0d4bGJXVnVkQ0JUVmtjZ2RISmhibk5tYjNKdGN5QndjbTl3WlhKc2VTNWNiaUFnSUNBZ0lDOHZJRmRsSUdoaGRtVWdkRzhnWm05eVkyVWdkR2hsYlNCcGJuTjBaV0ZrTGk0dUlHZGxaWHBjYmlBZ0lDQWdJSFJvYVhNdWMyVjBRWFIwY25Nb2V5QmNJblJ5WVc1elptOXliVndpT2lCMGVYQmxJQ3NnWENJb1hDSWdLeUJoY21kekxtcHZhVzRvWENJc0lGd2lLU0FySUZ3aUtWd2lJSDBwTzF4dUlDQWdJSDFjYmlBZ2ZTeGNibHh1SUNBdktpcGNiaUFnSUNBcUlFQmtaWE5qSUhObGRDQmhkSFJ5YVdKMWRHVnpJRzl1SUhSb2FYTWdaV3hsYldWdWRGeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdGMGRISnpJQzBnWld4bGJXVnVkQ0JoZEhSeWFXSjFkR1Z6WEc0Z0lDb3ZYRzRnSUhObGRFRjBkSEp6T2lCbWRXNWpkR2x2YmlCelpYUkJkSFJ5Y3loaGRIUnljeWtnZTF4dUlDQWdJR1p2Y2lBb2RtRnlJR0YwZEhJZ2FXNGdZWFIwY25NcElIdGNiaUFnSUNBZ0lIWmhjaUJ1WVcxbElEMGdZWFIwY2lCcGJpQlRWa2RmUVZSVVVrbENWVlJGWDFOSVQxSlVTRUZPUkZNZ1B5QlRWa2RmUVZSVVVrbENWVlJGWDFOSVQxSlVTRUZPUkZOYllYUjBjbDBnT2lCaGRIUnlPMXh1SUNBZ0lDQWdkR2hwY3k1bGJDNXpaWFJCZEhSeWFXSjFkR1VvYm1GdFpTd2dZWFIwY25OYllYUjBjbDBwTzF4dUlDQWdJSDFjYmlBZ2ZTeGNibHh1SUNCelpYUkhjbUZrYVdWdWREb2dablZ1WTNScGIyNGdjMlYwUjNKaFpHbGxiblFvWVhSMGNpd2daM0poWkdsbGJuUXBJSHRjYmlBZ0lDQjJZWElnWVhSMGNuTWdQU0I3ZlR0Y2JpQWdJQ0JoZEhSeWMxdGhkSFJ5WFNBOUlHZHlZV1JwWlc1MExtZGxkRlZ5YkNncE8xeHVJQ0FnSUdkeVlXUnBaVzUwTGw5eVpXWnpXMkYwZEhKZElEMGdkR2hwY3p0Y2JpQWdJQ0IwYUdsekxtZHlZV1JwWlc1MElEMGdaM0poWkdsbGJuUTdYRzRnSUNBZ2RHaHBjeTV6WlhSQmRIUnljeWhoZEhSeWN5azdYRzRnSUgxY2JuMDdYRzVjYmk4cUtseHVJQ0FxSUVCamIyNXpkSEoxWTNSdmNpQnpkbWNnWjNKaFpHbGxiblFnZDNKaGNIQmxjbHh1SUNBcUlFQndZWEpoYlNCN2MzWm5VbTl2ZEgwZ2NtOXZkQ0F0SUhOMloxSnZiM1FnYjJKcVpXTjBYRzRnSUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUhSNWNHVWdMU0JuY21Ga2FXVnVkQ0IwZVhCbElDaHNhVzVsWVhJZ2ZDQnlZV1JwWVd3cFhHNGdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSE4wYjNCeklDMGdaM0poWkdsbGJuUWdjM1J2Y0hNZ1BTQjdZMjlzYjNJc0lHOXdZV05wZEhsOUlHdGxlV1ZrSUdKNUlHOW1abk5sZENCMllXeDFaVnh1S2k5Y2JuWmhjaUJ6ZG1kSGNtRmthV1Z1ZENBOUlHWjFibU4wYVc5dUlITjJaMGR5WVdScFpXNTBLSEp2YjNRc0lIUjVjR1VzSUhOMGIzQnpLU0I3WEc0Z0lIWmhjaUJ6ZEc5d1JXeGxiV1Z1ZEhNZ1BTQmJYVHRjYmlBZ2RtRnlJR2R5WVdScFpXNTBJRDBnY205dmRDNWZaR1ZtY3k1cGJuTmxjblFvZEhsd1pTQXJJRWRTUVVSSlJVNVVYMU5WUmtaSldDd2dlMXh1SUNBZ0lHbGtPaUJjSW1seWIxd2lJQ3NnUjFKQlJFbEZUbFJmVTFWR1JrbFlJQ3NnUjFKQlJFbEZUbFJmU1U1RVJWZ3JLMXh1SUNCOUtUdGNiaUFnWm05eUlDaDJZWElnYjJabWMyVjBJR2x1SUhOMGIzQnpLU0I3WEc0Z0lDQWdkbUZ5SUhOMGIzQWdQU0J6ZEc5d2MxdHZabVp6WlhSZE8xeHVJQ0FnSUhOMGIzQkZiR1Z0Wlc1MGN5NXdkWE5vS0dkeVlXUnBaVzUwTG1sdWMyVnlkQ2hjSW5OMGIzQmNJaXdnZTF4dUlDQWdJQ0FnYjJabWMyVjBPaUJ2Wm1aelpYUWdLeUJjSWlWY0lpeGNiaUFnSUNBZ0lITjBiM0JEYjJ4dmNqb2djM1J2Y0M1amIyeHZjaXhjYmlBZ0lDQWdJSE4wYjNCUGNHRmphWFI1T2lCemRHOXdMbTl3WVdOcGRIa2dQVDA5SUhWdVpHVm1hVzVsWkNBL0lERWdPaUJ6ZEc5d0xtOXdZV05wZEhsY2JpQWdJQ0I5S1NrN1hHNGdJSDFjYmlBZ2RHaHBjeTVsYkNBOUlHZHlZV1JwWlc1MExtVnNPMXh1SUNCMGFHbHpMbk4wYjNCeklEMGdjM1J2Y0VWc1pXMWxiblJ6TzF4dUlDQjBhR2x6TGw5eVpXWnpJRDBnZTMwN1hHNTlPMXh1WEc1emRtZEhjbUZrYVdWdWRDNXdjbTkwYjNSNWNHVXVaMlYwVlhKc0lEMGdablZ1WTNScGIyNGdLR0poYzJVcElIdGNiaUFnZG1GeUlISnZiM1FnUFNCSlUxOVRRVVpCVWtrZ1B5QmlZWE5sSUh4OElIZHBibVJ2ZHk1c2IyTmhkR2x2Ymk1b2NtVm1JRG9nWENKY0lqdGNiaUFnY21WMGRYSnVJRndpZFhKc0tGd2lJQ3NnY205dmRDQXJJRndpSTF3aUlDc2dkR2hwY3k1bGJDNXBaQ0FySUZ3aUtWd2lPMXh1ZlR0Y2JseHVMeW9xWEc0Z0lDb2dRR052Ym5OMGNuVmpkRzl5SUhOMlp5QnliMjkwSUdWc1pXMWxiblFnS0dsdWFHVnlhWFJ6SUhOMlowVnNaVzFsYm5RcFhHNGdJQ29nUUhCaGNtRnRJSHR6ZG1kRmJHVnRaVzUwSUh3Z1JXeGxiV1Z1ZEgwZ2NHRnlaVzUwSUMwZ2NHRnlaVzUwSUc1dlpHVWdYRzRnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUhkcFpIUm9JQzBnYzNabklIZHBaSFJvWEc0Z0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHaGxhV2RvZENBdElITjJaeUJvWldsbmFIUmNiaW92WEc1MllYSWdjM1puVW05dmRDQTlJR1oxYm1OMGFXOXVJSE4yWjFKdmIzUW9jR0Z5Wlc1MExDQjNhV1IwYUN3Z2FHVnBaMmgwS1NCN1hHNGdJSE4yWjBWc1pXMWxiblF1WTJGc2JDaDBhR2x6TENCMGFHbHpMQ0J3WVhKbGJuUXNJRndpYzNablhDSXNJSHNnZDJsa2RHZzZJSGRwWkhSb0xDQm9aV2xuYUhRNklHaGxhV2RvZEN3Z2MzUjViR1U2SUZ3aVpHbHpjR3hoZVRwaWJHOWphMXdpSUgwcE8xeHVJQ0IwYUdsekxsOWtaV1p6SUQwZ2RHaHBjeTVwYm5ObGNuUW9YQ0prWldaelhDSXBPMXh1SUNCMGFHbHpMbDluY21Ga2FXVnVkSE1nUFNCYlhUdGNibjA3WEc1Y2JuTjJaMUp2YjNRdWNISnZkRzkwZVhCbElEMGdUMkpxWldOMExtTnlaV0YwWlNoemRtZEZiR1Z0Wlc1MExuQnliM1J2ZEhsd1pTazdYRzV6ZG1kU2IyOTBMbkJ5YjNSdmRIbHdaUzVqYjI1emRISjFZM1J2Y2lBOUlITjJaMUp2YjNRN1hHNXpkbWRTYjI5MExuQnliM1J2ZEhsd1pTNW5jbUZrYVdWdWRDQTlJR1oxYm1OMGFXOXVJQ2gwZVhCbExDQnpkRzl3Y3lrZ2UxeHVJQ0IyWVhJZ1ozSmhaR2xsYm5RZ1BTQnVaWGNnYzNablIzSmhaR2xsYm5Rb2RHaHBjeXdnZEhsd1pTd2djM1J2Y0hNcE8xeHVJQ0IwYUdsekxsOW5jbUZrYVdWdWRITXVjSFZ6YUNobmNtRmthV1Z1ZENrN1hHNGdJSEpsZEhWeWJpQm5jbUZrYVdWdWREdGNibjA3WEc1emRtZFNiMjkwTG5CeWIzUnZkSGx3WlM1MWNHUmhkR1ZWY214eklEMGdablZ1WTNScGIyNGdLR0poYzJVcElIdGNiaUFnYVdZZ0tFbFRYMU5CUmtGU1NTa2dlMXh1SUNBZ0lIWmhjaUJuY21Ga2FXVnVkSE1nUFNCMGFHbHpMbDluY21Ga2FXVnVkSE03WEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JuY21Ga2FXVnVkSE11YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCbmNtRmthV1Z1ZEhOYmFWMHVYM0psWm5NcElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUdGMGRISnpJRDBnZTMwN1hHNGdJQ0FnSUNBZ0lHRjBkSEp6VzJ0bGVWMGdQU0JuY21Ga2FXVnVkSE5iYVYwdVoyVjBWWEpzS0dKaGMyVXBPMXh1SUNBZ0lDQWdJQ0JuY21Ga2FXVnVkSE5iYVYwdVgzSmxabk5iYTJWNVhTNXpaWFJCZEhSeWN5aGhkSFJ5Y3lrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlYRzU5TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlITjJaMUp2YjNRN1hHNWNiaThxS2lvdklIMHBMRnh1THlvZ055QXFMMXh1THlvcUtpOGdLR1oxYm1OMGFXOXVLRzF2WkhWc1pTd2daWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWtnZTF4dVhHNWNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVYRzUyWVhJZ1gyMWhjbXRsY2lBOUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9NaWs3WEc1Y2JuWmhjaUJmYldGeWEyVnlNaUE5SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9YMjFoY210bGNpazdYRzVjYm1aMWJtTjBhVzl1SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9iMkpxS1NCN0lISmxkSFZ5YmlCdlltb2dKaVlnYjJKcUxsOWZaWE5OYjJSMWJHVWdQeUJ2WW1vZ09pQjdJR1JsWm1GMWJIUTZJRzlpYWlCOU95QjlYRzVjYmk4dklHTnpjeUJqYkdGemN5QndjbVZtYVhnZ1ptOXlJSFJvYVhNZ1pXeGxiV1Z1ZEZ4dWRtRnlJRU5NUVZOVFgxQlNSVVpKV0NBOUlGd2lhWEp2WDE5M2FHVmxiRndpTzF4dUx5OGdVWFZwWTJzZ2NtVm1aWEpsYm1ObGN5QjBieUJ5WlhWelpXUWdiV0YwYUNCbWRXNWpkR2x2Ym5OY2JuWmhjaUJRU1NBOUlFMWhkR2d1VUVrc1hHNGdJQ0FnYzNGeWRDQTlJRTFoZEdndWMzRnlkQ3hjYmlBZ0lDQmhZbk1nUFNCTllYUm9MbUZpY3l4Y2JpQWdJQ0J5YjNWdVpDQTlJRTFoZEdndWNtOTFibVE3WEc1Y2JpOHFLbHh1SUNBcUlFQmpiMjV6ZEhKMVkzUnZjaUJvZFdVZ2QyaGxaV3dnVlVsY2JpQWdLaUJBY0dGeVlXMGdlM04yWjFKdmIzUjlJSE4yWnlBdElITjJaMUp2YjNRZ2IySnFaV04wWEc0Z0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOXdkSE1nTFNCdmNIUnBiMjV6WEc0cUwxeHVkbUZ5SUhkb1pXVnNJRDBnWm5WdVkzUnBiMjRnZDJobFpXd29jM1puTENCdmNIUnpLU0I3WEc0Z0lIUm9hWE11WDI5d2RITWdQU0J2Y0hSek8xeHVJQ0IwYUdsekxuUjVjR1VnUFNCY0luZG9aV1ZzWENJN1hHNWNiaUFnZG1GeUlHTlpJRDBnYjNCMGN5NWpXU3hjYmlBZ0lDQWdJR05ZSUQwZ2IzQjBjeTVqV0N4Y2JpQWdJQ0FnSUhJZ1BTQnZjSFJ6TG5Jc1hHNGdJQ0FnSUNCaWIzSmtaWElnUFNCdmNIUnpMbUp2Y21SbGNqdGNibHh1SUNCMllYSWdZbUZ6WlVkeWIzVndJRDBnYzNabkxtY29lMXh1SUNBZ0lHTnNZWE56T2lCRFRFRlRVMTlRVWtWR1NWaGNiaUFnZlNrN1hHNWNiaUFnWW1GelpVZHliM1Z3TG1OcGNtTnNaU2hqV0N3Z1kxa3NJSElnS3lCaWIzSmtaWEl1ZHlBdklESXNJSHRjYmlBZ0lDQmpiR0Z6Y3pvZ1EweEJVMU5mVUZKRlJrbFlJQ3NnWENKZlgySnZjbVJsY2x3aUxGeHVJQ0FnSUdacGJHdzZJRndpSTJabVpsd2lMRnh1SUNBZ0lITjBjbTlyWlRvZ1ltOXlaR1Z5TG1OdmJHOXlMRnh1SUNBZ0lITjBjbTlyWlZkcFpIUm9PaUJpYjNKa1pYSXVkMXh1SUNCOUtUdGNibHh1SUNCMllYSWdjbWx1WjBkeWIzVndJRDBnWW1GelpVZHliM1Z3TG1jb2UxeHVJQ0FnSUdOc1lYTnpPaUJEVEVGVFUxOVFVa1ZHU1ZnZ0t5QmNJbDlmYUhWbFhDSXNYRzRnSUNBZ2MzUnliMnRsVjJsa2RHZzZJSElzWEc0Z0lDQWdabWxzYkRvZ1hDSnViMjVsWENKY2JpQWdmU2s3WEc1Y2JpQWdabTl5SUNoMllYSWdhSFZsSUQwZ01Ec2dhSFZsSUR3Z016WXdPeUJvZFdVckt5a2dlMXh1SUNBZ0lISnBibWRIY205MWNDNWhjbU1vWTFnc0lHTlpMQ0J5SUM4Z01pd2dhSFZsTENCb2RXVWdLeUF4TGpVc0lIdGNiaUFnSUNBZ0lITjBjbTlyWlRvZ1hDSm9jMndvWENJZ0t5QW9iM0IwY3k1aGJuUnBZMnh2WTJ0M2FYTmxJRDhnTXpZd0lDMGdhSFZsSURvZ2FIVmxLU0FySUZ3aUxERXdNQ1VzTlRBbEtWd2lYRzRnSUNBZ2ZTazdYRzRnSUgxY2JseHVJQ0IyWVhJZ2MyRjBkWEpoZEdsdmJpQTlJR0poYzJWSGNtOTFjQzVqYVhKamJHVW9ZMWdzSUdOWkxDQnlMQ0I3WEc0Z0lDQWdZMnhoYzNNNklFTk1RVk5UWDFCU1JVWkpXQ0FySUZ3aVgxOXpZWFIxY21GMGFXOXVYQ0pjYmlBZ2ZTazdYRzVjYmlBZ2MyRjBkWEpoZEdsdmJpNXpaWFJIY21Ga2FXVnVkQ2hjSW1acGJHeGNJaXdnYzNabkxtZHlZV1JwWlc1MEtGd2ljbUZrYVdGc1hDSXNJSHRjYmlBZ0lDQXdPaUI3WEc0Z0lDQWdJQ0JqYjJ4dmNqb2dYQ0lqWm1abVhDSmNiaUFnSUNCOUxGeHVJQ0FnSURFd01Eb2dlMXh1SUNBZ0lDQWdZMjlzYjNJNklGd2lJMlptWmx3aUxGeHVJQ0FnSUNBZ2IzQmhZMmwwZVRvZ01GeHVJQ0FnSUgxY2JpQWdmU2twTzF4dVhHNGdJSFJvYVhNdVgyeHBaMmgwYm1WemN5QTlJR0poYzJWSGNtOTFjQzVqYVhKamJHVW9ZMWdzSUdOWkxDQnlMQ0I3WEc0Z0lDQWdZMnhoYzNNNklFTk1RVk5UWDFCU1JVWkpXQ0FySUZ3aVgxOXNhV2RvZEc1bGMzTmNJaXhjYmlBZ0lDQnZjR0ZqYVhSNU9pQXdYRzRnSUgwcE8xeHVYRzRnSUhSb2FYTXViV0Z5YTJWeUlEMGdibVYzSUY5dFlYSnJaWEl5TG1SbFptRjFiSFFvWW1GelpVZHliM1Z3TENCdmNIUnpMbTFoY210bGNpazdYRzU5TzF4dVhHNTNhR1ZsYkM1d2NtOTBiM1I1Y0dVZ1BTQjdYRzRnSUdOdmJuTjBjblZqZEc5eU9pQjNhR1ZsYkN4Y2JseHVJQ0F2S2lwY2JpQWdJQ0FxSUVCa1pYTmpJSFZ3WkdGMFpYTWdkR2hwY3lCbGJHVnRaVzUwSUhSdklISmxjSEpsYzJWdWRDQmhJRzVsZHlCamIyeHZjaUIyWVd4MVpWeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdOdmJHOXlJQzBnWVc0Z2FYSnZRMjlzYjNJZ2IySnFaV04wSUhkcGRHZ2dkR2hsSUc1bGR5QmpiMnh2Y2lCMllXeDFaVnh1SUNBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHTm9ZVzVuWlhNZ0xTQmhiaUJ2WW1wbFkzUWdkR2hoZENCbmFYWmxjeUJoSUdKdmIyeGxZVzRnWm05eUlHVmhZMmdnU0ZOV0lHTm9ZVzV1Wld3c0lHbHVaR2xqWVhScGJtY2dkMmhsZEdobGNpQnZkQ0J1YjNRZ2RHaGhkQ0JqYUdGdWJtVnNJR2hoY3lCamFHRnVaMlZrWEc0Z0lDb3ZYRzRnSUhWd1pHRjBaVG9nWm5WdVkzUnBiMjRnZFhCa1lYUmxLR052Ykc5eUxDQmphR0Z1WjJWektTQjdYRzRnSUNBZ2RtRnlJRzl3ZEhNZ1BTQjBhR2x6TGw5dmNIUnpPMXh1SUNBZ0lIWmhjaUJvYzNZZ1BTQmpiMnh2Y2k1b2MzWTdYRzRnSUNBZ0x5OGdTV1lnZEdobElGWWdZMmhoYm01bGJDQm9ZWE1nWTJoaGJtZGxaQ3dnY21Wa2NtRjNJSFJvWlNCM2FHVmxiQ0JWU1NCM2FYUm9JSFJvWlNCdVpYY2dkbUZzZFdWY2JpQWdJQ0JwWmlBb1kyaGhibWRsY3k1MklDWW1JRzl3ZEhNdWJHbG5hSFJ1WlhOektTQjdYRzRnSUNBZ0lDQjBhR2x6TGw5c2FXZG9kRzVsYzNNdWMyVjBRWFIwY25Nb2V5QnZjR0ZqYVhSNU9pQW9NU0F0SUdoemRpNTJJQzhnTVRBd0tTNTBiMFpwZUdWa0tESXBJSDBwTzF4dUlDQWdJSDFjYmlBZ0lDQXZMeUJKWmlCMGFHVWdTQ0J2Y2lCVElHTm9ZVzV1Wld3Z2FHRnpJR05vWVc1blpXUXNJRzF2ZG1VZ2RHaGxJRzFoY210bGNpQjBieUIwYUdVZ2NtbG5hSFFnY0c5emFYUnBiMjVjYmlBZ0lDQnBaaUFvWTJoaGJtZGxjeTVvSUh4OElHTm9ZVzVuWlhNdWN5a2dlMXh1SUNBZ0lDQWdMeThnWTI5dWRtVnlkQ0IwYUdVZ2FIVmxJSFpoYkhWbElIUnZJSEpoWkdsaGJuTXNJSE5wYm1ObElIZGxKMnhzSUhWelpTQnBkQ0JoY3lCaGJpQmhibWRzWlZ4dUlDQWdJQ0FnZG1GeUlHaDFaVUZ1WjJ4bElEMGdLRzl3ZEhNdVlXNTBhV05zYjJOcmQybHpaU0EvSURNMk1DQXRJR2h6ZGk1b0lEb2dhSE4yTG1ncElDb2dLRkJKSUM4Z01UZ3dLVHRjYmlBZ0lDQWdJQzh2SUdOdmJuWmxjblFnZEdobElITmhkSFZ5WVhScGIyNGdkbUZzZFdVZ2RHOGdZU0JrYVhOMFlXNWpaU0JpWlhSM1pXVnVJSFJvWlNCalpXNTBaWElnYjJZZ2RHaGxJSEpwYm1jZ1lXNWtJSFJvWlNCbFpHZGxYRzRnSUNBZ0lDQjJZWElnWkdsemRDQTlJR2h6ZGk1eklDOGdNVEF3SUNvZ2IzQjBjeTV5VFdGNE8xeHVJQ0FnSUNBZ0x5OGdUVzkyWlNCMGFHVWdiV0Z5YTJWeUlHSmhjMlZrSUc5dUlIUm9aU0JoYm1kc1pTQmhibVFnWkdsemRHRnVZMlZjYmlBZ0lDQWdJSFJvYVhNdWJXRnlhMlZ5TG0xdmRtVW9iM0IwY3k1aldDQXJJR1JwYzNRZ0tpQk5ZWFJvTG1OdmN5aG9kV1ZCYm1kc1pTa3NJRzl3ZEhNdVkxa2dLeUJrYVhOMElDb2dUV0YwYUM1emFXNG9hSFZsUVc1bmJHVXBLVHRjYmlBZ0lDQjlYRzRnSUgwc1hHNWNiaUFnTHlvcVhHNGdJQ0FnS2lCQVpHVnpZeUJVWVd0bGN5QmhJSEJ2YVc1MElHRjBJQ2g0TENCNUtTQmhibVFnY21WMGRYSnVjeUJJVTFZZ2RtRnNkV1Z6SUdKaGMyVmtJRzl1SUhSb2FYTWdhVzV3ZFhRZ0xTMGdkWE5sSUhSb2FYTWdkRzhnZFhCa1lYUmxJR0VnWTI5c2IzSWdabkp2YlNCdGIzVnpaU0JwYm5CMWRGeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUhnZ0xTQndiMmx1ZENCNElHTnZiM0prYVc1aGRHVmNiaUFnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCNUlDMGdjRzlwYm5RZ2VTQmpiMjl5WkdsdVlYUmxYRzRnSUNBZ0tpQkFjbVYwZFhKdUlIdFBZbXBsWTNSOUlDMGdibVYzSUVoVFZpQmpiMnh2Y2lCMllXeDFaWE1nS0hOdmJXVWdZMmhoYm01bGJITWdiV0Y1SUdKbElHMXBjM05wYm1jcFhHNGdJQ292WEc0Z0lHbHVjSFYwT2lCbWRXNWpkR2x2YmlCcGJuQjFkQ2g0TENCNUtTQjdYRzRnSUNBZ2RtRnlJRzl3ZEhNZ1BTQjBhR2x6TGw5dmNIUnpMRnh1SUNBZ0lDQWdJQ0J5WVc1blpVMWhlQ0E5SUc5d2RITXVjazFoZUN4Y2JpQWdJQ0FnSUNBZ1gzZ2dQU0J2Y0hSekxtTllJQzBnZUN4Y2JpQWdJQ0FnSUNBZ1gza2dQU0J2Y0hSekxtTlpJQzBnZVR0Y2JseHVJQ0FnSUhaaGNpQmhibWRzWlNBOUlFMWhkR2d1WVhSaGJqSW9YM2tzSUY5NEtTeGNibHh1SUNBZ0lDOHZJRU5oYkdOMWJHRjBaU0IwYUdVZ2FIVmxJR0o1SUdOdmJuWmxjblJwYm1jZ2RHaGxJR0Z1WjJ4bElIUnZJSEpoWkdsaGJuTmNiaUFnSUNCb2RXVWdQU0J5YjNWdVpDaGhibWRzWlNBcUlDZ3hPREFnTHlCUVNTa3BJQ3NnTVRnd0xGeHVYRzRnSUNBZ0x5OGdSbWx1WkNCMGFHVWdjRzlwYm5RbmN5QmthWE4wWVc1alpTQm1jbTl0SUhSb1pTQmpaVzUwWlhJZ2IyWWdkR2hsSUhkb1pXVnNYRzRnSUNBZ0x5OGdWR2hwY3lCcGN5QjFjMlZrSUhSdklITm9iM2NnZEdobElITmhkSFZ5WVhScGIyNGdiR1YyWld4Y2JpQWdJQ0JrYVhOMElEMGdUV0YwYUM1dGFXNG9jM0Z5ZENoZmVDQXFJRjk0SUNzZ1gza2dLaUJmZVNrc0lISmhibWRsVFdGNEtUdGNibHh1SUNBZ0lHaDFaU0E5SUc5d2RITXVZVzUwYVdOc2IyTnJkMmx6WlNBL0lETTJNQ0F0SUdoMVpTQTZJR2gxWlR0Y2JseHVJQ0FnSUM4dklGSmxkSFZ5YmlCcWRYTjBJSFJvWlNCSUlHRnVaQ0JUSUdOb1lXNXVaV3h6TENCMGFHVWdkMmhsWld3Z1pXeGxiV1Z1ZENCa2IyVnpiaWQwSUdSdklHRnVlWFJvYVc1bklIZHBkR2dnZEdobElFd2dZMmhoYm01bGJGeHVJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0JvT2lCb2RXVXNYRzRnSUNBZ0lDQnpPaUJ5YjNWdVpDZ3hNREFnTHlCeVlXNW5aVTFoZUNBcUlHUnBjM1FwWEc0Z0lDQWdmVHRjYmlBZ2ZTeGNibHh1SUNBdktpcGNiaUFnSUNBcUlFQmtaWE5qSUVOb1pXTnJJR2xtSUdFZ2NHOXBiblFnWVhRZ0tIZ3NJSGtwSUdseklHbHVjMmxrWlNCMGFHbHpJR1ZzWlcxbGJuUmNiaUFnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCNElDMGdjRzlwYm5RZ2VDQmpiMjl5WkdsdVlYUmxYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2VTQXRJSEJ2YVc1MElIa2dZMjl2Y21ScGJtRjBaVnh1SUNBZ0lDb2dRSEpsZEhWeWJpQjdRbTl2YkdWaGJuMGdMU0IwY25WbElHbG1JSFJvWlNCd2IybHVkQ0JwY3lCaElGd2lhR2wwWENJc0lHVnNjMlVnWm1Gc2MyVmNiaUFnS2k5Y2JpQWdZMmhsWTJ0SWFYUTZJR1oxYm1OMGFXOXVJR05vWldOclNHbDBLSGdzSUhrcElIdGNiaUFnSUNCMllYSWdiM0IwY3lBOUlIUm9hWE11WDI5d2RITTdYRzVjYmlBZ0lDQXZMeUJEYUdWamF5QnBaaUIwYUdVZ2NHOXBiblFnYVhNZ2QybDBhR2x1SUhSb1pTQm9kV1VnY21sdVp5QmllU0JqYjIxd1lYSnBibWNnZEdobElIQnZhVzUwSjNNZ1pHbHpkR0Z1WTJVZ1puSnZiU0IwYUdVZ1kyVnVkSEpsSUhSdklIUm9aU0J5YVc1bkozTWdjbUZrYVhWelhHNGdJQ0FnTHk4Z1NXWWdkR2hsSUdScGMzUmhibU5sSUdseklITnRZV3hzWlhJZ2RHaGhiaUIwYUdVZ2NtRmthWFZ6TENCMGFHVnVJSGRsSUdoaGRtVWdZU0JvYVhSY2JpQWdJQ0IyWVhJZ1pIZ2dQU0JoWW5Nb2VDQXRJRzl3ZEhNdVkxZ3BMRnh1SUNBZ0lDQWdJQ0JrZVNBOUlHRmljeWg1SUMwZ2IzQjBjeTVqV1NrN1hHNGdJQ0FnY21WMGRYSnVJSE54Y25Rb1pIZ2dLaUJrZUNBcklHUjVJQ29nWkhrcElEd2diM0IwY3k1eU8xeHVJQ0I5WEc1OU8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSGRvWldWc08xeHVYRzR2S2lvcUx5QjlLVnh1THlvcUtpb3FLaThnWFNrN1hHNTlLVHRjYmk4dkl5QnpiM1Z5WTJWTllYQndhVzVuVlZKTVBXbHlieTVxY3k1dFlYQWlYWDA9In0=
