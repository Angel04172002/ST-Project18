import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { GradesComponent } from '../grades/grades.component';
import { ChatComponent } from '../chat/chat/chat.component';
import { StudentComponent } from '../user/student/student.component';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';

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
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CoreRoutingModule { }