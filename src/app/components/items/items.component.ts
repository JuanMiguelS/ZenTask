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
import { TranslatePipe } from '../../pipes/translate.pipe'; // ✅ Asegúrate que esta ruta es correcta

@Component({
  standalone: true,
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [
    ItemComponent,
    CommonModule,
    TotalComponent,
    TranslatePipe // ✅ Importar el pipe
  ]
})
export class ItemsComponent implements OnInit, OnDestroy {
  total: number = 0;
  items: Item[] = [];
  totalMessage: string = '';
  private languageSubscription: Subscription | undefined;

  constructor(
    private itemService: ItemService,
    private translationService: TranslationService,
    private timerService: TimerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.getTotal();

    // Suscribirse a los cambios de idioma si se usa totalMessage
    this.languageSubscription = this.translationService.getLanguageObservable().subscribe(() => {
      this.totalMessage = this.translationService.getTranslation('Total hours left');
    });

    this.totalMessage = this.translationService.getTranslation('Total hours left');
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  deleteItem(item: Item) {
    this.items = this.items.filter(x => x.id != item.id);
    this.getTotal();
  }

  toggleItem(item: Item) {
    this.getTotal();
  }

  getTotal() {
    this.total = this.items
      .filter(x => !x.completed)
      .map(item => item.time - item.timeDone)
      .reduce((acc, item) => acc += item, 0);
  }

  sendToTimer(item: Item) {
    this.timerService.addTaskToTimer(item);
    this.router.navigate(['/timers']);
  }
}
