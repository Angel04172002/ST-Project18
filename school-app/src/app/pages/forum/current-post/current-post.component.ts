import { CommonModule } from '@angular/common';
import { HttpSentEvent } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/@backend/services/http.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-post',
  templateUrl: './current-post.component.html',
  styleUrls: ['./current-post.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    RouterModule
  ],
  standalone: true
})
export class CurrentPostComponent implements OnInit {

  @Input() title: any;
  @Input() subtitle: any;
  @Input() description: any;
  @Input() image: any;
  @Input() id: any;


  constructor(private userService: UserService, private http: HttpService, private router: Router) {


  }

  ngOnInit() {
    console.log(this.title);
    console.log(this.subtitle);
    console.log(this.description);
    console.log(this.image);
  }


  getUserType() {
    return this.userService.user?.type;
  }

  getUser() {
    return this.userService.getUser();
  }

  async openPost(e: Event) {

    e.preventDefault();


  }

  async likePost(e: Event) {

    e.preventDefault();


    let element = e.currentTarget as HTMLElement;
    let userType = this.getUserType();
    let userId = this.getUser().id;
    let adminId = '';
    let teacherId = '';
    let gradeTeacherId = '';
    let studentId = '';
    let parentId = '';

    let hasLiked = 1;
    



    if (element == null) {
      return;
    }

    let nextElement: any = element.nextElementSibling;
    nextElement.textContent = (Number(element.nextElementSibling?.textContent) + 1).toString();

    let postId = nextElement.id;

    console.log(postId);



    if (userType == "Admin") {
      userId = adminId;
    } else if (userType == "Teacher") {
      userId = teacherId;
    } else if (userType == "Grade teacher") {
      userId = gradeTeacherId;
    } else if (userType == "Student") {
      userId = studentId;
    } else if (userType == "Parent") {
      userId = parentId;
    }

    const data = {
      postId,
      studentId,
      parentId,
      teacherId,
      gradeTeacherId,
      adminId
    };




  }

}
