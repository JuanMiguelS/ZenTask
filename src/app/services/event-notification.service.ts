import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class EventNotificationService {
  private alreadyNotified = false;
  private lastNotifiedLang: string | null = null;

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.translationService.translationsLoaded.subscribe((loaded) => {
        if (loaded) {
          const currentLang = this.translationService.getCurrentLanguage();

          // 1. Primera vez en la app
          if (!this.alreadyNotified) {
            this.alreadyNotified = true;
            this.lastNotifiedLang = currentLang;
            this.checkEventsOnceOnStartup();
          }

          // 2. Cambio de idioma (incluso si se vuelve a un idioma anterior)
          else if (currentLang !== this.lastNotifiedLang) {
            this.lastNotifiedLang = currentLang;
            this.checkEventsOnceOnStartup();
          }
        }
      });
    }
  }

  private checkEventsOnceOnStartup(): void {
    const stored = localStorage.getItem('calendar-events');
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const upcomingEvents = parsed.filter((event: any) => {
        const eventDate = new Date(event.start);
        return eventDate >= today && eventDate <= nextWeek;
      });

      if (upcomingEvents.length > 0) {
        const message = this.translationService
          .getTranslation('calendar-upcoming-events')
          .replace('{count}', upcomingEvents.length.toString());

        this.showNotification(message);
      }
    } catch {
      console.warn('Failed to parse stored calendar events.');
    }
  }

  private showNotification(message: string): void {
    const notification = document.createElement('div');
    notification.className = 'calendar-toast';

    const text = document.createElement('span');
    text.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖';
    closeBtn.className = 'toast-close-btn';
    closeBtn.onclick = () => notification.remove();

    notification.appendChild(text);
    notification.appendChild(closeBtn);
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }
}
