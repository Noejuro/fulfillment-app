import React from 'react'
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, useTheme, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice'
import { reset as resetProducts, resetCreated as resetCreatedProducts } from '../../features/products/productsSlice'
import { reset as resetOrders, resetCreated as resetCreatedOrders } from '../../features/orders/ordersSlice'
import { reset as resetWarehouses } from '../../features/warehouses/warehousesSlice'
import { reset as resetStores } from '../../features/store/storesSlice'

//Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface IProps {
    open: boolean,
    handleDrawer() : void
}

const drawerWidth: number = 200;

export default function MainDrawer(props: IProps): JSX.Element {

    const theme         = useTheme();
    const breakpoint    = useMediaQuery(theme.breakpoints.up('md'));
    const dispatch      = useDispatch()

    const {open, handleDrawer} = props;

    const onLogout = () => {
        // Reset Auth
        dispatch(logout());
        dispatch(reset());
        // Reset Products
        dispatch(resetProducts())
        dispatch(resetCreatedProducts());
        // Reset Orders
        dispatch(resetOrders())
        dispatch(resetCreatedOrders());
        // Reset Warehouses
        dispatch(resetWarehouses())
        // Reset Stores
        dispatch(resetStores())
    }
    
    return(
        <Drawer
            variant={breakpoint ? "permanent" : "temporary"}
            open={open}
            onClose={handleDrawer}
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
            PaperProps={{
                sx: {
                    backgroundColor: "#537895",
                    backgroundImage: "linear-gradient(315deg, #537895 0%, #09203f 74%)",
                    color: "white",
                }
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <Link to="/orders"> 
                        <ListItem button>
                            <ListItemIcon>
                                <ShoppingCartIcon sx={{color: "white"}} />
                            </ListItemIcon>
                            <ListItemText  sx={{color: "white"}} primary="Orders" />
                        </ListItem>
                    </Link>
                    <Link to="/products"> 
                        <ListItem button>
                            <ListItemIcon>
                                <CategoryIcon sx={{color: "white"}} />
                            </ListItemIcon>
                            <ListItemText sx={{color: "white"}} primary="Products" />
                        </ListItem>
                    </Link>
                    <Link to="/warehouses"> 
                        <ListItem button>
                            <ListItemIcon>
                                <StoreIcon sx={{color: "white"}} />
                            </ListItemIcon>
                            <ListItemText  sx={{color: "white"}} primary="Warehouses" />
                        </ListItem>
                    </Link>
                    <ListItem button onClick={onLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon sx={{color: "white"}} />
                        </ListItemIcon>
                        <ListItemText  sx={{color: "white"}} primary="Logout" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}