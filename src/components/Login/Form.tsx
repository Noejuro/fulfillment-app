import React from 'react'
import { Button, TextField } from '@mui/material'

//Styles
import componentStyle from '../../styles/login.module.css'

export default function Form(): JSX.Element {
    return(
        <div className="col text-center m-auto py-4" style={{maxWidth: "18rem"}} >
            <TextField id="email" label="Email" variant='outlined' size='small' color='primary'/>
            <TextField id="password" label="Password" type="password" variant='outlined' size='small' className="my-3" />  
            <Button variant="contained" size='small' color='secondary' className={`${componentStyle.loginBtn}`} >Login</Button>
        </div>
    )
}