import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm, Controller } from "react-hook-form";
import { TextField, Typography ,Grid} from '@mui/material';

export default function GridProperties({ GridStyleChange, GridStyle, GridItem, GridType }) {
    const { handleSubmit, control } = useForm();

    return (
        <form onChange={handleSubmit(GridStyleChange)}>
            <Grid container spacing={1} justifyContent='space-between'>
            {GridType === 'container' ?
                <>
                    <Grid item xs={12}>
                        <label><Typography variant={'subtitle1'}>Direction</Typography></label>
                        <Controller
                            render={({ field }) => {
                                return <RadioGroup
                                    row
                                    name="direction-buttons-group"
                                    onChange={(data) => {
                                        field.onChange(data.target.value);
                                    }}
                                    value={GridStyle.direction?GridStyle.direction:''}
                                >
                                    <FormControlLabel value="row" control={<Radio />} label="row" />
                                    <FormControlLabel value="row-reverse" control={<Radio />} label="row-reverse" />
                                    <FormControlLabel value="column" control={<Radio />} label="column" />
                                    <FormControlLabel value="column-reverse" control={<Radio />} label="column-reverse" />
                                </RadioGroup>
                            }}

                            name="direction"
                            control={control}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label><Typography variant={'subtitle1'}>Justify Content</Typography></label>
                        <Controller
                            render={({ field }) => {
                                return <RadioGroup
                                    row
                                    onChange={(data) => {
                                        field.onChange(data.target.value);
                                    }}
                                    name="justifyContent-buttons-group"
                                    value={GridStyle.justifyContent ? GridStyle.justifyContent:''}
                                >
                                    <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                                    <FormControlLabel value="center" control={<Radio />} label="center" />
                                    <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                                    <FormControlLabel value="space-between" control={<Radio />} label="space-between" />
                                    <FormControlLabel value="space-around" control={<Radio />} label="space-around" />
                                    <FormControlLabel value="space-evenly" control={<Radio />} label="space-evenly" />

                                </RadioGroup>
                            }}
                            name="justifyContent"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label><Typography variant={'subtitle1'}>Align Items</Typography></label>
                        <Controller
                            render={({ field }) => {
                                return <RadioGroup
                                    row
                                    onChange={(data) => {
                                        field.onChange(data.target.value);
                                    }}
                                    name="alignItems-buttons-group"
                                    value={GridStyle.alignItems ? GridStyle.alignItems :''}
                                >
                                    <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                                    <FormControlLabel value="center" control={<Radio />} label="center" />
                                    <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                                    <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                                    <FormControlLabel value="baseline" control={<Radio />} label="baseline" />

                                </RadioGroup>
                            }}
                            name="alignItems"
                            control={control}
                        />
                    </Grid>
                </> : null}
                <Grid item xs={5}>
                    <label><Typography variant={'subtitle1'}>Item xs</Typography></label>
                    <Controller
                        render={({ field }) => {
                            return <TextField
                                value={GridItem.xs?GridItem.xs:''}
                                inputProps={{ inputMode: 'numeric', pattern: '[1-12]*' }}
                                onChange={event => { field.onChange(event.target.value) }}
                                id="outlined-basic" label="xs" variant="outlined" />
                        }}
                        name="xs"
                        control={control}
                    />
                </Grid>
                <Grid item xs={5}>
                    <label><Typography variant={'subtitle1'}>Item md</Typography></label>
                    <Controller
                        render={({ field }) => {
                            return <TextField
                                value={GridItem.md?GridItem.md:''}
                                inputProps={{ inputMode: 'numeric', pattern: '[1-12]*' }}
                                onChange={event => { field.onChange(event.target.value) }}
                                id="outlined-basic" label="md" variant="outlined" />
                        }}
                        name="md"
                        control={control}
                    />
                </Grid>
            </Grid>
        </form>
    )
}