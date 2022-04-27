"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _index = _interopRequireDefault(require("./reducers/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var middleWare = [_reduxThunk["default"]];
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var store = (0, _redux.createStore)(_index["default"], composeEnhancers(_redux.applyMiddleware.apply(void 0, middleWare)));
var _default = store;
exports["default"] = _default;