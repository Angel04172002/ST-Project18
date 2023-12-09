import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/user/user.service';
import { HttpService } from 'src/app/@backend/services/http.service';
import { firstValueFrom } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Absence } from '../../types/Absence';
import { AbsenceTypes } from '../../types/AbsenceTypes';
import { AbsenceExcuseReason } from '../../types/AbsenceExcuseReason';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, NgForm, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AddAbsencesByTeacher } from 'src/app/@backend/models/add-absences-by-teacher';
import { Term } from 'src/app/types/Term';
import { Subject } from 'src/app/types/Subject';
import { GradeDivision } from 'src/app/types/GradeDivision';
import { Grade } from 'src/app/types/Grade';

export interface Student {
  id: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  subject: Subject['subjectName'],
  grade: Grade['id'],
  gradeDivision: GradeDivision['id'],
  absenceType: AbsenceTypes,
  absenceReason: AbsenceExcuseReason,
  term: Term['termId']
}

const COLUMNS_SCHEMA = [
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
    key: "absenceType",
    type: "checkbox",
    label: "Извинено"
  },
  {
    key: "absenceReason",
    type: "selectAbsenceReason",
    label: "Причина за отсъствие"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
]


const COLUMNS_SCHEMA2 = [
  {
    key: "subject",
    type: "selectSubject",
    label: "Предмет"
  },
  {
    key: "absenceType",
    type: "checkbox",
    label: "Извинено"
  },
  {
    key: "absenceReason",
    type: "selectAbsenceReason",
    label: "Причина за отсъствие"
  }
]

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css', '../../styles/table-style.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
  ],
  standalone: true
})
export class AbsenceComponent implements OnInit {
  constructor(
    private userService: UserService,
    private http: HttpService,
    private dialog: MatDialog
  ) { }

  userType() {
    return this.userService.user?.type;
  }

  yearTerms: Term['termId'][] = ["Първи срок", "Втори срок"];
  gradeDivisions: GradeDivision['id'][] = [];
  grades: Grade['id'][] = [];
  subjects: Subject['subjectName'][] = [];

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<Student>();
  columnsSchema: any = COLUMNS_SCHEMA;

  displayedColumns2: string[] = COLUMNS_SCHEMA2.map((col) => col.key);
  columnsSchema2: any = COLUMNS_SCHEMA2;

  gradeSelect: any;
  gradeDivisionSelect: any;
  yearTermsSelect: any;

  ngOnInit(): void {
    this.getAbsences().then(() => {
      this.getGradeDivisions();

    });

    // this.getExcuseReasons()

  }

  absencesData = new MatTableDataSource<Student>();

  async getAbsences() {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type;
    }

    console.log(user)

