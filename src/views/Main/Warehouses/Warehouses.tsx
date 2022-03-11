import React, { useState } from 'react'
import { InputAdornment, Slide, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Datatable from '../../../components/shared-components/Table/DataTable';

interface IData {
    id: number,
    name: string,
    email: string,
    location: string,
    phone: string,
    capacity: number
}

export default function Warehouses(): JSX.Element {

    const dummyData = [
        {id: 1, name: "Aguascalientes Warehouse", email: "agsw@mail.com", location: "Aguascalientes, Ags", phone: "4491111222", capacity: 5000 },
        {id: 2, name: "Obispado", email: "contact@obispado.com", location: "Monterrey, Nuevo León", phone: "8123334765", capacity: 15000 },
        {id: 3, name: "Kanbun", email: "telecon@mail.com", location: "Zapopan, Jalisco", phone: "3331111222", capacity: 10000 },
        {id: 4, name: "AWS Warehouse", email: "contact@amzn.com", location: "San Pedro Garza García, Nuevo León", phone: "8112222333", capacity: 50000 },
        {id: 5, name: "Semillero", email: "atm@mail.com", location: "San Nicolas, Nuevo León", phone: "8311111222", capacity: 5000 }
    ]
    
    const [filteredData, setFilteredData]   = useState<IData[]>(dummyData)
    const [search, setSearch]               = useState<string>("")


    const columns = [
        {id: "name", name: "Warehouse", value: "name", align: 'center' as const, sort: true},
        {id: "email", name: "Email", value: "email", align: 'center' as const, sort: true},
        {id: "location", name: "Location", value: "location", align: 'center' as const, sort: false},
        {id: "phone", name: "Phone", value: "phone", align: 'center' as const, sort: true},
        {id: "capacity", name: "Capacity", value: "capacity", align: 'center' as const, sort: true}
    ]

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newSearch = event.target.value;
        setSearch(newSearch);

        let keys = Object.keys(dummyData[0]);

        let res = dummyData.filter( (item: IData) => 
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
                    <Datatable data={filteredData} columns={columns} id={"name"} />
                </div>
            </Slide>
        </>
    )
}