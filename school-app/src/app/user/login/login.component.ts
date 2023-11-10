import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }

  login(username: string, password: string): void {
    this.userService.login(username, password);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
