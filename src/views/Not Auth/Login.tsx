import React from 'react'
import { Fade, Grid, Hidden, Slide, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

//Components
import Form from '../../components/Login/Form'

export default function Login(): JSX.Element {
    return(
        <Grid container className="mainBackground h-100">
             <Hidden only={['sm', 'xs']}>
                <Grid item xs={7} className="p-5">
                    <Fade in={true} timeout={2000}>
                        <div className="row h-100 w-100 justify-content-center align-items-center p-4">
                            <div>
                                <Typography variant="h3" className="fw-bold lh-1"> Welcome </Typography>
                                <Typography variant="h3" className="fw-bold lh-sm"> to Fulfillment </Typography>
                                <Typography variant="h6" className="fw-light pt-2"> The fulfillment process simplified for your business. </Typography>
                                <img src="/assets/login/fulfillment.png" alt="Fulfillment" className={`responsiveImage pt-5`} style={{maxWidth: "70%"}} />
                            </div>
                        </div>
                    </Fade>
                </Grid>
             </Hidden>
             <Slide direction="left" in={true} timeout={700}>
                <Grid item xs={12} md={5} className="mainTextColor bg-white">
                    <div className="row h-100 w-100 justify-content-center align-items-center p-4 mx-0">
                        <div className="text-center">
                            <img src="/assets/logos/fulfillment-logo.png" alt="Logo" className={`responsiveImage`} style={{maxWidth: "15rem"}}  />
                            <Typography variant='subtitle1' className="fw-bold lh-1"> Login to your account </Typography>
                            <Typography variant='subtitle1' className="fw-bold"> Create an account <Link to="/register">here</Link> </Typography>
                            <Form />
                            <Typography variant='subtitle1' className="fw-bold"> Don't have a Fulfillment account? </Typography>
                            <Link to="/register"> Create an account </Link>
                        </div>
                    </div>
                </Grid>
             </Slide>
        </Grid>
    )
}