import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import * as FileSaver from 'file-saver';
import * as csvtojson from 'csvtojson';
import { Student } from '../pages/absence/absence.component';
import { Profile } from '../types/Profile';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  convertCSVtoXLSX(csvData: string, headers: string[]) {

    const parsedData = Papa.parse(csvData, { header: true });
    parsedData.meta.fields = headers;

    const worksheet = XLSX.utils.json_to_sheet(parsedData.data);

    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });

    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    FileSaver.saveAs(blob, 'output.xlsx');

  }

  downloadXLSX(data: Profile[], headers: string[]): void {

    const csvData = Papa.unparse(data, { header: true });

    // const blob = new Blob([csvData], { type: 'text/csv' });

    // const a = document.createElement('a');
    // a.href = URL.createObjectURL(blob);
    // a.download = 'output.csv';
    // document.body.appendChild(a);
    // a.click();

    // document.body.removeChild(a);


    this.convertCSVtoXLSX(csvData, headers);

  }

  convertCsvToJson(csvData: string): Promise<any[]> {

    return new Promise((resolve, reject) => {
      csvtojson()
        .fromString(csvData)
        .then((jsonArray) => {
          resolve(jsonArray);
        })
      // .catch((error) => {
      //   reject(error);
      // })
    });
  }

  readXLSXFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Assuming you want to convert the first sheet to JSON
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        resolve(jsonData);
      };

      reader.onerror = (e) => {
        reject(new Error('Error reading the file.'));
      };

      reader.readAsBinaryString(file);
    });
  }

}