import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = 'en';
  private translations: any = {};
  private languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentLanguage);
  public translationsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTranslations(this.currentLanguage); // 🔁 Carga inicial
    }
  }

  changeLanguage(lang: string): void {
    if (lang === this.currentLanguage) return; // ⚠️ Evitar carga innecesaria
    this.translationsLoaded.next(false);
    this.currentLanguage = lang;
    this.languageSubject.next(lang);
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: string): void {
    const translationFilePath = `assets/i18n/messages.${lang}.xlf`;

    this.http.get(translationFilePath, { responseType: 'text' }).pipe(
      map((xmlContent: string) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, 'application/xml');
        const units = xmlDoc.getElementsByTagName('trans-unit');
        const translationObj: any = {};

        Array.from(units).forEach((unit: Element) => {
          const id = unit.getAttribute('id');
          const target = unit.getElementsByTagName('target')[0]?.textContent;
          const source = unit.getElementsByTagName('source')[0]?.textContent;
          const value = target?.trim() || source?.trim() || '';
          if (id && value) {
            translationObj[id] = value;
          }
        });

        return translationObj;
      })
    ).subscribe({
      next: (translations) => {
        this.translations = translations;
        this.translationsLoaded.next(true); // ✅ Marca como cargado
        console.log(`✅ Traducciones cargadas (${lang}):`, translations);
      },
      error: (err) => {
        console.error('❌ Error al cargar las traducciones:', err);
        this.translationsLoaded.next(false); // ❗ También marcar error
      },
    });
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  getLanguageObservable() {
    return this.languageSubject.asObservable();
  }

  forceReload(): void {
    this.loadTranslations(this.currentLanguage); // 🔁 Para recargar manualmente si lo necesitas
  }
}


