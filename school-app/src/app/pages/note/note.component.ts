import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/user/user.service';
import { Note } from '../../types/Note';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/@backend/services/http.service';
import { AddRemarkModel } from 'src/app/@backend/models/add-remarks.model'
import { Term } from 'src/app/types/Term';
import { GradeDivision } from 'src/app/types/GradeDivision';
import { Grade } from 'src/app/types/Grade';
import { Subject } from 'src/app/types/Subject';

const COLUMNS_SCHEMA = [
  {
    key: "grade",
    type: "selectGrade",
    label: "Клас"
  },
  {
    key: "gradeDivision",
    type: "selectGradeDivision",
    label: "Паралелка"
  },
  {
    key: "firstName",
    type: "selectFirstName",
    label: "Име"
  },
  {
    key: "lastName",
    type: "selectLastName",
    label: "Фамилия"
  },
  {
    key: "subject",
    type: "selectSubject",
    label: "Предмет"
  },
  {
    key: "note",
    type: "textarea",
    label: "Забележка"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
]

const COLUMNS_SCHEMA2 = [
  {
    key: "teacherName",
    type: "text",
    label: "Учител"
  },
  {
    key: "subject",
    type: "text",
    label: "Предмет"
  },
  {
    key: "note",
    type: "textarea",
    label: "Забележка"
  }
]

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule
  ],
  standalone: true
})
export class NoteComponent implements OnInit{
  constructor(
    private userService: UserService,
    private http: HttpService,
    ) { }

  userType(){
    return this.userService.user?.type;
  }

  ngOnInit(): void {
    this.getNotes().then(() => {
      this.getGradeDivisions();

    });

  }

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<any>();
  columnsSchema: any = COLUMNS_SCHEMA;

  displayedColumns2: string[] = COLUMNS_SCHEMA2.map((col) => col.key);
  columnsSchema2: any = COLUMNS_SCHEMA2;

  notesData = new MatTableDataSource<any>();
  notesDataForStudents = new MatTableDataSource<any>();

  yearTerms: Term['termId'][] = ["Първи срок", "Втори срок"];
  gradeDivisions: GradeDivision['id'][] = [];
  grades: Grade['id'][] = [];
  subjects: Subject['subjectName'][] = [];
  
  subjectSelect: any;
  gradeSelect: any;
  gradeDivisionSelect: any;
  yearTermsSelect: any;

  async getNotes() {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type;
    }

