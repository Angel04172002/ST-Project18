import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { AbsenceComponent } from './absence/absence.component';
import { AdminComponent } from './user/admin/admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';

import { NavigationComponent } from './core/navigation/navigation.component';
import { NotificationComponent } from './notification/notification.component';
import { ParentComponent } from './user/parent/parent.component';

import { StudentComponent } from './user/student/student.component';
import { SubjectComponent } from './subject/subject.component';
import { TeacherComponent } from './user/teacher/teacher.component';
import { GradeTeacherComponent } from './user/grade-teacher/grade-teacher.component';
import { HomeComponent } from './home/home.component';
import { GradesComponent } from './grades/grades.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    JitsiComponent,
    AbsenceComponent,
    AdminComponent,
    CalendarComponent,
    FeedbackComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    NotificationComponent,
    ParentComponent,
    StudentComponent,
    SubjectComponent,
    TeacherComponent,
    GradeTeacherComponent,
    HomeComponent,
    GradesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
