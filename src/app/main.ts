'use server'

import { appendExcelFile, fetchData, readExcelFile } from "./utils";
import fs from "fs";
import path from "path";

export async function generateMarketData(selectedPairs: string[], interval: string, startTimestamp: number | undefined, endTimestamp: number | undefined, fileFormat: string) {
    console.log("Generating market data for", selectedPairs, interval, startTimestamp, endTimestamp, fileFormat)

    // Create an out directory if it doesn't exist
    const outDir = path.join(process.cwd(), "out");
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }

    // Fetch market data for each pair
    for (const pair of selectedPairs) {
        let dataArray: any[] = [];
        const filePath = path.join(outDir, `${pair}.${fileFormat.toLowerCase()}`);

        let startTime: number | undefined

        // Check if the file exists
        const fileExists = fs.existsSync(filePath);
        if (fileExists) {
            const file: any[] = readExcelFile(filePath);
            const lastTimestamp = new Date(file[file.length - 1]["Open Time"]).getTime();
            startTime = fileExists ? lastTimestamp : (startTimestamp ? startTimestamp : undefined);
        }

        try {
            while (true) {
                const fetchUrl = `https://data-api.binance.vision/api/v3/klines?symbol=${pair}&interval=${interval}&limit=1000${startTime ? '&startTime=' + startTime : ''}${endTimestamp ? '&endTime=' + endTimestamp : (startTime ? '&endTime=' + Date.now() : '')}`;
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

                if (startTime) {
                    startTime = data[data.length - 1][0];
                    console.log("Updated startTime to", startTime);
                } else {
                    break;
                }

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        console.log('Data fetched:', dataArray.length);
        appendExcelFile(filePath, dataArray, fileFormat);
    }

    return "Market data generated"
}
