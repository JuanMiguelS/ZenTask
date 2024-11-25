import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';  // Asegúrate de que está importado

@Component({
  selector: 'app-config',
  standalone: true, // Si estás usando standalone component
  imports: [TranslateModule],  // Asegúrate de que TranslateModule esté en los imports
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  constructor(private translate: TranslateService) {
    // Establece el idioma por defecto
    this.translate.setDefaultLang('en');
    // Establece el idioma inicial si ya tienes uno predefinido
    this.translate.use('en');
  }

  changeLanguage(language: string) {
    console.log(`Cambiando idioma a: ${language}`);
    this.translate.use(language);
  }
}
