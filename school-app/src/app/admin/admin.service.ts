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
import { AddStudentToGrade } from '../@backend/models/add-student-to-grade.model';


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

  // adminActions: any = {
  //   sendJsonStudents: this.httpService.addStudentsToGrade,
  //   sendJsonTeachers: this.httpService.addSubjectsAndGradesToTeacher
  // }

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



  sendJsonData(files: FileList | null, action: string) {

    if (files && files.length > 0) {
      const file = files[0];
     
      this.excelService.readXLSXFile(file)
        .then(async (jsonData) => {


          let req: any = '';

          if (action == 'sendJsonStudents') {
            req = this.httpService.addStudentsToGrade;
          } else if (action == 'sendJsonTeachers') {
            req = this.httpService.addSubjectsAndGradesToTeacher;
          }

          await firstValueFrom(this.httpService.addStudentsToGrade(jsonData))
            .then(() => {
              alert('Успешно запазени промени');
            })
            .catch(err => alert(err.message));

        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      console.error('No file selected.');
    }
  }

}

