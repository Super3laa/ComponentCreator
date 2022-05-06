import { Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateMotherNode } from '../redux/actions/Tree';
import DesignArea from './DesignArea';
import Node from './Node/Node';
import Tools from './Tools';

export default function Layout(){
    const dispatch = useDispatch();
    let MotherNode = new Node({ name: 'MotherNode' ,MUI:'Grid'})
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