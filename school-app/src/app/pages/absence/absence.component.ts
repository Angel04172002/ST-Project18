import { Component, TemplateRef, ViewChild } from '@angular/core';
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
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface Student {
  firstName: string | undefined,
  lastName: string | undefined,
  absenceType: AbsenceTypes,
  absenceReason: AbsenceExcuseReason
}

const ELEMENT_DATA: Student[] = [
  { firstName: "Петър", lastName: "Петров", absenceType: AbsenceTypes.Excused, absenceReason: AbsenceExcuseReason.FamilyReasons }
];

const COLUMNS_SCHEMA = [
  {
    key: "firstName",
    type: "text",
    label: "Име"
  },
  {
    key: "lastName",
    type: "text",
    label: "Фамилия"
  },
  {
    key: "absenceType",
    type: "checkbox",
    label: "Извинено"
  },
  {
    key: "absenceReason",
    type: "select",
    label: "Причина за отсъствие"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
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
    MatIconModule
  ],
  standalone: true
})
export class AbsenceComponent {
  constructor(
    private userService: UserService,
    private http: HttpService,
    private dialog: MatDialog
  ) { }

  userType() {
    return this.userService.user?.type;
  }

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = ELEMENT_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;

  absenceExcuseReasons: AbsenceExcuseReason[] = [
    AbsenceExcuseReason.FamilyReasons,
    AbsenceExcuseReason.MedicalReasons,
    AbsenceExcuseReason.Others
  ];

  // firstTerm: Absence[] = [
  //   {
  //     id: "1",
  //     creatorId: "1",
  //     absenceTypeId: AbsenceTypes.Excused,
  //     absenceReasonId: AbsenceExcuseReason.FamilyReasons
  //   },
  //   {
  //     id: "2",
  //     creatorId: "2",
  //     absenceTypeId: AbsenceTypes.Unexcused,
  //     absenceReasonId: AbsenceExcuseReason.MedicalReasons
  //   }
  // ];

  // secondTerm: Absence[] = [
  //   {
  //     id: "1",
  //     creatorId: "1",
  //     absenceTypeId: AbsenceTypes.Unexcused,
  //     absenceReasonId: AbsenceExcuseReason.MedicalReasons
  //   },
  //   {
  //     id: "2",
  //     creatorId: "2",
  //     absenceTypeId: AbsenceTypes.Unexcused,
  //     absenceReasonId: AbsenceExcuseReason.FamilyReasons
  //   }
  // ];
  displayedColumns2: string[] = ['id', 'absenceReasonId', 'absenceTypeId'];

  addRow() {
    const newRow = {
      firstName: '',
      lastName: '',
      absenceType: AbsenceTypes.Unexcused,
      absenceReason: AbsenceExcuseReason.Others,
      isEdit: true
    }
    this.dataSource = [...this.dataSource, newRow]
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
