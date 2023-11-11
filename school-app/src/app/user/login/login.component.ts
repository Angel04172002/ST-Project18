import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(
    private userService: UserService, private router: Router, private cd: ChangeDetectorRef
  ) { }


  login(username: string, password: string): void {

    this.userService.login(username, password);
    this.router.navigate(['/home']);
  }

  logout() {
    this.userService.logout();
  }
}
