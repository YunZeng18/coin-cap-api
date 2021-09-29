import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default function CryptoList() {
    const [data, setData] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`https://api.coincap.io/v2/assets`);
            setData(response.data.data)
        }
        fetchData();
    }, []);

    const history = useHistory();
    const routeChange = (id) => {
        history.push(`/${id}`);
    }

    return (
        <div style={{ height: '85vh', width: '98%', margin: 15 }} className={classes.root}>
            <Typography variant="h4" gutterBottom >
                Crypto Currencies
            </Typography>
            <DataGrid
                columns={[{ field: 'id', hide: true },
                { field: 'rank', headerName: 'Rank', width: 105 },
                { field: 'name', headerName: 'Name', width: 130 },
                { field: 'symbol', headerName: 'Symbol', width: 130 },
                { field: 'priceUsd', headerName: 'USD per coin', width: 180 },
                {
                    field: 'changePercent24Hr', headerName: '24h %', width: 100,
                    cellClassName: (params) =>
                        clsx('priceChange', {
                            negative: params.value < 0,
                            positive: params.value >= 0,
                        }),
                },
                { field: 'volumeUsd24Hr', headerName: 'Volume(24h)', width: 180 },
                { field: 'marketCapUsd', headerName: 'Market Cap USD', width: 180 },
                { field: 'vwap24Hr', headerName: 'Average price weighted by volume', width: 150 },
                { field: 'supply', headerName: 'Circulating Supply', width: 150 },
                { field: 'maxSupply', width: 150 }
                ]}
                rows={data}
                onRowClick={(params, _event) => {
                    routeChange(params.row.id)
                }}
            />
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        '& .MuiDataGrid-columnsContainer': {
            background: '#d9d9d9',
            fontWeight: '600',
        },
        '& .priceChange.negative': {
            color: '#d47483',
            fontWeight: '600',
        },
        '& .priceChange.positive': {
            color: '#00db00',
            fontWeight: '600',
        },
    },
});
