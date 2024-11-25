import { Routes } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { Component } from '@angular/core';
import { ConfigComponent } from './components/config/config.component';
export const routes: Routes = [
  { path: '', component: ItemsComponent },  // Página principal
  { path: 'add', component: AddItemComponent },  // Página de agregar item
  {path: 'app-config', component: ConfigComponent} //Pagina de Ajustes y configuración
];
