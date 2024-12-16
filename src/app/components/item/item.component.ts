import { Component, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../Models/Item';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { CounterPageComponent } from '../counter-page/counter-page.component';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, CounterPageComponent, AddItemComponent],  // Asegúrate de incluir CommonModule
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item = new Item();
  @Output() deleteItem: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() toggleItem: EventEmitter<Item> = new EventEmitter<Item>();
  constructor() {}

  ngOnInit(): void {}

  onDelete(item: Item): void {
    this.deleteItem.emit(item);
  }

  onToggle(item: Item): void {
    item.completed = !item.completed;
    this.toggleItem.emit(item);
  }
}
