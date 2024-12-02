import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private supportedLanguages = ['en', 'es'];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  changeLanguage(lang: string): void {
    if (this.supportedLanguages.includes(lang)) {
      const currentUrl = this.document.location.href;
      const newUrl = currentUrl.replace(/(\?lang=)[a-z]{2}/, `$1${lang}`);
      this.document.location.href = newUrl;
    }
  }

  getCurrentLanguage(): string {
    const urlParams = new URLSearchParams(this.document.location.search);
    return urlParams.get('lang') || 'en';
  }
}
