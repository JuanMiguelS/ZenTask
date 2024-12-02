import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  setLanguage(lang: string) {
    localStorage.setItem('language', lang);
    location.reload(); // Recargar para aplicar cambios de idioma
  }

  getLanguage(): string {
    return localStorage.getItem('language') || 'en';
  }
}
