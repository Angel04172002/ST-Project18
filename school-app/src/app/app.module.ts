import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { AbsenceComponent } from './absence/absence.component';
import { AdminComponent } from './admin/admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './footer/footer.component';
import { ForumComponent } from './forum/forum.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotificationComponent } from './notification/notification.component';
import { ParentComponent } from './parent/parent.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent } from './student/student.component';
import { SubjectComponent } from './subject/subject.component';
import { TeacherComponent } from './teacher/teacher.component';
import { GradeTeacherComponent } from './grade-teacher/grade-teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    JitsiComponent,
    AbsenceComponent,
    AdminComponent,
    CalendarComponent,
    ChatComponent,
    FeedbackComponent,
    FooterComponent,
    ForumComponent,
    HeaderComponent,
    LoginComponent,
    NavigationComponent,
    NotificationComponent,
    ParentComponent,
    ProfileComponent,
    RegisterComponent,
    StudentComponent,
    SubjectComponent,
    TeacherComponent,
    GradeTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
