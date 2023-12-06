import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/@backend/services/http.service';
import { ExcelService } from 'src/app/user/excel.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private httpService: HttpService, private adminService: AdminService) { }

  downloadCSVFile() {
    this.adminService.generateTeachersAndGrades();
  }

  sendJson() {
    this.adminService.sendJsonData(this.fileInput.nativeElement.files, 'sendJsonTeachers');
  }

}
