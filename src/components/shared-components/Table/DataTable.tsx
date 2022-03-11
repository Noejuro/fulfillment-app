import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme, useMediaQuery, Grid, Card } from '@mui/material'

//ICONS
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface IColumns {
    id: string,
    name: string,
    value: string,
    align: "inherit" | "left" | "center" | "right" | "justify" | undefined,
    sort: boolean
}

interface IProps {
    columns: Array<IColumns>,
    data: Array<any>,
    id: string
}

export default function Datatable(props: IProps): JSX.Element {

    const { columns, data, id } = props;

    const theme         = useTheme();
    const breakpoint    = useMediaQuery(theme.breakpoints.up('md'));

    return(
        <>
            {breakpoint ?
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(col => 
                                <TableCell className="py-2" sx={{backgroundColor: "#09203f", color: "white"}} key={col.id} align={ col.align }> 
                                    <Typography variant="subtitle1" className="fw-bold"> { col.name } </Typography>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        !!data.length ?
                            data.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {columns.map(col => 
                                        <TableCell key={col.id} className="py-3" align={ col.align }>
                                            <Typography variant="subtitle2" > {item[col.value]} </Typography>
                                        </TableCell>
                                    )}
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
                                <Grid item xs={12} sm={6} className="p-2" key={item.id}>
                                    <Card className="w-100 h-100" style={{borderRadius: 15}}>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex flex-row mx-0 px-3 py-1" style={{backgroundColor: "black", color: "white"}}>
                                                <Typography variant="subtitle1" noWrap  sx={{ textOverflow: 'ellipsis' }}> {item[id]} </Typography>
                                            </div>
                                            <Grid container className="px-2">
                                                {columns.map(col => 
                                                    <Grid item xs={6} className=" py-1 px-2" key={col.id}>
                                                        <Typography variant="subtitle1" className="fw-bold"> {col.name} </Typography>
                                                        <Typography variant="subtitle1" noWrap  sx={{ textOverflow: 'ellipsis' }}> {item[col.value]} </Typography>
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