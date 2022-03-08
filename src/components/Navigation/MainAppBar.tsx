import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

//Icons
import MenuIcon from '@mui/icons-material/Menu';

interface IProps {
    open: boolean,
    handleDrawer() : void
}

export default function MainAppBar(props: IProps): JSX.Element {

    const {open, handleDrawer} = props;

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
                <Typography variant="h6" noWrap component="div">
                    Fulfillment
                </Typography>
            </Toolbar>
        </AppBar>
    )
}