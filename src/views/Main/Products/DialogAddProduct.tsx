import React from 'react'
import { Dialog, DialogContent, DialogTitle, useTheme, useMediaQuery, TextField, DialogActions, Button } from '@mui/material'

interface IProps {
    open: boolean,
    handleClose(): void
}

export default function DialogAddProduct(props: IProps): JSX.Element {

    const { handleClose, open } = props;
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    return(
        <Dialog onClose={handleClose} open={open} fullScreen={fullScreen} maxWidth="sm" fullWidth>
            <DialogTitle> Add Product </DialogTitle>
            <DialogContent dividers>
                <TextField required id="productName" label="Name" variant='outlined' size='small' color='primary' className='w-100 mb-2'/>
                <TextField required id="productSKU" label="SKU" variant='outlined' size='small' color='primary' className='w-100 mb-2'/>
                <TextField required id="productPrice" label="Price" variant='outlined' size='small' color='primary' className='w-100 mb-2' type={"number"}/>
                <TextField required id="productQuantity" label="Quantity" variant='outlined' size='small' color='primary' className='w-100 mb-2' type={"number"}/>
                <TextField required id="productIMG" label="Image URL" variant='outlined' size='small' color='primary' className='w-100 mb-2'/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} > Close </Button>
                <Button onClick={handleClose} variant="contained" > Add </Button>
            </DialogActions>
        </Dialog>
    )
}