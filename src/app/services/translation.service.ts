import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = 'en';

  constructor(private http: HttpClient) {}

  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: string): void {
    const translationFilePath = `assets/i18n/messages.${lang}.xlf`; // Ruta correcta a los archivos

    this.http.get(translationFilePath, { responseType: 'text' }).subscribe({
      next: (translations) => {
        console.log(`Traducciones cargadas para ${lang}:`, translations);
        // Aquí podrías aplicar las traducciones cargadas.
      },
      error: (err) => {
        console.error('Error al cargar las traducciones:', err);
      },
    });
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}
