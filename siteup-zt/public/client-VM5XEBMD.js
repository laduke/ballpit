var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@emotion/sheet/dist/emotion-sheet.cjs.dev.js
var require_emotion_sheet_cjs_dev = __commonJS({
  "node_modules/@emotion/sheet/dist/emotion-sheet.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function sheetForTag(tag) {
      if (tag.sheet) {
        return tag.sheet;
      }
      for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode === tag) {
          return document.styleSheets[i];
        }
      }
    }
    function createStyleElement(options) {
      var tag = document.createElement("style");
      tag.setAttribute("data-emotion", options.key);
      if (options.nonce !== void 0) {
        tag.setAttribute("nonce", options.nonce);
      }
      tag.appendChild(document.createTextNode(""));
      tag.setAttribute("data-s", "");
      return tag;
    }
    var StyleSheet = /* @__PURE__ */ function() {
      function StyleSheet2(options) {
        var _this = this;
        this._insertTag = function(tag) {
          var before;
          if (_this.tags.length === 0) {
            if (_this.insertionPoint) {
              before = _this.insertionPoint.nextSibling;
            } else if (_this.prepend) {
              before = _this.container.firstChild;
            } else {
              before = _this.before;
            }
          } else {
            before = _this.tags[_this.tags.length - 1].nextSibling;
          }
          _this.container.insertBefore(tag, before);
          _this.tags.push(tag);
        };
        this.isSpeedy = options.speedy === void 0 ? false : options.speedy;
        this.tags = [];
        this.ctr = 0;
        this.nonce = options.nonce;
        this.key = options.key;
        this.container = options.container;
        this.prepend = options.prepend;
        this.insertionPoint = options.insertionPoint;
        this.before = null;
      }
      var _proto = StyleSheet2.prototype;
      _proto.hydrate = function hydrate(nodes) {
        nodes.forEach(this._insertTag);
      };
      _proto.insert = function insert(rule) {
        if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
          this._insertTag(createStyleElement(this));
        }
        var tag = this.tags[this.tags.length - 1];
        if (true) {
          var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
          if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
            console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
          }
          this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
        }
        if (this.isSpeedy) {
          var sheet = sheetForTag(tag);
          try {
            sheet.insertRule(rule, sheet.cssRules.length);
          } catch (e) {
            if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
              console.error('There was a problem inserting the following rule: "' + rule + '"', e);
            }
          }
        } else {
          tag.appendChild(document.createTextNode(rule));
        }
        this.ctr++;
      };
      _proto.flush = function flush() {
        this.tags.forEach(function(tag) {
          return tag.parentNode && tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.ctr = 0;
        if (true) {
          this._alreadyInsertedOrderInsensitiveRule = false;
        }
      };
      return StyleSheet2;
    }();
    exports.StyleSheet = StyleSheet;
  }
});

// node_modules/@emotion/sheet/dist/emotion-sheet.cjs.js
var require_emotion_sheet_cjs = __commonJS({
  "node_modules/@emotion/sheet/dist/emotion-sheet.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_sheet_cjs_dev();
    }
  }
});

