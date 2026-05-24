import fs from 'fs';
import {parse} from 'csv-parse/sync';

export class DataProvider {
    static getTestDataFromJSON(filePath: string) {
        let data:string = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data;
    }

    static getTestDataFromCSV(filePath: string) {
        let data = (fs.readFileSync(filePath),{columns: true,skip_empty_lines: true});
        return data;
    }
}