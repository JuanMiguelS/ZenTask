import { Component, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../Models/Item';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service'; // Importar TranslationService
import { CounterPageComponent } from '../counter-page/counter-page.component';
import { AddItemComponent } from '../add-item/add-item.component';
export class TuComponente {
  message = 'Mensaje de ejemplo';
  total = 100;
  item1 = '';
  item2 = '';
  item3 = '';
  item4 = '';
}

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
 constructor(private translationService: TranslationService) {}

ngOnInit(): void {
}

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key); // Usamos el servicio para obtener la traducción
  }
}
