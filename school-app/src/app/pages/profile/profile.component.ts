import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/@backend/services/http.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  standalone: true,
})
export class ProfileComponent {

  @ViewChild("email") email : any;
  @ViewChild("password") password : any;

  currentEmail : string = this.getUser().email;
  currentPassword : string = this.getUser().firstName.password;

  /**
   *
   */
  constructor(private http: HttpService, private userService: UserService) {

  }

  async update(e: Event, email: string, password: string) {

  
    e.preventDefault();

    let newEmail = this.email.nativeElement.value;
    let newPassword = this.password.nativeElement.value;
    let user = this.getUser();
    let userId = user.id;


    let req = this.http.updateUser(userId, newEmail, newPassword);

    await firstValueFrom(req)
      .then(() => {
        alert("Successfully updated data")
      })
      .catch(err => alert(err));

  }

  getUser() {
    return this.userService.getUser();
  }
}