// node_modules/stylis/dist/umd/stylis.js
var require_stylis = __commonJS({
  "node_modules/stylis/dist/umd/stylis.js"(exports, module) {
    (function(e, r) {
      typeof exports === "object" && typeof module !== "undefined" ? r(exports) : typeof define === "function" && define.amd ? define(["exports"], r) : (e = e || self, r(e.stylis = {}));
    })(exports, function(e) {
      "use strict";
      var r = "-ms-";
      var a = "-moz-";
      var c = "-webkit-";
      var t = "comm";
      var n = "rule";
      var s = "decl";
      var i = "@page";
      var u = "@media";
      var o = "@import";
      var f = "@charset";
      var l = "@viewport";
      var h = "@supports";
      var p = "@document";
      var v = "@namespace";
      var b = "@keyframes";
      var d = "@font-face";
      var m = "@counter-style";
      var w = "@font-feature-values";
      var k = Math.abs;
      var $ = String.fromCharCode;
      var g = Object.assign;
      function x(e2, r2) {
        return (((r2 << 2 ^ O(e2, 0)) << 2 ^ O(e2, 1)) << 2 ^ O(e2, 2)) << 2 ^ O(e2, 3);
      }
      function E(e2) {
        return e2.trim();
      }
      function y(e2, r2) {
        return (e2 = r2.exec(e2)) ? e2[0] : e2;
      }
      function T(e2, r2, a2) {
        return e2.replace(r2, a2);
      }
      function A(e2, r2) {
        return e2.indexOf(r2);
      }
      function O(e2, r2) {
        return e2.charCodeAt(r2) | 0;
      }
      function C(e2, r2, a2) {
        return e2.slice(r2, a2);
      }
      function M(e2) {
        return e2.length;
      }
      function S(e2) {
        return e2.length;
      }
      function R(e2, r2) {
        return r2.push(e2), e2;
      }
      function z(e2, r2) {
        return e2.map(r2).join("");
      }
      e.line = 1;
      e.column = 1;
      e.length = 0;
      e.position = 0;
      e.character = 0;
      e.characters = "";
      function N(r2, a2, c2, t2, n2, s2, i2) {
        return { value: r2, root: a2, parent: c2, type: t2, props: n2, children: s2, line: e.line, column: e.column, length: i2, return: "" };
      }
      function P(e2, r2) {
        return g(N("", null, null, "", null, null, 0), e2, { length: -e2.length }, r2);
      }
      function j() {
        return e.character;
      }
      function U() {
        e.character = e.position > 0 ? O(e.characters, --e.position) : 0;
        if (e.column--, e.character === 10)
          e.column = 1, e.line--;
        return e.character;
      }
      function _() {
        e.character = e.position < e.length ? O(e.characters, e.position++) : 0;
        if (e.column++, e.character === 10)
          e.column = 1, e.line++;
        return e.character;
      }
      function F() {
        return O(e.characters, e.position);
      }
      function I() {
        return e.position;
      }
      function L(r2, a2) {
        return C(e.characters, r2, a2);
      }
      function D(e2) {
        switch (e2) {
          case 0:
          case 9:
          case 10:
          case 13:
          case 32:
            return 5;
          case 33:
          case 43:
          case 44:
          case 47:
          case 62:
          case 64:
          case 126:
          case 59:
          case 123:
          case 125:
            return 4;
          case 58:
            return 3;
          case 34:
          case 39:
          case 40:
          case 91:
            return 2;
          case 41:
          case 93:
            return 1;
        }
        return 0;
      }
      function K(r2) {
        return e.line = e.column = 1, e.length = M(e.characters = r2), e.position = 0, [];
      }
      function V(r2) {
        return e.characters = "", r2;
      }
      function W(r2) {
        return E(L(e.position - 1, Z(r2 === 91 ? r2 + 2 : r2 === 40 ? r2 + 1 : r2)));
      }
      function Y(e2) {
        return V(G(K(e2)));
      }
      function B(r2) {
        while (e.character = F())
          if (e.character < 33)
            _();
          else
            break;
        return D(r2) > 2 || D(e.character) > 3 ? "" : " ";
      }
      function G(r2) {
        while (_())
          switch (D(e.character)) {
            case 0:
              R(J(e.position - 1), r2);
              break;
            case 2:
              R(W(e.character), r2);
              break;
            default:
              R($(e.character), r2);
          }
        return r2;
      }
      function H(r2, a2) {
        while (--a2 && _())
          if (e.character < 48 || e.character > 102 || e.character > 57 && e.character < 65 || e.character > 70 && e.character < 97)
            break;
        return L(r2, I() + (a2 < 6 && F() == 32 && _() == 32));
      }
      function Z(r2) {
        while (_())
          switch (e.character) {
            case r2:
              return e.position;
            case 34:
            case 39:
              if (r2 !== 34 && r2 !== 39)
                Z(e.character);
              break;
            case 40:
              if (r2 === 41)
                Z(r2);
              break;
            case 92:
              _();
              break;
          }
        return e.position;
      }
      function q(r2, a2) {
        while (_())
          if (r2 + e.character === 47 + 10)
            break;
          else if (r2 + e.character === 42 + 42 && F() === 47)
            break;
        return "/*" + L(a2, e.position - 1) + "*" + $(r2 === 47 ? r2 : _());
      }
      function J(r2) {
        while (!D(F()))
          _();
        return L(r2, e.position);
      }
      function Q(e2) {
        return V(X("", null, null, null, [""], e2 = K(e2), 0, [0], e2));
      }
      function X(e2, r2, a2, c2, t2, n2, s2, i2, u2) {
        var o2 = 0;
        var f2 = 0;
        var l2 = s2;
        var h2 = 0;
        var p2 = 0;
        var v2 = 0;
        var b2 = 1;
        var d2 = 1;
        var m2 = 1;
        var w2 = 0;
        var k2 = "";
        var g2 = t2;
        var x2 = n2;
        var E2 = c2;
        var y2 = k2;
        while (d2)
          switch (v2 = w2, w2 = _()) {
            case 40:
              if (v2 != 108 && y2.charCodeAt(l2 - 1) == 58) {
                if (A(y2 += T(W(w2), "&", "&\f"), "&\f") != -1)
                  m2 = -1;
                break;
              }
            case 34:
            case 39:
            case 91:
              y2 += W(w2);
              break;
            case 9:
            case 10:
            case 13:
            case 32:
              y2 += B(v2);
              break;
            case 92:
              y2 += H(I() - 1, 7);
              continue;
            case 47:
              switch (F()) {
                case 42:
                case 47:
                  R(re(q(_(), I()), r2, a2), u2);
                  break;
                default:
                  y2 += "/";
              }
              break;
            case 123 * b2:
              i2[o2++] = M(y2) * m2;
            case 125 * b2:
            case 59:
            case 0:
              switch (w2) {
                case 0:
                case 125:
                  d2 = 0;
                case 59 + f2:
                  if (p2 > 0 && M(y2) - l2)
                    R(p2 > 32 ? ae(y2 + ";", c2, a2, l2 - 1) : ae(T(y2, " ", "") + ";", c2, a2, l2 - 2), u2);
                  break;
                case 59:
                  y2 += ";";
                default:
                  R(E2 = ee(y2, r2, a2, o2, f2, t2, i2, k2, g2 = [], x2 = [], l2), n2);
                  if (w2 === 123)
                    if (f2 === 0)
                      X(y2, r2, E2, E2, g2, n2, l2, i2, x2);
                    else
                      switch (h2) {
                        case 100:
                        case 109:
                        case 115:
                          X(e2, E2, E2, c2 && R(ee(e2, E2, E2, 0, 0, t2, i2, k2, t2, g2 = [], l2), x2), t2, x2, l2, i2, c2 ? g2 : x2);
                          break;
                        default:
                          X(y2, E2, E2, E2, [""], x2, 0, i2, x2);
                      }
              }
              o2 = f2 = p2 = 0, b2 = m2 = 1, k2 = y2 = "", l2 = s2;
              break;
            case 58:
              l2 = 1 + M(y2), p2 = v2;
            default:
              if (b2 < 1) {
                if (w2 == 123)
                  --b2;
                else if (w2 == 125 && b2++ == 0 && U() == 125)
                  continue;
              }
              switch (y2 += $(w2), w2 * b2) {
                case 38:
                  m2 = f2 > 0 ? 1 : (y2 += "\f", -1);
                  break;
                case 44:
                  i2[o2++] = (M(y2) - 1) * m2, m2 = 1;
                  break;
                case 64:
                  if (F() === 45)
                    y2 += W(_());
                  h2 = F(), f2 = l2 = M(k2 = y2 += J(I())), w2++;
                  break;
                case 45:
                  if (v2 === 45 && M(y2) == 2)
                    b2 = 0;
              }
          }
        return n2;
      }
      function ee(e2, r2, a2, c2, t2, s2, i2, u2, o2, f2, l2) {
        var h2 = t2 - 1;
        var p2 = t2 === 0 ? s2 : [""];
        var v2 = S(p2);
        for (var b2 = 0, d2 = 0, m2 = 0; b2 < c2; ++b2)
          for (var w2 = 0, $2 = C(e2, h2 + 1, h2 = k(d2 = i2[b2])), g2 = e2; w2 < v2; ++w2)
            if (g2 = E(d2 > 0 ? p2[w2] + " " + $2 : T($2, /&\f/g, p2[w2])))
              o2[m2++] = g2;
        return N(e2, r2, a2, t2 === 0 ? n : u2, o2, f2, l2);
      }
      function re(e2, r2, a2) {
        return N(e2, r2, a2, t, $(j()), C(e2, 2, -2), 0);
      }
      function ae(e2, r2, a2, c2) {
        return N(e2, r2, a2, s, C(e2, 0, c2), C(e2, c2 + 1, -1), c2);
      }
      function ce(e2, t2) {
        switch (x(e2, t2)) {
          case 5103:
            return c + "print-" + e2 + e2;
          case 5737:
          case 4201:
          case 3177:
          case 3433:
          case 1641:
          case 4457:
          case 2921:
          case 5572:
          case 6356:
          case 5844:
          case 3191:
          case 6645:
          case 3005:
          case 6391:
          case 5879:
          case 5623:
          case 6135:
          case 4599:
          case 4855:
          case 4215:
          case 6389:
          case 5109:
          case 5365:
          case 5621:
          case 3829:
            return c + e2 + e2;
          case 5349:
          case 4246:
          case 4810:
          case 6968:
          case 2756:
            return c + e2 + a + e2 + r + e2 + e2;
          case 6828:
          case 4268:
            return c + e2 + r + e2 + e2;
          case 6165:
            return c + e2 + r + "flex-" + e2 + e2;
          case 5187:
            return c + e2 + T(e2, /(\w+).+(:[^]+)/, c + "box-$1$2" + r + "flex-$1$2") + e2;
          case 5443:
            return c + e2 + r + "flex-item-" + T(e2, /flex-|-self/, "") + e2;
          case 4675:
            return c + e2 + r + "flex-line-pack" + T(e2, /align-content|flex-|-self/, "") + e2;
          case 5548:
            return c + e2 + r + T(e2, "shrink", "negative") + e2;
          case 5292:
            return c + e2 + r + T(e2, "basis", "preferred-size") + e2;
          case 6060:
            return c + "box-" + T(e2, "-grow", "") + c + e2 + r + T(e2, "grow", "positive") + e2;
          case 4554:
            return c + T(e2, /([^-])(transform)/g, "$1" + c + "$2") + e2;
          case 6187:
            return T(T(T(e2, /(zoom-|grab)/, c + "$1"), /(image-set)/, c + "$1"), e2, "") + e2;
          case 5495:
          case 3959:
            return T(e2, /(image-set\([^]*)/, c + "$1$`$1");
          case 4968:
            return T(T(e2, /(.+:)(flex-)?(.*)/, c + "box-pack:$3" + r + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + c + e2 + e2;
          case 4095:
          case 3583:
          case 4068:
          case 2532:
            return T(e2, /(.+)-inline(.+)/, c + "$1$2") + e2;
          case 8116:
          case 7059:
          case 5753:
          case 5535:
          case 5445:
          case 5701:
          case 4933:
          case 4677:
          case 5533:
          case 5789:
          case 5021:
          case 4765:
            if (M(e2) - 1 - t2 > 6)
              switch (O(e2, t2 + 1)) {
                case 109:
                  if (O(e2, t2 + 4) !== 45)
                    break;
                case 102:
                  return T(e2, /(.+:)(.+)-([^]+)/, "$1" + c + "$2-$3$1" + a + (O(e2, t2 + 3) == 108 ? "$3" : "$2-$3")) + e2;
                case 115:
                  return ~A(e2, "stretch") ? ce(T(e2, "stretch", "fill-available"), t2) + e2 : e2;
              }
            break;
          case 4949:
            if (O(e2, t2 + 1) !== 115)
              break;
          case 6444:
            switch (O(e2, M(e2) - 3 - (~A(e2, "!important") && 10))) {
              case 107:
                return T(e2, ":", ":" + c) + e2;
              case 101:
                return T(e2, /(.+:)([^;!]+)(;|!.+)?/, "$1" + c + (O(e2, 14) === 45 ? "inline-" : "") + "box$3$1" + c + "$2$3$1" + r + "$2box$3") + e2;
            }
            break;
          case 5936:
            switch (O(e2, t2 + 11)) {
              case 114:
                return c + e2 + r + T(e2, /[svh]\w+-[tblr]{2}/, "tb") + e2;
              case 108:
                return c + e2 + r + T(e2, /[svh]\w+-[tblr]{2}/, "tb-rl") + e2;
              case 45:
                return c + e2 + r + T(e2, /[svh]\w+-[tblr]{2}/, "lr") + e2;
            }
            return c + e2 + r + e2 + e2;
        }
        return e2;
      }
      function te(e2, r2) {
        var a2 = "";
        var c2 = S(e2);
        for (var t2 = 0; t2 < c2; t2++)
          a2 += r2(e2[t2], t2, e2, r2) || "";
        return a2;
      }
      function ne(e2, r2, a2, c2) {
        switch (e2.type) {
          case o:
          case s:
            return e2.return = e2.return || e2.value;
          case t:
            return "";
          case b:
            return e2.return = e2.value + "{" + te(e2.children, c2) + "}";
          case n:
            e2.value = e2.props.join(",");
        }
        return M(a2 = te(e2.children, c2)) ? e2.return = e2.value + "{" + a2 + "}" : "";
      }
      function se(e2) {
        var r2 = S(e2);
        return function(a2, c2, t2, n2) {
          var s2 = "";
          for (var i2 = 0; i2 < r2; i2++)
            s2 += e2[i2](a2, c2, t2, n2) || "";
          return s2;
        };
      }
      function ie(e2) {
        return function(r2) {
          if (!r2.root) {
            if (r2 = r2.return)
              e2(r2);
          }
        };
      }
      function ue(e2, t2, i2, u2) {
        if (e2.length > -1) {
          if (!e2.return)
            switch (e2.type) {
              case s:
                e2.return = ce(e2.value, e2.length);
                break;
              case b:
                return te([P(e2, { value: T(e2.value, "@", "@" + c) })], u2);
              case n:
                if (e2.length)
                  return z(e2.props, function(t3) {
                    switch (y(t3, /(::plac\w+|:read-\w+)/)) {
                      case ":read-only":
                      case ":read-write":
                        return te([P(e2, { props: [T(t3, /:(read-\w+)/, ":" + a + "$1")] })], u2);
                      case "::placeholder":
                        return te([P(e2, { props: [T(t3, /:(plac\w+)/, ":" + c + "input-$1")] }), P(e2, { props: [T(t3, /:(plac\w+)/, ":" + a + "$1")] }), P(e2, { props: [T(t3, /:(plac\w+)/, r + "input-$1")] })], u2);
                    }
                    return "";
                  });
            }
        }
      }
      function oe(e2) {
        switch (e2.type) {
          case n:
            e2.props = e2.props.map(function(r2) {
              return z(Y(r2), function(r3, a2, c2) {
                switch (O(r3, 0)) {
                  case 12:
                    return C(r3, 1, M(r3));
                  case 0:
                  case 40:
                  case 43:
                  case 62:
                  case 126:
                    return r3;
                  case 58:
                    if (c2[++a2] === "global")
                      c2[a2] = "", c2[++a2] = "\f" + C(c2[a2], a2 = 1, -1);
                  case 32:
                    return a2 === 1 ? "" : r3;
                  default:
                    switch (a2) {
                      case 0:
                        e2 = r3;
                        return S(c2) > 1 ? "" : r3;
                      case (a2 = S(c2) - 1):
                      case 2:
                        return a2 === 2 ? r3 + e2 + e2 : r3 + e2;
                      default:
                        return r3;
                    }
                }
              });
            });
        }
      }
      e.CHARSET = f;
      e.COMMENT = t;
      e.COUNTER_STYLE = m;
      e.DECLARATION = s;
      e.DOCUMENT = p;
      e.FONT_FACE = d;
      e.FONT_FEATURE_VALUES = w;
      e.IMPORT = o;
      e.KEYFRAMES = b;
      e.MEDIA = u;
      e.MOZ = a;
      e.MS = r;
      e.NAMESPACE = v;
      e.PAGE = i;
      e.RULESET = n;
      e.SUPPORTS = h;
      e.VIEWPORT = l;
      e.WEBKIT = c;
      e.abs = k;
      e.alloc = K;
      e.append = R;
      e.assign = g;
      e.caret = I;
      e.char = j;
      e.charat = O;
      e.combine = z;
      e.comment = re;
      e.commenter = q;
      e.compile = Q;
      e.copy = P;
      e.dealloc = V;
      e.declaration = ae;
      e.delimit = W;
      e.delimiter = Z;
      e.escaping = H;
      e.from = $;
      e.hash = x;
      e.identifier = J;
      e.indexof = A;
      e.match = y;
      e.middleware = se;
      e.namespace = oe;
      e.next = _;
      e.node = N;
      e.parse = X;
      e.peek = F;
      e.prefix = ce;
      e.prefixer = ue;
      e.prev = U;
      e.replace = T;
      e.ruleset = ee;
      e.rulesheet = ie;
      e.serialize = te;
      e.sizeof = S;
      e.slice = L;
      e.stringify = ne;
      e.strlen = M;
      e.substr = C;
      e.token = D;
      e.tokenize = Y;
      e.tokenizer = G;
      e.trim = E;
      e.whitespace = B;
      Object.defineProperty(e, "__esModule", { value: true });
    });
  }
});

// node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.dev.js
var require_emotion_weak_memoize_cjs_dev = __commonJS({
  "node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var weakMemoize = function weakMemoize2(func) {
      var cache = /* @__PURE__ */ new WeakMap();
      return function(arg) {
        if (cache.has(arg)) {
          return cache.get(arg);
        }
        var ret = func(arg);
        cache.set(arg, ret);
        return ret;
      };
    };
    exports.default = weakMemoize;
  }
});

// node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js
var require_emotion_weak_memoize_cjs = __commonJS({
  "node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_weak_memoize_cjs_dev();
    }
  }
});

