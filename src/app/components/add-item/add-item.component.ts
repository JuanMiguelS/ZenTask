import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../Models/Item';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <h2>{{ getTranslation('Register New Task') }}</h2>

      <div>
        <label for="id">{{ getTranslation('Id') }}</label>
        <input type="number" [(ngModel)]="id" name="id" required>
      </div>

      <div>
        <label for="title">{{ getTranslation('Name Of The Task') }}</label>
        <input type="text" [(ngModel)]="title" name="title" required>
      </div>

      <div>
        <label for="hour">{{ getTranslation('Hours') }}</label>
        <input type="number" [(ngModel)]="hour" name="hour" min="0" required>
      </div>

      <div>
        <label for="minute">{{ getTranslation('Minutes') }}</label>
        <input type="number" [(ngModel)]="minute" name="minute" min="0" required>
      </div>

      <div>
        <label for="sec">{{ getTranslation('Seconds') }}</label>
        <input type="number" [(ngModel)]="sec" name="sec" min="0" required>
      </div>

      <input type="submit" [value]="getTranslation('Confirm')">
    </form>
  `,
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  id = 0;
  title = '';
  hour = 0;
  minute = 0;
  sec = 0;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const item = new Item();
    item.id = this.id;
    item.title = this.title;
    item.hour = this.hour;
    item.minute = this.minute;
    item.sec = this.sec;

    item.time = (this.hour * 3600) + (this.minute * 60) + this.sec;
    item.timeDone = 0; // se inicia sin tiempo completado
    item.completed = false;

    this.itemService.addItems(item);
    this.router.navigate(['/']);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
