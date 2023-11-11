import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { GradeTeacherComponent } from './grade-teacher/grade-teacher.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ParentComponent } from './parent/parent.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';



@NgModule({
  declarations: [AdminComponent, GradeTeacherComponent, LoginComponent, RegisterComponent,
  ParentComponent, StudentComponent, TeacherComponent],

  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule
  ],
  exports: [
    AdminComponent, GradeTeacherComponent, LoginComponent, RegisterComponent,
    ParentComponent, StudentComponent, TeacherComponent
  ]
})
export class UserModule { }
