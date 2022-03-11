import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom'

//Icons
import MenuIcon from '@mui/icons-material/Menu';

interface IProps {
    open: boolean,
    handleDrawer() : void
}

export default function MainAppBar(props: IProps): JSX.Element {

    const {open, handleDrawer} = props;

    const location  = useLocation();
    const firstPath = location.pathname.substring(1).split('/')[0];
    const pathName  = firstPath.charAt(0).toUpperCase() + firstPath.slice(1);

    return(
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} className="mainBackground" elevation={open ? 0 : 2}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawer}
                    edge="start"
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}> {pathName} </Typography>
                <img src="/assets/logos/fulfillment-white-logo.png" alt="Fulfillment" className={`responsiveImage`} style={{maxWidth: "100%", maxHeight: 30 }} />
            </Toolbar>
        </AppBar>
    )
}