    this.students = [];
    if (type === 'Teacher') {

      await firstValueFrom(this.http.getRemarksByTeacher(id))
        .then(data => {
          for (let item of data) {

            let notesDataArray = {
              id: item.id,
              studentId: item.student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name,
              subject: item.note_subject_id,
              grade: item.grade_id,
              gradeDivision: item.grade_division_id,
              term: item.note_term_id,
              note: item.note
            }

            this.notesData.data.push(notesDataArray);

            if (this.gradeDivisions.indexOf(item.grade_division_id) === -1) {
              this.gradeDivisions.push(item.grade_division_id);
            }

            if (this.grades.indexOf(item.grade_id) === -1) {
              this.grades.push(item.grade_id);
            }

            if (this.subjects.indexOf(item.note_subject_id) === -1) {
              this.subjects.push(item.note_subject_id);
            }

            let studentDataArray = {
              id: item.student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name
            }

            this.students.push(studentDataArray);

          }

        })
    } else if (type === 'Grade teacher') {

      await firstValueFrom(this.http.getRemarksByClassTeacher(id))
        .then(data => {
          for (let item of data) {

            let notesDataArray = {
              id: item.id,
              studentId: item.student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name,
              subject: item.note_subject_id,
              grade: item.grade_id,
              gradeDivision: item.grade_division_id,
              term: item.note_term_id,
              note: item.note
            }

            this.notesData.data.push(notesDataArray);

            if (this.gradeDivisions.indexOf(item.grade_division_id) === -1) {
              this.gradeDivisions.push(item.grade_division_id);
            }

            if (this.grades.indexOf(item.grade_id) === -1) {
              this.grades.push(item.grade_id);
            }

            if (this.subjects.indexOf(item.note_subject_id) === -1) {
              this.subjects.push(item.note_subject_id);
            }

            let studentDataArray = {
              id: item.student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name
            }

            this.students.push(studentDataArray);

          }

        })
    } else if (type === 'Student') {

      await firstValueFrom(this.http.getRemarksByStudent(id))
        .then(data => {
          for (let item of data) {

            let notesDataArray = {
              id: item.note_id,
              teacherName: item.teacher_first_name + ' ' + item.teacher_last_name,
              subject: item.note_subject_id,
              grade: item.grade_id,
              gradeDivision: item.grade_division_id,
              term: item.note_term_id,
              note: item.note
            }

            this.notesDataForStudents.data.push(notesDataArray);

            if (this.gradeDivisions.indexOf(item.grade_division_id) === -1) {
              this.gradeDivisions.push(item.grade_division_id);
            }

            if (this.grades.indexOf(item.grade_id) === -1) {
              this.grades.push(item.grade_id);
            }

            if (this.subjects.indexOf(item.note_subject_id) === -1) {
              this.subjects.push(item.note_subject_id);
            }

          }

        })
     } else if (type === 'Parent') {

      await firstValueFrom(this.http.getRemarksByParent(id))
      .then(data => {
        for (let item of data) {

          let notesDataArray = {
            id: item.note_id,
            teacherName: item.teacher_first_name + ' ' + item.teacher_last_name,
            subject: item.note_subject_id,
            grade: item.grade_id,
            gradeDivision: item.grade_division_id,
            term: item.note_term_id,
            note: item.note
          }

          this.notesDataForStudents.data.push(notesDataArray);

          if (this.gradeDivisions.indexOf(item.grade_division_id) === -1) {
            this.gradeDivisions.push(item.grade_division_id);
          }

          if (this.grades.indexOf(item.grade_id) === -1) {
            this.grades.push(item.grade_id);
          }

          if (this.subjects.indexOf(item.note_subject_id) === -1) {
            this.subjects.push(item.note_subject_id);
          }

        }

      })
    }