// node_modules/@emotion/memoize/dist/emotion-memoize.cjs.dev.js
var require_emotion_memoize_cjs_dev = __commonJS({
  "node_modules/@emotion/memoize/dist/emotion-memoize.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function memoize(fn) {
      var cache = /* @__PURE__ */ Object.create(null);
      return function(arg) {
        if (cache[arg] === void 0)
          cache[arg] = fn(arg);
        return cache[arg];
      };
    }
    exports.default = memoize;
  }
});

// node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js
var require_emotion_memoize_cjs = __commonJS({
  "node_modules/@emotion/memoize/dist/emotion-memoize.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_memoize_cjs_dev();
    }
  }
});

// node_modules/@emotion/cache/dist/emotion-cache.cjs.dev.js
var require_emotion_cache_cjs_dev = __commonJS({
  "node_modules/@emotion/cache/dist/emotion-cache.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var sheet = require_emotion_sheet_cjs();
    var stylis = require_stylis();
    var weakMemoize = require_emotion_weak_memoize_cjs();
    var memoize = require_emotion_memoize_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { "default": e };
    }
    var weakMemoize__default = /* @__PURE__ */ _interopDefault(weakMemoize);
    var memoize__default = /* @__PURE__ */ _interopDefault(memoize);
    var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
      var previous = 0;
      var character = 0;
      while (true) {
        previous = character;
        character = stylis.peek();
        if (previous === 38 && character === 12) {
          points[index] = 1;
        }
        if (stylis.token(character)) {
          break;
        }
        stylis.next();
      }
      return stylis.slice(begin, stylis.position);
    };
    var toRules = function toRules2(parsed, points) {
      var index = -1;
      var character = 44;
      do {
        switch (stylis.token(character)) {
          case 0:
            if (character === 38 && stylis.peek() === 12) {
              points[index] = 1;
            }
            parsed[index] += identifierWithPointTracking(stylis.position - 1, points, index);
            break;
          case 2:
            parsed[index] += stylis.delimit(character);
            break;
          case 4:
            if (character === 44) {
              parsed[++index] = stylis.peek() === 58 ? "&\f" : "";
              points[index] = parsed[index].length;
              break;
            }
          default:
            parsed[index] += stylis.from(character);
        }
      } while (character = stylis.next());
      return parsed;
    };
    var getRules = function getRules2(value, points) {
      return stylis.dealloc(toRules(stylis.alloc(value), points));
    };
    var fixedElements = /* @__PURE__ */ new WeakMap();
    var compat = function compat2(element) {
      if (element.type !== "rule" || !element.parent || element.length < 1) {
        return;
      }
      var value = element.value, parent = element.parent;
      var isImplicitRule = element.column === parent.column && element.line === parent.line;
      while (parent.type !== "rule") {
        parent = parent.parent;
        if (!parent)
          return;
      }
      if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
        return;
      }
      if (isImplicitRule) {
        return;
      }
      fixedElements.set(element, true);
      var points = [];
      var rules = getRules(value, points);
      var parentRules = parent.props;
      for (var i = 0, k = 0; i < rules.length; i++) {
        for (var j = 0; j < parentRules.length; j++, k++) {
          element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
        }
      }
    };
    var removeLabel = function removeLabel2(element) {
      if (element.type === "decl") {
        var value = element.value;
        if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
          element["return"] = "";
          element.value = "";
        }
      }
    };
    var ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
    var isIgnoringComment = function isIgnoringComment2(element) {
      return element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
    };
    var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache) {
      return function(element, index, children) {
        if (element.type !== "rule" || cache.compat)
          return;
        var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
        if (unsafePseudoClasses) {
          var isNested = element.parent === children[0];
          var commentContainer = isNested ? children[0].children : children;
          for (var i = commentContainer.length - 1; i >= 0; i--) {
            var node = commentContainer[i];
            if (node.line < element.line) {
              break;
            }
            if (node.column < element.column) {
              if (isIgnoringComment(node)) {
                return;
              }
              break;
            }
          }
          unsafePseudoClasses.forEach(function(unsafePseudoClass) {
            console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
          });
        }
      };
    };
    var isImportRule = function isImportRule2(element) {
      return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
    };
    var isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
      for (var i = index - 1; i >= 0; i--) {
        if (!isImportRule(children[i])) {
          return true;
        }
      }
      return false;
    };
    var nullifyElement = function nullifyElement2(element) {
      element.type = "";
      element.value = "";
      element["return"] = "";
      element.children = "";
      element.props = "";
    };
    var incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
      if (!isImportRule(element)) {
        return;
      }
      if (element.parent) {
        console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
        nullifyElement(element);
      } else if (isPrependedWithRegularRules(index, children)) {
        console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
        nullifyElement(element);
      }
    };
    var isBrowser = typeof document !== "undefined";
    var getServerStylisCache = isBrowser ? void 0 : weakMemoize__default["default"](function() {
      return memoize__default["default"](function() {
        var cache = {};
        return function(name) {
          return cache[name];
        };
      });
    });
    var defaultStylisPlugins = [stylis.prefixer];
    var createCache = function createCache2(options) {
      var key = options.key;
      if (!key) {
        throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
      }
      if (isBrowser && key === "css") {
        var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(ssrStyles, function(node) {
          var dataEmotionAttribute = node.getAttribute("data-emotion");
          if (dataEmotionAttribute.indexOf(" ") === -1) {
            return;
          }
          document.head.appendChild(node);
          node.setAttribute("data-s", "");
        });
      }
      var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
      if (true) {
        if (/[^a-z-]/.test(key)) {
          throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
        }
      }
      var inserted = {};
      var container;
      var nodesToHydrate = [];
      if (isBrowser) {
        container = options.container || document.head;
        Array.prototype.forEach.call(
          document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
          function(node) {
            var attrib = node.getAttribute("data-emotion").split(" ");
            for (var i = 1; i < attrib.length; i++) {
              inserted[attrib[i]] = true;
            }
            nodesToHydrate.push(node);
          }
        );
      }
      var _insert;
      var omnipresentPlugins = [compat, removeLabel];
      if (true) {
        omnipresentPlugins.push(createUnsafeSelectorsAlarm({
          get compat() {
            return cache.compat;
          }
        }), incorrectImportAlarm);
      }
      if (isBrowser) {
        var currentSheet;
        var finalizingPlugins = [stylis.stringify, true ? function(element) {
          if (!element.root) {
            if (element["return"]) {
              currentSheet.insert(element["return"]);
            } else if (element.value && element.type !== stylis.COMMENT) {
              currentSheet.insert(element.value + "{}");
            }
          }
        } : stylis.rulesheet(function(rule) {
          currentSheet.insert(rule);
        })];
        var serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
        var stylis$1 = function stylis$12(styles) {
          return stylis.serialize(stylis.compile(styles), serializer);
        };
        _insert = function insert(selector, serialized, sheet2, shouldCache) {
          currentSheet = sheet2;
          if (serialized.map !== void 0) {
            currentSheet = {
              insert: function insert2(rule) {
                sheet2.insert(rule + serialized.map);
              }
            };
          }
          stylis$1(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
          if (shouldCache) {
            cache.inserted[serialized.name] = true;
          }
        };
      } else {
        var _finalizingPlugins = [stylis.stringify];
        var _serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));
        var _stylis = function _stylis2(styles) {
          return stylis.serialize(stylis.compile(styles), _serializer);
        };
        var serverStylisCache = getServerStylisCache(stylisPlugins)(key);
        var getRules2 = function getRules3(selector, serialized) {
          var name = serialized.name;
          if (serverStylisCache[name] === void 0) {
            serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
          }
          return serverStylisCache[name];
        };
        _insert = function _insert2(selector, serialized, sheet2, shouldCache) {
          var name = serialized.name;
          var rules = getRules2(selector, serialized);
          if (cache.compat === void 0) {
            if (shouldCache) {
              cache.inserted[name] = true;
            }
            if (serialized.map !== void 0) {
              return rules + serialized.map;
            }
            return rules;
          } else {
            if (shouldCache) {
              cache.inserted[name] = rules;
            } else {
              return rules;
            }
          }
        };
      }
      var cache = {
        key,
        sheet: new sheet.StyleSheet({
          key,
          container,
          nonce: options.nonce,
          speedy: options.speedy,
          prepend: options.prepend,
          insertionPoint: options.insertionPoint
        }),
        nonce: options.nonce,
        inserted,
        registered: {},
        insert: _insert
      };
      cache.sheet.hydrate(nodesToHydrate);
      return cache;
    };
    exports.default = createCache;
  }
});

