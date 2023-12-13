import { Box, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { CustomButton } from '../pages/AddPet'

const CustomCard = ({ name, owner, contact, status, dateOfAdmission, dateOfDischarge, onEdit, onDelete, petIdentifier, onView }) => {

    const onViewClicked = (petIdentifier) => {
        onView(petIdentifier);
    }
    const onDeleteClicked = (petIdentifier) => {
        onDelete(petIdentifier);
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://cataas.com/cat/says/hello%20world!"
                component='img'
                alt="My Pet"
                title="Pet"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Owner Name:{owner}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Owner Name:{contact}
                </Typography>
                <Box>
                    <Stack display={'flex'} >
                        <Typography gutterBottom variant="h6" component="div">
                            Admission Date:{dateOfAdmission}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Discharge Date:{dateOfDischarge}
                        </Typography>
                    </Stack>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    The pet is currently in ${status}
                </Typography>
            </CardContent>
            <CardActions>
                <Box>
                    <Stack direction='row' spacing={'5px'} useFlexGap flexWrap="wrap">
                        <CustomButton variant='outlined' size="small">Edit</CustomButton>
                        <CustomButton variant='outlined' size="small" onClick={() => onDeleteClicked(petIdentifier)}>Delete</CustomButton>
                        <CustomButton variant='outlined' size="small" onClick={() => onViewClicked(petIdentifier)}>View</CustomButton>
                    </Stack>
                </Box>
            </CardActions>
        </Card>
    )
}

export default CustomCard
