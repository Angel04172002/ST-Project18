import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/user/user.service';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Absence } from '../types/Absence';
import { AbsenceTypes } from '../types/AbsenceTypes';
import { AbsenceExcuseReason } from '../types/AbsenceExcuseReason';

export interface Student {
  firstName: string | undefined,
  lastName: string | undefined,
  absenceType: AbsenceTypes,
  absenceReason: AbsenceExcuseReason
}

const ELEMENT_DATA: Student[] = [
  {firstName: "Петър", lastName: "Петров", absenceType: AbsenceTypes.Excused, absenceReason: AbsenceExcuseReason.FamilyReasons}
];

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css', '../styles/table-style.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  standalone: true
})
export class AbsenceComponent {
    displayedColumns: string[] = ['firstName', 'lastName', 'absenceReason', 'absenceType'];
    dataSource = ELEMENT_DATA;

    dataSource2: Absence[] = [
      { id: "1",
        creatorId: "1",
        absenceTypeId: AbsenceTypes.Excused,
        absenceReasonId: AbsenceExcuseReason.FamilyReasons
      },
      { id: "2",
        creatorId: "2",
        absenceTypeId: AbsenceTypes.Unexcused,
        absenceReasonId: AbsenceExcuseReason.MedicalReasons
      }
    ];
    displayedColumns2: string[] = ['id', 'absenceReasonId', 'absenceTypeId'];

    addRow() {
      const newRow = {
        firstName: '',
        lastName: '',
        absenceType: AbsenceTypes.Unexcused,
        absenceReason: AbsenceExcuseReason.Others 
      }
      this.dataSource = [...this.dataSource, newRow]
    }

    constructor(
      private userService: UserService
      ) { }

    userType(){
      return this.userService.user?.type;
    }
}
