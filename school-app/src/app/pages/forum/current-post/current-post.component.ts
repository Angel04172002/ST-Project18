import { CommonModule } from '@angular/common';
import { HttpSentEvent } from '@angular/common/http';
import { AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { CsvWriter } from 'csv-writer/src/lib/csv-writer';
import { first, firstValueFrom } from 'rxjs';
import { LikePost } from 'src/app/@backend/models/like-post';
import { HttpService } from 'src/app/@backend/services/http.service';
import { UserService } from 'src/app/user/user.service';
import { ForumComponent } from '../forum/forum.component';
import { ProfileTypes } from 'src/app/@backend/enums/profile-types.enum';

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
    RouterModule,
    ForumComponent
  ],
  standalone: true
})
export class CurrentPostComponent {

  @Input() title: any;
  @Input() subtitle: any;
  @Input() description: any;
  @Input() image: any;
  @Input() id: any;
  @Input() likesCount: any;


  constructor(private userService: UserService, private http: HttpService, private router: Router) {


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
    let userType: any = this.getUserType();
    let userId = this.getUser().id;

    let adminId = null;
    let teacherId = null;
    let gradeTeacherId = null;
    let studentId = null;
    let parentId = null;

    let hasLiked = 0;


    if (element == null) {
      return;
    }

    let nextElement: any = element.nextElementSibling;

    let postId = nextElement.id;



    if (userType == "Admin") {
      adminId = userId;
    } else if (userType == "Teacher") {
      teacherId = userId;
    } else if (userType == "Grade teacher") {
      gradeTeacherId = userId;
    } else if (userType == "Student") {
      studentId = userId;
    } else if (userType == "Parent") {
      parentId = userId;
    }

    const data = {
      postId,
      studentId,
      parentId,
      teacherId,
      gradeTeacherId,
      adminId,
      likesCount: 0,
      userType
    };

    let checkLikesRes = this.http.checkIfLiked(data);


    await firstValueFrom(checkLikesRes)
      .then(data => {
        console.log(data)
        hasLiked = Number(data);
      });

    console.log('has liked' + hasLiked);
    //has liked = 0;


    data.likesCount = hasLiked;

    let likesRes = this.http.likePost(data);


    await firstValueFrom(likesRes)
      .then(() => {

        if (hasLiked == 1) {
          nextElement.textContent = (Number(element.nextElementSibling?.textContent) - 1).toString();
        } else if (hasLiked == 0) {
          nextElement.textContent = (Number(element.nextElementSibling?.textContent) + 1).toString();
        };
      });


  }



  async deletePost(e: Event) {

    e.preventDefault();

    let element = e.target as HTMLElement;
    let id = element.id;

    let data = { postId: id }


    let res = this.http.deletePost(data);

    await firstValueFrom(res)
      .then(() => {
        location.reload();

      })

  }





  // showLikes(data: any) {

  //   const container = document.querySelector('.post-container');

  //   const children = container?.children;

  //   if (children == undefined) {
  //     return;
  //   }

  //   let i = 0;

  //   for (let el of data) {

  //     let element = children[i] as HTMLElement;

  //     // console.log(element);

  //     let childLikes : any | null = element.querySelector('.likes-count');

  //     let dbLikes = el.likes;
  //     let loadedLikes = 0;

  //     if(childLikes == null) {
  //       return;
  //     }


  //     console.log(childLikes);

  //     if(dbLikes == 1) {

  //       childLikes.textContent = (Number(childLikes) + 1).toString();

  //     }


  //     i++;
  //   }

  // }

}
