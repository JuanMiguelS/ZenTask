import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../Models/Item';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';
import { TotalComponent } from "../total/total.component";
import { ItemService } from '../../services/item.service';
import { TranslationService } from '../../services/translation.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemComponent, CommonModule, TotalComponent],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  constructor(private itemService: ItemService, private translationService: TranslationService) {}
   ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.getTotal();

    // Suscribirse a los cambios de idioma
    this.languageSubscription = this.translationService.getLanguageObservable().subscribe(() => {
      this.totalMessage$ = this.translationService.getTranslation('Total hours left');
    });
  }

  total: number = 0;
  items: Item[] = [];
  totalMessage$: Observable<string> = this.translationService.getTranslation('Total hours left'); // Inicializado correctamente
  private languageSubscription: Subscription | undefined;




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
    item.completed = !item.completed; // Asegúrate de actualizar el estado
    this.getTotal();
  }

  getTotal() {
    this.total = this.items.filter(x => !x.completed).map(item => item.time - item.timeDone).reduce((acc, item) => acc += item, 0);
    console.log(this.total);
  }
}
