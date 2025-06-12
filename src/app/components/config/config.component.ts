import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';

@Component({
  standalone: true,
  selector: 'app-config',
  template: `
    <h2>{{ getTranslation('Settings') }}</h2>

    <div>
      <button *ngFor="let lang of supportedLanguages" (click)="switchLanguage(lang)">
        {{ lang | uppercase }}
      </button>
    </div>
    <div class="qr-block">
  <h3 class="qr-title">🚀 Zentask Web App For Mobile</h3>
  <div class="qr-container">
    <qrcode
      [qrdata]="'https://zentask.app'"
      [width]="128"
      [errorCorrectionLevel]="'M'">
    </qrcode>
  </div>
</div>
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
  imports: [CommonModule, QRCodeModule],
})
export class ConfigComponent {
  supportedLanguages = ['en', 'es'];

  constructor(private translationService: TranslationService) {}

  switchLanguage(lang: string): void {
    console.log(`Idioma cambiado a: ${lang}`);
    this.translationService.changeLanguage(lang);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
   changeLanguage(language: string) {
    this.translationService.changeLanguage(language);
  }
}
