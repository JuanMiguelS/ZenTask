import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../Models/Item';
import { TranslationService } from '../../services/translation.service'; // Importar TranslationService
import { CommonModule } from '@angular/common';
import { CounterPageComponent } from '../counter-page/counter-page.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, CounterPageComponent, AddItemComponent, TranslatePipe],  // Asegúrate de incluir CommonModule
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
showConfirmDialog = false;
itemToDelete: Item | null = null;

onAskDelete(item: Item): void {
  this.itemToDelete = item;
  this.showConfirmDialog = true;
}

confirmDelete(): void {
  if (this.itemToDelete) {
    this.deleteItem.emit(this.itemToDelete);
  }
  this.closeDialog();
}

closeDialog(): void {
  this.showConfirmDialog = false;
  this.itemToDelete = null;
}


dragOffsetX = 0;
dragOffsetY = 0;
isDragging = false;

startDragging(event: MouseEvent): void {
  const modal = (event.target as HTMLElement).closest('.confirm-content') as HTMLElement;
  if (!modal) return;

  // Eliminar el transform para permitir el movimiento libre
  modal.style.transform = 'none';

  // Guardar la posición inicial del cursor
  this.dragOffsetX = event.clientX - modal.offsetLeft;
  this.dragOffsetY = event.clientY - modal.offsetTop;
  this.isDragging = true;

  const onMouseMove = (e: MouseEvent) => {
    if (this.isDragging) {
      modal.style.left = `${e.clientX - this.dragOffsetX}px`;
      modal.style.top = `${e.clientY - this.dragOffsetY}px`;
    }
  };

  const onMouseUp = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key); // Usamos el servicio para obtener la traducción
  }

}
