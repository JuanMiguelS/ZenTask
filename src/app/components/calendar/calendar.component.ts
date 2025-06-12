import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarConfigModule } from './calendar-config.module';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../services/translation.service';
import { ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarConfigModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit, OnDestroy {
  weekDays: string[] = [];
  daysInMonth: Date[] = [];
  emptyStartDays: number[] = [];
  currentMonthName: string = '';
  currentYear: number = 2025;
  startDayOfWeek: number = 0;

  viewDate: Date = new Date(2025, new Date().getMonth(), 1);
  selectedDate: Date | null = null;

  availableMonths: { month: number, year: number, label: string }[] = [];
  selectedMonthIndex: number = 0;

  events: { title: string; start: Date; allDay: boolean }[] = [];

  currentLang: string = 'en';
  languageSubscription!: Subscription;
  loadingTranslations = true;

  translatedAddEvent: string = 'Add Event';
  private translationsLoadedSubscription!: Subscription;

  constructor(
    private translationService: TranslationService,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translationService.getCurrentLanguage();


      if (isPlatformBrowser(this.platformId)) {
    this.loadEventsFromStorage(); // ✅ Solo en navegador
  }

    this.translationsLoadedSubscription = this.translationService.translationsLoaded.subscribe(loaded => {
      if (loaded) {
        this.loadingTranslations = false;
        this.updateTranslations();
        this.generateWeekDays();
        this.generateMonthRange();
        this.generateCalendar();
        //this.checkUpcomingEvents();
        this.cdRef.detectChanges();
      }
    });

    this.languageSubscription = this.translationService.getLanguageObservable().subscribe(lang => {
      this.currentLang = lang;
      this.generateWeekDays();
      this.generateMonthRange();
      this.generateCalendar();
      this.updateTranslations();
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
    this.translationsLoadedSubscription?.unsubscribe();
  }

  updateTranslations(): void {
    this.translatedAddEvent = this.translationService.getTranslation('Add Event');
  }

  loadEventsFromStorage(): void {
    const stored = localStorage.getItem('calendar-events');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.events = parsed.map((event: any) => ({
          ...event,
          start: new Date(event.start)
        }));
      } catch {
        console.warn('Could not parse stored events.');
        this.events = [];
      }
    }
  }

  saveEventsToStorage(): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('calendar-events', JSON.stringify(this.events));
  }
}


  generateMonthRange(): void {
    const now = new Date(2025, new Date().getMonth(), 1);
    this.availableMonths = [];
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
      this.availableMonths.push({
        month: monthDate.getMonth(),
        year: monthDate.getFullYear(),
        label: monthDate.toLocaleString(this.currentLang, { month: 'long', year: 'numeric' })
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

    this.currentMonthName = startDate.toLocaleString(this.currentLang, { month: 'long' });
    this.startDayOfWeek = startDate.getDay();

    const totalDays = endDate.getDate();
    this.daysInMonth = Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1));
    this.emptyStartDays = Array.from({ length: this.startDayOfWeek }, (_, i) => i);
  }

  generateWeekDays(): void {
    const base = new Date(2025, 5, 1);
    const startOfWeek = base.getDate() - base.getDay();
    this.weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(base.setDate(startOfWeek + i));
      const label = day.toLocaleDateString(this.currentLang, { weekday: 'long' });
      return label.charAt(0).toUpperCase() + label.slice(1);
    });
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  addEvent(): void {
    if (!this.selectedDate) {
      alert(this.translationService.getTranslation('calendar-select-day-alert'));
      return;
    }

    const title = prompt(this.translationService.getTranslation('calendar-prompt-title'));
    if (title) {
      const formattedTitle = title.replace(/- /g, '-\u00A0');
      this.events = [
        ...this.events,
        {
          title: formattedTitle,
          start: this.selectedDate,
          allDay: true
        }
      ];
      this.saveEventsToStorage();
      const msg = this.translationService.getTranslation('calendar-event-added').replace('{title}', title);
      alert(msg);
    }
  }

  getEventsForDay(day: Date): any[] {
    return this.events.filter(event =>
      event.start.getFullYear() === day.getFullYear() &&
      event.start.getMonth() === day.getMonth() &&
      event.start.getDate() === day.getDate()
    );
  }

  deleteEvent(eventToDelete: any): void {
    this.events = this.events.filter(event => event !== eventToDelete);
    this.saveEventsToStorage();
  }

  goToPreviousMonth(): void {
    if (this.selectedMonthIndex > 0) {
      this.selectedMonthIndex--;
      const { year, month } = this.availableMonths[this.selectedMonthIndex];
      this.viewDate = new Date(year, month, 1);
      this.generateCalendar();
      this.generateWeekDays();
    }
  }

  goToNextMonth(): void {
    if (this.selectedMonthIndex < this.availableMonths.length - 1) {
      this.selectedMonthIndex++;
      const { year, month } = this.availableMonths[this.selectedMonthIndex];
      this.viewDate = new Date(year, month, 1);
      this.generateCalendar();
      this.generateWeekDays();
    }
  }

  changeMonth(indexStr: string): void {
    const index = parseInt(indexStr, 10);
    this.selectedMonthIndex = index;
    const { year, month } = this.availableMonths[index];
    this.viewDate = new Date(year, month, 1);
    this.generateCalendar();
    this.generateWeekDays();
  }

  hasEventsInMonth(month: number, year: number): boolean {
    return this.events.some(event => {
      const d = new Date(event.start);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  checkUpcomingEvents(): void {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcomingEvents = this.events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= today && eventDate <= nextWeek;
    });

    if (upcomingEvents.length > 0) {
      const message = this.translationService
        .getTranslation('calendar-upcoming-events')
        .replace('{count}', upcomingEvents.length.toString());

      this.showNotification(message);
    }
  }

  showNotification(message: string): void {
    const notification = document.createElement('div');
    notification.className = 'calendar-toast';
    notification.textContent = message;

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }
}
