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
import { Subject } from '../types/Subject';
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
  teacherHeaders = ['Teacher id', 'First name', 'Last name', 'Email', 'Type', 'Grade', 'Grade division'];
  subjectHeaders = ['Grade id', 'Subject id'];

  adminStudentData: Student[] = [];
  adminTeacherData: Teacher[] = [];
  adminSubjectData: Subject[] = [];

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
        this.adminTeacherData = data;
      })
      .catch(err => {
        throw err;
      });

    this.excelService.downloadXLSX(this.adminTeacherData, this.teacherHeaders);
  }


  async generateGradesAndSubjects() {

    const req = this.httpService.getAllSubjects();

    await firstValueFrom(req)
      .then((data) => {
        this.adminSubjectData = data;
      })
      .catch(err => {
        throw err;
      });

    this.excelService.downloadXLSX(this.adminSubjectData, this.subjectHeaders);

  }



  sendJsonData(files: FileList | null, action: string) {

    if (files && files.length > 0) {
      const file = files[0];

      this.excelService.readXLSXFile(file)
        .then(async (jsonData) => {


          let req: any = '';

          if (action == 'sendJsonStudents') {
            req = this.httpService.addStudentsToGrade(jsonData);
          } else if (action == 'sendJsonTeachers') {
            req = this.httpService.addSubjectsAndGradesToTeacher(jsonData);
          } else if(action == 'sendJsonGrades') {
            req = this.httpService.addSubjectsToGrade(jsonData);
          }

          await firstValueFrom(req)
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

