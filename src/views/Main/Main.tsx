import React from 'react'
import { Box } from '@mui/material';

//Components
import MainAppBar from '../../components/Navigation/MainAppBar';
import MainContainer from '../../components/Navigation/MainContainer';
import MainDrawer from '../../components/Navigation/MainDrawer';

export default function Main(): JSX.Element {
    const [open, setOpen] = React.useState(false);

    const handleDrawer = () => {
        setOpen((lastVal) => !lastVal);
    };

    return(
        <Box sx={{ display: 'flex', height: "100%" }}>
            <MainAppBar open={open} handleDrawer={handleDrawer} />
            <MainDrawer open={open} handleDrawer={handleDrawer} />
            <MainContainer />
        </Box>
    )
}