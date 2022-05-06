import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './DesignArea.css'
import CodeIcon from '@mui/icons-material/Code';
import { useSelector } from 'react-redux';
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";
import * as Mui from '@mui/material';

export default function DesignArea(props) {
    let Tree = useSelector(state => state.Tree);
    let MotherNode = Tree.MotherNode;
    MotherNode.render();
    const [codeView, setCodeView] = useState(false)
    const handleToggleCodeView = () => setCodeView(!codeView)
    return (
        <div className="DesignArea">
            <div className="ComponentLayout">
                <Grid container direction="column" justifyContent="space-around" alignItems="center" spacing={2}>
                    <Grid item className="component" style={{width:'100%'}}>
                        {MotherNode._JSXComponent}
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" startIcon={<CodeIcon />} onClick={handleToggleCodeView}>
                            View Code
                        </Button>
                    </Grid>
                    {
                        codeView &&
                        <Grid item xs={12} style={{width:'100%'}}>
                            <pre>
                                <code>
                                    {prettier.format(MotherNode._JSX, { parser: "babel", plugins: [babylon] })}
                                </code>
                            </pre>
                        </Grid>
                    }

                </Grid>
            </div>
        </div>
    )
}