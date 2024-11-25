import { Component } from '@angular/core';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  constructor() {}

  // Cambia el idioma
  changeLanguage(lang: string): void {
    
  }
}