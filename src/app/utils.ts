import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { BookType } from 'xlsx';

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
    try {
        // Normalize the file path
        const formattedFilePath = path.normalize(filePath);

        // Read the file using fs
        const fileBuffer = fs.readFileSync(formattedFilePath);

        // Parse the file buffer with xlsx
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetNameList = workbook.SheetNames;
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
        
        return data;
    } catch (error) {
        console.error("Error reading Excel file:", error);
        return [];
    }
}

export function writeExcelFile(filePath: string, data: any[], fileFormat: string) {
    try {
        // Ensure the directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const newWorkbook = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");

        // Generate a buffer from the workbook
        const buffer = XLSX.write(newWorkbook, { type: 'buffer', bookType: fileFormat.toLowerCase() as BookType });

        // Write the buffer to the file system
        fs.writeFileSync(filePath, buffer);
        console.log("Data saved to", filePath);
    } catch (error) {
        console.error("Error writing Excel file:", error);
    }
}

export function appendExcelFile(filePath: string, data: any[], fileFormat: string) {
    try {
        // Use path module to ensure correct path handling
        const formattedFilePath = path.normalize(filePath);

        if (fs.existsSync(formattedFilePath)) {
            const oldJsonData = readExcelFile(formattedFilePath);
            const newJsonData = [...oldJsonData, ...data];
            writeExcelFile(formattedFilePath, newJsonData, fileFormat);
        } else {
            writeExcelFile(formattedFilePath, data, fileFormat);
        }
    } catch (error) {
        console.error("Error appending to Excel file:", error);
    }
}

export function dateToUnixTimestamp(date: Date) {
    return Math.floor(date.getTime() / 1000);
}
