import React from 'react'
import { Toolbar, Box, useTheme, useMediaQuery } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

//Views
import Products from '../../views/Main/Products/Products'
import Orders from '../../views/Main/Orders/Orders'
import Warehouses from '../../views/Main/Warehouses/Warehouses'

export default function MainContainer(): JSX.Element {

    const theme         = useTheme();
    const breakpoint    = useMediaQuery(theme.breakpoints.up('md'));

    return(
        <Box component="main" sx={{ flexGrow: 1, p: 0, height: "100%" }}>
            <div className="col h-100">
                <div className="d-flex flex-row flex-grow-1 mx-0 h-100">
                    <div className={`d-flex flex-column pb-3 h-100 flex-grow-1 ${breakpoint ? 'px-5' : 'px-4' }`}>
                        <Toolbar className="mb-2" />
                        <Routes>
                            <Route path="/"             element={<Navigate to="/orders" />} />
                            <Route path="orders"        element={<Orders />} />
                            <Route path="orders/:id"    element={<Orders />} />
                            <Route path="products"      element={<Products />} />
                            <Route path="warehouses"    element={<Warehouses />} />
                            <Route path="*"             element={<Navigate to="/orders" />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Box>
    )
}