// node_modules/@emotion/cache/dist/emotion-cache.cjs.js
var require_emotion_cache_cjs = __commonJS({
  "node_modules/@emotion/cache/dist/emotion-cache.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_cache_cjs_dev();
    }
  }
});

// node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js
var require_emotion_hash_cjs_dev = __commonJS({
  "node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function murmur2(str) {
      var h = 0;
      var k, i = 0, len = str.length;
      for (; len >= 4; ++i, len -= 4) {
        k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
        k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
        k ^= k >>> 24;
        h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      }
      switch (len) {
        case 3:
          h ^= (str.charCodeAt(i + 2) & 255) << 16;
        case 2:
          h ^= (str.charCodeAt(i + 1) & 255) << 8;
        case 1:
          h ^= str.charCodeAt(i) & 255;
          h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      }
      h ^= h >>> 13;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      return ((h ^ h >>> 15) >>> 0).toString(36);
    }
    exports.default = murmur2;
  }
});

// node_modules/@emotion/hash/dist/emotion-hash.cjs.js
var require_emotion_hash_cjs = __commonJS({
  "node_modules/@emotion/hash/dist/emotion-hash.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_hash_cjs_dev();
    }
  }
});

// node_modules/@emotion/unitless/dist/emotion-unitless.cjs.dev.js
var require_emotion_unitless_cjs_dev = __commonJS({
  "node_modules/@emotion/unitless/dist/emotion-unitless.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var unitlessKeys = {
      animationIterationCount: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1
    };
    exports.default = unitlessKeys;
  }
});

