import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbsenceComponent } from './pages/absence/absence.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { NotificationComponent } from './notification/notification.component';

import { SubjectComponent } from './subject/subject.component';

import { GradesComponent } from './pages/grades/grades.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { NoteComponent } from './pages/note/note.component';
import { SharedModule } from './shared/shared.module';
import { AdminComponent } from './admin/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HomeComponent } from './pages/home/home.component';
import { ChatModule } from './pages/chat/chat.module';
import { StudentComponent } from './user/student/student.component';
import { AdminModule } from './admin/admin.module';
import {MatDialogModule} from "@angular/material/dialog";
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    NotificationComponent,
    SubjectComponent,
    HomeComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    HttpClientModule,
    ChatModule,
    SharedModule,
    BrowserAnimationsModule,
    AbsenceComponent,
    NoteComponent,
    AdminModule,
    UserModule,
    MatDialogModule,
    FormsModule,
    CalendarComponent,
    GradesComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
