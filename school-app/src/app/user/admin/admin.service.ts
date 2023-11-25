import { Injectable } from '@angular/core';
import { Student } from 'src/app/types/Student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExcelService } from '../excel.service';
import { Profile } from 'src/app/types/Profile';
import { ProfileTypes } from 'src/app/@backend/enums/profile-types.enum';
import { log } from 'console';


const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  urlHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });

  constructor(private http: HttpClient, private excelService: ExcelService) { }

  //TODO: Request to server
  adminData: Profile[] = [
    {
      id: "aaaa-bbbb-cccc",
      firstName: "Pesho",
      lastName: "Georgiev",
      email: "pesho.georgiev@abv.bg",
      grade: 5,
      gradeDivision: "B",
      type: ProfileTypes.Student
    },
    {
      id: "bban-cccc-vvvv",
      firstName: "Misho",
      lastName: "Ivanov",
      email: "misho.ivanov@gmail.com",
      grade: 12,
      gradeDivision: "C",
      type: ProfileTypes.Student
    }
  ];

  headers = ['Student id', 'First name', 'Last name', 'Email', 'Grade', 'Grade division'];


  generateStudentsAndGrades() {
    //TODO: Request to server for admin data
    this.excelService.downloadXLSX(this.adminData, this.headers);
  }

  sendJsonData(files : FileList | null) {
   
    if (files && files.length > 0) {
      const file = files[0];

      this.excelService.readXLSXFile(file)
        .then((jsonData) => {
          console.log('JSON Data:', jsonData);
          //TODO: Request to server
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      console.error('No file selected.');
    }
  }


  submitJsonData() {
    this.http.post(`${BASE_URL}/admin/submit`, JSON.stringify(this.adminData), { headers: this.urlHeaders });
  }

}

