import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private userService: UserService, private router : Router) { }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

}
