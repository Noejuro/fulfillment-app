import React, { useEffect, useState } from 'react'
import { Button, Grid, InputAdornment, Slide, TextField } from '@mui/material'

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getProducts, reset } from '../../../features/products/productsSlice'

//Components
import Datatable from '../../../components/shared-components/Table/DataTable';
import DialogAddProduct from './DialogAddProduct';

// Interfaces
import IProduct from '../../../interfaces/Product'

//Icons
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';

export default function Products(): JSX.Element {

    const dispatch = useDispatch();
    const { products, isError, message, isRequested }    = useSelector((state: RootState) => state.products)
    
    const [filteredData, setFilteredData]   = useState<IProduct[]>(products)
    const [search, setSearch]               = useState<string>("")
    const [open, setOpen]                   = useState(false);

    const columns = [
        {id: "img", name: "Image", value: "img", align: 'center' as const, sort: true},
        {id: "name", name: "Name", value: "name", align: 'center' as const, sort: true},
        {id: "sku", name: "SKU", value: "sku", align: 'center' as const, sort: false},
        {id: "price", name: "Price", value: "price", align: 'center' as const, sort: true},
        {id: "quantity", name: "Quantity", value: "quantity", align: 'center' as const, sort: true}
    ]


    useEffect(() => {
        
        setFilteredData(products)

        if(!products.length && !isRequested)
            dispatch(getProducts());

        if(isError) {
            toast.error(message as string);
            dispatch(reset());
        }            

    }, [dispatch, products.length, products, isError, message, isRequested])
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newSearch = event.target.value;
        setSearch(newSearch);

        let keys = Object.keys(products[0]);

        let res = products.filter( (item: IProduct) => 
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
                    <Grid container justifyContent="flex-end" >
                        <Grid item xs={12} sm={4}>
                            <div className="d-flex flex-row justify-content-center">
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
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className="d-flex flex-row justify-content-end">
                                <Button onClick={handleClickOpen} color='secondary' variant='contained' className="h-100" > Add product </Button>
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
            <DialogAddProduct open={open} handleClose={handleClose} />
        </>
    )
}