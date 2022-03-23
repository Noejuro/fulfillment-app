import React, { useEffect, useState } from 'react'
import { Button, Grid, InputAdornment, Slide, TextField } from '@mui/material'
import { toast } from 'react-toastify';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getProducts, reset, resetDeleted, deleteProduct } from '../../../features/products/productsSlice'

//Components
import Datatable from '../../../components/shared-components/Table/DataTable';
import DialogAddProduct from './DialogAddProduct';

// Interfaces
import IProduct from '../../../interfaces/Product'

//Icons
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Products(): JSX.Element {

    const dispatch = useDispatch();
    const { products, isError, message, isRequested, isDeletedError, isDeletedSuccess }    = useSelector((state: RootState) => state.products)
    
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

    useEffect(() => {

        if (isDeletedError) {
            toast.error(message as string);
            dispatch(resetDeleted());
        }
        
        if (isDeletedSuccess) {
            toast.success("Product deleted");
            dispatch(getProducts());
            handleClose();
            dispatch(resetDeleted());
        }

    }, [dispatch, isDeletedError, isDeletedSuccess, message])
  
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

    const deleteProd = (id: string) => {
        dispatch(deleteProduct(id));
    }

    const Actions = (props: {id: string}): JSX.Element => {
        return (
            <DeleteIcon color='error' sx={{cursor: 'pointer'}} onClick={() => deleteProd(props.id)} />
        )
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
                    <Datatable data={filteredData} columns={columns} id={"_id"} Actions={Actions} />
                </div>
            </Slide>

            <DialogAddProduct open={open} handleClose={handleClose} />
        </>
    )
}