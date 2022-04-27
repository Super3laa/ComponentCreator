import './Tools.css'
import { Grid, IconButton, Paper } from "@mui/material";
import TreeView from '@mui/lab/TreeView';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import Node from './Node/Node'
import { refreshTree } from '../redux/actions/Tree';

export default function Tools(props){
    let Tree = useSelector(state=>state.Tree);
    let MotherNode = Tree.MotherNode;
    const dispatch = useDispatch();
    const [currentNode,setNode] = useState(MotherNode)
    function onItemClick (currentNode){
        setNode(currentNode);
    }
    function addNode(){
        let babyNode = new Node({ name: "paragraph4", content: "four" });
        currentNode.addNode(babyNode);  
        dispatch(refreshTree())
    }
    return(
        <Paper elevation={3} className="ToolsLayout">
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction="row" justifyContent='space-around'>
                        <Grid item>TreeView</Grid>
                        <Grid item>
                        <IconButton aria-label="delete">
                            <AddIcon   onClick={addNode}/>
                        </IconButton>
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
                
            </Grid>
        </Paper>
    )
}