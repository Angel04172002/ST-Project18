import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import * as FileSaver from 'file-saver';
import * as csvtojson from 'csvtojson';
import { Student } from '../types/Student'
import { Profile } from '../types/Profile';
import { ProfileTypes } from '../@backend/enums/profile-types.enum';
import { KeyValuePipe } from '@angular/common';


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

  downloadXLSX(data: any, headers: string[]): void {

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

        const sheetName = workbook.SheetNames[0];
        let jsonData: string[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);


        jsonData = this.convertArrayToCamelCase(jsonData);

        resolve(jsonData);
      };

      reader.onerror = (e) => {
        reject(new Error('Error reading the file.'));
      };

      reader.readAsBinaryString(file);
    });




  }

  
  convertArrayToCamelCase(originalArray: any[]): any[] {
    return originalArray.map(item => this.convertObjectKeysToCamelCase(item));
  }


  convertObjectKeysToCamelCase(obj: any): any {

    if (typeof obj !== 'object' || obj === null) {
      return obj; // Return unchanged if not an object
    }

    const camelCaseObj: any = {};

    for (let key in obj) {

      let newKey = key.toLowerCase().split(' ').map((x, i) => {
        if (i == 0) { return x.slice(0) }

        return x[0].toUpperCase() + x.slice(1);

      }).join('')

      camelCaseObj[newKey] = obj[key];

    }

    return camelCaseObj;
  }


}