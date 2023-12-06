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
import { FormsModule } from '@angular/forms';

export interface Student {
  firstName: string,
  lastName: string,
  note: Note["note"]
}

const ELEMENT_DATA: Student[] = [
  {firstName: "Петър", lastName: "Петров", note: 'Забележка...'}
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
export class NoteComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = ELEMENT_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;

  firstTerm: Note[] = [
    { id: "1",
      creatorId: "1",
      note: 'Зaбележка1.........'
    },
    { id: "2",
      creatorId: "2",
      note: 'Зaбележка2............'
    }
  ];

  secondTerm: Note[] = [
    { id: "1",
      creatorId: "1",
      note: 'Зaбележка3.........'
    },
    { id: "2",
      creatorId: "2",
      note: 'Зaбележка4............'
    }
  ];
  displayedColumns2: string[] = ['id', 'note'];

  addNote() {
    const newNote = {
      firstName: '',
      lastName: '',
      note: '',
      isEdit: true
    }

    this.dataSource = [...this.dataSource, newNote]
  }
    
   constructor(
    private userService: UserService
    ) { }

  userType(){
    return this.userService.user?.type;
  }
}
