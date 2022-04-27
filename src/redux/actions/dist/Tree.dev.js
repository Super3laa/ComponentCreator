"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshTree = exports.updateMotherNode = void 0;

var updateMotherNode = function updateMotherNode(node) {
  return {
    type: 'updateMotherNode',
    payload: node
  };
};

exports.updateMotherNode = updateMotherNode;

var refreshTree = function refreshTree() {
  return {
    type: 'refreshTree'
  };
};

exports.refreshTree = refreshTree;