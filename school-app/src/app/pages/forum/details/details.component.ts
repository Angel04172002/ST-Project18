import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CurrentPostComponent } from '../current-post/current-post.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpService } from 'src/app/@backend/services/http.service';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { CurrentCommentComponent } from '../current-comment/current-comment.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
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
    CurrentPostComponent,
    CurrentCommentComponent,
    RouterModule,
    MatFormFieldModule
  ],
  standalone: true
})


export class DetailsComponent implements OnInit {

  @ViewChild("desc") textareaEl: any = '';

  title: string = '';
  subtitle: string = '';
  description: string = '';
  imageUrl: string = '';
  id: string = '';


  commentData: any = [];

  constructor(private route: ActivatedRoute, private http: HttpService, private userService: UserService) {


  }

  ngOnInit(): void {

    let postId: string | null = this.route.snapshot.paramMap.get('id');

    if (postId == null) {
      return;
    }

    console.log(postId);

    this.loadItems(postId);

  }


  async loadItems(postId: any) {
    await this.loadPost(postId);
    await this.getComments(postId);
  }


  async loadPost(id: string) {

    const req = this.http.getPostById(id);

    await firstValueFrom(req)
      .then((data) => {

        this.title = data.title;
        this.subtitle = data.content;
        this.description = data.description;
        this.imageUrl = data.imageUrl;
        this.id = data.id;
      })
  }


  getUserType() {
    return this.userService.user?.type;
  }

  getUser() {
    return this.userService.user;
  }

  async addComment(e: Event) {

    e.preventDefault();

    let commentText = this.textareaEl.nativeElement.value;


    const userType = this.getUserType();
    const userId = this.userService.getUser().id;

    let admin_creator_id = null;
    let teacher_creator_id = null;
    let grade_teacher_creator_id = null;
    let student_creator_id = null;
    let parent_id = null;

    if (userType == "Admin") {
      admin_creator_id = userId;
    } else if (userType == "Teacher") {
      teacher_creator_id = userId;
    } else if (userType == "Grade teacher") {
      grade_teacher_creator_id = userId;
    } else if (userType == "Parent") {
      parent_id = userId;
    } else if (userType == "Student") {
      student_creator_id = userId;
    }


    const data = {
      postId: this.id,
      text: commentText,
      admin_creator_id,
      teacher_creator_id,
      grade_teacher_creator_id,
      parent_id,
      student_creator_id
    };


    let req = this.http.addComment(data);

    await firstValueFrom(req)
      .then(() => {
        alert('Успешно добавен коментар');
      })
      .catch(err => alert(err.message));


  }


  async getComments(postId: string) {

    const reqData = { postId: postId };

    const userType = this.getUserType();
    const user = this.getUser();
    const req = this.http.getComments(reqData);

    if (user == undefined) {
      return;
    }


    let userId = '';

    console.log(userType);



    await firstValueFrom(req)
      .then((data) => {


        // for (let item of data) {


        //   if (userType == 'Student') {
        //     userId = item.student_id;
        //   } else if (userType == 'Parent') {
        //     userId = item.parent_id;
        //   } else if (userType == 'Teacher') {
        //     userId = item.teacher_id;
        //   } else if (userType == 'Grade teacher') {
        //     userId = item.grade_teacher_id;
        //   } else {
        //     userId = item.admin_id;
        //   }


        //   // this.http.jwtToken = user.token;
        //   let currentUser = this.http.getProfile(userId);

        //   await firstValueFrom(currentUser)
        //     .then(d => {
        //       console.log(d);
        //     })

        this.commentData = data;





      })
      .catch(err => alert(err));

  }
}
