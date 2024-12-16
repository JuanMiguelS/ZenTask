import { Component } from '@angular/core';

@Component({
  selector: 'app-translation',
  standalone: true,
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {
  currentLanguage: string = 'en';

  changeLanguage(language: string): void {
    this.currentLanguage = language;
    console.log(`Language changed to: ${language}`);
    // Aquí puedes integrar lógica de i18n si usas ngx-translate o Angular i18n.
  }
}
