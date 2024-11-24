import { Component, OnInit } from '@angular/core';
import { Item } from '../../Models/Item';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';
import { TotalComponent } from "../total/total.component";  // Importa CommonModule
import { ItemService } from '../../services/item.service';
@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemComponent, CommonModule, TotalComponent],  // Asegúrate de importar CommonModule
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit{
  total: number = 0;
  items: Item[] =[];
  
  constructor(private itemService:ItemService) {
    
  }
  
  ngOnInit(): void {
  this.items = this.itemService.getItems();
  this.getTotal();  
}

  deleteItem(item: Item){
    this.items = this.items.filter(x => x.id != item.id);
          this.getTotal();
}
  toggleItem(item:Item){
    this.getTotal();
  }
  getTotal(){
   this.total = this.items.filter(x => !x.completed).map(item => item.timeLeft).reduce((acc,item)=> acc += item, 0);
    console.log(this.total);    
  }
}