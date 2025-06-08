import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarConfigModule } from './calendar-config.module';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarConfigModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  daysInMonth: Date[] = [];
  emptyStartDays: number[] = [];
  currentMonthName: string = '';
  currentYear: number = 2025;
  startDayOfWeek: number = 0;

  viewDate: Date = new Date(2025, new Date().getMonth(), 1); // mes actual del año 2025
  selectedDate: Date | null = null;

  availableMonths: { month: number, year: number, label: string }[] = []; // NUEVO
  selectedMonthIndex: number = 0; // NUEVO
  
  events = [
    {
      start: new Date(),
      title: 'Evento de prueba',
      allDay: true
    }
  ];

  ngOnInit(): void {
    this.generateMonthRange();
    this.generateCalendar();
  }

  
  generateMonthRange(): void { // NUEVO
    const now = new Date(2025, new Date().getMonth(), 1); // Fijo en 2025
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
      this.availableMonths.push({
        month: monthDate.getMonth(),
        year: monthDate.getFullYear(),
        label: monthDate.toLocaleString('default', { month: 'long', year: 'numeric' })
      });
    }
    this.viewDate = new Date(this.availableMonths[0].year, this.availableMonths[0].month, 1);
    this.selectedMonthIndex = 0;
  }

  generateCalendar(): void {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    this.currentMonthName = startDate.toLocaleString('default', { month: 'long' });
    this.startDayOfWeek = startDate.getDay(); // Sunday = 0

    const totalDays = endDate.getDate();
    this.daysInMonth = Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1));
    this.emptyStartDays = Array.from({ length: this.startDayOfWeek }, (_, i) => i);
  }

  selectDate(date: Date): void { // NUEVO
    this.selectedDate = date;
  }

  addEvent(): void {
    if (!this.selectedDate) { // NUEVO
      alert('Selecciona un día del calendario antes de añadir un evento.'); // NUEVO
      return; // NUEVO
    }
    const title = prompt('Introduce el título del evento:');
    if (title) {
      const formattedTitle = title.replace(/- /g, '-\u00A0'); // reemplaza "- " por "- " (espacio no separable)
      this.events = [
        ...this.events,
      {
        title: formattedTitle,
        start: this.selectedDate,
        allDay: true
      }
     ];
      alert(`Evento "${title}" añadido.`);
}

  }

  getEventsForDay(day: Date): any[] {
    return this.events.filter(event =>
      event.start.getFullYear() === day.getFullYear() &&
      event.start.getMonth() === day.getMonth() &&
      event.start.getDate() === day.getDate()
    );
  }

  deleteEvent(eventToDelete: any): void { // NUEVO
    this.events = this.events.filter(event => event !== eventToDelete);
  }

    goToPreviousMonth(): void { // NUEVO
    if (this.selectedMonthIndex > 0) {
      this.selectedMonthIndex--;
      const { year, month } = this.availableMonths[this.selectedMonthIndex];
      this.viewDate = new Date(year, month, 1);
      this.generateCalendar();
    }
  }

  goToNextMonth(): void { // NUEVO
    if (this.selectedMonthIndex < this.availableMonths.length - 1) {
      this.selectedMonthIndex++;
      const { year, month } = this.availableMonths[this.selectedMonthIndex];
      this.viewDate = new Date(year, month, 1);
      this.generateCalendar();
    }
  }

  changeMonth(indexStr: string): void { // NUEVO
    const index = parseInt(indexStr, 10);
    this.selectedMonthIndex = index;
    const { year, month } = this.availableMonths[index];
    this.viewDate = new Date(year, month, 1);
    this.generateCalendar();
  }

  hasEventsInMonth(month: number, year: number): boolean {
    return this.events.some(event =>
      event.start.getFullYear() === year && event.start.getMonth() === month
    );
  }

}
  


