import { Injectable } from '@angular/core';
import { Item } from '../Models/Item';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  [x: string]: any;

  items:Item[] =  [  
    { id: 0, title: 'study', time: 10.5, timeLeft: 4, completed: false },
    { id: 1, title: 'work on code', time: 8, timeLeft: 3, completed: false }
 ];

  constructor() { }

  getItems(){
    return this.items;
  }
  addItems(item:Item){
    this.items.unshift(item);
  }
}
