import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AccountCircle, PetsRounded, PhoneIphoneOutlined } from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';
import { useData } from '../context/DataProvider';
const AddPetSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Pet Name is Required!'),
    owner: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Pet should have a parent/owner'),
    contact: Yup.string().length(10).required('Without contact You can not add a pet'),
    status: Yup.string().required(),
    dateOfAdmission: Yup.date().required()

});



export const CustomButton = styled(Button)(({ theme }) => ({
    '&.MuiButton-outlined': {
        borderColor: theme.palette.neutral.light,
        color: theme.palette.neutral.light,
        '&:hover': {
            borderColor: 'darkblue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
        },
    },
}));

const CustomStatus = ({ field, form, ...props }) => {

    return (
        < FormControl variant="standard" sx={{ minWidth: 120 }
        }>
            <InputLabel id="status">Status</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                {...field}
                label="Status"
                {...props}
            >
                <MenuItem value={"FOSTERING"}>FOSTERING</MenuItem>
                <MenuItem value={"DISCHARGED"}>DISCHARGED</MenuItem>
            </Select>
        </FormControl >

    )
}
const AddPet = () => {
    const { data, loading, error, fetchData, setData } = useData();
    const apiUrl = process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_URL_LOCAL
        : process.env.REACT_APP_API_URL_PROD;
    return (
        <Box p={5}>
            <h1>Add your Pet</h1>
            <Formik
                initialValues={{
                    name: '',
                    owner: '',
                    contact: '',
                    status: '',
                    dateOfAdmission: new Date()
                }}
                validationSchema={AddPetSchema}
                onSubmit={values => {
                    // same shape as initial values
                    fetch(`${apiUrl}/pets`, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values)
                    });
                    fetchData();
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="name">
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => (
                                <div>
                                    <TextField
                                        id="nameField"
                                        label="Enter Pet Name"
                                        {...field}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PetsRounded />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                    />
                                    {meta.touched && meta.error && (
                                        <div className="error">{meta.error}</div>
                                    )}
                                </div>
                            )}
                        </Field>
                        <Field name="owner">
                            {({
                                field, // { name, value, onChange, onBlur }
                                form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => (
                                <div>
                                    <TextField
                                        id="owenerField"
                                        label="Enter Owner Name"
                                        {...field}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                    />
                                    {meta.touched && meta.error && (
                                        <div className="error">{meta.error}</div>
                                    )}
                                </div>
                            )}
                        </Field>
                        <Field name="contact">
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => (
                                <div>
                                    <TextField
                                        id="contactField"
                                        label="Enter Owner Contact"
                                        {...field}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIphoneOutlined />
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                    />
                                    {meta.touched && meta.error && (
                                        <div className="error">{meta.error}</div>
                                    )}
                                </div>
                            )}
                        </Field>
                        <Field name="status">
                            {({
                                field, // { name, value, onChange, onBlur }
                                form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => (
                                <div>
                                    <CustomStatus field={field} form={form} meta />
                                    {meta.touched && meta.error && (
                                        <div className="error">{meta.error}</div>
                                    )}
                                </div>
                            )}
                        </Field>
                        {/* <Field name="dateOfAdmission" /> */}
                        {errors.dateOfAdmission && touched.dateOfAdmission ? <div>{errors.dateOfAdmission}</div> : null}
                        <Field name="customButton" render={({ field }) => (
                            <CustomButton variant='outlined' type='submit'>
                                Add to Yasmin's care
                            </CustomButton>
                        )} />
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default AddPet
