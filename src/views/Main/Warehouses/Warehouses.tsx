import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Datatable from '../../../components/shared-components/Table/DataTable';

export default function Warehouses(): JSX.Element {

    const dummyData = [
        {name: "Tenis Nike", price: 2500, sku: "TENISNIKE100", quantity: 10 },
        {name: "Shorts Puma", price: 1000, sku: "PUMASHORTS", quantity: 100 },
        {name: "Box Gloves", price: 1500, sku: "BOX1313", quantity: 5 },
        {name: "Chelsea Jersey", price: 2000, sku: "CHELSEA2022", quantity: 500 },
        {name: "Headband Nike", price: 500, sku: "NIKEHEADBAND", quantity: 8 }
    ]

    const columns = [
        {id: "name", name: "Product", value: "name", align: 'center' as const, sort: true},
        {id: "sku", name: "SKU", value: "sku", align: 'center' as const, sort: true},
        {id: "price", name: "Price", value: "price", align: 'center' as const, sort: false},
        {id: "quantity", name: "Quantity", value: "quantity", align: 'center' as const, sort: true}
    ]

    return(
        <>
            <div className="d-flex flex-row justify-content-center py-2">
                <TextField id="filters" label="Search" placeholder='Search Warehouse'
                size='small' variant='outlined' color='primary' className='mainSearchBar'
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                }} />
            </div>
            <div className="d-flex flex-row" style={{overflowY: "auto"}}>
                <Datatable data={dummyData} columns={columns} />
            </div>
        </>
    )
}