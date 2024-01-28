import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Profile } from 'src/app/types/Profile';
import { UserService } from '../user.service';
import { Route, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


const BASE_URL = 'http://localhost:3001';

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


  register(e: Event, firstName: string, lastName: string, email: string, password: string, confirmPassword: string, type: string) {

    e.preventDefault();


    this.userService.register(firstName, lastName, email, password, confirmPassword, type)
      .then(() => {

        setTimeout(() => {
          location.reload();
        }, 100);

        this.router.navigate(['/home']);
      })
      .catch(err => {
        alert(err.error);
      });
  }

}
