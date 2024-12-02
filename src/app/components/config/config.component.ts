import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { TranslationService } from '../../services/translation.service';

@Component({
  standalone: true, // Declarar que es un standalone component
  selector: 'app-config',
  template: `
    <h2>{{ 'SETTINGS.TITLE' }}</h2>
    <button *ngFor="let lang of supportedLanguages" (click)="changeLanguage(lang)">
      {{ lang | uppercase }}
    </button>
  `,
  styles: [`
    button {
      margin: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
  `],
  imports: [CommonModule], // Importar CommonModule para habilitar pipes y otras funcionalidades básicas
})
export class ConfigComponent {
  supportedLanguages = ['en', 'es'];

  constructor(private translationService: TranslationService) {}

  changeLanguage(lang: string): void {
    this.translationService.changeLanguage(lang);
  }
}
