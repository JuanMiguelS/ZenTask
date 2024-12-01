import { Routes } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ConfigComponent } from './components/config/config.component';
//import { LoginComponent } from './components/login/login.component'; // Asegúrate de que LoginComponent esté importado
//import { RegisterComponent } from './components/register/register.component'; // Asegúrate de que RegisterComponent esté importado

export const routes: Routes = [
  { path: '', component: ItemsComponent },  // Página principal
  { path: 'add', component: AddItemComponent },  // Página de agregar item
  { path: 'app-config', component: ConfigComponent }, // Página de configuración
//  { path: 'login', component: LoginComponent }, // Página de login
//  { path: 'register', component: RegisterComponent }, // Página de registro
];
