import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';

IgrFinancialChartModule.register();


export default function Crypto(props) {
    const [data, setData] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId=ethereum&quoteId=${props.match.params.coinId}`);
            setData(response.data.data.map(item => ({
                open: parseFloat(item.open),
                close: parseFloat(item.close),
                high: parseFloat(item.high),
                low: parseFloat(item.low),
                volume: parseFloat(item.volume),
                time: new Date(item.period)
            }
            )));

        }
        fetchData();

    }, []);

    return (
        <IgrFinancialChart
            isToolbarVisible={false}
            chartTitle={`${props.match.params.coinId} Daily Prices for the last 2 Years`}
            width="100%"
            height="600px"
            chartType="Candle"
            zoomSliderType="Candle"
            volumeType="Area"
            dataSource={data} />

    );
}

