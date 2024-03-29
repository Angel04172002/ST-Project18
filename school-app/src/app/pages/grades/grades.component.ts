import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user/user.service';
import { firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/@backend/services/http.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../teacher.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css', '../../styles/table-style.css', '../../core/footer/footer.component.css'],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    CommonModule
  ],
  standalone: true
})
export class GradesComponent implements OnInit {

  @ViewChild('fileUpload') fileInput!: ElementRef;
  @ViewChild('dialogRef') dialog!: ElementRef;

  grades: any = [];


  gradesDictionary: any = {
    2: 'poor',
    3: 'middle',
    4: 'good',
    5: 'very-good',
    6: 'excellent'
  };


  constructor(private userService: UserService, private http: HttpService,
    private teacherService: TeacherService) {

  }

  ngOnInit(): void {
    this.getGrades();
  }



  async getGrades() {

    let user = this.userService.getUser();
    let id = '';
    let req: any = '';

    if (user) {
      id = user.id;
    }

    if (user.type == "Student") {
      req = this.http.getMarksByStudent(id);
    } else if (user.type == "Parent") {
      console.log('inside');
      req = this.http.getMarksByParent(id);
    }

    console.log(user.type);


    this.grades = [];

    await firstValueFrom(req)
      .then((data : any) => {

        console.log(id);

        for (let item of data) {


          let gradesData = {
            'term-1-marks': item.term_1_marks.split(', '),
            'term-1-final': item.term_1_final_mark,
            'term-2-marks': item.term_2_marks.split(', '),
            'term-2-final': item.term_2_final_mark,
            'year-mark': item.term_final,
            'subjectName': item.subject_name,
            'teacherName': item.teacher_first_name !== '' ? item['teacher_first_name'] + ' ' + item['teacher_last_name']
              : item['grade_teacher_first_name'] + ' ' + item['grade_teacher_last_name']
          }

          this.grades.push(gradesData);

        }

        console.log(this.grades);

        console.log(data);

      })

  }

  showDialog(e: Event) {

    console.log(e.target);

    let dialog = (e.target as HTMLElement)?.nextElementSibling;

    dialog?.setAttribute('open', 'open');
    //this.dialog.nativeElement.show();
  }


  hideDialog(e: Event) {

    let dialog = (e.target as HTMLElement)?.nextElementSibling;

    dialog?.removeAttribute('open');
  }

  userType() {
    return this.userService.getUser().type;
  }


  downloadCsvFile() {

    let user = this.userService.getUser();
    let id = '';

    if (user) {
      id = user.id;
    }

    this.teacherService.getStudentMarks(id);
  }


  sendJson() {
    this.teacherService.sendJsonData(this.fileInput.nativeElement.files, 'sendJsonGrades');
  }
}
