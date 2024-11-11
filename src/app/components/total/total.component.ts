import { Component, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../Models/Item';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
@Component({
  selector: 'app-total',
  standalone: true,
  imports: [],
  templateUrl: './total.component.html',
  styleUrl: './total.component.css'
})
export class TotalComponent implements OnInit {
@Input() total: number = 0;
@Input()  message:string ='';
constructor(){}
ngOnInit(): void {
}
}
