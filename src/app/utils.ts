import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'

export async function fetchData(url: string) {
    const response = await fetch(url);
    return response.json();
}

export async function getTradingPairs() {
    const data = await fetchData("https://data-api.binance.vision/api/v3/ticker/price");

    const tradingPairs = data.map((item: { symbol: string, price: string }) => item.symbol);
    return tradingPairs;
}

export function readExcelFile(filePath: string) {
    const workbook = XLSX.readFile(filePath);
    const sheetNameList = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
    return data;
}

export function writeExcelFile(filePath: string, data: any[]) {
    try {
        // Ensure data is an array of objects
        // if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
        //     return;
        // }

        // Ensure the directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const newWorkbook = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");

        // Generate a buffer from the workbook
        const buffer = XLSX.write(newWorkbook, { type: 'buffer', bookType: 'xlsx' });

        // Log the file path and data length
        console.log("Attempting to save file to:", filePath);
        console.log("Data length:", data.length);

        // Write the buffer to the file system
        fs.writeFileSync(filePath, buffer);
        console.log("Data saved to", filePath);
    } catch (error) {
        console.error("Error writing Excel file:", error);
    }
}

export function appendExcelFile(filePath: string, data: any[]) {
    const outDir = path.join(process.cwd(), "tesssstt");
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }

    try {
        // Use path module to ensure correct path handling
        const formattedFilePath = path.normalize(filePath);

        if (fs.existsSync(formattedFilePath)) {
            console.log("APPENDING FILE")
            const oldJsonData = readExcelFile(formattedFilePath);
            const newJsonData = [...oldJsonData, ...data];
            console.log("HEREEEE")
            writeExcelFile(formattedFilePath, newJsonData);
        } else {
            console.log("WRITING FILE")
            writeExcelFile(formattedFilePath, data);
        }
    } catch (error) {
        console.error("Error appending to Excel file:", error);
    }
}

export function dateToUnixTimestamp(date: Date) {
    return Math.floor(date.getTime() / 1000);
}
