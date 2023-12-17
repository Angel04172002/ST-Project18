import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRange, MatCalendar, MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { UserService } from 'src/app/user/user.service';
import { HttpService } from 'src/app/@backend/services/http.service';
import { firstValueFrom } from 'rxjs';
import { AddEventsModel } from 'src/app/@backend/models/add-event.model';
import { MatSelectModule } from '@angular/material/select';

export interface Event{
  date: Date,
  title: string,
  place: string,
  description: string,
  privacy: boolean
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule
  ],
  standalone: true
})
export class CalendarComponent implements OnInit{
  constructor(
    private userService: UserService,
    private http: HttpService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getEvents().then(() => {
      this.hasLoaded = true;
    });

  }

  userType(){
    return this.userService.user?.type;
  }

  @ViewChild(MatCalendar, { static: false }) calendar!: MatCalendar<Date>;
  selected!: Date | null;

  @ViewChild('showDialog') showDialog!: TemplateRef<any>; 
  dialogRef: any;

  hasLoaded = false;
  privateSelectValues: string[] = ['Частно събитие', 'Публично събитие']

  events!: Event[];
  async addEvent(event: Event) {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type
    }

    let req: any;

    if(type === 'Teacher'){

      let events: AddEventsModel = {
        name: event.title,
        description: event.description,
        date: event.date,
        place: event.place,
        teacher_creator_id: id,
        grade_teacher_creator_id: undefined,
        admin_creator_id: undefined,
        isPrivate: event.privacy
      }

      req = this.http.addEvent(events);

    } else if(type === 'Grade teacher'){

      let events: AddEventsModel = {
        name: event.title,
        description: event.description,
        date: event.date,
        place: event.place,
        teacher_creator_id: undefined,
        grade_teacher_creator_id: id,
        admin_creator_id: undefined,
        isPrivate: event.privacy
      }

      req = this.http.addEvent(events);

    } else if(type === 'Admin'){

      let events: AddEventsModel = {
        name: event.title,
        description: event.description,
        date: event.date,
        place: event.place,
        teacher_creator_id: undefined,
        grade_teacher_creator_id: undefined,
        admin_creator_id: id,
        isPrivate: event.privacy
      }

      req = this.http.addEvent(events);

    }

      try {
        await firstValueFrom(req)
          .then(data => {
  
            console.log(data);
  
          })
      } catch (err) {
        console.log(err)
      }

  }

  async getEvents() {
    let user = this.userService.getUser();
    let id = '';
    let type = '';

    if (user) {
      id = user.id;
      type = user.type;
    }

    this.events = [];
    if (type === 'Teacher' || type === 'Grade teacher' || type === 'Admin') {

      await firstValueFrom(this.http.getAllEvents())
        .then(data => {
          for (let item of data) {

            let eventsDataArray = {
              date: new Date(item.date),
              title: item.title,
              place: item.place,
              description: item.description,
              privacy: item.isPrivate
            }

            this.events.push(eventsDataArray);

          }

        })
    
    } else if (type === 'Student') {

      await firstValueFrom(this.http.getEventsByStudent(id))
        .then(data => {
          for (let item of data) {

            let eventsDataArray = {
              date: new Date(item.date),
              title: item.title,
              place: item.place,
              description: item.description,
              privacy: item.isPrivate
            }

            this.events.push(eventsDataArray);

          }

        })
    
    } else if (type === 'Parent') {

      await firstValueFrom(this.http.getEventsByParent(id))
        .then(data => {
          for (let item of data) {

            let eventsDataArray = {
              date: new Date(item.date),
              title: item.title,
              place: item.place,
              description: item.description,
              privacy: item.isPrivate
            }

            this.events.push(eventsDataArray);

          }

        })
    
    }

  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.events
        .map(eventDate => eventDate.date)
        .some(d => d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate());

      return highlightDate ? 'event-date' : '';
    };
  

  onSend(form: NgForm) {
    const eventTitle = form.value.title;
    const eventDate = new Date(form.value.date + 'T' + form.value.time + ':00Z');
    const eventDescription = form.value.description;
    const eventPlace = form.value.place;
    const eventPrivacy = form.value.isPrivate;

    let isPrivate: boolean;
    eventPrivacy == 'Частно събитие' ? isPrivate = true : isPrivate = false;

    const event = { 
      date: eventDate, 
      title: eventTitle, 
      place: eventPlace, 
      description: eventDescription, 
      privacy: isPrivate
    }
    
    this.addEvent(event).then(() => {
      this.calendarRefresh();
      form.resetForm();

    });

  }

  calendarRefresh() {
    if (this.calendar) {
      this.calendar.monthView._init();
    }
  }

  selectedEventTitle : any;
  selectedEventDate : any;
  selectedEventPlace : any;
  selectedEventDescription : any;

  eventsCondition(date : Date, event : Date) : boolean{
    return date.getFullYear() === event.getFullYear() && date.getMonth() === event.getMonth() && date.getDate() === event.getDate();
  }

  onSelectedChange(event: any) {
    const eventSelected = this.events
        .map(eventDate => eventDate.date)
        .some(d => this.eventsCondition(event, d));

    const result = this.events.filter((e) => this.eventsCondition(event, e.date));

    if (eventSelected){
      this.selectedEventTitle = result[0].title;
      this.selectedEventDate = result[0].date.toLocaleDateString();
      this.selectedEventPlace = result[0].place;
      this.selectedEventDescription = result[0].description;

      this.dialogRef = this.dialog.open(this.showDialog, {
        minWidth: "400px"
      });
    } 
  }

}
