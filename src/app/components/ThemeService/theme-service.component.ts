// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = false;

  constructor() {
    this.loadTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveTheme();
  }

  isDarkTheme() {
    return this.isDarkMode;
  }

  private loadTheme() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
      } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode = systemPrefersDark;
      }
      this.applyTheme();
    }
  }

  private saveTheme() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  private applyTheme() {
    if (typeof document !== 'undefined') {
      const body = document.body;
      body.classList.toggle('dark-theme', this.isDarkMode);
      body.classList.toggle('light-theme', !this.isDarkMode);
    }
  }
}
