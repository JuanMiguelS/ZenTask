import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { TranslationService } from '../../services/translation.service';

@Component({
  standalone: true, // Declarar que es un standalone component
  selector: 'app-config',
  template: `
    <h2 i18n="@@config-title">Configuración</h2>
    <button *ngFor="let lang of supportedLanguages" (click)="switchLanguage(lang)">
      {{ lang | uppercase }} <!-- Esto ahora funcionará -->
    </button>
  `,
  styles: [
    `
      button {
        margin: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
      }
    `,
  ],
  imports: [CommonModule], // Asegúrate de importar CommonModule
})
export class ConfigComponent {
  supportedLanguages = ['en', 'es'];

  constructor(private translationService: TranslationService) {}

  switchLanguage(lang: string): void {
    console.log(`Idioma cambiado a: ${lang}`);
    this.translationService.changeLanguage(lang);
  }
}
