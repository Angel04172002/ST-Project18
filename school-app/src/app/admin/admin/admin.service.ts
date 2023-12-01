import { Injectable, OnInit } from '@angular/core';
import { Student } from 'src/app/types/Student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExcelService } from '../../user/excel.service';
import { Profile } from 'src/app/types/Profile';
import { ProfileTypes } from 'src/app/@backend/enums/profile-types.enum';
import { log } from 'console';
import { HttpService } from 'src/app/@backend/services/http.service';
import { firstValueFrom } from 'rxjs';


const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class AdminService implements OnInit {

  urlHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });
  headers = ['Student id', 'First name', 'Last name', 'Email', 'Grade', 'Grade division'];

  //TODO: Request to server
  adminData: Student[] = [];
  // {
  //   id: "aaaa-bbbb-cccc",
  //   parentId: 'ccc',
  //   firstName: "Pesho",
  //   lastName: "Georgiev",
  //   email: "pesho.georgiev@abv.bg",
  //   grade: 5,
  //   gradeDivision: "B",
  //   type: ProfileTypes.Student
  // },
  // {
  //   id: "bban-cccc-vvvv",
  //   parentId: 'ccc',
  //   firstName: "Misho",
  //   lastName: "Ivanov",
  //   email: "misho.ivanov@gmail.com",
  //   grade: 12,
  //   gradeDivision: "C",
  //   type: ProfileTypes.Student
  // }

  constructor(private httpService: HttpService, private excelService: ExcelService) { }


  ngOnInit(): void {


  }



  async generateStudentsAndGrades() {


    const req = this.httpService.getStudentsWithGradeAndDivison();


    await firstValueFrom(req)
      .then((data) => {
        this.adminData = data;
      })
      .catch(err => {
        throw err;
      });



    this.excelService.downloadXLSX(this.adminData, this.headers);
  }

  sendJsonData(files: FileList | null) {

    if (files && files.length > 0) {
      const file = files[0];

      this.excelService.readXLSXFile(file)
        .then((jsonData) => {
          console.log('JSON Data:', jsonData);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      console.error('No file selected.');
    }
  }

}

