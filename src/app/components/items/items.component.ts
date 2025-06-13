import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../Models/Item';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';
import { TotalComponent } from "../total/total.component";
import { ItemService } from '../../services/item.service';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TimerService } from '../../services/timer.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  standalone: true,
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [
    ItemComponent,
    CommonModule,
    TotalComponent,
    TranslatePipe
  ]
})
export class ItemsComponent implements OnInit, OnDestroy {
  totalMessage: string = '';   // Mensaje para mostrar el texto traducido
  total: number = 0;           // Total en segundos (número)
  items: Item[] = [];
  languageSubscription: Subscription | undefined;

  constructor(
    private itemService: ItemService,
    private translationService: TranslationService,
    private timerService: TimerService,
    private router: Router

  ) {}


  ngOnInit(): void {


  this.items = this.itemService.getItems();
  this.calculateTotal();
  this.updateTotalMessage();

  this.languageSubscription = this.translationService.getLanguageObservable().subscribe(() => {
    this.updateTotalMessage();
  });




}
getTranslation(key: string): string {
  return this.translationService.getTranslation(key);
}



calculateTotal() {
  this.total = this.items
    .filter(x => !x.completed)
    .map(item => item.time - item.timeDone)
    .reduce((acc, curr) => acc + curr, 0);

  this.updateTotalMessage();
}

private updateTotalMessage() {
  const baseMessage = this.translationService.getTranslation('Total time left');
  this.totalMessage = `${baseMessage}: ${this.formatTime(this.total)}`;
}

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }

  deleteItem(item: Item) {
    this.items = this.items.filter(x => x.id !== item.id);
    this.calculateTotal();
  }

  toggleItem(item: Item) {
    this.calculateTotal();
  }



  get formattedTotal(): string {
    return this.formatTime(this.total);
  }

  private formatTime(totalSeconds: number): string {
    if (typeof totalSeconds !== 'number' || isNaN(totalSeconds)) return '00:00:00';

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  sendToTimer(item: Item) {
  // Calcular horas, minutos, segundos restantes de esta tarea
  const remainingSeconds = item.time - item.timeDone;
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  // Añadir el timer directamente con partes (sin usar string)
  this.timerService.addTimerFromParts(item.title, hours, minutes, seconds, false, 0);

  this.router.navigate(['/timers']);
}

}
