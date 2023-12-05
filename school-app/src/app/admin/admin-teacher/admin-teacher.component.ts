import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ProfileTypes } from 'src/app/@backend/enums/profile-types.enum';
import { HttpService } from 'src/app/@backend/services/http.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.css']
})
export class AdminTeacherComponent {

  // @ViewChild('signupForm') registerForm: any;

  constructor(private userService: UserService) { }

  async createAccount(firstName: string, lastName: string, email: string, password: string, type: string) {

    this.userService.register(firstName, lastName, email, password, password, type)
      .then(() => {
        // this.registerForm.reset();
        alert('Успешно създадохте акаунт');
      })
      .catch(err => alert(err.error));
  }

}
