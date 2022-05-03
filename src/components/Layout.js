import { Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateMotherNode } from '../redux/actions/Tree';
import DesignArea from './DesignArea';
import Node from './Node/Node';
import Tools from './Tools';

export default function Layout(){
    const dispatch = useDispatch();
    let MotherNode = new Node({ name: 'MotherNode' })
    let child1 = new Node({ name: "child1" })
    let child2 = new Node({ name: "child2" })
    let paragraph1 = new Node({ name: "paragraph1", content: "one" ,MUI:'Typography'})
    let paragraph2 = new Node({ name: "paragraph2", content: "two" ,MUI:'Typography'})
    let paragraph3 = new Node({ name: "paragraph3", content: "three" ,MUI:'Button'})
    child1.addNode(paragraph1)
    child2.addNode(paragraph2)
    child2.addNode(paragraph3)
    MotherNode.addNode(child1)
    MotherNode.addNode(child2);
    MotherNode.updateNode('child2',{direction:'column'})
    MotherNode.updateNode('MotherNode',{justifyContent:'space-around'})
    dispatch(updateMotherNode(MotherNode))
    return (
        <Grid container style={{minHeight:'100vh'}}>
            <Grid item xs={9}>
                <DesignArea MotherNode={MotherNode}/>
            </Grid>
            <Grid item xs={3}>
                <Tools MotherNode={MotherNode}/>
            </Grid>
        </Grid>
    )
}