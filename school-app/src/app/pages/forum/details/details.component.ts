import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { CurrentPostComponent } from '../current-post/current-post.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpService } from 'src/app/@backend/services/http.service';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

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
    RouterModule
  ],
  standalone: true
})


export class DetailsComponent implements OnInit {

  title: string = '';
  subtitle: string = '';
  description: string = '';
  imageUrl: string = '';



  constructor(private route: ActivatedRoute, private http: HttpService, private userService : UserService) {


  }

  ngOnInit(): void {

    let postId: string | null = this.route.snapshot.paramMap.get('id');

    if (postId == null) {
      return;
    }

    this.loadPost(postId);

  }


  async loadPost(id: string) {

    const req = this.http.getPostById(id);

    await firstValueFrom(req)
      .then((data) => {

        console.log(data);



        this.title = data.title;
        this.subtitle = data.content;
        this.description = data.description;
        this.imageUrl = data.imageUrl;
      })
  }

  
  getUserType() {
    return this.userService.user?.type;
  }

}
