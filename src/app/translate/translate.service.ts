import { Injectable } from '@angular/core';
import { Inject, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(@Inject(LOCALE_ID) private localeId: string, private translate: TranslateService) {}

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
