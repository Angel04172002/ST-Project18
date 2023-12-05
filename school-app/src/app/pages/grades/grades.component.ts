import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/@backend/services/http.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css', '../../styles/table-style.css']
})
export class GradesComponent implements OnInit {

  grades: any = [];


  gradesDictionary: any = {
    2: 'poor',
    3: 'middle',
    4: 'good',
    5: 'very good',
    6: 'excellent'
  };


  constructor(private userService: UserService, private http: HttpService) {

  }

  ngOnInit(): void {
    this.getGrades();
  }


  async getGrades() {

    let user = this.userService.getUser();
    let id = '';

    if(user) {
      id = user.id;
    }

    this.grades = [];

    await firstValueFrom(this.http.getMarksByStudent(id))
      .then(data => {

        

        console.log(id);

        for (let item of data) {


          let gradesData = {
            'term-1-marks': item.term_1_marks.split(', '),
            'term-1-final': item.term_1_final_mark,
            'term-2-marks': item.term_2_marks.split(', '),
            'term-2-final': item.term_2_final_mark,
            'year-mark': item.term_final,
            'subjectName': item.subject_name
          }

          this.grades.push(gradesData);

        }

        console.log(this.grades);

        console.log(data);

      })

  }


  userType() {
    return this.userService.user?.type;
  }
}
