import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPostComponent } from './current-post/current-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { CurrentCommentComponent } from './current-comment/current-comment.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { ForumComponent } from './forum/forum.component';
import { MatCardActions, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { DetailsComponent } from './details/details.component';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CurrentPostComponent,
    NewPostComponent,
    CurrentCommentComponent,
    NewCommentComponent,
    ForumComponent,
    DetailsComponent,
    RouterModule,
    Router
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatCardHeader,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    RouterModule,
    Router,
    CurrentCommentComponent

  ]
})
export class ForumModule { }
