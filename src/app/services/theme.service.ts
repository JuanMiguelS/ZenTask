import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);
  theme$ = this.darkTheme.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const saved = localStorage.getItem('isDarkTheme');
      this.setDarkTheme(saved === 'true');
    }
  }

  isDarkTheme(): boolean {
    return this.darkTheme.value;
  }

  toggleTheme(): void {
    const newTheme = !this.darkTheme.value;
    this.setDarkTheme(newTheme);
  }

  private setDarkTheme(isDark: boolean): void {
    this.darkTheme.next(isDark);
    if (this.isBrowser) {
      document.body.classList.toggle('dark-mode', isDark);
      document.body.classList.toggle('light-mode', !isDark);
      localStorage.setItem('isDarkTheme', String(isDark));
    }
  }
}
