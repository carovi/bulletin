(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var iro = require("iro.js");
var colorCheckerInterval = void 0;
var colorIsChanging = false;

var colorPickerElem = document.getElementById("color-picker-container");
var colorPicker = new iro.ColorPicker(colorPickerElem, {
  width: 320,
  height: 320,
  color: "#fff"
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb2xvcnMuanMiLCJub2RlX21vZHVsZXMvaXJvLmpzL2Rpc3QvaXJvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLE1BQU0sUUFBUSxRQUFSLENBQVY7QUFDQSxJQUFJLDZCQUFKO0FBQ0EsSUFBSSxrQkFBa0IsS0FBdEI7O0FBRUEsSUFBSSxrQkFBa0IsU0FBUyxjQUFULENBQXdCLHdCQUF4QixDQUF0QjtBQUNBLElBQUksY0FBYyxJQUFJLElBQUksV0FBUixDQUFvQixlQUFwQixFQUFxQztBQUNyRCxTQUFPLEdBRDhDO0FBRXJELFVBQVEsR0FGNkM7QUFHckQsU0FBTztBQUg4QyxDQUFyQyxDQUFsQjs7QUFNQSxZQUFZLEVBQVosQ0FBZSxjQUFmLEVBQStCLFVBQVMsS0FBVCxFQUFnQixPQUFoQixFQUF5QjtBQUN0RCxTQUFPLElBQVAsQ0FBWSxjQUFaLEVBQTRCLE1BQU0sU0FBbEM7QUFDQSxXQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLGVBQXBCLEdBQXNDLE1BQU0sU0FBNUM7QUFDRCxDQUhEOztBQUtBLFNBQVMsU0FBVCxDQUFtQixFQUFuQixFQUF1QixLQUF2QixFQUE2QjtBQUMzQixXQUFTLGNBQVQsQ0FBd0IsRUFBeEIsRUFBNEIsS0FBNUIsQ0FBa0MsZUFBbEMsR0FBb0QsTUFBTSxLQUExRDtBQUNEOztBQUVELFNBQVMsVUFBVCxDQUFvQixFQUFwQixFQUF3QixLQUF4QixFQUE4QjtBQUM1QixXQUFTLGNBQVQsQ0FBd0IsRUFBeEIsRUFBNEIsS0FBNUIsQ0FBa0MsS0FBbEMsR0FBMEMsTUFBTSxLQUFoRDtBQUNEOzs7QUN0QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxldCBpcm8gPSByZXF1aXJlKFwiaXJvLmpzXCIpO1xubGV0IGNvbG9yQ2hlY2tlckludGVydmFsO1xudmFyIGNvbG9ySXNDaGFuZ2luZyA9IGZhbHNlO1xuXG5sZXQgY29sb3JQaWNrZXJFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1waWNrZXItY29udGFpbmVyXCIpXG5sZXQgY29sb3JQaWNrZXIgPSBuZXcgaXJvLkNvbG9yUGlja2VyKGNvbG9yUGlja2VyRWxlbSwge1xuICB3aWR0aDogMzIwLFxuICBoZWlnaHQ6IDMyMCxcbiAgY29sb3I6IFwiI2ZmZlwiXG59KTtcblxuY29sb3JQaWNrZXIub24oXCJjb2xvcjpjaGFuZ2VcIiwgZnVuY3Rpb24oY29sb3IsIGNoYW5nZXMpIHtcbiAgc29ja2V0LmVtaXQoJ2NvbG9yIGNoYW5nZScsIGNvbG9yLmhleFN0cmluZyk7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3IuaGV4U3RyaW5nXG59KTtcblxuZnVuY3Rpb24gc2V0QmdUb0lkKGlkLCBjb2xvcil7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNcIiArIGNvbG9yXG59XG5cbmZ1bmN0aW9uIHNldFR4dFRvSWQoaWQsIGNvbG9yKXtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnN0eWxlLmNvbG9yID0gXCIjXCIgKyBjb2xvclxufVxuIiwiLyohXG4gKiBpcm8uanMgdjMuMi4wXG4gKiAyMDE2LTIwMTcgSmFtZXMgRGFuaWVsXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGdpdGh1Yi5jb20vamFhbWVzL2lyby5qc1xuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJpcm9cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiaXJvXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyBcdFx0XHRcdGdldDogZ2V0dGVyXG4vKioqKioqLyBcdFx0XHR9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIHJvdW5kID0gTWF0aC5yb3VuZCxcbiAgICBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIFRPRE86IGNvbXBhcmUocmdiLCBoc3YsIGhzbCkgKyBjbG9uZSBtZXRob2RzXG5cbi8qKlxuICAqIEBkZXNjIGNvbnZlcnQgaHN2IG9iamVjdCB0byByZ2JcbiAgKiBAcGFyYW0ge09iamVjdH0gaHN2IC0gaHN2IG9iamVjdFxuICAqIEByZXR1cm4ge09iamVjdH0gcmdiIG9iamVjdFxuKi9cbmZ1bmN0aW9uIGhzdjJSZ2IoaHN2KSB7XG4gIHZhciByLCBnLCBiLCBpLCBmLCBwLCBxLCB0O1xuICB2YXIgaCA9IGhzdi5oIC8gMzYwLFxuICAgICAgcyA9IGhzdi5zIC8gMTAwLFxuICAgICAgdiA9IGhzdi52IC8gMTAwO1xuICBpID0gZmxvb3IoaCAqIDYpO1xuICBmID0gaCAqIDYgLSBpO1xuICBwID0gdiAqICgxIC0gcyk7XG4gIHEgPSB2ICogKDEgLSBmICogcyk7XG4gIHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XG4gIHN3aXRjaCAoaSAlIDYpIHtcbiAgICBjYXNlIDA6XG4gICAgICByID0gdiwgZyA9IHQsIGIgPSBwO2JyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIHIgPSBxLCBnID0gdiwgYiA9IHA7YnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgciA9IHAsIGcgPSB2LCBiID0gdDticmVhaztcbiAgICBjYXNlIDM6XG4gICAgICByID0gcCwgZyA9IHEsIGIgPSB2O2JyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIHIgPSB0LCBnID0gcCwgYiA9IHY7YnJlYWs7XG4gICAgY2FzZSA1OlxuICAgICAgciA9IHYsIGcgPSBwLCBiID0gcTticmVhaztcbiAgfVxuICByZXR1cm4geyByOiByb3VuZChyICogMjU1KSwgZzogcm91bmQoZyAqIDI1NSksIGI6IHJvdW5kKGIgKiAyNTUpIH07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjb252ZXJ0IHJnYiBvYmplY3QgdG8gaHN2XG4gICogQHBhcmFtIHtPYmplY3R9IHJnYiAtIHJnYiBvYmplY3RcbiAgKiBAcmV0dXJuIHtPYmplY3R9IGhzdiBvYmplY3RcbiovXG5mdW5jdGlvbiByZ2IySHN2KHJnYikge1xuICAvLyBNb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9iZ3JpbnMvVGlueUNvbG9yL2Jsb2IvbWFzdGVyL3Rpbnljb2xvci5qcyNMNDQ2XG4gIHZhciByID0gcmdiLnIgLyAyNTUsXG4gICAgICBnID0gcmdiLmcgLyAyNTUsXG4gICAgICBiID0gcmdiLmIgLyAyNTUsXG4gICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgZGVsdGEgPSBtYXggLSBtaW4sXG4gICAgICBodWU7XG4gIHN3aXRjaCAobWF4KSB7XG4gICAgY2FzZSBtaW46XG4gICAgICBodWUgPSAwO2JyZWFrO1xuICAgIGNhc2UgcjpcbiAgICAgIGh1ZSA9IChnIC0gYikgLyBkZWx0YSArIChnIDwgYiA/IDYgOiAwKTticmVhaztcbiAgICBjYXNlIGc6XG4gICAgICBodWUgPSAoYiAtIHIpIC8gZGVsdGEgKyAyO2JyZWFrO1xuICAgIGNhc2UgYjpcbiAgICAgIGh1ZSA9IChyIC0gZykgLyBkZWx0YSArIDQ7YnJlYWs7XG4gIH1cbiAgaHVlIC89IDY7XG4gIHJldHVybiB7XG4gICAgaDogcm91bmQoaHVlICogMzYwKSxcbiAgICBzOiByb3VuZChtYXggPT0gMCA/IDAgOiBkZWx0YSAvIG1heCAqIDEwMCksXG4gICAgdjogcm91bmQobWF4ICogMTAwKVxuICB9O1xufTtcblxuLyoqXG4gICogQGRlc2MgY29udmVydCBoc3Ygb2JqZWN0IHRvIGhzbFxuICAqIEBwYXJhbSB7T2JqZWN0fSBoc3YgLSBoc3Ygb2JqZWN0XG4gICogQHJldHVybiB7T2JqZWN0fSBoc2wgb2JqZWN0XG4qL1xuZnVuY3Rpb24gaHN2MkhzbChoc3YpIHtcbiAgdmFyIHMgPSBoc3YucyAvIDEwMCxcbiAgICAgIHYgPSBoc3YudiAvIDEwMDtcbiAgdmFyIGwgPSAwLjUgKiB2ICogKDIgLSBzKTtcbiAgcyA9IHYgKiBzIC8gKDEgLSBNYXRoLmFicygyICogbCAtIDEpKTtcbiAgcmV0dXJuIHtcbiAgICBoOiBoc3YuaCxcbiAgICBzOiByb3VuZChzICogMTAwKSB8fCAwLFxuICAgIGw6IHJvdW5kKGwgKiAxMDApXG4gIH07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjb252ZXJ0IGhzbCBvYmplY3QgdG8gaHN2XG4gICogQHBhcmFtIHtPYmplY3R9IGhzbCAtIGhzbCBvYmplY3RcbiAgKiBAcmV0dXJuIHtPYmplY3R9IGhzdiBvYmplY3RcbiovXG5mdW5jdGlvbiBoc2wySHN2KGhzbCkge1xuICB2YXIgcyA9IGhzbC5zIC8gMTAwLFxuICAgICAgbCA9IGhzbC5sIC8gMTAwO1xuICBsICo9IDI7XG4gIHMgKj0gbCA8PSAxID8gbCA6IDIgLSBsO1xuICByZXR1cm4ge1xuICAgIGg6IGhzbC5oLFxuICAgIHM6IHJvdW5kKDIgKiBzIC8gKGwgKyBzKSAqIDEwMCksXG4gICAgdjogcm91bmQoKGwgKyBzKSAvIDIgKiAxMDApXG4gIH07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjb252ZXJ0IHJnYiBvYmplY3QgdG8gc3RyaW5nXG4gICogQHBhcmFtIHtPYmplY3R9IHJnYiAtIHJnYiBvYmplY3RcbiAgKiBAcmV0dXJuIHtPYmplY3R9IHJnYiBzdHJpbmdcbiovXG5mdW5jdGlvbiByZ2IyU3RyKHJnYikge1xuICByZXR1cm4gXCJyZ2JcIiArIChyZ2IuYSA/IFwiYVwiIDogXCJcIikgKyBcIihcIiArIHJnYi5yICsgXCIsIFwiICsgcmdiLmcgKyBcIiwgXCIgKyByZ2IuYiArIChyZ2IuYSA/IFwiLCBcIiArIHJnYi5hIDogXCJcIikgKyBcIilcIjtcbn07XG5cbi8qKlxuICAqIEBkZXNjIGNvbnZlcnQgaHNsIG9iamVjdCB0byBzdHJpbmdcbiAgKiBAcGFyYW0ge09iamVjdH0gaHNsIC0gaHNsIG9iamVjdFxuICAqIEByZXR1cm4ge09iamVjdH0gaHNsIHN0cmluZ1xuKi9cbmZ1bmN0aW9uIGhzbDJTdHIoaHNsKSB7XG4gIHJldHVybiBcImhzbFwiICsgKGhzbC5hID8gXCJhXCIgOiBcIlwiKSArIFwiKFwiICsgaHNsLmggKyBcIiwgXCIgKyBoc2wucyArIFwiJSwgXCIgKyBoc2wubCArIFwiJVwiICsgKGhzbC5hID8gXCIsIFwiICsgaHNsLmEgOiBcIlwiKSArIFwiKVwiO1xufTtcblxuLyoqXG4gICogQGRlc2MgY29udmVydCByZ2Igb2JqZWN0IHRvIGhleCBzdHJpbmdcbiAgKiBAcGFyYW0ge09iamVjdH0gcmdiIC0gcmdiIG9iamVjdFxuICAqIEByZXR1cm4ge09iamVjdH0gaGV4IHN0cmluZ1xuKi9cbmZ1bmN0aW9uIHJnYjJIZXgocmdiKSB7XG4gIHZhciByID0gcmdiLnIsXG4gICAgICBnID0gcmdiLmcsXG4gICAgICBiID0gcmdiLmI7XG4gIC8vIElmIGVhY2ggUkdCIGNoYW5uZWwncyB2YWx1ZSBpcyBhIG11bHRpcGxlIG9mIDE3LCB3ZSBjYW4gdXNlIEhFWCBzaG9ydGhhbmQgbm90YXRpb25cbiAgdmFyIHVzZVNob3J0aGFuZCA9IHIgJSAxNyA9PSAwICYmIGcgJSAxNyA9PSAwICYmIGIgJSAxNyA9PSAwLFxuXG4gIC8vIElmIHdlJ3JlIHVzaW5nIHNob3J0aGFuZCBub3RhdGlvbiwgZGl2aWRlIGVhY2ggY2hhbm5lbCBieSAxN1xuICBkaXZpZGVyID0gdXNlU2hvcnRoYW5kID8gMTcgOiAxLFxuXG4gIC8vIGJpdExlbmd0aCBvZiBlYWNoIGNoYW5uZWwgKGZvciBleGFtcGxlLCBGIGlzIDQgYml0cyBsb25nIHdoaWxlIEZGIGlzIDggYml0cyBsb25nKVxuICBiaXRMZW5ndGggPSB1c2VTaG9ydGhhbmQgPyA0IDogOCxcblxuICAvLyBUYXJnZXQgbGVuZ3RoIG9mIHRoZSBzdHJpbmcgKGllIFwiI0ZGRlwiIG9yIFwiI0ZGRkZGRlwiKVxuICBzdHJMZW5ndGggPSB1c2VTaG9ydGhhbmQgPyA0IDogNyxcblxuICAvLyBDb21iaW5lIHRoZSBjaGFubmVscyB0b2dldGhlciBpbnRvIGEgc2luZ2xlIGludGVnZXJcbiAgaW50ID0gciAvIGRpdmlkZXIgPDwgYml0TGVuZ3RoICogMiB8IGcgLyBkaXZpZGVyIDw8IGJpdExlbmd0aCB8IGIgLyBkaXZpZGVyLFxuXG4gIC8vIENvbnZlcnQgdGhhdCBpbnRlZ2VyIHRvIGEgaGV4IHN0cmluZ1xuICBzdHIgPSBpbnQudG9TdHJpbmcoMTYpO1xuICAvLyBBZGQgcmlnaHQgYW1vdW50IG9mIGxlZnQtcGFkZGluZ1xuICByZXR1cm4gXCIjXCIgKyBuZXcgQXJyYXkoc3RyTGVuZ3RoIC0gc3RyLmxlbmd0aCkuam9pbihcIjBcIikgKyBzdHI7XG59O1xuXG4vKipcbiAgKiBAZGVzYyBnZW5lcmljIHBhcnNlciBmb3IgaHNsIC8gcmdiIC8gZXRjIHN0cmluZ1xuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgLSBjb2xvciBzdHJpbmdcbiAgKiBAcGFyYW0ge0FycmF5fSBtYXhWYWx1ZXMgLSBtYXggdmFsdWVzIGZvciBlYWNoIGNoYW5uZWwgKHVzZWQgZm9yIGNhbGN1bGF0aW5nIHBlcmNlbnQtYmFzZWQgdmFsdWVzKVxuICAqIEByZXR1cm4ge0FycmF5fSB0eXBlIChyZ2IgfCByZ2JhIHwgaHNsIHwgaHNsYSkgdmFsdWVzIGZvciBlYWNoIGNoYW5uZWxcbiovXG5mdW5jdGlvbiBwYXJzZUNvbG9yU3RyKHN0ciwgbWF4VmFsdWVzKSB7XG4gIHZhciBwYXJzZWQgPSBzdHIubWF0Y2goLyhcXFMrKVxcKChcXGQrKSglPykoPzpcXEQrPykoXFxkKykoJT8pKD86XFxEKz8pKFxcZCspKCU/KSg/OlxcRCs/KT8oWzAtOVxcLl0rPyk/XFwpL2kpLFxuICAgICAgdmFsMSA9IHBhcnNlSW50KHBhcnNlZFsyXSksXG4gICAgICB2YWwyID0gcGFyc2VJbnQocGFyc2VkWzRdKSxcbiAgICAgIHZhbDMgPSBwYXJzZUludChwYXJzZWRbNl0pO1xuICByZXR1cm4gW3BhcnNlZFsxXSwgcGFyc2VkWzNdID09IFwiJVwiID8gdmFsMSAvIDEwMCAqIG1heFZhbHVlc1swXSA6IHZhbDEsIHBhcnNlZFs1XSA9PSBcIiVcIiA/IHZhbDIgLyAxMDAgKiBtYXhWYWx1ZXNbMV0gOiB2YWwyLCBwYXJzZWRbN10gPT0gXCIlXCIgPyB2YWwzIC8gMTAwICogbWF4VmFsdWVzWzJdIDogdmFsMywgcGFyc2VGbG9hdChwYXJzZWRbOF0pIHx8IHVuZGVmaW5lZF07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBwYXJzZSByZ2Igc3RyaW5nXG4gICogQHBhcmFtIHtTdHJpbmd9IHN0ciAtIGNvbG9yIHN0cmluZ1xuICAqIEByZXR1cm4ge09iamVjdH0gcmdiIG9iamVjdFxuKi9cbmZ1bmN0aW9uIHBhcnNlUmdiU3RyKHN0cikge1xuICB2YXIgcGFyc2VkID0gcGFyc2VDb2xvclN0cihzdHIsIFsyNTUsIDI1NSwgMjU1XSk7XG4gIHJldHVybiB7XG4gICAgcjogcGFyc2VkWzFdLFxuICAgIGc6IHBhcnNlZFsyXSxcbiAgICBiOiBwYXJzZWRbM11cbiAgfTtcbn07XG5cbi8qKlxuICAqIEBkZXNjIHBhcnNlIGhzbCBzdHJpbmdcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIC0gY29sb3Igc3RyaW5nXG4gICogQHJldHVybiB7T2JqZWN0fSBoc2wgb2JqZWN0XG4qL1xuZnVuY3Rpb24gcGFyc2VIc2xTdHIoc3RyKSB7XG4gIHZhciBwYXJzZWQgPSBwYXJzZUNvbG9yU3RyKHN0ciwgWzM2MCwgMTAwLCAxMDBdKTtcbiAgcmV0dXJuIHtcbiAgICBoOiBwYXJzZWRbMl0sXG4gICAgczogcGFyc2VkWzNdLFxuICAgIGw6IHBhcnNlZFs0XVxuICB9O1xufTtcblxuLyoqXG4gICogQGRlc2MgcGFyc2UgaGV4IHN0cmluZ1xuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgLSBjb2xvciBzdHJpbmdcbiAgKiBAcmV0dXJuIHtPYmplY3R9IHJnYiBvYmplY3RcbiovXG5mdW5jdGlvbiBwYXJzZUhleFN0cihoZXgpIHtcbiAgLy8gU3RyaXAgYW55IFwiI1wiIGNoYXJhY3RlcnNcbiAgaGV4ID0gaGV4LnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICAvLyBQcmVmaXggdGhlIGhleCBzdHJpbmcgd2l0aCBcIjB4XCIgd2hpY2ggaW5kaWNhdGVzIGEgbnVtYmVyIGluIGhleCBub3RhdGlvbiwgdGhlbiBjb252ZXJ0IHRvIGFuIGludGVnZXJcbiAgdmFyIGludCA9IHBhcnNlSW50KFwiMHhcIiArIGhleCksXG5cbiAgLy8gSWYgdGhlIGxlbmd0aCBvZiB0aGUgaW5wdXQgaXMgb25seSAzLCB0aGVuIGl0IGlzIGEgc2hvcnRoYW5kIGhleCBjb2xvclxuICBpc1Nob3J0aGFuZCA9IGhleC5sZW5ndGggPT0gMyxcblxuICAvLyBiaXRNYXNrIGZvciBpc29sYXRpbmcgZWFjaCBjaGFubmVsXG4gIGJpdE1hc2sgPSBpc1Nob3J0aGFuZCA/IDB4RiA6IDB4RkYsXG5cbiAgLy8gYml0TGVuZ3RoIG9mIGVhY2ggY2hhbm5lbCAoZm9yIGV4YW1wbGUsIEYgaXMgNCBiaXRzIGxvbmcgd2hpbGUgRkYgaXMgOCBiaXRzIGxvbmcpXG4gIGJpdExlbmd0aCA9IGlzU2hvcnRoYW5kID8gNCA6IDgsXG5cbiAgLy8gSWYgd2UncmUgdXNpbmcgc2hvcnRoYW5kIG5vdGF0aW9uLCBtdWx0aXBseSBlYWNoIGNoYW5uZWwgYnkgMTdcbiAgbXVsdGlwbGllciA9IGlzU2hvcnRoYW5kID8gMTcgOiAxO1xuICByZXR1cm4ge1xuICAgIHI6IChpbnQgPj4gYml0TGVuZ3RoICogMiAmIGJpdE1hc2spICogbXVsdGlwbGllcixcbiAgICBnOiAoaW50ID4+IGJpdExlbmd0aCAmIGJpdE1hc2spICogbXVsdGlwbGllcixcbiAgICBiOiAoaW50ICYgYml0TWFzaykgKiBtdWx0aXBsaWVyXG4gIH07XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjb252ZXJ0IG9iamVjdCAvIHN0cmluZyBpbnB1dCB0byBjb2xvciBpZiBuZWNlc3NhcnlcbiAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSB2YWx1ZSAtIGNvbG9yIGluc3RhbmNlLCBvYmplY3QgKGhzdiwgaHNsIG9yIHJnYiksIHN0cmluZyAoaHNsLCByZ2IsIGhleClcbiAgKiBAcmV0dXJuIHtjb2xvcn0gY29sb3IgaW5zdGFuY2VcbiovXG5mdW5jdGlvbiBnZXRDb2xvcih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBjb2xvciA/IHZhbHVlIDogbmV3IGNvbG9yKHZhbHVlKTtcbn07XG5cbi8qKlxuICAqIEBkZXNjIGNsYW1wIHZhbHVlIGJldHdlZW4gbWluIGFuZCBtYXhcbiAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgKiBAcGFyYW0ge051bWJlcn0gbWluXG4gICogQHBhcmFtIHtOdW1iZXJ9IG1heFxuICAqIEByZXR1cm4ge051bWJlcn1cbiovXG5mdW5jdGlvbiBjbGFtcCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIHZhbHVlIDw9IG1pbiA/IG1pbiA6IHZhbHVlID49IG1heCA/IG1heCA6IHZhbHVlO1xufTtcblxuLyoqXG4gICogQGRlc2MgY29tcGFyZSB2YWx1ZXMgYmV0d2VlbiB0d28gb2JqZWN0cywgcmV0dXJucyBhIG9iamVjdCByZXByZXNlbnRpbmcgY2hhbmdlcyB3aXRoIHRydWUvZmFsc2UgdmFsdWVzXG4gICogQHBhcmFtIHtPYmplY3R9IGFcbiAgKiBAcGFyYW0ge09iamVjdH0gYlxuICAqIEByZXR1cm4ge09iamVjdH1cbiovXG5mdW5jdGlvbiBjb21wYXJlT2JqcyhhLCBiKSB7XG4gIHZhciBjaGFuZ2VzID0ge307XG4gIGZvciAodmFyIGtleSBpbiBhKSB7XG4gICAgY2hhbmdlc1trZXldID0gYltrZXldICE9IGFba2V5XTtcbiAgfXJldHVybiBjaGFuZ2VzO1xufTtcblxuLyoqXG4gICogQGRlc2MgbWl4IHR3byBjb2xvcnNcbiAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSBjb2xvcjEgLSBjb2xvciBpbnN0YW5jZSwgb2JqZWN0IChoc3YsIGhzbCBvciByZ2IpLCBzdHJpbmcgKGhzbCwgcmdiLCBoZXgpXG4gICogQHBhcmFtIHtPYmplY3QgfCBTdHJpbmcgfCBjb2xvcn0gY29sb3IyIC0gY29sb3IgaW5zdGFuY2UsIG9iamVjdCAoaHN2LCBoc2wgb3IgcmdiKSwgc3RyaW5nIChoc2wsIHJnYiwgaGV4KVxuICAqIEBwYXJhbSB7TnVtYmVyfSB3ZWlnaHQgLSBjbG9zZXIgdG8gMCA9IG1vcmUgY29sb3IxLCBjbG9zZXIgdG8gMTAwID0gbW9yZSBjb2xvcjJcbiAgKiBAcmV0dXJuIHtjb2xvcn0gY29sb3IgaW5zdGFuY2VcbiovXG5mdW5jdGlvbiBfbWl4KGNvbG9yMSwgY29sb3IyLCB3ZWlnaHQpIHtcbiAgdmFyIHJnYjEgPSBnZXRDb2xvcihjb2xvcjEpLnJnYixcbiAgICAgIHJnYjIgPSBnZXRDb2xvcihjb2xvcjIpLnJnYjtcbiAgd2VpZ2h0ID0gY2xhbXAod2VpZ2h0IC8gMTAwIHx8IDAuNSwgMCwgMSk7XG4gIHJldHVybiBuZXcgY29sb3Ioe1xuICAgIHI6IGZsb29yKHJnYjEuciArIChyZ2IyLnIgLSByZ2IxLnIpICogd2VpZ2h0KSxcbiAgICBnOiBmbG9vcihyZ2IxLmcgKyAocmdiMi5nIC0gcmdiMS5nKSAqIHdlaWdodCksXG4gICAgYjogZmxvb3IocmdiMS5iICsgKHJnYjIuYiAtIHJnYjEuYikgKiB3ZWlnaHQpXG4gIH0pO1xufTtcblxuLyoqXG4gICogQGRlc2MgbGlnaHRlbiBjb2xvciBieSBhbW91bnRcbiAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSBjb2xvciAtIGNvbG9yIGluc3RhbmNlLCBvYmplY3QgKGhzdiwgaHNsIG9yIHJnYiksIHN0cmluZyAoaHNsLCByZ2IsIGhleClcbiAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50XG4gICogQHJldHVybiB7Y29sb3J9IGNvbG9yIGluc3RhbmNlXG4qL1xuZnVuY3Rpb24gX2xpZ2h0ZW4oY29sb3IsIGFtb3VudCkge1xuICB2YXIgY29sID0gZ2V0Q29sb3IoY29sb3IpLFxuICAgICAgaHN2ID0gY29sLmhzdjtcbiAgaHN2LnYgPSBjbGFtcChoc3YudiArIGFtb3VudCwgMCwgMTAwKTtcbiAgY29sLmhzdiA9IGhzdjtcbiAgcmV0dXJuIGNvbDtcbn07XG5cbi8qKlxuICAqIEBkZXNjIGRhcmtlbiBjb2xvciBieSBhbW91bnRcbiAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSBjb2xvciAtIGNvbG9yIGluc3RhbmNlLCBvYmplY3QgKGhzdiwgaHNsIG9yIHJnYiksIHN0cmluZyAoaHNsLCByZ2IsIGhleClcbiAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50XG4gICogQHJldHVybiB7Y29sb3J9IGNvbG9yIGluc3RhbmNlXG4qL1xuZnVuY3Rpb24gX2Rhcmtlbihjb2xvciwgYW1vdW50KSB7XG4gIHZhciBjb2wgPSBnZXRDb2xvcihjb2xvciksXG4gICAgICBoc3YgPSBjb2wuaHN2O1xuICBoc3YudiA9IGNsYW1wKGhzdi52IC0gYW1vdW50LCAwLCAxMDApO1xuICBjb2wuaHN2ID0gaHN2O1xuICByZXR1cm4gY29sO1xufTtcblxuLyoqXG4gICogQGNvbnN0cnVjdG9yIGNvbG9yIG9iamVjdFxuICAqIEBwYXJhbSB7T2JqZWN0IHwgU3RyaW5nIHwgY29sb3J9IHZhbHVlIC0gY29sb3IgaW5zdGFuY2UsIG9iamVjdCAoaHN2LCBoc2wgb3IgcmdiKSwgc3RyaW5nIChoc2wsIHJnYiwgaGV4KVxuKi9cbnZhciBjb2xvciA9IGZ1bmN0aW9uIGNvbG9yKHZhbHVlKSB7XG4gIC8vIFRoZSB3YXRjaCBjYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhpcyBjb2xvciB3aWxsIGJlIHN0b3JlZCBoZXJlXG4gIHRoaXMuX29uQ2hhbmdlID0gZmFsc2U7XG4gIC8vIFRoZSBkZWZhdWx0IGNvbG9yIHZhbHVlXG4gIHRoaXMuX3ZhbHVlID0geyBoOiB1bmRlZmluZWQsIHM6IHVuZGVmaW5lZCwgdjogdW5kZWZpbmVkIH07XG4gIGlmICh2YWx1ZSkgdGhpcy5zZXQodmFsdWUpO1xufTtcblxuLy8gRXhwb3NlIGZ1bmN0aW9ucyBhcyBzdGF0aWMgaGVscGVyc1xuY29sb3IubWl4ID0gX21peDtcbmNvbG9yLmxpZ2h0ZW4gPSBfbGlnaHRlbjtcbmNvbG9yLmRhcmtlbiA9IF9kYXJrZW47XG5jb2xvci5oc3YyUmdiID0gaHN2MlJnYjtcbmNvbG9yLnJnYjJIc3YgPSByZ2IySHN2O1xuY29sb3IuaHN2MkhzbCA9IGhzdjJIc2w7XG5jb2xvci5oc2wySHN2ID0gaHNsMkhzdjtcbmNvbG9yLmhzbDJTdHIgPSBoc2wyU3RyO1xuY29sb3IucmdiMlN0ciA9IHJnYjJTdHI7XG5jb2xvci5yZ2IySGV4ID0gcmdiMkhleDtcbmNvbG9yLnBhcnNlSGV4U3RyID0gcGFyc2VIZXhTdHI7XG5jb2xvci5wYXJzZUhzbFN0ciA9IHBhcnNlSHNsU3RyO1xuY29sb3IucGFyc2VSZ2JTdHIgPSBwYXJzZVJnYlN0cjtcblxuY29sb3IucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogY29sb3IsXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBzZXQgdGhlIGNvbG9yIGZyb20gYW55IHZhbGlkIHZhbHVlXG4gICAgKiBAcGFyYW0ge09iamVjdCB8IFN0cmluZyB8IGNvbG9yfSB2YWx1ZSAtIGNvbG9yIGluc3RhbmNlLCBvYmplY3QgKGhzdiwgaHNsIG9yIHJnYiksIHN0cmluZyAoaHNsLCByZ2IsIGhleClcbiAgKi9cbiAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHZhbHVlKSkgPT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgY29sb3IpIHtcbiAgICAgICAgdGhpcy5oc3YgPSBjb2xvci5oc3Y7XG4gICAgICB9IGVsc2UgaWYgKFwiclwiIGluIHZhbHVlKSB7XG4gICAgICAgIHRoaXMucmdiID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKFwidlwiIGluIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaHN2ID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKFwibFwiIGluIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaHNsID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKC9ecmdiLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICB0aGlzLnJnYlN0cmluZyA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmICgvXmhzbC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5oc2xTdHJpbmcgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoL14jWzAtOUEtRmEtZl0vLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuaGV4U3RyaW5nID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2Mgc2hvcnRjdXQgdG8gc2V0IGEgc3BlY2lmaWMgY2hhbm5lbCB2YWx1ZVxuICAgICogQHBhcmFtIHtTdHJpbmd9IG1vZGVsIC0gaHN2IHwgaHNsIHwgcmdiXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gY2hhbm5lbCAtIGluZGl2aWR1YWwgY2hhbm5lbCB0byBzZXQsIGZvciBleGFtcGxlIGlmIG1vZGVsID0gaHNsLCBjaGFuZWwgPSBoIHwgcyB8IGxcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIG5ldyB2YWx1ZSBmb3IgdGhlIGNoYW5uZWxcbiAgKi9cbiAgc2V0Q2hhbm5lbDogZnVuY3Rpb24gc2V0Q2hhbm5lbChtb2RlbCwgY2hhbm5lbCwgdmFsdWUpIHtcbiAgICB2YXIgdiA9IHRoaXNbbW9kZWxdO1xuICAgIHZbY2hhbm5lbF0gPSB2YWx1ZTtcbiAgICB0aGlzW21vZGVsXSA9IHY7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBtYWtlIG5ldyBjb2xvciBpbnN0YW5jZSB3aXRoIHRoZSBzYW1lIHZhbHVlIGFzIHRoaXMgb25lXG4gICAgKiBAcmV0dXJuIHtjb2xvcn1cbiAgKi9cbiAgY2xvbmU6IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgY29sb3IodGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBjb21wYXJlIHRoaXMgY29sb3IgYWdhaW5zdCBhbm90aGVyLCByZXR1cm5zIGEgb2JqZWN0IHJlcHJlc2VudGluZyBjaGFuZ2VzIHdpdGggdHJ1ZS9mYWxzZSB2YWx1ZXNcbiAgICAqIEBwYXJhbSB7T2JqZWN0IHwgU3RyaW5nIHwgY29sb3J9IGNvbG9yIC0gY29sb3IgdG8gY29tcGFyZSBhZ2FpbnN0XG4gICAgKiBAcGFyYW0ge1N0cmluZ30gbW9kZWwgLSBoc3YgfCBoc2wgfCByZ2JcbiAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgKi9cbiAgY29tcGFyZTogZnVuY3Rpb24gY29tcGFyZShjb2xvciwgbW9kZWwpIHtcbiAgICBtb2RlbCA9IG1vZGVsIHx8IFwiaHN2XCI7XG4gICAgcmV0dXJuIGNvbXBhcmVPYmpzKHRoaXNbbW9kZWxdLCBnZXRDb2xvcihjb2xvcilbbW9kZWxdKTtcbiAgfSxcblxuICAvKipcbiAgICAqIEBkZXNjIG1peCBhIGNvbG9yIGludG8gdGhpcyBvbmVcbiAgICAqIEBwYXJhbSB7T2JqZWN0IHwgU3RyaW5nIHwgY29sb3J9IGNvbG9yIC0gY29sb3IgaW5zdGFuY2UsIG9iamVjdCAoaHN2LCBoc2wgb3IgcmdiKSwgc3RyaW5nIChoc2wsIHJnYiwgaGV4KVxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHdlaWdodCAtIGNsb3NlciB0byAwID0gbW9yZSBjdXJyZW50IGNvbG9yLCBjbG9zZXIgdG8gMTAwID0gbW9yZSBuZXcgY29sb3JcbiAgKi9cbiAgbWl4OiBmdW5jdGlvbiBtaXgoY29sb3IsIHdlaWdodCkge1xuICAgIHRoaXMuaHN2ID0gX21peCh0aGlzLCBjb2xvciwgd2VpZ2h0KS5oc3Y7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBsaWdodGVuIGNvbG9yIGJ5IGFtb3VudFxuICAgICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudFxuICAqL1xuICBsaWdodGVuOiBmdW5jdGlvbiBsaWdodGVuKGFtb3VudCkge1xuICAgIF9saWdodGVuKHRoaXMsIGFtb3VudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBkYXJrZW4gY29sb3IgYnkgYW1vdW50XG4gICAgKiBAcGFyYW0ge051bWJlcn0gYW1vdW50XG4gICovXG4gIGRhcmtlbjogZnVuY3Rpb24gZGFya2VuKGFtb3VudCkge1xuICAgIF9kYXJrZW4odGhpcywgYW1vdW50KTtcbiAgfVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY29sb3IucHJvdG90eXBlLCB7XG4gIGhzdjoge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgLy8gX3ZhbHVlIGlzIGNsb25lZCB0byBhbGxvdyBjaGFuZ2VzIHRvIGJlIG1hZGUgdG8gdGhlIHZhbHVlcyBiZWZvcmUgcGFzc2luZyB0aGVtIGJhY2tcbiAgICAgIHZhciB2ID0gdGhpcy5fdmFsdWU7XG4gICAgICByZXR1cm4geyBoOiB2LmgsIHM6IHYucywgdjogdi52IH07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChuZXdWYWx1ZSkge1xuICAgICAgLy8gSWYgdGhpcyBjb2xvciBpcyBiZWluZyB3YXRjaGVkIGZvciBjaGFuZ2VzIHdlIG5lZWQgdG8gY29tcGFyZSB0aGUgbmV3IGFuZCBvbGQgdmFsdWVzIHRvIGNoZWNrIHRoZSBkaWZmZXJlbmNlXG4gICAgICAvLyBPdGhlcndpc2Ugd2UgY2FuIGp1c3QgYmUgbGF6eVxuICAgICAgaWYgKHRoaXMuX29uQ2hhbmdlKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICBmb3IgKHZhciBjaGFubmVsIGluIG9sZFZhbHVlKSB7XG4gICAgICAgICAgaWYgKCFuZXdWYWx1ZS5oYXNPd25Qcm9wZXJ0eShjaGFubmVsKSkgbmV3VmFsdWVbY2hhbm5lbF0gPSBvbGRWYWx1ZVtjaGFubmVsXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hhbmdlcyA9IGNvbXBhcmVPYmpzKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgb2xkIHZhbHVlXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIC8vIElmIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZCwgY2FsbCBob29rIGNhbGxiYWNrXG4gICAgICAgIGlmIChjaGFuZ2VzLmggfHwgY2hhbmdlcy5zIHx8IGNoYW5nZXMudikgdGhpcy5fb25DaGFuZ2UodGhpcywgY2hhbmdlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmdiOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gaHN2MlJnYih0aGlzLl92YWx1ZSk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5oc3YgPSByZ2IySHN2KHZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIGhzbDoge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIGhzdjJIc2wodGhpcy5fdmFsdWUpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMuaHN2ID0gaHNsMkhzdih2YWx1ZSk7XG4gICAgfVxuICB9LFxuICByZ2JTdHJpbmc6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiByZ2IyU3RyKHRoaXMucmdiKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB0aGlzLnJnYiA9IHBhcnNlUmdiU3RyKHZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIGhleFN0cmluZzoge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHJnYjJIZXgodGhpcy5yZ2IpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMucmdiID0gcGFyc2VIZXhTdHIodmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgaHNsU3RyaW5nOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gaHNsMlN0cih0aGlzLmhzbCk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5oc2wgPSBjb2xvci5wYXJzZUhzbFN0cih2YWx1ZSk7XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb2xvcjtcblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8qKlxuICBAY29uc3RydWN0b3Igc3R5bGVzaGVldCB3cml0ZXJcbiovXG52YXIgc3R5bGVzaGVldCA9IGZ1bmN0aW9uIHN0eWxlc2hlZXQoKSB7XG4gIC8vIENyZWF0ZSBhIG5ldyBzdHlsZSBlbGVtZW50XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIC8vIFdlYmtpdCBhcHBhcmVudGx5IHJlcXVpcmVzIGEgdGV4dCBub2RlIHRvIGJlIGluc2VydGVkIGludG8gdGhlIHN0eWxlIGVsZW1lbnRcbiAgLy8gKGFjY29yZGluZyB0byBodHRwczovL2Rhdmlkd2Fsc2gubmFtZS9hZGQtcnVsZXMtc3R5bGVzaGVldHMpXG4gIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpKTtcbiAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuICAvLyBDcmVhdGUgYSByZWZlcmVuY2UgdG8gdGhlIHN0eWxlIGVsZW1lbnQncyBDU1NTdHlsZVNoZWV0IG9iamVjdFxuICAvLyBDU1NTdHlsZVNoZWV0IEFQSTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NTU1N0eWxlU2hlZXRcbiAgdmFyIHNoZWV0ID0gc3R5bGUuc2hlZXQ7XG4gIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgLy8gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBzaGVldCdzIENTU1J1bGVMaXN0IG9iamVjdFxuICAvLyBDU1NSdWxlTGlzdCBBUEk6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DU1NSdWxlTGlzdFxuICB0aGlzLnJ1bGVzID0gc2hlZXQucnVsZXMgfHwgc2hlZXQuY3NzUnVsZXM7XG4gIC8vIFdlJ2xsIHN0b3JlIHJlZmVyZW5jZXMgdG8gYWxsIHRoZSBDU1NTdHlsZURlY2xhcmF0aW9uIG9iamVjdHMgdGhhdCB3ZSBjaGFuZ2UgaGVyZSwga2V5ZWQgYnkgdGhlIENTUyBzZWxlY3RvciB0aGV5IGJlbG9uZyB0b1xuICAvLyBDU1NTdHlsZURlY2xhcmF0aW9uIEFQSTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0NTU1N0eWxlRGVjbGFyYXRpb25cbiAgdGhpcy5tYXAgPSB7fTtcbn07XG5cbnN0eWxlc2hlZXQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3Rvcjogc3R5bGVzaGVldCxcblxuICAvKipcbiAgICAqIEBkZXNjIFNldCBhIHNwZWNpZmljIHJ1bGUgZm9yIGEgZ2l2ZW4gc2VsZWN0b3JcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIHRoZSBDU1Mgc2VsZWN0b3IgZm9yIHRoaXMgcnVsZSAoZS5nLiBcImJvZHlcIiwgXCIuY2xhc3NcIiwgXCIjaWRcIilcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSAtIHRoZSBDU1MgcHJvcGVydHkgdG8gc2V0IChlLmcuIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImZvbnQtZmFtaWx5XCIsIFwiei1pbmRleFwiKVxuICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlICAgIC0gdGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHJ1bGUgKGUuZy4gXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIiwgXCJIZWx2ZXRpY2FcIiwgXCI5OVwiKVxuICAqL1xuICBzZXRSdWxlOiBmdW5jdGlvbiBzZXRSdWxlKHNlbGVjdG9yLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICB2YXIgc2hlZXQgPSB0aGlzLnNoZWV0O1xuICAgIHZhciBydWxlcyA9IHNoZWV0LnJ1bGVzIHx8IHNoZWV0LmNzc1J1bGVzO1xuICAgIHZhciBtYXAgPSB0aGlzLm1hcDtcbiAgICAvLyBDb252ZXJ0IHByb3BlcnR5IGZyb20gY2FtZWxDYXNlIHRvIHNuYWtlLWNhc2VcbiAgICBwcm9wZXJ0eSA9IHByb3BlcnR5LnJlcGxhY2UoLyhbQS1aXSkvZywgZnVuY3Rpb24gKCQxKSB7XG4gICAgICByZXR1cm4gXCItXCIgKyAkMS50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xuICAgIGlmICghbWFwLmhhc093blByb3BlcnR5KHNlbGVjdG9yKSkge1xuICAgICAgLy8gSWYgdGhlIHNlbGVjdG9yIGhhc24ndCBiZWVuIHVzZWQgeWV0IHdlIHdhbnQgdG8gaW5zZXJ0IHRoZSBydWxlIGF0IHRoZSBlbmQgb2YgdGhlIENTU1J1bGVMaXN0LCBzbyB3ZSB1c2UgaXRzIGxlbmd0aCBhcyB0aGUgaW5kZXggdmFsdWVcbiAgICAgIHZhciBpbmRleCA9IHJ1bGVzLmxlbmd0aDtcbiAgICAgIC8vIFByZXBhcmUgdGhlIHJ1bGUgZGVjbGFyYXRpb24gdGV4dCwgc2luY2UgYm90aCBpbnNlcnRSdWxlIGFuZCBhZGRSdWxlIHRha2UgdGhpcyBmb3JtYXRcbiAgICAgIHZhciBkZWNsYXJhdGlvbiA9IHByb3BlcnR5ICsgXCI6IFwiICsgdmFsdWU7XG4gICAgICAvLyBJbnNlcnQgdGhlIG5ldyBydWxlIGludG8gdGhlIHN0eWxlc2hlZXRcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgb25seSBzdXBwb3J0IGluc2VydFJ1bGUsIG90aGVycyBvbmx5IHN1cHBvcnQgYWRkUnVsZSwgc28gd2UgaGF2ZSB0byB1c2UgYm90aFxuICAgICAgICBzaGVldC5pbnNlcnRSdWxlKHNlbGVjdG9yICsgXCIge1wiICsgZGVjbGFyYXRpb24gKyBcIjt9XCIsIGluZGV4KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgc2hlZXQuYWRkUnVsZShzZWxlY3RvciwgZGVjbGFyYXRpb24sIGluZGV4KTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIC8vIEJlY2F1c2Ugc2FmYXJpIGlzIHBlcmhhcHMgdGhlIHdvcnN0IGJyb3dzZXIgaW4gYWxsIG9mIGhpc3RvcnksIHdlIGhhdmUgdG8gcmVtaW5kIGl0IHRvIGtlZXAgdGhlIHNoZWV0IHJ1bGVzIHVwLXRvLWRhdGVcbiAgICAgICAgcnVsZXMgPSBzaGVldC5ydWxlcyB8fCBzaGVldC5jc3NSdWxlcztcbiAgICAgICAgLy8gQWRkIG91ciBuZXdseSBpbnNlcnRlZCBydWxlJ3MgQ1NTU3R5bGVEZWNsYXJhdGlvbiBvYmplY3QgdG8gdGhlIGludGVybmFsIG1hcFxuICAgICAgICBtYXBbc2VsZWN0b3JdID0gcnVsZXNbaW5kZXhdLnN0eWxlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtYXBbc2VsZWN0b3JdLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhzdHlsZXNoZWV0LnByb3RvdHlwZSwge1xuICBlbmFibGVkOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuc2hlZXQuZGlzYWJsZWQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5zaGVldC5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgICB9XG4gIH0sXG4gIC8vIFRPRE86IGNvbnNpZGVyIHJlbW92aW5nIGNzc1RleHQgKyBjc3MgcHJvcGVydGllcyBzaW5jZSBpIGRvbid0IHRpbmsgdGhleSdyZSB0aGF0IHVzZWZ1bFxuICBjc3NUZXh0OiB7XG4gICAgLyoqXG4gICAgICAqIEBkZXNjIEdldCB0aGUgc3R5bGVzaGVldCB0ZXh0XG4gICAgICAqIEByZXR1cm4ge1N0cmluZ30gY3NzIHRleHRcbiAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIG1hcCA9IHRoaXMubWFwO1xuICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgZm9yICh2YXIgc2VsZWN0b3IgaW4gbWFwKSB7XG4gICAgICAgIHJldC5wdXNoKHNlbGVjdG9yLnJlcGxhY2UoLyxcXFcvZywgXCIsXFxuXCIpICsgXCIge1xcblxcdFwiICsgbWFwW3NlbGVjdG9yXS5jc3NUZXh0LnJlcGxhY2UoLztcXFcvZywgXCI7XFxuXFx0XCIpICsgXCJcXG59XCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldC5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgfSxcbiAgY3NzOiB7XG4gICAgLyoqXG4gICAgICogQGRlc2MgR2V0IGFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgY3NzIHN0eWxlc1xuICAgICAqIEByZXR1cm4ge09iamVjdH0gY3NzIG9iamVjdFxuICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgbWFwID0gdGhpcy5tYXA7XG4gICAgICB2YXIgcmV0ID0ge307XG4gICAgICBmb3IgKHZhciBzZWxlY3RvciBpbiBtYXApIHtcbiAgICAgICAgdmFyIHJ1bGVTZXQgPSBtYXBbc2VsZWN0b3JdO1xuICAgICAgICByZXRbc2VsZWN0b3JdID0ge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZVNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHJ1bGVTZXRbaV07XG4gICAgICAgICAgcmV0W3NlbGVjdG9yXVtwcm9wZXJ0eV0gPSBydWxlU2V0LmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVzaGVldDtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8vIGNzcyBjbGFzcyBwcmVmaXggZm9yIHRoaXMgZWxlbWVudFxudmFyIENMQVNTX1BSRUZJWCA9IFwiaXJvX19tYXJrZXJcIjtcblxuLyoqXG4gKiBAY29uc3RydWN0b3IgbWFya2VyIFVJXG4gKiBAcGFyYW0ge3N2Z1Jvb3R9IHN2ZyAtIHN2Z1Jvb3Qgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiovXG52YXIgbWFya2VyID0gZnVuY3Rpb24gbWFya2VyKHN2Zywgb3B0cykge1xuICB2YXIgYmFzZUdyb3VwID0gc3ZnLmcoe1xuICAgIGNsYXNzOiBDTEFTU19QUkVGSVhcbiAgfSk7XG4gIGJhc2VHcm91cC5jaXJjbGUoMCwgMCwgb3B0cy5yLCB7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWCArIFwiX19vdXRlclwiLFxuICAgIGZpbGw6IFwibm9uZVwiLFxuICAgIHN0cm9rZVdpZHRoOiA1LFxuICAgIHN0cm9rZTogXCIjMDAwXCJcbiAgfSk7XG4gIGJhc2VHcm91cC5jaXJjbGUoMCwgMCwgb3B0cy5yLCB7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWCArIFwiX19pbm5lclwiLFxuICAgIGZpbGw6IFwibm9uZVwiLFxuICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgIHN0cm9rZTogXCIjZmZmXCJcbiAgfSk7XG4gIHRoaXMuZyA9IGJhc2VHcm91cDtcbn07XG5cbm1hcmtlci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBtYXJrZXIsXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBtb3ZlIG1hcmtlciB0byBjZW50ZXJwb2ludCAoeCwgeSkgYW5kIHJlZHJhd1xuICAgICogQHBhcmFtIHtOdW1iZXJ9IHggLSBwb2ludCB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gcG9pbnQgeSBjb29yZGluYXRlXG4gICovXG4gIG1vdmU6IGZ1bmN0aW9uIG1vdmUoeCwgeSkge1xuICAgIHRoaXMuZy5zZXRUcmFuc2Zvcm0oXCJ0cmFuc2xhdGVcIiwgW3gsIHldKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXJrZXI7XG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgX3doZWVsID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblxudmFyIF93aGVlbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93aGVlbCk7XG5cbnZhciBfc2xpZGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIF9zbGlkZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2xpZGVyKTtcblxudmFyIF9zdmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG52YXIgX3N2ZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdmcpO1xuXG52YXIgX2NvbG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jb2xvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvcik7XG5cbnZhciBfc3R5bGVzaGVldCA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfc3R5bGVzaGVldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXNoZWV0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEVWRU5UX01PVVNFRE9XTiA9IFwibW91c2Vkb3duXCIsXG4gICAgRVZFTlRfTU9VU0VNT1ZFID0gXCJtb3VzZW1vdmVcIixcbiAgICBFVkVOVF9NT1VTRVVQID0gXCJtb3VzZXVwXCIsXG4gICAgRVZFTlRfVE9VQ0hTVEFSVCA9IFwidG91Y2hzdGFydFwiLFxuICAgIEVWRU5UX1RPVUNITU9WRSA9IFwidG91Y2htb3ZlXCIsXG4gICAgRVZFTlRfVE9VQ0hFTkQgPSBcInRvdWNoZW5kXCIsXG4gICAgRVZFTlRfUkVBRFlTVEFURV9DSEFOR0UgPSBcInJlYWR5c3RhdGVjaGFuZ2VcIixcbiAgICBSRUFEWVNUQVRFX0NPTVBMRVRFID0gXCJjb21wbGV0ZVwiO1xuXG4vKipcbiAgKiBAZGVzYyBsaXN0ZW4gdG8gb25lIG9yIG1vcmUgZXZlbnRzIG9uIGFuIGVsZW1lbnRcbiAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsIHRhcmdldCBlbGVtZW50XG4gICogQHBhcmFtIHtBcnJheX0gZXZlbnRMaXN0IHRoZSBldmVudHMgdG8gbGlzdGVuIHRvXG4gICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdGhlIGV2ZW50IGNhbGxiYWNrIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gbGlzdGVuKGVsLCBldmVudExpc3QsIGNhbGxiYWNrKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudExpc3RbaV0sIGNhbGxiYWNrKTtcbiAgfVxufTtcblxuLyoqXG4gICogQGRlc2MgcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIG9uIGFuIGVsZW1lbnRcbiAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsIHRhcmdldCBlbGVtZW50XG4gICogQHBhcmFtIHtBcnJheX0gZXZlbnRMaXN0IHRoZSBldmVudHMgdG8gcmVtb3ZlXG4gICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdGhlIGV2ZW50IGNhbGxiYWNrIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gdW5saXN0ZW4oZWwsIGV2ZW50TGlzdCwgY2FsbGJhY2spIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TGlzdFtpXSwgY2FsbGJhY2spO1xuICB9XG59O1xuXG4vKipcbiAgKiBAZGVzYyBjYWxsIGZuIGNhbGxiYWNrIHdoZW4gdGhlIHBhZ2UgZG9jdW1lbnQgaXMgcmVhZHlcbiAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBjYWxsZWRcbiovXG5mdW5jdGlvbiB3aGVuUmVhZHkoY2FsbGJhY2spIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gUkVBRFlTVEFURV9DT01QTEVURSkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuKGRvY3VtZW50LCBbRVZFTlRfUkVBRFlTVEFURV9DSEFOR0VdLCBmdW5jdGlvbiBzdGF0ZUNoYW5nZShlKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBSRUFEWVNUQVRFX0NPTVBMRVRFKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHVubGlzdGVuKGRvY3VtZW50LCBbRVZFTlRfUkVBRFlTVEFURV9DSEFOR0VdLCBzdGF0ZUNoYW5nZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICAqIEBjb25zdHJ1Y3RvciBjb2xvciB3aGVlbCBvYmplY3RcbiAgKiBAcGFyYW0ge0VsZW1lbnQgfCBTdHJpbmd9IGVsIC0gYSBET00gZWxlbWVudCBvciB0aGUgQ1NTIHNlbGVjdG9yIGZvciBhIERPTSBlbGVtZW50IHRvIHVzZSBhcyBhIGNvbnRhaW5lciBmb3IgdGhlIFVJXG4gICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlXG4qL1xudmFyIGNvbG9yUGlja2VyID0gZnVuY3Rpb24gY29sb3JQaWNrZXIoZWwsIG9wdHMpIHtcbiAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIC8vIGV2ZW50IHN0b3JhZ2UgZm9yIGBvbmAgYW5kIGBvZmZgXG4gIHRoaXMuX2V2ZW50cyA9IHt9O1xuICB0aGlzLl9tb3VzZVRhcmdldCA9IGZhbHNlO1xuICB0aGlzLl9jb2xvckNoYW5nZUFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLmNzcyA9IG9wdHMuY3NzIHx8IG9wdHMuc3R5bGVzIHx8IHVuZGVmaW5lZDtcbiAgLy8gV2FpdCBmb3IgdGhlIGRvY3VtZW50IHRvIGJlIHJlYWR5LCB0aGVuIGluaXQgdGhlIFVJXG4gIHdoZW5SZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgX3RoaXMyLl9pbml0KGVsLCBvcHRzKTtcbiAgfSk7XG59O1xuXG5jb2xvclBpY2tlci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBjb2xvclBpY2tlcixcblxuICAvKipcbiAgICAqIEBkZXNjIGluaXQgdGhlIGNvbG9yIHBpY2tlciBVSVxuICAgICogQHBhcmFtIHtFbGVtZW50IHwgU3RyaW5nfSBlbCAtIGEgRE9NIGVsZW1lbnQgb3IgdGhlIENTUyBzZWxlY3RvciBmb3IgYSBET00gZWxlbWVudCB0byB1c2UgYXMgYSBjb250YWluZXIgZm9yIHRoZSBVSVxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlXG4gICAgKiBAYWNjZXNzIHByb3RlY3RlZFxuICAqL1xuICBfaW5pdDogZnVuY3Rpb24gX2luaXQoZWwsIG9wdHMpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIC8vIElmIGBlbGAgaXMgYSBzdHJpbmcsIHVzZSBpdCB0byBzZWxlY3QgYW4gRWxlbWVudCwgZWxzZSBhc3N1bWUgaXQncyBhbiBlbGVtZW50XG4gICAgZWwgPSBcInN0cmluZ1wiID09IHR5cGVvZiBlbCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpIDogZWw7XG4gICAgLy8gRmluZCB0aGUgd2lkdGggYW5kIGhlaWdodCBmb3IgdGhlIFVJXG4gICAgLy8gSWYgbm90IGRlZmluZWQgaW4gdGhlIG9wdGlvbnMsIHRyeSB0aGUgSFRNTCB3aWR0aCArIGhlaWdodCBhdHRyaWJ1dGVzIG9mIHRoZSB3cmFwcGVyLCBlbHNlIGRlZmF1bHQgdG8gMzIwXG4gICAgdmFyIHdpZHRoID0gb3B0cy53aWR0aCB8fCBwYXJzZUludChlbC53aWR0aCkgfHwgMzIwO1xuICAgIHZhciBoZWlnaHQgPSBvcHRzLmhlaWdodCB8fCBwYXJzZUludChlbC5oZWlnaHQpIHx8IDMyMDtcbiAgICAvLyBDYWxjdWxhdGUgbGF5b3V0IHZhcmlhYmxlc1xuICAgIHZhciBwYWRkaW5nID0gb3B0cy5wYWRkaW5nICsgMiB8fCA2LFxuICAgICAgICBib3JkZXJXaWR0aCA9IG9wdHMuYm9yZGVyV2lkdGggfHwgMCxcbiAgICAgICAgbWFya2VyUmFkaXVzID0gb3B0cy5tYXJrZXJSYWRpdXMgfHwgOCxcbiAgICAgICAgc2xpZGVyTWFyZ2luID0gb3B0cy5zbGlkZXJNYXJnaW4gfHwgMjQsXG4gICAgICAgIHNsaWRlckhlaWdodCA9IG9wdHMuc2xpZGVySGVpZ2h0IHx8IG1hcmtlclJhZGl1cyAqIDIgKyBwYWRkaW5nICogMiArIGJvcmRlcldpZHRoICogMixcbiAgICAgICAgYm9keVdpZHRoID0gTWF0aC5taW4oaGVpZ2h0IC0gc2xpZGVySGVpZ2h0IC0gc2xpZGVyTWFyZ2luLCB3aWR0aCksXG4gICAgICAgIHdoZWVsUmFkaXVzID0gYm9keVdpZHRoIC8gMiAtIGJvcmRlcldpZHRoLFxuICAgICAgICBsZWZ0TWFyZ2luID0gKHdpZHRoIC0gYm9keVdpZHRoKSAvIDI7XG4gICAgdmFyIG1hcmtlciA9IHtcbiAgICAgIHI6IG1hcmtlclJhZGl1c1xuICAgIH07XG4gICAgdmFyIGJvcmRlclN0eWxlcyA9IHtcbiAgICAgIHc6IGJvcmRlcldpZHRoLFxuICAgICAgY29sb3I6IG9wdHMuYm9yZGVyQ29sb3IgfHwgXCIjZmZmXCJcbiAgICB9O1xuXG4gICAgLy8gQ3JlYXRlIFVJIGVsZW1lbnRzXG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuc3ZnID0gbmV3IF9zdmcyLmRlZmF1bHQoZWwsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMudWkgPSBbbmV3IF93aGVlbDIuZGVmYXVsdCh0aGlzLnN2Zywge1xuICAgICAgY1g6IGxlZnRNYXJnaW4gKyBib2R5V2lkdGggLyAyLFxuICAgICAgY1k6IGJvZHlXaWR0aCAvIDIsXG4gICAgICByOiB3aGVlbFJhZGl1cyxcbiAgICAgIHJNYXg6IHdoZWVsUmFkaXVzIC0gKG1hcmtlclJhZGl1cyArIHBhZGRpbmcpLFxuICAgICAgbWFya2VyOiBtYXJrZXIsXG4gICAgICBib3JkZXI6IGJvcmRlclN0eWxlcyxcbiAgICAgIGxpZ2h0bmVzczogb3B0cy53aGVlbExpZ2h0bmVzcyA9PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy53aGVlbExpZ2h0bmVzcyxcbiAgICAgIGFudGljbG9ja3dpc2U6IG9wdHMuYW50aWNsb2Nrd2lzZVxuICAgIH0pLCBuZXcgX3NsaWRlcjIuZGVmYXVsdCh0aGlzLnN2Zywge1xuICAgICAgc2xpZGVyVHlwZTogXCJ2XCIsXG4gICAgICB4OiBsZWZ0TWFyZ2luICsgYm9yZGVyV2lkdGgsXG4gICAgICB5OiBib2R5V2lkdGggKyBzbGlkZXJNYXJnaW4sXG4gICAgICB3OiBib2R5V2lkdGggLSBib3JkZXJXaWR0aCAqIDIsXG4gICAgICBoOiBzbGlkZXJIZWlnaHQgLSBib3JkZXJXaWR0aCAqIDIsXG4gICAgICByOiBzbGlkZXJIZWlnaHQgLyAyIC0gYm9yZGVyV2lkdGgsXG4gICAgICBtYXJrZXI6IG1hcmtlcixcbiAgICAgIGJvcmRlcjogYm9yZGVyU3R5bGVzXG4gICAgfSldO1xuICAgIC8vIENyZWF0ZSBhbiBpcm9TdHlsZVNoZWV0IGZvciB0aGlzIGNvbG9yV2hlZWwncyBDU1Mgb3ZlcnJpZGVzXG4gICAgdGhpcy5zdHlsZXNoZWV0ID0gbmV3IF9zdHlsZXNoZWV0Mi5kZWZhdWx0KCk7XG4gICAgLy8gQ3JlYXRlIGFuIGlyb0NvbG9yIHRvIHN0b3JlIHRoaXMgY29sb3JXaGVlbCdzIHNlbGVjdGVkIGNvbG9yXG4gICAgdGhpcy5jb2xvciA9IG5ldyBfY29sb3IyLmRlZmF1bHQoKTtcbiAgICAvLyBXaGVuZXZlciB0aGUgc2VsZWN0ZWQgY29sb3IgY2hhbmdlcywgdHJpZ2dlciBhIGNvbG9yV2hlZWwgdXBkYXRlIHRvb1xuICAgIHRoaXMuY29sb3IuX29uQ2hhbmdlID0gdGhpcy5fdXBkYXRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jb2xvci5zZXQob3B0cy5jb2xvciB8fCBvcHRzLmRlZmF1bHRWYWx1ZSB8fCBcIiNmZmZcIik7XG4gICAgLy8gSGFja3kgd29ya2Fyb3VuZCBmb3IgYSBjb3VwbGUgb2YgU2FmYXJpIFNWRyB1cmwgYnVnc1xuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFhbWVzL2lyby5qcy9pc3N1ZXMvMThcbiAgICAvLyBUT0RPOiBwZXJoYXBzIG1ha2UgdGhpcyBhIHNlcGVyYXRlIHBsdWdpbiwgaXQncyBoYWNreSBhbmQgdGFrZXMgdXAgbW9yZSBzcGFjZSB0aGFuIEknbSBoYXBweSB3aXRoXG4gICAgdGhpcy5vbihcImhpc3Rvcnk6c3RhdGVDaGFuZ2VcIiwgZnVuY3Rpb24gKGJhc2UpIHtcbiAgICAgIF90aGlzMy5zdmcudXBkYXRlVXJscyhiYXNlKTtcbiAgICB9KTtcbiAgICAvLyBMaXN0ZW4gdG8gZXZlbnRzXG4gICAgbGlzdGVuKHRoaXMuc3ZnLmVsLCBbRVZFTlRfTU9VU0VET1dOLCBFVkVOVF9UT1VDSFNUQVJUXSwgdGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyB1cGRhdGUgdGhlIHNlbGVjdGVkIGNvbG9yXG4gICAgKiBAcGFyYW0ge09iamVjdH0gbmV3VmFsdWUgLSB0aGUgbmV3IEhTViB2YWx1ZXNcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbGRWYWx1ZSAtIHRoZSBvbGQgSFNWIHZhbHVlc1xuICAgICogQHBhcmFtIHtPYmplY3R9IGNoYW5nZXMgLSBib29sZWFucyBmb3IgZWFjaCBIU1YgY2hhbm5lbDogdHJ1ZSBpZiB0aGUgbmV3IHZhbHVlIGlzIGRpZmZlcmVudCB0byB0aGUgb2xkIHZhbHVlLCBlbHNlIGZhbHNlXG4gICAgKiBAYWNjZXNzIHByb3RlY3RlZFxuICAqL1xuICBfdXBkYXRlOiBmdW5jdGlvbiBfdXBkYXRlKGNvbG9yLCBjaGFuZ2VzKSB7XG4gICAgdmFyIHJnYiA9IGNvbG9yLnJnYlN0cmluZztcbiAgICB2YXIgY3NzID0gdGhpcy5jc3M7XG4gICAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggVUkgZWxlbWVudCBhbmQgdXBkYXRlIGl0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVpLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnVpW2ldLnVwZGF0ZShjb2xvciwgY2hhbmdlcyk7XG4gICAgfVxuICAgIC8vIFVwZGF0ZSB0aGUgc3R5bGVzaGVldCB0b29cbiAgICBmb3IgKHZhciBzZWxlY3RvciBpbiBjc3MpIHtcbiAgICAgIHZhciBwcm9wZXJ0aWVzID0gY3NzW3NlbGVjdG9yXTtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gcHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnN0eWxlc2hlZXQuc2V0UnVsZShzZWxlY3RvciwgcHJvcCwgcmdiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wcyBpZiB0aGUgY29sb3IgaXMgc2V0IGluc2lkZSBhIGBjb2xvcjpjaGFuZ2VgIGNhbGxiYWNrXG4gICAgaWYgKCF0aGlzLl9jb2xvckNoYW5nZUFjdGl2ZSkge1xuICAgICAgLy8gV2hpbGUgX2NvbG9yQ2hhbmdlQWN0aXZlID0gdHJ1ZSwgdGhpcyBldmVudCBjYW5ub3QgYmUgZmlyZWRcbiAgICAgIHRoaXMuX2NvbG9yQ2hhbmdlQWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZW1pdChcImNvbG9yOmNoYW5nZVwiLCBjb2xvciwgY2hhbmdlcyk7XG4gICAgICB0aGlzLl9jb2xvckNoYW5nZUFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgKiBAZGVzYyBTZXQgYSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgYW4gZXZlbnRcbiAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gdG8sIHBhc3MgXCIqXCIgdG8gbGlzdGVuIHRvIGFsbCBldmVudHNcbiAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgd2F0Y2ggY2FsbGJhY2tcbiAgKi9cbiAgb246IGZ1bmN0aW9uIG9uKGV2ZW50VHlwZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgIChldmVudHNbZXZlbnRUeXBlXSB8fCAoZXZlbnRzW2V2ZW50VHlwZV0gPSBbXSkpLnB1c2goY2FsbGJhY2spO1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2MgUmVtb3ZlIGEgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGFuIGV2ZW50IGFkZGVkIHdpdGggb24oKVxuICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSB3YXRjaCBjYWxsYmFjayB0byByZW1vdmUgZnJvbSB0aGUgZXZlbnRcbiAgKi9cbiAgb2ZmOiBmdW5jdGlvbiBvZmYoZXZlbnRUeXBlLCBjYWxsYmFjaykge1xuICAgIHZhciBldmVudExpc3QgPSB0aGlzLl9ldmVudHNbZXZlbnRUeXBlXTtcbiAgICBpZiAoZXZlbnRMaXN0KSBldmVuTGlzdC5zcGxpY2UoZXZlbnRMaXN0LmluZGV4T2YoY2FsbGJhY2spLCAxKTtcbiAgfSxcblxuICAvKipcbiAgICAqIEBkZXNjIEVtaXQgYW4gZXZlbnRcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXRcbiAgICAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgYXJyYXkgb2YgYXJncyB0byBwYXNzIHRvIGNhbGxiYWNrc1xuICAqL1xuICBlbWl0OiBmdW5jdGlvbiBlbWl0KGV2ZW50VHlwZSkge1xuICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHMsXG4gICAgICAgIGNhbGxiYWNrTGlzdCA9IChldmVudHNbZXZlbnRUeXBlXSB8fCBbXSkuY29uY2F0KGV2ZW50c1tcIipcIl0gfHwgW10pO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY2FsbGJhY2tMaXN0W2ldLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICAqIEBkZXNjIERPTSBldmVudCBoYW5kbGVyXG4gICAgKiBAcGFyYW0ge0V2ZW50fSBlIERPTSBldmVudCAoY3VycmVudGx5IGVpdGhlciBtb3VzZSBvciB0b3VjaCBldmVudHMpXG4gICovXG4gIGhhbmRsZUV2ZW50OiBmdW5jdGlvbiBoYW5kbGVFdmVudChlKSB7XG4gICAgLy8gRGV0ZWN0IGlmIHRoZSBldmVudCBpcyBhIHRvdWNoIGV2ZW50IGJ5IGNoZWNraW5nIGlmIGl0IGhhcyB0aGUgYHRvdWNoZXNgIHByb3BlcnR5XG4gICAgLy8gSWYgaXQgaXMgYSB0b3VjaCBldmVudCwgdXNlIHRoZSBmaXJzdCB0b3VjaCBpbnB1dFxuICAgIHZhciBwb2ludCA9IGUudG91Y2hlcyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlLFxuXG4gICAgLy8gR2V0IHRoZSBzY3JlZW4gcG9zaXRpb24gb2YgdGhlIFVJXG4gICAgcmVjdCA9IHRoaXMuc3ZnLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXG4gICAgLy8gQ29udmVydCB0aGUgc2NyZWVuLXNwYWNlIHBvaW50ZXIgcG9zaXRpb24gdG8gbG9jYWwtc3BhY2VcbiAgICB4ID0gcG9pbnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgeSA9IHBvaW50LmNsaWVudFkgLSByZWN0LnRvcDtcblxuICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICBjYXNlIEVWRU5UX01PVVNFRE9XTjpcbiAgICAgIGNhc2UgRVZFTlRfVE9VQ0hTVEFSVDpcbiAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggVUkgZWxlbWVudCBhbmQgY2hlY2sgaWYgdGhlIHBvaW50IFwiaGl0c1wiIGl0XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy51aS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciB1aUVsZW1lbnQgPSB0aGlzLnVpW2ldO1xuICAgICAgICAgIC8vIElmIHRoZSBlbGVtZW50IGlzIGhpdCwgdGhpcyBtZWFucyB0aGUgdXNlciBoYXMgY2xpY2tlZCB0aGUgZWxlbWVudCBhbmQgaXMgdHJ5aW5nIHRvIGludGVyYWN0IHdpdGggaXRcbiAgICAgICAgICBpZiAodWlFbGVtZW50LmNoZWNrSGl0KHgsIHkpKSB7XG4gICAgICAgICAgICAvLyBTZXQgYW4gaW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSB1aUVsZW1lbnQgYmVpbmcgaW50ZXJhY3RlZCB3aXRoLCBmb3Igb3RoZXIgaW50ZXJuYWwgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgICAgIHRoaXMuX21vdXNlVGFyZ2V0ID0gdWlFbGVtZW50O1xuICAgICAgICAgICAgLy8gQXR0YWNoIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgbGlzdGVuKGRvY3VtZW50LCBbRVZFTlRfTU9VU0VNT1ZFLCBFVkVOVF9UT1VDSE1PVkUsIEVWRU5UX01PVVNFVVAsIEVWRU5UX1RPVUNIRU5EXSwgdGhpcyk7XG4gICAgICAgICAgICAvLyBFbWl0IGlucHV0IHN0YXJ0IGV2ZW50XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJpbnB1dDpzdGFydFwiKTtcbiAgICAgICAgICAgIC8vIEZpbmFsbHksIHVzZSB0aGUgcG9zaXRpb24gdG8gdXBkYXRlIHRoZSBwaWNrZWQgY29sb3JcbiAgICAgICAgICAgIHRoaXMuY29sb3IuaHN2ID0gdGhpcy5fbW91c2VUYXJnZXQuaW5wdXQoeCwgeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFVkVOVF9NT1VTRU1PVkU6XG4gICAgICBjYXNlIEVWRU5UX1RPVUNITU9WRTpcbiAgICAgICAgLy8gVXNlIHRoZSBwb3NpdGlvbiB0byB1cGRhdGUgdGhlIHBpY2tlciBjb2xvclxuICAgICAgICB0aGlzLmNvbG9yLmhzdiA9IHRoaXMuX21vdXNlVGFyZ2V0LmlucHV0KHgsIHkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRVZFTlRfTU9VU0VVUDpcbiAgICAgIGNhc2UgRVZFTlRfVE9VQ0hFTkQ6XG4gICAgICAgIHRoaXMuX21vdXNlVGFyZ2V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdChcImlucHV0OmVuZFwiKTtcbiAgICAgICAgdW5saXN0ZW4oZG9jdW1lbnQsIFtFVkVOVF9NT1VTRU1PVkUsIEVWRU5UX1RPVUNITU9WRSwgRVZFTlRfTU9VU0VVUCwgRVZFTlRfVE9VQ0hFTkRdLCB0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLl9tb3VzZVRhcmdldCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb2xvclBpY2tlcjtcblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfY29sb3JQaWNrZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX2NvbG9yUGlja2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbG9yUGlja2VyKTtcblxudmFyIF9jb2xvciA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfY29sb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29sb3IpO1xuXG52YXIgX3N0eWxlc2hlZXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX3N0eWxlc2hlZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVzaGVldCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDb2xvcjogX2NvbG9yMi5kZWZhdWx0LFxuICBDb2xvclBpY2tlcjogX2NvbG9yUGlja2VyMi5kZWZhdWx0LFxuICBTdHlsZXNoZWV0OiBfc3R5bGVzaGVldDIuZGVmYXVsdCxcbiAgdmVyc2lvbjogXCIzLjIuMFwiXG59O1xuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIF9tYXJrZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX21hcmtlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXJrZXIpO1xuXG52YXIgX2NvbG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9jb2xvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIGNzcyBjbGFzcyBwcmVmaXggZm9yIHRoaXMgZWxlbWVudFxudmFyIENMQVNTX1BSRUZJWCA9IFwiaXJvX19zbGlkZXJcIjtcblxuLyoqXG4gICogQGNvbnN0cnVjdG9yIHNsaWRlciBVSVxuICAqIEBwYXJhbSB7c3ZnUm9vdH0gc3ZnIC0gc3ZnUm9vdCBvYmplY3RcbiAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiovXG52YXIgc2xpZGVyID0gZnVuY3Rpb24gc2xpZGVyKHN2Zywgb3B0cykge1xuICB2YXIgciA9IG9wdHMucixcbiAgICAgIHcgPSBvcHRzLncsXG4gICAgICBoID0gb3B0cy5oLFxuICAgICAgeCA9IG9wdHMueCxcbiAgICAgIHkgPSBvcHRzLnksXG4gICAgICBib3JkZXJXaWR0aCA9IG9wdHMuYm9yZGVyLnc7XG5cbiAgLy8gXCJyYW5nZVwiIGxpbWl0cyBob3cgZmFyIHRoZSBzbGlkZXIncyBtYXJrZXIgY2FuIHRyYXZlbCwgYW5kIHdoZXJlIGl0IHN0b3BzIGFuZCBzdGFydHMgYWxvbmcgdGhlIFggYXhpc1xuICBvcHRzLnJhbmdlID0ge1xuICAgIG1pbjogeCArIHIsXG4gICAgbWF4OiB4ICsgdyAtIHIsXG4gICAgdzogdyAtIHIgKiAyXG4gIH07XG5cbiAgb3B0cy5zbGlkZXJUeXBlID0gb3B0cy5zbGlkZXJUeXBlIHx8IFwidlwiO1xuXG4gIHRoaXMudHlwZSA9IFwic2xpZGVyXCI7XG4gIHRoaXMuX29wdHMgPSBvcHRzO1xuXG4gIHZhciByYWRpdXMgPSByICsgYm9yZGVyV2lkdGggLyAyO1xuXG4gIHZhciBiYXNlR3JvdXAgPSBzdmcuZyh7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWFxuICB9KTtcblxuICB2YXIgcmVjdCA9IGJhc2VHcm91cC5pbnNlcnQoXCJyZWN0XCIsIHtcbiAgICBjbGFzczogQ0xBU1NfUFJFRklYICsgXCJfX3ZhbHVlXCIsXG4gICAgcng6IHJhZGl1cyxcbiAgICByeTogcmFkaXVzLFxuICAgIHg6IHggLSBib3JkZXJXaWR0aCAvIDIsXG4gICAgeTogeSAtIGJvcmRlcldpZHRoIC8gMixcbiAgICB3aWR0aDogdyArIGJvcmRlcldpZHRoLFxuICAgIGhlaWdodDogaCArIGJvcmRlcldpZHRoLFxuICAgIHN0cm9rZVdpZHRoOiBib3JkZXJXaWR0aCxcbiAgICBzdHJva2U6IG9wdHMuYm9yZGVyLmNvbG9yXG4gIH0pO1xuXG4gIHJlY3Quc2V0R3JhZGllbnQoXCJmaWxsXCIsIHN2Zy5ncmFkaWVudChcImxpbmVhclwiLCB7XG4gICAgMDogeyBjb2xvcjogXCIjMDAwXCIgfSxcbiAgICAxMDA6IHsgY29sb3I6IFwiI2ZmZlwiIH1cbiAgfSkpO1xuXG4gIHRoaXMuX2dyYWRpZW50ID0gcmVjdC5ncmFkaWVudDtcblxuICB0aGlzLm1hcmtlciA9IG5ldyBfbWFya2VyMi5kZWZhdWx0KGJhc2VHcm91cCwgb3B0cy5tYXJrZXIpO1xufTtcblxuc2xpZGVyLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IHNsaWRlcixcblxuICAvKipcbiAgICAqIEBkZXNjIHVwZGF0ZXMgdGhpcyBlbGVtZW50IHRvIHJlcHJlc2VudCBhIG5ldyBjb2xvciB2YWx1ZVxuICAgICogQHBhcmFtIHtPYmplY3R9IGNvbG9yIC0gYW4gaXJvQ29sb3Igb2JqZWN0IHdpdGggdGhlIG5ldyBjb2xvciB2YWx1ZVxuICAgICogQHBhcmFtIHtPYmplY3R9IGNoYW5nZXMgLSBhbiBvYmplY3QgdGhhdCBnaXZlcyBhIGJvb2xlYW4gZm9yIGVhY2ggSFNWIGNoYW5uZWwsIGluZGljYXRpbmcgd2hldGhlciBvdCBub3QgdGhhdCBjaGFubmVsIGhhcyBjaGFuZ2VkXG4gICovXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGNvbG9yLCBjaGFuZ2VzKSB7XG4gICAgdmFyIG9wdHMgPSB0aGlzLl9vcHRzO1xuICAgIHZhciByYW5nZSA9IG9wdHMucmFuZ2U7XG4gICAgdmFyIGhzdiA9IGNvbG9yLmhzdjtcbiAgICB2YXIgaHNsID0gX2NvbG9yMi5kZWZhdWx0LmhzdjJIc2woeyBoOiBoc3YuaCwgczogaHN2LnMsIHY6IDEwMCB9KTtcbiAgICBpZiAob3B0cy5zbGlkZXJUeXBlID09IFwidlwiKSB7XG4gICAgICBpZiAoY2hhbmdlcy5oIHx8IGNoYW5nZXMucykge1xuICAgICAgICB0aGlzLl9ncmFkaWVudC5zdG9wc1sxXS5zZXRBdHRycyh7IHN0b3BDb2xvcjogXCJoc2woXCIgKyBoc2wuaCArIFwiLFwiICsgaHNsLnMgKyBcIiUsXCIgKyBoc2wubCArIFwiJSlcIiB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VzLnYpIHtcbiAgICAgICAgdmFyIHBlcmNlbnQgPSBoc3YudiAvIDEwMDtcbiAgICAgICAgdGhpcy5tYXJrZXIubW92ZShyYW5nZS5taW4gKyBwZXJjZW50ICogcmFuZ2Uudywgb3B0cy55ICsgb3B0cy5oIC8gMik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2MgVGFrZXMgYSBwb2ludCBhdCAoeCwgeSkgYW5kIHJldHVybnMgSFNWIHZhbHVlcyBiYXNlZCBvbiB0aGlzIGlucHV0IC0tIHVzZSB0aGlzIHRvIHVwZGF0ZSBhIGNvbG9yIGZyb20gbW91c2UgaW5wdXRcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gcG9pbnQgeCBjb29yZGluYXRlXG4gICAgKiBAcGFyYW0ge051bWJlcn0geSAtIHBvaW50IHkgY29vcmRpbmF0ZVxuICAgICogQHJldHVybiB7T2JqZWN0fSAtIG5ldyBIU1YgY29sb3IgdmFsdWVzIChzb21lIGNoYW5uZWxzIG1heSBiZSBtaXNzaW5nKVxuICAqL1xuICBpbnB1dDogZnVuY3Rpb24gaW5wdXQoeCwgeSkge1xuICAgIHZhciBvcHRzID0gdGhpcy5fb3B0cztcbiAgICB2YXIgcmFuZ2UgPSBvcHRzLnJhbmdlO1xuICAgIHZhciBkaXN0ID0gTWF0aC5tYXgoTWF0aC5taW4oeCwgcmFuZ2UubWF4KSwgcmFuZ2UubWluKSAtIHJhbmdlLm1pbjtcbiAgICByZXR1cm4ge1xuICAgICAgdjogTWF0aC5yb3VuZCgxMDAgLyByYW5nZS53ICogZGlzdClcbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2MgQ2hlY2sgaWYgYSBwb2ludCBhdCAoeCwgeSkgaXMgaW5zaWRlIHRoaXMgZWxlbWVudFxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHggLSBwb2ludCB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gcG9pbnQgeSBjb29yZGluYXRlXG4gICAgKiBAcmV0dXJuIHtCb29sZWFufSAtIHRydWUgaWYgdGhlIHBvaW50IGlzIGEgXCJoaXRcIiwgZWxzZSBmYWxzZVxuICAqL1xuICBjaGVja0hpdDogZnVuY3Rpb24gY2hlY2tIaXQoeCwgeSkge1xuICAgIHZhciBvcHRzID0gdGhpcy5fb3B0cztcbiAgICByZXR1cm4geCA+IG9wdHMueCAmJiB4IDwgb3B0cy54ICsgb3B0cy53ICYmIHkgPiBvcHRzLnkgJiYgeSA8IG9wdHMueSArIG9wdHMuaDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNsaWRlcjtcblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBHUkFESUVOVF9JTkRFWCA9IDA7XG52YXIgR1JBRElFTlRfU1VGRklYID0gXCJHcmFkaWVudFwiO1xudmFyIFNWR19OQU1FU1BBQ0UgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG52YXIgU1ZHX0FUVFJJQlVURV9TSE9SVEhBTkRTID0ge1xuICBjbGFzczogXCJjbGFzc1wiLFxuICBzdHJva2U6IFwic3Ryb2tlXCIsXG4gIHN0cm9rZVdpZHRoOiBcInN0cm9rZS13aWR0aFwiLFxuICBmaWxsOiBcImZpbGxcIixcbiAgb3BhY2l0eTogXCJvcGFjaXR5XCIsXG4gIG9mZnNldDogXCJvZmZzZXRcIixcbiAgc3RvcENvbG9yOiBcInN0b3AtY29sb3JcIixcbiAgc3RvcE9wYWNpdHk6IFwic3RvcC1vcGFjaXR5XCJcbn07XG4vLyBUT0RPOiBmaWd1cmUgb3V0IHdoeSB0aGVzZSBhcmVuJ3QgYmVpbmcgY29tcHJlc3NlZCBwcm9wZXJseT9cbnZhciBTVkdfVFJBTlNGT1JNX1NIT1JUSEFORFMgPSB7XG4gIHRyYW5zbGF0ZTogXCJzZXRUcmFuc2xhdGVcIixcbiAgc2NhbGU6IFwic2V0U2NhbGVcIixcbiAgcm90YXRlOiBcInNldFJvdGF0ZVwiXG59O1xuLy8gc25pZmYgdXNlcmFnZW50IHN0cmluZyB0byBjaGVjayBpZiB0aGUgdXNlciBpcyBydW5uaW5nIElFLCBFZGdlIG9yIFNhZmFyaVxudmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbnZhciBJU19JRSA9IC9tc2llfHRyaWRlbnR8ZWRnZS8udGVzdCh1YSk7XG52YXIgSVNfU0FGQVJJID0gL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdCh1YSk7XG4vKipcbiAgKiBAY29uc3RydWN0b3Igc3ZnIGVsZW1lbnQgd3JhcHBlclxuICAqIEBwYXJhbSB7c3ZnUm9vdH0gcm9vdCAtIHN2Z1Jvb3Qgb2JqZWN0XG4gICogQHBhcmFtIHtzdmdFbGVtZW50IHwgRWxlbWVudH0gcGFyZW50IC0gcGFyZW50IG5vZGUgXG4gICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBlbGVtZW50IHRhZyBuYW1lXG4gICogQHBhcmFtIHtPYmplY3R9IGF0dHJzIC0gZWxlbWVudCBhdHRyaWJ1dGVzXG4qL1xudmFyIHN2Z0VsZW1lbnQgPSBmdW5jdGlvbiBzdmdFbGVtZW50KHJvb3QsIHBhcmVudCwgdHlwZSwgYXR0cnMpIHtcbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OQU1FU1BBQ0UsIHR5cGUpO1xuICB0aGlzLmVsID0gZWw7XG4gIHRoaXMuc2V0QXR0cnMoYXR0cnMpO1xuICAocGFyZW50LmVsIHx8IHBhcmVudCkuYXBwZW5kQ2hpbGQoZWwpO1xuICB0aGlzLl9yb290ID0gcm9vdDtcbiAgdGhpcy5fc3ZnVHJhbnNmb3JtcyA9IHt9O1xuICB0aGlzLl90cmFuc2Zvcm1MaXN0ID0gZWwudHJhbnNmb3JtID8gZWwudHJhbnNmb3JtLmJhc2VWYWwgOiBmYWxzZTtcbn07XG5cbnN2Z0VsZW1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3Rvcjogc3ZnRWxlbWVudCxcblxuICAvKipcbiAgICAqIEBkZXNjIGluc2VydCBhIG5ldyBzdmdFbGVtZW50XG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIGVsZW1lbnQgdGFnIG5hbWVcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycyAtIGVsZW1lbnQgYXR0cmlidXRlc1xuICAqL1xuICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydCh0eXBlLCBhdHRycykge1xuICAgIHJldHVybiBuZXcgc3ZnRWxlbWVudCh0aGlzLl9yb290LCB0aGlzLCB0eXBlLCBhdHRycyk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBzaG9ydGhhbmQgdG8gaW5zZXJ0IGEgbmV3IGdyb3VwIHN2Z0VsZW1lbnRcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycyAtIGVsZW1lbnQgYXR0cmlidXRlc1xuICAqL1xuICBnOiBmdW5jdGlvbiBnKGF0dHJzKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0KFwiZ1wiLCBhdHRycyk7XG4gIH0sXG5cbiAgLyoqXG4gICAgKiBAZGVzYyBzaG9ydGhhbmQgdG8gaW5zZXJ0IGEgbmV3IGFyYyBzdmdFbGVtZW50XG4gICAgKiBAcGFyYW0ge051bWJlcn0gY3ggLSBhcmMgY2VudGVyIHhcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSBjeSAtIGFyYyBjZW50ZXIgeVxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZGl1cyAtIGFyYyByYWRpdXNcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydEFuZ2xlIC0gYXJjIHN0YXJ0IGFuZ2xlIChpbiBkZWdyZWVzKVxuICAgICogQHBhcmFtIHtOdW1iZXJ9IGVuZEFuZ2xlIC0gYXJjIGVuZCBhbmdsZSAoaW4gZGVncmVlcylcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycyAtIGVsZW1lbnQgYXR0cmlidXRlc1xuICAqL1xuICBhcmM6IGZ1bmN0aW9uIGFyYyhjeCwgY3ksIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGF0dHJzKSB7XG4gICAgdmFyIGxhcmdlQXJjRmxhZyA9IGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA8PSAxODAgPyAwIDogMTtcbiAgICBzdGFydEFuZ2xlICo9IE1hdGguUEkgLyAxODA7XG4gICAgZW5kQW5nbGUgKj0gTWF0aC5QSSAvIDE4MDtcbiAgICB2YXIgeDEgPSBjeCArIHJhZGl1cyAqIE1hdGguY29zKGVuZEFuZ2xlKSxcbiAgICAgICAgeTEgPSBjeSArIHJhZGl1cyAqIE1hdGguc2luKGVuZEFuZ2xlKSxcbiAgICAgICAgeDIgPSBjeCArIHJhZGl1cyAqIE1hdGguY29zKHN0YXJ0QW5nbGUpLFxuICAgICAgICB5MiA9IGN5ICsgcmFkaXVzICogTWF0aC5zaW4oc3RhcnRBbmdsZSk7XG4gICAgYXR0cnMgPSBhdHRycyB8fCB7fTtcbiAgICBhdHRycy5kID0gW1wiTVwiLCB4MSwgeTEsIFwiQVwiLCByYWRpdXMsIHJhZGl1cywgMCwgbGFyZ2VBcmNGbGFnLCAwLCB4MiwgeTJdLmpvaW4oXCIgXCIpO1xuICAgIHJldHVybiB0aGlzLmluc2VydChcInBhdGhcIiwgYXR0cnMpO1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2Mgc2hvcnRoYW5kIHRvIGluc2VydCBhIG5ldyBjaXJjbGUgc3ZnRWxlbWVudFxuICAgICogQHBhcmFtIHtOdW1iZXJ9IGN4IC0gY2lyY2xlIGNlbnRlciB4XG4gICAgKiBAcGFyYW0ge051bWJlcn0gY3kgLSBjaXJjbGUgY2VudGVyIHlcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXMgLSBjaXJjbGUgcmFkaXVzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnMgLSBlbGVtZW50IGF0dHJpYnV0ZXNcbiAgKi9cbiAgY2lyY2xlOiBmdW5jdGlvbiBjaXJjbGUoY3gsIGN5LCByYWRpdXMsIGF0dHJzKSB7XG4gICAgYXR0cnMgPSBhdHRycyB8fCB7fTtcbiAgICBhdHRycy5jeCA9IGN4O1xuICAgIGF0dHJzLmN5ID0gY3k7XG4gICAgYXR0cnMuciA9IHJhZGl1cztcbiAgICByZXR1cm4gdGhpcy5pbnNlcnQoXCJjaXJjbGVcIiwgYXR0cnMpO1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2Mgc2V0IGEgcm90YXRlL3RyYW5zbGF0ZS9zY2FsZSB0cmFuc2Zvcm0gb24gdGhpcyBlbGVtZW50XG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIHRyYW5zZm9ybSAocm90YXRlIHwgdHJhbnNsYXRlIHwgc2NhbGUpXG4gICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzIC0gdHJhbnNmb3JtIHZhbHVlc1xuICAqL1xuICBzZXRUcmFuc2Zvcm06IGZ1bmN0aW9uIHNldFRyYW5zZm9ybSh0eXBlLCBhcmdzKSB7XG4gICAgaWYgKCFJU19JRSkge1xuICAgICAgdmFyIHRyYW5zZm9ybSwgdHJhbnNmb3JtRm47XG4gICAgICB2YXIgc3ZnVHJhbnNmb3JtcyA9IHRoaXMuX3N2Z1RyYW5zZm9ybXM7XG4gICAgICBpZiAoIXN2Z1RyYW5zZm9ybXNbdHlwZV0pIHtcbiAgICAgICAgdHJhbnNmb3JtID0gdGhpcy5fcm9vdC5lbC5jcmVhdGVTVkdUcmFuc2Zvcm0oKTtcbiAgICAgICAgc3ZnVHJhbnNmb3Jtc1t0eXBlXSA9IHRyYW5zZm9ybTtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtTGlzdC5hcHBlbmRJdGVtKHRyYW5zZm9ybSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2Zvcm0gPSBzdmdUcmFuc2Zvcm1zW3R5cGVdO1xuICAgICAgfVxuICAgICAgdHJhbnNmb3JtRm4gPSB0eXBlIGluIFNWR19UUkFOU0ZPUk1fU0hPUlRIQU5EUyA/IFNWR19UUkFOU0ZPUk1fU0hPUlRIQU5EU1t0eXBlXSA6IHR5cGU7XG4gICAgICB0cmFuc2Zvcm1bdHJhbnNmb3JtRm5dLmFwcGx5KHRyYW5zZm9ybSwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1pY3Jvc29mdCBzdGlsbCBjYW4ndCBtYWtlIGEgd2ViIGJyb3dzZXIgdGhhdCBhY3R1YWxseSB3b3JrcywgYXMgc3VjaCwgRWRnZSArIElFIGRvbnQgaW1wbGVtZW50IFNWRyB0cmFuc2Zvcm1zIHByb3Blcmx5LlxuICAgICAgLy8gV2UgaGF2ZSB0byBmb3JjZSB0aGVtIGluc3RlYWQuLi4gZ2VlelxuICAgICAgdGhpcy5zZXRBdHRycyh7IFwidHJhbnNmb3JtXCI6IHR5cGUgKyBcIihcIiArIGFyZ3Muam9pbihcIiwgXCIpICsgXCIpXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2Mgc2V0IGF0dHJpYnV0ZXMgb24gdGhpcyBlbGVtZW50XG4gICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnMgLSBlbGVtZW50IGF0dHJpYnV0ZXNcbiAgKi9cbiAgc2V0QXR0cnM6IGZ1bmN0aW9uIHNldEF0dHJzKGF0dHJzKSB7XG4gICAgZm9yICh2YXIgYXR0ciBpbiBhdHRycykge1xuICAgICAgdmFyIG5hbWUgPSBhdHRyIGluIFNWR19BVFRSSUJVVEVfU0hPUlRIQU5EUyA/IFNWR19BVFRSSUJVVEVfU0hPUlRIQU5EU1thdHRyXSA6IGF0dHI7XG4gICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZShuYW1lLCBhdHRyc1thdHRyXSk7XG4gICAgfVxuICB9LFxuXG4gIHNldEdyYWRpZW50OiBmdW5jdGlvbiBzZXRHcmFkaWVudChhdHRyLCBncmFkaWVudCkge1xuICAgIHZhciBhdHRycyA9IHt9O1xuICAgIGF0dHJzW2F0dHJdID0gZ3JhZGllbnQuZ2V0VXJsKCk7XG4gICAgZ3JhZGllbnQuX3JlZnNbYXR0cl0gPSB0aGlzO1xuICAgIHRoaXMuZ3JhZGllbnQgPSBncmFkaWVudDtcbiAgICB0aGlzLnNldEF0dHJzKGF0dHJzKTtcbiAgfVxufTtcblxuLyoqXG4gICogQGNvbnN0cnVjdG9yIHN2ZyBncmFkaWVudCB3cmFwcGVyXG4gICogQHBhcmFtIHtzdmdSb290fSByb290IC0gc3ZnUm9vdCBvYmplY3RcbiAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIGdyYWRpZW50IHR5cGUgKGxpbmVhciB8IHJhZGlhbClcbiAgKiBAcGFyYW0ge09iamVjdH0gc3RvcHMgLSBncmFkaWVudCBzdG9wcyA9IHtjb2xvciwgb3BhY2l0eX0ga2V5ZWQgYnkgb2Zmc2V0IHZhbHVlXG4qL1xudmFyIHN2Z0dyYWRpZW50ID0gZnVuY3Rpb24gc3ZnR3JhZGllbnQocm9vdCwgdHlwZSwgc3RvcHMpIHtcbiAgdmFyIHN0b3BFbGVtZW50cyA9IFtdO1xuICB2YXIgZ3JhZGllbnQgPSByb290Ll9kZWZzLmluc2VydCh0eXBlICsgR1JBRElFTlRfU1VGRklYLCB7XG4gICAgaWQ6IFwiaXJvXCIgKyBHUkFESUVOVF9TVUZGSVggKyBHUkFESUVOVF9JTkRFWCsrXG4gIH0pO1xuICBmb3IgKHZhciBvZmZzZXQgaW4gc3RvcHMpIHtcbiAgICB2YXIgc3RvcCA9IHN0b3BzW29mZnNldF07XG4gICAgc3RvcEVsZW1lbnRzLnB1c2goZ3JhZGllbnQuaW5zZXJ0KFwic3RvcFwiLCB7XG4gICAgICBvZmZzZXQ6IG9mZnNldCArIFwiJVwiLFxuICAgICAgc3RvcENvbG9yOiBzdG9wLmNvbG9yLFxuICAgICAgc3RvcE9wYWNpdHk6IHN0b3Aub3BhY2l0eSA9PT0gdW5kZWZpbmVkID8gMSA6IHN0b3Aub3BhY2l0eVxuICAgIH0pKTtcbiAgfVxuICB0aGlzLmVsID0gZ3JhZGllbnQuZWw7XG4gIHRoaXMuc3RvcHMgPSBzdG9wRWxlbWVudHM7XG4gIHRoaXMuX3JlZnMgPSB7fTtcbn07XG5cbnN2Z0dyYWRpZW50LnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoYmFzZSkge1xuICB2YXIgcm9vdCA9IElTX1NBRkFSSSA/IGJhc2UgfHwgd2luZG93LmxvY2F0aW9uLmhyZWYgOiBcIlwiO1xuICByZXR1cm4gXCJ1cmwoXCIgKyByb290ICsgXCIjXCIgKyB0aGlzLmVsLmlkICsgXCIpXCI7XG59O1xuXG4vKipcbiAgKiBAY29uc3RydWN0b3Igc3ZnIHJvb3QgZWxlbWVudCAoaW5oZXJpdHMgc3ZnRWxlbWVudClcbiAgKiBAcGFyYW0ge3N2Z0VsZW1lbnQgfCBFbGVtZW50fSBwYXJlbnQgLSBwYXJlbnQgbm9kZSBcbiAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggLSBzdmcgd2lkdGhcbiAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IC0gc3ZnIGhlaWdodFxuKi9cbnZhciBzdmdSb290ID0gZnVuY3Rpb24gc3ZnUm9vdChwYXJlbnQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgc3ZnRWxlbWVudC5jYWxsKHRoaXMsIHRoaXMsIHBhcmVudCwgXCJzdmdcIiwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBzdHlsZTogXCJkaXNwbGF5OmJsb2NrXCIgfSk7XG4gIHRoaXMuX2RlZnMgPSB0aGlzLmluc2VydChcImRlZnNcIik7XG4gIHRoaXMuX2dyYWRpZW50cyA9IFtdO1xufTtcblxuc3ZnUm9vdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN2Z0VsZW1lbnQucHJvdG90eXBlKTtcbnN2Z1Jvb3QucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ZnUm9vdDtcbnN2Z1Jvb3QucHJvdG90eXBlLmdyYWRpZW50ID0gZnVuY3Rpb24gKHR5cGUsIHN0b3BzKSB7XG4gIHZhciBncmFkaWVudCA9IG5ldyBzdmdHcmFkaWVudCh0aGlzLCB0eXBlLCBzdG9wcyk7XG4gIHRoaXMuX2dyYWRpZW50cy5wdXNoKGdyYWRpZW50KTtcbiAgcmV0dXJuIGdyYWRpZW50O1xufTtcbnN2Z1Jvb3QucHJvdG90eXBlLnVwZGF0ZVVybHMgPSBmdW5jdGlvbiAoYmFzZSkge1xuICBpZiAoSVNfU0FGQVJJKSB7XG4gICAgdmFyIGdyYWRpZW50cyA9IHRoaXMuX2dyYWRpZW50cztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYWRpZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIga2V5IGluIGdyYWRpZW50c1tpXS5fcmVmcykge1xuICAgICAgICB2YXIgYXR0cnMgPSB7fTtcbiAgICAgICAgYXR0cnNba2V5XSA9IGdyYWRpZW50c1tpXS5nZXRVcmwoYmFzZSk7XG4gICAgICAgIGdyYWRpZW50c1tpXS5fcmVmc1trZXldLnNldEF0dHJzKGF0dHJzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc3ZnUm9vdDtcblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfbWFya2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9tYXJrZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWFya2VyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gY3NzIGNsYXNzIHByZWZpeCBmb3IgdGhpcyBlbGVtZW50XG52YXIgQ0xBU1NfUFJFRklYID0gXCJpcm9fX3doZWVsXCI7XG4vLyBRdWljayByZWZlcmVuY2VzIHRvIHJldXNlZCBtYXRoIGZ1bmN0aW9uc1xudmFyIFBJID0gTWF0aC5QSSxcbiAgICBzcXJ0ID0gTWF0aC5zcXJ0LFxuICAgIGFicyA9IE1hdGguYWJzLFxuICAgIHJvdW5kID0gTWF0aC5yb3VuZDtcblxuLyoqXG4gICogQGNvbnN0cnVjdG9yIGh1ZSB3aGVlbCBVSVxuICAqIEBwYXJhbSB7c3ZnUm9vdH0gc3ZnIC0gc3ZnUm9vdCBvYmplY3RcbiAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiovXG52YXIgd2hlZWwgPSBmdW5jdGlvbiB3aGVlbChzdmcsIG9wdHMpIHtcbiAgdGhpcy5fb3B0cyA9IG9wdHM7XG4gIHRoaXMudHlwZSA9IFwid2hlZWxcIjtcblxuICB2YXIgY1kgPSBvcHRzLmNZLFxuICAgICAgY1ggPSBvcHRzLmNYLFxuICAgICAgciA9IG9wdHMucixcbiAgICAgIGJvcmRlciA9IG9wdHMuYm9yZGVyO1xuXG4gIHZhciBiYXNlR3JvdXAgPSBzdmcuZyh7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWFxuICB9KTtcblxuICBiYXNlR3JvdXAuY2lyY2xlKGNYLCBjWSwgciArIGJvcmRlci53IC8gMiwge1xuICAgIGNsYXNzOiBDTEFTU19QUkVGSVggKyBcIl9fYm9yZGVyXCIsXG4gICAgZmlsbDogXCIjZmZmXCIsXG4gICAgc3Ryb2tlOiBib3JkZXIuY29sb3IsXG4gICAgc3Ryb2tlV2lkdGg6IGJvcmRlci53XG4gIH0pO1xuXG4gIHZhciByaW5nR3JvdXAgPSBiYXNlR3JvdXAuZyh7XG4gICAgY2xhc3M6IENMQVNTX1BSRUZJWCArIFwiX19odWVcIixcbiAgICBzdHJva2VXaWR0aDogcixcbiAgICBmaWxsOiBcIm5vbmVcIlxuICB9KTtcblxuICBmb3IgKHZhciBodWUgPSAwOyBodWUgPCAzNjA7IGh1ZSsrKSB7XG4gICAgcmluZ0dyb3VwLmFyYyhjWCwgY1ksIHIgLyAyLCBodWUsIGh1ZSArIDEuNSwge1xuICAgICAgc3Ryb2tlOiBcImhzbChcIiArIChvcHRzLmFudGljbG9ja3dpc2UgPyAzNjAgLSBodWUgOiBodWUpICsgXCIsMTAwJSw1MCUpXCJcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzYXR1cmF0aW9uID0gYmFzZUdyb3VwLmNpcmNsZShjWCwgY1ksIHIsIHtcbiAgICBjbGFzczogQ0xBU1NfUFJFRklYICsgXCJfX3NhdHVyYXRpb25cIlxuICB9KTtcblxuICBzYXR1cmF0aW9uLnNldEdyYWRpZW50KFwiZmlsbFwiLCBzdmcuZ3JhZGllbnQoXCJyYWRpYWxcIiwge1xuICAgIDA6IHtcbiAgICAgIGNvbG9yOiBcIiNmZmZcIlxuICAgIH0sXG4gICAgMTAwOiB7XG4gICAgICBjb2xvcjogXCIjZmZmXCIsXG4gICAgICBvcGFjaXR5OiAwXG4gICAgfVxuICB9KSk7XG5cbiAgdGhpcy5fbGlnaHRuZXNzID0gYmFzZUdyb3VwLmNpcmNsZShjWCwgY1ksIHIsIHtcbiAgICBjbGFzczogQ0xBU1NfUFJFRklYICsgXCJfX2xpZ2h0bmVzc1wiLFxuICAgIG9wYWNpdHk6IDBcbiAgfSk7XG5cbiAgdGhpcy5tYXJrZXIgPSBuZXcgX21hcmtlcjIuZGVmYXVsdChiYXNlR3JvdXAsIG9wdHMubWFya2VyKTtcbn07XG5cbndoZWVsLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IHdoZWVsLFxuXG4gIC8qKlxuICAgICogQGRlc2MgdXBkYXRlcyB0aGlzIGVsZW1lbnQgdG8gcmVwcmVzZW50IGEgbmV3IGNvbG9yIHZhbHVlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gY29sb3IgLSBhbiBpcm9Db2xvciBvYmplY3Qgd2l0aCB0aGUgbmV3IGNvbG9yIHZhbHVlXG4gICAgKiBAcGFyYW0ge09iamVjdH0gY2hhbmdlcyAtIGFuIG9iamVjdCB0aGF0IGdpdmVzIGEgYm9vbGVhbiBmb3IgZWFjaCBIU1YgY2hhbm5lbCwgaW5kaWNhdGluZyB3aGV0aGVyIG90IG5vdCB0aGF0IGNoYW5uZWwgaGFzIGNoYW5nZWRcbiAgKi9cbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoY29sb3IsIGNoYW5nZXMpIHtcbiAgICB2YXIgb3B0cyA9IHRoaXMuX29wdHM7XG4gICAgdmFyIGhzdiA9IGNvbG9yLmhzdjtcbiAgICAvLyBJZiB0aGUgViBjaGFubmVsIGhhcyBjaGFuZ2VkLCByZWRyYXcgdGhlIHdoZWVsIFVJIHdpdGggdGhlIG5ldyB2YWx1ZVxuICAgIGlmIChjaGFuZ2VzLnYgJiYgb3B0cy5saWdodG5lc3MpIHtcbiAgICAgIHRoaXMuX2xpZ2h0bmVzcy5zZXRBdHRycyh7IG9wYWNpdHk6ICgxIC0gaHN2LnYgLyAxMDApLnRvRml4ZWQoMikgfSk7XG4gICAgfVxuICAgIC8vIElmIHRoZSBIIG9yIFMgY2hhbm5lbCBoYXMgY2hhbmdlZCwgbW92ZSB0aGUgbWFya2VyIHRvIHRoZSByaWdodCBwb3NpdGlvblxuICAgIGlmIChjaGFuZ2VzLmggfHwgY2hhbmdlcy5zKSB7XG4gICAgICAvLyBjb252ZXJ0IHRoZSBodWUgdmFsdWUgdG8gcmFkaWFucywgc2luY2Ugd2UnbGwgdXNlIGl0IGFzIGFuIGFuZ2xlXG4gICAgICB2YXIgaHVlQW5nbGUgPSAob3B0cy5hbnRpY2xvY2t3aXNlID8gMzYwIC0gaHN2LmggOiBoc3YuaCkgKiAoUEkgLyAxODApO1xuICAgICAgLy8gY29udmVydCB0aGUgc2F0dXJhdGlvbiB2YWx1ZSB0byBhIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgcmluZyBhbmQgdGhlIGVkZ2VcbiAgICAgIHZhciBkaXN0ID0gaHN2LnMgLyAxMDAgKiBvcHRzLnJNYXg7XG4gICAgICAvLyBNb3ZlIHRoZSBtYXJrZXIgYmFzZWQgb24gdGhlIGFuZ2xlIGFuZCBkaXN0YW5jZVxuICAgICAgdGhpcy5tYXJrZXIubW92ZShvcHRzLmNYICsgZGlzdCAqIE1hdGguY29zKGh1ZUFuZ2xlKSwgb3B0cy5jWSArIGRpc3QgKiBNYXRoLnNpbihodWVBbmdsZSkpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICAqIEBkZXNjIFRha2VzIGEgcG9pbnQgYXQgKHgsIHkpIGFuZCByZXR1cm5zIEhTViB2YWx1ZXMgYmFzZWQgb24gdGhpcyBpbnB1dCAtLSB1c2UgdGhpcyB0byB1cGRhdGUgYSBjb2xvciBmcm9tIG1vdXNlIGlucHV0XG4gICAgKiBAcGFyYW0ge051bWJlcn0geCAtIHBvaW50IHggY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHkgLSBwb2ludCB5IGNvb3JkaW5hdGVcbiAgICAqIEByZXR1cm4ge09iamVjdH0gLSBuZXcgSFNWIGNvbG9yIHZhbHVlcyAoc29tZSBjaGFubmVscyBtYXkgYmUgbWlzc2luZylcbiAgKi9cbiAgaW5wdXQ6IGZ1bmN0aW9uIGlucHV0KHgsIHkpIHtcbiAgICB2YXIgb3B0cyA9IHRoaXMuX29wdHMsXG4gICAgICAgIHJhbmdlTWF4ID0gb3B0cy5yTWF4LFxuICAgICAgICBfeCA9IG9wdHMuY1ggLSB4LFxuICAgICAgICBfeSA9IG9wdHMuY1kgLSB5O1xuXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihfeSwgX3gpLFxuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBodWUgYnkgY29udmVydGluZyB0aGUgYW5nbGUgdG8gcmFkaWFuc1xuICAgIGh1ZSA9IHJvdW5kKGFuZ2xlICogKDE4MCAvIFBJKSkgKyAxODAsXG5cbiAgICAvLyBGaW5kIHRoZSBwb2ludCdzIGRpc3RhbmNlIGZyb20gdGhlIGNlbnRlciBvZiB0aGUgd2hlZWxcbiAgICAvLyBUaGlzIGlzIHVzZWQgdG8gc2hvdyB0aGUgc2F0dXJhdGlvbiBsZXZlbFxuICAgIGRpc3QgPSBNYXRoLm1pbihzcXJ0KF94ICogX3ggKyBfeSAqIF95KSwgcmFuZ2VNYXgpO1xuXG4gICAgaHVlID0gb3B0cy5hbnRpY2xvY2t3aXNlID8gMzYwIC0gaHVlIDogaHVlO1xuXG4gICAgLy8gUmV0dXJuIGp1c3QgdGhlIEggYW5kIFMgY2hhbm5lbHMsIHRoZSB3aGVlbCBlbGVtZW50IGRvZXNuJ3QgZG8gYW55dGhpbmcgd2l0aCB0aGUgTCBjaGFubmVsXG4gICAgcmV0dXJuIHtcbiAgICAgIGg6IGh1ZSxcbiAgICAgIHM6IHJvdW5kKDEwMCAvIHJhbmdlTWF4ICogZGlzdClcbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgICogQGRlc2MgQ2hlY2sgaWYgYSBwb2ludCBhdCAoeCwgeSkgaXMgaW5zaWRlIHRoaXMgZWxlbWVudFxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHggLSBwb2ludCB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gcG9pbnQgeSBjb29yZGluYXRlXG4gICAgKiBAcmV0dXJuIHtCb29sZWFufSAtIHRydWUgaWYgdGhlIHBvaW50IGlzIGEgXCJoaXRcIiwgZWxzZSBmYWxzZVxuICAqL1xuICBjaGVja0hpdDogZnVuY3Rpb24gY2hlY2tIaXQoeCwgeSkge1xuICAgIHZhciBvcHRzID0gdGhpcy5fb3B0cztcblxuICAgIC8vIENoZWNrIGlmIHRoZSBwb2ludCBpcyB3aXRoaW4gdGhlIGh1ZSByaW5nIGJ5IGNvbXBhcmluZyB0aGUgcG9pbnQncyBkaXN0YW5jZSBmcm9tIHRoZSBjZW50cmUgdG8gdGhlIHJpbmcncyByYWRpdXNcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgc21hbGxlciB0aGFuIHRoZSByYWRpdXMsIHRoZW4gd2UgaGF2ZSBhIGhpdFxuICAgIHZhciBkeCA9IGFicyh4IC0gb3B0cy5jWCksXG4gICAgICAgIGR5ID0gYWJzKHkgLSBvcHRzLmNZKTtcbiAgICByZXR1cm4gc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgPCBvcHRzLnI7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gd2hlZWw7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXJvLmpzLm1hcCJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWNtOTNjMlZ5TFhCaFkyc3ZYM0J5Wld4MVpHVXVhbk1pTENKamIyeHZjbk11YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12YVhKdkxtcHpMMlJwYzNRdmFYSnZMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk96czdRVU5CUVN4SlFVRkpMRTFCUVUwc1VVRkJVU3hSUVVGU0xFTkJRVlk3UVVGRFFTeEpRVUZKTERaQ1FVRktPMEZCUTBFc1NVRkJTU3hyUWtGQmEwSXNTMEZCZEVJN08wRkJSVUVzU1VGQlNTeHJRa0ZCYTBJc1UwRkJVeXhqUVVGVUxFTkJRWGRDTEhkQ1FVRjRRaXhEUVVGMFFqdEJRVU5CTEVsQlFVa3NZMEZCWXl4SlFVRkpMRWxCUVVrc1YwRkJVaXhEUVVGdlFpeGxRVUZ3UWl4RlFVRnhRenRCUVVOeVJDeFRRVUZQTEVkQlJEaERPMEZCUlhKRUxGVkJRVkVzUjBGR05rTTdRVUZIY2tRc1UwRkJUenRCUVVnNFF5eERRVUZ5UXl4RFFVRnNRanM3UVVGTlFTeFpRVUZaTEVWQlFWb3NRMEZCWlN4alFVRm1MRVZCUVN0Q0xGVkJRVk1zUzBGQlZDeEZRVUZuUWl4UFFVRm9RaXhGUVVGNVFqdEJRVU4wUkN4VFFVRlBMRWxCUVZBc1EwRkJXU3hqUVVGYUxFVkJRVFJDTEUxQlFVMHNVMEZCYkVNN1FVRkRRU3hYUVVGVExFbEJRVlFzUTBGQll5eExRVUZrTEVOQlFXOUNMR1ZCUVhCQ0xFZEJRWE5ETEUxQlFVMHNVMEZCTlVNN1FVRkRSQ3hEUVVoRU96dEJRVXRCTEZOQlFWTXNVMEZCVkN4RFFVRnRRaXhGUVVGdVFpeEZRVUYxUWl4TFFVRjJRaXhGUVVFMlFqdEJRVU16UWl4WFFVRlRMR05CUVZRc1EwRkJkMElzUlVGQmVFSXNSVUZCTkVJc1MwRkJOVUlzUTBGQmEwTXNaVUZCYkVNc1IwRkJiMFFzVFVGQlRTeExRVUV4UkR0QlFVTkVPenRCUVVWRUxGTkJRVk1zVlVGQlZDeERRVUZ2UWl4RlFVRndRaXhGUVVGM1FpeExRVUY0UWl4RlFVRTRRanRCUVVNMVFpeFhRVUZUTEdOQlFWUXNRMEZCZDBJc1JVRkJlRUlzUlVGQk5FSXNTMEZCTlVJc1EwRkJhME1zUzBGQmJFTXNSMEZCTUVNc1RVRkJUU3hMUVVGb1JEdEJRVU5FT3pzN1FVTjBRa1E3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUtHWjFibU4wYVc5dUlHVW9kQ3h1TEhJcGUyWjFibU4wYVc5dUlITW9ieXgxS1h0cFppZ2hibHR2WFNsN2FXWW9JWFJiYjEwcGUzWmhjaUJoUFhSNWNHVnZaaUJ5WlhGMWFYSmxQVDFjSW1aMWJtTjBhVzl1WENJbUpuSmxjWFZwY21VN2FXWW9JWFVtSm1FcGNtVjBkWEp1SUdFb2J5d2hNQ2s3YVdZb2FTbHlaWFIxY200Z2FTaHZMQ0V3S1R0MllYSWdaajF1WlhjZ1JYSnliM0lvWENKRFlXNXViM1FnWm1sdVpDQnRiMlIxYkdVZ0oxd2lLMjhyWENJblhDSXBPM1JvY205M0lHWXVZMjlrWlQxY0lrMVBSRlZNUlY5T1QxUmZSazlWVGtSY0lpeG1mWFpoY2lCc1BXNWJiMTA5ZTJWNGNHOXlkSE02ZTMxOU8zUmJiMTFiTUYwdVkyRnNiQ2hzTG1WNGNHOXlkSE1zWm5WdVkzUnBiMjRvWlNsN2RtRnlJRzQ5ZEZ0dlhWc3hYVnRsWFR0eVpYUjFjbTRnY3lodVAyNDZaU2w5TEd3c2JDNWxlSEJ2Y25SekxHVXNkQ3h1TEhJcGZYSmxkSFZ5YmlCdVcyOWRMbVY0Y0c5eWRITjlkbUZ5SUdrOWRIbHdaVzltSUhKbGNYVnBjbVU5UFZ3aVpuVnVZM1JwYjI1Y0lpWW1jbVZ4ZFdseVpUdG1iM0lvZG1GeUlHODlNRHR2UEhJdWJHVnVaM1JvTzI4ckt5bHpLSEpiYjEwcE8zSmxkSFZ5YmlCemZTa2lMQ0pzWlhRZ2FYSnZJRDBnY21WeGRXbHlaU2hjSW1seWJ5NXFjMXdpS1R0Y2JteGxkQ0JqYjJ4dmNrTm9aV05yWlhKSmJuUmxjblpoYkR0Y2JuWmhjaUJqYjJ4dmNrbHpRMmhoYm1kcGJtY2dQU0JtWVd4elpUdGNibHh1YkdWMElHTnZiRzl5VUdsamEyVnlSV3hsYlNBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0Z3aVkyOXNiM0l0Y0dsamEyVnlMV052Ym5SaGFXNWxjbHdpS1Z4dWJHVjBJR052Ykc5eVVHbGphMlZ5SUQwZ2JtVjNJR2x5Ynk1RGIyeHZjbEJwWTJ0bGNpaGpiMnh2Y2xCcFkydGxja1ZzWlcwc0lIdGNiaUFnZDJsa2RHZzZJRE15TUN4Y2JpQWdhR1ZwWjJoME9pQXpNakFzWEc0Z0lHTnZiRzl5T2lCY0lpTm1abVpjSWx4dWZTazdYRzVjYm1OdmJHOXlVR2xqYTJWeUxtOXVLRndpWTI5c2IzSTZZMmhoYm1kbFhDSXNJR1oxYm1OMGFXOXVLR052Ykc5eUxDQmphR0Z1WjJWektTQjdYRzRnSUhOdlkydGxkQzVsYldsMEtDZGpiMnh2Y2lCamFHRnVaMlVuTENCamIyeHZjaTVvWlhoVGRISnBibWNwTzF4dUlDQmtiMk4xYldWdWRDNWliMlI1TG5OMGVXeGxMbUpoWTJ0bmNtOTFibVJEYjJ4dmNpQTlJR052Ykc5eUxtaGxlRk4wY21sdVoxeHVmU2s3WEc1Y2JtWjFibU4wYVc5dUlITmxkRUpuVkc5SlpDaHBaQ3dnWTI5c2IzSXBlMXh1SUNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2hwWkNrdWMzUjViR1V1WW1GamEyZHliM1Z1WkVOdmJHOXlJRDBnWENJalhDSWdLeUJqYjJ4dmNseHVmVnh1WEc1bWRXNWpkR2x2YmlCelpYUlVlSFJVYjBsa0tHbGtMQ0JqYjJ4dmNpbDdYRzRnSUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLR2xrS1M1emRIbHNaUzVqYjJ4dmNpQTlJRndpSTF3aUlDc2dZMjlzYjNKY2JuMWNiaUlzSWk4cUlWeHVJQ29nYVhKdkxtcHpJSFl6TGpJdU1GeHVJQ29nTWpBeE5pMHlNREUzSUVwaGJXVnpJRVJoYm1sbGJGeHVJQ29nVW1Wc1pXRnpaV1FnZFc1a1pYSWdkR2hsSUUxSlZDQnNhV05sYm5ObFhHNGdLaUJuYVhSb2RXSXVZMjl0TDJwaFlXMWxjeTlwY204dWFuTmNiaUFxTDF4dUtHWjFibU4wYVc5dUlIZGxZbkJoWTJ0VmJtbDJaWEp6WVd4TmIyUjFiR1ZFWldacGJtbDBhVzl1S0hKdmIzUXNJR1poWTNSdmNua3BJSHRjYmx4MGFXWW9kSGx3Wlc5bUlHVjRjRzl5ZEhNZ1BUMDlJQ2R2WW1wbFkzUW5JQ1ltSUhSNWNHVnZaaUJ0YjJSMWJHVWdQVDA5SUNkdlltcGxZM1FuS1Z4dVhIUmNkRzF2WkhWc1pTNWxlSEJ2Y25SeklEMGdabUZqZEc5eWVTZ3BPMXh1WEhSbGJITmxJR2xtS0hSNWNHVnZaaUJrWldacGJtVWdQVDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdaR1ZtYVc1bExtRnRaQ2xjYmx4MFhIUmtaV1pwYm1Vb1cxMHNJR1poWTNSdmNua3BPMXh1WEhSbGJITmxJR2xtS0hSNWNHVnZaaUJsZUhCdmNuUnpJRDA5UFNBbmIySnFaV04wSnlsY2JseDBYSFJsZUhCdmNuUnpXMXdpYVhKdlhDSmRJRDBnWm1GamRHOXllU2dwTzF4dVhIUmxiSE5sWEc1Y2RGeDBjbTl2ZEZ0Y0ltbHliMXdpWFNBOUlHWmhZM1J2Y25rb0tUdGNibjBwS0hSb2FYTXNJR1oxYm1OMGFXOXVLQ2tnZTF4dWNtVjBkWEp1SUM4cUtpb3FLaW92SUNobWRXNWpkR2x2YmlodGIyUjFiR1Z6S1NCN0lDOHZJSGRsWW5CaFkydENiMjkwYzNSeVlYQmNiaThxS2lvcUtpb3ZJRngwTHk4Z1ZHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUx5b3FLaW9xS2k4Z1hIUjJZWElnYVc1emRHRnNiR1ZrVFc5a2RXeGxjeUE5SUh0OU8xeHVMeW9xS2lvcUtpOWNiaThxS2lvcUtpb3ZJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaThxS2lvcUtpb3ZJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVMeW9xS2lvcUtpOWNiaThxS2lvcUtpb3ZJRngwWEhRdkx5QkRhR1ZqYXlCcFppQnRiMlIxYkdVZ2FYTWdhVzRnWTJGamFHVmNiaThxS2lvcUtpb3ZJRngwWEhScFppaHBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTa2dlMXh1THlvcUtpb3FLaThnWEhSY2RGeDBjbVYwZFhKdUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtVjRjRzl5ZEhNN1hHNHZLaW9xS2lvcUx5QmNkRngwZlZ4dUx5b3FLaW9xS2k4Z1hIUmNkQzh2SUVOeVpXRjBaU0JoSUc1bGR5QnRiMlIxYkdVZ0tHRnVaQ0J3ZFhRZ2FYUWdhVzUwYnlCMGFHVWdZMkZqYUdVcFhHNHZLaW9xS2lvcUx5QmNkRngwZG1GeUlHMXZaSFZzWlNBOUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZElEMGdlMXh1THlvcUtpb3FLaThnWEhSY2RGeDBhVG9nYlc5a2RXeGxTV1FzWEc0dktpb3FLaW9xTHlCY2RGeDBYSFJzT2lCbVlXeHpaU3hjYmk4cUtpb3FLaW92SUZ4MFhIUmNkR1Y0Y0c5eWRITTZJSHQ5WEc0dktpb3FLaW9xTHlCY2RGeDBmVHRjYmk4cUtpb3FLaW92WEc0dktpb3FLaW9xTHlCY2RGeDBMeThnUlhobFkzVjBaU0IwYUdVZ2JXOWtkV3hsSUdaMWJtTjBhVzl1WEc0dktpb3FLaW9xTHlCY2RGeDBiVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVZMkZzYkNodGIyUjFiR1V1Wlhod2IzSjBjeXdnYlc5a2RXeGxMQ0J0YjJSMWJHVXVaWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWs3WEc0dktpb3FLaW9xTDF4dUx5b3FLaW9xS2k4Z1hIUmNkQzh2SUVac1lXY2dkR2hsSUcxdlpIVnNaU0JoY3lCc2IyRmtaV1JjYmk4cUtpb3FLaW92SUZ4MFhIUnRiMlIxYkdVdWJDQTlJSFJ5ZFdVN1hHNHZLaW9xS2lvcUwxeHVMeW9xS2lvcUtpOGdYSFJjZEM4dklGSmxkSFZ5YmlCMGFHVWdaWGh3YjNKMGN5QnZaaUIwYUdVZ2JXOWtkV3hsWEc0dktpb3FLaW9xTHlCY2RGeDBjbVYwZFhKdUlHMXZaSFZzWlM1bGVIQnZjblJ6TzF4dUx5b3FLaW9xS2k4Z1hIUjlYRzR2S2lvcUtpb3FMMXh1THlvcUtpb3FLaTljYmk4cUtpb3FLaW92SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVnpJRzlpYW1WamRDQW9YMTkzWldKd1lXTnJYMjF2WkhWc1pYTmZYeWxjYmk4cUtpb3FLaW92SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXRJRDBnYlc5a2RXeGxjenRjYmk4cUtpb3FLaW92WEc0dktpb3FLaW9xTHlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNHZLaW9xS2lvcUx5QmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WXlBOUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNN1hHNHZLaW9xS2lvcUwxeHVMeW9xS2lvcUtpOGdYSFF2THlCcFpHVnVkR2wwZVNCbWRXNWpkR2x2YmlCbWIzSWdZMkZzYkdsdVp5Qm9ZWEp0YjI1NUlHbHRjRzl5ZEhNZ2QybDBhQ0IwYUdVZ1kyOXljbVZqZENCamIyNTBaWGgwWEc0dktpb3FLaW9xTHlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVhU0E5SUdaMWJtTjBhVzl1S0haaGJIVmxLU0I3SUhKbGRIVnliaUIyWVd4MVpUc2dmVHRjYmk4cUtpb3FLaW92WEc0dktpb3FLaW9xTHlCY2RDOHZJR1JsWm1sdVpTQm5aWFIwWlhJZ1puVnVZM1JwYjI0Z1ptOXlJR2hoY20xdmJua2daWGh3YjNKMGMxeHVMeW9xS2lvcUtpOGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1RZ1BTQm1kVzVqZEdsdmJpaGxlSEJ2Y25SekxDQnVZVzFsTENCblpYUjBaWElwSUh0Y2JpOHFLaW9xS2lvdklGeDBYSFJwWmlnaFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZLR1Y0Y0c5eWRITXNJRzVoYldVcEtTQjdYRzR2S2lvcUtpb3FMeUJjZEZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnYm1GdFpTd2dlMXh1THlvcUtpb3FLaThnWEhSY2RGeDBYSFJqYjI1bWFXZDFjbUZpYkdVNklHWmhiSE5sTEZ4dUx5b3FLaW9xS2k4Z1hIUmNkRngwWEhSbGJuVnRaWEpoWW14bE9pQjBjblZsTEZ4dUx5b3FLaW9xS2k4Z1hIUmNkRngwWEhSblpYUTZJR2RsZEhSbGNseHVMeW9xS2lvcUtpOGdYSFJjZEZ4MGZTazdYRzR2S2lvcUtpb3FMeUJjZEZ4MGZWeHVMeW9xS2lvcUtpOGdYSFI5TzF4dUx5b3FLaW9xS2k5Y2JpOHFLaW9xS2lvdklGeDBMeThnWjJWMFJHVm1ZWFZzZEVWNGNHOXlkQ0JtZFc1amRHbHZiaUJtYjNJZ1kyOXRjR0YwYVdKcGJHbDBlU0IzYVhSb0lHNXZiaTFvWVhKdGIyNTVJRzF2WkhWc1pYTmNiaThxS2lvcUtpb3ZJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dUlEMGdablZ1WTNScGIyNG9iVzlrZFd4bEtTQjdYRzR2S2lvcUtpb3FMeUJjZEZ4MGRtRnlJR2RsZEhSbGNpQTlJRzF2WkhWc1pTQW1KaUJ0YjJSMWJHVXVYMTlsYzAxdlpIVnNaU0EvWEc0dktpb3FLaW9xTHlCY2RGeDBYSFJtZFc1amRHbHZiaUJuWlhSRVpXWmhkV3gwS0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsV3lka1pXWmhkV3gwSjEwN0lIMGdPbHh1THlvcUtpb3FLaThnWEhSY2RGeDBablZ1WTNScGIyNGdaMlYwVFc5a2RXeGxSWGh3YjNKMGN5Z3BJSHNnY21WMGRYSnVJRzF2WkhWc1pUc2dmVHRjYmk4cUtpb3FLaW92SUZ4MFhIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbVFvWjJWMGRHVnlMQ0FuWVNjc0lHZGxkSFJsY2lrN1hHNHZLaW9xS2lvcUx5QmNkRngwY21WMGRYSnVJR2RsZEhSbGNqdGNiaThxS2lvcUtpb3ZJRngwZlR0Y2JpOHFLaW9xS2lvdlhHNHZLaW9xS2lvcUx5QmNkQzh2SUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkZ4dUx5b3FLaW9xS2k4Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbThnUFNCbWRXNWpkR2x2YmlodlltcGxZM1FzSUhCeWIzQmxjblI1S1NCN0lISmxkSFZ5YmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2IySnFaV04wTENCd2NtOXdaWEowZVNrN0lIMDdYRzR2S2lvcUtpb3FMMXh1THlvcUtpb3FLaThnWEhRdkx5QmZYM2RsWW5CaFkydGZjSFZpYkdsalgzQmhkR2hmWDF4dUx5b3FLaW9xS2k4Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbkFnUFNCY0lsd2lPMXh1THlvcUtpb3FLaTljYmk4cUtpb3FLaW92SUZ4MEx5OGdURzloWkNCbGJuUnllU0J0YjJSMWJHVWdZVzVrSUhKbGRIVnliaUJsZUhCdmNuUnpYRzR2S2lvcUtpb3FMeUJjZEhKbGRIVnliaUJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0Y5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWN5QTlJRFFwTzF4dUx5b3FLaW9xS2k4Z2ZTbGNiaThxS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW92WEc0dktpb3FLaW9xTHlBb1cxeHVMeW9nTUNBcUwxeHVMeW9xS2k4Z0tHWjFibU4wYVc5dUtHMXZaSFZzWlN3Z1pYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5a2dlMXh1WEc1Y0luVnpaU0J6ZEhKcFkzUmNJanRjYmx4dVhHNTJZWElnWDNSNWNHVnZaaUE5SUhSNWNHVnZaaUJUZVcxaWIyd2dQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUIwZVhCbGIyWWdVM2x0WW05c0xtbDBaWEpoZEc5eUlEMDlQU0JjSW5ONWJXSnZiRndpSUQ4Z1puVnVZM1JwYjI0Z0tHOWlhaWtnZXlCeVpYUjFjbTRnZEhsd1pXOW1JRzlpYWpzZ2ZTQTZJR1oxYm1OMGFXOXVJQ2h2WW1vcElIc2djbVYwZFhKdUlHOWlhaUFtSmlCMGVYQmxiMllnVTNsdFltOXNJRDA5UFNCY0ltWjFibU4wYVc5dVhDSWdKaVlnYjJKcUxtTnZibk4wY25WamRHOXlJRDA5UFNCVGVXMWliMndnSmlZZ2IySnFJQ0U5UFNCVGVXMWliMnd1Y0hKdmRHOTBlWEJsSUQ4Z1hDSnplVzFpYjJ4Y0lpQTZJSFI1Y0dWdlppQnZZbW83SUgwN1hHNWNiblpoY2lCeWIzVnVaQ0E5SUUxaGRHZ3VjbTkxYm1Rc1hHNGdJQ0FnWm14dmIzSWdQU0JOWVhSb0xtWnNiMjl5TzF4dVhHNHZMeUJVVDBSUE9pQmpiMjF3WVhKbEtISm5ZaXdnYUhOMkxDQm9jMndwSUNzZ1kyeHZibVVnYldWMGFHOWtjMXh1WEc0dktpcGNiaUFnS2lCQVpHVnpZeUJqYjI1MlpYSjBJR2h6ZGlCdlltcGxZM1FnZEc4Z2NtZGlYRzRnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdoemRpQXRJR2h6ZGlCdlltcGxZM1JjYmlBZ0tpQkFjbVYwZFhKdUlIdFBZbXBsWTNSOUlISm5ZaUJ2WW1wbFkzUmNiaW92WEc1bWRXNWpkR2x2YmlCb2MzWXlVbWRpS0doemRpa2dlMXh1SUNCMllYSWdjaXdnWnl3Z1lpd2dhU3dnWml3Z2NDd2djU3dnZER0Y2JpQWdkbUZ5SUdnZ1BTQm9jM1l1YUNBdklETTJNQ3hjYmlBZ0lDQWdJSE1nUFNCb2MzWXVjeUF2SURFd01DeGNiaUFnSUNBZ0lIWWdQU0JvYzNZdWRpQXZJREV3TUR0Y2JpQWdhU0E5SUdac2IyOXlLR2dnS2lBMktUdGNiaUFnWmlBOUlHZ2dLaUEySUMwZ2FUdGNiaUFnY0NBOUlIWWdLaUFvTVNBdElITXBPMXh1SUNCeElEMGdkaUFxSUNneElDMGdaaUFxSUhNcE8xeHVJQ0IwSUQwZ2RpQXFJQ2d4SUMwZ0tERWdMU0JtS1NBcUlITXBPMXh1SUNCemQybDBZMmdnS0drZ0pTQTJLU0I3WEc0Z0lDQWdZMkZ6WlNBd09seHVJQ0FnSUNBZ2NpQTlJSFlzSUdjZ1BTQjBMQ0JpSUQwZ2NEdGljbVZoYXp0Y2JpQWdJQ0JqWVhObElERTZYRzRnSUNBZ0lDQnlJRDBnY1N3Z1p5QTlJSFlzSUdJZ1BTQndPMkp5WldGck8xeHVJQ0FnSUdOaGMyVWdNanBjYmlBZ0lDQWdJSElnUFNCd0xDQm5JRDBnZGl3Z1lpQTlJSFE3WW5KbFlXczdYRzRnSUNBZ1kyRnpaU0F6T2x4dUlDQWdJQ0FnY2lBOUlIQXNJR2NnUFNCeExDQmlJRDBnZGp0aWNtVmhhenRjYmlBZ0lDQmpZWE5sSURRNlhHNGdJQ0FnSUNCeUlEMGdkQ3dnWnlBOUlIQXNJR0lnUFNCMk8ySnlaV0ZyTzF4dUlDQWdJR05oYzJVZ05UcGNiaUFnSUNBZ0lISWdQU0IyTENCbklEMGdjQ3dnWWlBOUlIRTdZbkpsWVdzN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhzZ2Nqb2djbTkxYm1Rb2NpQXFJREkxTlNrc0lHYzZJSEp2ZFc1a0tHY2dLaUF5TlRVcExDQmlPaUJ5YjNWdVpDaGlJQ29nTWpVMUtTQjlPMXh1ZlR0Y2JseHVMeW9xWEc0Z0lDb2dRR1JsYzJNZ1kyOXVkbVZ5ZENCeVoySWdiMkpxWldOMElIUnZJR2h6ZGx4dUlDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnlaMklnTFNCeVoySWdiMkpxWldOMFhHNGdJQ29nUUhKbGRIVnliaUI3VDJKcVpXTjBmU0JvYzNZZ2IySnFaV04wWEc0cUwxeHVablZ1WTNScGIyNGdjbWRpTWtoemRpaHlaMklwSUh0Y2JpQWdMeThnVFc5a2FXWnBaV1FnWm5KdmJTQm9kSFJ3Y3pvdkwyZHBkR2gxWWk1amIyMHZZbWR5YVc1ekwxUnBibmxEYjJ4dmNpOWliRzlpTDIxaGMzUmxjaTkwYVc1NVkyOXNiM0l1YW5NalREUTBObHh1SUNCMllYSWdjaUE5SUhKbllpNXlJQzhnTWpVMUxGeHVJQ0FnSUNBZ1p5QTlJSEpuWWk1bklDOGdNalUxTEZ4dUlDQWdJQ0FnWWlBOUlISm5ZaTVpSUM4Z01qVTFMRnh1SUNBZ0lDQWdiV0Y0SUQwZ1RXRjBhQzV0WVhnb2Npd2daeXdnWWlrc1hHNGdJQ0FnSUNCdGFXNGdQU0JOWVhSb0xtMXBiaWh5TENCbkxDQmlLU3hjYmlBZ0lDQWdJR1JsYkhSaElEMGdiV0Y0SUMwZ2JXbHVMRnh1SUNBZ0lDQWdhSFZsTzF4dUlDQnpkMmwwWTJnZ0tHMWhlQ2tnZTF4dUlDQWdJR05oYzJVZ2JXbHVPbHh1SUNBZ0lDQWdhSFZsSUQwZ01EdGljbVZoYXp0Y2JpQWdJQ0JqWVhObElISTZYRzRnSUNBZ0lDQm9kV1VnUFNBb1p5QXRJR0lwSUM4Z1pHVnNkR0VnS3lBb1p5QThJR0lnUHlBMklEb2dNQ2s3WW5KbFlXczdYRzRnSUNBZ1kyRnpaU0JuT2x4dUlDQWdJQ0FnYUhWbElEMGdLR0lnTFNCeUtTQXZJR1JsYkhSaElDc2dNanRpY21WaGF6dGNiaUFnSUNCallYTmxJR0k2WEc0Z0lDQWdJQ0JvZFdVZ1BTQW9jaUF0SUdjcElDOGdaR1ZzZEdFZ0t5QTBPMkp5WldGck8xeHVJQ0I5WEc0Z0lHaDFaU0F2UFNBMk8xeHVJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lHZzZJSEp2ZFc1a0tHaDFaU0FxSURNMk1Da3NYRzRnSUNBZ2N6b2djbTkxYm1Rb2JXRjRJRDA5SURBZ1B5QXdJRG9nWkdWc2RHRWdMeUJ0WVhnZ0tpQXhNREFwTEZ4dUlDQWdJSFk2SUhKdmRXNWtLRzFoZUNBcUlERXdNQ2xjYmlBZ2ZUdGNibjA3WEc1Y2JpOHFLbHh1SUNBcUlFQmtaWE5qSUdOdmJuWmxjblFnYUhOMklHOWlhbVZqZENCMGJ5Qm9jMnhjYmlBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2FITjJJQzBnYUhOMklHOWlhbVZqZEZ4dUlDQXFJRUJ5WlhSMWNtNGdlMDlpYW1WamRIMGdhSE5zSUc5aWFtVmpkRnh1S2k5Y2JtWjFibU4wYVc5dUlHaHpkakpJYzJ3b2FITjJLU0I3WEc0Z0lIWmhjaUJ6SUQwZ2FITjJMbk1nTHlBeE1EQXNYRzRnSUNBZ0lDQjJJRDBnYUhOMkxuWWdMeUF4TURBN1hHNGdJSFpoY2lCc0lEMGdNQzQxSUNvZ2RpQXFJQ2d5SUMwZ2N5azdYRzRnSUhNZ1BTQjJJQ29nY3lBdklDZ3hJQzBnVFdGMGFDNWhZbk1vTWlBcUlHd2dMU0F4S1NrN1hHNGdJSEpsZEhWeWJpQjdYRzRnSUNBZ2FEb2dhSE4yTG1nc1hHNGdJQ0FnY3pvZ2NtOTFibVFvY3lBcUlERXdNQ2tnZkh3Z01DeGNiaUFnSUNCc09pQnliM1Z1WkNoc0lDb2dNVEF3S1Z4dUlDQjlPMXh1ZlR0Y2JseHVMeW9xWEc0Z0lDb2dRR1JsYzJNZ1kyOXVkbVZ5ZENCb2Myd2diMkpxWldOMElIUnZJR2h6ZGx4dUlDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQm9jMndnTFNCb2Myd2diMkpxWldOMFhHNGdJQ29nUUhKbGRIVnliaUI3VDJKcVpXTjBmU0JvYzNZZ2IySnFaV04wWEc0cUwxeHVablZ1WTNScGIyNGdhSE5zTWtoemRpaG9jMndwSUh0Y2JpQWdkbUZ5SUhNZ1BTQm9jMnd1Y3lBdklERXdNQ3hjYmlBZ0lDQWdJR3dnUFNCb2Myd3ViQ0F2SURFd01EdGNiaUFnYkNBcVBTQXlPMXh1SUNCeklDbzlJR3dnUEQwZ01TQS9JR3dnT2lBeUlDMGdiRHRjYmlBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0JvT2lCb2Myd3VhQ3hjYmlBZ0lDQnpPaUJ5YjNWdVpDZ3lJQ29nY3lBdklDaHNJQ3NnY3lrZ0tpQXhNREFwTEZ4dUlDQWdJSFk2SUhKdmRXNWtLQ2hzSUNzZ2N5a2dMeUF5SUNvZ01UQXdLVnh1SUNCOU8xeHVmVHRjYmx4dUx5b3FYRzRnSUNvZ1FHUmxjMk1nWTI5dWRtVnlkQ0J5WjJJZ2IySnFaV04wSUhSdklITjBjbWx1WjF4dUlDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnlaMklnTFNCeVoySWdiMkpxWldOMFhHNGdJQ29nUUhKbGRIVnliaUI3VDJKcVpXTjBmU0J5WjJJZ2MzUnlhVzVuWEc0cUwxeHVablZ1WTNScGIyNGdjbWRpTWxOMGNpaHlaMklwSUh0Y2JpQWdjbVYwZFhKdUlGd2ljbWRpWENJZ0t5QW9jbWRpTG1FZ1B5QmNJbUZjSWlBNklGd2lYQ0lwSUNzZ1hDSW9YQ0lnS3lCeVoySXVjaUFySUZ3aUxDQmNJaUFySUhKbllpNW5JQ3NnWENJc0lGd2lJQ3NnY21kaUxtSWdLeUFvY21kaUxtRWdQeUJjSWl3Z1hDSWdLeUJ5WjJJdVlTQTZJRndpWENJcElDc2dYQ0lwWENJN1hHNTlPMXh1WEc0dktpcGNiaUFnS2lCQVpHVnpZeUJqYjI1MlpYSjBJR2h6YkNCdlltcGxZM1FnZEc4Z2MzUnlhVzVuWEc0Z0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHaHpiQ0F0SUdoemJDQnZZbXBsWTNSY2JpQWdLaUJBY21WMGRYSnVJSHRQWW1wbFkzUjlJR2h6YkNCemRISnBibWRjYmlvdlhHNW1kVzVqZEdsdmJpQm9jMnd5VTNSeUtHaHpiQ2tnZTF4dUlDQnlaWFIxY200Z1hDSm9jMnhjSWlBcklDaG9jMnd1WVNBL0lGd2lZVndpSURvZ1hDSmNJaWtnS3lCY0lpaGNJaUFySUdoemJDNW9JQ3NnWENJc0lGd2lJQ3NnYUhOc0xuTWdLeUJjSWlVc0lGd2lJQ3NnYUhOc0xtd2dLeUJjSWlWY0lpQXJJQ2hvYzJ3dVlTQS9JRndpTENCY0lpQXJJR2h6YkM1aElEb2dYQ0pjSWlrZ0t5QmNJaWxjSWp0Y2JuMDdYRzVjYmk4cUtseHVJQ0FxSUVCa1pYTmpJR052Ym5abGNuUWdjbWRpSUc5aWFtVmpkQ0IwYnlCb1pYZ2djM1J5YVc1blhHNGdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSEpuWWlBdElISm5ZaUJ2WW1wbFkzUmNiaUFnS2lCQWNtVjBkWEp1SUh0UFltcGxZM1I5SUdobGVDQnpkSEpwYm1kY2Jpb3ZYRzVtZFc1amRHbHZiaUJ5WjJJeVNHVjRLSEpuWWlrZ2UxeHVJQ0IyWVhJZ2NpQTlJSEpuWWk1eUxGeHVJQ0FnSUNBZ1p5QTlJSEpuWWk1bkxGeHVJQ0FnSUNBZ1lpQTlJSEpuWWk1aU8xeHVJQ0F2THlCSlppQmxZV05vSUZKSFFpQmphR0Z1Ym1Wc0ozTWdkbUZzZFdVZ2FYTWdZU0J0ZFd4MGFYQnNaU0J2WmlBeE55d2dkMlVnWTJGdUlIVnpaU0JJUlZnZ2MyaHZjblJvWVc1a0lHNXZkR0YwYVc5dVhHNGdJSFpoY2lCMWMyVlRhRzl5ZEdoaGJtUWdQU0J5SUNVZ01UY2dQVDBnTUNBbUppQm5JQ1VnTVRjZ1BUMGdNQ0FtSmlCaUlDVWdNVGNnUFQwZ01DeGNibHh1SUNBdkx5QkpaaUIzWlNkeVpTQjFjMmx1WnlCemFHOXlkR2hoYm1RZ2JtOTBZWFJwYjI0c0lHUnBkbWxrWlNCbFlXTm9JR05vWVc1dVpXd2dZbmtnTVRkY2JpQWdaR2wyYVdSbGNpQTlJSFZ6WlZOb2IzSjBhR0Z1WkNBL0lERTNJRG9nTVN4Y2JseHVJQ0F2THlCaWFYUk1aVzVuZEdnZ2IyWWdaV0ZqYUNCamFHRnVibVZzSUNobWIzSWdaWGhoYlhCc1pTd2dSaUJwY3lBMElHSnBkSE1nYkc5dVp5QjNhR2xzWlNCR1JpQnBjeUE0SUdKcGRITWdiRzl1WnlsY2JpQWdZbWwwVEdWdVozUm9JRDBnZFhObFUyaHZjblJvWVc1a0lEOGdOQ0E2SURnc1hHNWNiaUFnTHk4Z1ZHRnlaMlYwSUd4bGJtZDBhQ0J2WmlCMGFHVWdjM1J5YVc1bklDaHBaU0JjSWlOR1JrWmNJaUJ2Y2lCY0lpTkdSa1pHUmtaY0lpbGNiaUFnYzNSeVRHVnVaM1JvSUQwZ2RYTmxVMmh2Y25Sb1lXNWtJRDhnTkNBNklEY3NYRzVjYmlBZ0x5OGdRMjl0WW1sdVpTQjBhR1VnWTJoaGJtNWxiSE1nZEc5blpYUm9aWElnYVc1MGJ5QmhJSE5wYm1kc1pTQnBiblJsWjJWeVhHNGdJR2x1ZENBOUlISWdMeUJrYVhacFpHVnlJRHc4SUdKcGRFeGxibWQwYUNBcUlESWdmQ0JuSUM4Z1pHbDJhV1JsY2lBOFBDQmlhWFJNWlc1bmRHZ2dmQ0JpSUM4Z1pHbDJhV1JsY2l4Y2JseHVJQ0F2THlCRGIyNTJaWEowSUhSb1lYUWdhVzUwWldkbGNpQjBieUJoSUdobGVDQnpkSEpwYm1kY2JpQWdjM1J5SUQwZ2FXNTBMblJ2VTNSeWFXNW5LREUyS1R0Y2JpQWdMeThnUVdSa0lISnBaMmgwSUdGdGIzVnVkQ0J2WmlCc1pXWjBMWEJoWkdScGJtZGNiaUFnY21WMGRYSnVJRndpSTF3aUlDc2dibVYzSUVGeWNtRjVLSE4wY2t4bGJtZDBhQ0F0SUhOMGNpNXNaVzVuZEdncExtcHZhVzRvWENJd1hDSXBJQ3NnYzNSeU8xeHVmVHRjYmx4dUx5b3FYRzRnSUNvZ1FHUmxjMk1nWjJWdVpYSnBZeUJ3WVhKelpYSWdabTl5SUdoemJDQXZJSEpuWWlBdklHVjBZeUJ6ZEhKcGJtZGNiaUFnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnYzNSeUlDMGdZMjlzYjNJZ2MzUnlhVzVuWEc0Z0lDb2dRSEJoY21GdElIdEJjbkpoZVgwZ2JXRjRWbUZzZFdWeklDMGdiV0Y0SUhaaGJIVmxjeUJtYjNJZ1pXRmphQ0JqYUdGdWJtVnNJQ2gxYzJWa0lHWnZjaUJqWVd4amRXeGhkR2x1WnlCd1pYSmpaVzUwTFdKaGMyVmtJSFpoYkhWbGN5bGNiaUFnS2lCQWNtVjBkWEp1SUh0QmNuSmhlWDBnZEhsd1pTQW9jbWRpSUh3Z2NtZGlZU0I4SUdoemJDQjhJR2h6YkdFcElIWmhiSFZsY3lCbWIzSWdaV0ZqYUNCamFHRnVibVZzWEc0cUwxeHVablZ1WTNScGIyNGdjR0Z5YzJWRGIyeHZjbE4wY2loemRISXNJRzFoZUZaaGJIVmxjeWtnZTF4dUlDQjJZWElnY0dGeWMyVmtJRDBnYzNSeUxtMWhkR05vS0M4b1hGeFRLeWxjWENnb1hGeGtLeWtvSlQ4cEtEODZYRnhFS3o4cEtGeGNaQ3NwS0NVL0tTZy9PbHhjUkNzL0tTaGNYR1FyS1NnbFB5a29QenBjWEVRclB5ay9LRnN3TFRsY1hDNWRLejhwUDF4Y0tTOXBLU3hjYmlBZ0lDQWdJSFpoYkRFZ1BTQndZWEp6WlVsdWRDaHdZWEp6WldSYk1sMHBMRnh1SUNBZ0lDQWdkbUZzTWlBOUlIQmhjbk5sU1c1MEtIQmhjbk5sWkZzMFhTa3NYRzRnSUNBZ0lDQjJZV3d6SUQwZ2NHRnljMlZKYm5Rb2NHRnljMlZrV3paZEtUdGNiaUFnY21WMGRYSnVJRnR3WVhKelpXUmJNVjBzSUhCaGNuTmxaRnN6WFNBOVBTQmNJaVZjSWlBL0lIWmhiREVnTHlBeE1EQWdLaUJ0WVhoV1lXeDFaWE5iTUYwZ09pQjJZV3d4TENCd1lYSnpaV1JiTlYwZ1BUMGdYQ0lsWENJZ1B5QjJZV3d5SUM4Z01UQXdJQ29nYldGNFZtRnNkV1Z6V3pGZElEb2dkbUZzTWl3Z2NHRnljMlZrV3pkZElEMDlJRndpSlZ3aUlEOGdkbUZzTXlBdklERXdNQ0FxSUcxaGVGWmhiSFZsYzFzeVhTQTZJSFpoYkRNc0lIQmhjbk5sUm14dllYUW9jR0Z5YzJWa1d6aGRLU0I4ZkNCMWJtUmxabWx1WldSZE8xeHVmVHRjYmx4dUx5b3FYRzRnSUNvZ1FHUmxjMk1nY0dGeWMyVWdjbWRpSUhOMGNtbHVaMXh1SUNBcUlFQndZWEpoYlNCN1UzUnlhVzVuZlNCemRISWdMU0JqYjJ4dmNpQnpkSEpwYm1kY2JpQWdLaUJBY21WMGRYSnVJSHRQWW1wbFkzUjlJSEpuWWlCdlltcGxZM1JjYmlvdlhHNW1kVzVqZEdsdmJpQndZWEp6WlZKbllsTjBjaWh6ZEhJcElIdGNiaUFnZG1GeUlIQmhjbk5sWkNBOUlIQmhjbk5sUTI5c2IzSlRkSElvYzNSeUxDQmJNalUxTENBeU5UVXNJREkxTlYwcE8xeHVJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lISTZJSEJoY25ObFpGc3hYU3hjYmlBZ0lDQm5PaUJ3WVhKelpXUmJNbDBzWEc0Z0lDQWdZam9nY0dGeWMyVmtXek5kWEc0Z0lIMDdYRzU5TzF4dVhHNHZLaXBjYmlBZ0tpQkFaR1Z6WXlCd1lYSnpaU0JvYzJ3Z2MzUnlhVzVuWEc0Z0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlITjBjaUF0SUdOdmJHOXlJSE4wY21sdVoxeHVJQ0FxSUVCeVpYUjFjbTRnZTA5aWFtVmpkSDBnYUhOc0lHOWlhbVZqZEZ4dUtpOWNibVoxYm1OMGFXOXVJSEJoY25ObFNITnNVM1J5S0hOMGNpa2dlMXh1SUNCMllYSWdjR0Z5YzJWa0lEMGdjR0Z5YzJWRGIyeHZjbE4wY2loemRISXNJRnN6TmpBc0lERXdNQ3dnTVRBd1hTazdYRzRnSUhKbGRIVnliaUI3WEc0Z0lDQWdhRG9nY0dGeWMyVmtXekpkTEZ4dUlDQWdJSE02SUhCaGNuTmxaRnN6WFN4Y2JpQWdJQ0JzT2lCd1lYSnpaV1JiTkYxY2JpQWdmVHRjYm4wN1hHNWNiaThxS2x4dUlDQXFJRUJrWlhOaklIQmhjbk5sSUdobGVDQnpkSEpwYm1kY2JpQWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdjM1J5SUMwZ1kyOXNiM0lnYzNSeWFXNW5YRzRnSUNvZ1FISmxkSFZ5YmlCN1QySnFaV04wZlNCeVoySWdiMkpxWldOMFhHNHFMMXh1Wm5WdVkzUnBiMjRnY0dGeWMyVklaWGhUZEhJb2FHVjRLU0I3WEc0Z0lDOHZJRk4wY21sd0lHRnVlU0JjSWlOY0lpQmphR0Z5WVdOMFpYSnpYRzRnSUdobGVDQTlJR2hsZUM1eVpYQnNZV05sS0Z3aUkxd2lMQ0JjSWx3aUtUdGNiaUFnTHk4Z1VISmxabWw0SUhSb1pTQm9aWGdnYzNSeWFXNW5JSGRwZEdnZ1hDSXdlRndpSUhkb2FXTm9JR2x1WkdsallYUmxjeUJoSUc1MWJXSmxjaUJwYmlCb1pYZ2dibTkwWVhScGIyNHNJSFJvWlc0Z1kyOXVkbVZ5ZENCMGJ5QmhiaUJwYm5SbFoyVnlYRzRnSUhaaGNpQnBiblFnUFNCd1lYSnpaVWx1ZENoY0lqQjRYQ0lnS3lCb1pYZ3BMRnh1WEc0Z0lDOHZJRWxtSUhSb1pTQnNaVzVuZEdnZ2IyWWdkR2hsSUdsdWNIVjBJR2x6SUc5dWJIa2dNeXdnZEdobGJpQnBkQ0JwY3lCaElITm9iM0owYUdGdVpDQm9aWGdnWTI5c2IzSmNiaUFnYVhOVGFHOXlkR2hoYm1RZ1BTQm9aWGd1YkdWdVozUm9JRDA5SURNc1hHNWNiaUFnTHk4Z1ltbDBUV0Z6YXlCbWIzSWdhWE52YkdGMGFXNW5JR1ZoWTJnZ1kyaGhibTVsYkZ4dUlDQmlhWFJOWVhOcklEMGdhWE5UYUc5eWRHaGhibVFnUHlBd2VFWWdPaUF3ZUVaR0xGeHVYRzRnSUM4dklHSnBkRXhsYm1kMGFDQnZaaUJsWVdOb0lHTm9ZVzV1Wld3Z0tHWnZjaUJsZUdGdGNHeGxMQ0JHSUdseklEUWdZbWwwY3lCc2IyNW5JSGRvYVd4bElFWkdJR2x6SURnZ1ltbDBjeUJzYjI1bktWeHVJQ0JpYVhSTVpXNW5kR2dnUFNCcGMxTm9iM0owYUdGdVpDQS9JRFFnT2lBNExGeHVYRzRnSUM4dklFbG1JSGRsSjNKbElIVnphVzVuSUhOb2IzSjBhR0Z1WkNCdWIzUmhkR2x2Yml3Z2JYVnNkR2x3YkhrZ1pXRmphQ0JqYUdGdWJtVnNJR0o1SURFM1hHNGdJRzExYkhScGNHeHBaWElnUFNCcGMxTm9iM0owYUdGdVpDQS9JREUzSURvZ01UdGNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQnlPaUFvYVc1MElENCtJR0pwZEV4bGJtZDBhQ0FxSURJZ0ppQmlhWFJOWVhOcktTQXFJRzExYkhScGNHeHBaWElzWEc0Z0lDQWdaem9nS0dsdWRDQStQaUJpYVhSTVpXNW5kR2dnSmlCaWFYUk5ZWE5yS1NBcUlHMTFiSFJwY0d4cFpYSXNYRzRnSUNBZ1lqb2dLR2x1ZENBbUlHSnBkRTFoYzJzcElDb2diWFZzZEdsd2JHbGxjbHh1SUNCOU8xeHVmVHRjYmx4dUx5b3FYRzRnSUNvZ1FHUmxjMk1nWTI5dWRtVnlkQ0J2WW1wbFkzUWdMeUJ6ZEhKcGJtY2dhVzV3ZFhRZ2RHOGdZMjlzYjNJZ2FXWWdibVZqWlhOellYSjVYRzRnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1FnZkNCVGRISnBibWNnZkNCamIyeHZjbjBnZG1Gc2RXVWdMU0JqYjJ4dmNpQnBibk4wWVc1alpTd2diMkpxWldOMElDaG9jM1lzSUdoemJDQnZjaUJ5WjJJcExDQnpkSEpwYm1jZ0tHaHpiQ3dnY21kaUxDQm9aWGdwWEc0Z0lDb2dRSEpsZEhWeWJpQjdZMjlzYjNKOUlHTnZiRzl5SUdsdWMzUmhibU5sWEc0cUwxeHVablZ1WTNScGIyNGdaMlYwUTI5c2IzSW9kbUZzZFdVcElIdGNiaUFnY21WMGRYSnVJSFpoYkhWbElHbHVjM1JoYm1ObGIyWWdZMjlzYjNJZ1B5QjJZV3gxWlNBNklHNWxkeUJqYjJ4dmNpaDJZV3gxWlNrN1hHNTlPMXh1WEc0dktpcGNiaUFnS2lCQVpHVnpZeUJqYkdGdGNDQjJZV3gxWlNCaVpYUjNaV1Z1SUcxcGJpQmhibVFnYldGNFhHNGdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJSFpoYkhWbFhHNGdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJRzFwYmx4dUlDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQnRZWGhjYmlBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOVhHNHFMMXh1Wm5WdVkzUnBiMjRnWTJ4aGJYQW9kbUZzZFdVc0lHMXBiaXdnYldGNEtTQjdYRzRnSUhKbGRIVnliaUIyWVd4MVpTQThQU0J0YVc0Z1B5QnRhVzRnT2lCMllXeDFaU0ErUFNCdFlYZ2dQeUJ0WVhnZ09pQjJZV3gxWlR0Y2JuMDdYRzVjYmk4cUtseHVJQ0FxSUVCa1pYTmpJR052YlhCaGNtVWdkbUZzZFdWeklHSmxkSGRsWlc0Z2RIZHZJRzlpYW1WamRITXNJSEpsZEhWeWJuTWdZU0J2WW1wbFkzUWdjbVZ3Y21WelpXNTBhVzVuSUdOb1lXNW5aWE1nZDJsMGFDQjBjblZsTDJaaGJITmxJSFpoYkhWbGMxeHVJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JoWEc0Z0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHSmNiaUFnS2lCQWNtVjBkWEp1SUh0UFltcGxZM1I5WEc0cUwxeHVablZ1WTNScGIyNGdZMjl0Y0dGeVpVOWlhbk1vWVN3Z1lpa2dlMXh1SUNCMllYSWdZMmhoYm1kbGN5QTlJSHQ5TzF4dUlDQm1iM0lnS0haaGNpQnJaWGtnYVc0Z1lTa2dlMXh1SUNBZ0lHTm9ZVzVuWlhOYmEyVjVYU0E5SUdKYmEyVjVYU0FoUFNCaFcydGxlVjA3WEc0Z0lIMXlaWFIxY200Z1kyaGhibWRsY3p0Y2JuMDdYRzVjYmk4cUtseHVJQ0FxSUVCa1pYTmpJRzFwZUNCMGQyOGdZMjlzYjNKelhHNGdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUWdmQ0JUZEhKcGJtY2dmQ0JqYjJ4dmNuMGdZMjlzYjNJeElDMGdZMjlzYjNJZ2FXNXpkR0Z1WTJVc0lHOWlhbVZqZENBb2FITjJMQ0JvYzJ3Z2IzSWdjbWRpS1N3Z2MzUnlhVzVuSUNob2Myd3NJSEpuWWl3Z2FHVjRLVnh1SUNBcUlFQndZWEpoYlNCN1QySnFaV04wSUh3Z1UzUnlhVzVuSUh3Z1kyOXNiM0o5SUdOdmJHOXlNaUF0SUdOdmJHOXlJR2x1YzNSaGJtTmxMQ0J2WW1wbFkzUWdLR2h6ZGl3Z2FITnNJRzl5SUhKbllpa3NJSE4wY21sdVp5QW9hSE5zTENCeVoySXNJR2hsZUNsY2JpQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdkMlZwWjJoMElDMGdZMnh2YzJWeUlIUnZJREFnUFNCdGIzSmxJR052Ykc5eU1Td2dZMnh2YzJWeUlIUnZJREV3TUNBOUlHMXZjbVVnWTI5c2IzSXlYRzRnSUNvZ1FISmxkSFZ5YmlCN1kyOXNiM0o5SUdOdmJHOXlJR2x1YzNSaGJtTmxYRzRxTDF4dVpuVnVZM1JwYjI0Z1gyMXBlQ2hqYjJ4dmNqRXNJR052Ykc5eU1pd2dkMlZwWjJoMEtTQjdYRzRnSUhaaGNpQnlaMkl4SUQwZ1oyVjBRMjlzYjNJb1kyOXNiM0l4S1M1eVoySXNYRzRnSUNBZ0lDQnlaMkl5SUQwZ1oyVjBRMjlzYjNJb1kyOXNiM0l5S1M1eVoySTdYRzRnSUhkbGFXZG9kQ0E5SUdOc1lXMXdLSGRsYVdkb2RDQXZJREV3TUNCOGZDQXdMalVzSURBc0lERXBPMXh1SUNCeVpYUjFjbTRnYm1WM0lHTnZiRzl5S0h0Y2JpQWdJQ0J5T2lCbWJHOXZjaWh5WjJJeExuSWdLeUFvY21kaU1pNXlJQzBnY21kaU1TNXlLU0FxSUhkbGFXZG9kQ2tzWEc0Z0lDQWdaem9nWm14dmIzSW9jbWRpTVM1bklDc2dLSEpuWWpJdVp5QXRJSEpuWWpFdVp5a2dLaUIzWldsbmFIUXBMRnh1SUNBZ0lHSTZJR1pzYjI5eUtISm5ZakV1WWlBcklDaHlaMkl5TG1JZ0xTQnlaMkl4TG1JcElDb2dkMlZwWjJoMEtWeHVJQ0I5S1R0Y2JuMDdYRzVjYmk4cUtseHVJQ0FxSUVCa1pYTmpJR3hwWjJoMFpXNGdZMjlzYjNJZ1lua2dZVzF2ZFc1MFhHNGdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUWdmQ0JUZEhKcGJtY2dmQ0JqYjJ4dmNuMGdZMjlzYjNJZ0xTQmpiMnh2Y2lCcGJuTjBZVzVqWlN3Z2IySnFaV04wSUNob2MzWXNJR2h6YkNCdmNpQnlaMklwTENCemRISnBibWNnS0doemJDd2djbWRpTENCb1pYZ3BYRzRnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUdGdGIzVnVkRnh1SUNBcUlFQnlaWFIxY200Z2UyTnZiRzl5ZlNCamIyeHZjaUJwYm5OMFlXNWpaVnh1S2k5Y2JtWjFibU4wYVc5dUlGOXNhV2RvZEdWdUtHTnZiRzl5TENCaGJXOTFiblFwSUh0Y2JpQWdkbUZ5SUdOdmJDQTlJR2RsZEVOdmJHOXlLR052Ykc5eUtTeGNiaUFnSUNBZ0lHaHpkaUE5SUdOdmJDNW9jM1k3WEc0Z0lHaHpkaTUySUQwZ1kyeGhiWEFvYUhOMkxuWWdLeUJoYlc5MWJuUXNJREFzSURFd01DazdYRzRnSUdOdmJDNW9jM1lnUFNCb2MzWTdYRzRnSUhKbGRIVnliaUJqYjJ3N1hHNTlPMXh1WEc0dktpcGNiaUFnS2lCQVpHVnpZeUJrWVhKclpXNGdZMjlzYjNJZ1lua2dZVzF2ZFc1MFhHNGdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUWdmQ0JUZEhKcGJtY2dmQ0JqYjJ4dmNuMGdZMjlzYjNJZ0xTQmpiMnh2Y2lCcGJuTjBZVzVqWlN3Z2IySnFaV04wSUNob2MzWXNJR2h6YkNCdmNpQnlaMklwTENCemRISnBibWNnS0doemJDd2djbWRpTENCb1pYZ3BYRzRnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUdGdGIzVnVkRnh1SUNBcUlFQnlaWFIxY200Z2UyTnZiRzl5ZlNCamIyeHZjaUJwYm5OMFlXNWpaVnh1S2k5Y2JtWjFibU4wYVc5dUlGOWtZWEpyWlc0b1kyOXNiM0lzSUdGdGIzVnVkQ2tnZTF4dUlDQjJZWElnWTI5c0lEMGdaMlYwUTI5c2IzSW9ZMjlzYjNJcExGeHVJQ0FnSUNBZ2FITjJJRDBnWTI5c0xtaHpkanRjYmlBZ2FITjJMbllnUFNCamJHRnRjQ2hvYzNZdWRpQXRJR0Z0YjNWdWRDd2dNQ3dnTVRBd0tUdGNiaUFnWTI5c0xtaHpkaUE5SUdoemRqdGNiaUFnY21WMGRYSnVJR052YkR0Y2JuMDdYRzVjYmk4cUtseHVJQ0FxSUVCamIyNXpkSEoxWTNSdmNpQmpiMnh2Y2lCdlltcGxZM1JjYmlBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZENCOElGTjBjbWx1WnlCOElHTnZiRzl5ZlNCMllXeDFaU0F0SUdOdmJHOXlJR2x1YzNSaGJtTmxMQ0J2WW1wbFkzUWdLR2h6ZGl3Z2FITnNJRzl5SUhKbllpa3NJSE4wY21sdVp5QW9hSE5zTENCeVoySXNJR2hsZUNsY2Jpb3ZYRzUyWVhJZ1kyOXNiM0lnUFNCbWRXNWpkR2x2YmlCamIyeHZjaWgyWVd4MVpTa2dlMXh1SUNBdkx5QlVhR1VnZDJGMFkyZ2dZMkZzYkdKaFkyc2dablZ1WTNScGIyNGdabTl5SUhSb2FYTWdZMjlzYjNJZ2QybHNiQ0JpWlNCemRHOXlaV1FnYUdWeVpWeHVJQ0IwYUdsekxsOXZia05vWVc1blpTQTlJR1poYkhObE8xeHVJQ0F2THlCVWFHVWdaR1ZtWVhWc2RDQmpiMnh2Y2lCMllXeDFaVnh1SUNCMGFHbHpMbDkyWVd4MVpTQTlJSHNnYURvZ2RXNWtaV1pwYm1Wa0xDQnpPaUIxYm1SbFptbHVaV1FzSUhZNklIVnVaR1ZtYVc1bFpDQjlPMXh1SUNCcFppQW9kbUZzZFdVcElIUm9hWE11YzJWMEtIWmhiSFZsS1R0Y2JuMDdYRzVjYmk4dklFVjRjRzl6WlNCbWRXNWpkR2x2Ym5NZ1lYTWdjM1JoZEdsaklHaGxiSEJsY25OY2JtTnZiRzl5TG0xcGVDQTlJRjl0YVhnN1hHNWpiMnh2Y2k1c2FXZG9kR1Z1SUQwZ1gyeHBaMmgwWlc0N1hHNWpiMnh2Y2k1a1lYSnJaVzRnUFNCZlpHRnlhMlZ1TzF4dVkyOXNiM0l1YUhOMk1sSm5ZaUE5SUdoemRqSlNaMkk3WEc1amIyeHZjaTV5WjJJeVNITjJJRDBnY21kaU1raHpkanRjYm1OdmJHOXlMbWh6ZGpKSWMyd2dQU0JvYzNZeVNITnNPMXh1WTI5c2IzSXVhSE5zTWtoemRpQTlJR2h6YkRKSWMzWTdYRzVqYjJ4dmNpNW9jMnd5VTNSeUlEMGdhSE5zTWxOMGNqdGNibU52Ykc5eUxuSm5ZakpUZEhJZ1BTQnlaMkl5VTNSeU8xeHVZMjlzYjNJdWNtZGlNa2hsZUNBOUlISm5ZakpJWlhnN1hHNWpiMnh2Y2k1d1lYSnpaVWhsZUZOMGNpQTlJSEJoY25ObFNHVjRVM1J5TzF4dVkyOXNiM0l1Y0dGeWMyVkljMnhUZEhJZ1BTQndZWEp6WlVoemJGTjBjanRjYm1OdmJHOXlMbkJoY25ObFVtZGlVM1J5SUQwZ2NHRnljMlZTWjJKVGRISTdYRzVjYm1OdmJHOXlMbkJ5YjNSdmRIbHdaU0E5SUh0Y2JpQWdZMjl1YzNSeWRXTjBiM0k2SUdOdmJHOXlMRnh1WEc0Z0lDOHFLbHh1SUNBZ0lDb2dRR1JsYzJNZ2MyVjBJSFJvWlNCamIyeHZjaUJtY205dElHRnVlU0IyWVd4cFpDQjJZV3gxWlZ4dUlDQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUWdmQ0JUZEhKcGJtY2dmQ0JqYjJ4dmNuMGdkbUZzZFdVZ0xTQmpiMnh2Y2lCcGJuTjBZVzVqWlN3Z2IySnFaV04wSUNob2MzWXNJR2h6YkNCdmNpQnlaMklwTENCemRISnBibWNnS0doemJDd2djbWRpTENCb1pYZ3BYRzRnSUNvdlhHNGdJSE5sZERvZ1puVnVZM1JwYjI0Z2MyVjBLSFpoYkhWbEtTQjdYRzRnSUNBZ2FXWWdLQ2gwZVhCbGIyWWdkbUZzZFdVZ1BUMDlJRndpZFc1a1pXWnBibVZrWENJZ1B5QmNJblZ1WkdWbWFXNWxaRndpSURvZ1gzUjVjR1Z2WmloMllXeDFaU2twSUQwOUlGd2liMkpxWldOMFhDSXBJSHRjYmlBZ0lDQWdJR2xtSUNoMllXeDFaU0JwYm5OMFlXNWpaVzltSUdOdmJHOXlLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhSE4ySUQwZ1kyOXNiM0l1YUhOMk8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaGNJbkpjSWlCcGJpQjJZV3gxWlNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbllpQTlJSFpoYkhWbE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaGNJblpjSWlCcGJpQjJZV3gxWlNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1oemRpQTlJSFpoYkhWbE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaGNJbXhjSWlCcGJpQjJZV3gxWlNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1oemJDQTlJSFpoYkhWbE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2RIbHdaVzltSUhaaGJIVmxJRDA5SUZ3aWMzUnlhVzVuWENJcElIdGNiaUFnSUNBZ0lHbG1JQ2d2WG5KbllpOHVkR1Z6ZENoMllXeDFaU2twSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV5WjJKVGRISnBibWNnUFNCMllXeDFaVHRjYmlBZ0lDQWdJSDBnWld4elpTQnBaaUFvTDE1b2Myd3ZMblJsYzNRb2RtRnNkV1VwS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YUhOc1UzUnlhVzVuSUQwZ2RtRnNkV1U3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0M5ZUkxc3dMVGxCTFVaaExXWmRMeTUwWlhOMEtIWmhiSFZsS1NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1obGVGTjBjbWx1WnlBOUlIWmhiSFZsTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZTeGNibHh1SUNBdktpcGNiaUFnSUNBcUlFQmtaWE5qSUhOb2IzSjBZM1YwSUhSdklITmxkQ0JoSUhOd1pXTnBabWxqSUdOb1lXNXVaV3dnZG1Gc2RXVmNiaUFnSUNBcUlFQndZWEpoYlNCN1UzUnlhVzVuZlNCdGIyUmxiQ0F0SUdoemRpQjhJR2h6YkNCOElISm5ZbHh1SUNBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlHTm9ZVzV1Wld3Z0xTQnBibVJwZG1sa2RXRnNJR05vWVc1dVpXd2dkRzhnYzJWMExDQm1iM0lnWlhoaGJYQnNaU0JwWmlCdGIyUmxiQ0E5SUdoemJDd2dZMmhoYm1Wc0lEMGdhQ0I4SUhNZ2ZDQnNYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2RtRnNkV1VnTFNCdVpYY2dkbUZzZFdVZ1ptOXlJSFJvWlNCamFHRnVibVZzWEc0Z0lDb3ZYRzRnSUhObGRFTm9ZVzV1Wld3NklHWjFibU4wYVc5dUlITmxkRU5vWVc1dVpXd29iVzlrWld3c0lHTm9ZVzV1Wld3c0lIWmhiSFZsS1NCN1hHNGdJQ0FnZG1GeUlIWWdQU0IwYUdselcyMXZaR1ZzWFR0Y2JpQWdJQ0IyVzJOb1lXNXVaV3hkSUQwZ2RtRnNkV1U3WEc0Z0lDQWdkR2hwYzF0dGIyUmxiRjBnUFNCMk8xeHVJQ0I5TEZ4dVhHNGdJQzhxS2x4dUlDQWdJQ29nUUdSbGMyTWdiV0ZyWlNCdVpYY2dZMjlzYjNJZ2FXNXpkR0Z1WTJVZ2QybDBhQ0IwYUdVZ2MyRnRaU0IyWVd4MVpTQmhjeUIwYUdseklHOXVaVnh1SUNBZ0lDb2dRSEpsZEhWeWJpQjdZMjlzYjNKOVhHNGdJQ292WEc0Z0lHTnNiMjVsT2lCbWRXNWpkR2x2YmlCamJHOXVaU2dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdibVYzSUdOdmJHOXlLSFJvYVhNcE8xeHVJQ0I5TEZ4dVhHNGdJQzhxS2x4dUlDQWdJQ29nUUdSbGMyTWdZMjl0Y0dGeVpTQjBhR2x6SUdOdmJHOXlJR0ZuWVdsdWMzUWdZVzV2ZEdobGNpd2djbVYwZFhKdWN5QmhJRzlpYW1WamRDQnlaWEJ5WlhObGJuUnBibWNnWTJoaGJtZGxjeUIzYVhSb0lIUnlkV1V2Wm1Gc2MyVWdkbUZzZFdWelhHNGdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkQ0I4SUZOMGNtbHVaeUI4SUdOdmJHOXlmU0JqYjJ4dmNpQXRJR052Ykc5eUlIUnZJR052YlhCaGNtVWdZV2RoYVc1emRGeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUcxdlpHVnNJQzBnYUhOMklId2dhSE5zSUh3Z2NtZGlYRzRnSUNBZ0tpQkFjbVYwZFhKdUlIdFBZbXBsWTNSOVhHNGdJQ292WEc0Z0lHTnZiWEJoY21VNklHWjFibU4wYVc5dUlHTnZiWEJoY21Vb1kyOXNiM0lzSUcxdlpHVnNLU0I3WEc0Z0lDQWdiVzlrWld3Z1BTQnRiMlJsYkNCOGZDQmNJbWh6ZGx3aU8xeHVJQ0FnSUhKbGRIVnliaUJqYjIxd1lYSmxUMkpxY3loMGFHbHpXMjF2WkdWc1hTd2daMlYwUTI5c2IzSW9ZMjlzYjNJcFcyMXZaR1ZzWFNrN1hHNGdJSDBzWEc1Y2JpQWdMeW9xWEc0Z0lDQWdLaUJBWkdWell5QnRhWGdnWVNCamIyeHZjaUJwYm5SdklIUm9hWE1nYjI1bFhHNGdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkQ0I4SUZOMGNtbHVaeUI4SUdOdmJHOXlmU0JqYjJ4dmNpQXRJR052Ykc5eUlHbHVjM1JoYm1ObExDQnZZbXBsWTNRZ0tHaHpkaXdnYUhOc0lHOXlJSEpuWWlrc0lITjBjbWx1WnlBb2FITnNMQ0J5WjJJc0lHaGxlQ2xjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQjNaV2xuYUhRZ0xTQmpiRzl6WlhJZ2RHOGdNQ0E5SUcxdmNtVWdZM1Z5Y21WdWRDQmpiMnh2Y2l3Z1kyeHZjMlZ5SUhSdklERXdNQ0E5SUcxdmNtVWdibVYzSUdOdmJHOXlYRzRnSUNvdlhHNGdJRzFwZURvZ1puVnVZM1JwYjI0Z2JXbDRLR052Ykc5eUxDQjNaV2xuYUhRcElIdGNiaUFnSUNCMGFHbHpMbWh6ZGlBOUlGOXRhWGdvZEdocGN5d2dZMjlzYjNJc0lIZGxhV2RvZENrdWFITjJPMXh1SUNCOUxGeHVYRzRnSUM4cUtseHVJQ0FnSUNvZ1FHUmxjMk1nYkdsbmFIUmxiaUJqYjJ4dmNpQmllU0JoYlc5MWJuUmNiaUFnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCaGJXOTFiblJjYmlBZ0tpOWNiaUFnYkdsbmFIUmxiam9nWm5WdVkzUnBiMjRnYkdsbmFIUmxiaWhoYlc5MWJuUXBJSHRjYmlBZ0lDQmZiR2xuYUhSbGJpaDBhR2x6TENCaGJXOTFiblFwTzF4dUlDQjlMRnh1WEc0Z0lDOHFLbHh1SUNBZ0lDb2dRR1JsYzJNZ1pHRnlhMlZ1SUdOdmJHOXlJR0o1SUdGdGIzVnVkRnh1SUNBZ0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHRnRiM1Z1ZEZ4dUlDQXFMMXh1SUNCa1lYSnJaVzQ2SUdaMWJtTjBhVzl1SUdSaGNtdGxiaWhoYlc5MWJuUXBJSHRjYmlBZ0lDQmZaR0Z5YTJWdUtIUm9hWE1zSUdGdGIzVnVkQ2s3WEc0Z0lIMWNibjA3WEc1Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBhV1Z6S0dOdmJHOXlMbkJ5YjNSdmRIbHdaU3dnZTF4dUlDQm9jM1k2SUh0Y2JpQWdJQ0JuWlhRNklHWjFibU4wYVc5dUlHZGxkQ2dwSUh0Y2JpQWdJQ0FnSUM4dklGOTJZV3gxWlNCcGN5QmpiRzl1WldRZ2RHOGdZV3hzYjNjZ1kyaGhibWRsY3lCMGJ5QmlaU0J0WVdSbElIUnZJSFJvWlNCMllXeDFaWE1nWW1WbWIzSmxJSEJoYzNOcGJtY2dkR2hsYlNCaVlXTnJYRzRnSUNBZ0lDQjJZWElnZGlBOUlIUm9hWE11WDNaaGJIVmxPMXh1SUNBZ0lDQWdjbVYwZFhKdUlIc2dhRG9nZGk1b0xDQnpPaUIyTG5Nc0lIWTZJSFl1ZGlCOU8xeHVJQ0FnSUgwc1hHNGdJQ0FnYzJWME9pQm1kVzVqZEdsdmJpQnpaWFFvYm1WM1ZtRnNkV1VwSUh0Y2JpQWdJQ0FnSUM4dklFbG1JSFJvYVhNZ1kyOXNiM0lnYVhNZ1ltVnBibWNnZDJGMFkyaGxaQ0JtYjNJZ1kyaGhibWRsY3lCM1pTQnVaV1ZrSUhSdklHTnZiWEJoY21VZ2RHaGxJRzVsZHlCaGJtUWdiMnhrSUhaaGJIVmxjeUIwYnlCamFHVmpheUIwYUdVZ1pHbG1abVZ5Wlc1alpWeHVJQ0FnSUNBZ0x5OGdUM1JvWlhKM2FYTmxJSGRsSUdOaGJpQnFkWE4wSUdKbElHeGhlbmxjYmlBZ0lDQWdJR2xtSUNoMGFHbHpMbDl2YmtOb1lXNW5aU2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdiMnhrVm1Gc2RXVWdQU0IwYUdsekxsOTJZV3gxWlR0Y2JpQWdJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ1kyaGhibTVsYkNCcGJpQnZiR1JXWVd4MVpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUdsbUlDZ2hibVYzVm1Gc2RXVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrb1kyaGhibTVsYkNrcElHNWxkMVpoYkhWbFcyTm9ZVzV1Wld4ZElEMGdiMnhrVm1Gc2RXVmJZMmhoYm01bGJGMDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZG1GeUlHTm9ZVzVuWlhNZ1BTQmpiMjF3WVhKbFQySnFjeWh2YkdSV1lXeDFaU3dnYm1WM1ZtRnNkV1VwTzF4dUlDQWdJQ0FnSUNBdkx5QlZjR1JoZEdVZ2RHaGxJRzlzWkNCMllXeDFaVnh1SUNBZ0lDQWdJQ0IwYUdsekxsOTJZV3gxWlNBOUlHNWxkMVpoYkhWbE8xeHVJQ0FnSUNBZ0lDQXZMeUJKWmlCMGFHVWdkbUZzZFdVZ2FHRnpJR05vWVc1blpXUXNJR05oYkd3Z2FHOXZheUJqWVd4c1ltRmphMXh1SUNBZ0lDQWdJQ0JwWmlBb1kyaGhibWRsY3k1b0lIeDhJR05vWVc1blpYTXVjeUI4ZkNCamFHRnVaMlZ6TG5ZcElIUm9hWE11WDI5dVEyaGhibWRsS0hSb2FYTXNJR05vWVc1blpYTXBPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1ZmRtRnNkV1VnUFNCdVpYZFdZV3gxWlR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMHNYRzRnSUhKbllqb2dlMXh1SUNBZ0lHZGxkRG9nWm5WdVkzUnBiMjRnWjJWMEtDa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHaHpkakpTWjJJb2RHaHBjeTVmZG1Gc2RXVXBPMXh1SUNBZ0lIMHNYRzRnSUNBZ2MyVjBPaUJtZFc1amRHbHZiaUJ6WlhRb2RtRnNkV1VwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVhSE4ySUQwZ2NtZGlNa2h6ZGloMllXeDFaU2s3WEc0Z0lDQWdmVnh1SUNCOUxGeHVJQ0JvYzJ3NklIdGNiaUFnSUNCblpYUTZJR1oxYm1OMGFXOXVJR2RsZENncElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCb2MzWXlTSE5zS0hSb2FYTXVYM1poYkhWbEtUdGNiaUFnSUNCOUxGeHVJQ0FnSUhObGREb2dablZ1WTNScGIyNGdjMlYwS0haaGJIVmxLU0I3WEc0Z0lDQWdJQ0IwYUdsekxtaHpkaUE5SUdoemJESkljM1lvZG1Gc2RXVXBPMXh1SUNBZ0lIMWNiaUFnZlN4Y2JpQWdjbWRpVTNSeWFXNW5PaUI3WEc0Z0lDQWdaMlYwT2lCbWRXNWpkR2x2YmlCblpYUW9LU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdjbWRpTWxOMGNpaDBhR2x6TG5KbllpazdYRzRnSUNBZ2ZTeGNiaUFnSUNCelpYUTZJR1oxYm1OMGFXOXVJSE5sZENoMllXeDFaU2tnZTF4dUlDQWdJQ0FnZEdocGN5NXlaMklnUFNCd1lYSnpaVkpuWWxOMGNpaDJZV3gxWlNrN1hHNGdJQ0FnZlZ4dUlDQjlMRnh1SUNCb1pYaFRkSEpwYm1jNklIdGNiaUFnSUNCblpYUTZJR1oxYm1OMGFXOXVJR2RsZENncElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCeVoySXlTR1Y0S0hSb2FYTXVjbWRpS1R0Y2JpQWdJQ0I5TEZ4dUlDQWdJSE5sZERvZ1puVnVZM1JwYjI0Z2MyVjBLSFpoYkhWbEtTQjdYRzRnSUNBZ0lDQjBhR2x6TG5KbllpQTlJSEJoY25ObFNHVjRVM1J5S0haaGJIVmxLVHRjYmlBZ0lDQjlYRzRnSUgwc1hHNGdJR2h6YkZOMGNtbHVaem9nZTF4dUlDQWdJR2RsZERvZ1puVnVZM1JwYjI0Z1oyVjBLQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR2h6YkRKVGRISW9kR2hwY3k1b2Myd3BPMXh1SUNBZ0lIMHNYRzRnSUNBZ2MyVjBPaUJtZFc1amRHbHZiaUJ6WlhRb2RtRnNkV1VwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVhSE5zSUQwZ1kyOXNiM0l1Y0dGeWMyVkljMnhUZEhJb2RtRnNkV1VwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmU2s3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1kyOXNiM0k3WEc1Y2JpOHFLaW92SUgwcExGeHVMeW9nTVNBcUwxeHVMeW9xS2k4Z0tHWjFibU4wYVc5dUtHMXZaSFZzWlN3Z1pYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5a2dlMXh1WEc1Y0luVnpaU0J6ZEhKcFkzUmNJanRjYmx4dVhHNHZLaXBjYmlBZ1FHTnZibk4wY25WamRHOXlJSE4wZVd4bGMyaGxaWFFnZDNKcGRHVnlYRzRxTDF4dWRtRnlJSE4wZVd4bGMyaGxaWFFnUFNCbWRXNWpkR2x2YmlCemRIbHNaWE5vWldWMEtDa2dlMXh1SUNBdkx5QkRjbVZoZEdVZ1lTQnVaWGNnYzNSNWJHVWdaV3hsYldWdWRGeHVJQ0IyWVhJZ2MzUjViR1VnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLRndpYzNSNWJHVmNJaWs3WEc0Z0lHUnZZM1Z0Wlc1MExtaGxZV1F1WVhCd1pXNWtRMmhwYkdRb2MzUjViR1VwTzF4dUlDQXZMeUJYWldKcmFYUWdZWEJ3WVhKbGJuUnNlU0J5WlhGMWFYSmxjeUJoSUhSbGVIUWdibTlrWlNCMGJ5QmlaU0JwYm5ObGNuUmxaQ0JwYm5SdklIUm9aU0J6ZEhsc1pTQmxiR1Z0Wlc1MFhHNGdJQzh2SUNoaFkyTnZjbVJwYm1jZ2RHOGdhSFIwY0hNNkx5OWtZWFpwWkhkaGJITm9MbTVoYldVdllXUmtMWEoxYkdWekxYTjBlV3hsYzJobFpYUnpLVnh1SUNCemRIbHNaUzVoY0hCbGJtUkRhR2xzWkNoa2IyTjFiV1Z1ZEM1amNtVmhkR1ZVWlhoMFRtOWtaU2hjSWx3aUtTazdYRzRnSUhSb2FYTXVjM1I1YkdVZ1BTQnpkSGxzWlR0Y2JpQWdMeThnUTNKbFlYUmxJR0VnY21WbVpYSmxibU5sSUhSdklIUm9aU0J6ZEhsc1pTQmxiR1Z0Wlc1MEozTWdRMU5UVTNSNWJHVlRhR1ZsZENCdlltcGxZM1JjYmlBZ0x5OGdRMU5UVTNSNWJHVlRhR1ZsZENCQlVFazZJR2gwZEhCek9pOHZaR1YyWld4dmNHVnlMbTF2ZW1sc2JHRXViM0puTDJWdUxWVlRMMlJ2WTNNdlYyVmlMMEZRU1M5RFUxTlRkSGxzWlZOb1pXVjBYRzRnSUhaaGNpQnphR1ZsZENBOUlITjBlV3hsTG5Ob1pXVjBPMXh1SUNCMGFHbHpMbk5vWldWMElEMGdjMmhsWlhRN1hHNGdJQzh2SUVkbGRDQmhJSEpsWm1WeVpXNWpaU0IwYnlCMGFHVWdjMmhsWlhRbmN5QkRVMU5TZFd4bFRHbHpkQ0J2WW1wbFkzUmNiaUFnTHk4Z1ExTlRVblZzWlV4cGMzUWdRVkJKT2lCb2RIUndjem92TDJSbGRtVnNiM0JsY2k1dGIzcHBiR3hoTG05eVp5OWxiaTFWVXk5a2IyTnpMMWRsWWk5QlVFa3ZRMU5UVW5Wc1pVeHBjM1JjYmlBZ2RHaHBjeTV5ZFd4bGN5QTlJSE5vWldWMExuSjFiR1Z6SUh4OElITm9aV1YwTG1OemMxSjFiR1Z6TzF4dUlDQXZMeUJYWlNkc2JDQnpkRzl5WlNCeVpXWmxjbVZ1WTJWeklIUnZJR0ZzYkNCMGFHVWdRMU5UVTNSNWJHVkVaV05zWVhKaGRHbHZiaUJ2WW1wbFkzUnpJSFJvWVhRZ2QyVWdZMmhoYm1kbElHaGxjbVVzSUd0bGVXVmtJR0o1SUhSb1pTQkRVMU1nYzJWc1pXTjBiM0lnZEdobGVTQmlaV3h2Ym1jZ2RHOWNiaUFnTHk4Z1ExTlRVM1I1YkdWRVpXTnNZWEpoZEdsdmJpQkJVRWs2SUdoMGRIQnpPaTh2WkdWMlpXeHZjR1Z5TG0xdmVtbHNiR0V1YjNKbkwyVnVMVlZUTDJSdlkzTXZWMlZpTDBGUVNTOURVMU5UZEhsc1pVUmxZMnhoY21GMGFXOXVYRzRnSUhSb2FYTXViV0Z3SUQwZ2UzMDdYRzU5TzF4dVhHNXpkSGxzWlhOb1pXVjBMbkJ5YjNSdmRIbHdaU0E5SUh0Y2JpQWdZMjl1YzNSeWRXTjBiM0k2SUhOMGVXeGxjMmhsWlhRc1hHNWNiaUFnTHlvcVhHNGdJQ0FnS2lCQVpHVnpZeUJUWlhRZ1lTQnpjR1ZqYVdacFl5QnlkV3hsSUdadmNpQmhJR2RwZG1WdUlITmxiR1ZqZEc5eVhHNGdJQ0FnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnYzJWc1pXTjBiM0lnTFNCMGFHVWdRMU5USUhObGJHVmpkRzl5SUdadmNpQjBhR2x6SUhKMWJHVWdLR1V1Wnk0Z1hDSmliMlI1WENJc0lGd2lMbU5zWVhOelhDSXNJRndpSTJsa1hDSXBYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UxTjBjbWx1WjMwZ2NISnZjR1Z5ZEhrZ0xTQjBhR1VnUTFOVElIQnliM0JsY25SNUlIUnZJSE5sZENBb1pTNW5MaUJjSW1KaFkydG5jbTkxYm1RdFkyOXNiM0pjSWl3Z1hDSm1iMjUwTFdaaGJXbHNlVndpTENCY0lub3RhVzVrWlhoY0lpbGNiaUFnSUNBcUlFQndZWEpoYlNCN1UzUnlhVzVuZlNCMllXeDFaU0FnSUNBdElIUm9aU0J1WlhjZ2RtRnNkV1VnWm05eUlIUm9aU0J5ZFd4bElDaGxMbWN1SUZ3aWNtZGlLREkxTlN3Z01qVTFMQ0F5TlRVcFhDSXNJRndpU0dWc2RtVjBhV05oWENJc0lGd2lPVGxjSWlsY2JpQWdLaTljYmlBZ2MyVjBVblZzWlRvZ1puVnVZM1JwYjI0Z2MyVjBVblZzWlNoelpXeGxZM1J2Y2l3Z2NISnZjR1Z5ZEhrc0lIWmhiSFZsS1NCN1hHNGdJQ0FnZG1GeUlITm9aV1YwSUQwZ2RHaHBjeTV6YUdWbGREdGNiaUFnSUNCMllYSWdjblZzWlhNZ1BTQnphR1ZsZEM1eWRXeGxjeUI4ZkNCemFHVmxkQzVqYzNOU2RXeGxjenRjYmlBZ0lDQjJZWElnYldGd0lEMGdkR2hwY3k1dFlYQTdYRzRnSUNBZ0x5OGdRMjl1ZG1WeWRDQndjbTl3WlhKMGVTQm1jbTl0SUdOaGJXVnNRMkZ6WlNCMGJ5QnpibUZyWlMxallYTmxYRzRnSUNBZ2NISnZjR1Z5ZEhrZ1BTQndjbTl3WlhKMGVTNXlaWEJzWVdObEtDOG9XMEV0V2wwcEwyY3NJR1oxYm1OMGFXOXVJQ2drTVNrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUZ3aUxWd2lJQ3NnSkRFdWRHOU1iM2RsY2tOaGMyVW9LVHRjYmlBZ0lDQjlLVHRjYmlBZ0lDQnBaaUFvSVcxaGNDNW9ZWE5QZDI1UWNtOXdaWEowZVNoelpXeGxZM1J2Y2lrcElIdGNiaUFnSUNBZ0lDOHZJRWxtSUhSb1pTQnpaV3hsWTNSdmNpQm9ZWE51SjNRZ1ltVmxiaUIxYzJWa0lIbGxkQ0IzWlNCM1lXNTBJSFJ2SUdsdWMyVnlkQ0IwYUdVZ2NuVnNaU0JoZENCMGFHVWdaVzVrSUc5bUlIUm9aU0JEVTFOU2RXeGxUR2x6ZEN3Z2MyOGdkMlVnZFhObElHbDBjeUJzWlc1bmRHZ2dZWE1nZEdobElHbHVaR1Y0SUhaaGJIVmxYRzRnSUNBZ0lDQjJZWElnYVc1a1pYZ2dQU0J5ZFd4bGN5NXNaVzVuZEdnN1hHNGdJQ0FnSUNBdkx5QlFjbVZ3WVhKbElIUm9aU0J5ZFd4bElHUmxZMnhoY21GMGFXOXVJSFJsZUhRc0lITnBibU5sSUdKdmRHZ2dhVzV6WlhKMFVuVnNaU0JoYm1RZ1lXUmtVblZzWlNCMFlXdGxJSFJvYVhNZ1ptOXliV0YwWEc0Z0lDQWdJQ0IyWVhJZ1pHVmpiR0Z5WVhScGIyNGdQU0J3Y205d1pYSjBlU0FySUZ3aU9pQmNJaUFySUhaaGJIVmxPMXh1SUNBZ0lDQWdMeThnU1c1elpYSjBJSFJvWlNCdVpYY2djblZzWlNCcGJuUnZJSFJvWlNCemRIbHNaWE5vWldWMFhHNGdJQ0FnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0F2THlCVGIyMWxJR0p5YjNkelpYSnpJRzl1YkhrZ2MzVndjRzl5ZENCcGJuTmxjblJTZFd4bExDQnZkR2hsY25NZ2IyNXNlU0J6ZFhCd2IzSjBJR0ZrWkZKMWJHVXNJSE52SUhkbElHaGhkbVVnZEc4Z2RYTmxJR0p2ZEdoY2JpQWdJQ0FnSUNBZ2MyaGxaWFF1YVc1elpYSjBVblZzWlNoelpXeGxZM1J2Y2lBcklGd2lJSHRjSWlBcklHUmxZMnhoY21GMGFXOXVJQ3NnWENJN2ZWd2lMQ0JwYm1SbGVDazdYRzRnSUNBZ0lDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdJQ0FnSUhOb1pXVjBMbUZrWkZKMWJHVW9jMlZzWldOMGIzSXNJR1JsWTJ4aGNtRjBhVzl1TENCcGJtUmxlQ2s3WEc0Z0lDQWdJQ0I5SUdacGJtRnNiSGtnZTF4dUlDQWdJQ0FnSUNBdkx5QkNaV05oZFhObElITmhabUZ5YVNCcGN5QndaWEpvWVhCeklIUm9aU0IzYjNKemRDQmljbTkzYzJWeUlHbHVJR0ZzYkNCdlppQm9hWE4wYjNKNUxDQjNaU0JvWVhabElIUnZJSEpsYldsdVpDQnBkQ0IwYnlCclpXVndJSFJvWlNCemFHVmxkQ0J5ZFd4bGN5QjFjQzEwYnkxa1lYUmxYRzRnSUNBZ0lDQWdJSEoxYkdWeklEMGdjMmhsWlhRdWNuVnNaWE1nZkh3Z2MyaGxaWFF1WTNOelVuVnNaWE03WEc0Z0lDQWdJQ0FnSUM4dklFRmtaQ0J2ZFhJZ2JtVjNiSGtnYVc1elpYSjBaV1FnY25Wc1pTZHpJRU5UVTFOMGVXeGxSR1ZqYkdGeVlYUnBiMjRnYjJKcVpXTjBJSFJ2SUhSb1pTQnBiblJsY201aGJDQnRZWEJjYmlBZ0lDQWdJQ0FnYldGd1czTmxiR1ZqZEc5eVhTQTlJSEoxYkdWelcybHVaR1Y0WFM1emRIbHNaVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2JXRndXM05sYkdWamRHOXlYUzV6WlhSUWNtOXdaWEowZVNod2NtOXdaWEowZVN3Z2RtRnNkV1VwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVmVHRjYmx4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUnBaWE1vYzNSNWJHVnphR1ZsZEM1d2NtOTBiM1I1Y0dVc0lIdGNiaUFnWlc1aFlteGxaRG9nZTF4dUlDQWdJR2RsZERvZ1puVnVZM1JwYjI0Z1oyVjBLQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJQ0YwYUdsekxuTm9aV1YwTG1ScGMyRmliR1ZrTzF4dUlDQWdJSDBzWEc0Z0lDQWdjMlYwT2lCbWRXNWpkR2x2YmlCelpYUW9kbUZzZFdVcElIdGNiaUFnSUNBZ0lIUm9hWE11YzJobFpYUXVaR2x6WVdKc1pXUWdQU0FoZG1Gc2RXVTdYRzRnSUNBZ2ZWeHVJQ0I5TEZ4dUlDQXZMeUJVVDBSUE9pQmpiMjV6YVdSbGNpQnlaVzF2ZG1sdVp5QmpjM05VWlhoMElDc2dZM056SUhCeWIzQmxjblJwWlhNZ2MybHVZMlVnYVNCa2IyNG5kQ0IwYVc1cklIUm9aWGtuY21VZ2RHaGhkQ0IxYzJWbWRXeGNiaUFnWTNOelZHVjRkRG9nZTF4dUlDQWdJQzhxS2x4dUlDQWdJQ0FnS2lCQVpHVnpZeUJIWlhRZ2RHaGxJSE4wZVd4bGMyaGxaWFFnZEdWNGRGeHVJQ0FnSUNBZ0tpQkFjbVYwZFhKdUlIdFRkSEpwYm1kOUlHTnpjeUIwWlhoMFhHNGdJQ0FnS2k5Y2JpQWdJQ0JuWlhRNklHWjFibU4wYVc5dUlHZGxkQ2dwSUh0Y2JpQWdJQ0FnSUhaaGNpQnRZWEFnUFNCMGFHbHpMbTFoY0R0Y2JpQWdJQ0FnSUhaaGNpQnlaWFFnUFNCYlhUdGNiaUFnSUNBZ0lHWnZjaUFvZG1GeUlITmxiR1ZqZEc5eUlHbHVJRzFoY0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFF1Y0hWemFDaHpaV3hsWTNSdmNpNXlaWEJzWVdObEtDOHNYRnhYTDJjc0lGd2lMRnhjYmx3aUtTQXJJRndpSUh0Y1hHNWNYSFJjSWlBcklHMWhjRnR6Wld4bFkzUnZjbDB1WTNOelZHVjRkQzV5WlhCc1lXTmxLQzg3WEZ4WEwyY3NJRndpTzF4Y2JseGNkRndpS1NBcklGd2lYRnh1ZlZ3aUtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lISmxkSFZ5YmlCeVpYUXVhbTlwYmloY0lseGNibHdpS1R0Y2JpQWdJQ0I5WEc0Z0lIMHNYRzRnSUdOemN6b2dlMXh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRUJrWlhOaklFZGxkQ0JoYmlCdlltcGxZM1FnY21Wd2NtVnpaVzUwYVc1bklIUm9aU0JqZFhKeVpXNTBJR056Y3lCemRIbHNaWE5jYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHRQWW1wbFkzUjlJR056Y3lCdlltcGxZM1JjYmlBZ0lDQXFMMXh1SUNBZ0lHZGxkRG9nWm5WdVkzUnBiMjRnWjJWMEtDa2dlMXh1SUNBZ0lDQWdkbUZ5SUcxaGNDQTlJSFJvYVhNdWJXRndPMXh1SUNBZ0lDQWdkbUZ5SUhKbGRDQTlJSHQ5TzF4dUlDQWdJQ0FnWm05eUlDaDJZWElnYzJWc1pXTjBiM0lnYVc0Z2JXRndLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQnlkV3hsVTJWMElEMGdiV0Z3VzNObGJHVmpkRzl5WFR0Y2JpQWdJQ0FnSUNBZ2NtVjBXM05sYkdWamRHOXlYU0E5SUh0OU8xeHVJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJSEoxYkdWVFpYUXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjJZWElnY0hKdmNHVnlkSGtnUFNCeWRXeGxVMlYwVzJsZE8xeHVJQ0FnSUNBZ0lDQWdJSEpsZEZ0elpXeGxZM1J2Y2wxYmNISnZjR1Z5ZEhsZElEMGdjblZzWlZObGRDNW5aWFJRY205d1pYSjBlVlpoYkhWbEtIQnliM0JsY25SNUtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdjbVYwZFhKdUlISmxkRHRjYmlBZ0lDQjlYRzRnSUgxY2JuMHBPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhOMGVXeGxjMmhsWlhRN1hHNWNiaThxS2lvdklIMHBMRnh1THlvZ01pQXFMMXh1THlvcUtpOGdLR1oxYm1OMGFXOXVLRzF2WkhWc1pTd2daWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWtnZTF4dVhHNWNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVYRzR2THlCamMzTWdZMnhoYzNNZ2NISmxabWw0SUdadmNpQjBhR2x6SUdWc1pXMWxiblJjYm5aaGNpQkRURUZUVTE5UVVrVkdTVmdnUFNCY0ltbHliMTlmYldGeWEyVnlYQ0k3WEc1Y2JpOHFLbHh1SUNvZ1FHTnZibk4wY25WamRHOXlJRzFoY210bGNpQlZTVnh1SUNvZ1FIQmhjbUZ0SUh0emRtZFNiMjkwZlNCemRtY2dMU0J6ZG1kU2IyOTBJRzlpYW1WamRGeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzl3ZEhNZ0xTQnZjSFJwYjI1elhHNHFMMXh1ZG1GeUlHMWhjbXRsY2lBOUlHWjFibU4wYVc5dUlHMWhjbXRsY2loemRtY3NJRzl3ZEhNcElIdGNiaUFnZG1GeUlHSmhjMlZIY205MWNDQTlJSE4yWnk1bktIdGNiaUFnSUNCamJHRnpjem9nUTB4QlUxTmZVRkpGUmtsWVhHNGdJSDBwTzF4dUlDQmlZWE5sUjNKdmRYQXVZMmx5WTJ4bEtEQXNJREFzSUc5d2RITXVjaXdnZTF4dUlDQWdJR05zWVhOek9pQkRURUZUVTE5UVVrVkdTVmdnS3lCY0lsOWZiM1YwWlhKY0lpeGNiaUFnSUNCbWFXeHNPaUJjSW01dmJtVmNJaXhjYmlBZ0lDQnpkSEp2YTJWWGFXUjBhRG9nTlN4Y2JpQWdJQ0J6ZEhKdmEyVTZJRndpSXpBd01Gd2lYRzRnSUgwcE8xeHVJQ0JpWVhObFIzSnZkWEF1WTJseVkyeGxLREFzSURBc0lHOXdkSE11Y2l3Z2UxeHVJQ0FnSUdOc1lYTnpPaUJEVEVGVFUxOVFVa1ZHU1ZnZ0t5QmNJbDlmYVc1dVpYSmNJaXhjYmlBZ0lDQm1hV3hzT2lCY0ltNXZibVZjSWl4Y2JpQWdJQ0J6ZEhKdmEyVlhhV1IwYURvZ01peGNiaUFnSUNCemRISnZhMlU2SUZ3aUkyWm1abHdpWEc0Z0lIMHBPMXh1SUNCMGFHbHpMbWNnUFNCaVlYTmxSM0p2ZFhBN1hHNTlPMXh1WEc1dFlYSnJaWEl1Y0hKdmRHOTBlWEJsSUQwZ2UxeHVJQ0JqYjI1emRISjFZM1J2Y2pvZ2JXRnlhMlZ5TEZ4dVhHNGdJQzhxS2x4dUlDQWdJQ29nUUdSbGMyTWdiVzkyWlNCdFlYSnJaWElnZEc4Z1kyVnVkR1Z5Y0c5cGJuUWdLSGdzSUhrcElHRnVaQ0J5WldSeVlYZGNiaUFnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCNElDMGdjRzlwYm5RZ2VDQmpiMjl5WkdsdVlYUmxYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2VTQXRJSEJ2YVc1MElIa2dZMjl2Y21ScGJtRjBaVnh1SUNBcUwxeHVJQ0J0YjNabE9pQm1kVzVqZEdsdmJpQnRiM1psS0hnc0lIa3BJSHRjYmlBZ0lDQjBhR2x6TG1jdWMyVjBWSEpoYm5ObWIzSnRLRndpZEhKaGJuTnNZWFJsWENJc0lGdDRMQ0I1WFNrN1hHNGdJSDFjYm4wN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdiV0Z5YTJWeU8xeHVYRzR2S2lvcUx5QjlLU3hjYmk4cUlETWdLaTljYmk4cUtpb3ZJQ2htZFc1amRHbHZiaWh0YjJSMWJHVXNJR1Y0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwSUh0Y2JseHVYQ0oxYzJVZ2MzUnlhV04wWENJN1hHNWNibHh1ZG1GeUlGOTNhR1ZsYkNBOUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9OeWs3WEc1Y2JuWmhjaUJmZDJobFpXd3lJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZkMmhsWld3cE8xeHVYRzUyWVhJZ1gzTnNhV1JsY2lBOUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9OU2s3WEc1Y2JuWmhjaUJmYzJ4cFpHVnlNaUE5SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9YM05zYVdSbGNpazdYRzVjYm5aaGNpQmZjM1puSUQwZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5ZzJLVHRjYmx4dWRtRnlJRjl6ZG1jeUlEMGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENoZmMzWm5LVHRjYmx4dWRtRnlJRjlqYjJ4dmNpQTlJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTUNrN1hHNWNiblpoY2lCZlkyOXNiM0l5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmWTI5c2IzSXBPMXh1WEc1MllYSWdYM04wZVd4bGMyaGxaWFFnUFNCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktERXBPMXh1WEc1MllYSWdYM04wZVd4bGMyaGxaWFF5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmYzNSNWJHVnphR1ZsZENrN1hHNWNibVoxYm1OMGFXOXVJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdiMkpxTGw5ZlpYTk5iMlIxYkdVZ1B5QnZZbW9nT2lCN0lHUmxabUYxYkhRNklHOWlhaUI5T3lCOVhHNWNiblpoY2lCRlZrVk9WRjlOVDFWVFJVUlBWMDRnUFNCY0ltMXZkWE5sWkc5M2Jsd2lMRnh1SUNBZ0lFVldSVTVVWDAxUFZWTkZUVTlXUlNBOUlGd2liVzkxYzJWdGIzWmxYQ0lzWEc0Z0lDQWdSVlpGVGxSZlRVOVZVMFZWVUNBOUlGd2liVzkxYzJWMWNGd2lMRnh1SUNBZ0lFVldSVTVVWDFSUFZVTklVMVJCVWxRZ1BTQmNJblJ2ZFdOb2MzUmhjblJjSWl4Y2JpQWdJQ0JGVmtWT1ZGOVVUMVZEU0UxUFZrVWdQU0JjSW5SdmRXTm9iVzkyWlZ3aUxGeHVJQ0FnSUVWV1JVNVVYMVJQVlVOSVJVNUVJRDBnWENKMGIzVmphR1Z1WkZ3aUxGeHVJQ0FnSUVWV1JVNVVYMUpGUVVSWlUxUkJWRVZmUTBoQlRrZEZJRDBnWENKeVpXRmtlWE4wWVhSbFkyaGhibWRsWENJc1hHNGdJQ0FnVWtWQlJGbFRWRUZVUlY5RFQwMVFURVZVUlNBOUlGd2lZMjl0Y0d4bGRHVmNJanRjYmx4dUx5b3FYRzRnSUNvZ1FHUmxjMk1nYkdsemRHVnVJSFJ2SUc5dVpTQnZjaUJ0YjNKbElHVjJaVzUwY3lCdmJpQmhiaUJsYkdWdFpXNTBYRzRnSUNvZ1FIQmhjbUZ0SUh0RmJHVnRaVzUwZlNCbGJDQjBZWEpuWlhRZ1pXeGxiV1Z1ZEZ4dUlDQXFJRUJ3WVhKaGJTQjdRWEp5WVhsOUlHVjJaVzUwVEdsemRDQjBhR1VnWlhabGJuUnpJSFJ2SUd4cGMzUmxiaUIwYjF4dUlDQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJR05oYkd4aVlXTnJJSFJvWlNCbGRtVnVkQ0JqWVd4c1ltRmpheUJtZFc1amRHbHZibHh1S2k5Y2JtWjFibU4wYVc5dUlHeHBjM1JsYmlobGJDd2daWFpsYm5STWFYTjBMQ0JqWVd4c1ltRmpheWtnZTF4dUlDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR1YyWlc1MFRHbHpkQzVzWlc1bmRHZzdJR2tyS3lrZ2UxeHVJQ0FnSUdWc0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1pYWmxiblJNYVhOMFcybGRMQ0JqWVd4c1ltRmpheWs3WEc0Z0lIMWNibjA3WEc1Y2JpOHFLbHh1SUNBcUlFQmtaWE5qSUhKbGJXOTJaU0JoYmlCbGRtVnVkQ0JzYVhOMFpXNWxjaUJ2YmlCaGJpQmxiR1Z0Wlc1MFhHNGdJQ29nUUhCaGNtRnRJSHRGYkdWdFpXNTBmU0JsYkNCMFlYSm5aWFFnWld4bGJXVnVkRnh1SUNBcUlFQndZWEpoYlNCN1FYSnlZWGw5SUdWMlpXNTBUR2x6ZENCMGFHVWdaWFpsYm5SeklIUnZJSEpsYlc5MlpWeHVJQ0FxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdOaGJHeGlZV05ySUhSb1pTQmxkbVZ1ZENCallXeHNZbUZqYXlCbWRXNWpkR2x2Ymx4dUtpOWNibVoxYm1OMGFXOXVJSFZ1YkdsemRHVnVLR1ZzTENCbGRtVnVkRXhwYzNRc0lHTmhiR3hpWVdOcktTQjdYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z1pYWmxiblJNYVhOMExteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdaV3d1Y21WdGIzWmxSWFpsYm5STWFYTjBaVzVsY2lobGRtVnVkRXhwYzNSYmFWMHNJR05oYkd4aVlXTnJLVHRjYmlBZ2ZWeHVmVHRjYmx4dUx5b3FYRzRnSUNvZ1FHUmxjMk1nWTJGc2JDQm1iaUJqWVd4c1ltRmpheUIzYUdWdUlIUm9aU0J3WVdkbElHUnZZM1Z0Wlc1MElHbHpJSEpsWVdSNVhHNGdJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWTJGc2JHSmhZMnNnWTJGc2JHSmhZMnNnWm5WdVkzUnBiMjRnZEc4Z1ltVWdZMkZzYkdWa1hHNHFMMXh1Wm5WdVkzUnBiMjRnZDJobGJsSmxZV1I1S0dOaGJHeGlZV05yS1NCN1hHNGdJSFpoY2lCZmRHaHBjeUE5SUhSb2FYTTdYRzRnSUdsbUlDaGtiMk4xYldWdWRDNXlaV0ZrZVZOMFlYUmxJRDA5SUZKRlFVUlpVMVJCVkVWZlEwOU5VRXhGVkVVcElIdGNiaUFnSUNCallXeHNZbUZqYXlncE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHeHBjM1JsYmloa2IyTjFiV1Z1ZEN3Z1cwVldSVTVVWDFKRlFVUlpVMVJCVkVWZlEwaEJUa2RGWFN3Z1puVnVZM1JwYjI0Z2MzUmhkR1ZEYUdGdVoyVW9aU2tnZTF4dUlDQWdJQ0FnYVdZZ0tHUnZZM1Z0Wlc1MExuSmxZV1I1VTNSaGRHVWdQVDBnVWtWQlJGbFRWRUZVUlY5RFQwMVFURVZVUlNrZ2UxeHVJQ0FnSUNBZ0lDQmpZV3hzWW1GamF5Z3BPMXh1SUNBZ0lDQWdJQ0IxYm14cGMzUmxiaWhrYjJOMWJXVnVkQ3dnVzBWV1JVNVVYMUpGUVVSWlUxUkJWRVZmUTBoQlRrZEZYU3dnYzNSaGRHVkRhR0Z1WjJVcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwcE8xeHVJQ0I5WEc1OU8xeHVYRzR2S2lwY2JpQWdLaUJBWTI5dWMzUnlkV04wYjNJZ1kyOXNiM0lnZDJobFpXd2diMkpxWldOMFhHNGdJQ29nUUhCaGNtRnRJSHRGYkdWdFpXNTBJSHdnVTNSeWFXNW5mU0JsYkNBdElHRWdSRTlOSUdWc1pXMWxiblFnYjNJZ2RHaGxJRU5UVXlCelpXeGxZM1J2Y2lCbWIzSWdZU0JFVDAwZ1pXeGxiV1Z1ZENCMGJ5QjFjMlVnWVhNZ1lTQmpiMjUwWVdsdVpYSWdabTl5SUhSb1pTQlZTVnh1SUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCdmNIUnpJQzBnYjNCMGFXOXVjeUJtYjNJZ2RHaHBjeUJwYm5OMFlXNWpaVnh1S2k5Y2JuWmhjaUJqYjJ4dmNsQnBZMnRsY2lBOUlHWjFibU4wYVc5dUlHTnZiRzl5VUdsamEyVnlLR1ZzTENCdmNIUnpLU0I3WEc0Z0lIWmhjaUJmZEdocGN6SWdQU0IwYUdsek8xeHVYRzRnSUc5d2RITWdQU0J2Y0hSeklIeDhJSHQ5TzF4dUlDQXZMeUJsZG1WdWRDQnpkRzl5WVdkbElHWnZjaUJnYjI1Z0lHRnVaQ0JnYjJabVlGeHVJQ0IwYUdsekxsOWxkbVZ1ZEhNZ1BTQjdmVHRjYmlBZ2RHaHBjeTVmYlc5MWMyVlVZWEpuWlhRZ1BTQm1ZV3h6WlR0Y2JpQWdkR2hwY3k1ZlkyOXNiM0pEYUdGdVoyVkJZM1JwZG1VZ1BTQm1ZV3h6WlR0Y2JpQWdkR2hwY3k1amMzTWdQU0J2Y0hSekxtTnpjeUI4ZkNCdmNIUnpMbk4wZVd4bGN5QjhmQ0IxYm1SbFptbHVaV1E3WEc0Z0lDOHZJRmRoYVhRZ1ptOXlJSFJvWlNCa2IyTjFiV1Z1ZENCMGJ5QmlaU0J5WldGa2VTd2dkR2hsYmlCcGJtbDBJSFJvWlNCVlNWeHVJQ0IzYUdWdVVtVmhaSGtvWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUY5MGFHbHpNaTVmYVc1cGRDaGxiQ3dnYjNCMGN5azdYRzRnSUgwcE8xeHVmVHRjYmx4dVkyOXNiM0pRYVdOclpYSXVjSEp2ZEc5MGVYQmxJRDBnZTF4dUlDQmpiMjV6ZEhKMVkzUnZjam9nWTI5c2IzSlFhV05yWlhJc1hHNWNiaUFnTHlvcVhHNGdJQ0FnS2lCQVpHVnpZeUJwYm1sMElIUm9aU0JqYjJ4dmNpQndhV05yWlhJZ1ZVbGNiaUFnSUNBcUlFQndZWEpoYlNCN1JXeGxiV1Z1ZENCOElGTjBjbWx1WjMwZ1pXd2dMU0JoSUVSUFRTQmxiR1Z0Wlc1MElHOXlJSFJvWlNCRFUxTWdjMlZzWldOMGIzSWdabTl5SUdFZ1JFOU5JR1ZzWlcxbGJuUWdkRzhnZFhObElHRnpJR0VnWTI5dWRHRnBibVZ5SUdadmNpQjBhR1VnVlVsY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J2Y0hSeklDMGdiM0IwYVc5dWN5Qm1iM0lnZEdocGN5QnBibk4wWVc1alpWeHVJQ0FnSUNvZ1FHRmpZMlZ6Y3lCd2NtOTBaV04wWldSY2JpQWdLaTljYmlBZ1gybHVhWFE2SUdaMWJtTjBhVzl1SUY5cGJtbDBLR1ZzTENCdmNIUnpLU0I3WEc0Z0lDQWdkbUZ5SUY5MGFHbHpNeUE5SUhSb2FYTTdYRzVjYmlBZ0lDQXZMeUJKWmlCZ1pXeGdJR2x6SUdFZ2MzUnlhVzVuTENCMWMyVWdhWFFnZEc4Z2MyVnNaV04wSUdGdUlFVnNaVzFsYm5Rc0lHVnNjMlVnWVhOemRXMWxJR2wwSjNNZ1lXNGdaV3hsYldWdWRGeHVJQ0FnSUdWc0lEMGdYQ0p6ZEhKcGJtZGNJaUE5UFNCMGVYQmxiMllnWld3Z1B5QmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0dWc0tTQTZJR1ZzTzF4dUlDQWdJQzh2SUVacGJtUWdkR2hsSUhkcFpIUm9JR0Z1WkNCb1pXbG5hSFFnWm05eUlIUm9aU0JWU1Z4dUlDQWdJQzh2SUVsbUlHNXZkQ0JrWldacGJtVmtJR2x1SUhSb1pTQnZjSFJwYjI1ekxDQjBjbmtnZEdobElFaFVUVXdnZDJsa2RHZ2dLeUJvWldsbmFIUWdZWFIwY21saWRYUmxjeUJ2WmlCMGFHVWdkM0poY0hCbGNpd2daV3h6WlNCa1pXWmhkV3gwSUhSdklETXlNRnh1SUNBZ0lIWmhjaUIzYVdSMGFDQTlJRzl3ZEhNdWQybGtkR2dnZkh3Z2NHRnljMlZKYm5Rb1pXd3VkMmxrZEdncElIeDhJRE15TUR0Y2JpQWdJQ0IyWVhJZ2FHVnBaMmgwSUQwZ2IzQjBjeTVvWldsbmFIUWdmSHdnY0dGeWMyVkpiblFvWld3dWFHVnBaMmgwS1NCOGZDQXpNakE3WEc0Z0lDQWdMeThnUTJGc1kzVnNZWFJsSUd4aGVXOTFkQ0IyWVhKcFlXSnNaWE5jYmlBZ0lDQjJZWElnY0dGa1pHbHVaeUE5SUc5d2RITXVjR0ZrWkdsdVp5QXJJRElnZkh3Z05peGNiaUFnSUNBZ0lDQWdZbTl5WkdWeVYybGtkR2dnUFNCdmNIUnpMbUp2Y21SbGNsZHBaSFJvSUh4OElEQXNYRzRnSUNBZ0lDQWdJRzFoY210bGNsSmhaR2wxY3lBOUlHOXdkSE11YldGeWEyVnlVbUZrYVhWeklIeDhJRGdzWEc0Z0lDQWdJQ0FnSUhOc2FXUmxjazFoY21kcGJpQTlJRzl3ZEhNdWMyeHBaR1Z5VFdGeVoybHVJSHg4SURJMExGeHVJQ0FnSUNBZ0lDQnpiR2xrWlhKSVpXbG5hSFFnUFNCdmNIUnpMbk5zYVdSbGNraGxhV2RvZENCOGZDQnRZWEpyWlhKU1lXUnBkWE1nS2lBeUlDc2djR0ZrWkdsdVp5QXFJRElnS3lCaWIzSmtaWEpYYVdSMGFDQXFJRElzWEc0Z0lDQWdJQ0FnSUdKdlpIbFhhV1IwYUNBOUlFMWhkR2d1YldsdUtHaGxhV2RvZENBdElITnNhV1JsY2tobGFXZG9kQ0F0SUhOc2FXUmxjazFoY21kcGJpd2dkMmxrZEdncExGeHVJQ0FnSUNBZ0lDQjNhR1ZsYkZKaFpHbDFjeUE5SUdKdlpIbFhhV1IwYUNBdklESWdMU0JpYjNKa1pYSlhhV1IwYUN4Y2JpQWdJQ0FnSUNBZ2JHVm1kRTFoY21kcGJpQTlJQ2gzYVdSMGFDQXRJR0p2WkhsWGFXUjBhQ2tnTHlBeU8xeHVJQ0FnSUhaaGNpQnRZWEpyWlhJZ1BTQjdYRzRnSUNBZ0lDQnlPaUJ0WVhKclpYSlNZV1JwZFhOY2JpQWdJQ0I5TzF4dUlDQWdJSFpoY2lCaWIzSmtaWEpUZEhsc1pYTWdQU0I3WEc0Z0lDQWdJQ0IzT2lCaWIzSmtaWEpYYVdSMGFDeGNiaUFnSUNBZ0lHTnZiRzl5T2lCdmNIUnpMbUp2Y21SbGNrTnZiRzl5SUh4OElGd2lJMlptWmx3aVhHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4dklFTnlaV0YwWlNCVlNTQmxiR1Z0Wlc1MGMxeHVJQ0FnSUhSb2FYTXVaV3dnUFNCbGJEdGNiaUFnSUNCMGFHbHpMbk4yWnlBOUlHNWxkeUJmYzNabk1pNWtaV1poZFd4MEtHVnNMQ0IzYVdSMGFDd2dhR1ZwWjJoMEtUdGNiaUFnSUNCMGFHbHpMblZwSUQwZ1cyNWxkeUJmZDJobFpXd3lMbVJsWm1GMWJIUW9kR2hwY3k1emRtY3NJSHRjYmlBZ0lDQWdJR05ZT2lCc1pXWjBUV0Z5WjJsdUlDc2dZbTlrZVZkcFpIUm9JQzhnTWl4Y2JpQWdJQ0FnSUdOWk9pQmliMlI1VjJsa2RHZ2dMeUF5TEZ4dUlDQWdJQ0FnY2pvZ2QyaGxaV3hTWVdScGRYTXNYRzRnSUNBZ0lDQnlUV0Y0T2lCM2FHVmxiRkpoWkdsMWN5QXRJQ2h0WVhKclpYSlNZV1JwZFhNZ0t5QndZV1JrYVc1bktTeGNiaUFnSUNBZ0lHMWhjbXRsY2pvZ2JXRnlhMlZ5TEZ4dUlDQWdJQ0FnWW05eVpHVnlPaUJpYjNKa1pYSlRkSGxzWlhNc1hHNGdJQ0FnSUNCc2FXZG9kRzVsYzNNNklHOXdkSE11ZDJobFpXeE1hV2RvZEc1bGMzTWdQVDBnZFc1a1pXWnBibVZrSUQ4Z2RISjFaU0E2SUc5d2RITXVkMmhsWld4TWFXZG9kRzVsYzNNc1hHNGdJQ0FnSUNCaGJuUnBZMnh2WTJ0M2FYTmxPaUJ2Y0hSekxtRnVkR2xqYkc5amEzZHBjMlZjYmlBZ0lDQjlLU3dnYm1WM0lGOXpiR2xrWlhJeUxtUmxabUYxYkhRb2RHaHBjeTV6ZG1jc0lIdGNiaUFnSUNBZ0lITnNhV1JsY2xSNWNHVTZJRndpZGx3aUxGeHVJQ0FnSUNBZ2VEb2diR1ZtZEUxaGNtZHBiaUFySUdKdmNtUmxjbGRwWkhSb0xGeHVJQ0FnSUNBZ2VUb2dZbTlrZVZkcFpIUm9JQ3NnYzJ4cFpHVnlUV0Z5WjJsdUxGeHVJQ0FnSUNBZ2R6b2dZbTlrZVZkcFpIUm9JQzBnWW05eVpHVnlWMmxrZEdnZ0tpQXlMRnh1SUNBZ0lDQWdhRG9nYzJ4cFpHVnlTR1ZwWjJoMElDMGdZbTl5WkdWeVYybGtkR2dnS2lBeUxGeHVJQ0FnSUNBZ2Nqb2djMnhwWkdWeVNHVnBaMmgwSUM4Z01pQXRJR0p2Y21SbGNsZHBaSFJvTEZ4dUlDQWdJQ0FnYldGeWEyVnlPaUJ0WVhKclpYSXNYRzRnSUNBZ0lDQmliM0prWlhJNklHSnZjbVJsY2xOMGVXeGxjMXh1SUNBZ0lIMHBYVHRjYmlBZ0lDQXZMeUJEY21WaGRHVWdZVzRnYVhKdlUzUjViR1ZUYUdWbGRDQm1iM0lnZEdocGN5QmpiMnh2Y2xkb1pXVnNKM01nUTFOVElHOTJaWEp5YVdSbGMxeHVJQ0FnSUhSb2FYTXVjM1I1YkdWemFHVmxkQ0E5SUc1bGR5QmZjM1I1YkdWemFHVmxkREl1WkdWbVlYVnNkQ2dwTzF4dUlDQWdJQzh2SUVOeVpXRjBaU0JoYmlCcGNtOURiMnh2Y2lCMGJ5QnpkRzl5WlNCMGFHbHpJR052Ykc5eVYyaGxaV3duY3lCelpXeGxZM1JsWkNCamIyeHZjbHh1SUNBZ0lIUm9hWE11WTI5c2IzSWdQU0J1WlhjZ1gyTnZiRzl5TWk1a1pXWmhkV3gwS0NrN1hHNGdJQ0FnTHk4Z1YyaGxibVYyWlhJZ2RHaGxJSE5sYkdWamRHVmtJR052Ykc5eUlHTm9ZVzVuWlhNc0lIUnlhV2RuWlhJZ1lTQmpiMnh2Y2xkb1pXVnNJSFZ3WkdGMFpTQjBiMjljYmlBZ0lDQjBhR2x6TG1OdmJHOXlMbDl2YmtOb1lXNW5aU0E5SUhSb2FYTXVYM1Z3WkdGMFpTNWlhVzVrS0hSb2FYTXBPMXh1SUNBZ0lIUm9hWE11WTI5c2IzSXVjMlYwS0c5d2RITXVZMjlzYjNJZ2ZId2diM0IwY3k1a1pXWmhkV3gwVm1Gc2RXVWdmSHdnWENJalptWm1YQ0lwTzF4dUlDQWdJQzh2SUVoaFkydDVJSGR2Y210aGNtOTFibVFnWm05eUlHRWdZMjkxY0d4bElHOW1JRk5oWm1GeWFTQlRWa2NnZFhKc0lHSjFaM05jYmlBZ0lDQXZMeUJUWldVZ2FIUjBjSE02THk5bmFYUm9kV0l1WTI5dEwycGhZVzFsY3k5cGNtOHVhbk12YVhOemRXVnpMekU0WEc0Z0lDQWdMeThnVkU5RVR6b2djR1Z5YUdGd2N5QnRZV3RsSUhSb2FYTWdZU0J6WlhCbGNtRjBaU0J3YkhWbmFXNHNJR2wwSjNNZ2FHRmphM2tnWVc1a0lIUmhhMlZ6SUhWd0lHMXZjbVVnYzNCaFkyVWdkR2hoYmlCSkoyMGdhR0Z3Y0hrZ2QybDBhRnh1SUNBZ0lIUm9hWE11YjI0b1hDSm9hWE4wYjNKNU9uTjBZWFJsUTJoaGJtZGxYQ0lzSUdaMWJtTjBhVzl1SUNoaVlYTmxLU0I3WEc0Z0lDQWdJQ0JmZEdocGN6TXVjM1puTG5Wd1pHRjBaVlZ5YkhNb1ltRnpaU2s3WEc0Z0lDQWdmU2s3WEc0Z0lDQWdMeThnVEdsemRHVnVJSFJ2SUdWMlpXNTBjMXh1SUNBZ0lHeHBjM1JsYmloMGFHbHpMbk4yWnk1bGJDd2dXMFZXUlU1VVgwMVBWVk5GUkU5WFRpd2dSVlpGVGxSZlZFOVZRMGhUVkVGU1ZGMHNJSFJvYVhNcE8xeHVJQ0I5TEZ4dVhHNGdJQzhxS2x4dUlDQWdJQ29nUUdSbGMyTWdkWEJrWVhSbElIUm9aU0J6Wld4bFkzUmxaQ0JqYjJ4dmNseHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc1bGQxWmhiSFZsSUMwZ2RHaGxJRzVsZHlCSVUxWWdkbUZzZFdWelhHNGdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYjJ4a1ZtRnNkV1VnTFNCMGFHVWdiMnhrSUVoVFZpQjJZV3gxWlhOY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JqYUdGdVoyVnpJQzBnWW05dmJHVmhibk1nWm05eUlHVmhZMmdnU0ZOV0lHTm9ZVzV1Wld3NklIUnlkV1VnYVdZZ2RHaGxJRzVsZHlCMllXeDFaU0JwY3lCa2FXWm1aWEpsYm5RZ2RHOGdkR2hsSUc5c1pDQjJZV3gxWlN3Z1pXeHpaU0JtWVd4elpWeHVJQ0FnSUNvZ1FHRmpZMlZ6Y3lCd2NtOTBaV04wWldSY2JpQWdLaTljYmlBZ1gzVndaR0YwWlRvZ1puVnVZM1JwYjI0Z1gzVndaR0YwWlNoamIyeHZjaXdnWTJoaGJtZGxjeWtnZTF4dUlDQWdJSFpoY2lCeVoySWdQU0JqYjJ4dmNpNXlaMkpUZEhKcGJtYzdYRzRnSUNBZ2RtRnlJR056Y3lBOUlIUm9hWE11WTNOek8xeHVJQ0FnSUM4dklFeHZiM0FnZEdoeWIzVm5hQ0JsWVdOb0lGVkpJR1ZzWlcxbGJuUWdZVzVrSUhWd1pHRjBaU0JwZEZ4dUlDQWdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnZEdocGN5NTFhUzVzWlc1bmRHZzdJR2tyS3lrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTUxYVZ0cFhTNTFjR1JoZEdVb1kyOXNiM0lzSUdOb1lXNW5aWE1wTzF4dUlDQWdJSDFjYmlBZ0lDQXZMeUJWY0dSaGRHVWdkR2hsSUhOMGVXeGxjMmhsWlhRZ2RHOXZYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2MyVnNaV04wYjNJZ2FXNGdZM056S1NCN1hHNGdJQ0FnSUNCMllYSWdjSEp2Y0dWeWRHbGxjeUE5SUdOemMxdHpaV3hsWTNSdmNsMDdYRzRnSUNBZ0lDQm1iM0lnS0haaGNpQndjbTl3SUdsdUlIQnliM0JsY25ScFpYTXBJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXpkSGxzWlhOb1pXVjBMbk5sZEZKMWJHVW9jMlZzWldOMGIzSXNJSEJ5YjNBc0lISm5ZaWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNBZ0lDOHZJRkJ5WlhabGJuUWdhVzVtYVc1cGRHVWdiRzl2Y0hNZ2FXWWdkR2hsSUdOdmJHOXlJR2x6SUhObGRDQnBibk5wWkdVZ1lTQmdZMjlzYjNJNlkyaGhibWRsWUNCallXeHNZbUZqYTF4dUlDQWdJR2xtSUNnaGRHaHBjeTVmWTI5c2IzSkRhR0Z1WjJWQlkzUnBkbVVwSUh0Y2JpQWdJQ0FnSUM4dklGZG9hV3hsSUY5amIyeHZja05vWVc1blpVRmpkR2wyWlNBOUlIUnlkV1VzSUhSb2FYTWdaWFpsYm5RZ1kyRnVibTkwSUdKbElHWnBjbVZrWEc0Z0lDQWdJQ0IwYUdsekxsOWpiMnh2Y2tOb1lXNW5aVUZqZEdsMlpTQTlJSFJ5ZFdVN1hHNGdJQ0FnSUNCMGFHbHpMbVZ0YVhRb1hDSmpiMnh2Y2pwamFHRnVaMlZjSWl3Z1kyOXNiM0lzSUdOb1lXNW5aWE1wTzF4dUlDQWdJQ0FnZEdocGN5NWZZMjlzYjNKRGFHRnVaMlZCWTNScGRtVWdQU0JtWVd4elpUdGNiaUFnSUNCOVhHNGdJSDBzWEc1Y2JpQWdMeW9xWEc0Z0lDb2dRR1JsYzJNZ1UyVjBJR0VnWTJGc2JHSmhZMnNnWm5WdVkzUnBiMjRnWm05eUlHRnVJR1YyWlc1MFhHNGdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJR1YyWlc1MFZIbHdaU0JVYUdVZ2JtRnRaU0J2WmlCMGFHVWdaWFpsYm5RZ2RHOGdiR2x6ZEdWdUlIUnZMQ0J3WVhOeklGd2lLbHdpSUhSdklHeHBjM1JsYmlCMGJ5QmhiR3dnWlhabGJuUnpYRzRnSUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1kyRnNiR0poWTJzZ1ZHaGxJSGRoZEdOb0lHTmhiR3hpWVdOclhHNGdJQ292WEc0Z0lHOXVPaUJtZFc1amRHbHZiaUJ2YmlobGRtVnVkRlI1Y0dVc0lHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ2RtRnlJR1YyWlc1MGN5QTlJSFJvYVhNdVgyVjJaVzUwY3p0Y2JpQWdJQ0FvWlhabGJuUnpXMlYyWlc1MFZIbHdaVjBnZkh3Z0tHVjJaVzUwYzF0bGRtVnVkRlI1Y0dWZElEMGdXMTBwS1M1d2RYTm9LR05oYkd4aVlXTnJLVHRjYmlBZ2ZTeGNibHh1SUNBdktpcGNiaUFnSUNBcUlFQmtaWE5qSUZKbGJXOTJaU0JoSUdOaGJHeGlZV05ySUdaMWJtTjBhVzl1SUdadmNpQmhiaUJsZG1WdWRDQmhaR1JsWkNCM2FYUm9JRzl1S0NsY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VTNSeWFXNW5mU0JsZG1WdWRGUjVjR1VnVkdobElHNWhiV1VnYjJZZ2RHaGxJR1YyWlc1MFhHNGdJQ0FnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCallXeHNZbUZqYXlCVWFHVWdkMkYwWTJnZ1kyRnNiR0poWTJzZ2RHOGdjbVZ0YjNabElHWnliMjBnZEdobElHVjJaVzUwWEc0Z0lDb3ZYRzRnSUc5bVpqb2dablZ1WTNScGIyNGdiMlptS0dWMlpXNTBWSGx3WlN3Z1kyRnNiR0poWTJzcElIdGNiaUFnSUNCMllYSWdaWFpsYm5STWFYTjBJRDBnZEdocGN5NWZaWFpsYm5SelcyVjJaVzUwVkhsd1pWMDdYRzRnSUNBZ2FXWWdLR1YyWlc1MFRHbHpkQ2tnWlhabGJreHBjM1F1YzNCc2FXTmxLR1YyWlc1MFRHbHpkQzVwYm1SbGVFOW1LR05oYkd4aVlXTnJLU3dnTVNrN1hHNGdJSDBzWEc1Y2JpQWdMeW9xWEc0Z0lDQWdLaUJBWkdWell5QkZiV2wwSUdGdUlHVjJaVzUwWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdaWFpsYm5SVWVYQmxJRlJvWlNCdVlXMWxJRzltSUhSb1pTQmxkbVZ1ZENCMGJ5QmxiV2wwWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMEZ5Y21GNWZTQmhjbWR6SUdGeWNtRjVJRzltSUdGeVozTWdkRzhnY0dGemN5QjBieUJqWVd4c1ltRmphM05jYmlBZ0tpOWNiaUFnWlcxcGREb2dablZ1WTNScGIyNGdaVzFwZENobGRtVnVkRlI1Y0dVcElIdGNiaUFnSUNCMllYSWdaWFpsYm5SeklEMGdkR2hwY3k1ZlpYWmxiblJ6TEZ4dUlDQWdJQ0FnSUNCallXeHNZbUZqYTB4cGMzUWdQU0FvWlhabGJuUnpXMlYyWlc1MFZIbHdaVjBnZkh3Z1cxMHBMbU52Ym1OaGRDaGxkbVZ1ZEhOYlhDSXFYQ0pkSUh4OElGdGRLVHRjYmx4dUlDQWdJR1p2Y2lBb2RtRnlJRjlzWlc0Z1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb0xDQmhjbWR6SUQwZ1FYSnlZWGtvWDJ4bGJpQStJREVnUHlCZmJHVnVJQzBnTVNBNklEQXBMQ0JmYTJWNUlEMGdNVHNnWDJ0bGVTQThJRjlzWlc0N0lGOXJaWGtyS3lrZ2UxeHVJQ0FnSUNBZ1lYSm5jMXRmYTJWNUlDMGdNVjBnUFNCaGNtZDFiV1Z1ZEhOYlgydGxlVjA3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JqWVd4c1ltRmphMHhwYzNRdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJR05oYkd4aVlXTnJUR2x6ZEZ0cFhTNWhjSEJzZVNodWRXeHNMQ0JoY21kektUdGNiaUFnSUNCOVhHNGdJSDBzWEc1Y2JpQWdMeW9xWEc0Z0lDQWdLaUJBWkdWell5QkVUMDBnWlhabGJuUWdhR0Z1Wkd4bGNseHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0RmRtVnVkSDBnWlNCRVQwMGdaWFpsYm5RZ0tHTjFjbkpsYm5Sc2VTQmxhWFJvWlhJZ2JXOTFjMlVnYjNJZ2RHOTFZMmdnWlhabGJuUnpLVnh1SUNBcUwxeHVJQ0JvWVc1a2JHVkZkbVZ1ZERvZ1puVnVZM1JwYjI0Z2FHRnVaR3hsUlhabGJuUW9aU2tnZTF4dUlDQWdJQzh2SUVSbGRHVmpkQ0JwWmlCMGFHVWdaWFpsYm5RZ2FYTWdZU0IwYjNWamFDQmxkbVZ1ZENCaWVTQmphR1ZqYTJsdVp5QnBaaUJwZENCb1lYTWdkR2hsSUdCMGIzVmphR1Z6WUNCd2NtOXdaWEowZVZ4dUlDQWdJQzh2SUVsbUlHbDBJR2x6SUdFZ2RHOTFZMmdnWlhabGJuUXNJSFZ6WlNCMGFHVWdabWx5YzNRZ2RHOTFZMmdnYVc1d2RYUmNiaUFnSUNCMllYSWdjRzlwYm5RZ1BTQmxMblJ2ZFdOb1pYTWdQeUJsTG1Ob1lXNW5aV1JVYjNWamFHVnpXekJkSURvZ1pTeGNibHh1SUNBZ0lDOHZJRWRsZENCMGFHVWdjMk55WldWdUlIQnZjMmwwYVc5dUlHOW1JSFJvWlNCVlNWeHVJQ0FnSUhKbFkzUWdQU0IwYUdsekxuTjJaeTVsYkM1blpYUkNiM1Z1WkdsdVowTnNhV1Z1ZEZKbFkzUW9LU3hjYmx4dUlDQWdJQzh2SUVOdmJuWmxjblFnZEdobElITmpjbVZsYmkxemNHRmpaU0J3YjJsdWRHVnlJSEJ2YzJsMGFXOXVJSFJ2SUd4dlkyRnNMWE53WVdObFhHNGdJQ0FnZUNBOUlIQnZhVzUwTG1Oc2FXVnVkRmdnTFNCeVpXTjBMbXhsWm5Rc1hHNGdJQ0FnSUNBZ0lIa2dQU0J3YjJsdWRDNWpiR2xsYm5SWklDMGdjbVZqZEM1MGIzQTdYRzVjYmlBZ0lDQnpkMmwwWTJnZ0tHVXVkSGx3WlNrZ2UxeHVJQ0FnSUNBZ1kyRnpaU0JGVmtWT1ZGOU5UMVZUUlVSUFYwNDZYRzRnSUNBZ0lDQmpZWE5sSUVWV1JVNVVYMVJQVlVOSVUxUkJVbFE2WEc0Z0lDQWdJQ0FnSUM4dklFeHZiM0FnZEdoeWIzVm5hQ0JsWVdOb0lGVkpJR1ZzWlcxbGJuUWdZVzVrSUdOb1pXTnJJR2xtSUhSb1pTQndiMmx1ZENCY0ltaHBkSE5jSWlCcGRGeHVJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJSFJvYVhNdWRXa3ViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjJZWElnZFdsRmJHVnRaVzUwSUQwZ2RHaHBjeTUxYVZ0cFhUdGNiaUFnSUNBZ0lDQWdJQ0F2THlCSlppQjBhR1VnWld4bGJXVnVkQ0JwY3lCb2FYUXNJSFJvYVhNZ2JXVmhibk1nZEdobElIVnpaWElnYUdGeklHTnNhV05yWldRZ2RHaGxJR1ZzWlcxbGJuUWdZVzVrSUdseklIUnllV2x1WnlCMGJ5QnBiblJsY21GamRDQjNhWFJvSUdsMFhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0hWcFJXeGxiV1Z1ZEM1amFHVmphMGhwZENoNExDQjVLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnVTJWMElHRnVJR2x1ZEdWeWJtRnNJSEpsWm1WeVpXNWpaU0IwYnlCMGFHVWdkV2xGYkdWdFpXNTBJR0psYVc1bklHbHVkR1Z5WVdOMFpXUWdkMmwwYUN3Z1ptOXlJRzkwYUdWeUlHbHVkR1Z5Ym1Gc0lHVjJaVzUwSUdoaGJtUnNaWEp6WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5dGIzVnpaVlJoY21kbGRDQTlJSFZwUld4bGJXVnVkRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJRUYwZEdGamFDQmxkbVZ1ZENCc2FYTjBaVzVsY25OY2JpQWdJQ0FnSUNBZ0lDQWdJR3hwYzNSbGJpaGtiMk4xYldWdWRDd2dXMFZXUlU1VVgwMVBWVk5GVFU5V1JTd2dSVlpGVGxSZlZFOVZRMGhOVDFaRkxDQkZWa1ZPVkY5TlQxVlRSVlZRTENCRlZrVk9WRjlVVDFWRFNFVk9SRjBzSUhSb2FYTXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdSVzFwZENCcGJuQjFkQ0J6ZEdGeWRDQmxkbVZ1ZEZ4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1bGJXbDBLRndpYVc1d2RYUTZjM1JoY25SY0lpazdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QkdhVzVoYkd4NUxDQjFjMlVnZEdobElIQnZjMmwwYVc5dUlIUnZJSFZ3WkdGMFpTQjBhR1VnY0dsamEyVmtJR052Ykc5eVhHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtTnZiRzl5TG1oemRpQTlJSFJvYVhNdVgyMXZkWE5sVkdGeVoyVjBMbWx1Y0hWMEtIZ3NJSGtwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JpY21WaGF6dGNiaUFnSUNBZ0lHTmhjMlVnUlZaRlRsUmZUVTlWVTBWTlQxWkZPbHh1SUNBZ0lDQWdZMkZ6WlNCRlZrVk9WRjlVVDFWRFNFMVBWa1U2WEc0Z0lDQWdJQ0FnSUM4dklGVnpaU0IwYUdVZ2NHOXphWFJwYjI0Z2RHOGdkWEJrWVhSbElIUm9aU0J3YVdOclpYSWdZMjlzYjNKY2JpQWdJQ0FnSUNBZ2RHaHBjeTVqYjJ4dmNpNW9jM1lnUFNCMGFHbHpMbDl0YjNWelpWUmhjbWRsZEM1cGJuQjFkQ2g0TENCNUtUdGNiaUFnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNCallYTmxJRVZXUlU1VVgwMVBWVk5GVlZBNlhHNGdJQ0FnSUNCallYTmxJRVZXUlU1VVgxUlBWVU5JUlU1RU9seHVJQ0FnSUNBZ0lDQjBhR2x6TGw5dGIzVnpaVlJoY21kbGRDQTlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1WdGFYUW9YQ0pwYm5CMWREcGxibVJjSWlrN1hHNGdJQ0FnSUNBZ0lIVnViR2x6ZEdWdUtHUnZZM1Z0Wlc1MExDQmJSVlpGVGxSZlRVOVZVMFZOVDFaRkxDQkZWa1ZPVkY5VVQxVkRTRTFQVmtVc0lFVldSVTVVWDAxUFZWTkZWVkFzSUVWV1JVNVVYMVJQVlVOSVJVNUVYU3dnZEdocGN5azdYRzRnSUNBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RHaHBjeTVmYlc5MWMyVlVZWEpuWlhRcElIdGNiaUFnSUNBZ0lHVXVjSEpsZG1WdWRFUmxabUYxYkhRb0tUdGNiaUFnSUNCOVhHNGdJSDFjYm4wN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdZMjlzYjNKUWFXTnJaWEk3WEc1Y2JpOHFLaW92SUgwcExGeHVMeW9nTkNBcUwxeHVMeW9xS2k4Z0tHWjFibU4wYVc5dUtHMXZaSFZzWlN3Z1pYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5a2dlMXh1WEc1Y0luVnpaU0J6ZEhKcFkzUmNJanRjYmx4dVhHNTJZWElnWDJOdmJHOXlVR2xqYTJWeUlEMGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWd6S1R0Y2JseHVkbUZ5SUY5amIyeHZjbEJwWTJ0bGNqSWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOWpiMnh2Y2xCcFkydGxjaWs3WEc1Y2JuWmhjaUJmWTI5c2IzSWdQU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0RBcE8xeHVYRzUyWVhJZ1gyTnZiRzl5TWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDJOdmJHOXlLVHRjYmx4dWRtRnlJRjl6ZEhsc1pYTm9aV1YwSUQwZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5Z3hLVHRjYmx4dWRtRnlJRjl6ZEhsc1pYTm9aV1YwTWlBOUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvWDNOMGVXeGxjMmhsWlhRcE8xeHVYRzVtZFc1amRHbHZiaUJmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtHOWlhaWtnZXlCeVpYUjFjbTRnYjJKcUlDWW1JRzlpYWk1ZlgyVnpUVzlrZFd4bElEOGdiMkpxSURvZ2V5QmtaV1poZFd4ME9pQnZZbW9nZlRzZ2ZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHRjYmlBZ1EyOXNiM0k2SUY5amIyeHZjakl1WkdWbVlYVnNkQ3hjYmlBZ1EyOXNiM0pRYVdOclpYSTZJRjlqYjJ4dmNsQnBZMnRsY2pJdVpHVm1ZWFZzZEN4Y2JpQWdVM1I1YkdWemFHVmxkRG9nWDNOMGVXeGxjMmhsWlhReUxtUmxabUYxYkhRc1hHNGdJSFpsY25OcGIyNDZJRndpTXk0eUxqQmNJbHh1ZlR0Y2JseHVMeW9xS2k4Z2ZTa3NYRzR2S2lBMUlDb3ZYRzR2S2lvcUx5QW9ablZ1WTNScGIyNG9iVzlrZFd4bExDQmxlSEJ2Y25SekxDQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLU0I3WEc1Y2Jsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVhHNWNiblpoY2lCZmJXRnlhMlZ5SUQwZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5Z3lLVHRjYmx4dWRtRnlJRjl0WVhKclpYSXlJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZiV0Z5YTJWeUtUdGNibHh1ZG1GeUlGOWpiMnh2Y2lBOUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9NQ2s3WEc1Y2JuWmhjaUJmWTI5c2IzSXlJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZZMjlzYjNJcE8xeHVYRzVtZFc1amRHbHZiaUJmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtHOWlhaWtnZXlCeVpYUjFjbTRnYjJKcUlDWW1JRzlpYWk1ZlgyVnpUVzlrZFd4bElEOGdiMkpxSURvZ2V5QmtaV1poZFd4ME9pQnZZbW9nZlRzZ2ZWeHVYRzR2THlCamMzTWdZMnhoYzNNZ2NISmxabWw0SUdadmNpQjBhR2x6SUdWc1pXMWxiblJjYm5aaGNpQkRURUZUVTE5UVVrVkdTVmdnUFNCY0ltbHliMTlmYzJ4cFpHVnlYQ0k3WEc1Y2JpOHFLbHh1SUNBcUlFQmpiMjV6ZEhKMVkzUnZjaUJ6Ykdsa1pYSWdWVWxjYmlBZ0tpQkFjR0Z5WVcwZ2UzTjJaMUp2YjNSOUlITjJaeUF0SUhOMloxSnZiM1FnYjJKcVpXTjBYRzRnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5d2RITWdMU0J2Y0hScGIyNXpYRzRxTDF4dWRtRnlJSE5zYVdSbGNpQTlJR1oxYm1OMGFXOXVJSE5zYVdSbGNpaHpkbWNzSUc5d2RITXBJSHRjYmlBZ2RtRnlJSElnUFNCdmNIUnpMbklzWEc0Z0lDQWdJQ0IzSUQwZ2IzQjBjeTUzTEZ4dUlDQWdJQ0FnYUNBOUlHOXdkSE11YUN4Y2JpQWdJQ0FnSUhnZ1BTQnZjSFJ6TG5nc1hHNGdJQ0FnSUNCNUlEMGdiM0IwY3k1NUxGeHVJQ0FnSUNBZ1ltOXlaR1Z5VjJsa2RHZ2dQU0J2Y0hSekxtSnZjbVJsY2k1M08xeHVYRzRnSUM4dklGd2ljbUZ1WjJWY0lpQnNhVzFwZEhNZ2FHOTNJR1poY2lCMGFHVWdjMnhwWkdWeUozTWdiV0Z5YTJWeUlHTmhiaUIwY21GMlpXd3NJR0Z1WkNCM2FHVnlaU0JwZENCemRHOXdjeUJoYm1RZ2MzUmhjblJ6SUdGc2IyNW5JSFJvWlNCWUlHRjRhWE5jYmlBZ2IzQjBjeTV5WVc1blpTQTlJSHRjYmlBZ0lDQnRhVzQ2SUhnZ0t5QnlMRnh1SUNBZ0lHMWhlRG9nZUNBcklIY2dMU0J5TEZ4dUlDQWdJSGM2SUhjZ0xTQnlJQ29nTWx4dUlDQjlPMXh1WEc0Z0lHOXdkSE11YzJ4cFpHVnlWSGx3WlNBOUlHOXdkSE11YzJ4cFpHVnlWSGx3WlNCOGZDQmNJblpjSWp0Y2JseHVJQ0IwYUdsekxuUjVjR1VnUFNCY0luTnNhV1JsY2x3aU8xeHVJQ0IwYUdsekxsOXZjSFJ6SUQwZ2IzQjBjenRjYmx4dUlDQjJZWElnY21Ga2FYVnpJRDBnY2lBcklHSnZjbVJsY2xkcFpIUm9JQzhnTWp0Y2JseHVJQ0IyWVhJZ1ltRnpaVWR5YjNWd0lEMGdjM1puTG1jb2UxeHVJQ0FnSUdOc1lYTnpPaUJEVEVGVFUxOVFVa1ZHU1ZoY2JpQWdmU2s3WEc1Y2JpQWdkbUZ5SUhKbFkzUWdQU0JpWVhObFIzSnZkWEF1YVc1elpYSjBLRndpY21WamRGd2lMQ0I3WEc0Z0lDQWdZMnhoYzNNNklFTk1RVk5UWDFCU1JVWkpXQ0FySUZ3aVgxOTJZV3gxWlZ3aUxGeHVJQ0FnSUhKNE9pQnlZV1JwZFhNc1hHNGdJQ0FnY25rNklISmhaR2wxY3l4Y2JpQWdJQ0I0T2lCNElDMGdZbTl5WkdWeVYybGtkR2dnTHlBeUxGeHVJQ0FnSUhrNklIa2dMU0JpYjNKa1pYSlhhV1IwYUNBdklESXNYRzRnSUNBZ2QybGtkR2c2SUhjZ0t5QmliM0prWlhKWGFXUjBhQ3hjYmlBZ0lDQm9aV2xuYUhRNklHZ2dLeUJpYjNKa1pYSlhhV1IwYUN4Y2JpQWdJQ0J6ZEhKdmEyVlhhV1IwYURvZ1ltOXlaR1Z5VjJsa2RHZ3NYRzRnSUNBZ2MzUnliMnRsT2lCdmNIUnpMbUp2Y21SbGNpNWpiMnh2Y2x4dUlDQjlLVHRjYmx4dUlDQnlaV04wTG5ObGRFZHlZV1JwWlc1MEtGd2labWxzYkZ3aUxDQnpkbWN1WjNKaFpHbGxiblFvWENKc2FXNWxZWEpjSWl3Z2UxeHVJQ0FnSURBNklIc2dZMjlzYjNJNklGd2lJekF3TUZ3aUlIMHNYRzRnSUNBZ01UQXdPaUI3SUdOdmJHOXlPaUJjSWlObVptWmNJaUI5WEc0Z0lIMHBLVHRjYmx4dUlDQjBhR2x6TGw5bmNtRmthV1Z1ZENBOUlISmxZM1F1WjNKaFpHbGxiblE3WEc1Y2JpQWdkR2hwY3k1dFlYSnJaWElnUFNCdVpYY2dYMjFoY210bGNqSXVaR1ZtWVhWc2RDaGlZWE5sUjNKdmRYQXNJRzl3ZEhNdWJXRnlhMlZ5S1R0Y2JuMDdYRzVjYm5Oc2FXUmxjaTV3Y205MGIzUjVjR1VnUFNCN1hHNGdJR052Ym5OMGNuVmpkRzl5T2lCemJHbGtaWElzWEc1Y2JpQWdMeW9xWEc0Z0lDQWdLaUJBWkdWell5QjFjR1JoZEdWeklIUm9hWE1nWld4bGJXVnVkQ0IwYnlCeVpYQnlaWE5sYm5RZ1lTQnVaWGNnWTI5c2IzSWdkbUZzZFdWY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JqYjJ4dmNpQXRJR0Z1SUdseWIwTnZiRzl5SUc5aWFtVmpkQ0IzYVhSb0lIUm9aU0J1WlhjZ1kyOXNiM0lnZG1Gc2RXVmNiaUFnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCamFHRnVaMlZ6SUMwZ1lXNGdiMkpxWldOMElIUm9ZWFFnWjJsMlpYTWdZU0JpYjI5c1pXRnVJR1p2Y2lCbFlXTm9JRWhUVmlCamFHRnVibVZzTENCcGJtUnBZMkYwYVc1bklIZG9aWFJvWlhJZ2IzUWdibTkwSUhSb1lYUWdZMmhoYm01bGJDQm9ZWE1nWTJoaGJtZGxaRnh1SUNBcUwxeHVJQ0IxY0dSaGRHVTZJR1oxYm1OMGFXOXVJSFZ3WkdGMFpTaGpiMnh2Y2l3Z1kyaGhibWRsY3lrZ2UxeHVJQ0FnSUhaaGNpQnZjSFJ6SUQwZ2RHaHBjeTVmYjNCMGN6dGNiaUFnSUNCMllYSWdjbUZ1WjJVZ1BTQnZjSFJ6TG5KaGJtZGxPMXh1SUNBZ0lIWmhjaUJvYzNZZ1BTQmpiMnh2Y2k1b2MzWTdYRzRnSUNBZ2RtRnlJR2h6YkNBOUlGOWpiMnh2Y2pJdVpHVm1ZWFZzZEM1b2MzWXlTSE5zS0hzZ2FEb2dhSE4yTG1nc0lITTZJR2h6ZGk1ekxDQjJPaUF4TURBZ2ZTazdYRzRnSUNBZ2FXWWdLRzl3ZEhNdWMyeHBaR1Z5Vkhsd1pTQTlQU0JjSW5aY0lpa2dlMXh1SUNBZ0lDQWdhV1lnS0dOb1lXNW5aWE11YUNCOGZDQmphR0Z1WjJWekxuTXBJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZaM0poWkdsbGJuUXVjM1J2Y0hOYk1WMHVjMlYwUVhSMGNuTW9leUJ6ZEc5d1EyOXNiM0k2SUZ3aWFITnNLRndpSUNzZ2FITnNMbWdnS3lCY0lpeGNJaUFySUdoemJDNXpJQ3NnWENJbExGd2lJQ3NnYUhOc0xtd2dLeUJjSWlVcFhDSWdmU2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb1kyaGhibWRsY3k1MktTQjdYRzRnSUNBZ0lDQWdJSFpoY2lCd1pYSmpaVzUwSUQwZ2FITjJMbllnTHlBeE1EQTdYRzRnSUNBZ0lDQWdJSFJvYVhNdWJXRnlhMlZ5TG0xdmRtVW9jbUZ1WjJVdWJXbHVJQ3NnY0dWeVkyVnVkQ0FxSUhKaGJtZGxMbmNzSUc5d2RITXVlU0FySUc5d2RITXVhQ0F2SURJcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdmU3hjYmx4dUlDQXZLaXBjYmlBZ0lDQXFJRUJrWlhOaklGUmhhMlZ6SUdFZ2NHOXBiblFnWVhRZ0tIZ3NJSGtwSUdGdVpDQnlaWFIxY201eklFaFRWaUIyWVd4MVpYTWdZbUZ6WldRZ2IyNGdkR2hwY3lCcGJuQjFkQ0F0TFNCMWMyVWdkR2hwY3lCMGJ5QjFjR1JoZEdVZ1lTQmpiMnh2Y2lCbWNtOXRJRzF2ZFhObElHbHVjSFYwWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdlQ0F0SUhCdmFXNTBJSGdnWTI5dmNtUnBibUYwWlZ4dUlDQWdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJSGtnTFNCd2IybHVkQ0I1SUdOdmIzSmthVzVoZEdWY2JpQWdJQ0FxSUVCeVpYUjFjbTRnZTA5aWFtVmpkSDBnTFNCdVpYY2dTRk5XSUdOdmJHOXlJSFpoYkhWbGN5QW9jMjl0WlNCamFHRnVibVZzY3lCdFlYa2dZbVVnYldsemMybHVaeWxjYmlBZ0tpOWNiaUFnYVc1d2RYUTZJR1oxYm1OMGFXOXVJR2x1Y0hWMEtIZ3NJSGtwSUh0Y2JpQWdJQ0IyWVhJZ2IzQjBjeUE5SUhSb2FYTXVYMjl3ZEhNN1hHNGdJQ0FnZG1GeUlISmhibWRsSUQwZ2IzQjBjeTV5WVc1blpUdGNiaUFnSUNCMllYSWdaR2x6ZENBOUlFMWhkR2d1YldGNEtFMWhkR2d1YldsdUtIZ3NJSEpoYm1kbExtMWhlQ2tzSUhKaGJtZGxMbTFwYmlrZ0xTQnlZVzVuWlM1dGFXNDdYRzRnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUhZNklFMWhkR2d1Y205MWJtUW9NVEF3SUM4Z2NtRnVaMlV1ZHlBcUlHUnBjM1FwWEc0Z0lDQWdmVHRjYmlBZ2ZTeGNibHh1SUNBdktpcGNiaUFnSUNBcUlFQmtaWE5qSUVOb1pXTnJJR2xtSUdFZ2NHOXBiblFnWVhRZ0tIZ3NJSGtwSUdseklHbHVjMmxrWlNCMGFHbHpJR1ZzWlcxbGJuUmNiaUFnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCNElDMGdjRzlwYm5RZ2VDQmpiMjl5WkdsdVlYUmxYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2VTQXRJSEJ2YVc1MElIa2dZMjl2Y21ScGJtRjBaVnh1SUNBZ0lDb2dRSEpsZEhWeWJpQjdRbTl2YkdWaGJuMGdMU0IwY25WbElHbG1JSFJvWlNCd2IybHVkQ0JwY3lCaElGd2lhR2wwWENJc0lHVnNjMlVnWm1Gc2MyVmNiaUFnS2k5Y2JpQWdZMmhsWTJ0SWFYUTZJR1oxYm1OMGFXOXVJR05vWldOclNHbDBLSGdzSUhrcElIdGNiaUFnSUNCMllYSWdiM0IwY3lBOUlIUm9hWE11WDI5d2RITTdYRzRnSUNBZ2NtVjBkWEp1SUhnZ1BpQnZjSFJ6TG5nZ0ppWWdlQ0E4SUc5d2RITXVlQ0FySUc5d2RITXVkeUFtSmlCNUlENGdiM0IwY3k1NUlDWW1JSGtnUENCdmNIUnpMbmtnS3lCdmNIUnpMbWc3WEc0Z0lIMWNibHh1ZlR0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnpiR2xrWlhJN1hHNWNiaThxS2lvdklIMHBMRnh1THlvZ05pQXFMMXh1THlvcUtpOGdLR1oxYm1OMGFXOXVLRzF2WkhWc1pTd2daWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWtnZTF4dVhHNWNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVYRzUyWVhJZ1IxSkJSRWxGVGxSZlNVNUVSVmdnUFNBd08xeHVkbUZ5SUVkU1FVUkpSVTVVWDFOVlJrWkpXQ0E5SUZ3aVIzSmhaR2xsYm5SY0lqdGNiblpoY2lCVFZrZGZUa0ZOUlZOUVFVTkZJRDBnWENKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWjF3aU8xeHVkbUZ5SUZOV1IxOUJWRlJTU1VKVlZFVmZVMGhQVWxSSVFVNUVVeUE5SUh0Y2JpQWdZMnhoYzNNNklGd2lZMnhoYzNOY0lpeGNiaUFnYzNSeWIydGxPaUJjSW5OMGNtOXJaVndpTEZ4dUlDQnpkSEp2YTJWWGFXUjBhRG9nWENKemRISnZhMlV0ZDJsa2RHaGNJaXhjYmlBZ1ptbHNiRG9nWENKbWFXeHNYQ0lzWEc0Z0lHOXdZV05wZEhrNklGd2liM0JoWTJsMGVWd2lMRnh1SUNCdlptWnpaWFE2SUZ3aWIyWm1jMlYwWENJc1hHNGdJSE4wYjNCRGIyeHZjam9nWENKemRHOXdMV052Ykc5eVhDSXNYRzRnSUhOMGIzQlBjR0ZqYVhSNU9pQmNJbk4wYjNBdGIzQmhZMmwwZVZ3aVhHNTlPMXh1THk4Z1ZFOUVUem9nWm1sbmRYSmxJRzkxZENCM2FIa2dkR2hsYzJVZ1lYSmxiaWQwSUdKbGFXNW5JR052YlhCeVpYTnpaV1FnY0hKdmNHVnliSGsvWEc1MllYSWdVMVpIWDFSU1FVNVRSazlTVFY5VFNFOVNWRWhCVGtSVElEMGdlMXh1SUNCMGNtRnVjMnhoZEdVNklGd2ljMlYwVkhKaGJuTnNZWFJsWENJc1hHNGdJSE5qWVd4bE9pQmNJbk5sZEZOallXeGxYQ0lzWEc0Z0lISnZkR0YwWlRvZ1hDSnpaWFJTYjNSaGRHVmNJbHh1ZlR0Y2JpOHZJSE51YVdabUlIVnpaWEpoWjJWdWRDQnpkSEpwYm1jZ2RHOGdZMmhsWTJzZ2FXWWdkR2hsSUhWelpYSWdhWE1nY25WdWJtbHVaeUJKUlN3Z1JXUm5aU0J2Y2lCVFlXWmhjbWxjYm5aaGNpQjFZU0E5SUhkcGJtUnZkeTV1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwTG5SdlRHOTNaWEpEWVhObEtDazdYRzUyWVhJZ1NWTmZTVVVnUFNBdmJYTnBaWHgwY21sa1pXNTBmR1ZrWjJVdkxuUmxjM1FvZFdFcE8xeHVkbUZ5SUVsVFgxTkJSa0ZTU1NBOUlDOWVLQ2cvSVdOb2NtOXRaWHhoYm1SeWIybGtLUzRwS25OaFptRnlhUzlwTG5SbGMzUW9kV0VwTzF4dUx5b3FYRzRnSUNvZ1FHTnZibk4wY25WamRHOXlJSE4yWnlCbGJHVnRaVzUwSUhkeVlYQndaWEpjYmlBZ0tpQkFjR0Z5WVcwZ2UzTjJaMUp2YjNSOUlISnZiM1FnTFNCemRtZFNiMjkwSUc5aWFtVmpkRnh1SUNBcUlFQndZWEpoYlNCN2MzWm5SV3hsYldWdWRDQjhJRVZzWlcxbGJuUjlJSEJoY21WdWRDQXRJSEJoY21WdWRDQnViMlJsSUZ4dUlDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQjBlWEJsSUMwZ1pXeGxiV1Z1ZENCMFlXY2dibUZ0WlZ4dUlDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmhkSFJ5Y3lBdElHVnNaVzFsYm5RZ1lYUjBjbWxpZFhSbGMxeHVLaTljYm5aaGNpQnpkbWRGYkdWdFpXNTBJRDBnWm5WdVkzUnBiMjRnYzNablJXeGxiV1Z1ZENoeWIyOTBMQ0J3WVhKbGJuUXNJSFI1Y0dVc0lHRjBkSEp6S1NCN1hHNGdJSFpoY2lCbGJDQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5ST1V5aFRWa2RmVGtGTlJWTlFRVU5GTENCMGVYQmxLVHRjYmlBZ2RHaHBjeTVsYkNBOUlHVnNPMXh1SUNCMGFHbHpMbk5sZEVGMGRISnpLR0YwZEhKektUdGNiaUFnS0hCaGNtVnVkQzVsYkNCOGZDQndZWEpsYm5RcExtRndjR1Z1WkVOb2FXeGtLR1ZzS1R0Y2JpQWdkR2hwY3k1ZmNtOXZkQ0E5SUhKdmIzUTdYRzRnSUhSb2FYTXVYM04yWjFSeVlXNXpabTl5YlhNZ1BTQjdmVHRjYmlBZ2RHaHBjeTVmZEhKaGJuTm1iM0p0VEdsemRDQTlJR1ZzTG5SeVlXNXpabTl5YlNBL0lHVnNMblJ5WVc1elptOXliUzVpWVhObFZtRnNJRG9nWm1Gc2MyVTdYRzU5TzF4dVhHNXpkbWRGYkdWdFpXNTBMbkJ5YjNSdmRIbHdaU0E5SUh0Y2JpQWdZMjl1YzNSeWRXTjBiM0k2SUhOMlowVnNaVzFsYm5Rc1hHNWNiaUFnTHlvcVhHNGdJQ0FnS2lCQVpHVnpZeUJwYm5ObGNuUWdZU0J1WlhjZ2MzWm5SV3hsYldWdWRGeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUhSNWNHVWdMU0JsYkdWdFpXNTBJSFJoWnlCdVlXMWxYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1lYUjBjbk1nTFNCbGJHVnRaVzUwSUdGMGRISnBZblYwWlhOY2JpQWdLaTljYmlBZ2FXNXpaWEowT2lCbWRXNWpkR2x2YmlCcGJuTmxjblFvZEhsd1pTd2dZWFIwY25NcElIdGNiaUFnSUNCeVpYUjFjbTRnYm1WM0lITjJaMFZzWlcxbGJuUW9kR2hwY3k1ZmNtOXZkQ3dnZEdocGN5d2dkSGx3WlN3Z1lYUjBjbk1wTzF4dUlDQjlMRnh1WEc0Z0lDOHFLbHh1SUNBZ0lDb2dRR1JsYzJNZ2MyaHZjblJvWVc1a0lIUnZJR2x1YzJWeWRDQmhJRzVsZHlCbmNtOTFjQ0J6ZG1kRmJHVnRaVzUwWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdZWFIwY25NZ0xTQmxiR1Z0Wlc1MElHRjBkSEpwWW5WMFpYTmNiaUFnS2k5Y2JpQWdaem9nWm5WdVkzUnBiMjRnWnloaGRIUnljeWtnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TG1sdWMyVnlkQ2hjSW1kY0lpd2dZWFIwY25NcE8xeHVJQ0I5TEZ4dVhHNGdJQzhxS2x4dUlDQWdJQ29nUUdSbGMyTWdjMmh2Y25Sb1lXNWtJSFJ2SUdsdWMyVnlkQ0JoSUc1bGR5QmhjbU1nYzNablJXeGxiV1Z1ZEZ4dUlDQWdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJR040SUMwZ1lYSmpJR05sYm5SbGNpQjRYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ1kza2dMU0JoY21NZ1kyVnVkR1Z5SUhsY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0J5WVdScGRYTWdMU0JoY21NZ2NtRmthWFZ6WEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdjM1JoY25SQmJtZHNaU0F0SUdGeVl5QnpkR0Z5ZENCaGJtZHNaU0FvYVc0Z1pHVm5jbVZsY3lsY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JsYm1SQmJtZHNaU0F0SUdGeVl5QmxibVFnWVc1bmJHVWdLR2x1SUdSbFozSmxaWE1wWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdZWFIwY25NZ0xTQmxiR1Z0Wlc1MElHRjBkSEpwWW5WMFpYTmNiaUFnS2k5Y2JpQWdZWEpqT2lCbWRXNWpkR2x2YmlCaGNtTW9ZM2dzSUdONUxDQnlZV1JwZFhNc0lITjBZWEowUVc1bmJHVXNJR1Z1WkVGdVoyeGxMQ0JoZEhSeWN5a2dlMXh1SUNBZ0lIWmhjaUJzWVhKblpVRnlZMFpzWVdjZ1BTQmxibVJCYm1kc1pTQXRJSE4wWVhKMFFXNW5iR1VnUEQwZ01UZ3dJRDhnTUNBNklERTdYRzRnSUNBZ2MzUmhjblJCYm1kc1pTQXFQU0JOWVhSb0xsQkpJQzhnTVRnd08xeHVJQ0FnSUdWdVpFRnVaMnhsSUNvOUlFMWhkR2d1VUVrZ0x5QXhPREE3WEc0Z0lDQWdkbUZ5SUhneElEMGdZM2dnS3lCeVlXUnBkWE1nS2lCTllYUm9MbU52Y3lobGJtUkJibWRzWlNrc1hHNGdJQ0FnSUNBZ0lIa3hJRDBnWTNrZ0t5QnlZV1JwZFhNZ0tpQk5ZWFJvTG5OcGJpaGxibVJCYm1kc1pTa3NYRzRnSUNBZ0lDQWdJSGd5SUQwZ1kzZ2dLeUJ5WVdScGRYTWdLaUJOWVhSb0xtTnZjeWh6ZEdGeWRFRnVaMnhsS1N4Y2JpQWdJQ0FnSUNBZ2VUSWdQU0JqZVNBcklISmhaR2wxY3lBcUlFMWhkR2d1YzJsdUtITjBZWEowUVc1bmJHVXBPMXh1SUNBZ0lHRjBkSEp6SUQwZ1lYUjBjbk1nZkh3Z2UzMDdYRzRnSUNBZ1lYUjBjbk11WkNBOUlGdGNJazFjSWl3Z2VERXNJSGt4TENCY0lrRmNJaXdnY21Ga2FYVnpMQ0J5WVdScGRYTXNJREFzSUd4aGNtZGxRWEpqUm14aFp5d2dNQ3dnZURJc0lIa3lYUzVxYjJsdUtGd2lJRndpS1R0Y2JpQWdJQ0J5WlhSMWNtNGdkR2hwY3k1cGJuTmxjblFvWENKd1lYUm9YQ0lzSUdGMGRISnpLVHRjYmlBZ2ZTeGNibHh1SUNBdktpcGNiaUFnSUNBcUlFQmtaWE5qSUhOb2IzSjBhR0Z1WkNCMGJ5QnBibk5sY25RZ1lTQnVaWGNnWTJseVkyeGxJSE4yWjBWc1pXMWxiblJjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQmplQ0F0SUdOcGNtTnNaU0JqWlc1MFpYSWdlRnh1SUNBZ0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHTjVJQzBnWTJseVkyeGxJR05sYm5SbGNpQjVYRzRnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2NtRmthWFZ6SUMwZ1kybHlZMnhsSUhKaFpHbDFjMXh1SUNBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHRjBkSEp6SUMwZ1pXeGxiV1Z1ZENCaGRIUnlhV0oxZEdWelhHNGdJQ292WEc0Z0lHTnBjbU5zWlRvZ1puVnVZM1JwYjI0Z1kybHlZMnhsS0dONExDQmplU3dnY21Ga2FYVnpMQ0JoZEhSeWN5a2dlMXh1SUNBZ0lHRjBkSEp6SUQwZ1lYUjBjbk1nZkh3Z2UzMDdYRzRnSUNBZ1lYUjBjbk11WTNnZ1BTQmplRHRjYmlBZ0lDQmhkSFJ5Y3k1amVTQTlJR041TzF4dUlDQWdJR0YwZEhKekxuSWdQU0J5WVdScGRYTTdYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTXVhVzV6WlhKMEtGd2lZMmx5WTJ4bFhDSXNJR0YwZEhKektUdGNiaUFnZlN4Y2JseHVJQ0F2S2lwY2JpQWdJQ0FxSUVCa1pYTmpJSE5sZENCaElISnZkR0YwWlM5MGNtRnVjMnhoZEdVdmMyTmhiR1VnZEhKaGJuTm1iM0p0SUc5dUlIUm9hWE1nWld4bGJXVnVkRnh1SUNBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlIUjVjR1VnTFNCMGNtRnVjMlp2Y20wZ0tISnZkR0YwWlNCOElIUnlZVzV6YkdGMFpTQjhJSE5qWVd4bEtWeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0QmNuSmhlWDBnWVhKbmN5QXRJSFJ5WVc1elptOXliU0IyWVd4MVpYTmNiaUFnS2k5Y2JpQWdjMlYwVkhKaGJuTm1iM0p0T2lCbWRXNWpkR2x2YmlCelpYUlVjbUZ1YzJadmNtMG9kSGx3WlN3Z1lYSm5jeWtnZTF4dUlDQWdJR2xtSUNnaFNWTmZTVVVwSUh0Y2JpQWdJQ0FnSUhaaGNpQjBjbUZ1YzJadmNtMHNJSFJ5WVc1elptOXliVVp1TzF4dUlDQWdJQ0FnZG1GeUlITjJaMVJ5WVc1elptOXliWE1nUFNCMGFHbHpMbDl6ZG1kVWNtRnVjMlp2Y20xek8xeHVJQ0FnSUNBZ2FXWWdLQ0Z6ZG1kVWNtRnVjMlp2Y20xelczUjVjR1ZkS1NCN1hHNGdJQ0FnSUNBZ0lIUnlZVzV6Wm05eWJTQTlJSFJvYVhNdVgzSnZiM1F1Wld3dVkzSmxZWFJsVTFaSFZISmhibk5tYjNKdEtDazdYRzRnSUNBZ0lDQWdJSE4yWjFSeVlXNXpabTl5YlhOYmRIbHdaVjBnUFNCMGNtRnVjMlp2Y20wN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WDNSeVlXNXpabTl5YlV4cGMzUXVZWEJ3Wlc1a1NYUmxiU2gwY21GdWMyWnZjbTBwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnZEhKaGJuTm1iM0p0SUQwZ2MzWm5WSEpoYm5ObWIzSnRjMXQwZVhCbFhUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lIUnlZVzV6Wm05eWJVWnVJRDBnZEhsd1pTQnBiaUJUVmtkZlZGSkJUbE5HVDFKTlgxTklUMUpVU0VGT1JGTWdQeUJUVmtkZlZGSkJUbE5HVDFKTlgxTklUMUpVU0VGT1JGTmJkSGx3WlYwZ09pQjBlWEJsTzF4dUlDQWdJQ0FnZEhKaGJuTm1iM0p0VzNSeVlXNXpabTl5YlVadVhTNWhjSEJzZVNoMGNtRnVjMlp2Y20wc0lHRnlaM01wTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQXZMeUJOYVdOeWIzTnZablFnYzNScGJHd2dZMkZ1SjNRZ2JXRnJaU0JoSUhkbFlpQmljbTkzYzJWeUlIUm9ZWFFnWVdOMGRXRnNiSGtnZDI5eWEzTXNJR0Z6SUhOMVkyZ3NJRVZrWjJVZ0t5QkpSU0JrYjI1MElHbHRjR3hsYldWdWRDQlRWa2NnZEhKaGJuTm1iM0p0Y3lCd2NtOXdaWEpzZVM1Y2JpQWdJQ0FnSUM4dklGZGxJR2hoZG1VZ2RHOGdabTl5WTJVZ2RHaGxiU0JwYm5OMFpXRmtMaTR1SUdkbFpYcGNiaUFnSUNBZ0lIUm9hWE11YzJWMFFYUjBjbk1vZXlCY0luUnlZVzV6Wm05eWJWd2lPaUIwZVhCbElDc2dYQ0lvWENJZ0t5QmhjbWR6TG1wdmFXNG9YQ0lzSUZ3aUtTQXJJRndpS1Z3aUlIMHBPMXh1SUNBZ0lIMWNiaUFnZlN4Y2JseHVJQ0F2S2lwY2JpQWdJQ0FxSUVCa1pYTmpJSE5sZENCaGRIUnlhV0oxZEdWeklHOXVJSFJvYVhNZ1pXeGxiV1Z1ZEZ4dUlDQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR0YwZEhKeklDMGdaV3hsYldWdWRDQmhkSFJ5YVdKMWRHVnpYRzRnSUNvdlhHNGdJSE5sZEVGMGRISnpPaUJtZFc1amRHbHZiaUJ6WlhSQmRIUnljeWhoZEhSeWN5a2dlMXh1SUNBZ0lHWnZjaUFvZG1GeUlHRjBkSElnYVc0Z1lYUjBjbk1wSUh0Y2JpQWdJQ0FnSUhaaGNpQnVZVzFsSUQwZ1lYUjBjaUJwYmlCVFZrZGZRVlJVVWtsQ1ZWUkZYMU5JVDFKVVNFRk9SRk1nUHlCVFZrZGZRVlJVVWtsQ1ZWUkZYMU5JVDFKVVNFRk9SRk5iWVhSMGNsMGdPaUJoZEhSeU8xeHVJQ0FnSUNBZ2RHaHBjeTVsYkM1elpYUkJkSFJ5YVdKMWRHVW9ibUZ0WlN3Z1lYUjBjbk5iWVhSMGNsMHBPMXh1SUNBZ0lIMWNiaUFnZlN4Y2JseHVJQ0J6WlhSSGNtRmthV1Z1ZERvZ1puVnVZM1JwYjI0Z2MyVjBSM0poWkdsbGJuUW9ZWFIwY2l3Z1ozSmhaR2xsYm5RcElIdGNiaUFnSUNCMllYSWdZWFIwY25NZ1BTQjdmVHRjYmlBZ0lDQmhkSFJ5YzF0aGRIUnlYU0E5SUdkeVlXUnBaVzUwTG1kbGRGVnliQ2dwTzF4dUlDQWdJR2R5WVdScFpXNTBMbDl5WldaelcyRjBkSEpkSUQwZ2RHaHBjenRjYmlBZ0lDQjBhR2x6TG1keVlXUnBaVzUwSUQwZ1ozSmhaR2xsYm5RN1hHNGdJQ0FnZEdocGN5NXpaWFJCZEhSeWN5aGhkSFJ5Y3lrN1hHNGdJSDFjYm4wN1hHNWNiaThxS2x4dUlDQXFJRUJqYjI1emRISjFZM1J2Y2lCemRtY2daM0poWkdsbGJuUWdkM0poY0hCbGNseHVJQ0FxSUVCd1lYSmhiU0I3YzNablVtOXZkSDBnY205dmRDQXRJSE4yWjFKdmIzUWdiMkpxWldOMFhHNGdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJSFI1Y0dVZ0xTQm5jbUZrYVdWdWRDQjBlWEJsSUNoc2FXNWxZWElnZkNCeVlXUnBZV3dwWEc0Z0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlITjBiM0J6SUMwZ1ozSmhaR2xsYm5RZ2MzUnZjSE1nUFNCN1kyOXNiM0lzSUc5d1lXTnBkSGw5SUd0bGVXVmtJR0o1SUc5bVpuTmxkQ0IyWVd4MVpWeHVLaTljYm5aaGNpQnpkbWRIY21Ga2FXVnVkQ0E5SUdaMWJtTjBhVzl1SUhOMlowZHlZV1JwWlc1MEtISnZiM1FzSUhSNWNHVXNJSE4wYjNCektTQjdYRzRnSUhaaGNpQnpkRzl3Uld4bGJXVnVkSE1nUFNCYlhUdGNiaUFnZG1GeUlHZHlZV1JwWlc1MElEMGdjbTl2ZEM1ZlpHVm1jeTVwYm5ObGNuUW9kSGx3WlNBcklFZFNRVVJKUlU1VVgxTlZSa1pKV0N3Z2UxeHVJQ0FnSUdsa09pQmNJbWx5YjF3aUlDc2dSMUpCUkVsRlRsUmZVMVZHUmtsWUlDc2dSMUpCUkVsRlRsUmZTVTVFUlZncksxeHVJQ0I5S1R0Y2JpQWdabTl5SUNoMllYSWdiMlptYzJWMElHbHVJSE4wYjNCektTQjdYRzRnSUNBZ2RtRnlJSE4wYjNBZ1BTQnpkRzl3YzF0dlptWnpaWFJkTzF4dUlDQWdJSE4wYjNCRmJHVnRaVzUwY3k1d2RYTm9LR2R5WVdScFpXNTBMbWx1YzJWeWRDaGNJbk4wYjNCY0lpd2dlMXh1SUNBZ0lDQWdiMlptYzJWME9pQnZabVp6WlhRZ0t5QmNJaVZjSWl4Y2JpQWdJQ0FnSUhOMGIzQkRiMnh2Y2pvZ2MzUnZjQzVqYjJ4dmNpeGNiaUFnSUNBZ0lITjBiM0JQY0dGamFYUjVPaUJ6ZEc5d0xtOXdZV05wZEhrZ1BUMDlJSFZ1WkdWbWFXNWxaQ0EvSURFZ09pQnpkRzl3TG05d1lXTnBkSGxjYmlBZ0lDQjlLU2s3WEc0Z0lIMWNiaUFnZEdocGN5NWxiQ0E5SUdkeVlXUnBaVzUwTG1Wc08xeHVJQ0IwYUdsekxuTjBiM0J6SUQwZ2MzUnZjRVZzWlcxbGJuUnpPMXh1SUNCMGFHbHpMbDl5WldaeklEMGdlMzA3WEc1OU8xeHVYRzV6ZG1kSGNtRmthV1Z1ZEM1d2NtOTBiM1I1Y0dVdVoyVjBWWEpzSUQwZ1puVnVZM1JwYjI0Z0tHSmhjMlVwSUh0Y2JpQWdkbUZ5SUhKdmIzUWdQU0JKVTE5VFFVWkJVa2tnUHlCaVlYTmxJSHg4SUhkcGJtUnZkeTVzYjJOaGRHbHZiaTVvY21WbUlEb2dYQ0pjSWp0Y2JpQWdjbVYwZFhKdUlGd2lkWEpzS0Z3aUlDc2djbTl2ZENBcklGd2lJMXdpSUNzZ2RHaHBjeTVsYkM1cFpDQXJJRndpS1Z3aU8xeHVmVHRjYmx4dUx5b3FYRzRnSUNvZ1FHTnZibk4wY25WamRHOXlJSE4yWnlCeWIyOTBJR1ZzWlcxbGJuUWdLR2x1YUdWeWFYUnpJSE4yWjBWc1pXMWxiblFwWEc0Z0lDb2dRSEJoY21GdElIdHpkbWRGYkdWdFpXNTBJSHdnUld4bGJXVnVkSDBnY0dGeVpXNTBJQzBnY0dGeVpXNTBJRzV2WkdVZ1hHNGdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJSGRwWkhSb0lDMGdjM1puSUhkcFpIUm9YRzRnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUdobGFXZG9kQ0F0SUhOMlp5Qm9aV2xuYUhSY2Jpb3ZYRzUyWVhJZ2MzWm5VbTl2ZENBOUlHWjFibU4wYVc5dUlITjJaMUp2YjNRb2NHRnlaVzUwTENCM2FXUjBhQ3dnYUdWcFoyaDBLU0I3WEc0Z0lITjJaMFZzWlcxbGJuUXVZMkZzYkNoMGFHbHpMQ0IwYUdsekxDQndZWEpsYm5Rc0lGd2ljM1puWENJc0lIc2dkMmxrZEdnNklIZHBaSFJvTENCb1pXbG5hSFE2SUdobGFXZG9kQ3dnYzNSNWJHVTZJRndpWkdsemNHeGhlVHBpYkc5amExd2lJSDBwTzF4dUlDQjBhR2x6TGw5a1pXWnpJRDBnZEdocGN5NXBibk5sY25Rb1hDSmtaV1p6WENJcE8xeHVJQ0IwYUdsekxsOW5jbUZrYVdWdWRITWdQU0JiWFR0Y2JuMDdYRzVjYm5OMloxSnZiM1F1Y0hKdmRHOTBlWEJsSUQwZ1QySnFaV04wTG1OeVpXRjBaU2h6ZG1kRmJHVnRaVzUwTG5CeWIzUnZkSGx3WlNrN1hHNXpkbWRTYjI5MExuQnliM1J2ZEhsd1pTNWpiMjV6ZEhKMVkzUnZjaUE5SUhOMloxSnZiM1E3WEc1emRtZFNiMjkwTG5CeWIzUnZkSGx3WlM1bmNtRmthV1Z1ZENBOUlHWjFibU4wYVc5dUlDaDBlWEJsTENCemRHOXdjeWtnZTF4dUlDQjJZWElnWjNKaFpHbGxiblFnUFNCdVpYY2djM1puUjNKaFpHbGxiblFvZEdocGN5d2dkSGx3WlN3Z2MzUnZjSE1wTzF4dUlDQjBhR2x6TGw5bmNtRmthV1Z1ZEhNdWNIVnphQ2huY21Ga2FXVnVkQ2s3WEc0Z0lISmxkSFZ5YmlCbmNtRmthV1Z1ZER0Y2JuMDdYRzV6ZG1kU2IyOTBMbkJ5YjNSdmRIbHdaUzUxY0dSaGRHVlZjbXh6SUQwZ1puVnVZM1JwYjI0Z0tHSmhjMlVwSUh0Y2JpQWdhV1lnS0VsVFgxTkJSa0ZTU1NrZ2UxeHVJQ0FnSUhaaGNpQm5jbUZrYVdWdWRITWdQU0IwYUdsekxsOW5jbUZrYVdWdWRITTdYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQm5jbUZrYVdWdWRITXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUdadmNpQW9kbUZ5SUd0bGVTQnBiaUJuY21Ga2FXVnVkSE5iYVYwdVgzSmxabk1wSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJR0YwZEhKeklEMGdlMzA3WEc0Z0lDQWdJQ0FnSUdGMGRISnpXMnRsZVYwZ1BTQm5jbUZrYVdWdWRITmJhVjB1WjJWMFZYSnNLR0poYzJVcE8xeHVJQ0FnSUNBZ0lDQm5jbUZrYVdWdWRITmJhVjB1WDNKbFpuTmJhMlY1WFM1elpYUkJkSFJ5Y3loaGRIUnljeWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNCOVhHNTlPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhOMloxSnZiM1E3WEc1Y2JpOHFLaW92SUgwcExGeHVMeW9nTnlBcUwxeHVMeW9xS2k4Z0tHWjFibU4wYVc5dUtHMXZaSFZzWlN3Z1pYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5a2dlMXh1WEc1Y0luVnpaU0J6ZEhKcFkzUmNJanRjYmx4dVhHNTJZWElnWDIxaGNtdGxjaUE5SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b01pazdYRzVjYm5aaGNpQmZiV0Z5YTJWeU1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gyMWhjbXRsY2lrN1hHNWNibVoxYm1OMGFXOXVJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdiMkpxTGw5ZlpYTk5iMlIxYkdVZ1B5QnZZbW9nT2lCN0lHUmxabUYxYkhRNklHOWlhaUI5T3lCOVhHNWNiaTh2SUdOemN5QmpiR0Z6Y3lCd2NtVm1hWGdnWm05eUlIUm9hWE1nWld4bGJXVnVkRnh1ZG1GeUlFTk1RVk5UWDFCU1JVWkpXQ0E5SUZ3aWFYSnZYMTkzYUdWbGJGd2lPMXh1THk4Z1VYVnBZMnNnY21WbVpYSmxibU5sY3lCMGJ5QnlaWFZ6WldRZ2JXRjBhQ0JtZFc1amRHbHZibk5jYm5aaGNpQlFTU0E5SUUxaGRHZ3VVRWtzWEc0Z0lDQWdjM0Z5ZENBOUlFMWhkR2d1YzNGeWRDeGNiaUFnSUNCaFluTWdQU0JOWVhSb0xtRmljeXhjYmlBZ0lDQnliM1Z1WkNBOUlFMWhkR2d1Y205MWJtUTdYRzVjYmk4cUtseHVJQ0FxSUVCamIyNXpkSEoxWTNSdmNpQm9kV1VnZDJobFpXd2dWVWxjYmlBZ0tpQkFjR0Z5WVcwZ2UzTjJaMUp2YjNSOUlITjJaeUF0SUhOMloxSnZiM1FnYjJKcVpXTjBYRzRnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5d2RITWdMU0J2Y0hScGIyNXpYRzRxTDF4dWRtRnlJSGRvWldWc0lEMGdablZ1WTNScGIyNGdkMmhsWld3b2MzWm5MQ0J2Y0hSektTQjdYRzRnSUhSb2FYTXVYMjl3ZEhNZ1BTQnZjSFJ6TzF4dUlDQjBhR2x6TG5SNWNHVWdQU0JjSW5kb1pXVnNYQ0k3WEc1Y2JpQWdkbUZ5SUdOWklEMGdiM0IwY3k1aldTeGNiaUFnSUNBZ0lHTllJRDBnYjNCMGN5NWpXQ3hjYmlBZ0lDQWdJSElnUFNCdmNIUnpMbklzWEc0Z0lDQWdJQ0JpYjNKa1pYSWdQU0J2Y0hSekxtSnZjbVJsY2p0Y2JseHVJQ0IyWVhJZ1ltRnpaVWR5YjNWd0lEMGdjM1puTG1jb2UxeHVJQ0FnSUdOc1lYTnpPaUJEVEVGVFUxOVFVa1ZHU1ZoY2JpQWdmU2s3WEc1Y2JpQWdZbUZ6WlVkeWIzVndMbU5wY21Oc1pTaGpXQ3dnWTFrc0lISWdLeUJpYjNKa1pYSXVkeUF2SURJc0lIdGNiaUFnSUNCamJHRnpjem9nUTB4QlUxTmZVRkpGUmtsWUlDc2dYQ0pmWDJKdmNtUmxjbHdpTEZ4dUlDQWdJR1pwYkd3NklGd2lJMlptWmx3aUxGeHVJQ0FnSUhOMGNtOXJaVG9nWW05eVpHVnlMbU52Ykc5eUxGeHVJQ0FnSUhOMGNtOXJaVmRwWkhSb09pQmliM0prWlhJdWQxeHVJQ0I5S1R0Y2JseHVJQ0IyWVhJZ2NtbHVaMGR5YjNWd0lEMGdZbUZ6WlVkeWIzVndMbWNvZTF4dUlDQWdJR05zWVhOek9pQkRURUZUVTE5UVVrVkdTVmdnS3lCY0lsOWZhSFZsWENJc1hHNGdJQ0FnYzNSeWIydGxWMmxrZEdnNklISXNYRzRnSUNBZ1ptbHNiRG9nWENKdWIyNWxYQ0pjYmlBZ2ZTazdYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FIVmxJRDBnTURzZ2FIVmxJRHdnTXpZd095Qm9kV1VyS3lrZ2UxeHVJQ0FnSUhKcGJtZEhjbTkxY0M1aGNtTW9ZMWdzSUdOWkxDQnlJQzhnTWl3Z2FIVmxMQ0JvZFdVZ0t5QXhMalVzSUh0Y2JpQWdJQ0FnSUhOMGNtOXJaVG9nWENKb2Myd29YQ0lnS3lBb2IzQjBjeTVoYm5ScFkyeHZZMnQzYVhObElEOGdNell3SUMwZ2FIVmxJRG9nYUhWbEtTQXJJRndpTERFd01DVXNOVEFsS1Z3aVhHNGdJQ0FnZlNrN1hHNGdJSDFjYmx4dUlDQjJZWElnYzJGMGRYSmhkR2x2YmlBOUlHSmhjMlZIY205MWNDNWphWEpqYkdVb1kxZ3NJR05aTENCeUxDQjdYRzRnSUNBZ1kyeGhjM002SUVOTVFWTlRYMUJTUlVaSldDQXJJRndpWDE5ellYUjFjbUYwYVc5dVhDSmNiaUFnZlNrN1hHNWNiaUFnYzJGMGRYSmhkR2x2Ymk1elpYUkhjbUZrYVdWdWRDaGNJbVpwYkd4Y0lpd2djM1puTG1keVlXUnBaVzUwS0Z3aWNtRmthV0ZzWENJc0lIdGNiaUFnSUNBd09pQjdYRzRnSUNBZ0lDQmpiMnh2Y2pvZ1hDSWpabVptWENKY2JpQWdJQ0I5TEZ4dUlDQWdJREV3TURvZ2UxeHVJQ0FnSUNBZ1kyOXNiM0k2SUZ3aUkyWm1abHdpTEZ4dUlDQWdJQ0FnYjNCaFkybDBlVG9nTUZ4dUlDQWdJSDFjYmlBZ2ZTa3BPMXh1WEc0Z0lIUm9hWE11WDJ4cFoyaDBibVZ6Y3lBOUlHSmhjMlZIY205MWNDNWphWEpqYkdVb1kxZ3NJR05aTENCeUxDQjdYRzRnSUNBZ1kyeGhjM002SUVOTVFWTlRYMUJTUlVaSldDQXJJRndpWDE5c2FXZG9kRzVsYzNOY0lpeGNiaUFnSUNCdmNHRmphWFI1T2lBd1hHNGdJSDBwTzF4dVhHNGdJSFJvYVhNdWJXRnlhMlZ5SUQwZ2JtVjNJRjl0WVhKclpYSXlMbVJsWm1GMWJIUW9ZbUZ6WlVkeWIzVndMQ0J2Y0hSekxtMWhjbXRsY2lrN1hHNTlPMXh1WEc1M2FHVmxiQzV3Y205MGIzUjVjR1VnUFNCN1hHNGdJR052Ym5OMGNuVmpkRzl5T2lCM2FHVmxiQ3hjYmx4dUlDQXZLaXBjYmlBZ0lDQXFJRUJrWlhOaklIVndaR0YwWlhNZ2RHaHBjeUJsYkdWdFpXNTBJSFJ2SUhKbGNISmxjMlZ1ZENCaElHNWxkeUJqYjJ4dmNpQjJZV3gxWlZ4dUlDQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR052Ykc5eUlDMGdZVzRnYVhKdlEyOXNiM0lnYjJKcVpXTjBJSGRwZEdnZ2RHaGxJRzVsZHlCamIyeHZjaUIyWVd4MVpWeHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdOb1lXNW5aWE1nTFNCaGJpQnZZbXBsWTNRZ2RHaGhkQ0JuYVhabGN5QmhJR0p2YjJ4bFlXNGdabTl5SUdWaFkyZ2dTRk5XSUdOb1lXNXVaV3dzSUdsdVpHbGpZWFJwYm1jZ2QyaGxkR2hsY2lCdmRDQnViM1FnZEdoaGRDQmphR0Z1Ym1Wc0lHaGhjeUJqYUdGdVoyVmtYRzRnSUNvdlhHNGdJSFZ3WkdGMFpUb2dablZ1WTNScGIyNGdkWEJrWVhSbEtHTnZiRzl5TENCamFHRnVaMlZ6S1NCN1hHNGdJQ0FnZG1GeUlHOXdkSE1nUFNCMGFHbHpMbDl2Y0hSek8xeHVJQ0FnSUhaaGNpQm9jM1lnUFNCamIyeHZjaTVvYzNZN1hHNGdJQ0FnTHk4Z1NXWWdkR2hsSUZZZ1kyaGhibTVsYkNCb1lYTWdZMmhoYm1kbFpDd2djbVZrY21GM0lIUm9aU0IzYUdWbGJDQlZTU0IzYVhSb0lIUm9aU0J1WlhjZ2RtRnNkV1ZjYmlBZ0lDQnBaaUFvWTJoaGJtZGxjeTUySUNZbUlHOXdkSE11YkdsbmFIUnVaWE56S1NCN1hHNGdJQ0FnSUNCMGFHbHpMbDlzYVdkb2RHNWxjM011YzJWMFFYUjBjbk1vZXlCdmNHRmphWFI1T2lBb01TQXRJR2h6ZGk1MklDOGdNVEF3S1M1MGIwWnBlR1ZrS0RJcElIMHBPMXh1SUNBZ0lIMWNiaUFnSUNBdkx5QkpaaUIwYUdVZ1NDQnZjaUJUSUdOb1lXNXVaV3dnYUdGeklHTm9ZVzVuWldRc0lHMXZkbVVnZEdobElHMWhjbXRsY2lCMGJ5QjBhR1VnY21sbmFIUWdjRzl6YVhScGIyNWNiaUFnSUNCcFppQW9ZMmhoYm1kbGN5NW9JSHg4SUdOb1lXNW5aWE11Y3lrZ2UxeHVJQ0FnSUNBZ0x5OGdZMjl1ZG1WeWRDQjBhR1VnYUhWbElIWmhiSFZsSUhSdklISmhaR2xoYm5Nc0lITnBibU5sSUhkbEoyeHNJSFZ6WlNCcGRDQmhjeUJoYmlCaGJtZHNaVnh1SUNBZ0lDQWdkbUZ5SUdoMVpVRnVaMnhsSUQwZ0tHOXdkSE11WVc1MGFXTnNiMk5yZDJselpTQS9JRE0yTUNBdElHaHpkaTVvSURvZ2FITjJMbWdwSUNvZ0tGQkpJQzhnTVRnd0tUdGNiaUFnSUNBZ0lDOHZJR052Ym5abGNuUWdkR2hsSUhOaGRIVnlZWFJwYjI0Z2RtRnNkV1VnZEc4Z1lTQmthWE4wWVc1alpTQmlaWFIzWldWdUlIUm9aU0JqWlc1MFpYSWdiMllnZEdobElISnBibWNnWVc1a0lIUm9aU0JsWkdkbFhHNGdJQ0FnSUNCMllYSWdaR2x6ZENBOUlHaHpkaTV6SUM4Z01UQXdJQ29nYjNCMGN5NXlUV0Y0TzF4dUlDQWdJQ0FnTHk4Z1RXOTJaU0IwYUdVZ2JXRnlhMlZ5SUdKaGMyVmtJRzl1SUhSb1pTQmhibWRzWlNCaGJtUWdaR2x6ZEdGdVkyVmNiaUFnSUNBZ0lIUm9hWE11YldGeWEyVnlMbTF2ZG1Vb2IzQjBjeTVqV0NBcklHUnBjM1FnS2lCTllYUm9MbU52Y3lob2RXVkJibWRzWlNrc0lHOXdkSE11WTFrZ0t5QmthWE4wSUNvZ1RXRjBhQzV6YVc0b2FIVmxRVzVuYkdVcEtUdGNiaUFnSUNCOVhHNGdJSDBzWEc1Y2JpQWdMeW9xWEc0Z0lDQWdLaUJBWkdWell5QlVZV3RsY3lCaElIQnZhVzUwSUdGMElDaDRMQ0I1S1NCaGJtUWdjbVYwZFhKdWN5QklVMVlnZG1Gc2RXVnpJR0poYzJWa0lHOXVJSFJvYVhNZ2FXNXdkWFFnTFMwZ2RYTmxJSFJvYVhNZ2RHOGdkWEJrWVhSbElHRWdZMjlzYjNJZ1puSnZiU0J0YjNWelpTQnBibkIxZEZ4dUlDQWdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJSGdnTFNCd2IybHVkQ0I0SUdOdmIzSmthVzVoZEdWY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0I1SUMwZ2NHOXBiblFnZVNCamIyOXlaR2x1WVhSbFhHNGdJQ0FnS2lCQWNtVjBkWEp1SUh0UFltcGxZM1I5SUMwZ2JtVjNJRWhUVmlCamIyeHZjaUIyWVd4MVpYTWdLSE52YldVZ1kyaGhibTVsYkhNZ2JXRjVJR0psSUcxcGMzTnBibWNwWEc0Z0lDb3ZYRzRnSUdsdWNIVjBPaUJtZFc1amRHbHZiaUJwYm5CMWRDaDRMQ0I1S1NCN1hHNGdJQ0FnZG1GeUlHOXdkSE1nUFNCMGFHbHpMbDl2Y0hSekxGeHVJQ0FnSUNBZ0lDQnlZVzVuWlUxaGVDQTlJRzl3ZEhNdWNrMWhlQ3hjYmlBZ0lDQWdJQ0FnWDNnZ1BTQnZjSFJ6TG1OWUlDMGdlQ3hjYmlBZ0lDQWdJQ0FnWDNrZ1BTQnZjSFJ6TG1OWklDMGdlVHRjYmx4dUlDQWdJSFpoY2lCaGJtZHNaU0E5SUUxaGRHZ3VZWFJoYmpJb1gza3NJRjk0S1N4Y2JseHVJQ0FnSUM4dklFTmhiR04xYkdGMFpTQjBhR1VnYUhWbElHSjVJR052Ym5abGNuUnBibWNnZEdobElHRnVaMnhsSUhSdklISmhaR2xoYm5OY2JpQWdJQ0JvZFdVZ1BTQnliM1Z1WkNoaGJtZHNaU0FxSUNneE9EQWdMeUJRU1NrcElDc2dNVGd3TEZ4dVhHNGdJQ0FnTHk4Z1JtbHVaQ0IwYUdVZ2NHOXBiblFuY3lCa2FYTjBZVzVqWlNCbWNtOXRJSFJvWlNCalpXNTBaWElnYjJZZ2RHaGxJSGRvWldWc1hHNGdJQ0FnTHk4Z1ZHaHBjeUJwY3lCMWMyVmtJSFJ2SUhOb2IzY2dkR2hsSUhOaGRIVnlZWFJwYjI0Z2JHVjJaV3hjYmlBZ0lDQmthWE4wSUQwZ1RXRjBhQzV0YVc0b2MzRnlkQ2hmZUNBcUlGOTRJQ3NnWDNrZ0tpQmZlU2tzSUhKaGJtZGxUV0Y0S1R0Y2JseHVJQ0FnSUdoMVpTQTlJRzl3ZEhNdVlXNTBhV05zYjJOcmQybHpaU0EvSURNMk1DQXRJR2gxWlNBNklHaDFaVHRjYmx4dUlDQWdJQzh2SUZKbGRIVnliaUJxZFhOMElIUm9aU0JJSUdGdVpDQlRJR05vWVc1dVpXeHpMQ0IwYUdVZ2QyaGxaV3dnWld4bGJXVnVkQ0JrYjJWemJpZDBJR1J2SUdGdWVYUm9hVzVuSUhkcGRHZ2dkR2hsSUV3Z1kyaGhibTVsYkZ4dUlDQWdJSEpsZEhWeWJpQjdYRzRnSUNBZ0lDQm9PaUJvZFdVc1hHNGdJQ0FnSUNCek9pQnliM1Z1WkNneE1EQWdMeUJ5WVc1blpVMWhlQ0FxSUdScGMzUXBYRzRnSUNBZ2ZUdGNiaUFnZlN4Y2JseHVJQ0F2S2lwY2JpQWdJQ0FxSUVCa1pYTmpJRU5vWldOcklHbG1JR0VnY0c5cGJuUWdZWFFnS0hnc0lIa3BJR2x6SUdsdWMybGtaU0IwYUdseklHVnNaVzFsYm5SY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0I0SUMwZ2NHOXBiblFnZUNCamIyOXlaR2x1WVhSbFhHNGdJQ0FnS2lCQWNHRnlZVzBnZTA1MWJXSmxjbjBnZVNBdElIQnZhVzUwSUhrZ1kyOXZjbVJwYm1GMFpWeHVJQ0FnSUNvZ1FISmxkSFZ5YmlCN1FtOXZiR1ZoYm4wZ0xTQjBjblZsSUdsbUlIUm9aU0J3YjJsdWRDQnBjeUJoSUZ3aWFHbDBYQ0lzSUdWc2MyVWdabUZzYzJWY2JpQWdLaTljYmlBZ1kyaGxZMnRJYVhRNklHWjFibU4wYVc5dUlHTm9aV05yU0dsMEtIZ3NJSGtwSUh0Y2JpQWdJQ0IyWVhJZ2IzQjBjeUE5SUhSb2FYTXVYMjl3ZEhNN1hHNWNiaUFnSUNBdkx5QkRhR1ZqYXlCcFppQjBhR1VnY0c5cGJuUWdhWE1nZDJsMGFHbHVJSFJvWlNCb2RXVWdjbWx1WnlCaWVTQmpiMjF3WVhKcGJtY2dkR2hsSUhCdmFXNTBKM01nWkdsemRHRnVZMlVnWm5KdmJTQjBhR1VnWTJWdWRISmxJSFJ2SUhSb1pTQnlhVzVuSjNNZ2NtRmthWFZ6WEc0Z0lDQWdMeThnU1dZZ2RHaGxJR1JwYzNSaGJtTmxJR2x6SUhOdFlXeHNaWElnZEdoaGJpQjBhR1VnY21Ga2FYVnpMQ0IwYUdWdUlIZGxJR2hoZG1VZ1lTQm9hWFJjYmlBZ0lDQjJZWElnWkhnZ1BTQmhZbk1vZUNBdElHOXdkSE11WTFncExGeHVJQ0FnSUNBZ0lDQmtlU0E5SUdGaWN5aDVJQzBnYjNCMGN5NWpXU2s3WEc0Z0lDQWdjbVYwZFhKdUlITnhjblFvWkhnZ0tpQmtlQ0FySUdSNUlDb2daSGtwSUR3Z2IzQjBjeTV5TzF4dUlDQjlYRzU5TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIZG9aV1ZzTzF4dVhHNHZLaW9xTHlCOUtWeHVMeW9xS2lvcUtpOGdYU2s3WEc1OUtUdGNiaTh2SXlCemIzVnlZMlZOWVhCd2FXNW5WVkpNUFdseWJ5NXFjeTV0WVhBaVhYMD0ifQ==
