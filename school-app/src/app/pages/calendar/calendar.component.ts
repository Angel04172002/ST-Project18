import { ChangeDetectorRef, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRange, MatCalendar, MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';


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
    MatDividerModule
  ],
  standalone: true
})
export class CalendarComponent {
  @ViewChild(MatCalendar, { static: false }) calendar!: MatCalendar<Date>;
  selected!: Date | null;

  @ViewChild('showDialog') showDialog!: TemplateRef<any>; 
  dialogRef: any;

  constructor(
    private dialog: MatDialog
    ) { }

  events = [
    { date: new Date(2023, 11, 12), title: 'Event 1' },
    { date: new Date(2023, 11, 22), title: 'Event 2' },
    // ... other events
  ];

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.events
        .map(eventDate => eventDate.date)
        .some(d => d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate());

      return highlightDate ? 'event-date' : '';
    };
  }

  onSend(form: NgForm) {
    const eventTitle = form.value.title;
    const eventDate = new Date(form.value.date + 'T' + form.value.time + ':00Z');
    console.log(form.value.date)

    const event = { date: eventDate, title: eventTitle }
    this.events.push(event);

    this.calendarRefresh();
    form.reset();
  }

  calendarRefresh() {
    if (this.calendar) {
      this.calendar.monthView._init();
    }
  }

  selectedEventTitle : any;
  selectedEventDate : any;

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
      this.dialogRef = this.dialog.open(this.showDialog, {
        minWidth: "400px"
      });
    } 
  }

}
