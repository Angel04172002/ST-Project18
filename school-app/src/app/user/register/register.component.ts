import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Profile } from 'src/app/types/Profile';
import { UserService } from '../user.service';
import { Route, Router } from '@angular/router';

const BASE_URL = 'http://localhost:3000';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {



  user: Profile | undefined;

  constructor(private userService: UserService, private router: Router) {

    const lstUser = localStorage.getItem('user') || undefined;

    if (lstUser) {
      this.user = JSON.parse(lstUser);
    }
  }


  register(firstName: string, lastName: string, email: string, password: string, confirmPassword : string, type: string) {



    this.userService.register(firstName, lastName, email, password, confirmPassword, type);

    this.router.navigate(['/home']);
    setTimeout(() => {
      location.reload();
    }, 100);

  }

}
