import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPostComponent } from './current-post/current-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { CurrentCommentComponent } from './current-comment/current-comment.component';
import { NewCommentComponent } from './new-comment/new-comment.component';



@NgModule({
  declarations: [
    CurrentPostComponent,
    NewPostComponent,
    CurrentCommentComponent,
    NewCommentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ForumModule { }
