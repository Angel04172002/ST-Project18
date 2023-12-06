import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { UserRoutingModule } from '../user/user-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminSubjectComponent } from './admin-subject/admin-subject.component';
import { AdminTeacherComponent } from './admin-teacher/admin-teacher.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    UserRoutingModule,
    AdminPanelComponent,
    AdminSubjectComponent,
    AdminTeacherComponent
  ]
})
export class AdminModule { }
