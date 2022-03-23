import React, { useEffect, useState } from 'react'
import { Button, Grid, InputAdornment, Slide, TextField } from '@mui/material'
import { toast } from 'react-toastify';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getOrders, reset } from '../../../features/orders/ordersSlice'

//Components
import Datatable from '../../../components/shared-components/Table/DataTable';
import DialogCreateOrder from './DialogCreateOrder';

// Interfaces
import IOrder from '../../../interfaces/Order'

//Icons
import SearchIcon from '@mui/icons-material/Search';

export default function Orders(): JSX.Element {

    const dispatch = useDispatch();
    const { orders, isError, message, isRequested } = useSelector((state: RootState) => state.orders)

    const [filteredData, setFilteredData]   = useState<IOrder[]>(orders)
    const [search, setSearch]               = useState<string>("")
    const [open, setOpen]                   = useState(false);
    
    const columns = [
        {id: "store", name: "Store", value: "store", align: 'center' as const, sort: true},
        {id: "items", name: "Items", value: "items", align: 'center' as const, sort: false},
        {id: "client", name: "Client", value: "client", align: 'center' as const, sort: true},
        {id: "warehouse", name: "Warehouse", value: "warehouse", align: 'center' as const, sort: true},
        {id: "createdAt", name: "Date", value: "createdAt", align: 'center' as const, sort: true},
    ]

    useEffect(() => {
        
        setFilteredData(orders)

        if(!orders.length && !isRequested)
            dispatch(getOrders());

        if(isError) {
            toast.error(message as string);
            dispatch(reset());
        }            

    }, [dispatch, orders.length, orders, isError, message, isRequested])
    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newSearch = event.target.value;
        setSearch(newSearch);

        let keys = Object.keys(orders[0]);

        let res = orders.filter( (item: IOrder) => 
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
                    <Datatable data={filteredData} columns={columns} id={"_id"} />
                </div>
            </Slide>
            <DialogCreateOrder open={open} handleClose={handleClose} />
        </>
    )
}