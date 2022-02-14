import {useEffect, useState} from "react";
import * as XLSX from 'xlsx';

/**
 * Reads a XLSX file and returns a state for the JSON of the contents
 *
 * The first generic corresponds to the type of the spreadsheet rows
 *
 * @param FILE_PATH - The path of the XLSX file
 * @param SHEET_INDEX - The sheet index of the XLSX file to obtain the data-source
 * @returns The list of rows in the sheet
 */
export const useXLSX = <Row>(FILE_PATH: string, SHEET_INDEX: number): Row[] => {
    const [data, setData] = useState<Row[]>([])
    
    useEffect(() => {
        fetch(FILE_PATH).then(res => {
            if (!res.ok) {
                throw new Error("fetch failed");
            }
            return res.arrayBuffer();
        }).then(ab => {
            const data = new Uint8Array(ab);
            const workbook = XLSX.read(data, {type: "array"});
            return XLSX.utils.sheet_to_json<Row>(workbook.Sheets[workbook.SheetNames[SHEET_INDEX]]);
        }).then(data => setData(data));
    }, [FILE_PATH, SHEET_INDEX])
    
    return data;
}
