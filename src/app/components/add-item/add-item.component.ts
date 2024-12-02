import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../Models/Item';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <h2>Register New Task</h2>
      <div>
        <label for="" i18n>Id</label>
        <input type="number" [(ngModel)]="id" name="id">
      </div>
      <div>
        <label for="name" i18n>Name of the Task</label>
        <input type="text" [(ngModel)]="title" name="name">
      </div>
      <div>
        <label for="time" i18n>Time</label>
        <input type="number" [(ngModel)]="time" name="time">
      </div>
      <div>
        <label for="timeLeft" i18n>TimeLeft</label>
        <input type="number" [(ngModel)]="timeLeft" name="timeLeft">
      </div>
      <input type="submit" value="Confirm">
    </form>
  `,
  styleUrls: ['./add-item.component.css']  // Asegúrate de que el archivo CSS está correctamente referenciado
})

export class AddItemComponent implements OnInit {
  id: number = 0;
  title: string = '';
  time: number = 0;       // Cambié de 'price' a 'time'
  timeLeft: number = 0;   // Cambié de 'quantity' a 'timeLeft'

  constructor(private ItemService: ItemService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const item = new Item();
    item.id = this.id;
    item.title = this.title;
    item.time = this.time;       // Asegúrate de que 'price' es correcto
    item.timeDone = this.timeLeft; // Asegúrate de que 'quantity' es correcto
    item.completed = false;

    this.ItemService.addItems(item);
    this.router.navigate(['/']);
  }
}
