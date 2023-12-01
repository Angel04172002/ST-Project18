import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { GradeTeacherComponent } from './grade-teacher/grade-teacher.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ParentComponent } from './parent/parent.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AppRoutingModule } from '../app-routing.module';
import { StudentComponent } from './student/student.component';



@NgModule({
  declarations: [
    GradeTeacherComponent,
    ParentComponent, 
    TeacherComponent
  ],

  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    AppRoutingModule,
    LoginComponent, 
    RegisterComponent,
  ], 
  // exports: [
  //   GradeTeacherComponent,
  //   ParentComponent, 
  //   TeacherComponent,
  //   GradeTeacherComponent,
  //   LoginComponent,
  //   RegisterComponent,
  //   StudentComponent
  // ]
})
export class UserModule { }
