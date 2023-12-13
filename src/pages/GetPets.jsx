import { Box, Stack } from '@mui/material'
import React from 'react'
import CustomCard from '../components/CustomCard'
import { useData } from '../context/DataProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GetPets = () => {
    const { data, loading, error, fetchData } = useData();
    const apiUrl = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL_PROD;
    console.log(data, loading, error, fetchData);
    useEffect(() => {
        fetchData();
    }, []);
    const navigate = useNavigate()
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    const onView = async (_id) => {
        console.log(_id);
        try {
            const response = await fetch(`${apiUrl}/pets/${_id}`)
            const data = await response.json()
            console.log(data);
            navigate('/viewOrEdit', {
                state: {
                    data: { ...data }
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
    const onDelete = async (_id) => {
        try {
            let deleted = await fetch(`${apiUrl}/pets/${_id}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(deleted);
            fetchData()
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Box p={5}>
            <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap">
                {
                    data.map((pet, index) => {
                        return (
                            <CustomCard
                                name={pet.name}
                                contact={pet.contact}
                                dateOfAdmission={pet.dateOfAdmission}
                                dateOfDischarge={pet.dateOfDischarge}
                                owner={pet.owner}
                                status={pet.status}
                                key={`${index}-${pet.contact}`}
                                petIdentifier={pet.id}
                                onView={onView}
                                onDelete={onDelete}
                            />
                        )
                    })
                }

            </Stack>
        </Box>
    )
}

export default GetPets
