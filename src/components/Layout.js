import { Grid } from '@mui/material';
import React from 'react';
import DesignArea from './DesignArea';
import Tools from './Tools';

export default function Layout(){
    return (
        <Grid container>
            <Grid item xs={9}>
                <DesignArea />
            </Grid>
            <Grid item xs={3}>
                <Tools />
            </Grid>
        </Grid>
    )
}