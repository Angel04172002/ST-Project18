import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userService: UserService) { }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.logout();
  }

}
