import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarConfigModule } from './calendar-config.module';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [    CommonModule, CalendarConfigModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1); // ejemplo: 30 días

  viewDate: Date = new Date();

  events = [
    {
      start: new Date(),
      title: 'Evento de prueba',
      allDay: true
    }
  ];

  addEvent(): void {
    const title = prompt('Introduce el título del evento:');
    if (title) {
      this.events = [
        ...this.events,
        {
          title,
          start: new Date(),
          allDay: true
        }
      ];
    }
  }
}