// node_modules/@emotion/unitless/dist/emotion-unitless.cjs.js
var require_emotion_unitless_cjs = __commonJS({
  "node_modules/@emotion/unitless/dist/emotion-unitless.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_unitless_cjs_dev();
    }
  }
});

// node_modules/@emotion/serialize/dist/emotion-serialize.cjs.dev.js
var require_emotion_serialize_cjs_dev = __commonJS({
  "node_modules/@emotion/serialize/dist/emotion-serialize.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hashString = require_emotion_hash_cjs();
    var unitless = require_emotion_unitless_cjs();
    var memoize = require_emotion_memoize_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { "default": e };
    }
    var hashString__default = /* @__PURE__ */ _interopDefault(hashString);
    var unitless__default = /* @__PURE__ */ _interopDefault(unitless);
    var memoize__default = /* @__PURE__ */ _interopDefault(memoize);
    var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
    var hyphenateRegex = /[A-Z]|^ms/g;
    var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
    var isCustomProperty = function isCustomProperty2(property) {
      return property.charCodeAt(1) === 45;
    };
    var isProcessableValue = function isProcessableValue2(value) {
      return value != null && typeof value !== "boolean";
    };
    var processStyleName = /* @__PURE__ */ memoize__default["default"](function(styleName) {
      return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
    });
    var processStyleValue = function processStyleValue2(key, value) {
      switch (key) {
        case "animation":
        case "animationName": {
          if (typeof value === "string") {
            return value.replace(animationRegex, function(match, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
      }
      if (unitless__default["default"][key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
        return value + "px";
      }
      return value;
    };
    if (true) {
      contentValuePattern = /(var|attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
      contentValues = ["normal", "none", "initial", "inherit", "unset"];
      oldProcessStyleValue = processStyleValue;
      msPattern = /^-ms-/;
      hyphenPattern = /-(.)/g;
      hyphenatedCache = {};
      processStyleValue = function processStyleValue2(key, value) {
        if (key === "content") {
          if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
            throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
          }
        }
        var processed = oldProcessStyleValue(key, value);
        if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
          hyphenatedCache[key] = true;
          console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
            return _char.toUpperCase();
          }) + "?");
        }
        return processed;
      };
    }
    var contentValuePattern;
    var contentValues;
    var oldProcessStyleValue;
    var msPattern;
    var hyphenPattern;
    var hyphenatedCache;
    var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
    function handleInterpolation(mergedProps, registered, interpolation) {
      if (interpolation == null) {
        return "";
      }
      if (interpolation.__emotion_styles !== void 0) {
        if (interpolation.toString() === "NO_COMPONENT_SELECTOR") {
          throw new Error(noComponentSelectorMessage);
        }
        return interpolation;
      }
      switch (typeof interpolation) {
        case "boolean": {
          return "";
        }
        case "object": {
          if (interpolation.anim === 1) {
            cursor = {
              name: interpolation.name,
              styles: interpolation.styles,
              next: cursor
            };
            return interpolation.name;
          }
          if (interpolation.styles !== void 0) {
            var next = interpolation.next;
            if (next !== void 0) {
              while (next !== void 0) {
                cursor = {
                  name: next.name,
                  styles: next.styles,
                  next: cursor
                };
                next = next.next;
              }
            }
            var styles = interpolation.styles + ";";
            if (interpolation.map !== void 0) {
              styles += interpolation.map;
            }
            return styles;
          }
          return createStringFromObject(mergedProps, registered, interpolation);
        }
        case "function": {
          if (mergedProps !== void 0) {
            var previousCursor = cursor;
            var result = interpolation(mergedProps);
            cursor = previousCursor;
            return handleInterpolation(mergedProps, registered, result);
          } else if (true) {
            console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
          }
          break;
        }
        case "string":
          if (true) {
            var matched = [];
            var replaced = interpolation.replace(animationRegex, function(match, p1, p2) {
              var fakeVarName = "animation" + matched.length;
              matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
              return "${" + fakeVarName + "}";
            });
            if (matched.length) {
              console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
            }
          }
          break;
      }
      if (registered == null) {
        return interpolation;
      }
      var cached = registered[interpolation];
      return cached !== void 0 ? cached : interpolation;
    }
    function createStringFromObject(mergedProps, registered, obj) {
      var string = "";
      if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
        }
      } else {
        for (var _key in obj) {
          var value = obj[_key];
          if (typeof value !== "object") {
            if (registered != null && registered[value] !== void 0) {
              string += _key + "{" + registered[value] + "}";
            } else if (isProcessableValue(value)) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
            }
          } else {
            if (_key === "NO_COMPONENT_SELECTOR" && true) {
              throw new Error(noComponentSelectorMessage);
            }
            if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
              for (var _i = 0; _i < value.length; _i++) {
                if (isProcessableValue(value[_i])) {
                  string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
                }
              }
            } else {
              var interpolated = handleInterpolation(mergedProps, registered, value);
              switch (_key) {
                case "animation":
                case "animationName": {
                  string += processStyleName(_key) + ":" + interpolated + ";";
                  break;
                }
                default: {
                  if (_key === "undefined") {
                    console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                  }
                  string += _key + "{" + interpolated + "}";
                }
              }
            }
          }
        }
      }
      return string;
    }
    var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
    var sourceMapPattern;
    if (true) {
      sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
    }
    var cursor;
    var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
      if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
        return args[0];
      }
      var stringMode = true;
      var styles = "";
      cursor = void 0;
      var strings = args[0];
      if (strings == null || strings.raw === void 0) {
        stringMode = false;
        styles += handleInterpolation(mergedProps, registered, strings);
      } else {
        if (strings[0] === void 0) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles += strings[0];
      }
      for (var i = 1; i < args.length; i++) {
        styles += handleInterpolation(mergedProps, registered, args[i]);
        if (stringMode) {
          if (strings[i] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
          }
          styles += strings[i];
        }
      }
      var sourceMap;
      if (true) {
        styles = styles.replace(sourceMapPattern, function(match2) {
          sourceMap = match2;
          return "";
        });
      }
      labelPattern.lastIndex = 0;
      var identifierName = "";
      var match;
      while ((match = labelPattern.exec(styles)) !== null) {
        identifierName += "-" + match[1];
      }
      var name = hashString__default["default"](styles) + identifierName;
      if (true) {
        return {
          name,
          styles,
          map: sourceMap,
          next: cursor,
          toString: function toString() {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          }
        };
      }
      return {
        name,
        styles,
        next: cursor
      };
    };
    exports.serializeStyles = serializeStyles;
  }
});

