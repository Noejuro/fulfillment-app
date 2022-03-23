import React, { useEffect, useState } from 'react'
import { InputAdornment, Slide, TextField } from '@mui/material'

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getWarehouses, reset } from '../../../features/warehouses/warehousesSlice'

import SearchIcon from '@mui/icons-material/Search';
import Datatable from '../../../components/shared-components/Table/DataTable';

// Interfaces
import IWarehouse from '../../../interfaces/Warehouse'
import { toast } from 'react-toastify';


export default function Warehouses(): JSX.Element {

    const dispatch = useDispatch();
    const { warehouses, isError, message }    = useSelector((state: RootState) => state.warehouses)
    
    const [filteredData, setFilteredData]   = useState<IWarehouse[]>(warehouses)
    const [search, setSearch]               = useState<string>("")

    const columns = [
        {id: "name", name: "Warehouse", value: "name", align: 'center' as const, sort: true},
        {id: "email", name: "Email", value: "email", align: 'center' as const, sort: true},
        {id: "location", name: "Location", value: "location", align: 'center' as const, sort: false},
        {id: "phone", name: "Phone", value: "phone", align: 'center' as const, sort: true},
        {id: "capacity", name: "Capacity", value: "capacity", align: 'center' as const, sort: true}
    ]

    useEffect(() => {
        
        setFilteredData(warehouses)

        if(!warehouses.length)
            dispatch(getWarehouses());

        if(isError) {
            toast.error(message as string);
            dispatch(reset());
        }            

    }, [dispatch, warehouses.length, warehouses, isError, message])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newSearch = event.target.value;
        setSearch(newSearch);

        let keys = Object.keys(warehouses[0]);

        let res = warehouses.filter( (item: IWarehouse) => 
             keys.some(( property: string ) => 
                (item as any)[property].toString().toLowerCase().indexOf(newSearch.toLowerCase()) !== -1
            )
        )

        setFilteredData([...res])
    }

    return(
        <>
            <Slide direction="down" in={true} timeout={300}>
                <div className="d-flex flex-row justify-content-center py-3">
                    <TextField id="filters" label="Search" placeholder='Search Warehouse' value={search} onChange={handleSearch}
                    size='small' variant='outlined' color='primary' className='mainSearchBar'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} />
                </div>
            </Slide>
            <Slide direction="up" in={true} timeout={300}>
                <div className="d-flex flex-row" style={{overflowY: "auto", borderRadius: "1rem 1rem 0 0"}}>
                    <Datatable data={filteredData} columns={columns} id={"_id"} />
                </div>
            </Slide>
        </>
    )
}