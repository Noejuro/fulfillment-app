import React from 'react'
import { Toolbar, Box } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

//Views
import Products from '../../views/Main/Products'
import Orders from '../../views/Main/Orders'

export default function MainContainer(): JSX.Element {
    return(
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route
                    path="*"
                    element={<Navigate to="/products" />}
                />
            </Routes>
        </Box>
    )
}