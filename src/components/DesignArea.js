import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './DesignArea.css'
import CodeIcon from '@mui/icons-material/Code';
import Node from './Node/Node';

export default function DesignArea() {
    const [component, setComponent] = useState(null)
    let MotherNode = new Node({ name: 'MotherNode' });
    let child1 = new Node({ name: "child1" })
    let child2 = new Node({ name: "child2" })
    let paragraph1 = new Node({ name: "paragraph1", content: "one" })
    let paragraph2 = new Node({ name: "paragraph2", content: "two" })
    let paragraph3 = new Node({ name: "paragraph3", content: "three" })
    child1.addNode(paragraph1)
    child2.addNode(paragraph2)
    child2.addNode(paragraph3)
    MotherNode.addNode(child1)
    MotherNode.addNode(child2);

    MotherNode.updateNode('child2',{direction:'column'})
    
    return (
        <div className="DesignArea">
            <div className="ComponentLayout">
                <Grid container direction="column" spacing={5}>
                        {MotherNode.render()}
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