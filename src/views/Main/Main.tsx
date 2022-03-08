import { Box } from '@mui/system';
import React from 'react'

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
        <Box sx={{ display: 'flex' }}>
            <MainAppBar open={open} handleDrawer={handleDrawer} />
            <MainDrawer open={open} handleDrawer={handleDrawer} />
            <MainContainer />
        </Box>
    )
}