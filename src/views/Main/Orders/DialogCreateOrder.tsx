import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, useTheme, useMediaQuery, DialogContent, Typography, DialogActions, Button, Grid, Autocomplete, TextField, Box } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { createOrder, resetCreated, getOrders } from '../../../features/orders/ordersSlice'
import { getProducts } from '../../../features/products/productsSlice'
import { getWarehouses } from '../../../features/warehouses/warehousesSlice'
import { getStores } from '../../../features/store/storesSlice'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { toast } from 'react-toastify';

// Interfaces
import IProduct from '../../../interfaces/Product'
import IWarehouse from '../../../interfaces/Warehouse'
import IStore from '../../../interfaces/Store'
import IClient from '../../../interfaces/Client'

interface IProps {
    open: boolean,
    handleClose(): void
}

export default function DialogCreateOrder(props: IProps): JSX.Element {

    const { handleClose, open } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const { products, isRequested: isRequestedProduct }     = useSelector((state: RootState) => state.products)
    const { warehouses, isRequested: isRequestedWarehouse } = useSelector((state: RootState) => state.warehouses)
    const { stores, isRequested: isRequestedStore }         = useSelector((state: RootState) => state.stores)
    const { isCreatedSuccess, isCreatedError, message }     = useSelector((state: RootState) => state.orders)

    const [selectedWarehouse, setSelectedWarehouse] = useState<IWarehouse | null>(null)
    const [selectedStore, setSelectedStore] = useState<IStore | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
    const [selectedProducts, setSelectedProducts] = useState<IProduct[] | []>([])

    const { register, handleSubmit,  formState: { errors }  } = useForm<IClient>();

    useEffect(() => {
        if(open) {
            if(!isRequestedProduct)
                dispatch(getProducts())

            if(!isRequestedWarehouse)
                dispatch(getWarehouses())

            if(!isRequestedStore)
                dispatch(getStores())
        }
    }, [open])

    useEffect(() => {

        if (isCreatedError) {
            toast.error(message as string);
            dispatch(resetCreated());
        }
        
        if (isCreatedSuccess) {
            toast.success("Order created");
            dispatch(getOrders());
            handleClose();
            dispatch(resetCreated());
        }

    }, [dispatch, isCreatedError, isCreatedSuccess, message, handleClose])


    const onSubmit: SubmitHandler<IClient> = client => {
        if(!selectedProducts.length)
            toast.error("You must select at least 1 product");
        else {
            const newOrder = {client, store: selectedStore === null ? "" : selectedStore._id, warehouse: selectedWarehouse === null ? "" : selectedWarehouse._id, products: selectedProducts}
            console.log(newOrder);  
            dispatch(createOrder(newOrder));
        }    
    };

    const handleChangeProduct = (event: any, newValue: IProduct | null): void => {
        setSelectedProduct(newValue);
        if(!!newValue && !selectedProducts.some((product: IProduct) => product.id === newValue.id )) {
            let tempProducts = [...selectedProducts];
            tempProducts.unshift({...newValue, quantity: 1});
            setSelectedProducts([...tempProducts])
        }
    }

    const addQuantity = (index: number) => {
        let tempProducts = [...selectedProducts];
        tempProducts[index].quantity += 1;
        setSelectedProducts([...tempProducts])
    }

    const substractQuantity = (index: number) => {
        let tempProducts = [...selectedProducts];
        if(selectedProducts[index].quantity > 1)
            tempProducts[index].quantity -= 1;
        else 
            tempProducts.splice(index, 1);

        setSelectedProducts([...tempProducts])
    }

    return(
        <Dialog onClose={handleClose} open={open} fullScreen={fullScreen} maxWidth="xl" fullWidth>
            <DialogTitle> Create Order </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    <Grid container>

                        {/* PRODUCTS Section */}
                        <Grid item xs={12} md={6} className="p-2">
                            <Typography className='fw-bold pb-3' variant='h6'> Select Products </Typography>
                            <Autocomplete
                                id="selectProduct"
                                options={products}
                                value={selectedProduct}
                                onChange={handleChangeProduct}
                                getOptionLabel={(option: IProduct) => option.name}
                                isOptionEqualToValue={(option: IProduct, value: IProduct) => option.id === value.id}
                                renderInput={(params) => <TextField {...params} label="Select Product*" />}
                                renderOption={(props, option: IProduct) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img src={option.img} alt={option.name} className={`responsiveImage`} style={{maxWidth: "2rem"}} />
                                        {option.name} 
                                    </Box>
                                )}
                                className="mb-2"
                                />
                            {!!selectedProducts.length &&
                                selectedProducts.map((product: IProduct, index: number) => (
                                    <Grid container key={product.sku} className="p-2" alignItems="center" justifyContent="center" >
                                        <Grid item xs="auto" alignItems="center">
                                            <Zoom>
                                                <img src={product.img} alt={product.name} className={`responsiveImage`} style={{maxWidth: "3rem"}} />
                                            </Zoom>
                                        </Grid>
                                        <Grid item xs className='px-3'>
                                            <Typography className='fw-bold lh-1' > {product.name} </Typography>
                                            <Typography variant='overline' className="lh-1"> {product.sku} </Typography>
                                            <Typography > ${product.price} </Typography>
                                        </Grid>
                                        <Grid item xs="auto" className="py-1">
                                            <Button onClick={() => substractQuantity(index)} variant='contained' className='me-2' sx={{padding: "1px", maxWidth: 30, minWidth: 30}}> - </Button>
                                                {product.quantity}
                                            <Button onClick={() => addQuantity(index)} variant='contained' className='ms-2' sx={{padding: "1px", maxWidth: 30, minWidth: 30}}> + </Button>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                        </Grid>

                        {/* CLIENT Section */}
                        <Grid item xs={12} md={6} className="p-2">
                            <Typography className='fw-bold pb-3' variant='h6'> Client </Typography>
                            <TextField id="name" label="Name" variant='outlined' size='small' color='primary' className='w-100'
                                required
                                error={!!errors.name}
                                {...register("name", {required: true})} />
                            
                            <TextField id="email" label="Email" variant='outlined' size='small' color='primary' className='w-100 mt-2' type="email"
                                required
                                error={!!errors.email}
                                {...register("email", {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})} />

                            {errors?.email?.type === "pattern" &&
                                <>
                                    <br />
                                    <Typography color="error" variant="caption"> Invalid Email </Typography>
                                </>
                                
                            }

                            <TextField id="phone" label="Phone" variant='outlined' size='small' color='primary' className='w-100 mt-2' 
                                required
                                error={!!errors.phone}
                                {...register("phone", {required: true, pattern: /^[0-9\+]{10,13}$/ })} />

                            {errors?.phone?.type === "pattern" &&
                                <>
                                    <br />
                                    <Typography color="error" variant="caption"> Invalid Phone </Typography>
                                </>
                                
                            }
                            <TextField id="address" label="Address" variant='outlined' size='small' color='primary' className='w-100 mt-2' 
                                required
                                error={!!errors.address}
                                {...register("address", {required: true})} />

                        </Grid>

                        {/* WAREHOUSE Section */}
                        <Grid item xs={12} md={6} className="p-2">
                            <Typography className='fw-bold pb-3' variant='h6'> Warehouse </Typography>
                            <Autocomplete
                                id="selectWarehouse"
                                options={warehouses}
                                value={selectedWarehouse}
                                onChange={(event: any, newValue: IWarehouse | null) => {
                                    setSelectedWarehouse(newValue);
                                }}
                                getOptionLabel={(option: IWarehouse) => option.name}
                                isOptionEqualToValue={(option: IWarehouse, value: IWarehouse) => option._id === value._id}
                                renderInput={(params) => <TextField {...params} required label="Select Warehouse" />}
                                />
                        </Grid>

                        {/* STORE Section */}
                        <Grid item xs={12} md={6} className="p-2">
                            <Typography className='fw-bold pb-3' variant='h6'> Store </Typography>
                            <Autocomplete
                                id="selectStore"
                                options={stores}
                                value={selectedStore}
                                onChange={(event: any, newValue: IStore | null) => {
                                    setSelectedStore(newValue);
                                }}
                                getOptionLabel={(option: IStore) => option.name}
                                isOptionEqualToValue={(option: IStore, value: IStore) => option._id === value._id}
                                renderInput={(params) => <TextField {...params} required label="Select Store" />}
                                renderOption={(props, option: IStore) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        <img src={option.img} alt={option.name} className={`responsiveImage`} style={{maxWidth: "2rem"}} />
                                        {option.name} 
                                    </Box>
                                )}
                                />
                        </Grid>
                    </Grid>
                </DialogContent>
            
                <DialogActions>
                    <Button onClick={handleClose} > Close </Button>
                    <Button type="submit" variant="contained" > Create </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}