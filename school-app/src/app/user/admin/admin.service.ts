import { Injectable } from '@angular/core';
import { Student } from 'src/app/types/Student';

import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import { UserModule } from '../user.module';
import * as FileSaver from 'file-saver';


@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor() { }

  adminData = [];

  headers = ['Student id', 'First name', 'Last name', 'Email', 'Grade', 'Grade division'];

  //TODO: Make request to server to {{baseUrl}}/students to get all students


  convertCSVtoXLSX(csvData: string) {

    debugger;

    const parsedData = Papa.parse(csvData, { header: true });

    const worksheet = XLSX.utils.json_to_sheet(parsedData.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    FileSaver.saveAs(blob, 'output.xlsx');


  }


  downloadCSV(data: Student[]): void {

    const csvData = Papa.unparse(data);


    const blob = new Blob([csvData], { type: 'text/csv' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'output.csv';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);


    this.convertCSVtoXLSX(csvData);

  }

}

