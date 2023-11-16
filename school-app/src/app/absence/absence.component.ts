import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

export interface Student {
  firstName: string,
  lastName: string,
  excused: boolean
}

const ELEMENT_DATA: Student[] = [
  {firstName: "Петър", lastName: "Петров", excused: true}
];

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css', '../styles/table-style.css'],
  imports: [
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
    displayedColumns: string[] = ['firstName', 'lastName', 'excused'];
    dataSource = ELEMENT_DATA;

    addRow() {
      const newRow = {
        firstName: '',
        lastName: '',
        excused: false 
      }
      this.dataSource = [...this.dataSource, newRow]
    }
}
