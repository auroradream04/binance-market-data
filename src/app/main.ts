'use server'

import { appendExcelFile, fetchData } from "./utils";
import fs from "fs";
import path from "path";

export async function generateMarketData(selectedPairs: string[], interval: string, startTimestamp: number | undefined, endTimestamp: number | undefined) {
    console.log("Generating market data for", selectedPairs, interval, startTimestamp, endTimestamp)

    // Create an out directory if it doesn't exist
    const outDir = path.join(process.cwd(), "out");
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }

    // Fetch market data for each pair
    for (const pair of selectedPairs) {
        let dataArray: any[] = [];
        const filePath = path.join(outDir, `${pair}.xlsx`);

        let startTime = startTimestamp || undefined;

        try {
            while (true) {
                const fetchUrl = `https://data-api.binance.vision/api/v3/klines?symbol=${pair}&interval=${interval}${startTime ? '&startTime=' + startTime : ''}${endTimestamp ? '&endTime=' + endTimestamp : ''}`;
                console.log(fetchUrl);
                const data = await fetchData(fetchUrl);

                if (!data || data.length <= 1) {
                    console.log('Finished fetching data for: ', pair);
                    break;
                }

                // Transform the data into an array of objects
                const formattedData = data.map((item: any[]) => ({
                    "Trading Pair": pair,
                    "Open Time": new Date(item[0]).toISOString(), // Convert timestamp to ISO string
                    "Open Price": parseFloat(item[1]),
                    "High Price": parseFloat(item[2]),
                    "Low Price": parseFloat(item[3]),
                    "Close Price": parseFloat(item[4]),
                    "Volume": parseFloat(item[7]),
                }));

                dataArray = [...dataArray, ...formattedData];

                startTime = data[data.length - 1][0];
                console.log("Updated startTime to", startTime);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        console.log('Data fetched:', dataArray.length);
        appendExcelFile(filePath, dataArray);
    }

    return "Market data generated"
}