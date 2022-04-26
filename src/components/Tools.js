import { Grid, Paper } from "@mui/material";
import TreeView from '@mui/lab/TreeView';
import React, { useEffect, useState } from "react";
import './Tools.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
export default function Tools(props){
    let MotherNode = props.MotherNode;

    return(
        <Paper elevation={3} className="ToolsLayout">
            <Grid container>
                <Grid item>
                    <TreeView
                         aria-label="file system navigator"
                         defaultCollapseIcon={<ExpandMoreIcon />}
                         defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {MotherNode.makeTree()}
                    </TreeView>
                </Grid>
                
            </Grid>
        </Paper>
    )
}