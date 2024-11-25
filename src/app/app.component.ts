import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsComponent } from '../app/components/items/items.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { ItemComponent } from "./components/item/item.component";
import { TotalComponent } from "./components/total/total.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemsComponent, HeaderComponent, ItemComponent, TotalComponent],  // Añade los componentes aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Cambiado a styleUrls
})
export class AppComponent {
  title = 'ZenTask';
}
