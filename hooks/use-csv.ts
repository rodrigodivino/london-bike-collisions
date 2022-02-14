import {useEffect, useState} from "react";
import {autoType, csv, DSVParsedArray} from "d3";

export const useCSV = <Row extends object>(FILE_PATH: string): DSVParsedArray<Row> | undefined => {
    const [data, setData] = useState<DSVParsedArray<Row>>()
    
    useEffect(() => {
        csv<Row>(FILE_PATH, autoType).then(d => {
            setData(d)
        })
    }, [FILE_PATH])
    
    return data;
}
