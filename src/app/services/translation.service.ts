import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';  // Si usas ngx-translate

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor() {}

  setLanguage(language: string): void {
    // Cambiar el idioma del atributo lang en el HTML
    document.documentElement.lang = language;

    // Guardar el idioma en el localStorage
    localStorage.setItem('language', language);

    // Cambiar el idioma en @angular/localize (Si está configurado)
    import('@angular/localize/init').then(() => {
      // Actualizar idioma en el contexto de Angular Localize
      console.log(`Idioma cambiado a: ${language}`);
      location.reload();
    });
  }
}

