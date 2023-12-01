import { Component } from '@angular/core';
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

export interface Student {
  firstName: string,
  lastName: string,
  note: Note["note"]
}

const ELEMENT_DATA: Student[] = [
  {firstName: "Петър", lastName: "Петров", note: ''}
];

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
    MatButtonModule
  ],
  standalone: true
})
export class NoteComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'note', 'add'];
  dataSource = ELEMENT_DATA;

  dataSource2: Note[] = [
    { id: "1",
      creatorId: "1",
      note: 'Зaбележка1.........'
    },
    { id: "2",
      creatorId: "2",
      note: 'Зaбележка2............'
    }
  ];
  displayedColumns2: string[] = ['id', 'note'];

  addNote() {
    const newNote = {
      firstName: '',
      lastName: '',
      note: ''
    }
  }
   // this.dataSource = [...this.dataSource, newRow]

   constructor(
    private userService: UserService
    ) { }

  userType(){
    return this.userService.user?.type;
  }
}
