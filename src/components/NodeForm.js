import { Button, Grid, Modal, Switch, TextField, Typography } from '@mui/material';
//import * as Mui from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './form.css'
export default function AddNodeForm({
    handletoggle,
    toggleModal,
    handleAddNodeFormData,
    handleEditNodeFormData,
    type,
    currentNode }) {
    useEffect(()=>{
        if(type==='Edit'){
        let arr = []
        Object.keys(currentNode._props).forEach(key=>{
            arr.push(<>
                <Grid item xs={6}>
                    <TextField
                        {...register(`props[${appendProps.length}].${key}`)}
                        name={`props[${appendProps.length}].${key}`}
                        fullWidth
                        defaultValue={key}
                        id={`props[${appendProps.length}].${key}`} label="Key" />
    
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        {...register(`props[${appendProps.length}].${currentNode._props[key]}`)}
                        fullWidth
                        defaultValue={currentNode._props[key]}
                        name={`props[${appendProps.length}].${currentNode._props[key]}`}
                        id={`props[${appendProps.length}].${currentNode._props[key]}`} label="Value" />
                </Grid>
            </>);
        })
        setAppendProps(arr);
        }
    },[currentNode])
    let defaultValues = type === 'Add' ? {} : {
        name: currentNode._name,
        content: currentNode._content,
        component: currentNode._MUI
    }
    const { handleSubmit, register } = useForm({
        defaultValues: defaultValues
    });
    const [appendProps, setAppendProps] = useState([]);
    const appendProp = () => {
        setAppendProps([...appendProps, <>
            <Grid item xs={6}>
                <TextField
                    {...register(`props[${appendProps.length}].key`)}
                    name={`props[${appendProps.length}].key`}
                    fullWidth
                    id={`props[${appendProps.length}].key`} label="Key" />

            </Grid>
            <Grid item xs={6}>
                <TextField
                    {...register(`props[${appendProps.length}].value`)}
                    fullWidth
                    name={`props[${appendProps.length}].value`}
                    id={`props[${appendProps.length}].value`} label="Value" />
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
                    <TextField
                        {...register('name')}
                        name="name"
                        fullWidth
                        id="name" label="Name" />
                </Grid>
                <Grid xs={6} item>
                    <TextField
                        {...register('content')}
                        fullWidth
                        name="content"
                        id="content" label="Content" />
                </Grid>
                <Grid xs={12} item>
                    <TextField
                        name="component"
                        {...register('component')}
                        fullWidth
                        label="MUI Component"
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems='center'>
                        <Grid item >
                            <Button variant="outlined"  onClick={appendProp}>add Prop</Button>
                        </Grid>
                        <Grid item>
                            <label><Typography variant={'subtitle1'}>Self Closing Tag</Typography></label>
                            <Switch
                                {...register('selfClosingTag')}
                                name="selfClosingTag"
                                defaultValue={false}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {appendProps.map(row => {
                    return row
                })}
                <Grid xs={12} item>
                    <Button fullWidth="true" onClick={handleSubmit(type==="Edit" ? handleEditNodeFormData:handleAddNodeFormData)} variant="contained">Submit</Button>
                </Grid>
            </Grid>
        </form>
    </Modal>
}