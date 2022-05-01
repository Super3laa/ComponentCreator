import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm, Controller } from "react-hook-form";
import { TextField } from '@mui/material';

export default function GridProperties({ GridStyleChange, GridStyle, GridItem, GridType }) {
    const { handleSubmit, control } = useForm();

    return (
        <form onChange={handleSubmit(GridStyleChange)}>
            {GridType === 'contaier' ?

                <div>
                    <div>
                        <label>direction</label>
                        <Controller
                            render={({ field }) => {
                                return <RadioGroup
                                    row
                                    name="direction-buttons-group"
                                    onChange={(data) => {
                                        field.onChange(data.target.value);
                                    }}
                                    value={GridStyle.direction}
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
                    </div>
                    <div>
                        <label>justifyContent</label>
                        <Controller
                            render={({ field }) => {
                                return <RadioGroup
                                    row
                                    onChange={(data) => {
                                        field.onChange(data.target.value);
                                    }}
                                    name="justifyContent-buttons-group"
                                    value={GridStyle.justifyContent}
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
                    </div>
                    <div>
                        <label>alignItems</label>
                        <Controller
                            render={({ field }) => {
                                return <RadioGroup
                                    row
                                    onChange={(data) => {
                                        field.onChange(data.target.value);
                                    }}
                                    name="alignItems-buttons-group"
                                    value={GridStyle.alignItems}
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
                    </div>
                </div> : null}
            <div>
                <div>
                    <label>itemPropsXS</label>
                    <Controller
                        render={({ field }) => {
                            return <TextField
                                value={GridItem.xs}
                                inputProps={{ inputMode: 'numeric', pattern: '[1-12]*' }}
                                onChange={event => { field.onChange(event.target.value) }}
                                id="outlined-basic" label="Outlined" variant="outlined" />
                        }}
                        name="xs"
                        control={control}
                    />
                </div>
                <div>
                    <label>itemPropsMD</label>
                    <Controller
                        render={({ field }) => {
                            return <TextField
                                value={GridItem.md}
                                inputProps={{ inputMode: 'numeric', pattern: '[1-12]*' }}
                                onChange={event => { field.onChange(event.target.value) }}
                                id="outlined-basic" label="Outlined" variant="outlined" />
                        }}
                        name="md"
                        control={control}
                    />
                </div>
            </div>
        </form>
    )
}