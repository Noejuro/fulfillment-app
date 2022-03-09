import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

interface IColumns {
    id: string,
    name: string,
    value: string,
    align: "inherit" | "left" | "center" | "right" | "justify" | undefined,
    sort: boolean
}

interface IProps {
    columns: Array<IColumns>,
    data: Array<any>
}

export default function Datatable(props: IProps): JSX.Element {

    const { columns, data } = props;

    return(
        <>
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map(col => 
                            <TableCell key={col.id} align={ col.align }> { col.name } </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow
                            key={item.sku}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {columns.map(col => 
                                <TableCell key={col.id} component="th" scope="row" align={ col.align }>
                                    {item[col.value]}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}