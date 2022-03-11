import React, { useState } from 'react'
import { InputAdornment, Slide, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Datatable from '../../../components/shared-components/Table/DataTable';

interface IData {
    id: number,
    name: string,
    price: number,
    sku: string,
    quantity: number
}

export default function Products(): JSX.Element {

    const dummyData = [
        {id: 1, name: "Tenis Nike", price: 2500, sku: "TENISNIKE100", quantity: 10 },
        {id: 2, name: "Shorts Puma", price: 1000, sku: "PUMASHORTS", quantity: 100 },
        {id: 3, name: "Box Gloves", price: 1500, sku: "BOX1313", quantity: 5 },
        {id: 4, name: "Chelsea Jersey", price: 2000, sku: "CHELSEA2022", quantity: 500 },
        {id: 5, name: "Headband Nike", price: 500, sku: "NIKEHEADBAND", quantity: 8 }
    ]
    
    const [filteredData, setFilteredData]   = useState<IData[]>(dummyData)
    const [search, setSearch]               = useState<string>("")


    const columns = [
        {id: "name", name: "Name", value: "name", align: 'center' as const, sort: true},
        {id: "sku", name: "SKU", value: "sku", align: 'center' as const, sort: false},
        {id: "price", name: "Price", value: "price", align: 'center' as const, sort: true},
        {id: "quantity", name: "Quantity", value: "quantity", align: 'center' as const, sort: true}
    ]

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newSearch = event.target.value;
        setSearch(newSearch);

        let keys = Object.keys(dummyData[0]);

        let res = dummyData.filter( (item: IData) => 
             keys.some(( property: string ) => 
                (item as any)[property].toString().toLowerCase().indexOf(newSearch.toLowerCase()) !== -1
            )
        )

        setFilteredData([...res])
    }

    return(
        <>
            <Slide direction="down" in={true} timeout={300}>
                <div className="d-flex flex-row justify-content-center py-3">
                    <TextField id="filters" label="Search" placeholder='Search Product' value={search} onChange={handleSearch}
                    size='small' variant='outlined' color='primary' className='mainSearchBar'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} />
                </div>
            </Slide>
            <Slide direction="up" in={true} timeout={300}>
                <div className="d-flex flex-row" style={{overflowY: "auto", borderRadius: "1rem 1rem 0 0"}}>
                    <Datatable data={filteredData} columns={columns} id={"sku"} />
                </div>
            </Slide>
        </>
    )
}