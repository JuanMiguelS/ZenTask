import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  supportedLanguages = ['en', 'es'];  // Languages supported by your app

  constructor(private translationService: TranslationService) { }

  // Method to switch the language
  switchLanguage(lang: string): void {
    console.log(`Idioma cambiado a: ${lang}`);
    this.translationService.changeLanguage(lang);  // Change the language through the service
  }

  // Method to get translations based on the key
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);  // Fetch translation for the key
  }

  // This function is similar to what you've used in ConfigComponent
  changeLanguage(language: string): void {
    this.translationService.changeLanguage(language);  // This updates the language globally
  }

  ngOnInit() {
    // You can perform initialization tasks here if needed
  }
}
