import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GradesComponent } from './grades/grades.component';
import { ChatComponent } from './chat/chat/chat.component';
import { StudentComponent } from './user/student/student.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AbsenceComponent } from './absence/absence.component';
import { NoteComponent } from './note/note.component';
import { AdminComponent } from './user/admin/admin.component';

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
  },
  {
      path: 'home',
      component: HomeComponent
  },
  {
    path: 'absence',
    component: AbsenceComponent
  },
  {
    path: 'note',
    component: NoteComponent
  },
  {
      path: 'calendar',
      component: CalendarComponent   
  },
  {
      path: 'grades',
      component: GradesComponent
  },
  {
      path: 'chat',
      component: ChatComponent
  },
  {
      path: 'student-profile',
      component: StudentComponent
  },
  {
    path: 'admin-students',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

