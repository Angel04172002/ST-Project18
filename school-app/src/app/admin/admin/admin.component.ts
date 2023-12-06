import { Component, ViewChild, ElementRef } from '@angular/core';
import { Student } from 'src/app/types/Student';
import { AdminService } from '../admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
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

export class AdminComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private adminService: AdminService) { }

  downloadCSVFile() {
    this.adminService.generateStudentsAndGrades();
  }

  sendJson() {

    this.adminService.sendJsonData(this.fileInput.nativeElement.files);
  }
}