// node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js
var require_emotion_serialize_cjs = __commonJS({
  "node_modules/@emotion/serialize/dist/emotion-serialize.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_serialize_cjs_dev();
    }
  }
});

// node_modules/@emotion/utils/dist/emotion-utils.cjs.dev.js
var require_emotion_utils_cjs_dev = __commonJS({
  "node_modules/@emotion/utils/dist/emotion-utils.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isBrowser = typeof document !== "undefined";
    function getRegisteredStyles(registered, registeredStyles, classNames) {
      var rawClassName = "";
      classNames.split(" ").forEach(function(className) {
        if (registered[className] !== void 0) {
          registeredStyles.push(registered[className] + ";");
        } else {
          rawClassName += className + " ";
        }
      });
      return rawClassName;
    }
    var registerStyles = function registerStyles2(cache, serialized, isStringTag) {
      var className = cache.key + "-" + serialized.name;
      if ((isStringTag === false || isBrowser === false && cache.compat !== void 0) && cache.registered[className] === void 0) {
        cache.registered[className] = serialized.styles;
      }
    };
    var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
      registerStyles(cache, serialized, isStringTag);
      var className = cache.key + "-" + serialized.name;
      if (cache.inserted[serialized.name] === void 0) {
        var stylesForSSR = "";
        var current = serialized;
        do {
          var maybeStyles = cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
          if (!isBrowser && maybeStyles !== void 0) {
            stylesForSSR += maybeStyles;
          }
          current = current.next;
        } while (current !== void 0);
        if (!isBrowser && stylesForSSR.length !== 0) {
          return stylesForSSR;
        }
      }
    };
    exports.getRegisteredStyles = getRegisteredStyles;
    exports.insertStyles = insertStyles;
    exports.registerStyles = registerStyles;
  }
});

