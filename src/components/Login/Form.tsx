import React from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
    [x: string]: any
}


export default function Form(): JSX.Element {

    const { register, handleSubmit,  formState: { errors }  } = useForm();

    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    return(
        <div className="col m-auto py-4" style={{maxWidth: "18rem"}} >
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* EMAIL Input */}
                <TextField id="email" label="Email" variant='outlined' size='small' color='primary' type="email"
                    required
                    error={!!errors.email}
                    {...register("email", {required: true, pattern:  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})} />

                {errors?.email?.type === "pattern" &&
                    <>
                        <br />
                        <Typography color="error" variant="caption" className="w-100"> Invalid Email </Typography>
                    </>
                    
                }
                
                {/* PASSWORD Input */}
                <TextField id="password" label="Password" type="password" variant='outlined' size='small' className="my-2" 
                    required
                    error={!!errors.password}
                    {...register('password', {required: true})} />  

                <Button variant="contained" size='small' color='secondary' sx={{minWidth: 120}} type="submit" > Login </Button>
            </form>
        </div>
    )
}