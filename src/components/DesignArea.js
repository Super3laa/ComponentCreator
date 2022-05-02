import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './DesignArea.css'
import CodeIcon from '@mui/icons-material/Code';
import Node from './Node/Node';
import { useSelector } from 'react-redux';
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";
export default function DesignArea(props) {
    let Tree = useSelector(state => state.Tree);
    let MotherNode = Tree.MotherNode;
    MotherNode.render();
    return (
        <div className="DesignArea">
            <div className="ComponentLayout">
                <Grid container direction="column">
                    <div className="component">
                        {MotherNode._JSXComponent}
                    </div>
                    <Grid item>
                        <Button variant="outlined" startIcon={<CodeIcon />}>
                            Code
                        </Button>
                    </Grid>
                    <Grid item>
                        <pre>
                            <code>
                                {prettier.format(MotherNode._JSX, {parser: "babel",plugins: [babylon]})}
                            </code>
                        </pre>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}