// node_modules/@emotion/utils/dist/emotion-utils.cjs.js
var require_emotion_utils_cjs = __commonJS({
  "node_modules/@emotion/utils/dist/emotion-utils.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_utils_cjs_dev();
    }
  }
});

// node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.cjs.dev.js
var require_emotion_css_create_instance_cjs_dev = __commonJS({
  "node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var createCache = require_emotion_cache_cjs();
    var serialize = require_emotion_serialize_cjs();
    var utils = require_emotion_utils_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { "default": e };
    }
    var createCache__default = /* @__PURE__ */ _interopDefault(createCache);
    function insertWithoutScoping(cache, serialized) {
      if (cache.inserted[serialized.name] === void 0) {
        return cache.insert("", serialized, cache.sheet, true);
      }
    }
    function merge(registered, css3, className) {
      var registeredStyles = [];
      var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);
      if (registeredStyles.length < 2) {
        return className;
      }
      return rawClassName + css3(registeredStyles);
    }
    var createEmotion = function createEmotion2(options) {
      var cache = createCache__default["default"](options);
      cache.sheet.speedy = function(value) {
        if (this.ctr !== 0) {
          throw new Error("speedy must be changed before any rules are inserted");
        }
        this.isSpeedy = value;
      };
      cache.compat = true;
      var css3 = function css4() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var serialized = serialize.serializeStyles(args, cache.registered, void 0);
        utils.insertStyles(cache, serialized, false);
        return cache.key + "-" + serialized.name;
      };
      var keyframes = function keyframes2() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var serialized = serialize.serializeStyles(args, cache.registered);
        var animation = "animation-" + serialized.name;
        insertWithoutScoping(cache, {
          name: serialized.name,
          styles: "@keyframes " + animation + "{" + serialized.styles + "}"
        });
        return animation;
      };
      var injectGlobal2 = function injectGlobal3() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var serialized = serialize.serializeStyles(args, cache.registered);
        insertWithoutScoping(cache, serialized);
      };
      var cx = function cx2() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return merge(cache.registered, css3, classnames(args));
      };
      return {
        css: css3,
        cx,
        injectGlobal: injectGlobal2,
        keyframes,
        hydrate: function hydrate(ids) {
          ids.forEach(function(key) {
            cache.inserted[key] = true;
          });
        },
        flush: function flush() {
          cache.registered = {};
          cache.inserted = {};
          cache.sheet.flush();
        },
        sheet: cache.sheet,
        cache,
        getRegisteredStyles: utils.getRegisteredStyles.bind(null, cache.registered),
        merge: merge.bind(null, cache.registered, css3)
      };
    };
    var classnames = function classnames2(args) {
      var cls = "";
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (arg == null)
          continue;
        var toAdd = void 0;
        switch (typeof arg) {
          case "boolean":
            break;
          case "object": {
            if (Array.isArray(arg)) {
              toAdd = classnames2(arg);
            } else {
              toAdd = "";
              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += " ");
                  toAdd += k;
                }
              }
            }
            break;
          }
          default: {
            toAdd = arg;
          }
        }
        if (toAdd) {
          cls && (cls += " ");
          cls += toAdd;
        }
      }
      return cls;
    };
    exports.default = createEmotion;
  }
});

// node_modules/@emotion/css/dist/emotion-css.cjs.dev.js
var require_emotion_css_cjs_dev = __commonJS({
  "node_modules/@emotion/css/dist/emotion-css.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require_emotion_cache_cjs();
    require_emotion_serialize_cjs();
    require_emotion_utils_cjs();
    var createInstance_dist_emotionCssCreateInstance = require_emotion_css_create_instance_cjs_dev();
    var _createEmotion = createInstance_dist_emotionCssCreateInstance["default"]({
      key: "css"
    });
    var flush = _createEmotion.flush;
    var hydrate = _createEmotion.hydrate;
    var cx = _createEmotion.cx;
    var merge = _createEmotion.merge;
    var getRegisteredStyles = _createEmotion.getRegisteredStyles;
    var injectGlobal2 = _createEmotion.injectGlobal;
    var keyframes = _createEmotion.keyframes;
    var css3 = _createEmotion.css;
    var sheet = _createEmotion.sheet;
    var cache = _createEmotion.cache;
    exports.cache = cache;
    exports.css = css3;
    exports.cx = cx;
    exports.flush = flush;
    exports.getRegisteredStyles = getRegisteredStyles;
    exports.hydrate = hydrate;
    exports.injectGlobal = injectGlobal2;
    exports.keyframes = keyframes;
    exports.merge = merge;
    exports.sheet = sheet;
  }
});

