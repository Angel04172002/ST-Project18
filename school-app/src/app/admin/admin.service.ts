import { Injectable, OnInit } from '@angular/core';
import { Student } from 'src/app/types/Student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExcelService } from '../user/excel.service';
import { Profile } from 'src/app/types/Profile';
import { ProfileTypes } from 'src/app/@backend/enums/profile-types.enum';
import { log } from 'console';
import { HttpService } from 'src/app/@backend/services/http.service';
import { firstValueFrom } from 'rxjs';
import { Teacher } from '../types/Teacher';


const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class AdminService implements OnInit {

  urlHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });

  studentHeaders = ['Student id', 'First name', 'Last name', 'Email', 'Grade', 'Grade division'];
  teacherHeaders = ['Teacher id', 'First name', 'Last name', 'Email', 'Grade', 'Grade division'];

  adminStudentData: Student[] = [];
  adminTeacherData: Teacher[] = [];
 
  constructor(private httpService: HttpService, private excelService: ExcelService) { }


  ngOnInit(): void {


  }

  async generateStudentsAndGrades() {


    const req = this.httpService.getStudentsWithGradeAndDivison();


    await firstValueFrom(req)
      .then((data) => {
        this.adminStudentData = data;
      })
      .catch(err => {
        throw err;
      });



    this.excelService.downloadXLSX(this.adminStudentData, this.studentHeaders);
  }


  async generateTeachersAndGrades() {

    const req = this.httpService.getTeachersWithGradesDivisionsSubjects();

    await firstValueFrom(req)
      .then((data) => {
        console.log(data);
        this.adminTeacherData = data;
      })
      .catch(err => {
        throw err;
      });

    this.excelService.downloadXLSX(this.adminTeacherData, this.teacherHeaders);
  }



  sendJsonData(files: FileList | null) {

    if (files && files.length > 0) {
      const file = files[0];

      this.excelService.readXLSXFile(file)
        .then(async (jsonData) => {


          console.log(jsonData);

          const req = this.httpService.addStudentsToGrade(jsonData)

          await firstValueFrom(req)
            .then(() => {
              alert('Успешно запазени промени');
            })
            .catch(err => alert(err.message));

        })
        .catch((error) => {
          console.error(error.err);
        });
    } else {
      console.error('No file selected.');
    }
  }

}
