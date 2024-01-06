import { Injectable } from '@angular/core';
import { ExcelService } from '../user/excel.service';
import { HttpService } from '../@backend/services/http.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  studentMarksHeaders = [
    'Student id', 'First name', 'Last name', 'Email', 'Grade',
    'Grade division', 'Subject', 'Term 1 marks',
    'Term 1 final', 'Term 2 marks',
    'Term 2 final', 'Term final'
  ];


  // teacherHeaders = ['Teacher id', 'First name', 'Last name', 'Email', 'Type', 'Grade', 'Grade division'];
  // subjectHeaders = ['Grade id', 'Subject id'];

  // adminStudentData: Student[] = [];
  // adminTeacherData: Teacher[] = [];
  // adminSubjectData: Subject[] = [];


  constructor(private httpService: HttpService, private excelService: ExcelService) { }



  async addPost(data: any) {

    let req = this.httpService.addPost(data);

    await firstValueFrom(req)
      .then(() => {
        alert('Успешно запазени промени');
      })
      .catch(err => alert(err.message));
  }

  async getStudentMarks(teacherId: string) {

    const req = this.httpService.getMarksByTeacher(teacherId);

    await firstValueFrom(req)
      .then(data => {

        this.excelService.downloadXLSX(data, this.studentMarksHeaders);
      })

  }

  async getAllPosts() {
    const req = this.httpService.getAllPosts();

    return await firstValueFrom(req)
      .then(data => {
        return data;
      })
  }


  sendJsonData(files: FileList | null, action: string) {

    if (files && files.length > 0) {
      const file = files[0];

      this.excelService.readXLSXFile(file)
        .then(async (jsonData: any) => {

          let req: any = '';

          console.log(jsonData);

          for (let i = 0; i < jsonData.length; i++) {
            jsonData[i]['term1Marks'] = jsonData[i]['term1Marks'].toString().trim().split(',');
            jsonData[i]['term2Marks'] = jsonData[i]['term2Marks'].toString().trim().split(',');
          }

          console.log(jsonData);



          req = this.httpService.addMarksByTeacher(jsonData);

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


