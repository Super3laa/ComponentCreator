import './Tools.css'
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import TreeView from '@mui/lab/TreeView';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Node from './Node/Node'
import { refreshTree } from '../redux/actions/Tree';
import StyleEditor from 'react-style-editor';
import GridProperties from './GridProperties'
import AddNodeForm from './addNodeForm';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';


export default function Tools() {
    let Tree = useSelector(state => state.Tree);
    let MotherNode = Tree.MotherNode;
    const dispatch = useDispatch();
    const [currentNode, setCurrentNode] = useState(MotherNode);
    const [toggleModal, setToggleModal] = useState(false);

    function onItemClick(currentNode) {
        setCurrentNode(currentNode);
        dispatch(refreshTree())
    }
    function converCSSToString(value) {
        let string = '';
        string += `.${currentNode._name} ${JSON.stringify(value)}`
        string = string.replaceAll(`"`, '')
        string = string.replaceAll(`,`, ';')
        return string;
    }
    function handleStyleChange(e) {
        let arr = e;
        let StyleObj = {}
        arr[0].kids.forEach(kid => {
            StyleObj[kid.property] = kid.value;
        })
        currentNode._style = StyleObj;
        setCurrentNode(currentNode)
        dispatch(refreshTree())
    }
    function handleAddNodeFormData(obj) {
        let props = {};
        if(obj.name === undefined){
            obj.name = uniqueNamesGenerator({dictionaries:[colors,[obj.component]]})
        }
        Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
        obj?.props && obj.props.forEach((prop) => {
            props[prop.key] = prop.value;
        })
        let babyNode = new Node({ name: obj.name, selfClosingTag:obj.selfClosingTag,content: obj.content, MUI: obj.component, props });
        currentNode.addNode(babyNode);
        dispatch(refreshTree())
    }
    const GridStyleChange = obj => {
        let GridItem = obj.GridItem;
        delete obj.GridItem;
        let Paper = obj.paper;
        delete obj.paper
        if (currentNode._name ==='MotherNode'){
            Object.keys(Paper).forEach(key => Paper[key] === undefined && delete Paper[key])
            currentNode._paper = Paper;
        }
        if (currentNode._GridType === 'container') {
            Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
            currentNode._GridStyle = { ...currentNode._GridStyle, ...obj };
        }
        Object.keys(GridItem).forEach(key => GridItem[key] === undefined && delete GridItem[key])
        currentNode._gridItem = GridItem;
        setCurrentNode(currentNode);
        dispatch(refreshTree())
    }
    const handleDeleteNode = () => {
        if (currentNode._parentName === 'Alaa') {
            alert("I'm Undestroyable MotherFucker");
        } else {
            MotherNode.destroy(currentNode);
            setCurrentNode(MotherNode);
            dispatch(refreshTree());
        }
    }
    const handletoggle = () => { setToggleModal(!toggleModal) };
    return (
        <Paper elevation={3} className="ToolsLayout">
            {
                toggleModal && <AddNodeForm
                    toggleModal={toggleModal}
                    handletoggle={handletoggle}
                    handleAddNodeFormData={handleAddNodeFormData}
                />
            }
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Grid container direction="row" alignItems='center' justifyContent='space-between' style={{ padding: "0 5px", color: "#2b373e" }} >
                        <Grid item><Typography variant={'h6'}>TreeView</Typography></Grid>
                        <Grid item>
                            <Grid container>
                                <Grid item >
                                    <IconButton onClick={handleDeleteNode}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item >
                                    <IconButton onClick={handletoggle}>
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item >
                                    <IconButton onClick={handletoggle}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {MotherNode.makeTree(onItemClick)}
                    </TreeView>
                </Grid>
                <Grid item>
                    <StyleEditor
                        value={converCSSToString(currentNode._style)}
                        onChange={handleStyleChange}
                        outputFormats={"machine"}
                    />
                </Grid>
                <Grid item>
                    <GridProperties
                        GridStyleChange={GridStyleChange}
                        GridStyle={currentNode._GridStyle}
                        GridItem={currentNode._gridItem}
                        GridType={currentNode._GridType}
                        Paper={currentNode._paper}
                        NodeName={currentNode._name}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}