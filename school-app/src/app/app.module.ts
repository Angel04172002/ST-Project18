import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbsenceComponent } from './absence/absence.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { NotificationComponent } from './notification/notification.component';

import { SubjectComponent } from './subject/subject.component';

import { HomeComponent } from './home/home.component';
import { GradesComponent } from './grades/grades.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { NoteComponent } from './note/note.component';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { AdminComponent } from './user/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CalendarComponent,
    FeedbackComponent,
    NotificationComponent,
    SubjectComponent,
    HomeComponent,
    GradesComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    HttpClientModule,
    UserModule,
    ChatModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
