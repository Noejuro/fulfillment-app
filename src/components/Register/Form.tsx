import React from 'react'
import { Button, TextField } from '@mui/material'

export default function Form(): JSX.Element {
    return(
        <div className="col text-center m-auto pt-4" style={{maxWidth: "18rem"}} >
            <TextField id="name" label="Name" variant='outlined' size='small' color='primary' className='pb-2 w-100'/>
            <TextField id="companyName" label="Company Name" variant='outlined' size='small' color='primary' className='pb-2 w-100'/>
            <TextField id="email" label="Email" variant='outlined' size='small' color='primary' className='pb-2 w-100' type="email"/>
            <TextField id="phone" label="Phone Number" variant='outlined' size='small' color='primary' className='pb-2 w-100'/>
            <TextField id="password" label="Password" variant='outlined' size='small' className='pb-2 w-100'type="password"/> 
            <TextField id="confirmPassword" label="Confirm Password" variant='outlined' size='small' className='pb-2 w-100' type="password"/>  
            <Button variant="contained" size='small' color='secondary' className={`mt-4`} sx={{minWidth: 120}} > Register </Button>
        </div>
    )
}