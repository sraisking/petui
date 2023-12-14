import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Backdrop, Box, Button, Fade, FormControl, InputAdornment, InputLabel, MenuItem, Modal, Select, Stack, TextField } from '@mui/material';
import { AccountCircle, PetsRounded, PhoneIphoneOutlined } from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';
import { useData } from '../context/DataProvider';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
    spotOnStatus: Yup.string().required(),
    deworming: Yup.string().required(),
    vaccination: Yup.string().required(),
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
const CustomVaccinationStatus = ({ field, form, ...props }) => {

    return (
        < FormControl variant="standard" sx={{ minWidth: 120 }
        }>
            <InputLabel id="vaccinationStatus">Vaccination Status</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                {...field}
                label="Vaccination Status"
                {...props}
            >
                <MenuItem value={"DONE"}>DONE</MenuItem>
                <MenuItem value={"NOT DONE"}>NOT DONE</MenuItem>
            </Select>
        </FormControl >

    )
}
const CustomSpotOnStatus = ({ field, form, ...props }) => {

    return (
        < FormControl variant="standard" sx={{ minWidth: 120 }
        }>
            <InputLabel id="spotOnStatus">Spot On Status</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                {...field}
                label="Spot On Status"
                {...props}
            >
                <MenuItem value={"DONE"}>DONE</MenuItem>
                <MenuItem value={"NOT DONE"}>NOT DONE</MenuItem>
            </Select>
        </FormControl >

    )
}
const CustomDeWormingStatus = ({ field, form, ...props }) => {

    return (
        < FormControl variant="standard" sx={{ minWidth: 120 }
        }>
            <InputLabel id="deworming tatus">Deworming Status</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                {...field}
                label="Deworming Status"
                {...props}
            >
                <MenuItem value={"DONE"}>DONE</MenuItem>
                <MenuItem value={"NOT DONE"}>NOT DONE</MenuItem>
            </Select>
        </FormControl >

    )
}
const AddPet = () => {
    const { data, loading, error, fetchData, setData } = useData();
    const [isModalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };
    const [value, setValue] = React.useState(null);
    const apiUrl = process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_URL_LOCAL
        : process.env.REACT_APP_API_URL_PROD;
    return (
        <Box p={5} gap={5}>
            <h1>Add your Pet</h1>
            <Formik
                initialValues={{
                    name: '',
                    owner: '',
                    contact: '',
                    status: '',
                    dateOfAdmission: null,
                    spotOnStatus: '',
                    deworming: '',
                    vaccination: '',
                    lastSpotOnDate: null,
                    lastVaccinationDate: null,
                    lastDewormingDate: null,
                    medicalHistory: ''
                }}
                validationSchema={AddPetSchema}
                onSubmit={(values, { resetForm }) => {
                    // same shape as initial values
                    console.log(values);
                    // try {

                    const response = fetch(`${apiUrl}/pets`, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values)
                    });
                    handleModalOpen();
                    resetForm();
                    fetchData();
                    // } catch (error) {
                    //     console.error('Error:', error);
                    //     alert('Failed to save data. Please try again.');
                    // }
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Modal
                            open={isModalOpen}
                            onClose={handleModalClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={isModalOpen}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100vh', // Set height to 100% of the viewport height
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: 'white', // Set background color
                                            border: '2px solid #000', // Set border style
                                            padding: '16px', // Add padding
                                            borderRadius: '8px', // Add border-radius for rounded corners
                                            textAlign: 'center', // Center text
                                        }}
                                    >
                                        <h2>Success!</h2>
                                        <p>Your data has been successfully saved.</p>
                                    </Box>
                                </Box>
                            </Fade>
                        </Modal>
                        <Stack direction='row' spacing={10}>
                            <Box>
                                <Stack direction='column' spacing={2}>
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
                                    <Field name="dateOfAdmission">
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <br />
                                                    <DatePicker
                                                        label="Date of Admission"
                                                        // value={field.value}
                                                        // onChange={(newValue) => setValue(newValue)}
                                                        {...field}
                                                        onChange={(date) => form.setFieldValue('dateOfAdmission', date)}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="medicalHistory">
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Enter Past Medical History"
                                                    multiline
                                                    rows={4}
                                                    defaultValue=""
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
                                            </div>
                                        )}

                                    </Field>
                                </Stack>
                            </Box>
                            {/* <Field name="dateOfAdmission" /> */}
                            {errors.dateOfAdmission && touched.dateOfAdmission ? <div>{errors.dateOfAdmission}</div> : null}
                            <Box>
                                <Stack direction='column' spacing={3}>
                                    <Field name="spotOnStatus">
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div>
                                                <CustomSpotOnStatus field={field} form={form} meta />

                                                {meta.touched && meta.error && (
                                                    <div className="error">{meta.error}</div>
                                                )}
                                                {form.values.spotOnStatus === 'DONE' &&
                                                    <>

                                                        <Field name="lastSpotOnDate">
                                                            {({
                                                                field, // { name, value, onChange, onBlur }
                                                                form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                            }) => (
                                                                <div>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <br />
                                                                        <DatePicker
                                                                            label="Spot On Date"
                                                                            // value={field.value}
                                                                            // onChange={(newValue) => setValue(newValue)}
                                                                            {...field}
                                                                            onChange={(date) => form.setFieldValue('lastSpotOnDate', date)}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                            )}
                                                        </Field>
                                                    </>
                                                }
                                            </div>
                                        )}

                                    </Field>
                                    <Field name="vaccination">
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div>
                                                <CustomVaccinationStatus field={field} form={form} meta />
                                                {meta.touched && meta.error && (
                                                    <div className="error">{meta.error}</div>
                                                )}
                                                {form.values.vaccination === 'DONE' &&
                                                    <>
                                                        <Field name="lastVaccinationDate">
                                                            {({
                                                                field, // { name, value, onChange, onBlur }
                                                                form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                            }) => (
                                                                <div>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <br />
                                                                        <DatePicker
                                                                            label="Vaccination Date"
                                                                            // value={field.value}
                                                                            // onChange={(newValue) => setValue(newValue)}
                                                                            {...field}
                                                                            onChange={(date) => form.setFieldValue('lastVaccinationDate', date)}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                            )}
                                                        </Field>
                                                    </>
                                                }
                                            </div>
                                        )}

                                    </Field>
                                    <Field name="deworming">
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div>
                                                <CustomDeWormingStatus field={field} form={form} meta />
                                                {meta.touched && meta.error && (
                                                    <div className="error">{meta.error}</div>
                                                )}
                                                {form.values.deworming === 'DONE' &&
                                                    <>

                                                        <Field name="lastDewormingDate">
                                                            {({
                                                                field, // { name, value, onChange, onBlur }
                                                                form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                            }) => (
                                                                <div>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <br />
                                                                        <DatePicker
                                                                            label="Deworming Date"
                                                                            // value={field.value}
                                                                            // onChange={(newValue) => setValue(newValue)}
                                                                            {...field}
                                                                            onChange={(date) => form.setFieldValue('lastDewormingDate', date)}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                            )}
                                                        </Field>
                                                    </>
                                                }
                                            </div>
                                        )}

                                    </Field>
                                </Stack>
                            </Box>
                        </Stack>
                        <br />

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
