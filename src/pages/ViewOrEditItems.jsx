import React from 'react'

import { useLocation } from 'react-router-dom';
import CustomDataGrid from '../components/CustomDataGrid';
import { Box } from '@mui/material';
const ViewOrEditItems = () => {

    let location = useLocation();
    console.log(location.state.data);

    return <Box p={'5px'}><CustomDataGrid data={location.state.data} /></Box>;
}

export default ViewOrEditItems
