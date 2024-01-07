import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { CurrentPostComponent } from '../current-post/current-post.component';
import { ForumComponent } from '../forum/forum.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-current-comment',
  templateUrl: './current-comment.component.html',
  styleUrls: ['./current-comment.component.css'],
  imports: [
    MatCardModule,
    CurrentPostComponent,
    ForumComponent,
    DetailsComponent
  ],
  standalone: true
})
export class CurrentCommentComponent implements OnInit  {

  @Input("text") text : any;



  constructor() {
  }
  
  ngOnInit(): void {
    this.showComment();

  }


  showComment() {
    console.log(this.text);
  }

}
