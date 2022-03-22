import React, { useEffect } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, reset } from '../../features/auth/authSlice'
import { RootState } from '../../store';
import { toast } from 'react-toastify'
interface IFormInput {
    [x: string]: any
}

interface IRegister {
    name: string,
    company: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword?: string
}

export default function Form(): JSX.Element {

    const dispatch = useDispatch();

    const { register, handleSubmit,  formState: { errors }  } = useForm<IRegister>();

    const { user, isError, isSuccess, message } = useSelector((state: RootState) => state.auth)

    const onSubmit: SubmitHandler<IRegister> = data => {
        delete data.confirmPassword
        const userData: IRegister = {...data}
        dispatch(registerUser(userData));
    };

    useEffect(() => {
        if(isError)
            toast.error(message as string);

        if(isError || isSuccess)
            dispatch(reset());
        
    }, [isError, isSuccess, message, dispatch])

    return(
        <div className="col text-center m-auto pt-4" style={{maxWidth: "18rem"}} >
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* NAME Input */}
                <TextField id="name" label="Name" variant='outlined' size='small' color='primary' className='w-100'
                    required
                    error={!!errors.name}
                    {...register("name", {required: true})} />

                {/* COMPANY Input */}
                <TextField id="company" label="Company Name" variant='outlined' size='small' color='primary' className='mt-2 w-100' 
                    required
                    error={!!errors.company}
                    {...register("company", {required: true})} />

                {/* EMAIL Input */}
                <TextField id="email" label="Email" variant='outlined' size='small' color='primary' className='mt-2 w-100' type="email"
                    required
                    error={!!errors.email}
                    {...register("email", {required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})} />

                {errors?.email?.type === "pattern" &&
                    <>
                        <br />
                        <Typography color="error" variant="caption"> Invalid Email </Typography>
                    </>
                    
                }

                {/* PHONE Input */}
                <TextField id="phone" label="Phone Number" variant='outlined' size='small' color='primary' className='mt-2 w-100'
                    required
                    error={!!errors.phone}
                    {...register("phone", {required: true, pattern: /^[0-9\+]{10,13}$/ })} />

                {errors?.phone?.type === "pattern" &&
                    <>
                        <br />
                        <Typography color="error" variant="caption"> Invalid Phone </Typography>
                    </>
                    
                }

                {/* PASSWORD Input */}
                <TextField id="password" label="Password" variant='outlined' size='small' className='mt-2 w-100'type="password" 
                    required
                    error={!!errors.password}
                    {...register('password', {required: true, minLength: 8})} /> 
                
                {errors?.password?.type === "minLength" &&
                    <>
                        <br />
                        <Typography color="error" variant="caption"> Password must be at least 8 characters long </Typography>
                    </>
                    
                }

                {/* CONFIRM PASSWORD Input */}
                <TextField id="confirmPassword" label="Confirm Password" variant='outlined' size='small' className='my-2 w-100' type="password" 
                    required
                    error={!!errors.confirmPassword}
                    {...register('confirmPassword', {required: true, minLength: 8})} /> 
                
                {errors?.confirmPassword?.type === "minLength" &&
                    <>
                        <br />
                        <Typography color="error" variant="caption"> Password must be at least 8 characters long </Typography>
                    </>
                    
                }

                <Button type="submit" variant="contained" size='small' color='secondary' className={`mt-4`} sx={{minWidth: 120}} > Register </Button>
            </form>
        </div>
    )
}