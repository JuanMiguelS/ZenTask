import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../Models/Item';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { CounterPageComponent } from '../counter-page/counter-page.component';
import { Timer } from '../../Models/Timer';
import { TimerService } from '../../services/timer.service';
@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <h2>{{ getTranslation('Register New Task') }}</h2>
      <div>
        <label for="id" i18n>{{ getTranslation('Id') }}</label>
        <input type="number" [(ngModel)]="id" name="id" required>
      </div>
      <div>
        <label for="name" i18n>{{ getTranslation('Name Of The Task') }}</label>
        <input type="text" [(ngModel)]="title" name="name" required>
      </div>
      <div>
        <label for="time" i18n>{{ getTranslation('Time') }}</label>
        <input type="number" [(ngModel)]="time" name="time" required>
      </div>
      <div>
        <label for="timeLeft" i18n>{{ getTranslation('Time Left') }}</label>
        <input type="number" [(ngModel)]="timeLeft" name="timeLeft" required>
      </div>
      <input type="submit" value="{{ getTranslation('Confirm') }}">
    </form>
  `,
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  id: number = 0;
  title: string = '';
  time: number = 0;
  timeLeft: number = 0;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private translationService: TranslationService // Inyectamos el servicio de traducción
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const item = new Item();
    item.id = this.id;
    item.title = this.title;
    item.time = this.time;
    item.timeDone = this.timeLeft;
    item.completed = false;

    this.itemService.addItems(item);
    this.router.navigate(['/']);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key); // Usamos el servicio para obtener la traducción
  }
}
