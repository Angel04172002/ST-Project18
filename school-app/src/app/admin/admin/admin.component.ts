import { Component, ViewChild, ElementRef } from '@angular/core';
import { Student } from 'src/app/types/Student';
import { AdminService } from '../admin.service';
import { HttpService } from 'src/app/@backend/services/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private httpService: HttpService, private adminService: AdminService) { }

  downloadCSVFile() {
    this.adminService.generateStudentsAndGrades();
  }

  sendJson() {

    this.adminService.sendJsonData(this.fileInput.nativeElement.files, 'sendJsonStudents');
  }
}
