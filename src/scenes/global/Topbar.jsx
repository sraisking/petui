import { useTheme } from '@emotion/react'
import React, { useContext } from 'react'
import { ColorModeContext, tokens } from '../../theme';
import { Box, IconButton, InputBase } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined, NotificationsOutlined, PersonOutline, SearchOutlined, SettingsOutlined } from '@mui/icons-material';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    return (
        <Box display='flex' justifyContent="space-between" p={2}>
            <Box display='flex' bgcolor={colors.primary[400]} borderRadius={"3px"}>
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Search' />
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <Box display={'flex'}>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined />
                    </IconButton>
                    <IconButton>
                        <PersonOutline />
                    </IconButton>
                    <IconButton>
                        <NotificationsOutlined />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Topbar
