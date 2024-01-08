import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JitsiComponent } from './chat/jitsi/jitsi.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GradesComponent } from './grades/grades.component';
import { HomeComponent } from './home/home.component';
import { NoteComponent } from './note/note.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    JitsiComponent,
    CalendarComponent,
    GradesComponent,
    HomeComponent,
    NoteComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
