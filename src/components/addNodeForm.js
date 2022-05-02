import { Button, Grid, MenuItem, Modal, Select, TextField } from '@mui/material';
//import * as Mui from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import './form.css'
export default function AddNodeForm({ handletoggle, toggleModal, handleAddNodeFormData }) {
    const { handleSubmit, control } = useForm();

    return <Modal
        open={toggleModal}
        onClose={handletoggle}
    >
        <div className='FormLayout'>
            <form className="formContent" >
                <Grid conatiner >
                    <Grid item xs={12}>
                        <Controller
                            render={({ field }) => {
                                return <TextField
                                    onChange={event => { field.onChange(event.target.value) }}
                                    id="name" label="className" variant="outlined" />
                            }}
                            name="name"
                            control={control}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Controller
                            render={({ field }) => {
                                return <Select
                                    label="component"
                                    onChange={event => {field.onChange(event.target.value) }}
                                >
                                    <MenuItem value={"Grid"}>Grid</MenuItem>
                                    <MenuItem value={"Typography"}>Typography</MenuItem>
                                </Select>
                            }}
                            name="component"
                            control={control}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Controller
                            render={({ field }) => {
                                return <TextField
                                    onChange={event => { field.onChange(event.target.value) }}
                                    id="content" label="content" variant="outlined" />
                            }}
                            name="content"
                            control={control}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Button fullWidth="true" onClick={handleSubmit(handleAddNodeFormData)} >Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Modal>
}