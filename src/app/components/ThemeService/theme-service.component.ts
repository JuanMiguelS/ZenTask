import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedMode = localStorage.getItem('darkMode');
      const isDark = savedMode === 'true';
      this.darkModeSubject.next(isDark);
      this.updateBodyClass(isDark);
    }
  }

  toggleDarkMode(): void {
    const isDark = !this.darkModeSubject.value;
    this.setDarkMode(isDark);
  }

  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('darkMode', String(isDark));
    }
    this.updateBodyClass(isDark);
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  private updateBodyClass(isDark: boolean): void {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark-mode', isDark);
      document.body.classList.toggle('light-mode', !isDark);
    }
  }
}
