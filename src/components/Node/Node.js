import { Button, Grid, } from '@mui/material';
import React from 'react';
import TreeItem from '@mui/lab/TreeItem';
import * as Mui from '@mui/material';

export default function Node({ name, content,MUI,props }) {
    this._children = [];
    this._direction = '';
    this._JSXComponent = null;
    this._MUI  = MUI;
    this._JSX = null;
    this._TreeView = null;
    this._name = name;
    this._GridType = 'item';
    this._GridStyle = {};
    this._gridItem = {};
    this._content = content;
    this._childrenCount = 0;
    this._style = {};
    this._props=props || {};

}


Node.prototype.direction = function (direction) {
    this._direction = direction
}

Node.prototype.addNode = function (node) {
    this._children.push(node);
    this._childrenCount++;
    this._direction = 'row';
    this._GridType = 'container';
}
Node.prototype.render = function () {
    let node = deptFirstPreOrder(this, renderElement)
    return (node)
}
Node.prototype.makeTree = function (onItemClick) {
    let node = deptFirstPreOrder(this, TreeItemComponent, onItemClick);
    return (node._TreeView)
}
function TreeItemComponent(currentNode, onItemClick) {
    if (currentNode._GridType === 'item') {
        currentNode._TreeView = React.createElement(TreeItem,
            {
                nodeId: currentNode._name,
                label: currentNode._name,
                onClick: () => { onItemClick(currentNode) }
            });
    } else {
        currentNode._TreeView = React.createElement(TreeItem,
            {
                nodeId: currentNode._name,
                label: currentNode._name,
                onClick: () => { onItemClick(currentNode) }
            },
            currentNode._children.map(child => child._TreeView));
    }
}
Node.prototype.updateNode = function (nodeName, Obj) {
    let foundNode = depthFirstSearch(this, nodeName)
    foundNode._GridStyle = Obj;
}
function depthFirstSearch(currentNode, name) {
    let retVal;
    currentNode._children.some(node => {
        retVal = depthFirstSearch(node, name)
        return retVal
    })
    if (currentNode._name === name) {
        return currentNode
    }
    return retVal;
}

const deptFirstPreOrder = (currentNode, callback, cb) => {
    currentNode._children.forEach(node => {
        deptFirstPreOrder(node, callback, cb);
    })
    callback(currentNode, cb);
    return currentNode
}
function renderElement(currentNode) {
    if (currentNode._GridType === 'item') {
        currentNode._JSXComponent = React.createElement(Mui['Grid'], { item: true, ...currentNode._gridItem },
            React.createElement(Mui[currentNode._MUI], { className: currentNode._name,...currentNode._props, style: currentNode._style }, currentNode._content));
        currentNode._JSX = getCode(currentNode);

    } else {
        currentNode._JSXComponent = React.createElement(Mui['Grid'], { item: true, ...currentNode._gridItem },
            React.createElement(Mui['Grid'], { container: true, className: currentNode._name, ...currentNode._GridStyle, style: currentNode._style }, currentNode._children.map(child => child._JSXComponent)));
        currentNode._JSX = getCode(currentNode);
    }
}
function getCode(currentNode) {
    let style = JSON.stringify(currentNode._style);
    let tagProps = `className="${currentNode._name}" `
    if (style !== '{}') {
        tagProps += `style={${style}}`;
    }
    tagProps += ObjtoString(currentNode._props)
    tagProps += `${currentNode._GridType==='container'? `container ${ObjtoString(currentNode._GridStyle)}`:''}`
    if (currentNode._GridType === 'item') {
        let tagChild = JSXMaker({
            tagName: `${currentNode._MUI} `,
            tagProps,
            tagChild: `${currentNode._content}`
        })
        let GridItem = JSXMaker({
            tagName: 'Grid',
            tagProps: `item ${ObjtoString(currentNode._gridItem)}`,
            tagChild
        })
        return GridItem;
    } else {
        let children = '';
        currentNode._children.map(child => children += child._JSX);

        let GridContainer = JSXMaker({
            tagName: 'Grid',
            tagProps,
            tagChild: children,
        })
        let GridItem = JSXMaker({
            tagName: `Grid`,
            tagProps: `item ${ObjtoString(currentNode._gridItem)}`,
            tagChild: `${GridContainer}`
        })
        return GridItem;
    }

}

function ObjtoString(obj) {
    let str = ''
    Object.keys(obj).forEach(function (key) {
        if (obj[key] !== '') {
            str += `${key}={'${obj[key]}'} `
        }
    });
    return str;
}
function JSXMaker({ tagName, tagProps, tagChild }) {
    return `<${tagName} ${tagProps}>
                        ${tagChild}
                    </${tagName}>
                    `
}