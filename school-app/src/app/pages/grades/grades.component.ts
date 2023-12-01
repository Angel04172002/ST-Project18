import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css', '../../styles/table-style.css']
})
export class GradesComponent {

  constructor(private userService: UserService) {

  }

  userType() {
    return this.userService.user?.type;
  }
}
