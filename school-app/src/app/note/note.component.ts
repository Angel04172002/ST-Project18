import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface Student {
  firstName: string,
  lastName: string,
  note: string
}

const ELEMENT_DATA: Student[] = [
  {firstName: "Петър", lastName: "Петров", note: ""}
];

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
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
export class NoteComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'note', 'add'];
  dataSource = ELEMENT_DATA;

  addNote() {
    const newNote = {
      firstName: '',
      lastName: '',
      note: ''
    }

   // this.dataSource = [...this.dataSource, newRow]
  }
}
