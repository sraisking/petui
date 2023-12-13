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

const rows = [
    { name: 'Snow', description: 'Jon', price: 35 },
    { name: 'Lannister', description: 'Cersei', price: 42 },
    { name: 'Lannister', description: 'Jaime', price: 45 },
    { name: 'Stark', description: 'Arya', price: 16 },
    { name: 'Targaryen', description: 'Daenerys', price: null },
    { name: 'Melisandre', description: null, price: 150 },
    { name: 'Clifford', description: 'Ferrara', price: 44 },
    { name: 'Frances', description: 'Rossini', price: 36 },
    { name: 'Roxie', description: 'Harvey', price: 65 },
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
    console.log(data.items);
    const [items, setItems] = React.useState(data?.items || [])
    console.log(items);
    const [addedItems, setAddedItems] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const apiUrl = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL_PROD;
    console.log(process.env.NODE_ENV);
    console.log("apiUrl=>>>>>>>>>>>>",apiUrl);
    const onAddExpense = () => {
        handleOpen()
    }
    const saveExpenses = () => {
        // const response = fetch(`http://192.168.1.103:5000/pets/${data.id}/status`, {
        //     method: 'patch',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: {
        //         "items": [
        //             {
        //                 "name": "subh",
        //                 "description": "test123",
        //                 "price": 4444
        //             }
        //         ]
        //     }
        // });
        console.log(JSON.stringify(addedItems));
        axios.patch(`${apiUrl}/pets/${data.id}/status`,
            { items: addedItems}
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
