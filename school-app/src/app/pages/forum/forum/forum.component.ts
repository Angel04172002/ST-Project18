import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TeacherService } from 'src/app/pages/teacher.service';
import { UserService } from 'src/app/user/user.service';
import { CurrentPostComponent } from '../current-post/current-post.component';
import { HttpService } from 'src/app/@backend/services/http.service';
import { Post } from 'src/app/types/Post';
import { LikePost } from 'src/app/@backend/models/like-post';
import { DetailsComponent } from '../details/details.component';
import { CurrentCommentComponent } from '../current-comment/current-comment.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
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
    DetailsComponent,
    ForumComponent,
    CurrentCommentComponent
  ],
  standalone: true
})
export class ForumComponent implements OnInit {

  @ViewChild("title") title: any;
  @ViewChild("content") content: any;
  @ViewChild("description") description: any;
  @ViewChild("image") imageUrl: any;

  postData: any = [];

  constructor(private teacherService: TeacherService, private userService: UserService, private httpService: HttpService) {

  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  addPost() {

    let likesCount = 0;

    const title = this.title.nativeElement.value;
    const description = this.description.nativeElement.value;
    const content = this.content.nativeElement.value;
    const imageUrl = this.imageUrl.nativeElement.value;

    const userType = this.userService.getUser().type;
    const userId = this.userService.getUser().id;

    let admin_creator_id = null;
    let teacher_creator_id = null;
    let grade_teacher_creator_id = null;

    if (userType == "Admin") {
      admin_creator_id = userId;
    } else if (userType == "Teacher") {
      teacher_creator_id = userId;
    } else if (userType == "Grade teacher") {
      grade_teacher_creator_id = userId;
    }

    const data = {
      title,
      description,
      content,
      admin_creator_id,
      teacher_creator_id,
      grade_teacher_creator_id,
      imageUrl,
      likesCount
    };


    this.teacherService.addPost(data);
  }

  async getAllPosts() {

    // debugger;

    let newData: LikePost[] = [];

    const data = await this.teacherService.getAllPosts();

    // this.teacherService.getAllPosts()
    //   .then(async (data: any[]) => {

    let newElement: any = {};

    console.log(data.length);

    let i = 0;

    for (let el of data) {

      newElement = el;

      let dataToSend = { id: el.id };
      console.log(dataToSend.id);

      let likesData = await this.teacherService.getLikes(dataToSend);

      console.log(likesData);


      let likes = likesData[0]?.likes;
      let val = 0;
      // let currentLikes = 

      if (likes == 0) {
        val = 1;
      }

      Object.defineProperty(newElement, 'likesCount', { value: likesData.length - val });

      newData.push(newElement);
      i++;

    };


    // })


    this.postData = newData;



  }

  getUserType() {
    return this.userService.user?.type;
  }
}
