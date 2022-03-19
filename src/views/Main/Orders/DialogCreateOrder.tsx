import React, { useState } from 'react'
import { Dialog, DialogTitle, useTheme, useMediaQuery, DialogContent, Typography, DialogActions, Button, Grid, Autocomplete, TextField, Box } from '@mui/material'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface IProps {
    open: boolean,
    handleClose(): void
}

interface IProduct {
    id: number,
    name: string,
    price: number,
    sku: string,
    quantity: number,
    img: string | undefined
}

interface IWarehouse {
    id: number,
    name: string,
    email: string,
    location: string,
    phone: string,
    capacity: number
}

interface IStore {
    id: number,
    name: string
}

export default function DialogCreateOrder(props: IProps): JSX.Element {

    const { handleClose, open } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [selectedWarehouse, setSelectedWarehouse] = useState<IWarehouse | null>(null)
    const [selectedStore, setSelectedStore] = useState<IStore | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
    const [selectedProducts, setSelectedProducts] = useState<IProduct[] | []>([])

    const stores = [
        {id: 1, name: "Wix"},
        {id: 2, name: "Shopify"},
        {id: 3, name: "Mercado Libre"},
        {id: 4, name: "Ebay"},
    ]

    const warehouses = [
        {id: 1, name: "Aguascalientes Warehouse", email: "agsw@mail.com", location: "Aguascalientes, Ags", phone: "4491111222", capacity: 5000 },
        {id: 2, name: "Obispado", email: "contact@obispado.com", location: "Monterrey, Nuevo León", phone: "8123334765", capacity: 15000 },
        {id: 3, name: "Kanbun", email: "telecon@mail.com", location: "Zapopan, Jalisco", phone: "3331111222", capacity: 10000 },
        {id: 4, name: "AWS Warehouse", email: "contact@amzn.com", location: "San Pedro Garza García, Nuevo León", phone: "8112222333", capacity: 50000 },
        {id: 5, name: "Semillero", email: "atm@mail.com", location: "San Nicolas, Nuevo León", phone: "8311111222", capacity: 5000 }
    ]

    const products = [
        {id: 1, name: "Tenis Nike", price: 2500, sku: "TENISNIKE100", quantity: 10, img: "https://www.shoesvalley.cn/image/cache/nike/2019/270Ract/2712/27fa7998-800x800.jpg" },
        {id: 2, name: "Shorts Puma", price: 1000, sku: "PUMASHORTS", quantity: 100, img: "https://ss205.liverpool.com.mx/xl/1092723702.jpg"  },
        {id: 3, name: "Box Gloves", price: 1500, sku: "BOX1313", quantity: 5, img: "https://cdn.shopify.com/s/files/1/0264/2218/1937/products/BG_ELITE_3.0_WHITE_BLACK_1500_01_1_800x.jpg?v=1643999216"  },
        {id: 4, name: "PSG Jersey", price: 2000, sku: "PSG2022", quantity: 500, img: "https://www.innovasport.com/medias/IS-CV7902-101-1.png?context=bWFzdGVyfGltYWdlc3w1NTYxOHxpbWFnZS9wbmd8aW1hZ2VzL2hjYS9oODEvMTAzMjA4ODA0Njc5OTgucG5nfDJhNjgzMjc3ZWQxZWMwNDlkZTY2NTg1N2I5OWY0YTUwYTQ5NDY3N2M4M2Y2OWU1YjMzODk0MDhjMTMzMzRmZjc"  },
        {id: 5, name: "Headband Nike", price: 500, sku: "NIKEHEADBAND", quantity: 8, img: "https://www.traininn.com/f/3/39728/nike-headband-swoosh.jpg"  }
    ]

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
            <DialogContent dividers>
                <Grid container>
                    <Grid item xs={12} md={6} className="p-2">
                        <Typography className='fw-bold pb-3' variant='h6'> Select Products </Typography>
                        <Autocomplete
                            id="selectProduct"
                            options={products}
                            value={selectedProduct}
                            onChange={handleChangeProduct}
                            getOptionLabel={(option: IProduct) => option.name}
                            isOptionEqualToValue={(option: IProduct, value: IProduct) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="Select Product" />}
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
                    <Grid item xs={12} md={6} className="p-2">
                        <Typography className='fw-bold pb-3' variant='h6'> Client </Typography>
                        <TextField required id="clientName" label="Name" variant='outlined' size='small' color='primary' className='w-100 mb-1'/>
                        <TextField required id="clientEmail" label="Email" variant='outlined' size='small' color='primary' className='w-100 my-1'/>
                        <TextField required id="clientPhone" label="Phone" variant='outlined' size='small' color='primary' className='w-100 my-1' />
                        <TextField required id="clientAddress" label="Address" variant='outlined' size='small' color='primary' className='w-100 mt-1'/>
                    </Grid>
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
                            isOptionEqualToValue={(option: IWarehouse, value: IWarehouse) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="Select Warehouse" />}
                            />
                    </Grid>
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
                            isOptionEqualToValue={(option: IStore, value: IStore) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="Select Store" />}
                            />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} > Close </Button>
                <Button onClick={handleClose} variant="contained" > Create </Button>
            </DialogActions>
        </Dialog>
    )
}