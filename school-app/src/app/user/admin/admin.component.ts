import { Component } from '@angular/core';
import { Student } from 'src/app/types/Student';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  //TODO: Request to server
  adminData: Student[] = [
    {
      id: "aaaa-bbbb-cccc",
      firstName: "Pesho",
      lastName: "Georgiev",
      email: "pesho.georgiev@abv.bg",
      grade: 5,
      gradeDivision: "B"
    },
    {
      id: "bban-cccc-vvvv",
      firstName: "Misho",
      lastName: "Ivanov",
      email: "misho.ivanov@gmail.com",
      grade: 12,
      gradeDivision: "C"
    }
  ];


  constructor(private adminService : AdminService) {

  }

  downloadCSVFile() {
    this.adminService.downloadCSV(this.adminData);
  }
}
