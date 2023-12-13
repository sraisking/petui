import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Modal, Stack, TextField, Typography } from '@mui/material';
import { CustomButton } from '../pages/AddPet';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { saveAs } from 'file-saver';

export function CustomFooterStatusComponent(props) {
    return (
        <Box sx={{ p: 1, display: 'flex' }}>
            <FiberManualRecordIcon
                fontSize="small"
                sx={{
                    mr: 1,
                    color: props.status === 'connected' ? '#4caf50' : '#d9182e',
                }}
            />
            Status {props.status}
        </Box>
    );
}
const columns = [
    {
        field: 'name',
        headerName: 'Name of Item/Service',
        width: 150,
        editable: true
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: true
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 110,
        editable: true
    },
];


const AddItemSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required(' Name of expense is Required!'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Description is required'),
    price: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Please add price. Nothing comes for free'),

});
export default function CustomDataGrid({ data }) {
    const [status, setStatus] = React.useState('connected');
    const [items, setItems] = React.useState(data?.items || [])
    console.log(items);
    const [addedItems, setAddedItems] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const apiUrl = process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_URL_LOCAL
        : process.env.REACT_APP_API_URL_PROD;
    const onAddExpense = () => {
        handleOpen()
    }
    const onGenerate = async () => {
        try {
            const response = await fetch(`${apiUrl}/pdf/generate/${data.id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch PDF');
            }
            const pdfBlob = await response.blob();
            saveAs(pdfBlob, `bill-${data.id}.pdf`);
        } catch (error) {
            console.error('Error fetching or saving PDF:', error.message);
        }


    }
    const saveExpenses = () => {
        console.log(addedItems);
        console.log(JSON.stringify(addedItems));
        axios.patch(`${apiUrl}/pets/${data.id}/status`,
            { items: addedItems }
        )
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Box sx={{ width: '100%' }}>
            <CustomButton variant='outlined' onClick={onAddExpense}>Add Expenses</CustomButton>
            {items.length !== 0 && <Box sx={{ height: 350, width: '100%', mb: 1 }}>
                <DataGrid
                    rows={items}
                    columns={columns}
                    getRowId={(row) => `${row.name}-${Math.random()}`}
                    slots={{
                        footer: CustomFooterStatusComponent,
                    }}
                    slotProps={{
                        footer: { status },
                    }}
                />
            </Box>}
            {addedItems.length !== 0 && < Button
                variant="contained"
                onClick={saveExpenses}
            >
                Save Expenses
            </Button>}
            {items.length > 0 &&
                <CustomButton variant='outlined' onClick={onGenerate}>Generate Report</CustomButton>}

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={style}>
                        <Formik
                            initialValues={{
                                name: '',
                                description: '',
                                price: '',
                            }}
                            validationSchema={AddItemSchema}
                            onSubmit={values => {
                                // same shape as initial values
                                console.log(values);
                                setAddedItems((prevItems) => [...prevItems, values])
                                setItems((prevItems) => [...prevItems, values])
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
                                                    id="name"
                                                    label="Enter Expense Name"
                                                    {...field}
                                                    variant="standard"
                                                />
                                                {meta.touched && meta.error && (
                                                    <div className="error">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="description">
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div>
                                                <TextField
                                                    id="description"
                                                    label="Enter expense description"
                                                    {...field}
                                                    variant="standard"
                                                />
                                                {meta.touched && meta.error && (
                                                    <div className="error">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="price">
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div>
                                                <TextField
                                                    id="price"
                                                    label="Enter expense"
                                                    {...field}
                                                    variant="standard"
                                                />
                                                {meta.touched && meta.error && (
                                                    <div className="error">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                    <CustomButton variant='outlined' type='submit'>
                                        Add Expense
                                    </CustomButton>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Modal>
            </div>

        </Box >
    );
}
