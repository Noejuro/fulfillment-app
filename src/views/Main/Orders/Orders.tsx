import React, { useState } from 'react'
import { Button, Grid, InputAdornment, Slide, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Datatable from '../../../components/shared-components/Table/DataTable';
import DialogCreateOrder from './DialogCreateOrder';

interface IData {
    id: number,
    shop: string,
    items: number,
    customer: string,
    status: "CREATED" | "PENDING" | "SHIPPING" | "COMPLETED",
    createdAt: string 
}

export default function Orders(): JSX.Element {

    const dummyData = [
        {id: 1, shop: "Shopify",    items: 2,   customer: "Noé Juárez", status: "CREATED" as const, createdAt: "16-11-2021 19:10" },
        {id: 2, shop: "WIX",        items: 1,   customer: "Noé Juárez", status: "PENDING" as const, createdAt: "17-11-2021 15:01" },
        {id: 3, shop: "WIX",        items: 5,   customer: "Juan Meza", status: "SHIPPING" as const, createdAt: "10-12-2021 13:05" },
        {id: 4, shop: "Shopify",    items: 10,  customer: "Stone Cold", status: "CREATED" as const, createdAt: "02-08-2021 05:00" },
        {id: 5, shop: "Shopify",    items: 3,   customer: "Joe Jackson", status: "COMPLETED" as const, createdAt: "02-02-2022 13:10" }
    ]
    
    const columns = [
        {id: "shop", name: "Shop", value: "shop", align: 'center' as const, sort: true},
        {id: "items", name: "Items", value: "items", align: 'center' as const, sort: false},
        {id: "customer", name: "Customer", value: "customer", align: 'center' as const, sort: true},
        {id: "status", name: "Status", value: "status", align: 'center' as const, sort: true},
        {id: "createdAt", name: "Date", value: "createdAt", align: 'center' as const, sort: true},
    ]
    
    const [filteredData, setFilteredData]   = useState<IData[]>(dummyData)
    const [search, setSearch]               = useState<string>("")
    const [open, setOpen]                   = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

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
                <div className="d-flex flex-row justify-content-end py-3">
                    <Grid container justifyContent="flex-end" >
                        <Grid item xs={12} sm={4}>
                            <div className="d-flex flex-row justify-content-center">
                                <TextField id="filters" label="Search" placeholder='Search Order' value={search} onChange={handleSearch}
                                size='small' variant='outlined' color='primary' className='mainSearchBar'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className="d-flex flex-row justify-content-end">
                                <Button onClick={handleClickOpen} color='secondary' variant='contained' className="h-100" > Create Order </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Slide>
            <Slide direction="up" in={true} timeout={300}>
                <div className="d-flex flex-row" style={{overflowY: "auto", borderRadius: "1rem 1rem 0 0"}}>
                    <Datatable data={filteredData} columns={columns} id={"sku"} />
                </div>
            </Slide>
            <DialogCreateOrder open={open} handleClose={handleClose} />
        </>
    )
}