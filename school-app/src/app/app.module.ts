import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbsenceComponent } from './absence/absence.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';

import { NavigationComponent } from './core/navigation/navigation.component';
import { NotificationComponent } from './notification/notification.component';

import { StudentComponent } from './user/student/student.component';
import { SubjectComponent } from './subject/subject.component';

import { HomeComponent } from './home/home.component';
import { GradesComponent } from './grades/grades.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserModule } from './user/user.module';
import { UserRoutingModule } from './user/user-routing.module';
import { NoteComponent } from './note/note.component';
import { ChatModule } from './chat/chat.module';
import { AppLoaderComponent } from './shared/app-loader/app-loader.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AbsenceComponent,
    CalendarComponent,
    FeedbackComponent,
    NotificationComponent,
    SubjectComponent,
    HomeComponent,
    GradesComponent,
    HomeComponent,
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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