    this.notesData.data.length != 0 ? this.dataSource.data = this.notesData.data : this.dataSource.data = this.notesDataForStudents.data
  }

  async addNotes(row: any) {
    let user = this.userService.getUser();
    let id = '';
    let type = '';
    let req: any;

    if (user) {
      id = user.id;
      type = user.type
    }
    debugger;

    if(type === 'Teacher'){
      let note: AddRemarkModel = {
        note: row.note,
        teacher_creator_id: id,
        note_student_id: row.studentId,
        note_subject_id: row.subject,
        note_term_id: this.yearTermsSelect
      }
  
      req = this.http.addRemark(note)

    } else if (type === 'Grade teacher'){
      let note: AddRemarkModel = {
        note: row.note,
        grade_teacher_creator_id: id,
        note_student_id: row.studentId,
        note_subject_id: row.subject,
        note_term_id: this.yearTermsSelect
      }
  
      req = this.http.addRemark(note)
    }
    

    try {
      await firstValueFrom(req)
        .then(data => {

          console.log(data);

        })
    } catch (err) {
      console.log(err)
    }

  }

  async updateNotes(row: any) {
    let user = this.userService.getUser();
    let id = '';
    let type = '';
    let req: any;

    if (user) {
      id = user.id;
      type = user.type
    }

    if(type === 'Teacher'){
      let note: AddRemarkModel = {
        note: row.note,
        teacher_creator_id: id,
        note_student_id: row.studentId,
        note_subject_id: row.subject,
        note_term_id: this.yearTermsSelect
      }
  
      req = this.http.updateRemark(row.id, note)

    } else if (type === 'Grade teacher'){
      let note: AddRemarkModel = {
        note: row.note,
        grade_teacher_creator_id: id,
        note_student_id: row.studentId,
        note_subject_id: row.subject,
        note_term_id: this.yearTermsSelect
      }
  
      req = this.http.updateRemark(row.id, note)
    }
    

    try {
      await firstValueFrom(req)
        .then(data => {

          console.log(data);

        })
    } catch (err) {
      console.log(err)
    }


  }

  students: any;
  async getStudents(grade: Grade['id'], division: GradeDivision['id']) {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type;
    }

    this.students = [];
    
    if (type === 'Teacher') {

      try {
        await firstValueFrom(this.http.getStudentsByGradeAndDivision(grade, division))
          .then(data => {
            for (let [key, value] of Object.entries(data)) {
              let studentDataArray = {
                id: value.id,
                firstName: value.first_name,
                lastName: value.last_name
              }
              this.students.push(studentDataArray);
            }
          })
      } catch (err) {
        console.log(err)
      }
    }


  }

  async getGradeDivisions() {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type;
    }

    if (type === 'Teacher') {

      try {
        await firstValueFrom(this.http.getGradesDivisionsAndSubjectsForTeacher(id))
          .then(data => {
            data = data[0]

            if (this.gradeDivisions.indexOf(data.teacher_grade_division_id) === -1) {
              this.gradeDivisions.push(data.teacher_grade_division_id);
            }

            if (this.grades.indexOf(data.teacher_grade_id) === -1) {
              this.grades.push(data.teacher_grade_id);
            }

            if (this.subjects.indexOf(data.teacher_subject_id) === -1) {
              this.subjects.push(data.teacher_subject_id)
            }
          })
      } catch (err) {
        console.log(err);
      }
    } else if (type === 'Grade teacher') {

      try {
        await firstValueFrom(this.http.getGradesDivisionsAndSubjectsForGradeTeacher(id))
          .then(data => {
            data = data[0]

            if (this.gradeDivisions.indexOf(data.teacher_grade_division_id) === -1) {
              this.gradeDivisions.push(data.teacher_grade_division_id);
            }

            if (this.grades.indexOf(data.teacher_grade_id) === -1) {
              this.grades.push(data.teacher_grade_id);
            }

            if (this.subjects.indexOf(data.teacher_subject_id) === -1) {
              this.subjects.push(data.teacher_subject_id)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  applyFilter() {
    let user = this.userService.getUser();
    let type = '';

    if (user) {
      type = user.type;
    }

    if (type === 'Teacher' || type === 'Grade teacher') {
      this.dataSource.data = this.notesData.data.filter(item => {
        return (this.gradeSelect === undefined || item.grade === this.gradeSelect) &&
          (this.gradeDivisionSelect === undefined || item.gradeDivision === this.gradeDivisionSelect) &&
          (this.yearTermsSelect === undefined || item.term === this.yearTermsSelect);
      });
    } else if (type === 'Student' || type === 'Parent') {
      this.dataSource.data = this.notesDataForStudents.data.filter(item => {
        return (this.yearTermsSelect === undefined || item.term === this.yearTermsSelect) &&
          (this.subjectSelect === undefined || item.subject === this.subjectSelect);
      });
    }
  }

  getStudentIdSwitch(row: any) {
    for (let i in this.students) {
      if (row.firstName === this.students[i].firstName && row.lastName === this.students[i].lastName) {
        row.studentId = this.students[i].id;
      }
    }
  }

  getStudentsSwitch(row: any) {
    if (row.grade != 0 && row.gradeDivision != undefined) {
      this.getStudents(row.grade, row.gradeDivision);
    }
  }

  addRowDone(row: any) {
    if(row.id !== '0'){
      this.updateNotes(row).then(() => (row.isEdit = false));
    } else {
      this.addNotes(row).then(() => (row.isEdit = false));
    }
  }

  addNote() {
    const newNote = {
      id: '0',
      firstName: '',
      lastName: '',
      note: '',
      isEdit: true
    }

    this.dataSource.data = [...this.dataSource.data, newNote]
  }

  removeRow(row: any) {
    if(row.id !== '0'){
      row.isEdit = false;
    } else {
      this.dataSource.data = this.dataSource.data.filter((u) => u.id !== '0');
    }
  }
}
