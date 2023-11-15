import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Profile } from 'src/app/types/Profile';
import { UserService } from '../user.service';
import { Route, Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


const BASE_URL = 'http://localhost:3000';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  standalone: true
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

    if(type === "admin"){
      this.router.navigate(['/admin-students']);
    } else {
      this.router.navigate(['/home']);
    }
    
    setTimeout(() => {
      location.reload();
    }, 100);

  }

}
