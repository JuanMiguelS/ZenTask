import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { ItemsComponent } from '../app/components/items/items.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { ItemComponent } from "./components/item/item.component";
import { TotalComponent } from "./components/total/total.component";
import { TranslateModule } from '@ngx-translate/core'; // Asegúrate de que TranslateModule esté importado
import { CounterPageComponent } from './components/counter-page/counter-page.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NgClass } from '@angular/common';
import { EventNotificationService } from './services/event-notification.service';
import { ColorPuzzleComponent } from './components/color-puzzle/color-puzzle.component';

import { ThemeService } from './components/ThemeService/theme-service.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    ItemsComponent,
    HeaderComponent,
    CounterPageComponent,
    CalendarComponent,
    ColorPuzzleComponent,
    ItemComponent,
    TotalComponent,
    TranslateModule, // Asegúrate de que TranslateModule está en los imports del componente
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'ZenTask';
  isDarkMode = false;

  constructor(private router: Router, private eventNotificationService: EventNotificationService,
    public themeService : ThemeService,
  ) {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    body.classList.toggle('dark-mode', this.isDarkMode);
    body.classList.toggle('light-mode', !this.isDarkMode);
  }



}



