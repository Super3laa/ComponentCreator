import { Button, Grid ,} from '@mui/material';
import React, { useEffect, useState } from 'react';
import TreeItem from '@mui/lab/TreeItem';

export default function Node ({name,content}) {
    this._children = [];
    this._direction = '';
    this._JSXComponent = null;
    this._TreeView = null;
    this._name= name;
    this._GridType = 'item';
    this._GridStyle = {}
    this._content = content;
    this._childrenCount = 0;
    this._style={};
}


Node.prototype.direction= function(direction){
    this._direction = direction
}

Node.prototype.addNode = function(node){
    this._children.push(node);
    this._childrenCount ++;
    this._direction = 'row';
    this._GridType = 'contaier';
}

Node.prototype.render = function(){
    let node = deptFirstPreOrder(this,renderElement)
    return(node._JSXComponent)
}

Node.prototype.makeTree = function(onItemClick){
    let node =  deptFirstPreOrder(this,TreeItemComponent,onItemClick);
    return(node._TreeView)
}

function TreeItemComponent (currentNode,onItemClick){
    if (currentNode._GridType === 'item') {
        currentNode._TreeView = React.createElement(TreeItem,
             { nodeId: currentNode._name,
                label:currentNode._name,
                onClick:()=>{onItemClick(currentNode)}
             });
    } else {
        currentNode._TreeView = React.createElement(TreeItem,
              { nodeId: currentNode._name,
                label:currentNode._name,
                onClick:()=>{onItemClick(currentNode)}
                 },
           currentNode._children.map(child=>child._TreeView));
    }
}
Node.prototype.updateNode = function(nodeName,Obj){
    let foundNode = depthFirstSearch(this,nodeName)
    foundNode._GridStyle = Obj;
}


function  depthFirstSearch (currentNode,name){
    let retVal;
    currentNode._children.some(node =>{
        retVal =  depthFirstSearch(node,name)
        return retVal
    })
    if (currentNode._name === name ){
        return currentNode
    }
    return retVal;    
}

const deptFirstPreOrder = (currentNode,callback,cb) => {
    currentNode._children.forEach(node => {
        deptFirstPreOrder(node,callback,cb);
    })
    callback(currentNode,cb);    
    return currentNode
}
function renderElement(currentNode){
    if (currentNode._GridType === 'item') {
        currentNode._JSXComponent = React.createElement(Grid, { item: true },
            React.createElement('p', {className:currentNode._name,...currentNode._GridStyle,style:currentNode._style}, currentNode._content));
    } else {
        currentNode._JSXComponent = React.createElement(Grid, { item: true },
            React.createElement(Grid, { container: true ,className:currentNode._name,...currentNode._GridStyle,style:currentNode._style},currentNode._children.map(child=>child._JSXComponent)));
    }
}