import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Node ({name,content}) {
    this._children = [];
    this._direction = '';
    this._JSXComponent = null;
    this._name= name;
    this._GridType = 'item';
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

Node.prototype.updateNode = function(nodeName,Obj){
    deptFirstSearch(this,nodeName,Obj);
}

const deptFirstSearch = (currentNode,name,Obj)=>{
    if (currentNode._name === name ){
        currentNode._style = Obj;
    }
    currentNode._children.forEach(node=>{
        deptFirstSearch(node,name,Obj);
    })
}

const deptFirstPreOrder = (currentNode,callback) => {
    currentNode._children.forEach(node => {
        deptFirstPreOrder(node,callback);
    })
    callback(currentNode);    
    if (currentNode._name === 'MotherNode') {
        return currentNode
    }
}
function renderElement(currentNode){
    if (currentNode._GridType === 'item') {
        currentNode._JSXComponent = React.createElement(Grid, { item: true },
            React.createElement('p', {className:currentNode._name,...currentNode._style}, currentNode._content));
    } else {
        currentNode._JSXComponent = React.createElement(Grid, { item: true },
            React.createElement(Grid, { container: true ,className:currentNode._name,...currentNode._style},currentNode._children.map(child=>child._JSXComponent)));
    }
}