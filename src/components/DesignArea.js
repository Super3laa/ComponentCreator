import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './DesignArea.css'
import CodeIcon from '@mui/icons-material/Code';
import Node from './Node/Node';

export default function DesignArea(props) {
    const [component, setComponent] = useState(null)

    return (
        <div className="DesignArea">
            <div className="ComponentLayout">
                <Grid container direction="column" spacing={5}>
                    <div className="component">
                        {props.MotherNode.render()}
                        </div>
                    <Grid item>
                        <Button variant="outlined" startIcon={<CodeIcon />}>
                            Code
                        </Button>
                    </Grid>
                    <Grid item>
                        <pre>
                            <code>
                                {

                                }
                            </code>
                        </pre>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}