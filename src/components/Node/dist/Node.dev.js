"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Node;

var _material = require("@mui/material");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Node(_ref) {
  var name = _ref.name,
      content = _ref.content;
  this._children = [];
  this._direction = '';
  this._JSXComponent = null;
  this._name = name;
  this._GridType = 'item';
  this._content = content;
  this._childrenCount = 0;
  this._style = {};
}

Node.prototype.direction = function (direction) {
  this._direction = direction;
};

Node.prototype.addNode = function (node) {
  this._children.push(node);

  this._childrenCount++;
  this._direction = 'row';
  this._GridType = 'contaier';
};

Node.prototype.render = function () {
  var node = deptFirstPreOrder(this, renderElement);
  return node._JSXComponent;
};

Node.prototype.updateNode = function (nodeName, Obj) {
  var foundNode = depthFirstSearch(this, nodeName);
  foundNode._style = Obj;
};

function depthFirstSearch(currentNode, name) {
  var retVal;

  currentNode._children.some(function (node) {
    retVal = depthFirstSearch(node, name);
    return retVal;
  });

  if (currentNode._name === name) {
    return currentNode;
  }

  return retVal;
}

var deptFirstPreOrder = function deptFirstPreOrder(currentNode, callback) {
  currentNode._children.forEach(function (node) {
    deptFirstPreOrder(node, callback);
  });

  callback(currentNode);

  if (currentNode._name === 'MotherNode') {
    return currentNode;
  }
};

function renderElement(currentNode) {
  if (currentNode._GridType === 'item') {
    currentNode._JSXComponent = _react["default"].createElement(_material.Grid, {
      item: true
    }, _react["default"].createElement('p', _objectSpread({
      className: currentNode._name
    }, currentNode._style), currentNode._content));
  } else {
    currentNode._JSXComponent = _react["default"].createElement(_material.Grid, {
      item: true
    }, _react["default"].createElement(_material.Grid, _objectSpread({
      container: true,
      className: currentNode._name
    }, currentNode._style), currentNode._children.map(function (child) {
      return child._JSXComponent;
    })));
  }
}