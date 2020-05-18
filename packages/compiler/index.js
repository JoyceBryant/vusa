(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("atom-expression-compiler");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("escape-quotes");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@babel/code-frame");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("to-single-quotes");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("vue-template-compiler");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("san");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "compile", function() { return /* binding */ compile; });

// EXTERNAL MODULE: external "@babel/code-frame"
var code_frame_ = __webpack_require__(3);

// EXTERNAL MODULE: external "atom-expression-compiler"
var external_atom_expression_compiler_ = __webpack_require__(1);

// EXTERNAL MODULE: external "escape-quotes"
var external_escape_quotes_ = __webpack_require__(2);
var external_escape_quotes_default = /*#__PURE__*/__webpack_require__.n(external_escape_quotes_);

// CONCATENATED MODULE: ./src/compiler/expression-transformer.js
/**
 * @file vue 的 expression 转 san，主要是处理 es6 语法
 * @author cxtom(cxtom2008@gmail.com)
 */



const mark = '__vusa__filter__mark__';
const reg = new RegExp(mark, 'g');
const validUnaryOperator = new Set(['+', '-', '!']);
const validBinaryOperator = new Set(['+', '-', '*', '/', '%', '>', '<', '>=', '<=', '==', '===', '!=', '!==']);
const validLogicalOperator = new Set(['&&', '||']);
const noBracketTypes = new Set(['ArrayExpression', 'Literal', 'ObjectExpression', 'Identifier', 'MemberExpression', 'CallExpression', 'TemplateExpression', 'UnaryExpression']);

function wrapBacket(code, node) {
  if (noBracketTypes.has(node.type)) {
    return code;
  }

  if (node.type === 'BinaryExpression' && ['==', '===', '!=', '!=='].includes(node.operator)) {
    return code;
  }

  return `(${code})`;
}

const Syntax = {
  ArrayExpression: 'ArrayExpression',
  Literal: 'Literal',
  ObjectExpression: 'ObjectExpression',
  UnaryExpression: 'UnaryExpression',
  Property: 'Property',
  VueExpression: 'VueExpression',
  VueFilter: 'VueFilter',
  Identifier: 'Identifier',
  MemberExpression: 'MemberExpression',
  BinaryExpression: 'BinaryExpression',
  LogicalExpression: 'LogicalExpression',
  ConditionalExpression: 'ConditionalExpression',
  CallExpression: 'CallExpression',
  TemplateExpression: 'TemplateExpression'
};
const VisitorKeys = {
  ArrayExpression: ['elements'],
  ObjectExpression: ['properties'],
  UnaryExpression: ['argument'],
  Property: ['value'],
  MemberExpression: ['object', 'property'],
  BinaryExpression: ['left', 'right'],
  LogicalExpression: ['left', 'right'],
  ConditionalExpression: ['test', 'consequent', 'alternate'],
  CallExpression: ['arguments'],
  VueExpression: ['expression', 'filters'],
  VueFilter: ['arguments'],
  TemplateExpression: ['expressions']
};

function expression_transformer_toString(a) {
  if (typeof a === 'number') {
    return a + '';
  }

  if (typeof a === 'string') {
    return `'${external_escape_quotes_default()(a)}'`;
  }

  return JSON.stringify(a);
}

const CodeGeneragor = {
  VueExpression(node, [expression, filters]) {
    let code = filters.reduce((pre, filter) => {
      return filter.code.replace(reg, pre);
    }, expression.code);
    return this.ret(code);
  },

  VueFilter(node, [args]) {
    let hasArgs = args.length > 0;
    return this.ret(`${mark} | ${node.name}` + (hasArgs ? `(${args.map(a => a.code).join(', ')})` : ''));
  },

  Identifier(node, results, ref) {
    return this.ret(node.name);
  },

  MemberExpression(node, results) {
    let [object, property] = results;

    if (node.computed) {
      return this.ret(`${object.code}[${property.code}]`);
    }

    if (property.code === 'length') {
      if (object.type === 'string') {
        if (object.isStatic) {
          let len = object.value.length;
          return this.ret(len + '', 'number', len);
        }

        return this.ret(`${object.code}.length`, 'number');
      }
    }

    return this.ret(`${object.code}.${property.code}`);
  },

  BinaryExpression(node, [left, right], ref) {
    if (!validBinaryOperator.has(node.operator)) {
      this.error(`invalid binary operator "${node.operator}"`, node);
    }

    if (left.isStatic && right.isStatic) {
      let value = new Function(`return ${left.code} ${node.operator} ${right.code}`)();
      return this.ret(expression_transformer_toString(value), getType(value), value);
    }

    let code = `${wrapBacket(left.code, node.left)}${node.operator}${wrapBacket(right.code, node.right)}`;
    return this.ret(code);
  },

  LogicalExpression(node, [left, right]) {
    if (!validLogicalOperator.has(node.operator)) {
      this.error(`invalid logical operator "${node.operator}"`, node);
    }

    if (left.isStatic && right.isStatic) {
      let value = new Function(`return ${left.code}${node.operator}${right.code}`)();
      return this.ret(expression_transformer_toString(value), getType(value), value);
    }

    let code = `${wrapBacket(left.code, node.left)}${node.operator}${wrapBacket(right.code, node.right)}`;
    return this.ret(code);
  },

  ConditionalExpression(node, [test, consequent, alternate]) {
    if (test.isStatic) {
      return test.value ? consequent : alternate;
    }

    let testCode = wrapBacket(test.code, node.test);
    let consequentCode = wrapBacket(consequent.code, node.consequent);
    let alternateCode = wrapBacket(alternate.code, node.alternate);
    return this.ret(`${testCode}?${consequentCode}:${alternateCode}`);
  },

  CallExpression(node, [args]) {
    return this.ret(`${node.callee.name}(${args.map(a => a.code).join(', ')})`);
  },

  TemplateExpression(node, [expressions]) {
    return this.ret(`(${expressions.map(({
      code
    }, i) => wrapBacket(code, node.expressions[i])).join('+')})`, 'string');
  },

  ArrayExpression(node, results) {
    let result = results[0];
    return this.ret(`[${result.map(c => c.code).join(', ')}]`, 'array');
  },

  Literal(node) {
    return this.ret(this.varExport(node.value), getType(node.value), node.value);
  },

  UnaryExpression(node, results) {
    if (!validUnaryOperator.has(node.operator)) {
      this.error(`unknow unary operator "${node.operator}"`, node);
    }

    let result = results[0];

    if (result.isStatic) {
      let value = new Function(`return ${node.operator}${result.code}`)();
      let stringify = expression_transformer_toString(value);
      return this.ret(stringify, getType(value), value);
    }

    return this.ret(`${node.operator}${result.code}`);
  },

  ObjectExpression(node, results) {
    if (node.hasComputed) {
      let code = '_ex(';
      let current;
      let prev;

      for (let i = 0, len = node.properties.length; i < len; i++) {
        const property = node.properties[i];
        prev = current;
        current = !!property.computed;

        if (current && prev === false) {
          code += '},';
        }

        if (current && !prev) {
          code += '_ocp([';
        }

        if (!current && prev) {
          code += ']),{';
        }

        if (!current && prev == null) {
          code += '{';
        }

        if (current === prev) {
          code += ',';
        }

        code += results[0][i].code;
      }

      code += current ? ']))' : '})';
      return this.ret(code);
    }

    let result = results[0];
    return this.ret(`{${result.map(c => c.code).join(',')}} `, 'object');
  },

  Property(node, results, ref) {
    if (node.computed) {
      ref.hasComputed = true;
      let keyCode = this.traverse(node.key, node).code;
      return this.ret(`{k:${keyCode},v:${results[0].code}}`);
    }

    let keyCode = this.genPropertyKey(node.key).code;
    return this.ret(`${keyCode}:${results[0].code}`);
  }

};

function getType(obj) {
  let typeStr = Object.prototype.toString.call(obj);
  return typeStr.substring(8, typeStr.length - 1).toLowerCase();
}

class expression_transformer_CodeGen {
  constructor({
    code
  }) {
    this.syntax = Syntax;
    this.keys = VisitorKeys;
    this.generater = CodeGeneragor;
    this.code = code;
  }

  error(message, node) {
    message = `[vusa expression parser] (${node.location.start.line}:${node.location.start.column}) : ${message}`;
    let codeFrame = Object(code_frame_["codeFrameColumns"])(this.code, node.location, {
      highlightCode: true
    });
    message += `\n${codeFrame}`;
    throw new Error(message);
  }

  traverse(node, ref) {
    let syntax = this.syntax[node.type];

    if (node === ref) {
      this.root = node;
    }

    node.ref = ref; // 对象的 key 值特殊处理一下

    if (!syntax) {
      this.error(`Unknown node type "${node.type}" was found when parsing "${node.name}"`, node);
    }

    let visitorKeys = this.keys[node.type] || [];
    let keyResults = visitorKeys.map(key => {
      let element = node[key];
      let result = null;

      if (this.isNode(element)) {
        result = this.traverse(element, node);
      } else if (Array.isArray(element)) {
        result = element.map(ele => this.traverse(ele, node));
      } else {
        this.error(`Unknown VisitorKey type "${typeof element}" was found when parsing ${element.name}`, element);
      }

      return result;
    });
    return this.generate(node, keyResults, ref);
  }

  generate(node, ...args) {
    return this.generater[node.type].apply(this, [node, ...args]);
  }

  genPropertyKey(node) {
    let code;

    switch (node.type) {
      case 'Identifier':
        return this.ret(node.name, 'string', node.name);

      case 'Literal':
        code = expression_transformer_toString(String(node.value));
        return this.ret(code, 'string', String(node.value));

      default:
        this.error(`invalid property key type "${node.type}"`, node);
    }
  }

  isNode(node) {
    if (node == null) {
      return false;
    }

    return typeof node === 'object' && typeof node.type === 'string';
  }

  ret(code, type, value) {
    return {
      code,
      type,
      value,
      isStatic: arguments.length > 2
    };
  }

  varExport(data) {
    return expression_transformer_toString(data);
  }

}

/* harmony default export */ var expression_transformer = (function (code) {
  if (!code) {
    return {
      code: ''
    };
  }

  let node;

  try {
    node = Object(external_atom_expression_compiler_["parse"])(code, {
      startRule: 'VueExpression'
    });
  } catch (e) {
    throw new Error(`SyntaxError is found when parsing code "${code}", ${e.stack}`);
  }

  let codegen = new expression_transformer_CodeGen({
    code
  });
  return {
    ast: node.expression,
    ...codegen.traverse(node, node)
  };
});
// CONCATENATED MODULE: ./src/compiler/modules/class.js
/**
 * @file class
 * @author cxtom(cxtom2008@gmail.com)
 */

const bindKeys = [':class', 'v-bind:class'];

function postTransformNode(node) {
  if (node.type === 1 && node.classBinding) {
    const staticClass = node.attrsMap.class || '';
    const classBinding = expression_transformer(node.classBinding).code;
    node.attrsMap.class = `{{ _mc('${staticClass}', ${classBinding}) }}`;
    bindKeys.forEach(key => delete node.attrsMap[key]);
  }
}

/* harmony default export */ var modules_class = ({
  postTransformNode
});
// EXTERNAL MODULE: external "to-single-quotes"
var external_to_single_quotes_ = __webpack_require__(4);
var external_to_single_quotes_default = /*#__PURE__*/__webpack_require__.n(external_to_single_quotes_);

// CONCATENATED MODULE: ./src/compiler/modules/style.js
/**
 * @file style
 * @author cxtom(cxtom2008@gmail.com)
 */


const style_bindKeys = [':style', 'v-bind:style', 'v-show'];

function style_postTransformNode(node) {
  const vShow = node.attrsMap['v-show'];

  if (node.type === 1 && (node.styleBinding || vShow)) {
    const staticStyle = node.staticStyle || '\'\'';
    const styleBinding = node.styleBinding ? expression_transformer(node.styleBinding).code : '{}'; // eslint-disable-next-line max-len

    node.attrsMap.style = `{{ _ms(${external_to_single_quotes_default()(staticStyle)}, ${styleBinding}${vShow ? `, ${expression_transformer(vShow).code}` : ''}) }}`;
    style_bindKeys.forEach(key => delete node.attrsMap[key]);
  }
}

/* harmony default export */ var style = ({
  postTransformNode: style_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/bind.js
/**
 * @file bind
 * @author cxtom(cxtom2008@gmail.com)
 */

const reBind = /^(v-bind)?\:/;

function bind_postTransformNode(node) {
  if (node.type !== 1) {
    return;
  }

  const keys = Object.keys(node.attrsMap).filter(n => reBind.test(n));

  for (const key of keys) {
    const value = node.attrsMap[key];
    delete node.attrsMap[key];
    const ret = expression_transformer(value);
    const code = ret.code;
    node.attrsMap[key.replace(reBind, '')] = `{{ ${code} }}`;
  }

  if (node.attrsMap['v-bind']) {
    const vBind = node.attrsMap['v-bind'];
    node.attrsMap['s-bind'] = `{{ ${expression_transformer(vBind).code} }}`;
    delete node.attrsMap['v-bind'];
  }
}

/* harmony default export */ var bind = ({
  postTransformNode: bind_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/if.js
/**
 * @file if
 * @author cxtom(cxtom2008@gmail.com)
 */


function if_postTransformNode(node) {
  if (node.type !== 1) {
    return;
  }

  if (node.if) {
    node.attrsMap['s-if'] = expression_transformer(node.if).code;
    delete node.attrsMap['v-if'];
  }

  if (node.elseif) {
    node.attrsMap['s-else-if'] = expression_transformer(node.elseif).code;
    delete node.attrsMap['v-else-if'];
  }

  if (node.else) {
    node.attrsMap['s-else'] = node.else;
    delete node.attrsMap['v-else'];
  }
}

/* harmony default export */ var modules_if = ({
  postTransformNode: if_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/for.js
/**
 * @file for
 * @author cxtom(cxtom2008@gmail.com)
 */


function for_postTransformNode(node) {
  if (node.type !== 1 || !node.for) {
    return;
  }

  let fr = node.alias;

  if (node.iterator1) {
    fr += `,${node.iterator1}`;
  }

  fr += ` in _l(${node.for})`;

  if (node.key) {
    const trackByExpr = expression_transformer(node.key); // san 只支持变量

    fr += trackByExpr.ast.type === 'Identifier' ? ` trackBy ${node.key}` : '';
  }

  node.attrsMap['s-for'] = fr;
  delete node.attrsMap['v-for'];
  delete node.attrsMap['key'];
  delete node.attrsMap[':key'];
  delete node.attrsMap['v-bind:key'];
}

/* harmony default export */ var modules_for = ({
  postTransformNode: for_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/event.js
/**
 * @file event
 * @author cxtom(cxtom2008@gmail.com)
 */

const reEvent = /^(@|v-on:)/;

function event_postTransformNode(node) {
  const eventAttrs = node.attrsList.filter(n => reEvent.test(n.name));

  for (const attr of eventAttrs) {
    delete node.attrsMap[attr.name];
    const [name, ...modifiers] = attr.name.split('.');
    const eventHandler = attr.value ? expression_transformer(attr.value).code : '_noop';
    node.attrsMap[`on-${name.replace(reEvent, '')}`] = `${modifiers.map(m => `${m}:`).join('')}${eventHandler}`;
  }
}

/* harmony default export */ var modules_event = ({
  postTransformNode: event_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/html.js
/**
 * @file class
 * @author cxtom(cxtom2008@gmail.com)
 */
function html_postTransformNode(node) {
  if (node.attrsMap && node.attrsMap['v-dangerous-html']) {
    const dir = node.directives.find(d => d.name === 'dangerous-html');
    dir.name = 'html';
    dir.value = node.attrsMap['v-html'] = node.attrsMap['v-dangerous-html'];
    delete node.attrsMap['v-dangerous-html'];
  }

  if (node.attrsMap && node.attrsMap['v-safe-html']) {
    const dir = node.directives.find(d => d.name === 'safe-html');
    dir.name = 'html';
    dir.value = node.attrsMap['v-html'] = `_sf(${node.attrsMap['v-safe-html']})`;
    delete node.attrsMap['v-safe-html'];
  }

  if (node.type === 1 && node.attrsMap['v-html']) {
    const value = node.directives.find(d => d.name === 'html').value;
    delete node.attrsMap['v-html'];
    node.attrsMap['s-html'] = `{{ ${value} }}`;
    node.children = [];
  }

  if (node.type === 1 && node.attrsMap['v-text']) {
    const value = node.directives.find(d => d.name === 'text').value;
    delete node.attrsMap['v-text'];
    node.children = [{
      type: 2,
      text: `{{ ${value} }}`
    }];
  }
}

/* harmony default export */ var modules_html = ({
  postTransformNode: html_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/ref.js
/**
 * @file ref
 * @author cxtom(cxtom2008@gmail.com)
 */
function ref_postTransformNode(node, options) {
  if (node.type !== 1 || !node.attrsMap.ref && !node.attrsMap[':ref']) {
    return;
  }

  const ref = node.attrsMap.ref;

  if (ref) {
    delete node.attrsMap.ref;
    node.attrsMap['s-ref'] = ref;
    const info = {
      name: ref,
      root: node.parent ? undefined : 1
    };
    options.refs.push(info);
  }

  const bindRef = node.attrsMap[':ref'];

  if (bindRef) {
    delete node.attrsMap[':ref'];
    node.attrsMap['s-ref'] = `{{ ${bindRef} }}`;
  }
}

/* harmony default export */ var ref = ({
  postTransformNode: ref_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/dynamic-component.js
/**
 * @file component :is
 * @author cxtom(cxtom2008@gmail.com)
 */


function dynamic_component_postTransformNode(node, options) {
  if (!(node.type === 1 && node.tag === 'component')) {
    return;
  }

  let is = node.attrsMap.is;
  delete node.attrsMap.is;

  if (!is.startsWith('{{')) {
    node.tag = node.attrsMap.is;
    return;
  }

  const value = is.slice(2, is.length - 2).trim();
  const expr = Object(external_atom_expression_compiler_["parse"])(value, {
    startRule: 'VueExpression'
  });

  if (node.if || node.elseif || node.else) {
    options.error('dynamic component can not use with v-if.');
    return;
  }

  if (expr.expression.type === 'ConditionalExpression' && expr.expression.consequent.type === 'Literal' && expr.expression.alternate.type === 'Literal') {
    const testLocation = expr.expression.test.location;
    const test = value.slice(testLocation.start.offset, testLocation.end.offset);
    const attrs = { ...node.attrsMap,
      's-else': ''
    };
    node.tag = expr.expression.consequent.value;
    node.attrsMap['s-if'] = test;
    node.ifConditions = [{
      exp: test,
      block: node
    }, {
      block: { ...node,
        attrsMap: attrs,
        tag: expr.expression.alternate.value
      }
    }];
  }
}

/* harmony default export */ var dynamic_component = ({
  postTransformNode: dynamic_component_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/constant.js
/**
 * @file constants
 * @author cxtom(cxtom2008@gmail.com)
 */

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
const singleTag = {
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};
const booleanAttr = {
  allowfullscreen: true,
  async: true,
  autofocus: true,
  autoplay: true,
  checked: true,
  compact: true,
  controls: true,
  declare: true,
  default: true,
  defaultchecked: true,
  defaultmuted: true,
  defaultselected: true,
  defer: true,
  disabled: true,
  enabled: true,
  formnovalidate: true,
  hidden: true,
  indeterminate: true,
  inert: true,
  ismap: true,
  itemscope: true,
  loop: true,
  multiple: true,
  muted: true,
  nohref: true,
  noresize: true,
  noshade: true,
  novalidate: true,
  nowrap: true,
  open: true,
  pauseonexit: true,
  readonly: true,
  required: true,
  reversed: true,
  scoped: true,
  seamless: true,
  selected: true,
  sortable: true,
  translate: true,
  truespeed: true,
  typemustmatch: true,
  visible: true
};
const noValueAttr = {
  's-else': true
};
const htmlTag = {
  html: true,
  body: true,
  base: true,
  head: true,
  link: true,
  meta: true,
  style: true,
  title: true,
  address: true,
  article: true,
  aside: true,
  footer: true,
  header: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  hgroup: true,
  nav: true,
  section: true,
  div: true,
  dd: true,
  dl: true,
  dt: true,
  figcaption: true,
  figure: true,
  hr: true,
  img: true,
  li: true,
  main: true,
  ol: true,
  p: true,
  pre: true,
  ul: true,
  a: true,
  b: true,
  abbr: true,
  bdi: true,
  bdo: true,
  br: true,
  cite: true,
  code: true,
  data: true,
  dfn: true,
  em: true,
  i: true,
  kbd: true,
  mark: true,
  q: true,
  rp: true,
  rt: true,
  rtc: true,
  ruby: true,
  s: true,
  samp: true,
  small: true,
  span: true,
  strong: true,
  sub: true,
  sup: true,
  time: true,
  u: true,
  var: true,
  wbr: true,
  area: true,
  audio: true,
  map: true,
  track: true,
  video: true,
  embed: true,
  object: true,
  param: true,
  source: true,
  canvas: true,
  script: true,
  noscript: true,
  del: true,
  ins: true,
  caption: true,
  col: true,
  colgroup: true,
  table: true,
  thead: true,
  tbody: true,
  td: true,
  th: true,
  tr: true,
  button: true,
  datalist: true,
  fieldset: true,
  form: true,
  input: true,
  label: true,
  legend: true,
  meter: true,
  optgroup: true,
  option: true,
  output: true,
  progress: true,
  select: true,
  textarea: true,
  details: true,
  dialog: true,
  menu: true,
  menuitem: true,
  summary: true,
  content: true,
  element: true,
  shadow: true,
  template: true
};
// CONCATENATED MODULE: ./src/compiler/modules/boolean.js
/**
 * @file bool 型传值
 * @author cxtom(cxtom2008@gmail.com)
 */


function boolean_postTransformNode(node) {
  if (!node.type === 1 || !node.attrsMap) {
    return;
  }

  const keys = Object.keys(node.attrsMap).filter(n => node.attrsMap[n] === '');

  for (const key of keys) {
    if (htmlTag[node.tag] && booleanAttr[key] || noValueAttr[key]) {
      continue;
    }

    node.attrsMap[key] = `{{ true }}`;
  }
}

/* harmony default export */ var modules_boolean = ({
  postTransformNode: boolean_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/template.js
/**
 * @file template
 * @author cxtom(cxtom2008@gmail.com)
 */
function template_preTransformNode(el) {
  if (el.tag === 'template') {
    el.tag = 'fragment';
  }
}

/* harmony default export */ var modules_template = ({
  preTransformNode: template_preTransformNode
});
// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/compiler/modules/transition.js
/**
 * @file template
 * @author cxtom(cxtom2008@gmail.com)
 */


function transition_postTransformNode(el) {
  if (el.tag === 'transition') {
    el.tag = 'fragment';
    const attrs = Object.keys(el.attrsMap).map(name => {
      let value = el.attrsMap[name];
      value = value.startsWith('{{') ? value.slice(2, value.length - 2) : `'${value}'`;
      delete el.attrsMap[name];
      return `${Object(external_lodash_["camelCase"])(name)}:${value}`;
    });

    if (el.children && el.children[0]) {
      el.children[0].attrsMap['s-transition'] = `_t({${attrs.join(',')}})`;

      if (el.children[0].ifConditions) {
        for (const item of el.children[0].ifConditions.slice(1)) {
          if (item.attrsMap) {
            item.attrsMap['s-transition'] = `_t({${attrs.join(',')}})`;
          }
        }
      }
    }
  }
}

/* harmony default export */ var transition = ({
  postTransformNode: transition_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/text-combine.js
/**
 * @file text-combine
 * @author cxtom(cxtom2008@gmail.com)
 */



function text_combine_postTransformNode(el, state) {
  if (el.children && el.children.length > 0) {
    for (const child of el.children) {
      if (child.type !== 2 || !child.tokens || child.tokens.length <= 1) {
        continue;
      }

      child.text = child.tokens.map((token, index) => {
        let text = '\'\'';

        if (token['@binding']) {
          text = token['@binding'];
        }

        if (typeof token === 'string') {
          text = `'${external_escape_quotes_default()(state.strip ? Object(external_lodash_["trim"])(token, ' \n\t') : token)}'`;
        }

        return index === 0 ? text : `_cat(${text})`;
      }).join(' | ');
      child.text = `{{ ${child.text} }}`;
    }
  }
}

/* harmony default export */ var text_combine = ({
  postTransformNode: text_combine_postTransformNode
});
// CONCATENATED MODULE: ./src/compiler/modules/index.js
/**
 * @file transformers
 * @author cxtom(cxtom2008@gmail.com)
 */













/* harmony default export */ var compiler_modules = ([modules_template, modules_boolean, modules_if, modules_for, modules_event, modules_html, ref, text_combine, modules_class, style, // bind 放在所有处理完之后
bind, transition, dynamic_component]);
// EXTERNAL MODULE: external "vue-template-compiler"
var external_vue_template_compiler_ = __webpack_require__(5);

// CONCATENATED MODULE: ./src/compiler/stringify.js
/**
 * @file get html from ast
 * @author cxtom(cxtom2008@gmail.com)
 */




function stringifyAttr(key, value, tag) {
  if (noValueAttr[key] || !value && htmlTag[tag] && booleanAttr[key]) {
    return key;
  }

  return `${key}=${JSON.stringify(value.startsWith('{{') ? value : value.replace(/\s+/g, ' '))}`;
} // function transformChild(node) {
//     return node.tokens.reduce((prev, token) => {
//         if (typeof token === 'string') {
//             return prev + token;
//         }
//         console.log(node);
//         return prev + `{{ ${transform(token['@binding']).code} }}`;
//     }, '');
// }


function stringify(ast, {
  scopeId,
  strip,
  atom
}) {
  if (!Array.isArray(ast)) {
    ast = [ast];
  }

  let html = '';

  for (const node of ast) {
    if (node.type === 3 || node.type === 2) {
      const text = node.text;
      html += strip ? Object(external_lodash_["trim"])(text, ' \n\t') : text;
    } else if (node.type === 1) {
      const attrs = Object.keys(node.attrsMap).map(key => stringifyAttr(key, node.attrsMap[key], node.tag));

      if (scopeId) {
        scopeId = scopeId.replace(/^data-(a|v)-/, '');
        attrs.push(`data-${atom ? 'a' : 'v'}-${scopeId}`);
      }

      const hasChildren = node.children && node.children.length > 0;
      const hasAttr = attrs.length > 0;
      html += `<${node.tag}${hasAttr ? ' ' : ''}${attrs.join(' ')}>`;
      html += hasChildren ? stringify(node.children, {
        scopeId,
        strip,
        atom
      }) : '';
      html += !hasChildren && singleTag[node.tag] ? '' : `</${node.tag}>`;

      if (node.ifConditions && node.ifConditions.length > 1) {
        html += stringify(node.ifConditions.slice(1).map(n => n.block), {
          scopeId,
          strip,
          atom
        });
      }
    }
  }

  return html;
}
// CONCATENATED MODULE: ./src/shared/util.js
/**
 * @file 一些工具函数
 * @author cxtom(cxtom2008@gmail.com)
 */

/**
 * Mix properties into target object.
 */
const extend = Object.assign;
/**
 * Merge an Array of Objects into a single Object.
 */

function toObject(arr) {
  const res = {};

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */

const _toString = Object.prototype.toString;
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Check whether an object has the property.
 */

const util_hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return util_hasOwnProperty.call(obj, key);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function def(obj, key, property) {
  Object.defineProperty(obj, key, extend({
    enumerable: false,
    configurable: true
  }, property));
}
/**
 * Create a cached version of a pure function.
 */

function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Hyphenate a camelCase string.
 */

const hyphenateRE = /([^-])([A-Z])/g;
const hyphenate = cached(str => {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
});
const camelize = str => str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
/**
 * Ensure a function is called only once.
 */

function once(fn) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
// CONCATENATED MODULE: ./src/compiler/modules/cssmodules.js
/**
 * @file css modules module
 * @author cxtom(cxtom2008@gmail.com)
 */

/* harmony default export */ var cssmodules = (function (cssModules) {
  function preTransformNode(el) {
    if (cssModules && cssModules.$style && el.attrsMap.class) {
      const staticClass = el.attrsMap.class.replace(/(^"|"$)/g, '').split(' ');
      el.attrsMap.class = staticClass.map(c => cssModules.$style[camelize(c)] || c).join(' ');
      el.attrsList = el.attrsList.map(({
        name,
        value
      }) => ({
        name,
        value: name === 'class' ? el.attrsMap.class : value
      }));
    }
  }

  return {
    preTransformNode
  };
});
// CONCATENATED MODULE: ./src/compiler/modules/atom.js
/**
 * @file atom module
 * @author cxtom(cxtom2008@gmail.com)
 */
function atom_preTransformNode(el) {
  el.attrsList = el.attrsList.map(({
    name,
    value
  }) => {
    delete el.attrsMap[name];
    name = name.replace(/^a-/, 'v-');
    el.attrsMap[name] = value;
    return {
      value,
      name
    };
  });
}

/* harmony default export */ var modules_atom = ({
  preTransformNode: atom_preTransformNode
});
// EXTERNAL MODULE: external "san"
var external_san_ = __webpack_require__(6);

// CONCATENATED MODULE: ./src/compiler/optimize-anode.js
/**
 * @file 优化 aNode 的体积
 * @author cxtom(cxtom2008@gmail.com)
 */
function optimize(aNode) {
  delete aNode.raw;

  if (aNode.children) {
    aNode.children = aNode.children.map(optimize);
  }

  if (aNode.elses) {
    aNode.elses = aNode.elses.map(optimize);
  }

  if (aNode.textExpr) {
    delete aNode.textExpr.raw;
  }

  if (aNode.props) {
    aNode.props = aNode.props.map(prop => {
      if (prop.raw) {
        // 不能删除，运行时有用
        prop.raw = 1;
      }

      if (prop.expr) {
        delete prop.expr.raw;
      }

      return prop;
    });
  }

  if (aNode.events) {
    aNode.events = aNode.events.map(event => {
      if (event.raw) {
        delete event.raw;
      }

      if (event.expr) {
        delete event.expr.raw;
      }

      return event;
    });
  }

  if (aNode.directives) {
    Object.keys(aNode.directives).forEach(dir => {
      delete aNode.directives[dir].raw;

      if (aNode.directives[dir].value) {
        delete aNode.directives[dir].value.raw;
      }
    });
  }

  return aNode;
}
// CONCATENATED MODULE: ./src/compiler/index.js
/**
 * @file compiler
 * @author cxtom(cxtom2008@gmail.com)
 */








function compile(source, options = {}) {
  const {
    modules = [],
    cssModules = null,
    scopeId = '',
    strip = true,
    atom: isAtom = false
  } = options;

  if (!Object(external_lodash_["isEmpty"])(cssModules)) {
    modules.unshift(cssmodules(cssModules));
  }

  if (isAtom) {
    modules.unshift(modules_atom);
  }

  const errors = [];
  const compilerOptions = {
    modules: [...compiler_modules, ...modules],
    preserveWhitespace: false,
    useDynamicComponent: false,
    refs: [],

    error(msg) {
      console.error(`[vusa error] ${msg}`);
      errors.push(msg);
    },

    strip
  }; // console.log(source);

  const {
    ast
  } = Object(external_vue_template_compiler_["compile"])(source.trim(), compilerOptions);
  const template = stringify(ast, {
    scopeId,
    strip,
    atom: isAtom
  }); // console.log(template);

  const aNode = Object(external_san_["parseTemplate"])(template, {
    trimWhitespace: 'blank'
  }).children[0];
  return {
    ast,
    aNode: optimize(aNode),
    template,
    refs: compilerOptions.refs,
    errors
  };
}

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXRvbS1leHByZXNzaW9uLWNvbXBpbGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXNjYXBlLXF1b3Rlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBiYWJlbC9jb2RlLWZyYW1lXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG8tc2luZ2xlLXF1b3Rlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInZ1ZS10ZW1wbGF0ZS1jb21waWxlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNhblwiIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9leHByZXNzaW9uLXRyYW5zZm9ybWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL3N0eWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGVyL21vZHVsZXMvaWYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGVyL21vZHVsZXMvZm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGVyL21vZHVsZXMvcmVmLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL2R5bmFtaWMtY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcGlsZXIvbW9kdWxlcy9ib29sZWFuLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL3RyYW5zaXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGVyL21vZHVsZXMvdGV4dC1jb21iaW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21waWxlci9tb2R1bGVzL2Nzc21vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGVyL21vZHVsZXMvYXRvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcGlsZXIvb3B0aW1pemUtYW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1hcmsiLCJyZWciLCJSZWdFeHAiLCJ2YWxpZFVuYXJ5T3BlcmF0b3IiLCJTZXQiLCJ2YWxpZEJpbmFyeU9wZXJhdG9yIiwidmFsaWRMb2dpY2FsT3BlcmF0b3IiLCJub0JyYWNrZXRUeXBlcyIsIndyYXBCYWNrZXQiLCJjb2RlIiwibm9kZSIsImhhcyIsInR5cGUiLCJpbmNsdWRlcyIsIm9wZXJhdG9yIiwiU3ludGF4IiwiQXJyYXlFeHByZXNzaW9uIiwiTGl0ZXJhbCIsIk9iamVjdEV4cHJlc3Npb24iLCJVbmFyeUV4cHJlc3Npb24iLCJQcm9wZXJ0eSIsIlZ1ZUV4cHJlc3Npb24iLCJWdWVGaWx0ZXIiLCJJZGVudGlmaWVyIiwiTWVtYmVyRXhwcmVzc2lvbiIsIkJpbmFyeUV4cHJlc3Npb24iLCJMb2dpY2FsRXhwcmVzc2lvbiIsIkNvbmRpdGlvbmFsRXhwcmVzc2lvbiIsIkNhbGxFeHByZXNzaW9uIiwiVGVtcGxhdGVFeHByZXNzaW9uIiwiVmlzaXRvcktleXMiLCJ0b1N0cmluZyIsImEiLCJlc2NhcGVRdW90ZXMiLCJKU09OIiwic3RyaW5naWZ5IiwiQ29kZUdlbmVyYWdvciIsImV4cHJlc3Npb24iLCJmaWx0ZXJzIiwicmVkdWNlIiwicHJlIiwiZmlsdGVyIiwicmVwbGFjZSIsInJldCIsImFyZ3MiLCJoYXNBcmdzIiwibGVuZ3RoIiwibmFtZSIsIm1hcCIsImpvaW4iLCJyZXN1bHRzIiwicmVmIiwib2JqZWN0IiwicHJvcGVydHkiLCJjb21wdXRlZCIsImlzU3RhdGljIiwibGVuIiwidmFsdWUiLCJsZWZ0IiwicmlnaHQiLCJlcnJvciIsIkZ1bmN0aW9uIiwiZ2V0VHlwZSIsInRlc3QiLCJjb25zZXF1ZW50IiwiYWx0ZXJuYXRlIiwidGVzdENvZGUiLCJjb25zZXF1ZW50Q29kZSIsImFsdGVybmF0ZUNvZGUiLCJjYWxsZWUiLCJleHByZXNzaW9ucyIsImkiLCJyZXN1bHQiLCJjIiwidmFyRXhwb3J0IiwiaGFzQ29tcHV0ZWQiLCJjdXJyZW50IiwicHJldiIsInByb3BlcnRpZXMiLCJrZXlDb2RlIiwidHJhdmVyc2UiLCJrZXkiLCJnZW5Qcm9wZXJ0eUtleSIsIm9iaiIsInR5cGVTdHIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwic3Vic3RyaW5nIiwidG9Mb3dlckNhc2UiLCJDb2RlR2VuIiwiY29uc3RydWN0b3IiLCJzeW50YXgiLCJrZXlzIiwiZ2VuZXJhdGVyIiwibWVzc2FnZSIsImxvY2F0aW9uIiwic3RhcnQiLCJsaW5lIiwiY29sdW1uIiwiY29kZUZyYW1lIiwiY29kZUZyYW1lQ29sdW1ucyIsImhpZ2hsaWdodENvZGUiLCJFcnJvciIsInJvb3QiLCJ2aXNpdG9yS2V5cyIsImtleVJlc3VsdHMiLCJlbGVtZW50IiwiaXNOb2RlIiwiQXJyYXkiLCJpc0FycmF5IiwiZWxlIiwiZ2VuZXJhdGUiLCJhcHBseSIsIlN0cmluZyIsImFyZ3VtZW50cyIsImRhdGEiLCJwYXJzZSIsInN0YXJ0UnVsZSIsImUiLCJzdGFjayIsImNvZGVnZW4iLCJhc3QiLCJiaW5kS2V5cyIsInBvc3RUcmFuc2Zvcm1Ob2RlIiwiY2xhc3NCaW5kaW5nIiwic3RhdGljQ2xhc3MiLCJhdHRyc01hcCIsImNsYXNzIiwidHJhbnNmb3JtIiwiZm9yRWFjaCIsInZTaG93Iiwic3R5bGVCaW5kaW5nIiwic3RhdGljU3R5bGUiLCJzdHlsZSIsInRvU2luZ2xlUXVvdGVzIiwicmVCaW5kIiwibiIsInZCaW5kIiwiaWYiLCJlbHNlaWYiLCJlbHNlIiwiZm9yIiwiZnIiLCJhbGlhcyIsIml0ZXJhdG9yMSIsInRyYWNrQnlFeHByIiwicmVFdmVudCIsImV2ZW50QXR0cnMiLCJhdHRyc0xpc3QiLCJhdHRyIiwibW9kaWZpZXJzIiwic3BsaXQiLCJldmVudEhhbmRsZXIiLCJtIiwiZGlyIiwiZGlyZWN0aXZlcyIsImZpbmQiLCJkIiwiY2hpbGRyZW4iLCJ0ZXh0Iiwib3B0aW9ucyIsImluZm8iLCJwYXJlbnQiLCJ1bmRlZmluZWQiLCJyZWZzIiwicHVzaCIsImJpbmRSZWYiLCJ0YWciLCJpcyIsInN0YXJ0c1dpdGgiLCJzbGljZSIsInRyaW0iLCJleHByIiwidGVzdExvY2F0aW9uIiwib2Zmc2V0IiwiZW5kIiwiYXR0cnMiLCJpZkNvbmRpdGlvbnMiLCJleHAiLCJibG9jayIsInNpbmdsZVRhZyIsImFyZWEiLCJiYXNlIiwiYmFzZWZvbnQiLCJiciIsImNvbCIsImNvbW1hbmQiLCJlbWJlZCIsImZyYW1lIiwiaHIiLCJpbWciLCJpbnB1dCIsImlzaW5kZXgiLCJrZXlnZW4iLCJsaW5rIiwibWV0YSIsInBhcmFtIiwic291cmNlIiwidHJhY2siLCJ3YnIiLCJib29sZWFuQXR0ciIsImFsbG93ZnVsbHNjcmVlbiIsImFzeW5jIiwiYXV0b2ZvY3VzIiwiYXV0b3BsYXkiLCJjaGVja2VkIiwiY29tcGFjdCIsImNvbnRyb2xzIiwiZGVjbGFyZSIsImRlZmF1bHQiLCJkZWZhdWx0Y2hlY2tlZCIsImRlZmF1bHRtdXRlZCIsImRlZmF1bHRzZWxlY3RlZCIsImRlZmVyIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwiZm9ybW5vdmFsaWRhdGUiLCJoaWRkZW4iLCJpbmRldGVybWluYXRlIiwiaW5lcnQiLCJpc21hcCIsIml0ZW1zY29wZSIsImxvb3AiLCJtdWx0aXBsZSIsIm11dGVkIiwibm9ocmVmIiwibm9yZXNpemUiLCJub3NoYWRlIiwibm92YWxpZGF0ZSIsIm5vd3JhcCIsIm9wZW4iLCJwYXVzZW9uZXhpdCIsInJlYWRvbmx5IiwicmVxdWlyZWQiLCJyZXZlcnNlZCIsInNjb3BlZCIsInNlYW1sZXNzIiwic2VsZWN0ZWQiLCJzb3J0YWJsZSIsInRyYW5zbGF0ZSIsInRydWVzcGVlZCIsInR5cGVtdXN0bWF0Y2giLCJ2aXNpYmxlIiwibm9WYWx1ZUF0dHIiLCJodG1sVGFnIiwiaHRtbCIsImJvZHkiLCJoZWFkIiwidGl0bGUiLCJhZGRyZXNzIiwiYXJ0aWNsZSIsImFzaWRlIiwiZm9vdGVyIiwiaGVhZGVyIiwiaDEiLCJoMiIsImgzIiwiaDQiLCJoNSIsImg2IiwiaGdyb3VwIiwibmF2Iiwic2VjdGlvbiIsImRpdiIsImRkIiwiZGwiLCJkdCIsImZpZ2NhcHRpb24iLCJmaWd1cmUiLCJsaSIsIm1haW4iLCJvbCIsInAiLCJ1bCIsImIiLCJhYmJyIiwiYmRpIiwiYmRvIiwiY2l0ZSIsImRmbiIsImVtIiwia2JkIiwicSIsInJwIiwicnQiLCJydGMiLCJydWJ5IiwicyIsInNhbXAiLCJzbWFsbCIsInNwYW4iLCJzdHJvbmciLCJzdWIiLCJzdXAiLCJ0aW1lIiwidSIsInZhciIsImF1ZGlvIiwidmlkZW8iLCJjYW52YXMiLCJzY3JpcHQiLCJub3NjcmlwdCIsImRlbCIsImlucyIsImNhcHRpb24iLCJjb2xncm91cCIsInRhYmxlIiwidGhlYWQiLCJ0Ym9keSIsInRkIiwidGgiLCJ0ciIsImJ1dHRvbiIsImRhdGFsaXN0IiwiZmllbGRzZXQiLCJmb3JtIiwibGFiZWwiLCJsZWdlbmQiLCJtZXRlciIsIm9wdGdyb3VwIiwib3B0aW9uIiwib3V0cHV0IiwicHJvZ3Jlc3MiLCJzZWxlY3QiLCJ0ZXh0YXJlYSIsImRldGFpbHMiLCJkaWFsb2ciLCJtZW51IiwibWVudWl0ZW0iLCJzdW1tYXJ5IiwiY29udGVudCIsInNoYWRvdyIsInRlbXBsYXRlIiwicHJlVHJhbnNmb3JtTm9kZSIsImVsIiwiY2FtZWxDYXNlIiwiaXRlbSIsInN0YXRlIiwiY2hpbGQiLCJ0b2tlbnMiLCJ0b2tlbiIsImluZGV4Iiwic3RyaXAiLCJib29sIiwieWYiLCJldmVudCIsInRleHRDb21iaW5lIiwiY2xhenoiLCJiaW5kIiwidHJhbnNpdGlvbiIsImR5bmFtaWNDb21wb25lbnQiLCJzdHJpbmdpZnlBdHRyIiwic2NvcGVJZCIsImF0b20iLCJoYXNDaGlsZHJlbiIsImhhc0F0dHIiLCJleHRlbmQiLCJhc3NpZ24iLCJ0b09iamVjdCIsImFyciIsInJlcyIsInJlbW92ZSIsImluZGV4T2YiLCJzcGxpY2UiLCJfdG9TdHJpbmciLCJpc09iamVjdCIsImhhc093blByb3BlcnR5IiwiaGFzT3duIiwiaXNQbGFpbk9iamVjdCIsImRlZiIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImNhY2hlZCIsImZuIiwiY2FjaGUiLCJjcmVhdGUiLCJjYWNoZWRGbiIsInN0ciIsImhpdCIsImh5cGhlbmF0ZVJFIiwiaHlwaGVuYXRlIiwiY2FtZWxpemUiLCJfIiwidG9VcHBlckNhc2UiLCJvbmNlIiwiY2FsbGVkIiwiY3NzTW9kdWxlcyIsIiRzdHlsZSIsIm9wdGltaXplIiwiYU5vZGUiLCJyYXciLCJlbHNlcyIsInRleHRFeHByIiwicHJvcHMiLCJwcm9wIiwiZXZlbnRzIiwiY29tcGlsZSIsIm1vZHVsZXMiLCJpc0F0b20iLCJpc0VtcHR5IiwidW5zaGlmdCIsImdldENzc01vZHVsZXMiLCJlcnJvcnMiLCJjb21waWxlck9wdGlvbnMiLCJidWlsZEluTW9kdWxlcyIsInByZXNlcnZlV2hpdGVzcGFjZSIsInVzZUR5bmFtaWNDb21wb25lbnQiLCJtc2ciLCJjb25zb2xlIiwidnVlQ29tcGlsZSIsInBhcnNlVGVtcGxhdGUiLCJ0cmltV2hpdGVzcGFj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Q0FBQzlWLEtBQVIsQ0FBZSxnQkFBZTZWLEdBQUksRUFBbEM7QUFDQUwsWUFBTSxDQUFDOU8sSUFBUCxDQUFZbVAsR0FBWjtBQUNILEtBWG1COztBQVlwQmxFO0FBWm9CLEdBQXhCLENBbkIwQyxDQWtDMUM7O0FBRUEsUUFBTTtBQUFDN047QUFBRCxNQUFRaVMsa0RBQVUsQ0FBQ3JOLE1BQU0sQ0FBQzFCLElBQVAsRUFBRCxFQUFnQnlPLGVBQWhCLENBQXhCO0FBRUEsUUFBTXhFLFFBQVEsR0FBRzFTLFNBQVMsQ0FBQ3VGLEdBQUQsRUFBTTtBQUFFdU8sV0FBRjtBQUFXVixTQUFYO0FBQWtCVyxRQUFJLEVBQUU4QztBQUF4QixHQUFOLENBQTFCLENBdEMwQyxDQXVDMUM7O0FBQ0EsUUFBTVQsS0FBSyxHQUFHcUIsc0NBQWEsQ0FBQy9FLFFBQUQsRUFBVztBQUNsQ2dGLGtCQUFjLEVBQUU7QUFEa0IsR0FBWCxDQUFiLENBRVg5UCxRQUZXLENBRUYsQ0FGRSxDQUFkO0FBSUEsU0FBTztBQUNIckMsT0FERztBQUVINlEsU0FBSyxFQUFFRCxRQUFRLENBQUNDLEtBQUQsQ0FGWjtBQUdIMUQsWUFIRztBQUlIeEssUUFBSSxFQUFFZ1AsZUFBZSxDQUFDaFAsSUFKbkI7QUFLSCtPO0FBTEcsR0FBUDtBQU9ILEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXRvbS1leHByZXNzaW9uLWNvbXBpbGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVzY2FwZS1xdW90ZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL2NvZGUtZnJhbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG8tc2luZ2xlLXF1b3Rlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ2dWUtdGVtcGxhdGUtY29tcGlsZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2FuXCIpOyIsIi8qKlxuICogQGZpbGUgdnVlIOeahCBleHByZXNzaW9uIOi9rCBzYW7vvIzkuLvopoHmmK/lpITnkIYgZXM2IOivreazlVxuICogQGF1dGhvciBjeHRvbShjeHRvbTIwMDhAZ21haWwuY29tKVxuICovXG5cbmltcG9ydCB7Y29kZUZyYW1lQ29sdW1uc30gZnJvbSAnQGJhYmVsL2NvZGUtZnJhbWUnO1xuaW1wb3J0IHtwYXJzZX0gZnJvbSAnYXRvbS1leHByZXNzaW9uLWNvbXBpbGVyJztcbmltcG9ydCBlc2NhcGVRdW90ZXMgZnJvbSAnZXNjYXBlLXF1b3Rlcyc7XG5cbmNvbnN0IG1hcmsgPSAnX192dXNhX19maWx0ZXJfX21hcmtfXyc7XG5jb25zdCByZWcgPSBuZXcgUmVnRXhwKG1hcmssICdnJyk7XG5cbmNvbnN0IHZhbGlkVW5hcnlPcGVyYXRvciA9IG5ldyBTZXQoWycrJywgJy0nLCAnISddKTtcbmNvbnN0IHZhbGlkQmluYXJ5T3BlcmF0b3IgPSBuZXcgU2V0KFsnKycsICctJywgJyonLCAnLycsICclJywgJz4nLCAnPCcsICc+PScsICc8PScsICc9PScsICc9PT0nLCAnIT0nLCAnIT09J10pO1xuY29uc3QgdmFsaWRMb2dpY2FsT3BlcmF0b3IgPSBuZXcgU2V0KFsnJiYnLCAnfHwnXSk7XG5jb25zdCBub0JyYWNrZXRUeXBlcyA9IG5ldyBTZXQoW1xuICAgICdBcnJheUV4cHJlc3Npb24nLFxuICAgICdMaXRlcmFsJyxcbiAgICAnT2JqZWN0RXhwcmVzc2lvbicsXG4gICAgJ0lkZW50aWZpZXInLFxuICAgICdNZW1iZXJFeHByZXNzaW9uJyxcbiAgICAnQ2FsbEV4cHJlc3Npb24nLFxuICAgICdUZW1wbGF0ZUV4cHJlc3Npb24nLFxuICAgICdVbmFyeUV4cHJlc3Npb24nXG5dKTtcblxuZnVuY3Rpb24gd3JhcEJhY2tldChjb2RlLCBub2RlKSB7XG4gICAgaWYgKG5vQnJhY2tldFR5cGVzLmhhcyhub2RlLnR5cGUpKSB7XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbiAgICBpZiAobm9kZS50eXBlID09PSAnQmluYXJ5RXhwcmVzc2lvbicgJiYgWyc9PScsICc9PT0nLCAnIT0nLCAnIT09J10uaW5jbHVkZXMobm9kZS5vcGVyYXRvcikpIHtcbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuICAgIHJldHVybiBgKCR7Y29kZX0pYDtcbn1cblxuY29uc3QgU3ludGF4ID0ge1xuICAgIEFycmF5RXhwcmVzc2lvbjogJ0FycmF5RXhwcmVzc2lvbicsXG4gICAgTGl0ZXJhbDogJ0xpdGVyYWwnLFxuICAgIE9iamVjdEV4cHJlc3Npb246ICdPYmplY3RFeHByZXNzaW9uJyxcbiAgICBVbmFyeUV4cHJlc3Npb246ICdVbmFyeUV4cHJlc3Npb24nLFxuICAgIFByb3BlcnR5OiAnUHJvcGVydHknLFxuICAgIFZ1ZUV4cHJlc3Npb246ICdWdWVFeHByZXNzaW9uJyxcbiAgICBWdWVGaWx0ZXI6ICdWdWVGaWx0ZXInLFxuICAgIElkZW50aWZpZXI6ICdJZGVudGlmaWVyJyxcbiAgICBNZW1iZXJFeHByZXNzaW9uOiAnTWVtYmVyRXhwcmVzc2lvbicsXG4gICAgQmluYXJ5RXhwcmVzc2lvbjogJ0JpbmFyeUV4cHJlc3Npb24nLFxuICAgIExvZ2ljYWxFeHByZXNzaW9uOiAnTG9naWNhbEV4cHJlc3Npb24nLFxuICAgIENvbmRpdGlvbmFsRXhwcmVzc2lvbjogJ0NvbmRpdGlvbmFsRXhwcmVzc2lvbicsXG4gICAgQ2FsbEV4cHJlc3Npb246ICdDYWxsRXhwcmVzc2lvbicsXG4gICAgVGVtcGxhdGVFeHByZXNzaW9uOiAnVGVtcGxhdGVFeHByZXNzaW9uJ1xufTtcblxuY29uc3QgVmlzaXRvcktleXMgPSB7XG4gICAgQXJyYXlFeHByZXNzaW9uOiBbJ2VsZW1lbnRzJ10sXG4gICAgT2JqZWN0RXhwcmVzc2lvbjogWydwcm9wZXJ0aWVzJ10sXG4gICAgVW5hcnlFeHByZXNzaW9uOiBbJ2FyZ3VtZW50J10sXG4gICAgUHJvcGVydHk6IFsndmFsdWUnXSxcbiAgICBNZW1iZXJFeHByZXNzaW9uOiBbJ29iamVjdCcsICdwcm9wZXJ0eSddLFxuICAgIEJpbmFyeUV4cHJlc3Npb246IFsnbGVmdCcsICdyaWdodCddLFxuICAgIExvZ2ljYWxFeHByZXNzaW9uOiBbJ2xlZnQnLCAncmlnaHQnXSxcbiAgICBDb25kaXRpb25hbEV4cHJlc3Npb246IFsndGVzdCcsICdjb25zZXF1ZW50JywgJ2FsdGVybmF0ZSddLFxuICAgIENhbGxFeHByZXNzaW9uOiBbJ2FyZ3VtZW50cyddLFxuICAgIFZ1ZUV4cHJlc3Npb246IFsnZXhwcmVzc2lvbicsICdmaWx0ZXJzJ10sXG4gICAgVnVlRmlsdGVyOiBbJ2FyZ3VtZW50cyddLFxuICAgIFRlbXBsYXRlRXhwcmVzc2lvbjogWydleHByZXNzaW9ucyddXG59O1xuXG5mdW5jdGlvbiB0b1N0cmluZyhhKSB7XG4gICAgaWYgKHR5cGVvZiBhID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gYSArICcnO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBgJyR7ZXNjYXBlUXVvdGVzKGEpfSdgXG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhKTtcbn1cblxuY29uc3QgQ29kZUdlbmVyYWdvciA9IHtcblxuICAgIFZ1ZUV4cHJlc3Npb24obm9kZSwgW2V4cHJlc3Npb24sIGZpbHRlcnNdKSB7XG4gICAgICAgIGxldCBjb2RlID0gZmlsdGVycy5yZWR1Y2UoKHByZSwgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyLmNvZGUucmVwbGFjZShyZWcsIHByZSk7XG4gICAgICAgIH0sIGV4cHJlc3Npb24uY29kZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJldChjb2RlKTtcbiAgICB9LFxuXG4gICAgVnVlRmlsdGVyKG5vZGUsIFthcmdzXSkge1xuICAgICAgICBsZXQgaGFzQXJncyA9IGFyZ3MubGVuZ3RoID4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0KGAke21hcmt9IHwgJHtub2RlLm5hbWV9YCArIChoYXNBcmdzID8gYCgke2FyZ3MubWFwKGEgPT4gYS5jb2RlKS5qb2luKCcsICcpfSlgIDogJycpKTtcbiAgICB9LFxuXG4gICAgSWRlbnRpZmllcihub2RlLCByZXN1bHRzLCByZWYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0KG5vZGUubmFtZSk7XG4gICAgfSxcblxuICAgIE1lbWJlckV4cHJlc3Npb24obm9kZSwgcmVzdWx0cykge1xuXG4gICAgICAgIGxldCBbb2JqZWN0LCBwcm9wZXJ0eV0gPSByZXN1bHRzO1xuXG4gICAgICAgIGlmIChub2RlLmNvbXB1dGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXQoYCR7b2JqZWN0LmNvZGV9WyR7cHJvcGVydHkuY29kZX1dYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcGVydHkuY29kZSA9PT0gJ2xlbmd0aCcpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3QudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LmlzU3RhdGljKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsZW4gPSBvYmplY3QudmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZXQobGVuICsgJycsICdudW1iZXInLCBsZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZXQoYCR7b2JqZWN0LmNvZGV9Lmxlbmd0aGAsICdudW1iZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJldChgJHtvYmplY3QuY29kZX0uJHtwcm9wZXJ0eS5jb2RlfWApO1xuICAgIH0sXG5cbiAgICBCaW5hcnlFeHByZXNzaW9uKG5vZGUsIFtsZWZ0LCByaWdodF0sIHJlZikge1xuICAgICAgICBpZiAoIXZhbGlkQmluYXJ5T3BlcmF0b3IuaGFzKG5vZGUub3BlcmF0b3IpKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKGBpbnZhbGlkIGJpbmFyeSBvcGVyYXRvciBcIiR7bm9kZS5vcGVyYXRvcn1cImAsIG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZWZ0LmlzU3RhdGljICYmIHJpZ2h0LmlzU3RhdGljKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBuZXcgRnVuY3Rpb24oYHJldHVybiAke2xlZnQuY29kZX0gJHtub2RlLm9wZXJhdG9yfSAke3JpZ2h0LmNvZGV9YCkoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJldCh0b1N0cmluZyh2YWx1ZSksIGdldFR5cGUodmFsdWUpLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvZGUgPSBgJHt3cmFwQmFja2V0KGxlZnQuY29kZSwgbm9kZS5sZWZ0KX0ke25vZGUub3BlcmF0b3J9JHt3cmFwQmFja2V0KHJpZ2h0LmNvZGUsIG5vZGUucmlnaHQpfWBcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0KGNvZGUpO1xuICAgIH0sXG5cbiAgICBMb2dpY2FsRXhwcmVzc2lvbihub2RlLCBbbGVmdCwgcmlnaHRdKSB7XG4gICAgICAgIGlmICghdmFsaWRMb2dpY2FsT3BlcmF0b3IuaGFzKG5vZGUub3BlcmF0b3IpKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKGBpbnZhbGlkIGxvZ2ljYWwgb3BlcmF0b3IgXCIke25vZGUub3BlcmF0b3J9XCJgLCBub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVmdC5pc1N0YXRpYyAmJiByaWdodC5pc1N0YXRpYykge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gbmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtsZWZ0LmNvZGV9JHtub2RlLm9wZXJhdG9yfSR7cmlnaHQuY29kZX1gKSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmV0KHRvU3RyaW5nKHZhbHVlKSwgZ2V0VHlwZSh2YWx1ZSksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29kZSA9IGAke3dyYXBCYWNrZXQobGVmdC5jb2RlLCBub2RlLmxlZnQpfSR7bm9kZS5vcGVyYXRvcn0ke3dyYXBCYWNrZXQocmlnaHQuY29kZSwgbm9kZS5yaWdodCl9YFxuICAgICAgICByZXR1cm4gdGhpcy5yZXQoY29kZSk7XG4gICAgfSxcblxuICAgIENvbmRpdGlvbmFsRXhwcmVzc2lvbihub2RlLCBbdGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlXSkge1xuICAgICAgICBpZiAodGVzdC5pc1N0YXRpYykge1xuICAgICAgICAgICAgcmV0dXJuIHRlc3QudmFsdWUgPyBjb25zZXF1ZW50IDogYWx0ZXJuYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRlc3RDb2RlID0gd3JhcEJhY2tldCh0ZXN0LmNvZGUsIG5vZGUudGVzdCk7XG4gICAgICAgIGxldCBjb25zZXF1ZW50Q29kZSA9IHdyYXBCYWNrZXQoY29uc2VxdWVudC5jb2RlLCBub2RlLmNvbnNlcXVlbnQpO1xuICAgICAgICBsZXQgYWx0ZXJuYXRlQ29kZSA9IHdyYXBCYWNrZXQoYWx0ZXJuYXRlLmNvZGUsIG5vZGUuYWx0ZXJuYXRlKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXQoYCR7dGVzdENvZGV9PyR7Y29uc2VxdWVudENvZGV9OiR7YWx0ZXJuYXRlQ29kZX1gKTtcbiAgICB9LFxuXG4gICAgQ2FsbEV4cHJlc3Npb24obm9kZSwgW2FyZ3NdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldChgJHtub2RlLmNhbGxlZS5uYW1lfSgke2FyZ3MubWFwKGEgPT4gYS5jb2RlKS5qb2luKCcsICcpfSlgKTtcbiAgICB9LFxuXG4gICAgVGVtcGxhdGVFeHByZXNzaW9uKG5vZGUsIFtleHByZXNzaW9uc10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0KFxuICAgICAgICAgICAgYCgke2V4cHJlc3Npb25zLm1hcCgoe2NvZGV9LCBpKSA9PiB3cmFwQmFja2V0KGNvZGUsIG5vZGUuZXhwcmVzc2lvbnNbaV0pKS5qb2luKCcrJyl9KWAsXG4gICAgICAgICAgICAnc3RyaW5nJ1xuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBBcnJheUV4cHJlc3Npb24obm9kZSwgcmVzdWx0cykge1xuICAgICAgICBsZXQgcmVzdWx0ID0gcmVzdWx0c1swXTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0KGBbJHtyZXN1bHQubWFwKGMgPT4gYy5jb2RlKS5qb2luKCcsICcpfV1gLCAnYXJyYXknKTtcbiAgICB9LFxuXG4gICAgTGl0ZXJhbChub2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldChcbiAgICAgICAgICAgIHRoaXMudmFyRXhwb3J0KG5vZGUudmFsdWUpLFxuICAgICAgICAgICAgZ2V0VHlwZShub2RlLnZhbHVlKSxcbiAgICAgICAgICAgIG5vZGUudmFsdWVcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgVW5hcnlFeHByZXNzaW9uKG5vZGUsIHJlc3VsdHMpIHtcblxuICAgICAgICBpZiAoIXZhbGlkVW5hcnlPcGVyYXRvci5oYXMobm9kZS5vcGVyYXRvcikpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoYHVua25vdyB1bmFyeSBvcGVyYXRvciBcIiR7bm9kZS5vcGVyYXRvcn1cImAsIG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHJlc3VsdHNbMF07XG5cbiAgICAgICAgaWYgKHJlc3VsdC5pc1N0YXRpYykge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gbmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtub2RlLm9wZXJhdG9yfSR7cmVzdWx0LmNvZGV9YCkoKTtcbiAgICAgICAgICAgIGxldCBzdHJpbmdpZnkgPSB0b1N0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXQoc3RyaW5naWZ5LCBnZXRUeXBlKHZhbHVlKSwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmV0KGAke25vZGUub3BlcmF0b3J9JHtyZXN1bHQuY29kZX1gKTtcbiAgICB9LFxuXG4gICAgT2JqZWN0RXhwcmVzc2lvbihub2RlLCByZXN1bHRzKSB7XG5cbiAgICAgICAgaWYgKG5vZGUuaGFzQ29tcHV0ZWQpIHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gJ19leCgnO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgICAgICBsZXQgcHJldjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBub2RlLnByb3BlcnRpZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IG5vZGUucHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgICAgICBwcmV2ID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gISFwcm9wZXJ0eS5jb21wdXRlZDtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCAmJiBwcmV2ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2RlICs9ICd9LCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ICYmICFwcmV2KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGUgKz0gJ19vY3AoWyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudCAmJiBwcmV2KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGUgKz0gJ10pLHsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnQgJiYgcHJldiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGUgKz0gJ3snO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gcHJldikge1xuICAgICAgICAgICAgICAgICAgICBjb2RlICs9ICcsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29kZSArPSByZXN1bHRzWzBdW2ldLmNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2RlICs9IGN1cnJlbnQgPyAnXSkpJyA6ICd9KSc7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXQoY29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzdWx0ID0gcmVzdWx0c1swXTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmV0KGB7JHtyZXN1bHQubWFwKGMgPT4gYy5jb2RlKS5qb2luKCcsJyl9fSBgLCAnb2JqZWN0Jyk7XG4gICAgfSxcblxuICAgIFByb3BlcnR5KG5vZGUsIHJlc3VsdHMsIHJlZikge1xuXG4gICAgICAgIGlmIChub2RlLmNvbXB1dGVkKSB7XG4gICAgICAgICAgICByZWYuaGFzQ29tcHV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGtleUNvZGUgPSB0aGlzLnRyYXZlcnNlKG5vZGUua2V5LCBub2RlKS5jb2RlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmV0KGB7azoke2tleUNvZGV9LHY6JHtyZXN1bHRzWzBdLmNvZGV9fWApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGtleUNvZGUgPSB0aGlzLmdlblByb3BlcnR5S2V5KG5vZGUua2V5KS5jb2RlO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXQoYCR7a2V5Q29kZX06JHtyZXN1bHRzWzBdLmNvZGV9YCk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZ2V0VHlwZShvYmopIHtcbiAgICBsZXQgdHlwZVN0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xuICAgIHJldHVybiB0eXBlU3RyLnN1YnN0cmluZyg4LCB0eXBlU3RyLmxlbmd0aCAtIDEpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmNsYXNzIENvZGVHZW4ge1xuXG4gICAgY29uc3RydWN0b3Ioe2NvZGV9KSB7XG4gICAgICAgIHRoaXMuc3ludGF4ID0gU3ludGF4O1xuICAgICAgICB0aGlzLmtleXMgPSBWaXNpdG9yS2V5cztcbiAgICAgICAgdGhpcy5nZW5lcmF0ZXIgPSBDb2RlR2VuZXJhZ29yO1xuXG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgfVxuXG4gICAgZXJyb3IobWVzc2FnZSwgbm9kZSkge1xuICAgICAgICBtZXNzYWdlID0gYFt2dXNhIGV4cHJlc3Npb24gcGFyc2VyXSAoJHtub2RlLmxvY2F0aW9uLnN0YXJ0LmxpbmV9OiR7bm9kZS5sb2NhdGlvbi5zdGFydC5jb2x1bW59KSA6ICR7bWVzc2FnZX1gO1xuXG4gICAgICAgIGxldCBjb2RlRnJhbWUgPSBjb2RlRnJhbWVDb2x1bW5zKHRoaXMuY29kZSwgbm9kZS5sb2NhdGlvbiwge1xuICAgICAgICAgICAgaGlnaGxpZ2h0Q29kZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgbWVzc2FnZSArPSBgXFxuJHtjb2RlRnJhbWV9YDtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgdHJhdmVyc2Uobm9kZSwgcmVmKSB7XG5cbiAgICAgICAgbGV0IHN5bnRheCA9IHRoaXMuc3ludGF4W25vZGUudHlwZV07XG5cbiAgICAgICAgaWYgKG5vZGUgPT09IHJlZikge1xuICAgICAgICAgICAgdGhpcy5yb290ID0gbm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUucmVmID0gcmVmO1xuXG4gICAgICAgIC8vIOWvueixoeeahCBrZXkg5YC854m55q6K5aSE55CG5LiA5LiLXG4gICAgICAgIGlmICghc3ludGF4KSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKGBVbmtub3duIG5vZGUgdHlwZSBcIiR7bm9kZS50eXBlfVwiIHdhcyBmb3VuZCB3aGVuIHBhcnNpbmcgXCIke25vZGUubmFtZX1cImAsIG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZpc2l0b3JLZXlzID0gdGhpcy5rZXlzW25vZGUudHlwZV0gfHwgW107XG4gICAgICAgIGxldCBrZXlSZXN1bHRzID0gdmlzaXRvcktleXMubWFwKGtleSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IG5vZGVba2V5XTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc05vZGUoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnRyYXZlcnNlKGVsZW1lbnQsIG5vZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZWxlbWVudC5tYXAoZWxlID0+IHRoaXMudHJhdmVyc2UoZWxlLCBub2RlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoYFVua25vd24gVmlzaXRvcktleSB0eXBlIFwiJHt0eXBlb2YgZWxlbWVudH1cIiB3YXMgZm91bmQgd2hlbiBwYXJzaW5nICR7ZWxlbWVudC5uYW1lfWAsIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZShub2RlLCBrZXlSZXN1bHRzLCByZWYpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlKG5vZGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVyW25vZGUudHlwZV0uYXBwbHkodGhpcywgW25vZGUsIC4uLmFyZ3NdKTtcbiAgICB9XG5cbiAgICBnZW5Qcm9wZXJ0eUtleShub2RlKSB7XG4gICAgICAgIGxldCBjb2RlO1xuICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnSWRlbnRpZmllcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmV0KG5vZGUubmFtZSwgJ3N0cmluZycsIG5vZGUubmFtZSk7XG4gICAgICAgICAgICBjYXNlICdMaXRlcmFsJzpcbiAgICAgICAgICAgICAgICBjb2RlID0gdG9TdHJpbmcoU3RyaW5nKG5vZGUudmFsdWUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZXQoY29kZSwgJ3N0cmluZycsIFN0cmluZyhub2RlLnZhbHVlKSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoYGludmFsaWQgcHJvcGVydHkga2V5IHR5cGUgXCIke25vZGUudHlwZX1cImAsIG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNOb2RlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG5vZGUudHlwZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuXG4gICAgcmV0KGNvZGUsIHR5cGUsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgaXNTdGF0aWM6IGFyZ3VtZW50cy5sZW5ndGggPiAyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyRXhwb3J0KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nKGRhdGEpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNvZGUpIHtcblxuICAgIGlmICghY29kZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogJydcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBsZXQgbm9kZTtcbiAgICB0cnkge1xuICAgICAgICBub2RlID0gcGFyc2UoY29kZSwge1xuICAgICAgICAgICAgc3RhcnRSdWxlOiAnVnVlRXhwcmVzc2lvbidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU3ludGF4RXJyb3IgaXMgZm91bmQgd2hlbiBwYXJzaW5nIGNvZGUgXCIke2NvZGV9XCIsICR7ZS5zdGFja31gKTtcbiAgICB9XG5cbiAgICBsZXQgY29kZWdlbiA9IG5ldyBDb2RlR2VuKHtcbiAgICAgICAgY29kZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXN0OiBub2RlLmV4cHJlc3Npb24sXG4gICAgICAgIC4uLmNvZGVnZW4udHJhdmVyc2Uobm9kZSwgbm9kZSlcbiAgICB9O1xufVxuIiwiLyoqXG4gKiBAZmlsZSBjbGFzc1xuICogQGF1dGhvciBjeHRvbShjeHRvbTIwMDhAZ21haWwuY29tKVxuICovXG5cbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi4vZXhwcmVzc2lvbi10cmFuc2Zvcm1lcic7XG5cbmNvbnN0IGJpbmRLZXlzID0gWyc6Y2xhc3MnLCAndi1iaW5kOmNsYXNzJ107XG5cbmZ1bmN0aW9uIHBvc3RUcmFuc2Zvcm1Ob2RlKG5vZGUpIHtcbiAgICBpZiAobm9kZS50eXBlID09PSAxICYmIG5vZGUuY2xhc3NCaW5kaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRpY0NsYXNzID0gbm9kZS5hdHRyc01hcC5jbGFzcyB8fCAnJztcbiAgICAgICAgY29uc3QgY2xhc3NCaW5kaW5nID0gdHJhbnNmb3JtKG5vZGUuY2xhc3NCaW5kaW5nKS5jb2RlO1xuICAgICAgICBub2RlLmF0dHJzTWFwLmNsYXNzID0gYHt7IF9tYygnJHtzdGF0aWNDbGFzc30nLCAke2NsYXNzQmluZGluZ30pIH19YDtcbiAgICAgICAgYmluZEtleXMuZm9yRWFjaChrZXkgPT4gZGVsZXRlIG5vZGUuYXR0cnNNYXBba2V5XSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcG9zdFRyYW5zZm9ybU5vZGVcbn07XG4iLCIvKipcbiAqIEBmaWxlIHN0eWxlXG4gKiBAYXV0aG9yIGN4dG9tKGN4dG9tMjAwOEBnbWFpbC5jb20pXG4gKi9cblxuaW1wb3J0IHRyYW5zZm9ybSBmcm9tICcuLi9leHByZXNzaW9uLXRyYW5zZm9ybWVyJztcbmltcG9ydCB0b1NpbmdsZVF1b3RlcyBmcm9tICd0by1zaW5nbGUtcXVvdGVzJztcblxuY29uc3QgYmluZEtleXMgPSBbJzpzdHlsZScsICd2LWJpbmQ6c3R5bGUnLCAndi1zaG93J107XG5cbmZ1bmN0aW9uIHBvc3RUcmFuc2Zvcm1Ob2RlKG5vZGUpIHtcbiAgICBjb25zdCB2U2hvdyA9IG5vZGUuYXR0cnNNYXBbJ3Ytc2hvdyddO1xuICAgIGlmIChub2RlLnR5cGUgPT09IDEgJiYgKG5vZGUuc3R5bGVCaW5kaW5nIHx8IHZTaG93KSkge1xuICAgICAgICBjb25zdCBzdGF0aWNTdHlsZSA9IG5vZGUuc3RhdGljU3R5bGUgfHwgJ1xcJ1xcJyc7XG4gICAgICAgIGNvbnN0IHN0eWxlQmluZGluZyA9IG5vZGUuc3R5bGVCaW5kaW5nID8gdHJhbnNmb3JtKG5vZGUuc3R5bGVCaW5kaW5nKS5jb2RlIDogJ3t9JztcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgICAgbm9kZS5hdHRyc01hcC5zdHlsZSA9IGB7eyBfbXMoJHt0b1NpbmdsZVF1b3RlcyhzdGF0aWNTdHlsZSl9LCAke3N0eWxlQmluZGluZ30ke3ZTaG93ID8gYCwgJHt0cmFuc2Zvcm0odlNob3cpLmNvZGV9YCA6ICcnfSkgfX1gO1xuICAgICAgICBiaW5kS2V5cy5mb3JFYWNoKGtleSA9PiBkZWxldGUgbm9kZS5hdHRyc01hcFtrZXldKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwb3N0VHJhbnNmb3JtTm9kZVxufTtcbiIsIi8qKlxuICogQGZpbGUgYmluZFxuICogQGF1dGhvciBjeHRvbShjeHRvbTIwMDhAZ21haWwuY29tKVxuICovXG5cbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi4vZXhwcmVzc2lvbi10cmFuc2Zvcm1lcic7XG5cbmNvbnN0IHJlQmluZCA9IC9eKHYtYmluZCk/XFw6LztcblxuZnVuY3Rpb24gcG9zdFRyYW5zZm9ybU5vZGUobm9kZSkge1xuICAgIGlmIChub2RlLnR5cGUgIT09IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobm9kZS5hdHRyc01hcCkuZmlsdGVyKG4gPT4gcmVCaW5kLnRlc3QobikpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBub2RlLmF0dHJzTWFwW2tleV07XG4gICAgICAgIGRlbGV0ZSBub2RlLmF0dHJzTWFwW2tleV07XG4gICAgICAgIGNvbnN0IHJldCA9IHRyYW5zZm9ybSh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGNvZGUgPSByZXQuY29kZTtcbiAgICAgICAgbm9kZS5hdHRyc01hcFtrZXkucmVwbGFjZShyZUJpbmQsICcnKV0gPSBge3sgJHtjb2RlfSB9fWA7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuYXR0cnNNYXBbJ3YtYmluZCddKSB7XG4gICAgICAgIGNvbnN0IHZCaW5kID0gbm9kZS5hdHRyc01hcFsndi1iaW5kJ107XG4gICAgICAgIG5vZGUuYXR0cnNNYXBbJ3MtYmluZCddID0gYHt7ICR7dHJhbnNmb3JtKHZCaW5kKS5jb2RlfSB9fWA7XG4gICAgICAgIGRlbGV0ZSBub2RlLmF0dHJzTWFwWyd2LWJpbmQnXTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwb3N0VHJhbnNmb3JtTm9kZVxufTtcbiIsIi8qKlxuICogQGZpbGUgaWZcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4uL2V4cHJlc3Npb24tdHJhbnNmb3JtZXInO1xuXG5mdW5jdGlvbiBwb3N0VHJhbnNmb3JtTm9kZShub2RlKSB7XG4gICAgaWYgKG5vZGUudHlwZSAhPT0gMSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuaWYpIHtcbiAgICAgICAgbm9kZS5hdHRyc01hcFsncy1pZiddID0gdHJhbnNmb3JtKG5vZGUuaWYpLmNvZGU7XG4gICAgICAgIGRlbGV0ZSBub2RlLmF0dHJzTWFwWyd2LWlmJ107XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuZWxzZWlmKSB7XG4gICAgICAgIG5vZGUuYXR0cnNNYXBbJ3MtZWxzZS1pZiddID0gdHJhbnNmb3JtKG5vZGUuZWxzZWlmKS5jb2RlO1xuICAgICAgICBkZWxldGUgbm9kZS5hdHRyc01hcFsndi1lbHNlLWlmJ107XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuZWxzZSkge1xuICAgICAgICBub2RlLmF0dHJzTWFwWydzLWVsc2UnXSA9IG5vZGUuZWxzZTtcbiAgICAgICAgZGVsZXRlIG5vZGUuYXR0cnNNYXBbJ3YtZWxzZSddO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHBvc3RUcmFuc2Zvcm1Ob2RlXG59O1xuIiwiLyoqXG4gKiBAZmlsZSBmb3JcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4uL2V4cHJlc3Npb24tdHJhbnNmb3JtZXInO1xuXG5mdW5jdGlvbiBwb3N0VHJhbnNmb3JtTm9kZShub2RlKSB7XG4gICAgaWYgKG5vZGUudHlwZSAhPT0gMSB8fCAhbm9kZS5mb3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmciA9IG5vZGUuYWxpYXM7XG5cbiAgICBpZiAobm9kZS5pdGVyYXRvcjEpIHtcbiAgICAgICAgZnIgKz0gYCwke25vZGUuaXRlcmF0b3IxfWA7XG4gICAgfVxuXG4gICAgZnIgKz0gYCBpbiBfbCgke25vZGUuZm9yfSlgO1xuXG4gICAgaWYgKG5vZGUua2V5KSB7XG4gICAgICAgIGNvbnN0IHRyYWNrQnlFeHByID0gdHJhbnNmb3JtKG5vZGUua2V5KTtcbiAgICAgICAgLy8gc2FuIOWPquaUr+aMgeWPmOmHj1xuICAgICAgICBmciArPSB0cmFja0J5RXhwci5hc3QudHlwZSA9PT0gJ0lkZW50aWZpZXInID8gYCB0cmFja0J5ICR7bm9kZS5rZXl9YCA6ICcnO1xuICAgIH1cblxuICAgIG5vZGUuYXR0cnNNYXBbJ3MtZm9yJ10gPSBmcjtcblxuICAgIGRlbGV0ZSBub2RlLmF0dHJzTWFwWyd2LWZvciddO1xuICAgIGRlbGV0ZSBub2RlLmF0dHJzTWFwWydrZXknXTtcbiAgICBkZWxldGUgbm9kZS5hdHRyc01hcFsnOmtleSddO1xuICAgIGRlbGV0ZSBub2RlLmF0dHJzTWFwWyd2LWJpbmQ6a2V5J107XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwb3N0VHJhbnNmb3JtTm9kZVxufTtcbiIsIi8qKlxuICogQGZpbGUgZXZlbnRcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy4uL2V4cHJlc3Npb24tdHJhbnNmb3JtZXInO1xuXG5jb25zdCByZUV2ZW50ID0gL14oQHx2LW9uOikvO1xuXG5mdW5jdGlvbiBwb3N0VHJhbnNmb3JtTm9kZShub2RlKSB7XG4gICAgY29uc3QgZXZlbnRBdHRycyA9IG5vZGUuYXR0cnNMaXN0LmZpbHRlcihuID0+IHJlRXZlbnQudGVzdChuLm5hbWUpKTtcbiAgICBmb3IgKGNvbnN0IGF0dHIgb2YgZXZlbnRBdHRycykge1xuICAgICAgICBkZWxldGUgbm9kZS5hdHRyc01hcFthdHRyLm5hbWVdO1xuICAgICAgICBjb25zdCBbbmFtZSwgLi4ubW9kaWZpZXJzXSA9IGF0dHIubmFtZS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBhdHRyLnZhbHVlID8gdHJhbnNmb3JtKGF0dHIudmFsdWUpLmNvZGUgOiAnX25vb3AnO1xuICAgICAgICBub2RlLmF0dHJzTWFwW2Bvbi0ke25hbWUucmVwbGFjZShyZUV2ZW50LCAnJyl9YF1cbiAgICAgICAgICAgID0gYCR7bW9kaWZpZXJzLm1hcChtID0+IGAke219OmApLmpvaW4oJycpfSR7ZXZlbnRIYW5kbGVyfWA7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcG9zdFRyYW5zZm9ybU5vZGVcbn07XG4iLCIvKipcbiAqIEBmaWxlIGNsYXNzXG4gKiBAYXV0aG9yIGN4dG9tKGN4dG9tMjAwOEBnbWFpbC5jb20pXG4gKi9cblxuZnVuY3Rpb24gcG9zdFRyYW5zZm9ybU5vZGUobm9kZSkge1xuXG4gICAgaWYgKG5vZGUuYXR0cnNNYXAgJiYgbm9kZS5hdHRyc01hcFsndi1kYW5nZXJvdXMtaHRtbCddKSB7XG4gICAgICAgIGNvbnN0IGRpciA9IG5vZGUuZGlyZWN0aXZlcy5maW5kKGQgPT4gZC5uYW1lID09PSAnZGFuZ2Vyb3VzLWh0bWwnKTtcbiAgICAgICAgZGlyLm5hbWUgPSAnaHRtbCc7XG4gICAgICAgIGRpci52YWx1ZSA9IG5vZGUuYXR0cnNNYXBbJ3YtaHRtbCddID0gbm9kZS5hdHRyc01hcFsndi1kYW5nZXJvdXMtaHRtbCddO1xuICAgICAgICBkZWxldGUgbm9kZS5hdHRyc01hcFsndi1kYW5nZXJvdXMtaHRtbCddO1xuICAgIH1cblxuICAgIGlmIChub2RlLmF0dHJzTWFwICYmIG5vZGUuYXR0cnNNYXBbJ3Ytc2FmZS1odG1sJ10pIHtcbiAgICAgICAgY29uc3QgZGlyID0gbm9kZS5kaXJlY3RpdmVzLmZpbmQoZCA9PiBkLm5hbWUgPT09ICdzYWZlLWh0bWwnKTtcbiAgICAgICAgZGlyLm5hbWUgPSAnaHRtbCc7XG4gICAgICAgIGRpci52YWx1ZSA9IG5vZGUuYXR0cnNNYXBbJ3YtaHRtbCddID0gYF9zZigke25vZGUuYXR0cnNNYXBbJ3Ytc2FmZS1odG1sJ119KWA7XG4gICAgICAgIGRlbGV0ZSBub2RlLmF0dHJzTWFwWyd2LXNhZmUtaHRtbCddO1xuICAgIH1cblxuICAgIGlmIChub2RlLnR5cGUgPT09IDEgJiYgbm9kZS5hdHRyc01hcFsndi1odG1sJ10pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBub2RlLmRpcmVjdGl2ZXMuZmluZChkID0+IGQubmFtZSA9PT0gJ2h0bWwnKS52YWx1ZTtcbiAgICAgICAgZGVsZXRlIG5vZGUuYXR0cnNNYXBbJ3YtaHRtbCddO1xuICAgICAgICBub2RlLmF0dHJzTWFwWydzLWh0bWwnXSA9IGB7eyAke3ZhbHVlfSB9fWA7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4gPSBbXTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAxICYmIG5vZGUuYXR0cnNNYXBbJ3YtdGV4dCddKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gbm9kZS5kaXJlY3RpdmVzLmZpbmQoZCA9PiBkLm5hbWUgPT09ICd0ZXh0JykudmFsdWU7XG4gICAgICAgIGRlbGV0ZSBub2RlLmF0dHJzTWFwWyd2LXRleHQnXTtcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IFt7XG4gICAgICAgICAgICB0eXBlOiAyLFxuICAgICAgICAgICAgdGV4dDogYHt7ICR7dmFsdWV9IH19YFxuICAgICAgICB9XTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwb3N0VHJhbnNmb3JtTm9kZVxufTtcbiIsIi8qKlxuICogQGZpbGUgcmVmXG4gKiBAYXV0aG9yIGN4dG9tKGN4dG9tMjAwOEBnbWFpbC5jb20pXG4gKi9cblxuZnVuY3Rpb24gcG9zdFRyYW5zZm9ybU5vZGUobm9kZSwgb3B0aW9ucykge1xuICAgIGlmIChub2RlLnR5cGUgIT09IDEgfHwgIW5vZGUuYXR0cnNNYXAucmVmICYmICFub2RlLmF0dHJzTWFwWyc6cmVmJ10pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZiA9IG5vZGUuYXR0cnNNYXAucmVmO1xuICAgIGlmIChyZWYpIHtcbiAgICAgICAgZGVsZXRlIG5vZGUuYXR0cnNNYXAucmVmO1xuICAgICAgICBub2RlLmF0dHJzTWFwWydzLXJlZiddID0gcmVmO1xuXG4gICAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgICAgICBuYW1lOiByZWYsXG4gICAgICAgICAgICByb290OiBub2RlLnBhcmVudCA/IHVuZGVmaW5lZCA6IDFcbiAgICAgICAgfTtcblxuICAgICAgICBvcHRpb25zLnJlZnMucHVzaChpbmZvKTtcbiAgICB9XG5cbiAgICBjb25zdCBiaW5kUmVmID0gbm9kZS5hdHRyc01hcFsnOnJlZiddO1xuICAgIGlmIChiaW5kUmVmKSB7XG4gICAgICAgIGRlbGV0ZSBub2RlLmF0dHJzTWFwWyc6cmVmJ107XG4gICAgICAgIG5vZGUuYXR0cnNNYXBbJ3MtcmVmJ10gPSBge3sgJHtiaW5kUmVmfSB9fWA7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcG9zdFRyYW5zZm9ybU5vZGVcbn07XG4iLCIvKipcbiAqIEBmaWxlIGNvbXBvbmVudCA6aXNcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG5pbXBvcnQge3BhcnNlfSBmcm9tICdhdG9tLWV4cHJlc3Npb24tY29tcGlsZXInO1xuXG5mdW5jdGlvbiBwb3N0VHJhbnNmb3JtTm9kZShub2RlLCBvcHRpb25zKSB7XG4gICAgaWYgKCEobm9kZS50eXBlID09PSAxICYmIG5vZGUudGFnID09PSAnY29tcG9uZW50JykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpcyA9IG5vZGUuYXR0cnNNYXAuaXM7XG4gICAgZGVsZXRlIG5vZGUuYXR0cnNNYXAuaXM7XG5cbiAgICBpZiAoIWlzLnN0YXJ0c1dpdGgoJ3t7JykpIHtcbiAgICAgICAgbm9kZS50YWcgPSBub2RlLmF0dHJzTWFwLmlzO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBpcy5zbGljZSgyLCBpcy5sZW5ndGggLSAyKS50cmltKCk7XG4gICAgY29uc3QgZXhwciA9IHBhcnNlKHZhbHVlLCB7XG4gICAgICAgIHN0YXJ0UnVsZTogJ1Z1ZUV4cHJlc3Npb24nXG4gICAgfSk7XG5cbiAgICBpZiAobm9kZS5pZiB8fCBub2RlLmVsc2VpZiB8fCBub2RlLmVsc2UpIHtcbiAgICAgICAgb3B0aW9ucy5lcnJvcignZHluYW1pYyBjb21wb25lbnQgY2FuIG5vdCB1c2Ugd2l0aCB2LWlmLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICBleHByLmV4cHJlc3Npb24udHlwZSA9PT0gJ0NvbmRpdGlvbmFsRXhwcmVzc2lvbidcbiAgICAgICAgJiYgZXhwci5leHByZXNzaW9uLmNvbnNlcXVlbnQudHlwZSA9PT0gJ0xpdGVyYWwnXG4gICAgICAgICYmIGV4cHIuZXhwcmVzc2lvbi5hbHRlcm5hdGUudHlwZSA9PT0gJ0xpdGVyYWwnXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHRlc3RMb2NhdGlvbiA9IGV4cHIuZXhwcmVzc2lvbi50ZXN0LmxvY2F0aW9uO1xuICAgICAgICBjb25zdCB0ZXN0ID0gdmFsdWUuc2xpY2UodGVzdExvY2F0aW9uLnN0YXJ0Lm9mZnNldCwgdGVzdExvY2F0aW9uLmVuZC5vZmZzZXQpO1xuICAgICAgICBjb25zdCBhdHRycyA9IHtcbiAgICAgICAgICAgIC4uLm5vZGUuYXR0cnNNYXAsXG4gICAgICAgICAgICAncy1lbHNlJzogJydcbiAgICAgICAgfTtcbiAgICAgICAgbm9kZS50YWcgPSBleHByLmV4cHJlc3Npb24uY29uc2VxdWVudC52YWx1ZTtcbiAgICAgICAgbm9kZS5hdHRyc01hcFsncy1pZiddID0gdGVzdDtcbiAgICAgICAgbm9kZS5pZkNvbmRpdGlvbnMgPSBbe1xuICAgICAgICAgICAgZXhwOiB0ZXN0LFxuICAgICAgICAgICAgYmxvY2s6IG5vZGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYmxvY2s6IHtcbiAgICAgICAgICAgICAgICAuLi5ub2RlLFxuICAgICAgICAgICAgICAgIGF0dHJzTWFwOiBhdHRycyxcbiAgICAgICAgICAgICAgICB0YWc6IGV4cHIuZXhwcmVzc2lvbi5hbHRlcm5hdGUudmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcG9zdFRyYW5zZm9ybU5vZGVcbn07XG4iLCIvKipcbiAqIEBmaWxlIGNvbnN0YW50c1xuICogQGF1dGhvciBjeHRvbShjeHRvbTIwMDhAZ21haWwuY29tKVxuICovXG5cbi8qXG4gIFNlbGYtZW5jbG9zaW5nIHRhZ3MgKHN0b2xlbiBmcm9tIG5vZGUtaHRtbHBhcnNlcilcbiovXG5leHBvcnQgY29uc3Qgc2luZ2xlVGFnID0ge1xuICAgIGFyZWE6IHRydWUsXG4gICAgYmFzZTogdHJ1ZSxcbiAgICBiYXNlZm9udDogdHJ1ZSxcbiAgICBicjogdHJ1ZSxcbiAgICBjb2w6IHRydWUsXG4gICAgY29tbWFuZDogdHJ1ZSxcbiAgICBlbWJlZDogdHJ1ZSxcbiAgICBmcmFtZTogdHJ1ZSxcbiAgICBocjogdHJ1ZSxcbiAgICBpbWc6IHRydWUsXG4gICAgaW5wdXQ6IHRydWUsXG4gICAgaXNpbmRleDogdHJ1ZSxcbiAgICBrZXlnZW46IHRydWUsXG4gICAgbGluazogdHJ1ZSxcbiAgICBtZXRhOiB0cnVlLFxuICAgIHBhcmFtOiB0cnVlLFxuICAgIHNvdXJjZTogdHJ1ZSxcbiAgICB0cmFjazogdHJ1ZSxcbiAgICB3YnI6IHRydWVcbn07XG5cbmV4cG9ydCBjb25zdCBib29sZWFuQXR0ciA9IHtcbiAgICBhbGxvd2Z1bGxzY3JlZW46IHRydWUsXG4gICAgYXN5bmM6IHRydWUsXG4gICAgYXV0b2ZvY3VzOiB0cnVlLFxuICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgY29tcGFjdDogdHJ1ZSxcbiAgICBjb250cm9sczogdHJ1ZSxcbiAgICBkZWNsYXJlOiB0cnVlLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgZGVmYXVsdGNoZWNrZWQ6IHRydWUsXG4gICAgZGVmYXVsdG11dGVkOiB0cnVlLFxuICAgIGRlZmF1bHRzZWxlY3RlZDogdHJ1ZSxcbiAgICBkZWZlcjogdHJ1ZSxcbiAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIGZvcm1ub3ZhbGlkYXRlOiB0cnVlLFxuICAgIGhpZGRlbjogdHJ1ZSxcbiAgICBpbmRldGVybWluYXRlOiB0cnVlLFxuICAgIGluZXJ0OiB0cnVlLFxuICAgIGlzbWFwOiB0cnVlLFxuICAgIGl0ZW1zY29wZTogdHJ1ZSxcbiAgICBsb29wOiB0cnVlLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIG11dGVkOiB0cnVlLFxuICAgIG5vaHJlZjogdHJ1ZSxcbiAgICBub3Jlc2l6ZTogdHJ1ZSxcbiAgICBub3NoYWRlOiB0cnVlLFxuICAgIG5vdmFsaWRhdGU6IHRydWUsXG4gICAgbm93cmFwOiB0cnVlLFxuICAgIG9wZW46IHRydWUsXG4gICAgcGF1c2VvbmV4aXQ6IHRydWUsXG4gICAgcmVhZG9ubHk6IHRydWUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgcmV2ZXJzZWQ6IHRydWUsXG4gICAgc2NvcGVkOiB0cnVlLFxuICAgIHNlYW1sZXNzOiB0cnVlLFxuICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICB0cnVlc3BlZWQ6IHRydWUsXG4gICAgdHlwZW11c3RtYXRjaDogdHJ1ZSxcbiAgICB2aXNpYmxlOiB0cnVlLFxufTtcblxuXG5leHBvcnQgY29uc3Qgbm9WYWx1ZUF0dHIgPSB7XG4gICAgJ3MtZWxzZSc6IHRydWVcbn07XG5cblxuZXhwb3J0IGNvbnN0IGh0bWxUYWcgPSB7XG4gICAgaHRtbDogdHJ1ZSxcbiAgICBib2R5OiB0cnVlLFxuICAgIGJhc2U6IHRydWUsXG4gICAgaGVhZDogdHJ1ZSxcbiAgICBsaW5rOiB0cnVlLFxuICAgIG1ldGE6IHRydWUsXG4gICAgc3R5bGU6IHRydWUsXG4gICAgdGl0bGU6IHRydWUsXG4gICAgYWRkcmVzczogdHJ1ZSxcbiAgICBhcnRpY2xlOiB0cnVlLFxuICAgIGFzaWRlOiB0cnVlLFxuICAgIGZvb3RlcjogdHJ1ZSxcbiAgICBoZWFkZXI6IHRydWUsXG4gICAgaDE6IHRydWUsXG4gICAgaDI6IHRydWUsXG4gICAgaDM6IHRydWUsXG4gICAgaDQ6IHRydWUsXG4gICAgaDU6IHRydWUsXG4gICAgaDY6IHRydWUsXG4gICAgaGdyb3VwOiB0cnVlLFxuICAgIG5hdjogdHJ1ZSxcbiAgICBzZWN0aW9uOiB0cnVlLFxuICAgIGRpdjogdHJ1ZSxcbiAgICBkZDogdHJ1ZSxcbiAgICBkbDogdHJ1ZSxcbiAgICBkdDogdHJ1ZSxcbiAgICBmaWdjYXB0aW9uOiB0cnVlLFxuICAgIGZpZ3VyZTogdHJ1ZSxcbiAgICBocjogdHJ1ZSxcbiAgICBpbWc6IHRydWUsXG4gICAgbGk6IHRydWUsXG4gICAgbWFpbjogdHJ1ZSxcbiAgICBvbDogdHJ1ZSxcbiAgICBwOiB0cnVlLFxuICAgIHByZTogdHJ1ZSxcbiAgICB1bDogdHJ1ZSxcbiAgICBhOiB0cnVlLFxuICAgIGI6IHRydWUsXG4gICAgYWJicjogdHJ1ZSxcbiAgICBiZGk6IHRydWUsXG4gICAgYmRvOiB0cnVlLFxuICAgIGJyOiB0cnVlLFxuICAgIGNpdGU6IHRydWUsXG4gICAgY29kZTogdHJ1ZSxcbiAgICBkYXRhOiB0cnVlLFxuICAgIGRmbjogdHJ1ZSxcbiAgICBlbTogdHJ1ZSxcbiAgICBpOiB0cnVlLFxuICAgIGtiZDogdHJ1ZSxcbiAgICBtYXJrOiB0cnVlLFxuICAgIHE6IHRydWUsXG4gICAgcnA6IHRydWUsXG4gICAgcnQ6IHRydWUsXG4gICAgcnRjOiB0cnVlLFxuICAgIHJ1Ynk6IHRydWUsXG4gICAgczogdHJ1ZSxcbiAgICBzYW1wOiB0cnVlLFxuICAgIHNtYWxsOiB0cnVlLFxuICAgIHNwYW46IHRydWUsXG4gICAgc3Ryb25nOiB0cnVlLFxuICAgIHN1YjogdHJ1ZSxcbiAgICBzdXA6IHRydWUsXG4gICAgdGltZTogdHJ1ZSxcbiAgICB1OiB0cnVlLFxuICAgIHZhcjogdHJ1ZSxcbiAgICB3YnI6IHRydWUsXG4gICAgYXJlYTogdHJ1ZSxcbiAgICBhdWRpbzogdHJ1ZSxcbiAgICBtYXA6IHRydWUsXG4gICAgdHJhY2s6IHRydWUsXG4gICAgdmlkZW86IHRydWUsXG4gICAgZW1iZWQ6IHRydWUsXG4gICAgb2JqZWN0OiB0cnVlLFxuICAgIHBhcmFtOiB0cnVlLFxuICAgIHNvdXJjZTogdHJ1ZSxcbiAgICBjYW52YXM6IHRydWUsXG4gICAgc2NyaXB0OiB0cnVlLFxuICAgIG5vc2NyaXB0OiB0cnVlLFxuICAgIGRlbDogdHJ1ZSxcbiAgICBpbnM6IHRydWUsXG4gICAgY2FwdGlvbjogdHJ1ZSxcbiAgICBjb2w6IHRydWUsXG4gICAgY29sZ3JvdXA6IHRydWUsXG4gICAgdGFibGU6IHRydWUsXG4gICAgdGhlYWQ6IHRydWUsXG4gICAgdGJvZHk6IHRydWUsXG4gICAgdGQ6IHRydWUsXG4gICAgdGg6IHRydWUsXG4gICAgdHI6IHRydWUsXG4gICAgYnV0dG9uOiB0cnVlLFxuICAgIGRhdGFsaXN0OiB0cnVlLFxuICAgIGZpZWxkc2V0OiB0cnVlLFxuICAgIGZvcm06IHRydWUsXG4gICAgaW5wdXQ6IHRydWUsXG4gICAgbGFiZWw6IHRydWUsXG4gICAgbGVnZW5kOiB0cnVlLFxuICAgIG1ldGVyOiB0cnVlLFxuICAgIG9wdGdyb3VwOiB0cnVlLFxuICAgIG9wdGlvbjogdHJ1ZSxcbiAgICBvdXRwdXQ6IHRydWUsXG4gICAgcHJvZ3Jlc3M6IHRydWUsXG4gICAgc2VsZWN0OiB0cnVlLFxuICAgIHRleHRhcmVhOiB0cnVlLFxuICAgIGRldGFpbHM6IHRydWUsXG4gICAgZGlhbG9nOiB0cnVlLFxuICAgIG1lbnU6IHRydWUsXG4gICAgbWVudWl0ZW06IHRydWUsXG4gICAgc3VtbWFyeTogdHJ1ZSxcbiAgICBjb250ZW50OiB0cnVlLFxuICAgIGVsZW1lbnQ6IHRydWUsXG4gICAgc2hhZG93OiB0cnVlLFxuICAgIHRlbXBsYXRlOiB0cnVlXG59O1xuIiwiLyoqXG4gKiBAZmlsZSBib29sIOWei+S8oOWAvFxuICogQGF1dGhvciBjeHRvbShjeHRvbTIwMDhAZ21haWwuY29tKVxuICovXG5cbmltcG9ydCB7Ym9vbGVhbkF0dHIsIG5vVmFsdWVBdHRyLCBodG1sVGFnfSBmcm9tICcuLi9jb25zdGFudCc7XG5cbmZ1bmN0aW9uIHBvc3RUcmFuc2Zvcm1Ob2RlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUudHlwZSA9PT0gMSB8fCAhbm9kZS5hdHRyc01hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG5vZGUuYXR0cnNNYXApLmZpbHRlcihuID0+IG5vZGUuYXR0cnNNYXBbbl0gPT09ICcnKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIGlmICgoaHRtbFRhZ1tub2RlLnRhZ10gJiYgYm9vbGVhbkF0dHJba2V5XSkgfHwgbm9WYWx1ZUF0dHJba2V5XSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5hdHRyc01hcFtrZXldID0gYHt7IHRydWUgfX1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHBvc3RUcmFuc2Zvcm1Ob2RlXG59O1xuIiwiLyoqXG4gKiBAZmlsZSB0ZW1wbGF0ZVxuICogQGF1dGhvciBjeHRvbShjeHRvbTIwMDhAZ21haWwuY29tKVxuICovXG5cbmZ1bmN0aW9uIHByZVRyYW5zZm9ybU5vZGUoZWwpIHtcbiAgICBpZiAoZWwudGFnID09PSAndGVtcGxhdGUnKSB7XG4gICAgICAgIGVsLnRhZyA9ICdmcmFnbWVudCc7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcHJlVHJhbnNmb3JtTm9kZVxufTtcbiIsIi8qKlxuICogQGZpbGUgdGVtcGxhdGVcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG5pbXBvcnQge2NhbWVsQ2FzZX0gZnJvbSAnbG9kYXNoJztcblxuZnVuY3Rpb24gcG9zdFRyYW5zZm9ybU5vZGUoZWwpIHtcbiAgICBpZiAoZWwudGFnID09PSAndHJhbnNpdGlvbicpIHtcbiAgICAgICAgZWwudGFnID0gJ2ZyYWdtZW50JztcblxuICAgICAgICBjb25zdCBhdHRycyA9IE9iamVjdC5rZXlzKGVsLmF0dHJzTWFwKS5tYXAobmFtZSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBlbC5hdHRyc01hcFtuYW1lXTtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3RhcnRzV2l0aCgne3snKSA/IHZhbHVlLnNsaWNlKDIsIHZhbHVlLmxlbmd0aCAtIDIpIDogYCcke3ZhbHVlfSdgO1xuICAgICAgICAgICAgZGVsZXRlIGVsLmF0dHJzTWFwW25hbWVdO1xuICAgICAgICAgICAgcmV0dXJuIGAke2NhbWVsQ2FzZShuYW1lKX06JHt2YWx1ZX1gO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZWwuY2hpbGRyZW4gJiYgZWwuY2hpbGRyZW5bMF0pIHtcbiAgICAgICAgICAgIGVsLmNoaWxkcmVuWzBdLmF0dHJzTWFwWydzLXRyYW5zaXRpb24nXSA9IGBfdCh7JHthdHRycy5qb2luKCcsJyl9fSlgO1xuXG4gICAgICAgICAgICBpZiAoZWwuY2hpbGRyZW5bMF0uaWZDb25kaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGVsLmNoaWxkcmVuWzBdLmlmQ29uZGl0aW9ucy5zbGljZSgxKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5hdHRyc01hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hdHRyc01hcFsncy10cmFuc2l0aW9uJ10gPSBgX3QoeyR7YXR0cnMuam9pbignLCcpfX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHBvc3RUcmFuc2Zvcm1Ob2RlXG59O1xuIiwiLyoqXG4gKiBAZmlsZSB0ZXh0LWNvbWJpbmVcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG5pbXBvcnQgZXNjYXBlUXVvdGVzIGZyb20gJ2VzY2FwZS1xdW90ZXMnO1xuaW1wb3J0IHt0cmltfSBmcm9tICdsb2Rhc2gnO1xuXG5mdW5jdGlvbiBwb3N0VHJhbnNmb3JtTm9kZShlbCwgc3RhdGUpIHtcbiAgICBpZiAoZWwuY2hpbGRyZW4gJiYgZWwuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGVsLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQudHlwZSAhPT0gMiB8fCAhY2hpbGQudG9rZW5zIHx8IGNoaWxkLnRva2Vucy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hpbGQudGV4dCA9IGNoaWxkLnRva2Vucy5tYXAoKHRva2VuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gJ1xcJ1xcJyc7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuWydAYmluZGluZyddKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB0b2tlblsnQGJpbmRpbmcnXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGAnJHtlc2NhcGVRdW90ZXMoc3RhdGUuc3RyaXAgPyB0cmltKHRva2VuLCAnIFxcblxcdCcpIDogdG9rZW4pfSdgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggPT09IDAgPyB0ZXh0IDogYF9jYXQoJHt0ZXh0fSlgO1xuICAgICAgICAgICAgfSkuam9pbignIHwgJyk7XG5cbiAgICAgICAgICAgIGNoaWxkLnRleHQgPSBge3sgJHtjaGlsZC50ZXh0fSB9fWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwb3N0VHJhbnNmb3JtTm9kZVxufTtcbiIsIi8qKlxuICogQGZpbGUgdHJhbnNmb3JtZXJzXG4gKiBAYXV0aG9yIGN4dG9tKGN4dG9tMjAwOEBnbWFpbC5jb20pXG4gKi9cblxuaW1wb3J0IGNsYXp6IGZyb20gJy4vY2xhc3MnO1xuaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGUnO1xuaW1wb3J0IGJpbmQgZnJvbSAnLi9iaW5kJztcbmltcG9ydCB5ZiBmcm9tICcuL2lmJztcbmltcG9ydCBmciBmcm9tICcuL2Zvcic7XG5pbXBvcnQgZXZlbnQgZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQgaHRtbCBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IHJlZiBmcm9tICcuL3JlZic7XG5pbXBvcnQgZHluYW1pY0NvbXBvbmVudCBmcm9tICcuL2R5bmFtaWMtY29tcG9uZW50JztcbmltcG9ydCBib29sIGZyb20gJy4vYm9vbGVhbic7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5pbXBvcnQgdHJhbnNpdGlvbiBmcm9tICcuL3RyYW5zaXRpb24nO1xuaW1wb3J0IHRleHRDb21iaW5lIGZyb20gJy4vdGV4dC1jb21iaW5lJztcblxuZXhwb3J0IGRlZmF1bHQgW1xuICAgIHRlbXBsYXRlLFxuICAgIGJvb2wsXG4gICAgeWYsXG4gICAgZnIsXG4gICAgZXZlbnQsXG4gICAgaHRtbCxcbiAgICByZWYsXG4gICAgdGV4dENvbWJpbmUsXG5cbiAgICBjbGF6eixcbiAgICBzdHlsZSxcblxuICAgIC8vIGJpbmQg5pS+5Zyo5omA5pyJ5aSE55CG5a6M5LmL5ZCOXG4gICAgYmluZCxcbiAgICB0cmFuc2l0aW9uLFxuXG4gICAgZHluYW1pY0NvbXBvbmVudFxuXTtcbiIsIi8qKlxuICogQGZpbGUgZ2V0IGh0bWwgZnJvbSBhc3RcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG5pbXBvcnQge3RyaW19IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge25vVmFsdWVBdHRyLCBzaW5nbGVUYWcsIGJvb2xlYW5BdHRyLCBodG1sVGFnfSBmcm9tICcuL2NvbnN0YW50JztcbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnLi9leHByZXNzaW9uLXRyYW5zZm9ybWVyJztcblxuZnVuY3Rpb24gc3RyaW5naWZ5QXR0cihrZXksIHZhbHVlLCB0YWcpIHtcbiAgICBpZiAobm9WYWx1ZUF0dHJba2V5XSB8fCAoIXZhbHVlICYmIGh0bWxUYWdbdGFnXSAmJiBib29sZWFuQXR0cltrZXldKSkge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgICByZXR1cm4gYCR7a2V5fT0ke0pTT04uc3RyaW5naWZ5KHZhbHVlLnN0YXJ0c1dpdGgoJ3t7JykgPyB2YWx1ZSA6IHZhbHVlLnJlcGxhY2UoL1xccysvZywgJyAnKSl9YDtcbn1cblxuLy8gZnVuY3Rpb24gdHJhbnNmb3JtQ2hpbGQobm9kZSkge1xuLy8gICAgIHJldHVybiBub2RlLnRva2Vucy5yZWR1Y2UoKHByZXYsIHRva2VuKSA9PiB7XG4vLyAgICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gcHJldiArIHRva2VuO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKG5vZGUpO1xuLy8gICAgICAgICByZXR1cm4gcHJldiArIGB7eyAke3RyYW5zZm9ybSh0b2tlblsnQGJpbmRpbmcnXSkuY29kZX0gfX1gO1xuLy8gICAgIH0sICcnKTtcbi8vIH1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5naWZ5KGFzdCwge3Njb3BlSWQsIHN0cmlwLCBhdG9tfSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhc3QpKSB7XG4gICAgICAgIGFzdCA9IFthc3RdO1xuICAgIH1cblxuICAgIGxldCBodG1sID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgYXN0KSB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IDMgfHwgbm9kZS50eXBlID09PSAyKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gbm9kZS50ZXh0O1xuICAgICAgICAgICAgaHRtbCArPSBzdHJpcFxuICAgICAgICAgICAgICAgID8gdHJpbSh0ZXh0LCAnIFxcblxcdCcpXG4gICAgICAgICAgICAgICAgOiB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgY29uc3QgYXR0cnMgPSBPYmplY3Qua2V5cyhub2RlLmF0dHJzTWFwKS5tYXAoa2V5ID0+IHN0cmluZ2lmeUF0dHIoa2V5LCBub2RlLmF0dHJzTWFwW2tleV0sIG5vZGUudGFnKSk7XG4gICAgICAgICAgICBpZiAoc2NvcGVJZCkge1xuICAgICAgICAgICAgICAgIHNjb3BlSWQgPSBzY29wZUlkLnJlcGxhY2UoL15kYXRhLShhfHYpLS8sICcnKTtcbiAgICAgICAgICAgICAgICBhdHRycy5wdXNoKGBkYXRhLSR7YXRvbSA/ICdhJyA6ICd2J30tJHtzY29wZUlkfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaGFzQ2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIGNvbnN0IGhhc0F0dHIgPSBhdHRycy5sZW5ndGggPiAwO1xuICAgICAgICAgICAgaHRtbCArPSBgPCR7bm9kZS50YWd9JHtoYXNBdHRyID8gJyAnIDogJyd9JHthdHRycy5qb2luKCcgJyl9PmA7XG4gICAgICAgICAgICBodG1sICs9IGhhc0NoaWxkcmVuID8gc3RyaW5naWZ5KG5vZGUuY2hpbGRyZW4sIHtzY29wZUlkLCBzdHJpcCwgYXRvbX0pIDogJyc7XG4gICAgICAgICAgICBodG1sICs9ICFoYXNDaGlsZHJlbiAmJiBzaW5nbGVUYWdbbm9kZS50YWddID8gJycgOiBgPC8ke25vZGUudGFnfT5gO1xuXG4gICAgICAgICAgICBpZiAobm9kZS5pZkNvbmRpdGlvbnMgJiYgbm9kZS5pZkNvbmRpdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gc3RyaW5naWZ5KG5vZGUuaWZDb25kaXRpb25zLnNsaWNlKDEpLm1hcChuID0+IG4uYmxvY2spLCB7c2NvcGVJZCwgc3RyaXAsIGF0b219KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBodG1sO1xufVxuIiwiLyoqXG4gKiBAZmlsZSDkuIDkupvlt6Xlhbflh73mlbBcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG4vKipcbiAqIE1peCBwcm9wZXJ0aWVzIGludG8gdGFyZ2V0IG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGV4dGVuZCA9IE9iamVjdC5hc3NpZ247XG5cbi8qKlxuICogTWVyZ2UgYW4gQXJyYXkgb2YgT2JqZWN0cyBpbnRvIGEgc2luZ2xlIE9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvT2JqZWN0KGFycikge1xuICAgIGNvbnN0IHJlcyA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJbaV0pIHtcbiAgICAgICAgICAgIGV4dGVuZChyZXMsIGFycltpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW4gaXRlbSBmcm9tIGFuIGFycmF5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKGFyciwgaXRlbSkge1xuICAgIGlmIChhcnIubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogR2V0IHRoZSByYXcgdHlwZSBzdHJpbmcgb2YgYSB2YWx1ZSwgZS5nLiwgW29iamVjdCBPYmplY3RdLlxuICovXG5leHBvcnQgY29uc3QgX3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBRdWljayBvYmplY3QgY2hlY2sgLSB0aGlzIGlzIHByaW1hcmlseSB1c2VkIHRvIHRlbGxcbiAqIE9iamVjdHMgZnJvbSBwcmltaXRpdmUgdmFsdWVzIHdoZW4gd2Uga25vdyB0aGUgdmFsdWVcbiAqIGlzIGEgSlNPTi1jb21wbGlhbnQgdHlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuZXhwb3J0IGZ1bmN0aW9uIGhhc093bihvYmosIGtleSkge1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn1cblxuLyoqXG4gKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG4gKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgICByZXR1cm4gX3RvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWYob2JqLCBrZXksIHByb3BlcnR5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCBleHRlbmQoe1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSwgcHJvcGVydHkpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBjYWNoZWQgdmVyc2lvbiBvZiBhIHB1cmUgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWNoZWQoZm4pIHtcbiAgICBjb25zdCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNhY2hlZEZuKHN0cikge1xuICAgICAgICBjb25zdCBoaXQgPSBjYWNoZVtzdHJdO1xuICAgICAgICByZXR1cm4gaGl0IHx8IChjYWNoZVtzdHJdID0gZm4oc3RyKSk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBIeXBoZW5hdGUgYSBjYW1lbENhc2Ugc3RyaW5nLlxuICovXG5jb25zdCBoeXBoZW5hdGVSRSA9IC8oW14tXSkoW0EtWl0pL2c7XG5leHBvcnQgY29uc3QgaHlwaGVuYXRlID0gY2FjaGVkKChzdHIpID0+IHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAgIC5yZXBsYWNlKGh5cGhlbmF0ZVJFLCAnJDEtJDInKVxuICAgICAgICAucmVwbGFjZShoeXBoZW5hdGVSRSwgJyQxLSQyJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG59KTtcblxuZXhwb3J0IGNvbnN0IGNhbWVsaXplID0gc3RyID0+IHN0ci5yZXBsYWNlKC8tKFxcdykvZywgKF8sIGMpID0+IChjID8gYy50b1VwcGVyQ2FzZSgpIDogJycpKTtcblxuLyoqXG4gKiBFbnN1cmUgYSBmdW5jdGlvbiBpcyBjYWxsZWQgb25seSBvbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb25jZShmbikge1xuICAgIGxldCBjYWxsZWQgPSBmYWxzZVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlXG4gICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cbiAgICB9XG59XG4iLCIvKipcbiAqIEBmaWxlIGNzcyBtb2R1bGVzIG1vZHVsZVxuICogQGF1dGhvciBjeHRvbShjeHRvbTIwMDhAZ21haWwuY29tKVxuICovXG5cbmltcG9ydCB7Y2FtZWxpemV9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNzc01vZHVsZXMpIHtcblxuICAgIGZ1bmN0aW9uIHByZVRyYW5zZm9ybU5vZGUoZWwpIHtcbiAgICAgICAgaWYgKGNzc01vZHVsZXMgJiYgY3NzTW9kdWxlcy4kc3R5bGUgJiYgZWwuYXR0cnNNYXAuY2xhc3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRpY0NsYXNzID0gZWwuYXR0cnNNYXAuY2xhc3MucmVwbGFjZSgvKF5cInxcIiQpL2csICcnKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgZWwuYXR0cnNNYXAuY2xhc3MgPSBzdGF0aWNDbGFzcy5tYXAoYyA9PiAoY3NzTW9kdWxlcy4kc3R5bGVbY2FtZWxpemUoYyldIHx8IGMpKS5qb2luKCcgJyk7XG4gICAgICAgICAgICBlbC5hdHRyc0xpc3QgPSBlbC5hdHRyc0xpc3QubWFwKFxuICAgICAgICAgICAgICAgICh7bmFtZSwgdmFsdWV9KSA9PiAoe25hbWUsIHZhbHVlOiBuYW1lID09PSAnY2xhc3MnID8gZWwuYXR0cnNNYXAuY2xhc3MgOiB2YWx1ZX0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJlVHJhbnNmb3JtTm9kZVxuICAgIH07XG59XG5cbiIsIi8qKlxuICogQGZpbGUgYXRvbSBtb2R1bGVcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG5mdW5jdGlvbiBwcmVUcmFuc2Zvcm1Ob2RlKGVsKSB7XG4gICAgZWwuYXR0cnNMaXN0ID0gZWwuYXR0cnNMaXN0Lm1hcCgoe25hbWUsIHZhbHVlfSkgPT4ge1xuICAgICAgICBkZWxldGUgZWwuYXR0cnNNYXBbbmFtZV07XG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL15hLS8sICd2LScpO1xuICAgICAgICBlbC5hdHRyc01hcFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcmVUcmFuc2Zvcm1Ob2RlXG59O1xuIiwiLyoqXG4gKiBAZmlsZSDkvJjljJYgYU5vZGUg55qE5L2T56evXG4gKiBAYXV0aG9yIGN4dG9tKGN4dG9tMjAwOEBnbWFpbC5jb20pXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3B0aW1pemUoYU5vZGUpIHtcbiAgICBkZWxldGUgYU5vZGUucmF3O1xuICAgIGlmIChhTm9kZS5jaGlsZHJlbikge1xuICAgICAgICBhTm9kZS5jaGlsZHJlbiA9IGFOb2RlLmNoaWxkcmVuLm1hcChvcHRpbWl6ZSk7XG4gICAgfVxuICAgIGlmIChhTm9kZS5lbHNlcykge1xuICAgICAgICBhTm9kZS5lbHNlcyA9IGFOb2RlLmVsc2VzLm1hcChvcHRpbWl6ZSk7XG4gICAgfVxuICAgIGlmIChhTm9kZS50ZXh0RXhwcikge1xuICAgICAgICBkZWxldGUgYU5vZGUudGV4dEV4cHIucmF3O1xuICAgIH1cbiAgICBpZiAoYU5vZGUucHJvcHMpIHtcbiAgICAgICAgYU5vZGUucHJvcHMgPSBhTm9kZS5wcm9wcy5tYXAocHJvcCA9PiB7XG4gICAgICAgICAgICBpZiAocHJvcC5yYXcpIHtcbiAgICAgICAgICAgICAgICAvLyDkuI3og73liKDpmaTvvIzov5DooYzml7bmnInnlKhcbiAgICAgICAgICAgICAgICBwcm9wLnJhdyA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvcC5leHByKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHByb3AuZXhwci5yYXc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvcDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChhTm9kZS5ldmVudHMpIHtcbiAgICAgICAgYU5vZGUuZXZlbnRzID0gYU5vZGUuZXZlbnRzLm1hcChldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQucmF3KSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGV2ZW50LnJhdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5leHByKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGV2ZW50LmV4cHIucmF3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFOb2RlLmRpcmVjdGl2ZXMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoYU5vZGUuZGlyZWN0aXZlcykuZm9yRWFjaChkaXIgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIGFOb2RlLmRpcmVjdGl2ZXNbZGlyXS5yYXc7XG4gICAgICAgICAgICBpZiAoYU5vZGUuZGlyZWN0aXZlc1tkaXJdLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGFOb2RlLmRpcmVjdGl2ZXNbZGlyXS52YWx1ZS5yYXdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhTm9kZTtcbn1cbiIsIi8qKlxuICogQGZpbGUgY29tcGlsZXJcbiAqIEBhdXRob3IgY3h0b20oY3h0b20yMDA4QGdtYWlsLmNvbSlcbiAqL1xuXG5pbXBvcnQgYnVpbGRJbk1vZHVsZXMgZnJvbSAnLi9tb2R1bGVzJztcbmltcG9ydCB7Y29tcGlsZSBhcyB2dWVDb21waWxlfSBmcm9tICd2dWUtdGVtcGxhdGUtY29tcGlsZXInO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeSc7XG5pbXBvcnQgZ2V0Q3NzTW9kdWxlcyBmcm9tICcuL21vZHVsZXMvY3NzbW9kdWxlcyc7XG5pbXBvcnQgYXRvbSBmcm9tICcuL21vZHVsZXMvYXRvbSc7XG5pbXBvcnQge2lzRW1wdHl9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge3BhcnNlVGVtcGxhdGV9IGZyb20gJ3Nhbic7XG5pbXBvcnQgb3B0aW1pemUgZnJvbSAnLi9vcHRpbWl6ZS1hbm9kZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlKHNvdXJjZSwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIG1vZHVsZXMgPSBbXSxcbiAgICAgICAgY3NzTW9kdWxlcyA9IG51bGwsXG4gICAgICAgIHNjb3BlSWQgPSAnJyxcbiAgICAgICAgc3RyaXAgPSB0cnVlLFxuICAgICAgICBhdG9tOiBpc0F0b20gPSBmYWxzZVxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgaWYgKCFpc0VtcHR5KGNzc01vZHVsZXMpKSB7XG4gICAgICAgIG1vZHVsZXMudW5zaGlmdChnZXRDc3NNb2R1bGVzKGNzc01vZHVsZXMpKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBdG9tKSB7XG4gICAgICAgIG1vZHVsZXMudW5zaGlmdChhdG9tKTtcbiAgICB9XG5cbiAgICBjb25zdCBlcnJvcnMgPSBbXTtcbiAgICBjb25zdCBjb21waWxlck9wdGlvbnMgPSB7XG4gICAgICAgIG1vZHVsZXM6IFtcbiAgICAgICAgICAgIC4uLmJ1aWxkSW5Nb2R1bGVzLFxuICAgICAgICAgICAgLi4ubW9kdWxlc1xuICAgICAgICBdLFxuICAgICAgICBwcmVzZXJ2ZVdoaXRlc3BhY2U6IGZhbHNlLFxuICAgICAgICB1c2VEeW5hbWljQ29tcG9uZW50OiBmYWxzZSxcbiAgICAgICAgcmVmczogW10sXG4gICAgICAgIGVycm9yKG1zZykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW3Z1c2EgZXJyb3JdICR7bXNnfWApO1xuICAgICAgICAgICAgZXJyb3JzLnB1c2gobXNnKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RyaXBcbiAgICB9O1xuXG4gICAgLy8gY29uc29sZS5sb2coc291cmNlKTtcblxuICAgIGNvbnN0IHthc3R9ID0gdnVlQ29tcGlsZShzb3VyY2UudHJpbSgpLCBjb21waWxlck9wdGlvbnMpO1xuXG4gICAgY29uc3QgdGVtcGxhdGUgPSBzdHJpbmdpZnkoYXN0LCB7IHNjb3BlSWQsIHN0cmlwLCBhdG9tOiBpc0F0b20gfSk7XG4gICAgLy8gY29uc29sZS5sb2codGVtcGxhdGUpO1xuICAgIGNvbnN0IGFOb2RlID0gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwge1xuICAgICAgICB0cmltV2hpdGVzcGFjZTogJ2JsYW5rJ1xuICAgIH0pLmNoaWxkcmVuWzBdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXN0LFxuICAgICAgICBhTm9kZTogb3B0aW1pemUoYU5vZGUpLFxuICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgcmVmczogY29tcGlsZXJPcHRpb25zLnJlZnMsXG4gICAgICAgIGVycm9yc1xuICAgIH07XG59XG4iXSwic291cmNlUm9vdCI6IiJ9