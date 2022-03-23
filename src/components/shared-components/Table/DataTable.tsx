import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme, useMediaQuery, Grid, Card, Tooltip } from '@mui/material'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

//ICONS
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface IColumns {
    id: string,
    name: string,
    value: string,
    align: "inherit" | "left" | "center" | "right" | "justify" | undefined,
    sort: boolean
}

interface IData {
    [key: string]: any
}

interface IProps {
    columns: Array<IColumns>,
    data: Array<IData>,
    id: string,
    Actions?: React.FC<{id: string }>
}

export default function Datatable(props: IProps): JSX.Element {

    const { columns, data, id, Actions } = props;

    const theme         = useTheme();
    const breakpointMD    = useMediaQuery(theme.breakpoints.up('md'));
    const breakpointSM    = useMediaQuery(theme.breakpoints.up('sm'));

    return(
        <>
            {breakpointMD ?
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(col => 
                                <TableCell className="py-2" sx={{backgroundColor: "#09203f", color: "white"}} key={col.id} align={ col.align }> 
                                    <Typography variant="subtitle1" className="fw-bold"> { col.name } </Typography>
                                </TableCell>
                            )}
                            {!!Actions &&  
                                <TableCell className="py-2" sx={{backgroundColor: "#09203f", color: "white"}} align="center"> 
                                    Actions 
                                </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        !!data.length ?
                            data.map((item) => (
                                <TableRow
                                    key={item[id]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {columns.map(col => 
                                        <TableCell key={col.id} align={ col.align }>
                                            {
                                                col.id === "img" ?
                                                    <Zoom>
                                                        <img src={item.img} alt={item.name} className={`responsiveImage`} style={{maxWidth: "3.6rem"}} />
                                                    </Zoom>
                                                    :
                                                    <Typography variant="subtitle2" > {item[col.value]} </Typography>
                                            }
                                        </TableCell>
                                    )}
                                    {!!Actions &&  
                                        <TableCell align="center">
                                            <Actions id={item._id} />
                                        </TableCell>
                                    }
                                </TableRow>
                            ))
                            :
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className="py-3" align="center" colSpan={7}>
                                    <ErrorOutlineIcon fontSize='large' />
                                    <Typography variant="subtitle1" className="fw-bold" > No data available </Typography>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                :
                <Grid container>
                    {!!data.length ?
                        <>
                            {data.map((item) => (
                                <Grid item xs={12} sm={6} className={`${breakpointSM && 'px-2'} py-2`} key={item[id]}>
                                    <Card className="w-100 h-100" style={{borderRadius: 15}}>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex flex-row mx-0 px-3 py-2" style={{backgroundColor: "#20242f", color: "white"}}>
                                                <Typography variant="subtitle1" noWrap  sx={{ textOverflow: 'ellipsis' }} className="fw-bold"> {item[id]} </Typography>
                                            </div>
                                            <Grid container className="p-2">
                                                {columns.map(col => 
                                                    <Grid item xs={6} className=" py-1 px-2" key={col.id}>
                                                        {col.id === "img" ?
                                                            <Zoom>
                                                                <img src={item.img} alt={item.name} className={`responsiveImage`} style={{maxWidth: "3.6rem"}} />
                                                            </Zoom>
                                                            :
                                                            <>
                                                                <Typography variant="subtitle1" className="fw-bold lh-sm"> {col.name} </Typography>
                                                                <Tooltip title={item[col.value]} placement="top">
                                                                    <Typography variant="subtitle1" className="text-break lh-sm" > {item[col.value]} </Typography>
                                                                </Tooltip>
                                                            </>
                                                        }
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </div>
                                    </Card>
                                </Grid>
                            ))}
                        </>
                        :
                        <Grid item xs={12} className="text-center">
                            <ErrorOutlineIcon fontSize='large' />
                            <Typography variant='subtitle1' className="fw-bold"> No data available</Typography>
                        </Grid>
                    }
                    
                </Grid>
            }
        </>
    )
}