    if (type === 'Teacher') {

      await firstValueFrom(this.http.getAbsencesByTeacher(id))
        .then(data => {
          //console.log(data)
          for (let item of data) {

            let absencesDataArray = {
              id: item.absence_student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name,
              subject: item.absence_subject_id,
              grade: item.grade_id,
              gradeDivision: item.grade_division_id,
              absenceType: item.absence_type_id,
              absenceReason: this.absenceReasonValue,
              term: item.absence_term_id
            }

            this.absencesData.data.push(absencesDataArray);
            console.log(this.absenceReasonValue)

            if (this.gradeDivisions.indexOf(item.grade_division_id) === -1) {
              this.gradeDivisions.push(item.grade_division_id);
            }

            if (this.grades.indexOf(item.grade_id) === -1) {
              this.grades.push(item.grade_id);
            }

            if (this.subjects.indexOf(item.absence_subject_id) === -1) {
              this.subjects.push(item.absence_subject_id);
            }

          }

        })
    } else if (type === 'Grade teacher') {

      await firstValueFrom(this.http.getAbsencesByGradeTeacher(id))
        .then(data => {

          for (let item of data) {

            let absencesDataArray = {
              id: item.absence_student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name,
              subject: item.absence_subject_id,
              grade: item.grade_id,
              gradeDivision: item.grade_division_id,
              absenceType: item.absence_type_id,
              absenceReason: this.absenceReasonValue,
              term: item.absence_term_id
            }

            this.absencesData.data.push(absencesDataArray);

            if (this.gradeDivisions.indexOf(item.grade_division_id) === -1) {
              this.gradeDivisions.push(item.grade_division_id);
            }

            if (this.grades.indexOf(item.grade_id) === -1) {
              this.grades.push(item.grade_id);
            }

            if (this.subjects.indexOf(item.absence_subject_id) === -1) {
              this.subjects.push(item.absence_subject_id);
            }

          }

        })
    } else if (type === 'Student') {

      await firstValueFrom(this.http.getAbsencesByStudent(id))
        .then(data => {
          console.log(data)
          for (let item of data) {

            let absencesDataArray = {
              id: item.absence_student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name,
              subject: item.absence_subject_id,
              grade: item.grade_id,
              gradeDivision: item.grade_division_id,
              absenceType: item.absence_type_id,
              absenceReason: this.absenceReasonValue,
              term: item.absence_term_id
            }

            this.absencesData.data.push(absencesDataArray);

            if (this.gradeDivisions.indexOf(item.grade_division_id) === -1) {
              this.gradeDivisions.push(item.grade_division_id);
            }

            if (this.grades.indexOf(item.grade_id) === -1) {
              this.grades.push(item.grade_id);
            }

            if (this.subjects.indexOf(item.absence_subject_id) === -1) {
              this.subjects.push(item.absence_subject_id);
            }

          }

        })
    } else if (type === 'Parent') {

      await firstValueFrom(this.http.getAbsencesByParent(id))
        .then(data => {

          for (let item of data) {

            let absencesDataArray = {
              id: item.absence_student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name,
              subject: item.absence_subject_id,
              grade: item.grade_id,
              gradeDivision: item.grade_division_id,
              absenceType: item.absence_type_id,
              absenceReason: this.absenceReasonValue,
              term: item.absence_term_id
            }

            this.absencesData.data.push(absencesDataArray);

            if (this.gradeDivisions.indexOf(item.grade_division_id) === -1) {
              this.gradeDivisions.push(item.grade_division_id);
            }

            if (this.grades.indexOf(item.grade_id) === -1) {
              this.grades.push(item.grade_id);
            }

            if (this.subjects.indexOf(item.absence_subject_id) === -1) {
              this.subjects.push(item.absence_subject_id);
            }

          }

        })

    }
    console.log(this.absencesData.data)
    this.dataSource.data = this.absencesData.data;
  }

  async addAbsences(row: any) {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type
    }

    console.log(row)
    debugger;
    let absences: AddAbsencesByTeacher[] = [{
      type: row.absenceType == true ? AbsenceTypes.Excused : AbsenceTypes.Unexcused,
      subjectId: row.subject,
      studentId: row.id,
      termId: this.yearTermsSelect
    }]

    let creator: any;

    type == "Teacher" ? creator = { teacherId: id, gradeTeacherId: null } : creator = { teacherId: null, gradeTeacherId: id };

    let req = this.http.addAbsencesByTeacher(absences, creator)

    try {
      await firstValueFrom(req)
        .then(data => {

          console.log(data);

        })
    } catch (err) {
      console.log(err)
    }

  }

  absenceReasonValue!: AbsenceExcuseReason;
  getAbsenceReasonSwitch(row: any) {
    this.absenceReasonValue = row.absenceReason;
    console.log(this.absenceReasonValue)
  }

  async getExcuseReasons() {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type;
    }

    console.log(user)

    if (type === 'Teacher') {

      try {
        await firstValueFrom(this.http.getExcuseReasonsByTeacher(id))
          .then(data => {
            console.log(data)

          })
      } catch (err) {
        console.log(err)
      }
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

    console.log(user)

    console.log(grade, division)
    this.students = [];
    if (type === 'Teacher') {

      try {
        await firstValueFrom(this.http.getStudentsByGradeAndDivision(grade, division))
          .then(data => {
            console.log(data)
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

    console.log(this.students[0].id)

  }

  getStudentIdSwitch(row: any) {
    for (let i in this.students) {
      if (row.firstName === this.students[i].firstName && row.lastName === this.students[i].lastName) {
        row.id = this.students[i].id;
      }
    }
  }

  getStudentsSwitch(row: any) {
    if (row.grade != 0 && row.gradeDivision != '') {
      this.getStudents(row.grade, row.gradeDivision);
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
    } else if (type === 'Student') {
      try {
        await firstValueFrom(this.http.getGradesDivisionsAndSubjectsForStudent(id))
          .then(data => {
            console.log(data)
            data = data[0]

            this.gradeDivisions.push(data.student_grade_division_id);
            this.grades.push(data.student_grade_id);
            this.subjects.push(data.student_subject_id)
          })
      } catch (err) {
        console.log(err)
      }

    } else if (type === 'Parent') {

      try {
        await firstValueFrom(this.http.getGradesDivisionsAndSubjectsForParent(id))
          .then(data => {
            data = data[0]

            this.gradeDivisions.push(data.student_grade_division_id);
            this.grades.push(data.student_grade_id);
            this.subjects.push(data.student_subject_id)
          })
      } catch (err) {
        console.log(err);
      }
    }
  }

  applyFilter() {
    this.dataSource.data = this.absencesData.data.filter(item => {
      return (this.gradeSelect === undefined || item.grade === this.gradeSelect) &&
        (this.gradeDivisionSelect === undefined || item.gradeDivision === this.gradeDivisionSelect) &&
        (this.yearTermsSelect === undefined || item.term === this.yearTermsSelect);
    });
  }

  absenceExcuseReasons: AbsenceExcuseReason[] = [
    AbsenceExcuseReason.FamilyReasons,
    AbsenceExcuseReason.MedicalReasons,
    AbsenceExcuseReason.Others
  ];

  addRowDone(row: any) {
    this.addAbsences(row).then(() => (row.isEdit = false));
  }

  addRow() {
    const newRow = {
      id: '0',
      firstName: '',
      lastName: '',
      subject: '',
      grade: 0,
      gradeDivision: '',
      absenceType: AbsenceTypes.Unexcused,
      absenceReason: AbsenceExcuseReason.Others,
      term: '',
      isEdit: true
    }
    this.dataSource.data = [...this.dataSource.data, newRow]
  }

  selectedRowIndex = -1;
  excused: boolean = false;

  highlight(row: Absence) {
    this.selectedRowIndex = Number(row.id);

    if (row.absenceTypeId == AbsenceTypes.Excused) {
      this.excused = true;
      return true;
    } else {
      this.excused = false;
      return false;
    }
  }

  @ViewChild('callDialog') callDialog!: TemplateRef<any>;
  dialogRef: any;

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialogRef = this.dialog.open(this.callDialog, dialogConfig);
  }

  onSend(form: NgForm) {
    let data = form.value;
    console.log(data, 'form submitted');
    this.dialogRef.close();
  }
}
