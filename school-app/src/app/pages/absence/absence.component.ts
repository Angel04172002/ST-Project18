import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { AddExcuseReasonsByParent } from 'src/app/@backend/models/add-excuse-reasons-by-parent';

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
    key: "teacherName",
    type: "text",
    label: "Учител"
  },
  {
    key: "absenceSubject",
    type: "text",
    label: "Предмет"
  },
  {
    key: "absenceType",
    type: "checkbox",
    label: "Извинено"
  },
  {
    key: "absenceReason",
    type: "text",
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
  dataSource = new MatTableDataSource<any>();
  columnsSchema: any = COLUMNS_SCHEMA;

  displayedColumns2: string[] = COLUMNS_SCHEMA2.map((col) => col.key);
  columnsSchema2: any = COLUMNS_SCHEMA2;

  gradeSelect: any;
  gradeDivisionSelect: any;
  yearTermsSelect: any;

  ngOnInit(): void {
    this.getExcuseReasons().then(() => {
      this.getAbsences()
      this.getGradeDivisions();

    });

    // this.getExcuseReasons()

  }

  absencesData = new MatTableDataSource<any>();
  absencesDataForStudents = new MatTableDataSource<any>();

  async getAbsences() {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type;
    }

    let excuseReason: any;
    if (type === 'Teacher') {

      await firstValueFrom(this.http.getAbsencesByTeacher(id))
        .then(data => {
          for (let item of data) {

            for (let i of this.excuseReasons) {
              if (i.absenceId === item.id) {
                excuseReason = i.excuseReason;
              } else {
                excuseReason = '';
              }
            }

            let absencesDataArray = {
              id: item.absence_student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name,
              subject: item.absence_subject_id,
              grade: item.grade_id,
              gradeDivision: item.grade_division_id,
              absenceType: item.absence_type_id,
              absenceReason: excuseReason,
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
    } else if (type === 'Grade teacher') {

      await firstValueFrom(this.http.getAbsencesByGradeTeacher(id))
        .then(data => {

          for (let item of data) {

            for (let i of this.excuseReasons) {
              if (i.absenceId === item.id) {
                excuseReason = i.excuseReason;
              } else {
                excuseReason = '';
              }

            }

            let absencesDataArray = {
              id: item.absence_student_id,
              firstName: item.student_first_name,
              lastName: item.student_last_name,
              subject: item.absence_subject_id,
              grade: item.grade_id,
              gradeDivision: item.grade_division_id,
              absenceType: item.absence_type_id,
              absenceReason: excuseReason,
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
          for (let item of data) {

            for (let i of this.excuseReasons) {
              if (i.absenceId === item.absence_id) {
                excuseReason = i.excuseReason;
              } else {
                excuseReason = '';
              }
            }

            let absencesDataArray = {
              id: item.absence_id,
              teacherName: item.teacher_first_name + ' ' + item.teacher_last_name,
              teacherCreator: item.teacher_creator_id ? item.teacher_creator_id : '',
              gradeTeacherCreator: item.grade_teacher_creator_id ? item.grade_teacher_creator_id : '',
              absenceType: item.absence_type_id,
              absenceReason: excuseReason,
              absenceSubject: item.absence_subject_id,
              term: item.absence_term_id
            }

            this.absencesDataForStudents.data.push(absencesDataArray);

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

            for (let i of this.excuseReasons) {
              if (i.absenceId === item.absence_id) {
                excuseReason = i.excuseReason;
              } else {
                excuseReason = '';
              }
            }

            let absencesDataArray = {
              id: item.absence_id,
              teacherName: item.teacher_first_name + ' ' + item.teacher_last_name,
              teacherCreator: item.teacher_creator_id ? item.teacher_creator_id : '',
              gradeTeacherCreator: item.grade_teacher_creator_id ? item.grade_teacher_creator_id : '',
              absenceType: item.absence_type_id,
              absenceReason: excuseReason,
              absenceSubject: item.absence_subject_id,
              term: item.absence_term_id
            }

            this.absencesDataForStudents.data.push(absencesDataArray);

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
    this.absencesData.data.length != 0 ? this.dataSource.data = this.absencesData.data : this.dataSource.data = this.absencesDataForStudents.data

  }

  async addAbsences(row: any) {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type
    }

    let absenceType;
    if (row.absenceType === true) {
      absenceType = AbsenceTypes.Excused;
    } else {
      absenceType = AbsenceTypes.Unexcused;
    }

    let absences: AddAbsencesByTeacher[] = [{
      type: absenceType,
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

  excuseReasons: any[] = [];
  async getExcuseReasons() {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type;
    }

    if (type === 'Parent') {

      try {
        await firstValueFrom(this.http.getExcuseReasonsByParent(id))
          .then(data => {

            for (let item of data) {
              let excuseReasonsArray = {
                absenceId: item.id,
                excuseReason: item.excuse_reason
              }

              this.excuseReasons.push(excuseReasonsArray);
            }

          })
      } catch (err) {
        console.log(err)
      }
    } else if (type === 'Student') {
      try {
        await firstValueFrom(this.http.getExcuseReasonsByStudent(id))
          .then(data => {

            for (let item of data) {
              let excuseReasonsArray = {
                absenceId: item.id,
                excuseReason: item.excuse_reason
              }

              this.excuseReasons.push(excuseReasonsArray);
            }

          })
      } catch (err) {
        console.log(err)
      }
    } else if (type === 'Teacher') {
      try {
        await firstValueFrom(this.http.getExcuseReasonsByTeacher(id))
          .then(data => {
            console.log(data)

            for (let item of data) {
              let excuseReasonsArray = {
                absenceId: item.absence_id,
                excuseReason: item.excuse_reason
              }

              this.excuseReasons.push(excuseReasonsArray);
            }

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
    }
  }

  applyFilter() {
    let user = this.userService.getUser();
    let type = '';

    if (user) {
      type = user.type;
    }

    if (type === 'Teacher' || type === 'Grade teacher') {
      this.dataSource.data = this.absencesData.data.filter(item => {
        return (this.gradeSelect === undefined || item.grade === this.gradeSelect) &&
          (this.gradeDivisionSelect === undefined || item.gradeDivision === this.gradeDivisionSelect) &&
          (this.yearTermsSelect === undefined || item.term === this.yearTermsSelect);
      });
    } else if (type === 'Student' || type === 'Parent') {
      this.dataSource.data = this.absencesDataForStudents.data.filter(item => {
        return (this.gradeSelect === undefined || item.grade === this.gradeSelect) &&
          (this.gradeDivisionSelect === undefined || item.gradeDivision === this.gradeDivisionSelect) &&
          (this.yearTermsSelect === undefined || item.term === this.yearTermsSelect);
      });
    }
  }

  removeRow(id: string) {
    this.dataSource.data = this.dataSource.data.filter((u) => u.id !== '0');
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

  selectedRowIndex = '-1';
  excused: boolean = false;

  highlight(row: Absence) {
    this.selectedRowIndex = row.id;

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

  fileAsBinaryString!: any;
  fileMessage!: any;
  onFileSelected(event: any): void {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      this.fileMessage = file.name;

      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.fileAsBinaryString = btoa(binaryString);
  }

  excuseReason: any;
  getExcuseReasonSwitch(value: any) {
    this.excuseReason = value;
  }

  async addExcuseReasons() {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type;
    }

    let excuseReasons: AddExcuseReasonsByParent[] = [{
      reason: this.excuseReason,
      parentId: id,
      absenceId: this.selectedRowIndex,
      noteId: this.fileAsBinaryString,
    }]

    let req = this.http.addExcuseReasonsByParent(excuseReasons)

    try {
      await firstValueFrom(req)
        .then(data => {

          console.log(data);

        })
    } catch (err) {
      console.log(err)
    }

  }

  onSend(form: NgForm) {
    this.addExcuseReasons();
    this.dialogRef.close();
  }
}
