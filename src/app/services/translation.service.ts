import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = 'en';
  private translations: any = {}; // Aquí guardaremos las traducciones

  constructor(private http: HttpClient) {}

  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.loadTranslations(lang);
  }
  private loadTranslations(lang: string): void {
    const translationFilePath = `assets/i18n/messages.${lang}.xlf`;

    this.http.get(translationFilePath, { responseType: 'text' }).pipe(
      map((xmlContent: string) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, 'application/xml');
        const units = xmlDoc.getElementsByTagName('trans-unit');

        // Convertimos el HTMLCollection a un array
        const unitsArray = Array.from(units);
        const translationObj: any = {};

        // Ahora podemos iterar sobre unitsArray
        unitsArray.forEach((unit: Element) => {
          const id = unit.getAttribute('id');
          const target = unit.getElementsByTagName('target')[0]?.textContent; // Añadido el operador de encadenamiento opcional

          // Verificamos que 'id' no sea null o undefined antes de asignarlo
          if (id && target) {
            translationObj[id] = target;
          }
        });

        return translationObj;
      })
    ).subscribe({
      next: (translations) => {
        this.translations = translations;
        console.log(`Traducciones cargadas para ${lang}:`, this.translations);
      },
      error: (err) => {
        console.error('Error al cargar las traducciones:', err);
      },
    });
  }


  getTranslation(key: string): string {
    return this.translations[key] || key;
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}