// node_modules/@emotion/css/dist/emotion-css.cjs.js
var require_emotion_css_cjs = __commonJS({
  "node_modules/@emotion/css/dist/emotion-css.cjs.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_css_cjs_dev();
    }
  }
});

// src/client.js
var import_css = __toESM(require_emotion_css_cjs(), 1);

// node_modules/@styled-system/css/dist/index.esm.js
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var get = function get2(obj, key, def, p, undef) {
  key = key && key.split ? key.split(".") : [key];
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }
  return obj === undef ? def : obj;
};
var defaultBreakpoints = [40, 52, 64].map(function(n) {
  return n + "em";
});
var defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72]
};
var aliases = {
  bg: "backgroundColor",
  m: "margin",
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",
  ml: "marginLeft",
  mx: "marginX",
  my: "marginY",
  p: "padding",
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pl: "paddingLeft",
  px: "paddingX",
  py: "paddingY"
};
var multiples = {
  marginX: ["marginLeft", "marginRight"],
  marginY: ["marginTop", "marginBottom"],
  paddingX: ["paddingLeft", "paddingRight"],
  paddingY: ["paddingTop", "paddingBottom"],
  size: ["width", "height"]
};
var scales = {
  color: "colors",
  backgroundColor: "colors",
  borderColor: "colors",
  margin: "space",
  marginTop: "space",
  marginRight: "space",
  marginBottom: "space",
  marginLeft: "space",
  marginX: "space",
  marginY: "space",
  padding: "space",
  paddingTop: "space",
  paddingRight: "space",
  paddingBottom: "space",
  paddingLeft: "space",
  paddingX: "space",
  paddingY: "space",
  top: "space",
  right: "space",
  bottom: "space",
  left: "space",
  gridGap: "space",
  gridColumnGap: "space",
  gridRowGap: "space",
  gap: "space",
  columnGap: "space",
  rowGap: "space",
  fontFamily: "fonts",
  fontSize: "fontSizes",
  fontWeight: "fontWeights",
  lineHeight: "lineHeights",
  letterSpacing: "letterSpacings",
  border: "borders",
  borderTop: "borders",
  borderRight: "borders",
  borderBottom: "borders",
  borderLeft: "borders",
  borderWidth: "borderWidths",
  borderStyle: "borderStyles",
  borderRadius: "radii",
  borderTopRightRadius: "radii",
  borderTopLeftRadius: "radii",
  borderBottomRightRadius: "radii",
  borderBottomLeftRadius: "radii",
  borderTopWidth: "borderWidths",
  borderTopColor: "colors",
  borderTopStyle: "borderStyles",
  borderBottomWidth: "borderWidths",
  borderBottomColor: "colors",
  borderBottomStyle: "borderStyles",
  borderLeftWidth: "borderWidths",
  borderLeftColor: "colors",
  borderLeftStyle: "borderStyles",
  borderRightWidth: "borderWidths",
  borderRightColor: "colors",
  borderRightStyle: "borderStyles",
  outlineColor: "colors",
  boxShadow: "shadows",
  textShadow: "shadows",
  zIndex: "zIndices",
  width: "sizes",
  minWidth: "sizes",
  maxWidth: "sizes",
  height: "sizes",
  minHeight: "sizes",
  maxHeight: "sizes",
  flexBasis: "sizes",
  size: "sizes",
  fill: "colors",
  stroke: "colors"
};
var positiveOrNegative = function positiveOrNegative2(scale, value) {
  if (typeof value !== "number" || value >= 0) {
    return get(scale, value, value);
  }
  var absolute = Math.abs(value);
  var n = get(scale, absolute, absolute);
  if (typeof n === "string")
    return "-" + n;
  return n * -1;
};
var transforms = ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "top", "bottom", "left", "right"].reduce(function(acc, curr) {
  var _extends2;
  return _extends({}, acc, (_extends2 = {}, _extends2[curr] = positiveOrNegative, _extends2));
}, {});
var responsive = function responsive2(styles) {
  return function(theme) {
    var next = {};
    var breakpoints = get(theme, "breakpoints", defaultBreakpoints);
    var mediaQueries = [null].concat(breakpoints.map(function(n) {
      return "@media screen and (min-width: " + n + ")";
    }));
    for (var key in styles) {
      var value = typeof styles[key] === "function" ? styles[key](theme) : styles[key];
      if (value == null)
        continue;
      if (!Array.isArray(value)) {
        next[key] = value;
        continue;
      }
      for (var i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
        var media = mediaQueries[i];
        if (!media) {
          next[key] = value[i];
          continue;
        }
        next[media] = next[media] || {};
        if (value[i] == null)
          continue;
        next[media][key] = value[i];
      }
    }
    return next;
  };
};
var css = function css2(args) {
  return function(props) {
    if (props === void 0) {
      props = {};
    }
    var theme = _extends({}, defaultTheme, {}, props.theme || props);
    var result = {};
    var obj = typeof args === "function" ? args(theme) : args;
    var styles = responsive(obj)(theme);
    for (var key in styles) {
      var x = styles[key];
      var val = typeof x === "function" ? x(theme) : x;
      if (key === "variant") {
        var variant = css2(get(theme, val))(theme);
        result = _extends({}, result, {}, variant);
        continue;
      }
      if (val && typeof val === "object") {
        result[key] = css2(val)(theme);
        continue;
      }
      var prop = get(aliases, key, key);
      var scaleName = get(scales, prop);
      var scale = get(theme, scaleName, get(theme, prop, {}));
      var transform = get(transforms, prop, get);
      var value = transform(scale, val, val);
      if (multiples[prop]) {
        var dirs = multiples[prop];
        for (var i = 0; i < dirs.length; i++) {
          result[dirs[i]] = value;
        }
      } else {
        result[prop] = value;
      }
    }
    return result;
  };
};

// src/theme.js
var theme_default = {
  fonts: {
    body: `system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, sans-serif`,
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace"
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#c31"
  },
  space: {
    sm: "1rem",
    md: "2rem"
  }
};

// src/client.js
var base = css({ fontFamily: "body" })(theme_default);
console.log(base);
(0, import_css.injectGlobal)(base);
//# sourceMappingURL=client-VM5XEBMD.js.map
