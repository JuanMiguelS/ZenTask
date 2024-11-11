import { Routes } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
export const routes: Routes = [
  { path: '', component: ItemsComponent },  // Página principal
  { path: 'add', component: AddItemComponent }  // Página de agregar item
];
