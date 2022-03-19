import React, { useState } from 'react'
import { Button, Grid, InputAdornment, Slide, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Datatable from '../../../components/shared-components/Table/DataTable';
import DialogAddProduct from './DialogAddProduct';

interface IData {
    id: number,
    name: string,
    price: number,
    sku: string,
    quantity: number,
    img: string | undefined
}

export default function Products(): JSX.Element {

    const dummyData = [
        {id: 1, name: "Tenis Nike", price: 2500, sku: "TENISNIKE100", quantity: 10, img: "https://www.shoesvalley.cn/image/cache/nike/2019/270Ract/2712/27fa7998-800x800.jpg" },
        {id: 2, name: "Shorts Puma", price: 1000, sku: "PUMASHORTS", quantity: 100, img: "https://ss205.liverpool.com.mx/xl/1092723702.jpg"  },
        {id: 3, name: "Box Gloves", price: 1500, sku: "BOX1313", quantity: 5, img: "https://cdn.shopify.com/s/files/1/0264/2218/1937/products/BG_ELITE_3.0_WHITE_BLACK_1500_01_1_800x.jpg?v=1643999216"  },
        {id: 4, name: "PSG Jersey", price: 2000, sku: "PSG2022", quantity: 500, img: "https://www.innovasport.com/medias/IS-CV7902-101-1.png?context=bWFzdGVyfGltYWdlc3w1NTYxOHxpbWFnZS9wbmd8aW1hZ2VzL2hjYS9oODEvMTAzMjA4ODA0Njc5OTgucG5nfDJhNjgzMjc3ZWQxZWMwNDlkZTY2NTg1N2I5OWY0YTUwYTQ5NDY3N2M4M2Y2OWU1YjMzODk0MDhjMTMzMzRmZjc"  },
        {id: 5, name: "Headband Nike", price: 500, sku: "NIKEHEADBAND", quantity: 8, img: "https://www.traininn.com/f/3/39728/nike-headband-swoosh.jpg"  }
    ]

    const columns = [
        {id: "img", name: "Image", value: "img", align: 'center' as const, sort: true},
        {id: "name", name: "Name", value: "name", align: 'center' as const, sort: true},
        {id: "sku", name: "SKU", value: "sku", align: 'center' as const, sort: false},
        {id: "price", name: "Price", value: "price", align: 'center' as const, sort: true},
        {id: "quantity", name: "Quantity", value: "quantity", align: 'center' as const, sort: true}
    ]
    
    const [filteredData, setFilteredData]   = useState<IData[]>(dummyData)
    const [search, setSearch]               = useState<string>("")
    const [open, setOpen]                   = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

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
                    <Grid container justifyContent="flex-end" >
                        <Grid item xs={12} sm={4}>
                            <div className="d-flex flex-row justify-content-center">
                                <TextField id="filters" label="Search" placeholder='Search Product' value={search} onChange={handleSearch}
                                size='small' variant='outlined' color='primary' className='mainSearchBar'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className="d-flex flex-row justify-content-end">
                                <Button onClick={handleClickOpen} color='secondary' variant='contained' className="h-100" > Add product </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Slide>
            <Slide direction="up" in={true} timeout={300}>
                <div className="d-flex flex-row" style={{overflowY: "auto", borderRadius: "1rem 1rem 0 0"}}>
                    <Datatable data={filteredData} columns={columns} id={"sku"} />
                </div>
            </Slide>
            <DialogAddProduct open={open} handleClose={handleClose} />
        </>
    )
}