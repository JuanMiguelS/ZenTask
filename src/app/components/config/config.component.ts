import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-config',
  standalone: true,
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  constructor(private translationService: TranslationService) {}

  switchLanguage(language: string) {
    this.translationService.setLanguage(language);
  }
}
