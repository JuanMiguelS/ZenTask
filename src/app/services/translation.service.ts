import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // Asegúrate de importar el servicio de ngx-translate

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    // Definir los idiomas disponibles
    this.translate.addLangs(['en', 'es']);
    const language = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(language);
  }

  setLanguage(language: string): void {
    // Cambiar el idioma con ngx-translate
    this.translate.use(language);

    // Actualizar el idioma en el documento
    document.documentElement.lang = language;

    // Guardar el idioma en localStorage
    localStorage.setItem('language', language);
  }
}
