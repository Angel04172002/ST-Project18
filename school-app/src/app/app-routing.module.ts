import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { GradesComponent } from './pages/grades/grades.component';
import { StudentComponent } from './user/details/student.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { NoteComponent } from './pages/note/note.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { GroupChatComponent } from './pages/chat/group-chat/group-chat.component';
import { AbsenceComponent } from './pages/absence/absence.component';
import { ForumComponent } from './pages/forum/forum/forum.component';
import { DetailsComponent } from './pages/forum/details/details.component';
import { ProfileComponent } from './pages/profile/profile.component';


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
    path: 'group-chat',
    component: GroupChatComponent
  },
  {
    path: 'admin-students',
    component: AdminComponent
  },
  {
    path: 'forum',
    component: ForumComponent
  },
  {
    path: 'forum/:id',
    component: DetailsComponent
  },
  {
    path: 'details',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

