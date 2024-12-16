import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../Models/Item';
import { TranslationService } from '../../services/translation.service'; // Importar TranslationService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de incluir CommonModule
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item = new Item();
  @Output() deleteItem: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() toggleItem: EventEmitter<Item> = new EventEmitter<Item>();

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {}

  onDelete(item: Item): void {
    this.deleteItem.emit(item);
  }

  onToggle(item: Item): void {
    item.completed = !item.completed;
    this.toggleItem.emit(item);
  }

  // Método para obtener la traducción del botón
  getDeleteButtonText(): string {
    return this.translationService.getTranslation('Delete');
  }
}
