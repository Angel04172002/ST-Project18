import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/@backend/services/http.service';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.css'],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule
  ],
  standalone: true
})
export class AdminSubjectComponent {

  @ViewChild('subjectSelect') subject: any;
  @ViewChild('classSelect') grade: any;
  @ViewChild('fileUpload') fileInput!: ElementRef;

  constructor(private httpService: HttpService, private adminService : AdminService) {

  }


  downloadCsvFile() {
    this.adminService.generateGradesAndSubjects();
  }


  sendJson() {
    this.adminService.sendJsonData(this.fileInput.nativeElement.files, 'sendJsonGrades');
  }


  async addSubject(e : Event) {

    e.preventDefault();

    const subject: string = this.subject.nativeElement.value;
    const grade: number = this.grade.nativeElement.value;

    const data = {
      grade_id: grade,
      subject_name: subject
    };

    await firstValueFrom(this.httpService.addSubjectsToGrade([data]))
      .then(() => {
        alert('Успешно запазени промени')
      })
      .catch(err => alert(err.message));

  }

}
