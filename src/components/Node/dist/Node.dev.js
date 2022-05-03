"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Node;

var _react = _interopRequireDefault(require("react"));

var _TreeItem = _interopRequireDefault(require("@mui/lab/TreeItem"));

var Mui = _interopRequireWildcard(require("@mui/material"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Node(_ref) {
  var name = _ref.name,
      content = _ref.content,
      MUI = _ref.MUI,
      props = _ref.props;
  this._children = [];
  this._direction = '';
  this._JSXComponent = null;
  this._MUI = MUI;
  this._JSX = null;
  this._TreeView = null;
  this._name = name;
  this._GridType = 'item';
  this._GridStyle = {};
  this._gridItem = {};
  this._content = content || '';
  this._childrenCount = 0;
  this._style = {};
  this._props = props || {};
  this._parentName = 'Alaa';
  this._paper = {
    enable: false,
    elevation: 0,
    square: false
  };
}

Node.prototype.direction = function (direction) {
  this._direction = direction;
};

Node.prototype.addNode = function (node) {
  node._parentName = this._name;

  if (node.MUI === 'Grid') {
    node._direction = 'row';
    this._GridType = 'item';
  }

  this._children.push(node);

  this._childrenCount++;
  this._direction = 'row';
  this._GridType = 'container';
};

Node.prototype.render = function () {
  var node = deptFirstPreOrder(this, renderElement);
  return node;
};

Node.prototype.makeTree = function (onItemClick) {
  var node = deptFirstPreOrder(this, TreeItemComponent, onItemClick);
  return node._TreeView;
};

Node.prototype.updateNode = function (nodeName, Obj) {
  var foundNode = depthFirstSearch(this, nodeName);
  foundNode._GridStyle = Obj;
};

Node.prototype.destroy = function (node) {
  var parentNode = depthFirstSearch(this, node._parentName);

  parentNode._children.forEach(function (childNode, i) {
    if (childNode._name === node._name) {
      parentNode._childrenCount--;
      parentNode._GridType = parentNode._childrenCount > 0 ? 'container' : 'item';

      parentNode._children.splice(i, 1);
    }
  });
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

function TreeItemComponent(currentNode, onItemClick) {
  if (currentNode._GridType === 'item') {
    currentNode._TreeView = _react["default"].createElement(_TreeItem["default"], {
      nodeId: currentNode._name,
      label: currentNode._name,
      onClick: function onClick() {
        onItemClick(currentNode);
      }
    });
  } else {
    currentNode._TreeView = _react["default"].createElement(_TreeItem["default"], {
      nodeId: currentNode._name,
      label: currentNode._name,
      onClick: function onClick() {
        onItemClick(currentNode);
      }
    }, currentNode._children.map(function (child) {
      return child._TreeView;
    }));
  }
}

var deptFirstPreOrder = function deptFirstPreOrder(currentNode, callback, cb) {
  currentNode._children.forEach(function (node) {
    deptFirstPreOrder(node, callback, cb);
  });

  callback(currentNode, cb);
  return currentNode;
};

function renderElement(currentNode) {
  if (currentNode._GridType === 'item') {
    currentNode._JSXComponent = _react["default"].createElement(Mui['Grid'], _objectSpread({
      item: true
    }, currentNode._gridItem), _react["default"].createElement(Mui[currentNode._MUI], _objectSpread({
      className: currentNode._name
    }, currentNode._props, {
      style: currentNode._style
    }), currentNode._content));
    currentNode._JSX = getCode(currentNode);
  } else {
    currentNode._JSXComponent = _react["default"].createElement(Mui['Grid'], _objectSpread({
      item: true
    }, currentNode._gridItem), _react["default"].createElement(Mui['Grid'], _objectSpread({
      container: true,
      className: currentNode._name
    }, currentNode._GridStyle, {
      style: currentNode._style
    }), currentNode._children.map(function (child) {
      return child._JSXComponent;
    })));
    currentNode._JSX = getCode(currentNode);
  }

  if (currentNode._name === 'MotherNode' && currentNode._paper.enable) {
    currentNode._JSXComponent = _react["default"].createElement(Mui['Paper'], _objectSpread({}, currentNode._paper), currentNode._JSXComponent);
    currentNode._JSX = JSXMaker({
      tagName: "Paper",
      tagProps: "".concat(ObjtoString({
        elevation: currentNode._paper.elevation ? currentNode._paper.elevation : 0,
        square: currentNode._paper.square ? currentNode._paper.square : false
      })),
      tagChild: getCode(currentNode)
    });
  }
}

function getCode(currentNode) {
  var style = JSON.stringify(currentNode._style);
  var tagProps = "className=\"".concat(currentNode._name, "\" ");

  if (style !== '{}') {
    tagProps += "style={".concat(style, "}");
  }

  tagProps += ObjtoString(currentNode._props);
  tagProps += "".concat(currentNode._GridType === 'container' ? "container ".concat(ObjtoString(currentNode._GridStyle)) : '');

  if (currentNode._GridType === 'item') {
    var tagChild = JSXMaker({
      tagName: "".concat(currentNode._MUI, " "),
      tagProps: tagProps,
      tagChild: "".concat(currentNode._content)
    });
    var GridItem = JSXMaker({
      tagName: 'Grid',
      tagProps: "item ".concat(ObjtoString(currentNode._gridItem)),
      tagChild: tagChild
    });
    return GridItem;
  } else {
    var children = '';

    currentNode._children.map(function (child) {
      return children += child._JSX;
    });

    var GridContainer = JSXMaker({
      tagName: 'Grid',
      tagProps: tagProps,
      tagChild: children
    });

    var _GridItem = JSXMaker({
      tagName: "Grid",
      tagProps: "item ".concat(ObjtoString(currentNode._gridItem)),
      tagChild: "".concat(GridContainer)
    });

    return _GridItem;
  }
}

function ObjtoString(obj) {
  var str = '';
  Object.keys(obj).forEach(function (key) {
    if (obj[key] !== '') {
      str += "".concat(key, "={'").concat(obj[key], "'} ");
    }
  });
  return str;
}

function JSXMaker(_ref2) {
  var tagName = _ref2.tagName,
      tagProps = _ref2.tagProps,
      tagChild = _ref2.tagChild;
  return "<".concat(tagName, " ").concat(tagProps, ">\n                        ").concat(tagChild, "\n                    </").concat(tagName, ">\n                    ");
}