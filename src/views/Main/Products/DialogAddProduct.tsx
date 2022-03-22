import React from 'react'
import { Dialog, DialogContent, DialogTitle, useTheme, useMediaQuery, TextField, DialogActions, Button, Typography } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form';

interface IProps {
    open: boolean,
    handleClose(): void
}

interface IFormInput {
    [x: string]: any
}

export default function DialogAddProduct(props: IProps): JSX.Element {

    const { handleClose, open } = props;
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { register, handleSubmit,  formState: { errors }  } = useForm();

    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);


    return(
        <Dialog onClose={handleClose} open={open} fullScreen={fullScreen} maxWidth="sm" fullWidth>
            <DialogTitle> Add Product </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    {/* NAME Input */}
                    <TextField id="name" label="Name" variant='outlined' size='small' color='primary' className='w-100 mb-2'
                        required
                        error={!!errors.name}
                        {...register("name", {required: true})} />

                    {/* SKU Input */}
                    <TextField id="sku" label="SKU" variant='outlined' size='small' color='primary' className='w-100 mb-2'
                        required
                        error={!!errors.sku}
                        {...register("sku", {required: true})} />

                    {/* PRICE Input */}
                    <TextField id="price" label="Price" variant='outlined' size='small' color='primary' className='w-100 mb-2' type="number"
                        required
                        error={!!errors.price}
                        {...register("price", {required: true, pattern: /^\d+$/ })} />
                    
                    {errors?.price?.type === "pattern" &&
                        <>
                            <br />
                            <Typography color="error" variant="caption"> Price must be a number </Typography>
                        </>
                        
                    }

                    {/* QUANTITY Input */}
                    <TextField id="quantity" label="Quantity" variant='outlined' size='small' color='primary' className='w-100 mb-2' type="number"
                        required
                        error={!!errors.quantity}
                        {...register("quantity", {required: true, pattern: /^\d+$/ })} />

                    {errors?.quantity?.type === "pattern" &&
                        <>
                            <br />
                            <Typography color="error" variant="caption"> Quantity must be a number </Typography>
                        </>
                        
                    }

                    {/* IMG Input */}
                    <TextField id="img" label="Image URL" variant='outlined' size='small' color='primary' className='w-100 mb-2'
                        required
                        error={!!errors.img}
                        {...register("img", {required: true})} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} > Close </Button>
                    <Button variant="contained" type="submit" > Add </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}