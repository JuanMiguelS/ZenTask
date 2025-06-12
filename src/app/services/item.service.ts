import { Injectable } from '@angular/core';
import { Item } from '../Models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [
    new Item(0, 'study', 3900, 1200, false),        // 1h 5min
    new Item(1, 'work on code', 7200, 1800, false)  // 2h 0min
  ];

  constructor() {
    // Convertimos tiempos iniciales a formato hora:min:sec
    this.items.forEach(item => this.setTimeParts(item));
  }

  getItems() {
    return this.items;
  }

addItems(item: Item) {
  // Si el tiempo ya se calculó en AddItemComponent, no recalcular aquí
  this.items.unshift(item);
}

  private setTimeParts(item: Item): void {
    const totalSeconds = item.time;
    item.hour = Math.floor(totalSeconds / 3600);
    item.minute = Math.floor((totalSeconds % 3600) / 60);
    item.sec = Math.floor(totalSeconds % 60);
  }
}
