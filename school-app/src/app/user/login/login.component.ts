import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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

export class LoginComponent {

  constructor(
    private userService: UserService, private router: Router, private cd: ChangeDetectorRef
  ) { }


  login(username: string, password: string): void {
    this.userService.login(username, password);
    
    this.router.navigate(['/home']);
    setTimeout(()=>{
      location.reload();
    }, 100);
  }

  logout() {
    this.userService.logout();
  }
}
