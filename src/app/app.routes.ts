import { Routes } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { CounterPageComponent } from './components/counter-page/counter-page.component';
import {CalendarComponent} from './components/calendar/calendar.component'

export const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'add', component: AddItemComponent },
  { path: 'app-config', loadComponent: () => import('./components/config/config.component').then(m => m.ConfigComponent) },
  { path: 'app-counter-page', component: CounterPageComponent },
  { path: 'app-calendar', component: CalendarComponent},
  { path: 'timers', component: CounterPageComponent},
  { path: '**', redirectTo: '' }, // Redirige cualquier ruta no encontrada a la raíz
];
