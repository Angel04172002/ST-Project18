import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  imports: [
    MatCardModule
  ],
  standalone: true
})
export class NewPostComponent {

}
