import { Button, Grid, MenuItem, Modal, Select, TextField } from '@mui/material';
//import * as Mui from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import './form.css'
export default function AddNodeForm({ handletoggle, toggleModal, handleAddNodeFormData }) {

    const { handleSubmit, control } = useForm();
    const [appendProps, setAppendProps] = useState([]);
    const appendProp = () => {
        setAppendProps([...appendProps, <>
            <Grid item xs={6}>
                <Controller
                    render={({ field }) => {
                        return <TextField
                            fullWidth
                            onChange={event => {field.onChange(event.target.value) }}
                            id={`props[${appendProps.length }].key`} label="Key" />
                    }}
                    name={`props[${appendProps.length }].key`}
                    control={control}
                />
            </Grid>
            <Grid item xs={6}>
                <Controller
                    render={({ field }) => {
                        return <TextField
                            fullWidth
                            onChange={event => { field.onChange(event.target.value) }}
                            id={`props[${appendProps.length }].value`} label="Value" />
                    }}
                    name={`props[${appendProps.length }].value`}
                    control={control}
                />
            </Grid>
        </>]);
    }
    return <Modal
        open={toggleModal}
        onClose={handletoggle}
        className='FormLayout'
    >
        <form className="formContent" >
            <Grid container spacing={2} >
                <Grid item xs={6}>
                    <Controller
                        render={({ field }) => {
                            return <TextField
                                fullWidth
                                onChange={event => { field.onChange(event.target.value) }}
                                id="name" label="Name" />
                        }}
                        name="name"
                        control={control}
                    />
                </Grid>
                <Grid xs={6} item>
                    <Controller
                        render={({ field }) => {
                            return <TextField
                                fullWidth
                                onChange={event => { field.onChange(event.target.value) }}
                                id="content" label="Content" />
                        }}
                        name="content"
                        control={control}
                    />
                </Grid>
                <Grid xs={12} item>
                    <Controller
                        render={({ field }) => {
                            return <TextField
                                fullWidth
                                onChange={event => { field.onChange(event.target.value) }}
                                label="MUI Component"
                            >
                            </TextField>
                        }}
                        name="component"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={appendProp}>add Prop</Button>
                </Grid>
                {appendProps.map(row => {
                    return row
                })}
                <Grid xs={12} item>
                    <Button fullWidth="true" onClick={handleSubmit(handleAddNodeFormData)} variant="contained">Submit</Button>
                </Grid>
            </Grid>
        </form>
    </Modal>
}