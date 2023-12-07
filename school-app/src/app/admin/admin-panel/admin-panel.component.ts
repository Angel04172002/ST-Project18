import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/@backend/services/http.service';
import { ExcelService } from 'src/app/user/excel.service';
import { AdminService } from '../admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
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
export class AdminPanelComponent {
  @ViewChild('fileUpload') fileInput!: ElementRef;

  constructor(private httpService: HttpService, private adminService: AdminService) { }

  downloadCSVFile() {
    this.adminService.generateTeachersAndGrades();
  }

  sendJson() {
    this.adminService.sendJsonData(this.fileInput.nativeElement.files, 'sendJsonTeachers');
  }

}
